import { Graphics, FederatedPointerEvent } from "pixi.js";
import type { DrawingTool } from "./interface";

export class BrushTool implements DrawingTool {
  private layer: Graphics;
  private drawing = false;
  private radius: number;
  private color: number;
  private alpha: number;

  constructor(layer: Graphics, color = 0xff0000, radius = 10, alpha = 0.5) {
    this.layer = layer;
    this.radius = radius;
    this.color = color;
    this.alpha = alpha;
  }

  onPointerDown(e: FederatedPointerEvent) {
    this.drawing = true;
    this.drawPoint(e.global.x, e.global.y);
  }

  onPointerMove(e: FederatedPointerEvent) {
    if (!this.drawing) return;
    this.drawPoint(e.global.x, e.global.y);
  }

  onPointerUp() {
    this.drawing = false;
  }

  private drawPoint(x: number, y: number) {
    this.layer.circle(x, y, this.radius).fill({
      color: this.color,
      alpha: this.alpha,
    });
  }

  destroy() {}
}
