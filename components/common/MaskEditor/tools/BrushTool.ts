import { Graphics, FederatedPointerEvent, Point, Container } from "pixi.js";
import type { DrawingTool } from "./interface";
import MaskLayer from "../MaskLayer";
import { BaseTool } from "./Base";

export class BrushTool extends BaseTool {
  private drawing = false;
  private radius: number;
  private show = false;

  constructor(options: {
    container: Container;
    layer: MaskLayer;
    erasing: boolean;
    radius?: number;
    color?: number;
    alpha?: number;
  }) {
    super(options);
    this.radius = options.radius || 30;
  }

  initTool() {
    this.setRadius(this.radius);
  }

  onPointerDown(e: FederatedPointerEvent) {
    if (!this.show) return;
    this.drawing = true;
    const pos = this.layer.toLocal(e.global);
    this.drawPoint(pos.x, pos.y);
  }

  onPointerMove(e: FederatedPointerEvent) {
    if (!this.show) {
      this.onPointerOver();
    }
    // 更新鼠标预览圆位置
    const toolPos = this.container.toLocal(e.global);
    this.preview.position.set(toolPos.x, toolPos.y);
    
    if (!this.drawing) return;
    const pos = this.layer.toLocal(e.global);
    this.drawPoint(pos.x, pos.y);
  }

  onPointerUp() {
    this.drawing = false;
  }

  onPointerOver() {
    this.show = true;
    this.setRadius(this.radius);
  }

  onPointerOut() {
    this.drawing = false;
    this.show = false;
    this.preview.clear();
  }

  private drawPoint(x: number, y: number) {
    this.layer.drawCircle(x, y, this.radius / this.layer.scale.x, !this.erasing);
  }

  // 动态设置笔刷半径
  setRadius(r: number) {
    this.radius = r;
    // 更新鼠标预览圆半径
    this.preview.clear();
    this.preview
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
}
