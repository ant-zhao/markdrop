
'use client'

import Link from 'next/link';
import { Button } from '@headlessui/react';
import { useUserStore } from '@/stores/useUser';
import AvatarMenu from '@/components/AvatarMenu';
import { USER_MODE } from '@/types/user';

const UserState = () => {
  const { userMode, userInfo } = useUserStore();

  if (userMode === USER_MODE.LOGGED_IN && userInfo?.id) {
    return <AvatarMenu />
  }

  return (
    <div className='flex-shrink-0 items-center gap-x-4 hidden sm:flex'>
      <Link href={`/auth/login?returnTo=${encodeURIComponent(window.location.href)}`}>
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
