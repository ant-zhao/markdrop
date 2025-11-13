"use client";

import { useEffect, useState } from "react";
import cx from 'classnames';
import { useMaskStore } from "@/stores/useMaskStore"
import ImageSilder from "@/components/common/ImageSilder"
import { RemoveType } from "@/types/remove";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { uploadFileApi } from "@/lib/api";
import { BizCode } from "@/lib/type";

const Section2 = () => {
  const { image, removeType, setRemoveType } = useMaskStore();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string | null>(null);


  useEffect(() => {
    setFile(image);
    if (image) {
      setUrl(URL.createObjectURL(image));
    } else {
      setUrl(null);
    }
  }, [image])

  if (!file) {
    return null;
  }

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const fileRes = await uploadFileApi({
        file,
        bizCode: BizCode.MARK_DROP,
        fileSuffix: file.name.split(".").pop(),
      });
      console.log(fileRes);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-2xl xl:w-3xl mt-4 mb-8 pb-8 overflow-hidden text-center flex flex-col items-center select-none">
      <div className="w-full px-12 bg-white py-4 mt-4 rounded-sm shadow-md">
        {url && <div className="w-full">
          <div className="w-full p-2 mb-4 shadow-md border-primary-300 rounded-sm border-dashed border">
            <ImageSilder left={url} />
          </div>
        </div>}
        <div className="w-full text-[0.8rem] flex justify-end items-center">
          <div
            className="flex items-center space-x-2"
            onClick={() => setRemoveType(removeType === RemoveType.AUTO ? RemoveType.MANUAL : RemoveType.AUTO)}
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
          className="cursor-pointer px-8 rounded-[2rem] bg-[#415af9]/90 hover:bg-[#415af9]"
          onClick={handleSubmit}
        >
          Remove
        </Button>
      </div>
    </div>
  )
}

export default Section2
