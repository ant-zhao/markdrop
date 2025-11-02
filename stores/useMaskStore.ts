import { create } from 'zustand';
import { ToolType } from '@/components/common/MaskEditor/tools/interface';
import { MAX_HISTORY_LENGTH } from '@/utils/constants';
import { RemoveType } from '@/types/remove';

interface MaskState {
  removeType: RemoveType;
  visible: boolean;
  image: File | null;
  imageUrl: string | null;
  tool: ToolType;
  showMask: boolean;
  history: ImageData[];
  currentIndex: number;
  push: (data: ImageData) => void;
  undo: () => void;
  redo: () => void;
  toggleVisible: (v: boolean) => void;
  toggleMask: () => void;
  current: () => ImageData | null;
  setImage: (image: File | null) => void;
  setTool: (tool: ToolType) => void;
  setRemoveType: (type: RemoveType) => void;
}

export const useMaskStore = create<MaskState>((set, get) => ({
  removeType: RemoveType.AUTO,
  image: null,
  imageUrl: null,
  visible: false,
  tool: ToolType.BRUSH,
  showMask: true,
  history: [],
  currentIndex: -1,

  push: (data) => {
    const { history, currentIndex } = get();
    const start = history.length >= MAX_HISTORY_LENGTH ? history.length - MAX_HISTORY_LENGTH : 0;
    const newHistory = history.slice(start, currentIndex + 1);
    newHistory.push(data);
    set({ history: newHistory, currentIndex: newHistory.length - 1 });
  },

  undo: () => {
    const { currentIndex } = get();
    if (currentIndex > 0) set({ currentIndex: currentIndex - 1 });
  },

  redo: () => {
    const { currentIndex, history } = get();
    if (currentIndex < history.length - 1) set({ currentIndex: currentIndex + 1 });
  },

  toggleMask: () => set((s) => ({ showMask: !s.showMask })),

  toggleVisible: (v) => set((s) => ({ visible: v ?? !s.visible })),

  current: () => {
    const { history, currentIndex } = get();
    return history[currentIndex] ?? null;
  },

  setImage: (image) => {
    const imageUrl = image ? URL.createObjectURL(image) : null;
    set({ image, imageUrl });
  },

  setTool: (tool) => set({ tool }),

  setRemoveType: (type) => {
    set({ removeType: type, visible: type === RemoveType.MANUAL });
  },
}));
