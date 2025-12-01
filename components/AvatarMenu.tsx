'use client';

import { useRouter } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User } from "lucide-react";
import { hashSHA256 } from "@/utils";
import { useUserStore } from "@/stores/useUser";
import { USER_MODE } from "@/types/user";
import { CacheKey } from "@/utils/constants";

export default function UserAvatarMenu() {
  const router = useRouter();
  const { userInfo, setUserMode, setUser } = useUserStore();

  const handleProfile = () => {
    router.push("/profile");
  };

  const handleLogout = () => {
    setUserMode(USER_MODE.LOGOUT);
    setUser(null);
    localStorage.removeItem(hashSHA256(CacheKey.ACCESS_TOKEN));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-full shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
          <Avatar className="w-9 h-9">
            <AvatarImage src={userInfo?.avatarUrl} alt="User avatar" />
            <AvatarFallback className="bg-indigo-100">{userInfo?.name?.slice(0, 1)}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48 mt-2 bg-white shadow-2xl border-0">
        <DropdownMenuLabel>{userInfo?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleProfile} className="cursor-pointer">
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500 focus:text-red-500">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
