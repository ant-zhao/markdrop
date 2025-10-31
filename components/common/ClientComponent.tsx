"use client";

import { useEffect } from "react";
import { useUserStore } from "@/stores/useUser";
import GoogleLoginPop from "@/components/common/GoogleLoginPop";

export default function ClientComponent() {
  const { userMode } = useUserStore();

  useEffect(() => {
    init();
  }, []);

  const init = () => {

  }

  return (
    <>
      <GoogleLoginPop mode={userMode} />
    </>
  );
}
