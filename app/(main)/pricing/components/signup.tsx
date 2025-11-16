"use client";

import { useUserStore } from "@/stores/useUser";

export default () => {
  const { userInfo } = useUserStore();

  if (userInfo?.id) {
    return null;
  }

  return (
    <a href="/auth/signup" className="text-[#5B70F8] hover:underline ml-1">
      Sign up for free
    </a>
  );
}