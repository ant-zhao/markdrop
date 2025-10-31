"use client"

import Script from "next/script";
import { useConfigurationStore } from "@/stores/useConfig";

export default function LayoutClientComponent() {
  const { setGoogleLoaded } = useConfigurationStore();

  const handleGoogleScriptLoad = () => {
    console.log("Google script loaded");
    setGoogleLoaded(true);
  };

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
