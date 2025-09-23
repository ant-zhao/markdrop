// stores/userStore.ts
import { create } from "zustand";

export type User = {
  id: string;
  name: string;
} | null;

interface UserState {
  user: User;
  setUser: (id: string, name: string) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (id, name) => set({ user: { id, name } }),
  clearUser: () => set({ user: null }),
}));
