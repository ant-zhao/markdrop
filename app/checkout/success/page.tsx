"use client";

import { useEffect } from "react";
import { CheckCircle } from "lucide-react"
import { useStatusStore } from "@/stores/useStatus";
import { redirectWithoutBack } from "@/utils";
import { MessageType } from "@/lib/page-communicator";

export default function SuccessPage() {
  const { communicator } = useStatusStore();

  const config = {
    icon: <CheckCircle className="h-16 w-16 text-green-500" />,
    title: "Payment Success",
    description: `Your order has been paid successfully`,
    secondaryText: null
  };

  useEffect(() => {
    communicator?.send({ type: MessageType.PaySuccess });
  }, []);

  const handleClose = () => {
    try {
      if (communicator?.hasOtherAlivePages() && !!window.opener) {
        window.close();
        setTimeout(() => {
          redirectWithoutBack('/');
        }, 1000);
        return;
      }
    } catch (error) { }

    redirectWithoutBack('/');
  }

  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 sm:p-8">
          {/* 状态图标 */}
          <div className="flex justify-center mb-6">
            {config.icon}
          </div>

          {/* 标题 */}
          <div className="text-center mb-2">
            <h2 className="text-2xl font-bold text-gray-900">{config.title}</h2>
          </div>

          {/* 描述信息 */}
          <div className="text-center mb-4">
            <p className="text-gray-500">{config.description}</p>
          </div>

          {/* 次要信息 */}
          {config.secondaryText && (
            <div className="text-center mb-8">
              <p className="text-gray-600">{config.secondaryText}</p>
            </div>
          )}
          <button
            onClick={handleClose}
            className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            Close page
          </button>
        </div>
      </div>
    </div>
  )
}
