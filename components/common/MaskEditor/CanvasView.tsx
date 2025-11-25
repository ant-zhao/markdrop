import { useEffect, useRef } from "react";
import { CanvasRenderer } from "@/components/common/MaskEditor/canvasRenderer";
import { ToolManager } from "@/components/common/MaskEditor/tools/ToolManager";
import { ToolType } from "@/components/common/MaskEditor/tools/interface";
import Cursor, { getCursor } from "@/components/common/Cursor";
import { useMaskStore } from "@/stores/useMaskStore";
import { events, EventType } from "@/lib/events";

interface CanvasViewProps {
  image: File | null;
}

const CanvasView = ({ image }: CanvasViewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    loading,
    canvasRender,
    showMask,
    tool,
    brushRadius,
    isPan,
    isFullscreen,
    setIsPan,
    setCanvasRender,
    setBrushRadius,
    getBrushRadius,
  } = useMaskStore();
  const currentRender = useRef<CanvasRenderer | null>(canvasRender);
  const manager = useRef<ToolManager | null>(null);

  const initRenderer = async () => {
    if (!containerRef.current || !image) return;
    let renderer = currentRender.current;
    if (renderer) {
      renderer.updateImage(containerRef.current, image);
    } else {
      currentRender.current = new CanvasRenderer(containerRef.current, image);
      setCanvasRender(currentRender.current);
      await currentRender.current.init();
    }

    const maskView = currentRender.current?.getMaskView();
    const assistantView = currentRender.current?.getAssistantView();
    if (!maskView || !assistantView) return;

    if (!manager.current) {
      manager.current = new ToolManager(maskView, assistantView);
    }
    manager.current.setRadius(brushRadius);
    manager.current.setTool(tool);
    addListener();
    updateCursor();
  };

  const handlePointerDown = (e: any) => {
    if (loading) return;
    manager.current?.handlePointerDown(e);
  }

  const handlePointerUp = (e: any) => {
    if (loading) return;
    manager.current?.handlePointerUp(e);
  }

  const handlePointerOver = (e: any) => {
    if (loading) return;
    manager.current?.handlePointerOver(e);
  }

  const handlePointerOut = (e: any) => {
    if (loading) return;
    manager.current?.handlePointerOut(e);
  }

  const handlePointerMove = (e: any) => {
    if (loading) return;
    manager.current?.handlePointerMove(e);
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!manager.current || ![ToolType.BRUSH, ToolType.ERASER].includes(tool)) return;
    switch (e.key) {
      case "=":
      case "-":
        let newRadius = getBrushRadius();
        if (e.key === "=") {
          newRadius += 5;
        } else {
          newRadius -= 5;
        }
        setBrushRadius(newRadius);
        break;
    }
  }

  const addListener = () => {
    const maskView = currentRender.current?.getMaskView();
    const stage = currentRender.current?.getApp()?.stage;
    maskView?.on("pointerdown", handlePointerDown)
      .on("pointerup", handlePointerUp);

    stage?.on("pointerenter", handlePointerOver)
      .on("pointerleave", handlePointerOut)
      .on("pointermove", handlePointerMove);

    document.addEventListener("keydown", handleKeyDown);
  }

  const removeListener = () => {
    const maskView = currentRender.current?.getMaskView();
    const stage = currentRender.current?.getApp()?.stage;

    maskView?.off("pointerdown", handlePointerDown)
      .off("pointerup", handlePointerUp);

    stage?.off("pointerenter", handlePointerOver)
      .off("pointerleave", handlePointerOut)
      .off("pointermove", handlePointerMove);

    document.removeEventListener("keydown", handleKeyDown);
  }

  useEffect(() => {
    currentRender.current?.resize();
  }, [isFullscreen]);

  useEffect(() => {
    initRenderer();
  }, [containerRef, image]);

  useEffect(() => {
    manager.current?.setTool(tool);
    updateCursor();
  }, [tool]);

  useEffect(() => {
    manager.current?.setRadius(brushRadius);
  }, [brushRadius]);

  useEffect(() => {
    currentRender.current?.setMaskVisible(showMask);
  }, [showMask]);

  useEffect(() => {
    initRenderer();
    events.canvasEmitter.on(EventType.PAN, updatePanState);
    return () => {
      events.canvasEmitter.off(EventType.PAN, updatePanState);
      destory();
    }
  }, [])

  const updatePanState = (panning: boolean) => {
    setIsPan(panning);
  }

  useEffect(() => {
    updateCursor();
  }, [isPan]);

  const updateCursor = () => {
    if (!containerRef.current) return;
    if (isPan) {
      containerRef.current.style.cursor = getCursor(Cursor.GRABBING);
      return;
    }
    switch (tool) {
      case ToolType.BRUSH:
        containerRef.current.style.cursor = getCursor(Cursor.POINTER);
        break;
      case ToolType.LASSO:
        containerRef.current.style.cursor = getCursor(Cursor.POINTER_LASSO);
        break;
      case ToolType.RECT:
        containerRef.current.style.cursor = getCursor(Cursor.CROSSHAIR);
        break;
      case ToolType.ERASER:
        containerRef.current.style.cursor = getCursor(Cursor.POINTER_ERASER);
        break;
      default:
        containerRef.current.style.cursor = getCursor(Cursor.DEFAULT);
        break;
    }
  }

  const destory = () => {
    console.log('destory');
    manager.current?.destroy();
    manager.current = null;
    removeListener();
  }

  return <div ref={containerRef} className="w-full h-full"></div>;
}

export default CanvasView;