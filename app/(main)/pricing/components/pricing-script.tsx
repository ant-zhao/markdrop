"use client";
import { useEffect, useRef } from "react";
import { usePlanStore } from "@/stores/usePlan";
import { payApi } from "@/lib/api";

export default () => {
  const { setSelectedPackageId, setLoading } = usePlanStore();
  const loading = useRef(false);

  useEffect(() => {
    init();
  }, []);

  const startPay = async (planId?: number) => {
    if (planId === undefined || loading.current) return;
    loading.current = true;
    setLoading(true);
    try {
      const res = await payApi({ packageId: planId });
      if (res.code === 10000 && res.data?.payLink) {
        window.open(res.data.payLink, "_blank");
      }
    } catch (error) {
      console.error(error);
    } finally {
      loading.current = false;
      setLoading(false);
    }
  }


  const init = () => {
    // 年/月切换
    const toggle = document.getElementById("pricing-toggle") as HTMLInputElement;
    toggle?.addEventListener("change", () => {
      document.body.classList.toggle("annual", toggle.checked);
      console.log("Pricing mode:", toggle.checked ? "Annually" : "Monthly");
    });

    // 下拉切换显示价格
    document.querySelectorAll("[data-plan-select]").forEach(select => {
      select.addEventListener("change", e => {
        const card = (e.target as HTMLSelectElement).closest("[data-plan-id]") as HTMLElement;
        const price = (e.target as HTMLSelectElement).value;
        const priceLabel = card.querySelector(".text-2xl");
        if (priceLabel) priceLabel.textContent = price;
      });
    });

    // 卡片选中效果
    const cards = document.querySelectorAll("[data-plan-id]");
    cards.forEach(card => {
      const planId = (card as HTMLElement).dataset?.planId ? Number((card as HTMLElement).dataset?.planId) : undefined;
      card.addEventListener("click", () => {
        cards.forEach(c => c.classList.remove("ring-2", "ring-indigo-500"));
        card.classList.add("ring-2", "ring-indigo-500");
        setSelectedPackageId(planId);
      });
      card.getElementsByClassName("package-pay")[0]?.addEventListener("click", () => {
        startPay(planId);
      });
    });
  }

  return null;
}
