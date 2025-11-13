import { Graphics, FederatedPointerEvent } from "pixi.js";
import type { DrawingTool } from "./interface";
import MaskLayer from "../MaskLayer";

export class LassoTool implements DrawingTool {
  private layer: MaskLayer;
  private preview: Graphics;
  private points: [number, number][] = [];
  private drawing = false;
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
    const pos = this.layer.toLocal(e.global); // 转到 mask 局部坐标
    if (!this.drawing) {
      this.drawing = true;
      this.points = [[pos.x, pos.y]];
    } else {
      this.points.push([pos.x, pos.y]);
    }
  }

  onPointerMove(e: FederatedPointerEvent) {
    if (!this.drawing) return;
    const pos = this.layer.toLocal(e.global);
    this.points.push([pos.x, pos.y]);

    this.preview.clear()
    this.preview.moveTo(this.points[0][0], this.points[0][1]);
    for (const [px, py] of this.points.slice(1)) {
      this.preview.lineTo(px, py);
    }
    this.preview.stroke({ color: this.color, width: 1 });
  }

  onPointerUp(e: FederatedPointerEvent) {
    console.log(this.points);
    if (this.points.length > 2) {
      this.closeLasso();
    }
  }

  private closeLasso() {
    this.layer.fillPolygon(this.points, true); // ✅ 写入 mask
    this.drawing = false;
    this.points = [];
    this.preview.clear();
  }

  destroy() {
    this.preview.removeFromParent();
    this.preview.destroy();
  }
}
