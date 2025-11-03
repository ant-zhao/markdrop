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

    const buttonDom = document.getElementById('googleSignInDiv')!;
    if (!buttonDom) return;

    // 初始化 Google 登录按钮
    /* global google */
    window.google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      callback: handleCredentialResponse,
    });

    window.google.accounts.id.renderButton(
      buttonDom,
      { theme: 'outline', size: 'large' }
    );
  }

  const onClick = () => {
    handleCredentialResponse({
      credential: "test",
      select_by: "user",
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
    })
  }

  return (
    <Button
      type="button"
      variant="outline"
      className="w-full flex items-center justify-center gap-2 border-gray-300 cursor-pointer hover:bg-[#5b70f8]/10"
      onClick={onClick}
    >
      <FcGoogle size={20} />
      Continue with Google
    </Button>
  )

  return (
    <div id="googleSignInDiv"></div>
  );
}
