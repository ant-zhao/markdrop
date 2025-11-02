import React from "react";
import Image from "next/image";
import SliderButton from "@/assets/icon/SliderButton";
import ImageSliderScript from "./ImageSliderScript";

export default function ImageSlider({
  left,
  right,
  largeLine,
}: {
  left: string;
  right?: string;
  largeLine?: boolean;
}) {
  const id = React.useId(); // ✅ 仅用于唯一 DOM id（SSR 安全）

  if (left && right) {
    return null;
  }

  return (
    <div
      id={`slider-${id}`}
      className="relative w-full"
      style={{ paddingTop: "58%" }}
    >
      <div className="absolute inset-0 select-none w-full h-full rounded-sm overflow-hidden cursor-pointer">
        <div className="w-full h-full pointer-events-none">
          {right && (<Image
            src={right}
            fill
            alt="Image 1"
            className="object-cover w-full h-full"
          />)}
        </div>
        <div
          className="absolute w-full h-full left-0 top-0 pointer-events-none"
          style={{ clipPath: `inset(0 ${right ? "50%" : 0} 0 0)` }}
          data-clip
        >
          <Image
            src={left}
            fill
            alt="Image 2"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
      {right && (<div
        className="absolute w-[1rem] top-0 left-[calc(50%-0.5rem)] cursor-pointer"
        style={{
          height: "100%",
          ...(largeLine && {
            height: "calc(100% + 40px)",
            transform: "translateY(-20px)",
          }),
        }}
        data-slider
      >
        <div className="w-[2px] h-full bg-[#5B70F8] absolute top-0 left-[50%] transform -translate-x-1/2"></div>
        <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 rounded-[50%] shadow-gray-950 shadow-2xl">
          <SliderButton />
        </div>
      </div>)}

      <ImageSliderScript id={id} />
    </div>
  );
}
