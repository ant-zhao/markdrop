"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useUserStore } from "@/stores/useUser";
import GoogleLoginPop from "@/components/common/GoogleLoginPop";
import { authPages } from "@/data/headerNavLinks";
import { USER_MODE } from "@/types/user";
import { toast } from "sonner";

export default function ClientComponent() {
  const pathname = usePathname();
  const { userMode } = useUserStore();

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    checkOuth();
  }, [pathname]);

  const init = () => {
  }

  const checkOuth = () => {
    if (authPages.find(page => pathname.startsWith(page)) && userMode !== USER_MODE.LOGGED_IN) {
      setTimeout(() => {
        toast.error("Please login first");
      }, 500);
    }
  }

  return (
    <>
      <GoogleLoginPop mode={userMode} />
    </>
  );
}
