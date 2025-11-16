import { Graphics, FederatedPointerEvent, Container } from "pixi.js";
import type { DrawingTool } from "./interface";
import MaskLayer from "../MaskLayer";
import { BaseTool } from "./Base";

export class RectTool extends BaseTool {
  private start = { x: 0, y: 0 };
  private drawing = false;

  constructor(options: {
      container: Container;
      layer: MaskLayer;
      erasing: boolean;
      color?: number;
      alpha?: number;
  }) {
    super(options);
  }

  onPointerDown(e: FederatedPointerEvent) {
    this.drawing = true;
    this.start.x = e.global.x;
    this.start.y = e.global.y;
  }

  onPointerMove(e: FederatedPointerEvent) {
    if (!this.drawing) return;
    const toolPosStart = this.container.toLocal(this.start);
    const toolPos = this.container.toLocal(e.global);
    const width = Math.abs(toolPos.x - toolPosStart.x);
    const height = Math.abs(toolPos.y - toolPosStart.y);
    const x = Math.min(toolPos.x, toolPosStart.x);
    const y = Math.min(toolPos.y, toolPosStart.y);
    this.preview.clear()
      .rect(x, y, width, height)
      .fill({ color: this.color, alpha: this.layer.opacity })
      .stroke({ color: this.color, width: 1 });
  }

  onPointerUp(e: FederatedPointerEvent) {
    if (!this.drawing) return;
    const layerPosStart = this.layer.toLocal(this.start);
    const layerPos = this.layer.toLocal(e.global);
    const x = Math.min(layerPos.x, layerPosStart.x);
    const y = Math.min(layerPos.y, layerPosStart.y);
    const width = Math.abs(layerPos.x - layerPosStart.x);
    const height = Math.abs(layerPos.y - layerPosStart.y);
    this.layer.fillPolygon(
      [
        [x, y],
        [x + width, y],
        [x + width, y + height],
        [x, y + height],
      ],
      !this.erasing,
    );
    this.preview.clear();
    this.drawing = false;
  }
}
