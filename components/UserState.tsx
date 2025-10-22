
'use client'

import { Button } from '@headlessui/react';
// import { useConfigurationStore } from "@/stores/useConfig";
import Link from 'next/link';

const UserState = () => {
  return (
    <div className='flex-shrink-0 items-center gap-x-4 hidden sm:flex'>
      <Link href="/auth/login">
        <Button
          className="text-white bg-[#314af0]/80 hover:bg-[#314af0] px-4 h-[32px] rounded-[16px] cursor-pointer"
        >
          Login
        </Button>
      </Link>
    </div>
  )
}

export default UserState;
