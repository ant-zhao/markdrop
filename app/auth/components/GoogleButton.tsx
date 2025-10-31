import { useEffect, useRef } from "react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { useConfigurationStore } from "@/stores/useConfig";
import { useUserStore } from "@/stores/useUser";

export default function GoogleButton() {
  const renderedRef = useRef(false);
  const { googleLoaded } = useConfigurationStore();
  const { handleCredentialResponse } = useUserStore();

  useEffect(() => {
    renderButton();
  }, [googleLoaded]);

  useEffect(() => {
    renderButton();
  }, []);

  const renderButton = () => {
    if (renderedRef.current || !googleLoaded) return;
    renderedRef.current = true;

    // 初始化 Google 登录按钮
    /* global google */
    window.google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      callback: handleCredentialResponse,
    });

    window.google.accounts.id.renderButton(
      document.getElementById('googleSignInDiv')!,
      { theme: 'outline', size: 'large' }
    );
  }

  return (
    <div id="googleSignInDiv"></div>
  );
}
