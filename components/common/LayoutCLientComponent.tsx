"use client"

import Script from "next/script";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import { useConfigurationStore } from "@/stores/useConfig";
import { SUCCESS_CODE, CacheKey } from "@/utils/constants";
import { useUserStore } from "@/stores/useUser";
import { getUserInfoApi } from "@/lib/api";
import { USER_MODE } from "@/types/user";
import { hashSHA256 } from "@/utils";

export default function LayoutClientComponent() {
  const [initialized, setInitialized] = useState(false);
  const { setGoogleLoaded } = useConfigurationStore();
  const { accessToken, setAccessToken, setUser, setUserMode } = useUserStore();

  const handleGoogleScriptLoad = () => {
    setGoogleLoaded(true);
  };

  useEffect(() => {
    if (initialized) return;
    const accessToken = localStorage.getItem(hashSHA256(CacheKey.ACCESS_TOKEN));
    if (accessToken) {
      setAccessToken(accessToken);
    }
    setInitialized(true);
  }, []);

  useEffect(() => {
    getUserInfo();
  }, [accessToken]);

  const getUserInfo = async () => {
    if (!accessToken) {
      setUserMode(USER_MODE.LOGOUT);
      return;
    }
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
      {initialized && <Toaster
        position="top-right" // 配置提示位置
        duration={5000} // 提示显示时长
      />}
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={handleGoogleScriptLoad}
      />
    </>
  );
}
