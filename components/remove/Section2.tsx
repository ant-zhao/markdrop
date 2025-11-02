"use client";

import { useMaskStore } from "@/stores/useMaskStore"
import ImageSilder from "@/components/common/ImageSilder"
import { RemoveType } from "@/types/remove";

const Section2 = () => {
  const { imageUrl, removeType, setRemoveType } = useMaskStore();

  if (!imageUrl) {
    return null;
  }

  return (
    <div className="w-2xl xl:w-3xl overflow-hidden text-center flex flex-col items-center select-none pt-4">
      <div className="w-max bg-gray-100 flex rounded-sm p-1">
        {Object.values(RemoveType).map((type) => (
          <div
            key={type}
            className={`
              w-[4rem] px-2 rounded-[4px] text-[0.8rem] line-clamp-2 cursor-pointer
              ${removeType === type ? ' bg-[rgb(238,238,253)] text-[#4F46E5]' : ' text-gray-600'}`
            }
            onClick={() => setRemoveType(type)}
          >
            {type}
          </div>
        ))}
      </div>
      <div className="w-full p-2 my-8 border-primary-300 rounded-sm border-dashed border mt-2">
        <ImageSilder left={imageUrl} />
      </div>
    </div>
  )
}

export default Section2
