import { BrushTool } from "./BrushTool";
import { RectTool } from "./RectTool";
import { LassoTool } from "./LassoTool";
import { ToolType, type DrawingTool } from "./interface";
import { Container, FederatedPointerEvent } from "pixi.js";
import MaskLayer from "../MaskLayer";


export class ToolManager {
  private tool: DrawingTool | null = null;
  private currentType: ToolType | null = null;
  private layer: MaskLayer;
  private container: Container;
  private radius: number = 10;

  constructor(layer: MaskLayer, container: Container) {
    this.layer = layer;
    this.container = container;
  }

  setTool(type: ToolType) {
    this.destroy();
    this.currentType = type;
    switch (type) {
      case "brush":
        this.tool = new BrushTool({
          container: this.container,
          layer: this.layer,
          radius: this.radius,
          color: this.layer.color,
          erasing: false,
        });
        break;
      case "rect":
        this.tool = new RectTool({
          container: this.container,
          layer: this.layer,
          erasing: false,
          color: this.layer.color,
        });
        break;
      case "lasso":
        this.tool = new LassoTool({
          container: this.container,
          layer: this.layer,
          erasing: false,
          color: this.layer.color,
        });
        break;
      case "eraser":
        this.tool = new BrushTool({
          container: this.container,
          layer: this.layer,
          radius: this.radius,
          color: this.layer.color,
          erasing: true,
        });
        break;
    }
  }

  handlePointerDown = (e: FederatedPointerEvent) => {
    if (e.button !== 0) return;
    this.tool?.onPointerDown(e);
  }
  handlePointerMove = (e: FederatedPointerEvent) => { this.tool?.onPointerMove(e); }
  handlePointerUp = (e: FederatedPointerEvent) => { this.tool?.onPointerUp(e); }
  handlePointerOut = (e: FederatedPointerEvent) => {
    this.tool?.onPointerOut(e); 
  }
  handlePointerOver = (e: FederatedPointerEvent) => {
    this.tool?.onPointerOver(e); 
  }

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
