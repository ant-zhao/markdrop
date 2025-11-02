import { Graphics, FederatedPointerEvent } from "pixi.js";
import type { DrawingTool } from "./interface";

export class RectTool implements DrawingTool {
  private layer: Graphics;
  private startX = 0;
  private startY = 0;
  private drawing = false;
  private preview: Graphics;

  constructor(layer: Graphics) {
    this.layer = layer;
    this.preview = new Graphics();
    this.layer.addChild(this.preview);
  }

  onPointerDown(e: FederatedPointerEvent) {
    this.drawing = true;
    this.startX = e.global.x;
    this.startY = e.global.y;
  }

  onPointerMove(e: FederatedPointerEvent) {
    if (!this.drawing) return;
    const x = e.global.x;
    const y = e.global.y;
    this.preview.clear().stroke({ color: 0xffffff, width: 1 }).rect(this.startX, this.startY, x - this.startX, y - this.startY);
  }

  onPointerUp(e: FederatedPointerEvent) {
    if (!this.drawing) return;
    const x = e.global.x;
    const y = e.global.y;
    this.layer.rect(this.startX, this.startY, x - this.startX, y - this.startY)
      .fill({
        color: 0xff0000,
        alpha: 0.5,
      });
    this.preview.clear();
    this.drawing = false;
  }

  destroy() {
    this.preview.destroy();
  }
}
