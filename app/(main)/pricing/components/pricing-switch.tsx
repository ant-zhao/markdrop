"use client"

import { Switch } from "@/components/ui/switch";
import { usePlanStore } from "@/stores/usePlan";
import { useEffect } from "react";

export default () => {
  const { plan, setPayAnnually } = usePlanStore();

  useEffect(() => {
    initPlanCard();
  }, [plan]);

  const initPlanCard = () => {
    document.querySelectorAll('.pricing-plan-item')
      .forEach(card => {
        card.classList.remove('has-monthly', 'has-annually');
        card.classList.add(plan.payAnnually ? 'has-annually' : 'has-monthly');
      })
  }

  return (
    <div
      className="flex items-center justify-center mb-10 cursor-pointer select-none"
      onClick={() => setPayAnnually(!plan.payAnnually)}
    >
      <span className={"mr-2 font-semibold " + (plan.payAnnually ? "text-gray-500" : "text-gray-800")}>Monthly</span>
      <Switch
        className="cursor-pointer"
        checked={plan.payAnnually}
      />
      <span className="text-gray-600 ml-2 flex items-center">
        <span className={"font-semibold " + (plan.payAnnually ? "text-gray-800" : "text-gray-500")}>Annually</span>
        <span className="ml-2 text-xs bg-indigo-100 text-[#5B70F8] rounded px-1.5 py-0.5">
          33% off
        </span>
      </span>
    </div>
  )
}
