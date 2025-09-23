"use client";

import { signIn } from "next-auth/react";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { IoMdCloseCircle } from "react-icons/io";

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
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-semibold text-gray-800">登录</h2>
          <button
            onClick={onClose}
            className="p-1 absolute top-2 right-2 rounded-full hover:bg-gray-100 transition"
          >
            <IoMdCloseCircle size={24} className="text-[#aaaaaa]" />
          </button>
        </div>

        {/* Google 登录按钮 */}
        <button
          onClick={() => signIn("google")}
          className="flex items-center justify-center w-full font-bold cursor-pointer border border-[#d5d5d5] rounded-[2rem] px-4 py-2 text-[#333333] hover:bg-gray-50 transition"
        >
          {/* 彩色 Google logo */}
          <svg className="mr-3 w-5 h-5" viewBox="0 0 48 48">
            <path
              fill="#EA4335"
              d="M24 9.5c3.9 0 6.6 1.7 8.1 3.1l5.9-5.9C34.6 3.5 29.7 1.5 24 1.5 14.6 1.5 6.4 7.9 3.1 16.3l6.9 5.4C11.5 14.2 17.2 9.5 24 9.5z"
            />
            <path
              fill="#34A853"
              d="M46.1 24.5c0-1.6-.1-2.7-.4-3.9H24v7.4h12.5c-.5 3-2.3 5.6-5 7.3l7.7 6c4.5-4.2 7.1-10.5 7.1-16.8z"
            />
            <path
              fill="#4A90E2"
              d="M10 28.6c-.6-1.7-1-3.6-1-5.6s.4-3.9 1-5.6l-6.9-5.4C1.5 15.5 0 19.6 0 23c0 3.4 1.5 7.5 3.1 10.9l6.9-5.3z"
            />
            <path
              fill="#FBBC05"
              d="M24 46c6.5 0 12-2.1 16-5.7l-7.7-6c-2.1 1.5-4.9 2.4-8.3 2.4-6.7 0-12.4-4.5-14.4-10.6l-6.9 5.3C6.4 40.1 14.6 46 24 46z"
            />
          </svg>
          使用 Google 账号登录
        </button>

        {/* 用户协议 */}
        <p className="text-sm text-gray-500 text-center mt-6">
          登录即代表同意{" "}
          <a
            href="/terms"
            className="text-[#5b70f8] hover:underline"
          >
            用户协议
          </a>
        </p>
      </motion.div>
    </div>
  );
}
