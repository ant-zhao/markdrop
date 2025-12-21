"use client";

import cx from 'classnames';
import { useEffect, useRef, useState } from "react";
import { useMaskStore } from "@/stores/useMaskStore"
import ImageSilder from "@/components/common/ImageSilder"
import MaskEditorDialog from "@/components/common/MaskEditorDialog";
import Loading from "@/components/common/Loading";
import { RemoveType } from "@/types/remove";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { getTaskStatusApi, submitRemoveApi, uploadFileApi } from "@/lib/api";
import { BizCode, TaskState } from "@/lib/type";

const Section2 = () => {
  const { loading, visible, image, maskImage, removeType, canvasRender, setRemoveType, setLoading, setMaskImage } = useMaskStore();
  const [url, setUrl] = useState<string | null>(null);
  const [removedUrl, setRemovedUrl] = useState<{ url: string, fileSuffix: string } | undefined>();
  const interval = useRef<number | null>(null);

  const cleanInterval = () => {
    if (interval.current) {
      clearInterval(interval.current);
      interval.current = null;
    }
  }

  useEffect(() => {
    if (image) {
      setUrl(URL.createObjectURL(image));
    } else {
      setUrl(null);
    }
    cleanInterval();
    setRemovedUrl(undefined);
  }, [image])

  if (!image) {
    return null;
  }

  const getTaskStatus = async (taskId: string) => {
    cleanInterval();
    return new Promise<void>((resolve) => {
      interval.current = window.setInterval(async () => {
        const taskRes = await getTaskStatusApi({
          taskId,
        });
        if (taskRes.code !== 10000) {
          window.toast?.error(taskRes.message);
          setMaskImage();
          resolve();
          return;
        }
        if ([TaskState.SUCCESS, TaskState.FAIL, TaskState.CANCEL].includes(taskRes.data.state)) {
          if (taskRes.data.state === TaskState.SUCCESS && taskRes.data.result) {
            const fileSuffix = taskRes.data.result.split('?')[0].split(".").pop() || "png";
            try {
              const res = await fetch(taskRes.data.result);
              const blob = await res.blob();
              const url = URL.createObjectURL(blob);

              setRemovedUrl({ url, fileSuffix });
            } catch (error) {
              const image = new Image();
              image.onload = () => {
                setRemovedUrl({ url: taskRes.data.result, fileSuffix });
              };
              image.src = taskRes.data.result;
            }
          }
          resolve();
        }
      }, 2000);
    });
  }

  const handleAutoRemove = async () => {
    setLoading(true);
    try {
      const fileRes = await uploadFileApi({
        file: image,
        bizCode: BizCode.MARK_DROP,
        fileSuffix: image.name.split(".").pop(),
      });
      if (fileRes.code !== 10000 || !fileRes.url) {
        window.toast?.error(fileRes.message);
        return;
      }
      const taskRes = await submitRemoveApi({
        type: RemoveType.AUTO,
        imageUrl: fileRes.url,
        bizCode: BizCode.MARK_DROP,
      });
      if (taskRes.code !== 10000) {
        window.toast?.error(taskRes.message);
        return;
      }
      await getTaskStatus(taskRes.data.taskId);
      cleanInterval();
    } catch (error) {
      window.toast?.error("Failed to submit remove task");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const handleManualRemove = async () => {
    setLoading(true);
    const maskFile = await canvasRender?.exportMaskAsFile();
    if (!maskFile) {
      handleAutoRemove();
      return;
    }
    try {
      setMaskImage(URL.createObjectURL(maskFile));
      const [imageRes, maskRes] = await Promise.all([
        uploadFileApi({
          file: image,
          bizCode: BizCode.MARK_DROP,
          fileSuffix: image.name.split(".").pop(),
        }),
        uploadFileApi({
          file: maskFile,
          bizCode: BizCode.MARK_DROP,
          fileSuffix: maskFile.name.split(".").pop(),
        }),
      ]);
      if (imageRes.code !== 10000 || !imageRes.url) {
        window.toast?.error(imageRes.message);
        return;
      }
      if (maskRes.code !== 10000 || !maskRes.url) {
        window.toast?.error(maskRes.message);
        return;
      }
      const taskRes = await submitRemoveApi({
        type: RemoveType.MANUAL,
        imageUrl: imageRes.url,
        maskUrl: maskRes.url,
        bizCode: BizCode.MARK_DROP,
      });
      if (taskRes.code !== 10000) {
        window.toast?.error(taskRes.message);
        return;
      }
      await getTaskStatus(taskRes.data.taskId);
      cleanInterval();
    } catch (error) {
      window.toast?.error("Failed to submit remove task");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async () => {
    if (loading) return;
    if (removeType === RemoveType.AUTO) {
      handleAutoRemove();
    } else {
      handleManualRemove();
    }
  }

  const handleDownload = () => {
    if (!removedUrl) return;
    const link = document.createElement('a');
    link.href = removedUrl.url;
    link.download = `${image.name.split(".").shift()}-${new Date().getTime()}.${removedUrl.fileSuffix}`;
    link.click();
  }

  return (
    <>
      {image && removeType === RemoveType.MANUAL && (
        <div className="h-10"></div>
      )}
      <div className="w-2xl xl:w-3xl pt-4 mb-8 pb-8 overflow-hidden text-center flex flex-col items-center select-none">
        <div className={"w-full px-12 py-4 mt-4 rounded-sm " + (visible ? "bg-white shadow-md" : "")}>
          {url && <div className="w-full">
            <div className="relative w-full p-2 mb-4">
              <ImageSilder left={url} right={removedUrl?.url} />
              {/* {!maskImage && <MaskEditorDialog />} */}
              {loading ? <Loading /> : (!maskImage && <MaskEditorDialog />)}
            </div>
          </div>}
          <div className={"w-full text-[0.8rem] flex justify-end items-center" + (loading || removedUrl ? ' hidden' : '')}>
            <div
              className="flex items-center space-x-2"
              onClick={() => {
                if (loading) return;
                setRemoveType(removeType === RemoveType.AUTO ? RemoveType.MANUAL : RemoveType.AUTO);
              }}
            >
              <Switch
                className={cx(
                  "data-[state=checked]:bg-black bg-neutral-700 relative h-3 w-6",
                )}
                thumbClassName="size-2 relative data-[state=unchecked]:left-[8%] data-[state=checked]:left-3 data-[state=checked]:translate-x-[5%]"
                checked={removeType === RemoveType.MANUAL}
              />
              <span
                className="text-sm text-neutral-800 font-medium"
              >
                Try manual edit
              </span>
            </div>
          </div>
        </div>
        <div className='w-full flex justify-center items-center pt-8'>
          {removedUrl ? (
            <Button
              size="sm"
              disabled={loading}
              className={"cursor-pointer px-8 rounded-[2rem] bg-[#415af9]/90 hover:bg-[#415af9]" + (loading ? " cursor-not-allowed opacity-50" : "")}
              onClick={handleDownload}
            >
              Download
            </Button>
          ) : (
            <Button
              size="sm"
              disabled={loading}
              className={"cursor-pointer px-8 rounded-[2rem] bg-[#415af9]/90 hover:bg-[#415af9]" + (loading ? " cursor-not-allowed opacity-50" : "")}
              onClick={handleSubmit}
            >
              Remove
            </Button>
          )}
        </div>
      </div>
    </>
  )
}

export default Section2
