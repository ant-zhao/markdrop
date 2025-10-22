// stores/userStore.ts
import { create } from "zustand";

export type CustomPlanData = {
  label: string;
  price: string;
}

export type PlanData = {
  payAnnually: boolean;
}

interface PlanState {
  plan: PlanData;
  customPlan: CustomPlanData;
  setCustomPlan: (plan: CustomPlanData) => void;
  setPayAnnually: (payAnnually: boolean) => void;
}

export const usePlanStore = create<PlanState>((set) => ({
  customPlan: { label: "500 credits", price: "$38" },
  plan: {
    payAnnually: true,
  },
  setCustomPlan: (plan) => set((state) => ({
    customPlan: {
      ...state.customPlan,
      ...plan,
    },
  })),
  setPayAnnually: (payAnnually) => set((state) => ({
    plan: {
      ...state.plan,
      payAnnually,
    },
  })),
}));
