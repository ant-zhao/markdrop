import { XIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import PayButton from "./pay-button";
import CustomPlan from "./custom-plan";

/**
 * 暂时没有 plan.plans.length > 0 的情况
 */
// import "./pricing-card.css";

export default function PricingCard({ plan }: { plan: any }) {
  return (
    <Card
      className={`
        relative rounded-2xl border ${plan.highlight
          ? "border-indigo-500 shadow-lg"
          : "border-gray-200 shadow-sm"
        } flex flex-col pricing-plan-item has-annually`
      }
      data-plan-id={plan.id}
    >
      <CardContent
        className="px-6 flex flex-col h-ful">
        {plan.badge && (
          <span className="absolute top-3 right-3 text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded">
            {plan.badge}
          </span>
        )}
        <h3 className="text-lg font-semibold mb-3">{plan.name}</h3>
        {plan.type === "selectable" && (
          <CustomPlan options={plan.options} />
        )}
        {plan.type === "package" && (
          <div className="plan-type-package">
            <div className="h-9 flex items-center">
              {plan.credits} credits
            </div>

            <p className="mb-1 mt-2">
              <span className="font-semibold text-2xl">{plan.unit}{plan.price}</span>
            </p>
            <p className="text-sm text-gray-500">
              Billed once
            </p>
          </div>
        )}
        {plan.plans && plan.plans.length > 0 && (
          plan.plans.map((o: any) => (
            <div key={o.type} className={"plan-type-" + o.type}>
              <div className="h-9 flex items-center">
                {o.credits} credits/<span className="text-gray-500">{o.date}</span>
              </div>

              <p className="mb-1 mt-2">
                <span className="font-semibold text-2xl">{o.unit}{o.price}</span>
                <span className="text-gray-500"> / {o.date}</span>
              </p>
              <p className="text-sm text-gray-500">
                {o.unit}{o.type === 'monthly' ? o.price : o.price * 12} billed {o.type}
              </p>
            </div>
          ))
        )}
        <div className="my-4">
          <PayButton planId={plan.id} label={plan.buttonLabel} highlight={plan.highlight} />
        </div>

        <ul className="text-sm line-height-2 text-gray-700 space-y-2">
          {plan.features.map((f: string, i: number) => (
            <li key={i} className="flex items-start">
              <span className="text-indigo-500 mr-2">✓</span> {f}
            </li>
          ))}
          {plan.note && <li className="flex items-start">
            <XIcon className="block text-[#660014] mr-2 text-xl" size={'1em'} />
            <span>{plan.note}</span>
          </li>}
        </ul>
      </CardContent>
    </Card>
  );
}
