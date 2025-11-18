"use client"

import { useEffect } from "react";
import { redirect, useSearchParams } from "next/navigation";
import { useUserStore } from "@/stores/useUser";
import SideBanner from "./components/SideBanner";
import { USER_MODE } from "@/types/user";
import { hashSHA256 } from "@/utils";
import "./index.scss";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useSearchParams();
  const { userMode } = useUserStore();

  useEffect(() => {
    if (userMode === USER_MODE.LOGGED_IN) {
      const returnTo = params.get('returnTo');
      const backUrl = returnTo ? decodeURIComponent(returnTo) : "/";
      redirect(backUrl);
    }
  }, [userMode]);

  useEffect(() => {
    localStorage.removeItem(hashSHA256('accessToken'));
  }, [])

  return (
    <>
      {/* <Header pathname="/auth" /> */}
      <div className="bg-[#f0f0f0] h-screen overflow-hidden flex text-gray-900">
        <SideBanner />
        {children}
      </div>
    </>
  );
}
