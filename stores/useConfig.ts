// stores/userStore.ts
import { create } from "zustand";

export type Configuration = {
  loginVisible: boolean;
  theme: string;
}

interface ConfigurationState {
  configuration: Configuration;
  setLoginVisible: (loginVisible: boolean) => void;
}

export const useConfigurationStore = create<ConfigurationState>((set) => ({
  configuration: { loginVisible: false, theme: 'light' },
  setLoginVisible: (loginVisible) => set((state) => ({
    configuration: {
      ...state.configuration,
      loginVisible,
    },
  })),
}));
