'use client';
import { useEffect, useRef } from 'react';
import { USER_MODE } from '@/types/user';
import { useConfigurationStore } from '@/stores/useConfig';
import { useUserStore } from '@/stores/useUser';

interface Props {
  mode: USER_MODE
}

export default function GoogleLoginPop({ mode }: Props) {
  const { googleLoaded } = useConfigurationStore();
  const { handleCredentialResponse } = useUserStore();
  const renderedRef = useRef(false);

  useEffect(() => {
    initGoogleLogin();
  }, [mode, googleLoaded]);

  useEffect(() => {
    initGoogleLogin();
  }, []);

  const initGoogleLogin = () => {
    const lastPopTime = localStorage.getItem('last_pop_time');
    if (lastPopTime && Date.now() - parseInt(lastPopTime) < 1000 * 60 * 60 * 24) {
      return;
    }
    if (!(mode !== USER_MODE.LOGGED_IN && googleLoaded) || renderedRef.current) {
      return;
    }
    renderedRef.current = true;
    console.log("Google login initialized");
    window.google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      callback: handleCredentialResponse,
    });
    window.google.accounts.id.prompt(); // 显示浮窗
    localStorage.setItem('last_pop_time', Date.now().toString());
  }

  return null;
}
