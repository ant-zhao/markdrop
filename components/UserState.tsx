
'use client'

import { Button } from '@headlessui/react';
import { useConfigurationStore } from "@/stores/useConfig";

const UserState = () => {
  const { setLoginVisible } = useConfigurationStore();

  const openLoginModal = () => {
    setLoginVisible(true);
  };

  return (
    <div className='flex-shrink-0 items-center gap-x-4 hidden sm:flex'>
      <Button
        className="text-white bg-[#5B70F8] px-4 h-[32px] rounded-[16px]"
        onClick={openLoginModal}
      >
        Login
      </Button>
    </div>
  )
}

export default UserState;
