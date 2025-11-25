import { Application, Container, Sprite, Texture } from "pixi.js";
import MaskLayer from "@/components/common/MaskEditor/MaskLayer";
import { events, EventType } from "@/lib/events";

const createImageTexture = async (file: File) => {
  const url = URL.createObjectURL(file);
  const img = new Image();
  img.src = url;
  await new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = reject;
  });
  const texture = Texture.from(img);
  URL.revokeObjectURL(url);
  return texture;
};

export class CanvasRenderer {
  public container: HTMLDivElement | null;
  private image: File | null;
  private app: Application | null = null;
  private imageView: Container | null = null;
  private maskView: MaskLayer | null = null;
  private assistantView: Container | null = null;
  private initialed = false;

  private resizeObserver: ResizeObserver | null = null;
  private mediaQuery: MediaQueryList | null = null;

  // ===============================
  // ⭐ 新增：缩放 + 平移状态
  // ===============================
  private zoom = 1;
  private minZoom = 0.1;
  private maxZoom = 10;

  private isPanning = false;
  private panStart: { x: number; y: number } = { x: 0, y: 0 };
  private viewStart: { x: number; y: number } = { x: 0, y: 0 };

  constructor(container: HTMLDivElement | null, image: File | null) {
    this.container = container;
    this.image = image;
  }

  async init() {
    if (!this.container || !this.image || this.initialed) return;
    this.initialed = true;

    const app = new Application();
    await app.init({
      backgroundAlpha: 0,
      resizeTo: this.container,
      antialias: true,
      resolution: window.devicePixelRatio,
      eventFeatures: { move: true },
    });

    this.container.innerHTML = "";
    this.container.appendChild(app.canvas);
    app.canvas.style.width = "100%";
    app.canvas.style.height = "100%";
    app.canvas.oncontextmenu = (e) => e.preventDefault(); // 禁止右键菜单
    this.app = app;

    const imageContainer = new Container();
    this.imageView = imageContainer;

    const texture = await createImageTexture(this.image);
    const sprite = new Sprite(texture);
    imageContainer.addChild(sprite);

    const maskContainer = new MaskLayer(sprite.width, sprite.height);
    this.maskView = maskContainer;
    maskContainer.eventMode = "static";
    maskContainer.interactive = true;

    const assistantContainer = new Container();
    this.assistantView = assistantContainer;
    this.assistantView.eventMode = "none";

    app.stage.eventMode = "static";
    app.stage.hitArea = app.screen;
    app.stage.addChild(imageContainer, maskContainer, assistantContainer);

    this.resetView(); // 初始化 zoom + 平移
    this.addInteractions(); // ⭐ 启动缩放和拖拽
    this.setupResizeListeners();
  }

  async updateImage(container: HTMLDivElement, newImage: File) {
    this.image = newImage;
    if (!this.imageView) return;
    if (this.container) {
      this.container.innerHTML = "";
    }
    this.container = container;
    if (!this.app) {
      this.init();
      return;
    }

    this.container.appendChild(this.app.canvas);
    this.imageView.children.forEach((child) => child.destroy());
    this.imageView.removeChildren();

    const texture = await createImageTexture(this.image);
    const sprite = new Sprite(texture);
    this.imageView.addChild(sprite);
    this.maskView?.updateSize(sprite.width, sprite.height);

    this.resetView();
    this.setupResizeListeners();
  }

  public resize() {
    this.app?.resize();
    this.resetView();
  }

  // ===============================
  // ⭐ 初始化图像缩放 & 居中，并设置 zoom = 初始缩放
  // ===============================
  private resetView() {
    if (!this.imageView || !this.maskView || !this.app) return;

    const sprite = this.imageView.children[0] as Sprite;
    if (!sprite) return;

    const { width: viewW, height: viewH } = this.app.renderer;
    const imgW = sprite.texture.width;
    const imgH = sprite.texture.height;

    const scale = Math.min(viewW / imgW, viewH / imgH);
    this.zoom = scale; // ⭐ 初始 zoom 等于适配后的缩放
    this.renderImage();
    this.updateImagePosition(
      (viewW - imgW * scale) / 2,
      (viewH - imgH * scale) / 2
    );
  }

  // ===============================
  // ⭐ renderImage 改为完全根据 zoom 绘制
  // ===============================
  private renderImage() {
    if (!this.imageView || !this.maskView || !this.app) return;

    this.imageView.scale.set(this.zoom);
    this.maskView.scale.set(this.zoom);
  }

  // ===============================
  // ⭐ 鼠标滚轮缩放（围绕鼠标位置）
  // ===============================
  private addInteractions() {
    if (!this.app || !this.imageView || !this.maskView) return;

    const app = this.app;

    // --- 滚轮缩放 ---
    app.canvas.addEventListener("wheel", (e) => {
      e.preventDefault();

      const oldZoom = this.zoom;
      if (e.deltaY < 0) this.zoom *= 1.1;
      else this.zoom /= 1.1;

      this.zoom = Math.min(this.maxZoom, Math.max(this.minZoom, this.zoom));
      const newZoom = this.zoom;

      if (newZoom === oldZoom) return;

      const rect = this.container!.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const worldX = (mouseX - this.imageView!.x) / oldZoom;
      const worldY = (mouseY - this.imageView!.y) / oldZoom;

      this.updateImagePosition(
        mouseX - worldX * newZoom,
        mouseY - worldY * newZoom
      );

      this.renderImage();
    });

    // --- 右键拖拽 ---
    app.canvas.addEventListener("pointerdown", (e) => {
      if (e.button !== 2) return; // 只允许右键拖拽

      this.isPanning = true;
      this.panStart = { x: e.clientX, y: e.clientY };
      this.viewStart = { x: this.imageView!.x, y: this.imageView!.y };
      events.canvasEmitter.emit(EventType.PAN, true);
    });

    app.canvas.addEventListener("pointerup", () => {
      this.isPanning = false;
      events.canvasEmitter.emit(EventType.PAN, false);
    });

    app.canvas.addEventListener("pointermove", (e) => {
      if (!this.isPanning) return;

      const dx = e.clientX - this.panStart.x;
      const dy = e.clientY - this.panStart.y;

      const newX = this.viewStart.x + dx;
      const newY = this.viewStart.y + dy;

      this.updateImagePosition(newX, newY);
    });
  }

  // =========================================
  // 原有部分保持完全不变（resize、destroy等）
  // =========================================

  public setMaskVisible(visible: boolean) {
    if (!this.maskView) return;
    this.maskView.visible = visible;
  }

  private setupResizeListeners() {
    if (!this.container || !this.app) return;
    this.removeResizeListeners();

    this.resizeObserver = new ResizeObserver(() => {
      if (!this.app || !this.container) return;
      this.resetView();
    });
    this.resizeObserver.observe(this.container);
    this.mediaQuery = window.matchMedia(
      `(resolution: ${window.devicePixelRatio}dppx)`
    );
    this.mediaQuery.addEventListener("change", this.updateResolution);
  }

  private removeResizeListeners() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
    if (this.mediaQuery) {
      this.mediaQuery.removeEventListener("change", this.updateResolution);
      this.mediaQuery = null;
    }
  }

  private updateImagePosition(x: number, y: number) {
    this.imageView!.x = x;
    this.imageView!.y = y;
    this.maskView!.x = x;
    this.maskView!.y = y;
  }

  destroy() {
    if (this.app) {
      this.app.destroy(true, true);
      this.app = null;
    }
    this.removeResizeListeners();

    this.imageView = null;
    this.maskView = null;
    this.initialed = false;
  }

  getApp() {
    return this.app;
  }

  getImageView() {
    return this.imageView;
  }

  getMaskView(): MaskLayer | null {
    return this.maskView;
  }

  getAssistantView(): Container | null {
    return this.assistantView;
  }

  getImageSize() {
    const sprite = this.imageView?.children[0] as Sprite;
    return {
      width: sprite.texture.width,
      height: sprite.texture.height,
    };
  }

  exportMaskToPNG() {
    if (!this.maskView) return;
    return this.maskView.exportToPNG();
  }

  async exportMaskAsFile() {
    if (!this.maskView || !this.image) return;
    const blob = await this.maskView.exportToPNG();
    const file = new File([blob], `${this.image.name.split(".")[0]}-mask-${Date.now()}.png`, { type: "image/png" });
    return file;
  }

  private updateResolution = () => {
    if (!this.app || !this.container) return;
    const bounding = this.container.getBoundingClientRect();
    this.app.renderer.resolution = window.devicePixelRatio;
    this.app.renderer.resize(bounding.width, bounding.height);
    this.renderImage();
  };
}
