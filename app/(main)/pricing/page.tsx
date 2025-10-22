import SectionContainer from "@/components/common/SectionContainer";
import PricingCard from "./components/pricing-card";
import PricingScript from "./components/pricing-script";
import PricingSwitch from "./components/pricing-switch";

export default async function Page() {
  const plans = [
    {
      id: "payg",
      name: "Pay as you go",
      type: "selectable", // 有下拉
      options: [
        { label: "200 credits", price: "$16" },
        { label: "500 credits", price: "$38" },
        { label: "1000 credits", price: "$72" },
      ],
      sub: "Billed once",
      features: [
        "Full access to all AI tools",
        "Batch processing",
        "2 GB storage",
      ],
      note: "Non-refundable. Credits valid for 1 year",
      buttonLabel: "Pay now",
    },
    {
      id: "lite",
      name: "Lite plan",
      price: "$9",
      plans: [
        { credits: 150, date: 'month', price: 9, unit: "$", type: 'monthly' },
        { credits: 1800, date: 'year', price: 6, unit: "$", type: 'annually' },
      ],
      sub: "billed yearly",
      features: [
        "Full access to all AI tools",
        "Batch processing",
        "10 GB storage",
        "Auto-renews annually. Cancel anytime",
      ],
      buttonLabel: "Subscribe now",
    },
    {
      id: "pro",
      name: "Pro plan",
      badge: "Best value",
      price: "$29",
      plans: [
        { credits: 500, date: 'month', price: 29, unit: "$", type: 'monthly' },
        { credits: 6000, date: 'year', price: 21, unit: "$", type: 'annually' },
      ],
      sub: "billed yearly",
      features: [
        "Full access to all AI tools",
        "Batch processing",
        "50 GB storage",
        "Auto-renews annually. Cancel anytime",
      ],
      buttonLabel: "Subscribe now",
      highlight: true,
    },
    {
      id: "enterprise",
      name: "Enterprise plan",
      price: "Tailor-made pricing",
      sub: "for high volume usecases",
      features: [
        "1:1 demo sessions with our best product experts",
        "API-based image editing and generation",
        "SDK integration",
      ],
      buttonLabel: "Talk to sales",
    },
  ];

  return (
    <section className="min-h-screen pt-28 pb-20 bg-gradient-to-bl from-[#FFF6F2] via-[#FFF9EF] to-[#F0FFFD]">
      <SectionContainer>
        <div className="w-full">
          <div className="text-center">
            <h1 className="text-4xl font-semibold text-gray-900 mb-4">
              Choose the right plan for you
            </h1>
            <p className="text-gray-500 mb-10">
              Start with our free plan and get 3 free credits every month
              <a href="#" className="text-[#5B70F8] hover:underline ml-1">
                Sign up for free
              </a>
            </p>
          </div>

          <PricingSwitch />

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan) => (
              <PricingCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
        <h2 className="text-4xl text-center font-semibold text-gray-900 pt-24 pb-12">Know more about credits</h2>
        <div className="w-[720px] max-w-[90%] bg-white rounded-lg p-6 mx-auto shadow-lg">
          <h3 className="text-gray-800 text-2xl font-medium text-center pb-6 pt-3">
            What are credits?
          </h3>
          <div className="text-gray-600">
            Credits are the currency needed to access Markdrop’s features. <br />
            For example, removing a background from one image uses one credit.
          </div>
          <h3 className="text-gray-800 text-2xl font-medium text-center py-6">What if I run out of credits?</h3>
          <div className="text-gray-600">
            If you use up your credits, you can either purchase more with a pay-as-you-go plan or wait until your monthly credits reset with the next billing cycle.
          </div>
        </div>
      </SectionContainer>

      {/* 内联交互脚本 */}
      <PricingScript />
    </section>
  );
}
