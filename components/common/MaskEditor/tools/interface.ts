import { Graphics, FederatedPointerEvent } from "pixi.js";

export interface DrawingTool {
  onPointerDown(e: FederatedPointerEvent): void;
  onPointerMove(e: FederatedPointerEvent): void;
  onPointerUp(e: FederatedPointerEvent): void;
  onPointerOver(e: FederatedPointerEvent): void;
  onPointerOut(e: FederatedPointerEvent): void;
  setRadius?: (r: number) => void;
  destroy(): void;
}

export enum ToolType {
  BRUSH = "brush",
  RECT = "rect",
  LASSO = "lasso",
  ERASER = "eraser",
}
