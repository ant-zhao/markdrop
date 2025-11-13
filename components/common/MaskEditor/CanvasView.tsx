import { useEffect, useRef } from "react";
import { CanvasRenderer } from "./canvasRenderer";
import { useMaskStore } from "@/stores/useMaskStore";
import { Graphics, FederatedPointerEvent } from "pixi.js";
import { ToolManager } from "./tools/ToolManager";
import { ToolType } from "./tools/interface";

interface CanvasViewProps {
  image: File | null;
  activeTool: ToolType;
}

const CanvasView = ({ image, activeTool }: CanvasViewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRender = useRef<CanvasRenderer>(null);
  const { showMask } = useMaskStore();
  const maskLayer = useRef<Graphics>(null);
  const manager = useRef<ToolManager | null>(null);

  const initRenderer = async () => {
    if (!(containerRef.current && image) || canvasRender.current) return;
    canvasRender.current = new CanvasRenderer(containerRef.current, image);
    await canvasRender.current.init();

    const maskView = canvasRender.current.getMaskView();
    if (!maskView) return;

    manager.current = new ToolManager(maskView);
    manager.current.setRadius(50);
    manager.current.setTool(activeTool);
    const stage = canvasRender.current?.getApp()?.stage!;

    maskView
      .on("pointerdown", manager.current?.handlePointerDown)
      .on("pointerup", manager.current?.handlePointerUp);

    stage
      .on("pointerupoutside", manager.current?.handlePointerUp)
      .on("pointermove", manager.current?.handlePointerMove);
  }

  useEffect(() => {
    initRenderer();
  }, [containerRef, image]);

  useEffect(() => {
    manager.current?.setTool(activeTool);
  }, [activeTool]);

  useEffect(() => {
    canvasRender.current?.setMaskVisible(showMask);
  }, [showMask]);

  useEffect(() => {
    return () => {
      manager.current?.destroy();
      canvasRender.current?.destroy();
      canvasRender.current = null;
      maskLayer.current = null;
      manager.current = null;
    }
  }, [])

  return <div ref={containerRef} className="w-full h-full"></div>;
}

export default CanvasView;