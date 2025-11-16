import { create } from 'zustand';
import { ToolType } from '@/components/common/MaskEditor/tools/interface';
import { MAX_HISTORY_LENGTH } from '@/utils/constants';
import { CanvasRenderer } from '@/components/common/MaskEditor/canvasRenderer';
import { RemoveType } from '@/types/remove';

interface MaskState {
  loading: boolean;
  removeType: RemoveType;
  visible: boolean;
  isFullscreen: boolean;
  image: File | null;
  tool: ToolType;
  isPan: boolean;
  showMask: boolean;
  history: ImageData[];
  currentIndex: number;
  canvasRender: CanvasRenderer | null;
  push: (data: ImageData) => void;
  undo: () => void;
  redo: () => void;
  toggleVisible: (v: boolean) => void;
  toggleMask: () => void;
  current: () => ImageData | null;
  setImage: (image: File | null) => void;
  setTool: (tool: ToolType) => void;
  setIsPan: (isPan: boolean) => void;
  setRemoveType: (type: RemoveType) => void;
  setLoading: (loading: boolean) => void;
  setIsFullscreen: (isFullscreen: boolean) => void;
  setCanvasRender: (canvasRender: CanvasRenderer | null) => void;
}

export const useMaskStore = create<MaskState>((set, get) => ({
  loading: false,
  removeType: RemoveType.AUTO,
  image: null,
  imageUrl: null,
  visible: false,
  tool: ToolType.BRUSH,
  isPan: false,
  showMask: true,
  history: [],
  currentIndex: -1,
  isFullscreen: false,
  canvasRender: null,
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
    set({ image });
  },

  setTool: (tool) => set({ tool }),

  setIsPan: (isPan) => set({ isPan }),

  setRemoveType: (type) => {
    set({ removeType: type, visible: type === RemoveType.MANUAL });
  },

  setLoading: (loading) => set({ loading }),

  setIsFullscreen: (isFullscreen) => set({ isFullscreen }),

  setCanvasRender: (canvasRender) => set({ canvasRender }),
}));
