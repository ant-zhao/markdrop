import { useEffect, useRef } from "react";
import { Loader } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { useConfigurationStore } from "@/stores/useConfig";
import { useUserStore } from "@/stores/useUser";
import { googleOAuthURL } from "@/lib/utils";

export default function GoogleButton({ redirectUri }: { redirectUri: string }) {
  const renderedRef = useRef(false);
  const { googleLoaded } = useConfigurationStore();
  const { handleCredentialResponse, setLoading, loading } = useUserStore();

  // useEffect(() => {
  //   renderButton();
  // }, [googleLoaded]);

  // useEffect(() => {
  //   renderButton();
  // }, []);

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
      { theme: 'outline', size: 'large', width: '100%' }
    );
  }

  const onClick = async () => {
    setLoading(true);
    const link = await googleOAuthURL(redirectUri);
    window.location.href = link;
  }

  return (
    <Button
      type="button"
      variant="outline"
      disabled={loading}
      className="w-full flex items-center justify-center gap-2 border-gray-300 cursor-pointer hover:bg-[#5b70f8]/10"
      onClick={onClick}
    >
      {loading ? <Loader className="animate-spin" size={20} /> : <FcGoogle size={20} />}
      Continue with Google
    </Button>
  )

  return (
    <div id="googleSignInDiv"></div>
  );
}
