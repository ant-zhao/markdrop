import { Container, Sprite, Texture } from "pixi.js";
import simplify from "simplify-js";
import inside from "point-in-polygon";

export default class MaskLayer extends Container {
  public color: number;
  public opacity: number;
  private maskWidth: number;
  private maskHeight: number;
  private bitmap: Uint8Array; // 每像素一个标志 (0 或 1)
  private imageData: Uint8Array; // RGBA 数组，用于纹理更新
  private texture: Texture;
  private sprite: Sprite;

  constructor(width: number, height: number, color = 0xd314af, opacity = 0.3) {
    super();
    this.maskWidth = width;
    this.maskHeight = height;
    this.color = color;
    this.opacity = opacity;

    // 1bit mask，用于记录哪些像素被涂抹
    this.bitmap = new Uint8Array(width * height);

    // RGBA 图像缓冲
    this.imageData = new Uint8Array(width * height * 4);

    // 初始化纹理（空白）
    this.texture = Texture.from({resource: this.imageData, width, height});
    this.sprite = new Sprite(this.texture);
    this.addChild(this.sprite);
  }

  /** 绘制一个圆形区域（fill=true 为增加，false 为擦除） */
  drawCircle(x: number, y: number, radius: number, fill: boolean = true) {
    const minX = Math.max(0, Math.floor(x - radius));
    const maxX = Math.min(this.maskWidth - 1, Math.ceil(x + radius));
    const minY = Math.max(0, Math.floor(y - radius));
    const maxY = Math.min(this.maskHeight - 1, Math.ceil(y + radius));

    for (let j = minY; j <= maxY; j++) {
      for (let i = minX; i <= maxX; i++) {
        const dx = i - x;
        const dy = j - y;
        if (dx * dx + dy * dy <= radius * radius) {
          const idx = j * this.maskWidth + i;
          this.bitmap[idx] = fill ? 1 : 0;
        }
      }
    }

    this.updateTexture();
  }

  fillPolygon(points: [number, number][], fill = true) {
    if (points.length < 3) return;

    // 1️⃣ 简化多边形（减少点数，提升性能）
    const simplified = simplify(
      points.map(([x, y]) => ({ x, y })),
      0.5, // 容差，可调
      true
    ).map(p => [p.x, p.y]) as [number, number][];

    // 2️⃣ 计算边界框
    const xs = simplified.map(p => p[0]);
    const ys = simplified.map(p => p[1]);
    const minX = Math.max(0, Math.floor(Math.min(...xs)));
    const maxX = Math.min(this.maskWidth - 1, Math.ceil(Math.max(...xs)));
    const minY = Math.max(0, Math.floor(Math.min(...ys)));
    const maxY = Math.min(this.maskHeight - 1, Math.ceil(Math.max(...ys)));

    // 3️⃣ 扫描边界框的像素点并测试是否在多边形内部
    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        if (inside([x, y], simplified)) {
          this.bitmap[y * this.maskWidth + x] = fill ? 1 : 0;
        }
      }
    }

    this.updateTexture();
  }


  /** 擦除区域 */
  eraseCircle(x: number, y: number, radius: number) {
    this.drawCircle(x, y, radius, false);
  }

  /** 清空整个 mask */
  clear() {
    this.bitmap.fill(0);
    this.updateTexture();
  }

  /** 更新贴图（高效地将 bitmap 映射为 RGBA 缓冲） */
  private updateTexture() {
    const r = (this.color >> 16) & 0xff;
    const g = (this.color >> 8) & 0xff;
    const b = this.color & 0xff;

    for (let i = 0; i < this.bitmap.length; i++) {
      const v = this.bitmap[i];
      const offset = i * 4;
      this.imageData[offset] = r;
      this.imageData[offset + 1] = g;
      this.imageData[offset + 2] = b;
      this.imageData[offset + 3] = v ? 255 * this.opacity : 0;
    }

    this.texture.source.update();
  }
}
