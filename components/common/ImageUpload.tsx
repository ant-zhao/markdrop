"use client";

import { DragEvent } from "react";
import { useMaskStore } from "@/stores/useMaskStore";
import HomeIcon2 from "@/assets/icon/HomeIcon2";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/useUser";
import { USER_MODE } from "@/types/user";

const defaultImages = [
  "https://picsum.photos/80/80",
  "https://placebear.com/80/80",
  "https://i.pravatar.cc/80",
  "https://picsum.photos/80",
];

type ImageUploadProps = {
  goRemove?: boolean;
  showSampleImage?: boolean;
};

export default function ImageUpload({
  goRemove = false,
  showSampleImage = true,
}: ImageUploadProps) {
  const router = useRouter();
  const { image, setImage } = useMaskStore();
  const { userInfo, userMode } = useUserStore();

  const handleSetImage = (img: File) => {
    setImage(img);
    if (goRemove) {
      router.push("/remove");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      handleSetImage(e.target.files[0]);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!userInfo?.name || userMode !== USER_MODE.LOGGED_IN) {
      window.location.href = `/auth/login?redirect_uri=${encodeURIComponent(window.location.href)}`;
      return;
    }
    if (e.dataTransfer.files[0]) {
      handleSetImage(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* 上传按钮 */}
      <label
        className="flex items-center space-x-2 border-2 border-[#5B70F8] rounded-full px-8 py-1 cursor-pointer hover:bg-blue-50 transition"
      >
        <span className="text-3xl"><HomeIcon2 /></span>
        <span className="text-[#5B70F8] font-semibold">Upload Image</span>
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
          onClick={(e) => {
            if (!userInfo?.name || userMode !== USER_MODE.LOGGED_IN) {
              e.preventDefault();
              window.location.href = `/auth/login?redirect_uri=${encodeURIComponent(window.location.href)}`;
              return;
            }
          }}
        />
      </label>

      {/* 拖拽区域 */}
      {!image && (
        <div
          className="w-full max-w-md border-2 border-dashed border-gray-300 rounded-lg p-6 text-center text-[#666666] text-500"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <p>Or simply drag & drop your image here</p>
        </div>
      )}

      {/* 默认图片选择 */}
      {showSampleImage && (
        <>
          <p className="text-sm text-[#999999] text-400">No image? Try one of these:</p>
          <div className="flex space-x-2">
            {defaultImages.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt="default"
                className="w-20 h-20 object-cover rounded-sm border-2 border-gray-200 hover:border-blue-500 cursor-pointer"
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
