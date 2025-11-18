"use client";
import cx from 'classnames';
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePlanStore } from "@/stores/usePlan";

export default function PayButton({
  planId,
  label,
  highlight,
}: {
  planId: number;
  label: string;
  highlight?: boolean;
}) {
  const { loading, selectedPackageId } = usePlanStore();

  return (
    <Button
      data-plan-id={planId}
      variant={highlight ? "default" : "outline"}
      className={cx(`package-pay mt-auto cursor-pointer w-full border-[#314af0]`, {
        "bg-[#314af0]/90 hover:bg-[#314af0] text-white hover:text-white": highlight || selectedPackageId === planId,
        "text-[#314af0] hover:text-[#314af0] hover:bg-[#314af0]/10": !(highlight || selectedPackageId === planId),
      })}
    >
      <span className={(loading && selectedPackageId === planId) ? "block" : "hidden"}>
        <Loader className="animate-spin" size={18} />
      </span>
      <span>{label}</span>
    </Button>
  );
}
