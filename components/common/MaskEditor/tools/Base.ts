import { Graphics, FederatedPointerEvent, Point, Container } from "pixi.js";
import type { DrawingTool } from "./interface";
import MaskLayer from "../MaskLayer";

export abstract class BaseTool implements DrawingTool {
  protected container: Container;
  protected layer: MaskLayer;           // 实际绘制图层
  protected preview: Graphics;    // 鼠标工具预览
  protected color: number;
  protected alpha: number;
  protected erasing = false;

  constructor({
    container,
    layer,
    color = 0xd314af,
    alpha = 0.3,
    erasing,
  }: {
    container: Container;
    layer: MaskLayer;
    erasing: boolean;
    color?: number;
    alpha?: number;
  }) {
    this.container = container;
    this.layer = layer;
    this.color = erasing ? 0xffffff : color;
    this.alpha = alpha;
    this.erasing = erasing;
    this.preview = new Graphics();
    this.container.addChild(this.preview);
  }

  abstract onPointerDown(e: FederatedPointerEvent): void;

  abstract onPointerMove(e: FederatedPointerEvent): void;

  abstract onPointerUp(e: FederatedPointerEvent): void;

  onPointerOver() {
  }

  onPointerOut() {
  }

  destroy() {
    this.preview.removeFromParent();
    this.preview.destroy();
  }
}
