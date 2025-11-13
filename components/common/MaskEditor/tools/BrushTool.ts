import { Graphics, FederatedPointerEvent, Point } from "pixi.js";
import type { DrawingTool } from "./interface";
import MaskLayer from "../MaskLayer";

export class BrushTool implements DrawingTool {
  private layer: MaskLayer;           // 实际绘制图层
  private cursorCircle: Graphics;    // 鼠标笔刷预览
  private drawing = false;
  private radius: number;
  private color: number;
  private alpha: number;
  private erasing = false;

  constructor({
    layer,
    radius = 10,
    color = 0xd314af,
    alpha = 0.3,
    erasing,
  }: {
    layer: MaskLayer;
    erasing: boolean;
    radius?: number;
    color?: number;
    alpha?: number;
  }) {
    this.layer = layer;
    this.radius = radius;
    this.color = erasing ? 0xffffff : color;
    this.alpha = alpha;
    this.erasing = erasing;

    // 创建鼠标笔刷预览
    this.cursorCircle = new Graphics();
    layer.addChild(this.cursorCircle);
    this.setRadius(radius);
  }

  onPointerDown(e: FederatedPointerEvent) {
    this.drawing = true;
    const pos = this.layer.toLocal(e.global);
    this.drawPoint(pos.x, pos.y);
  }

  onPointerMove(e: FederatedPointerEvent) {
    // 更新鼠标预览圆位置
    const pos = this.layer.toLocal(e.global);
    this.cursorCircle.position.set(pos.x, pos.y);

    if (!this.drawing) return;
    this.drawPoint(pos.x, pos.y);
  }

  onPointerUp() {
    this.drawing = false;
  }

  private drawPoint(x: number, y: number) {
    this.layer.drawCircle(x, y, this.radius, !this.erasing);
  }

  // 动态设置笔刷半径
  setRadius(r: number) {
    this.radius = r;
    // 更新鼠标预览圆半径
    this.cursorCircle.clear();
    this.cursorCircle
      .circle(0, 0, this.radius)
      .fill({
        color: this.color,
        alpha: this.alpha,
      })
      .stroke({
        color: this.color,
        alpha: 1,
        width: 2,
      });
  }

  destroy() {
    this.cursorCircle.removeFromParent();
    this.cursorCircle.destroy();
  }
}
