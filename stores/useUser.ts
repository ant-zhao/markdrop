// stores/userStore.ts
import { create } from "zustand";
import { USER_MODE } from "@/types/user";
import { post } from "@/lib/request";

export type User = {
  id: string;
  name: string;
} | null;

interface UserState {
  userMode: USER_MODE;
  userInfo: User;
  setUser: (id: string, name: string) => void;
  setUserMode: (mode: USER_MODE) => void;
  clearUser: () => void;
  handleCredentialResponse: (response: google.accounts.id.CredentialResponse) => Promise<any>;
}

const handleCredentialResponse = async (response: google.accounts.id.CredentialResponse, set: (state: Partial<UserState>) => void) => {
  const idToken = response.credential; // <-- 这里就是 Google 的 id_token
  // 调用你后端接口
  const res = await post('/user/v1/login', {
    idToken,
  });

  if (res.data.code === 200) {
    set({ userMode: USER_MODE.LOGGED_IN, userInfo: res.data.data });
  }

  return res.data;
}

export const useUserStore = create<UserState>((set) => ({
  userMode: USER_MODE.UNKNOWN,
  userInfo: null,
  setUserMode: (mode) => set({ userMode: mode }),
  setUser: (id, name) => set({ userInfo: { id, name } }),
  clearUser: () => set({ userInfo: null, userMode: USER_MODE.LOGOUT }),
  handleCredentialResponse: (response: google.accounts.id.CredentialResponse) => {
    return handleCredentialResponse(response, set);
  }
}));
