"use client";

import { signIn } from "next-auth/react";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { IoMdCloseCircle } from "react-icons/io";
import GoogleIcon from "@/assets/icon/GoogleIcon";

export default function LoginModal({ onClose }: { onClose: () => void }) {
  // 禁止背景滚动
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 pb-10 bg-gradient-to-bl from-[#FFF6F2] via-[#FFF9EF] to-[#F0FFFD]"
      >
        {/* 标题 + 关闭按钮 */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Continue to MarkDrop
          </h2>
          <button
            onClick={onClose}
            className="p-1 absolute top-2 right-2 rounded-full hover:bg-gray-100 transition"
          >
            <IoMdCloseCircle size={24} className="text-[#aaaaaa]" />
          </button>
        </div>

        <p className="text-sm text-gray-500 mt-2 mb-6">
          Use your email or another services to continue, signing up is free!
        </p>

        {/* Google 登录按钮 */}
        <button
          onClick={() => signIn("google")}
          className="flex items-center justify-center w-full font-semibold cursor-pointer border border-[#d5d5d5] rounded-[0.8rem] px-4 py-2 text-[#333333] hover:bg-gray-50 transition"
        >
          {/* 彩色 Google logo */}
          <GoogleIcon />
          <span className="pl-2">Continue with Google</span>
        </button>

        {/* 用户协议 */}
        <p className="text-sm text-gray-500 mt-6">
          By continuing up, you agree to our{" "}
          <a
            href="/terms-service"
            className="text-[#5b70f8] hover:underline"
          >
            Terms of Service
          </a>
          {" "}and{" "}
          <a
            href="/privacy-policy"
            className="text-[#5b70f8] hover:underline"
          >
            Privacy Policy
          </a>
        </p>
      </motion.div>
    </div>
  );
}
