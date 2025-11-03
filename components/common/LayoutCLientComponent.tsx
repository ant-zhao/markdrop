"use client"

import { useEffect } from "react";
import { toast } from "sonner";
import Script from "next/script";
import { useConfigurationStore } from "@/stores/useConfig";
import { useUserStore } from "@/stores/useUser";
import { getUserInfoApi } from "@/lib/api";
import { hashSHA256 } from "@/utils";
import { SUCCESS_CODE } from "@/utils/constants";
import { USER_MODE } from "@/types/user";

export default function LayoutClientComponent() {
  const { setGoogleLoaded } = useConfigurationStore();
  const { accessToken, setAccessToken, setUser, setUserMode } = useUserStore();

  const handleGoogleScriptLoad = () => {
    console.log("Google script loaded");
    setGoogleLoaded(true);
  };

  useEffect(() => {
    const accessToken = localStorage.getItem(hashSHA256('accessToken'));
    if (accessToken) {
      setAccessToken(accessToken);
    }
  }, []);

  useEffect(() => {
    getUserInfo();
  }, [accessToken]);

  const getUserInfo = async () => {
    if (!accessToken) return;
    const res2 = await getUserInfoApi();
    if (res2.code !== SUCCESS_CODE) {
      toast.error(res2.message);
      return;
    }

    setUser(res2.data);
    setUserMode(USER_MODE.LOGGED_IN);
  }


  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={handleGoogleScriptLoad}
      />
    </>
  );
}
