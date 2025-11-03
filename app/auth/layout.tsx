"use client"

import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useUserStore } from "@/stores/useUser";
import SideBanner from "./components/SideBanner";
import { USER_MODE } from "@/types/user";
import "./index.scss";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userMode } = useUserStore();

  useEffect(() => {
    if (userMode === USER_MODE.LOGGED_IN) {
      redirect("/");
    }
  }, [userMode]);

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
