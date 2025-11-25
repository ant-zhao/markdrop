"use client";

import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useMaskStore } from "@/stores/useMaskStore";

export function BrushRadius() {
  const { brushRadius, setBrushRadius } = useMaskStore();

  return (
    <div className="flex items-center gap-4 w-[240px] pl-4">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Slider
              value={[brushRadius]}
              max={200}
              min={10}
              step={5}
              className="
                flex-1
                h-[4px]
                [&_[data-slot=slider-track]]:h-full
                [&_[data-slot=slider-thumb]]:h-3
                [&_[data-slot=slider-thumb]]:w-3
                [&_[data-slot=slider-thumb]]:border-[1.5px]
              "
              onValueChange={(v) => setBrushRadius(v[0])}
            />
          </TooltipTrigger>
          <TooltipContent side="top" className="bg-gray-800 text-white py-1 px-3 text-sm rounded-md">
            <p>-/=</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Input
        type="number"
        value={brushRadius}
        className="w-12 h-7 no-spinner py-0 px-2"
        onChange={(e) => {
          const newVal = Number(e.target.value);
          setBrushRadius(Math.min(200, Math.max(10, newVal))); // 限制数值范围
        }}
      />
    </div>
  );
}
