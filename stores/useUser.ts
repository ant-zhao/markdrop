// stores/userStore.ts
import { toast } from "sonner";
import { create } from "zustand";
import { USER_MODE } from "@/types/user";
import { loginApi } from "@/lib/api";
import { hashSHA256 } from "@/utils";
import { CacheKey, SUCCESS_CODE } from "@/utils/constants";

export type User = {
  id: string;
  googleId: string;
  name: string;
  email: string;
  avatarUrl: string;
  pointBalance: number;
} | null;

interface UserState {
  loading: boolean;
  accessToken: string;
  userMode: USER_MODE;
  userInfo: User;
  setAccessToken: (accessToken: string) => void;
  setUser: (user: User) => void;
  setUserMode: (mode: USER_MODE) => void;
  clearUser: () => void;
  handleCredentialResponse: (response: google.accounts.id.CredentialResponse) => Promise<any>;
  handleCodeVerifierResponse: (code: string) => Promise<any>;
  setLoading: (loading: boolean) => void;
}

const handleCredentialResponse = async (response: google.accounts.id.CredentialResponse, set: (state: Partial<UserState>) => void) => {
  const idToken = response.credential; // <-- 这里就是 Google 的 id_token
  const res = await loginApi({ idToken });

  if (res.code !== SUCCESS_CODE) {
    toast.error(res.message);
    return;
  }

  const { accessToken } = res.data;
  localStorage.setItem(hashSHA256(CacheKey.ACCESS_TOKEN), accessToken);
  set({ accessToken, loading: false });
}

const handleCodeVerifierResponse = async (
  code: string,
  set: (state: Partial<UserState>) => void,
) => {
  const codeVerifier = localStorage.getItem(hashSHA256(CacheKey.GOOGLE_CODE_VERIFIER));
  if (!codeVerifier) {
    toast.error("Code verifier not found");
    return;
  }
  localStorage.removeItem(hashSHA256(CacheKey.GOOGLE_CODE_VERIFIER));
  const res = await loginApi({ authorizationCode: code, codeVerifier });

  if (res.code !== SUCCESS_CODE) {
    toast.error(res.message);
    return;
  }

  const { accessToken } = res.data;
  localStorage.setItem(hashSHA256(CacheKey.ACCESS_TOKEN), accessToken);
  set({ accessToken, loading: false });
}

export const useUserStore = create<UserState>((set) => ({
  loading: false,
  accessToken: "",
  userMode: USER_MODE.UNKNOWN,
  userInfo: null,
  setAccessToken: (accessToken: string) => set({ accessToken }),
  setUserMode: (mode) => set({ userMode: mode }),
  setUser: (user: User) => set({ userInfo: user }),
  clearUser: () => set({ userInfo: null, userMode: USER_MODE.LOGOUT }),
  handleCredentialResponse: (response: google.accounts.id.CredentialResponse) => {
    return handleCredentialResponse(response, set);
  },
  handleCodeVerifierResponse: (code: string) => {
    return handleCodeVerifierResponse(code, set);
  },
  setLoading: (loading: boolean) => set({ loading }),
}));
