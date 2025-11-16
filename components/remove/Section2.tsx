"use client";

import cx from 'classnames';
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useMaskStore } from "@/stores/useMaskStore"
import ImageSilder from "@/components/common/ImageSilder"
import MaskEditorDialog from "@/components/common/MaskEditorDialog";
import Loading from "@/components/common/Loading";
import { RemoveType } from "@/types/remove";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { submitRemoveApi, uploadFileApi } from "@/lib/api";
import { BizCode } from "@/lib/type";

const Section2 = () => {
  const { loading, visible, image, removeType, canvasRender, setRemoveType, setLoading } = useMaskStore();
  const [url, setUrl] = useState<string | null>(null);
  const [removedUrl, setRemovedUrl] = useState<string | null>(null);

  useEffect(() => {
    if (image) {
      setUrl(URL.createObjectURL(image));
    } else {
      setUrl(null);
    }
  }, [image])

  if (!image) {
    return null;
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
        toast.error(fileRes.message);
        return;
      }
      const taskRes = await submitRemoveApi({
        type: RemoveType.AUTO,
        fileUrl: fileRes.url,
      });
      if (taskRes.code !== 10000) {
        toast.error(taskRes.message);
        return;
      }
    } catch (error) {
      toast.error("Failed to submit remove task");
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
        toast.error(imageRes.message);
        return;
      }
      if (maskRes.code !== 10000 || !maskRes.url) {
        toast.error(maskRes.message);
        return;
      }
      const taskRes = await submitRemoveApi({
        type: RemoveType.MANUAL,
        fileUrl: imageRes.url,
        maskUrl: maskRes.url,
      });
      if (taskRes.code !== 10000) {
        toast.error(taskRes.message);
        return;
      }
    } catch (error) {
      toast.error("Failed to submit remove task");
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

  return (
    <div className="w-2xl xl:w-3xl pt-4 mb-8 pb-8 overflow-hidden text-center flex flex-col items-center select-none">
      <div className={"w-full px-12 py-4 mt-4 rounded-sm " + (visible ? "bg-white shadow-md" : "")}>
        {url && <div className="w-full">
          <div className="relative w-full p-2 mb-4">
            <ImageSilder left={url} />
            <MaskEditorDialog />
            {loading && <Loading />}
          </div>
        </div>}
        <div className="w-full text-[0.8rem] flex justify-end items-center">
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
        <Button
          size="sm"
          disabled={loading}
          className={"cursor-pointer px-8 rounded-[2rem] bg-[#415af9]/90 hover:bg-[#415af9]" + (loading ? " cursor-not-allowed opacity-50" : "")}
          onClick={handleSubmit}
        >
          Remove
        </Button>
      </div>
    </div>
  )
}

export default Section2
