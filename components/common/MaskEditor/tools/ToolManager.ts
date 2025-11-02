import { BrushTool } from "./BrushTool";
import { RectTool } from "./RectTool";
import { LassoTool } from "./LassoTool";
import { EraserTool } from "./EraserTool";
import type { DrawingTool } from "./interface";
import { FederatedPointerEvent, Graphics } from "pixi.js";

export type ToolType = "brush" | "rect" | "lasso" | "eraser";

export class ToolManager {
  private tool: DrawingTool | null = null;
  private currentType: ToolType | null = null;
  private layer: Graphics;

  constructor(layer: Graphics) {
    this.layer = layer;
  }

  setTool(type: ToolType) {
    if (this.tool) this.tool.destroy();
    this.currentType = type;
    switch (type) {
      case "brush":
        this.tool = new BrushTool(this.layer);
        break;
      case "rect":
        this.tool = new RectTool(this.layer);
        break;
      case "lasso":
        this.tool = new LassoTool(this.layer);
        break;
      case "eraser":
        this.tool = new EraserTool(this.layer);
        break;
    }
  }

  handlePointerDown(e: FederatedPointerEvent) { this.tool?.onPointerDown(e); }
  handlePointerMove(e: FederatedPointerEvent) { this.tool?.onPointerMove(e); }
  handlePointerUp(e: FederatedPointerEvent) { this.tool?.onPointerUp(e); }
}
