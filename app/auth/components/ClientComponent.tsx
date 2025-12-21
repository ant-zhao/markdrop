"use client"

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useUserStore } from "@/stores/useUser";
import { USER_MODE } from "@/types/user";
import { hashSHA256 } from "@/utils";
import { CacheKey } from "@/utils/constants";
import { redirect } from "next/navigation";

export default function AuthClientComponent() {
  const params = useSearchParams();
  const { userMode, handleCodeVerifierResponse } = useUserStore();

  useEffect(() => {
    if (userMode === USER_MODE.LOGGED_IN) {
      const state = params.get('state');
      const redirectUri = params.get('redirect_uri') || (state && state.indexOf('http') === 0 ? state : '/');
      const backUrl = redirectUri ? decodeURIComponent(redirectUri) : "/";
      redirect(backUrl);
    }
  }, [userMode]);

  useEffect(() => {
    localStorage.removeItem(hashSHA256(CacheKey.ACCESS_TOKEN));
    const code = params.get('code');
    if (code) {
      handleCodeVerifierResponse(code);
    }
    return () => {
      localStorage.removeItem(hashSHA256(CacheKey.GOOGLE_CODE_VERIFIER));
    }
  }, [])

  return null;
}
