"use client";

import { XCircle } from "lucide-react"
import { useStatusStore } from "@/stores/useStatus";
import { redirectWithoutBack } from "@/utils";

export default function CancelPage() {
  const { communicator } = useStatusStore();

  const config = {
    icon: <XCircle className="h-16 w-16 text-red-500" />,
    title: "Payment Failed",
    description: "You can try again or contact customer service",
    secondaryText: null
  };

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
            Close Page
          </button>
        </div>
      </div>
    </div>
  )
}
