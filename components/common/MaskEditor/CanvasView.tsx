import { useEffect, useRef } from "react";
import { useCanvasRenderer } from "./useCanvasRenderer";
import { useMaskStore } from "@/stores/useMaskStore";
import { Graphics, FederatedPointerEvent } from "pixi.js";
import { ToolManager } from "./tools/ToolManager";
import { ToolType } from "./tools/interface";

interface CanvasViewProps {
  imageUrl: string | null;
  activeTool: ToolType;
}

export default function CanvasView({ imageUrl, activeTool }: CanvasViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useCanvasRenderer(containerRef, imageUrl);
  const { showMask } = useMaskStore();
  const maskLayer = useRef<Graphics>(null);
  const manager = useRef<ToolManager | null>(null);

  useEffect(() => {
    if (!appRef.current) return;
    const app = appRef.current;
    maskLayer.current = new Graphics();
    app.stage.addChild(maskLayer.current);

    manager.current = new ToolManager(maskLayer.current);
    manager.current.setTool(activeTool);

    app.stage.eventMode = "static";
    app.stage
      .on("pointerdown", (e: FederatedPointerEvent) => manager.current?.handlePointerDown(e))
      .on("pointermove", (e: FederatedPointerEvent) => manager.current?.handlePointerMove(e))
      .on("pointerup", (e: FederatedPointerEvent) => manager.current?.handlePointerUp(e))
      .on("pointerupoutside", (e: FederatedPointerEvent) => manager.current?.handlePointerUp(e));

    return () => {
      if (maskLayer.current) {
        app.stage.removeChild(maskLayer.current);
        maskLayer.current.destroy();
      }
    };
  }, [appRef]);

  useEffect(() => {
    if (!manager.current) return;
    manager.current.setTool(activeTool);
  }, [activeTool]);

  useEffect(() => {
    if (appRef.current) {
      appRef.current.stage.visible = showMask;
    }
  }, [showMask]);

  return <div ref={containerRef} className="w-full h-full"></div>;
}
