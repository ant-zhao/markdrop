// components/FeatureRow.tsx
import React from "react";
import Image, { StaticImageData } from "next/image";
import ImageSilder from "@/components/common/ImageSilder";

interface FeatureRowProps {
  images: (string | StaticImageData)[];
  title: React.ReactNode; // 支持富文本，比如 <span className="text-blue-500">AI-Powered</span>
  description: string;
  reverse?: boolean; // 偶数行时设置为 true
}

export default function FeatureRow({
  images,
  title,
  description,
  reverse = false,
}: FeatureRowProps) {
  return (
    <div
      className={`w-full flex flex-col md:flex-row items-center gap-8 ${reverse ? "md:flex-row-reverse" : ""}`}
    >
      {/* 图片 */}
      <div className="w-full md:w-1/2">
        {images.length === 2 ? (
          <ImageSilder left={images[0] as string} right={images[1] as string} />
        ) : (
          <div className="w-full relative">
            <Image
              src={images[0]}
              alt="feature"
              fill
              className="!static w-full h-auto"
              priority={false}
            />
          </div>
        )}
      </div>

      {/* 文案 */}
      <div className="w-full md:w-1/2">
        <h3 className="text-2xl font-bold leading-tight">{title}</h3>
        <p className="text-gray-600 py-10 leading-tight">{description}</p>
        <a
          href="#"
          className="text-blue-600 font-medium hover:underline inline-flex items-center"
        >
          Try Now
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
}
