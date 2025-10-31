// stores/userStore.ts
import { create } from "zustand";

export type Configuration = {
  loginVisible: boolean;
  theme: string;
}

interface ConfigurationState {
  googleLoaded: boolean;
  configuration: Configuration;
  setLoginVisible: (loginVisible: boolean) => void;
  setGoogleLoaded: (googleLoaded: boolean) => void;
}

export const useConfigurationStore = create<ConfigurationState>((set) => ({
  googleLoaded: false,
  configuration: {
    loginVisible: false,
    theme: 'light',
  },
  setLoginVisible: (loginVisible) => set((state) => ({
    configuration: {
      ...state.configuration,
      loginVisible,
    },
  })),
  setGoogleLoaded: (googleLoaded) => set({ googleLoaded }),
}));
