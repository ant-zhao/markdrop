import { Graphics, FederatedPointerEvent, Container } from "pixi.js";
import type { DrawingTool } from "./interface";
import MaskLayer from "../MaskLayer";
import { BaseTool } from "./Base";

export class LassoTool extends BaseTool {
  private points: [number, number][] = [];
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
    const toolPos = this.container.toLocal(e.global); // 转到 mask 局部坐标
    if (!this.drawing) {
      this.drawing = true;
      this.points = [[toolPos.x, toolPos.y]];
    } else {
      this.points.push([toolPos.x, toolPos.y]);
    }
  }

  onPointerMove(e: FederatedPointerEvent) {
    if (!this.drawing) return;
    const toolPos = this.container.toLocal(e.global);
    this.points.push([toolPos.x, toolPos.y]);

    this.preview.clear()
    this.preview.moveTo(this.points[0][0], this.points[0][1]);
    for (const [px, py] of this.points.slice(1)) {
      this.preview.lineTo(px, py);
    }
    this.preview.stroke({ color: this.color, width: 1 });
  }

  onPointerUp(e: FederatedPointerEvent) {
    if (this.points.length > 2) {
      this.closeLasso();
    }
  }

  private closeLasso() {
    this.layer.fillPolygon(
      this.points.map((p) => {
        const layerPos = this.layer.toLocal(this.container.toGlobal({x: p[0], y: p[1]}));
        return [layerPos.x, layerPos.y];
      }),
      !this.erasing
    ); // ✅ 写入 mask
    this.drawing = false;
    this.points = [];
    this.preview.clear();
  }
}
