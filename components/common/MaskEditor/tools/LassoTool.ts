import { Graphics, FederatedPointerEvent } from "pixi.js";
import type { DrawingTool } from "./interface";

export class LassoTool implements DrawingTool {
  private layer: Graphics;
  private preview: Graphics;
  private points: [number, number][] = [];
  private drawing = false;

  constructor(layer: Graphics) {
    this.layer = layer;
    this.preview = new Graphics();
    this.layer.addChild(this.preview);
  }

  onPointerDown(e: FederatedPointerEvent) {
    const { x, y } = e.global;
    if (!this.drawing) {
      this.drawing = true;
      this.points = [[x, y]];
    } else {
      this.points.push([x, y]);
    }
  }

  onPointerMove(e: FederatedPointerEvent) {
    if (!this.drawing) return;
    const { x, y } = e.global;
    this.preview.clear().stroke({ color: 0xffffff, width: 1 });
    this.preview.moveTo(this.points[0][0], this.points[0][1]);
    for (const [px, py] of this.points.slice(1)) this.preview.lineTo(px, py);
    this.preview.lineTo(x, y);
  }

  onPointerUp(e: FederatedPointerEvent) {
    if (e.detail === 2 && this.points.length > 2) {
      this.layer.poly(this.points.flat(2))
      .fill({
        color: 0xff0000,
        alpha: 0.5,
      });
      this.drawing = false;
      this.preview.clear();
    }
  }

  destroy() {
    this.preview.destroy();
  }
}
