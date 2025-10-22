"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { usePlanStore } from "@/stores/usePlan";

interface PlanProps {
  options: { label: string, price: string }[];
}

export default ({ options }: PlanProps) => {
  const { customPlan, setCustomPlan } = usePlanStore();

  const setPlan = (plan: string) => {
    const data = options.find((option) => option.label === plan);
    if (data) {
      setCustomPlan(data);
    }
  }

  return (
    <div>
      <Select onValueChange={setPlan} value={customPlan.label}>
        <SelectTrigger className="w-full focus-visible:border-[#e5e5e5]">
          <SelectValue placeholder="Select a plan" />
        </SelectTrigger>
        <SelectContent className="border-0">
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.label} value={option.label}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <p className="text-2xl font-semibold mb-1 mt-2">{customPlan.price}</p>
      <p className="w-full text-left text-sm text-gray-500">Billed once</p>
    </div>
  )
}
