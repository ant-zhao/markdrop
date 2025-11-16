"use client";
import { useEffect } from "react";

export default () => {

  useEffect(() => {
    init();
  }, []);

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
    document.querySelectorAll("[data-plan-id]").forEach(card => {
      card.addEventListener("click", () => {
        document.querySelectorAll("[data-plan-id]").forEach(c => c.classList.remove("ring-2", "ring-indigo-500"));
        card.classList.add("ring-2", "ring-indigo-500");
      });
    });
  }

  return null;
}
