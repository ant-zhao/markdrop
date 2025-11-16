import { Graphics } from "pixi.js";
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
  const { canvasRender, showMask, tool, isPan, isFullscreen, setIsPan, setCanvasRender } = useMaskStore();
  const maskLayer = useRef<Graphics>(null);
  const manager = useRef<ToolManager | null>(null);

  const initRenderer = async () => {
    if (!containerRef.current || !image) return;
    let renderer = canvasRender;
    if (renderer) {
      renderer.updateImage(image);
      return;
    }
    renderer = new CanvasRenderer(containerRef.current, image);
    setCanvasRender(renderer);
    await renderer.init();

    const maskView = renderer.getMaskView();
    const assistantView = renderer.getAssistantView();
    if (!maskView || !assistantView) return;

    manager.current = new ToolManager(maskView, assistantView);
    manager.current.setRadius(50);
    manager.current.setTool(tool);
    const stage = renderer.getApp()?.stage!;

    maskView
      .on("pointerdown", manager.current?.handlePointerDown)
      .on("pointerup", manager.current?.handlePointerUp);

    stage
      .on("pointerenter", manager.current?.handlePointerOver)
      .on("pointerleave", manager.current?.handlePointerOut)
      .on("pointermove", manager.current?.handlePointerMove);

    updateCursor();
  }

  useEffect(() => {
    canvasRender?.resize();
  }, [isFullscreen]);

  useEffect(() => {
    initRenderer();
  }, [containerRef, image]);

  useEffect(() => {
    manager.current?.setTool(tool);
    updateCursor();
  }, [tool]);

  useEffect(() => {
    canvasRender?.setMaskVisible(showMask);
  }, [showMask]);

  useEffect(() => {
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
    const maskView = canvasRender?.getMaskView();
    const stage = canvasRender?.getApp()?.stage;

    maskView?.off("pointerdown", manager.current?.handlePointerDown)
      .off("pointerup", manager.current?.handlePointerUp);

    stage?.off("pointerenter", manager.current?.handlePointerOver)
      .off("pointerleave", manager.current?.handlePointerOut)
      .off("pointermove", manager.current?.handlePointerMove);

    manager.current?.destroy();
    canvasRender?.destroy();
    setCanvasRender(null);
    maskLayer.current = null;
    manager.current = null;
  }

  return <div ref={containerRef} className="w-full h-full"></div>;
}

export default CanvasView;