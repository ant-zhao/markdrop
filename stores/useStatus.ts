// stores/userStore.ts
import { create } from "zustand";
import PageCommunicator from "@/lib/page-communicator";

interface StatusState {
  communicator: PageCommunicator | null;

  setCommunicator: (communicator: PageCommunicator) => void;
}

export const useStatusStore = create<StatusState>((set) => ({
  communicator: null,
  setCommunicator: (communicator: PageCommunicator) => set({ communicator }),
}));
