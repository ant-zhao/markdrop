"use client";

import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { PointChangeTypeEnum } from "@/lib/type";

export function TableFilter({
  value,
  onChange,
}: {
  value: PointChangeTypeEnum | undefined;
  onChange: (val: PointChangeTypeEnum | undefined) => void;
}) {
  return (
    <Select
      value={value}
      onValueChange={(v) =>
        onChange(v === "ALL" ? undefined : (v as PointChangeTypeEnum))
      }
    >
      <SelectTrigger className="w-50">
        <SelectValue placeholder="type" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="ALL">All types</SelectItem>
        <SelectItem value={PointChangeTypeEnum.RECHARGE}>Recharge</SelectItem>
        <SelectItem value={PointChangeTypeEnum.BUSINESS_CONSUME}>Business consume</SelectItem>
        <SelectItem value={PointChangeTypeEnum.FAILURE_RETURN}>Failure return</SelectItem>
      </SelectContent>
    </Select>
  );
}
