"use client";

import { Button } from "@/components/ui/button";

export default function PayButton({
  planId,
  label,
  highlight,
}: {
  planId: string;
  label: string;
  highlight?: boolean;
}) {
  const handleClick = () => {
    console.log(`Checkout triggered for plan: ${planId}`);
    // 这里可挂载真实支付逻辑，例如 Stripe / 自定义 API
  };

  return (
    <Button
      onClick={handleClick}
      variant={highlight ? "default" : "outline"}
      className={`mt-auto cursor-pointer w-full ${highlight
        ? "bg-[#314af0]/80 hover:bg-[#314af0] text-white"
        : "border-[#314af0] text-[#314af0] hover:bg-[#314af0]/10"
        }`}
    >
      {label}
    </Button>
  );
}
