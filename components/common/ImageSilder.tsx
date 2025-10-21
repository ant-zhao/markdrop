import React from "react";
import Image from "next/image";
import SliderButton from "@/assets/icon/SliderButton";

export default function ImageSlider({
  left,
  right,
  largeLine,
}: {
  left: string;
  right: string;
  largeLine?: boolean;
}) {
  const id = React.useId(); // ✅ 仅用于唯一 DOM id（SSR 安全）

  return (
    <div
      id={`slider-${id}`}
      className="relative w-full"
      style={{ paddingTop: "58%" }}
    >
      <div className="absolute inset-0 select-none w-full h-full rounded-sm overflow-hidden cursor-pointer">
        <div className="w-full h-full pointer-events-none">
          {/* TODO: */}
          {/* <Image
            src={right}
            fill
            alt="Image 1"
            className="object-cover w-full h-full"
          /> */}
        </div>
        <div
          className="absolute w-full h-full left-0 top-0 pointer-events-none"
          style={{ clipPath: "inset(0 50% 0 0)" }} // 初始 50%
          data-clip
        >
          {/* <Image
            src={left}
            fill
            alt="Image 2"
            className="object-cover w-full h-full"
          /> */}
        </div>
      </div>
      <div
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
      </div>

      {/* inline script for slider behavior */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const root = document.getElementById("slider-${id}");
              if (!root) return;
              const clip = root.querySelector("[data-clip]");
              const slider = root.querySelector("[data-slider]");
              let dragging = false;

              const onMouseMove = (e) => {
                if (!dragging) return;
                const rect = root.getBoundingClientRect();
                const offsetX = e.clientX - rect.left;
                const pos = Math.min(Math.max((offsetX / rect.width) * 100, 0), 100);
                clip.style.clipPath = "inset(0 " + (100 - pos) + "% 0 0)";
                slider.style.left = "calc(" + pos + "% - 0.5rem)";
              };

              const onMouseDown = (e) => {
                dragging = true;
                onMouseMove(e);
                document.addEventListener("mousemove", onMouseMove);
                document.addEventListener("mouseup", onMouseUp);
              };

              const onMouseUp = () => {
                dragging = false;
                document.removeEventListener("mousemove", onMouseMove);
                document.removeEventListener("mouseup", onMouseUp);
              };

              root.addEventListener("mousedown", onMouseDown);
            })();
          `,
        }}
      />
    </div>
  );
}
