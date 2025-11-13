import { BrushTool } from "./BrushTool";
import { RectTool } from "./RectTool";
import { LassoTool } from "./LassoTool";
import type { DrawingTool } from "./interface";
import { Application, FederatedPointerEvent } from "pixi.js";
import MaskLayer from "../MaskLayer";

export type ToolType = "brush" | "rect" | "lasso" | "eraser";

export class ToolManager {
  private tool: DrawingTool | null = null;
  private currentType: ToolType | null = null;
  private layer: MaskLayer;
  private radius: number = 10;

  constructor(layer: MaskLayer) {
    this.layer = layer;
  }

  setTool(type: ToolType) {
    if (this.tool) this.tool.destroy();
    this.currentType = type;
    switch (type) {
      case "brush":
        this.tool = new BrushTool({
          layer: this.layer,
          radius: this.radius,
          color: this.layer.color,
          erasing: false,
        });
        break;
      case "rect":
        this.tool = new RectTool({
          layer: this.layer,
          color: this.layer.color,
        });
        break;
      case "lasso":
        this.tool = new LassoTool({
          layer: this.layer,
          color: this.layer.color,
        });
        break;
      case "eraser":
        this.tool = new BrushTool({
          layer: this.layer,
          radius: this.radius,
          color: this.layer.color,
          erasing: true,
        });
        break;
    }
  }

  handlePointerDown = (e: FederatedPointerEvent) => { this.tool?.onPointerDown(e); }
  handlePointerMove = (e: FederatedPointerEvent) => { this.tool?.onPointerMove(e); }
  handlePointerUp = (e: FederatedPointerEvent) => { this.tool?.onPointerUp(e); }

  // mapScreenToStagePosition(x: number, y: number, app: Application) {
  //   const point = new Point();
  //   app.renderer.plugins.interaction.mapPositionToPoint(point, x, y);
  //   return point;
  // }

  setRadius(r: number) {
    this.radius = r;
    this.tool?.setRadius?.(r);
  }

  destroy() {
    this.tool?.destroy();
    this.tool = null;
    this.currentType = null;
  }
}
