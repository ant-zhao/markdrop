import { Graphics, FederatedPointerEvent } from "pixi.js";
import type { DrawingTool } from "./interface";
import MaskLayer from "../MaskLayer";

export class RectTool implements DrawingTool {
  private layer: MaskLayer;
  private startX = 0;
  private startY = 0;
  private drawing = false;
  private preview: Graphics;
  private color: number;

  constructor({
    layer,
    color = 0xd314af,
  }: {
    layer: MaskLayer;
    color?: number;
  }) {
    this.layer = layer;
    this.preview = new Graphics();
    this.layer.addChild(this.preview);
    this.color = color;
  }

  onPointerDown(e: FederatedPointerEvent) {
    this.drawing = true;
    const pos = this.layer.toLocal(e.global);
    this.startX = pos.x;
    this.startY = pos.y;
  }

  onPointerMove(e: FederatedPointerEvent) {
    if (!this.drawing) return;
    const pos = this.layer.toLocal(e.global);
    const width = Math.abs(pos.x - this.startX);
    const height = Math.abs(pos.y - this.startY);
    const x = Math.min(pos.x, this.startX);
    const y = Math.min(pos.y, this.startY);
    this.preview.clear()
      .rect(x, y, width, height)
      .fill({ color: this.color, alpha: this.layer.opacity })
      .stroke({ color: this.color, width: 1 });
  }

  onPointerUp(e: FederatedPointerEvent) {
    if (!this.drawing) return;
    const pos = this.layer.toLocal(e.global);
    const x = Math.min(pos.x, this.startX);
    const y = Math.min(pos.y, this.startY);
    const width = Math.abs(pos.x - this.startX);
    const height = Math.abs(pos.y - this.startY);
    this.layer.fillPolygon([
      [x, y],
      [x + width, y],
      [x + width, y + height],
      [x, y + height],
    ], true);
    this.preview.clear();
    this.drawing = false;
  }

  destroy() {
    this.preview.removeFromParent();
    this.preview.destroy();
  }
}
