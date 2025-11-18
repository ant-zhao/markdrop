import { getPackageListApi } from "@/lib/api";
import PricingCard from "./pricing-card";
import { ResponseData } from "@/lib/request";
import { GetPackageListApiResData } from "@/lib/api";

export default async function PricingContent() {
  let packages: ResponseData<GetPackageListApiResData[]> | undefined;
  try {
    packages = await getPackageListApi();
  } catch (error) {
    console.error("Failed to fetch packages:", error);
  }

  if (packages?.code !== 10000 || (packages?.data || []).length === 0) {
    return null;
  }

  const plans = packages.data.map((plan) => {
    return {
      id: plan.id,
      name: plan.name,
      price: plan.price,
      unit: '$',
      sub: plan.description,
      type: "package",
      // features: [
      //   "Full access to all AI tools",
      //   "Batch processing",
      //   "2 GB storage",
      // ],
      credits: plan.credit,
      features: [
        "Full access to all AI tools",
        "Credits never expire; valid until fully used",
      ],
      buttonLabel: "Pay now",
    };
  });

  return (
    <div className="flex flex-wrap justify-center gap-6">
      {plans.map((plan) => (
        <div key={plan.id} className="w-full md:w-1/2 lg:w-1/4">
          <PricingCard plan={plan} />
        </div>
      ))}
    </div>
  );
}