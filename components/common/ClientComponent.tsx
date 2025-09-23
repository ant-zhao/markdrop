"use client";

import LoginModal from "@/components/common/LoginModal";
import { useConfigurationStore } from "@/stores/useConfig";

export default function ClientComponent() {
  const { configuration, setLoginVisible } = useConfigurationStore();

  const closeLoginModal = () => {
    setLoginVisible(false);
  };

  return (
    <>
      {configuration.loginVisible && <LoginModal onClose={closeLoginModal} />}
    </>
  );
}
