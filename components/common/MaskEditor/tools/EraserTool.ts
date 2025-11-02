import { Graphics, FederatedPointerEvent } from "pixi.js";
import type { DrawingTool } from "./interface";

export class EraserTool implements DrawingTool {
  private layer: Graphics;
  private drawing = false;
  private radius: number;

  constructor(layer: Graphics, radius = 10) {
    this.layer = layer;
    this.radius = radius;
  }

  onPointerDown(e: FederatedPointerEvent) {
    this.drawing = true;
    this.erase(e.global.x, e.global.y);
  }

  onPointerMove(e: FederatedPointerEvent) {
    if (!this.drawing) return;
    this.erase(e.global.x, e.global.y);
  }

  onPointerUp() {
    this.drawing = false;
  }

  private erase(x: number, y: number) {
    this.layer.clear().circle(x, y, this.radius);
  }

  destroy() {}
}
