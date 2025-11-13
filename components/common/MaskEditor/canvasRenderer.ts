import { useEffect, useRef, useState } from "react";
import { Application, Assets, Container, Graphics, Rectangle, Sprite, Texture } from "pixi.js";
import MaskLayer from "./MaskLayer";

const createImageTexture = async (file: File) => {
  const url = URL.createObjectURL(file);
  const img = new Image();
  img.src = url;
  await new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = reject;
  });
  const texture = Texture.from(img);
  URL.revokeObjectURL(url); // 释放内存
  return texture;
}

export class CanvasRenderer {
  private container: HTMLDivElement | null;
  private image: File | null;
  private app: Application | null = null;
  private imageView: Container | null = null;
  private maskView: MaskLayer | null = null;
  private initialed = false;

  private resizeObserver: ResizeObserver | null = null;
  private mediaQuery: MediaQueryList | null = null;

  constructor(container: HTMLDivElement | null, image: File | null) {
    this.container = container;
    this.image = image;
  }

  /** 初始化渲染流程 */
  async init() {
    if (!this.container || !this.image || this.initialed) return;
    this.initialed = true;

    // --- 创建 Pixi Application ---
    const app = new Application();
    await app.init({
      backgroundAlpha: 0,
      resizeTo: this.container,
      antialias: true,
      resolution: window.devicePixelRatio,
      width: this.container.offsetWidth,
      height: this.container.offsetHeight,
      eventFeatures: { move: true }, // ✅ 确保事件启用
    });

    // 清空旧 canvas 并挂载新 canvas
    this.container.innerHTML = "";
    this.container.appendChild(app.canvas);
    app.canvas.style.width = "100%";
    app.canvas.style.height = "100%";
    this.app = app;

    // --- 创建图层 ---
    const imageContainer = new Container();
    this.imageView = imageContainer;

    // --- 加载图像 ---
    const texture = await createImageTexture(this.image);
    const sprite = new Sprite(texture);
    imageContainer.addChild(sprite);

    // --- mask 图层 ---
    const maskContainer = new MaskLayer(sprite.width, sprite.height);
    this.maskView = maskContainer;
    maskContainer.eventMode = "static";
    maskContainer.interactive = true;

    app.stage.eventMode = 'static';
    app.stage.hitArea = app.screen;
    app.stage.addChild(imageContainer, maskContainer);

    // --- 渲染图像 ---
    this.renderImage();

    // --- 监听 DPI / Resize ---
    this.setupResizeListeners();
  }

  public setMaskVisible(visible: boolean) {
    if (!this.maskView) return;
    this.maskView.visible = visible;
  }

  /** 渲染图像（设置位置与缩放） */
  private renderImage() {
    if (!this.imageView || !this.maskView || !this.app) return;

    const app = this.app;
    const imageContainer = this.imageView;
    const maskContainer = this.maskView;
    if (imageContainer.children.length === 0) return;

    const { width: viewW, height: viewH } = app.renderer;
    const sprite = imageContainer.children[0] as Sprite;
    const imgW = sprite.texture.width;
    const imgH = sprite.texture.height;

    const scale = Math.min(viewW / imgW, viewH / imgH);
    imageContainer.scale.set(scale);
    maskContainer.scale.set(scale);

    // 手动居中
    imageContainer.x = (viewW - imgW * scale) / 2;
    imageContainer.y = (viewH - imgH * scale) / 2;
    maskContainer.x = imageContainer.x;
    maskContainer.y = imageContainer.y;
    maskContainer.hitArea = new Rectangle(0, 0, imgW, imgH);
    app.stage.hitArea = app.screen;
  }

  /** 注册 resize / DPI 监听 */
  private setupResizeListeners() {
    if (!this.container || !this.app) return;

    const updateResolution = () => {
      if (!this.app || !this.container) return;
      const bounding = this.container.getBoundingClientRect();
      this.app.renderer.resolution = window.devicePixelRatio;
      this.app.renderer.resize(bounding.width, bounding.height);
      this.renderImage(); // 重新布局
    };

    this.resizeObserver = new ResizeObserver(() => {
      if (!this.app || !this.container) return;
      const bounding = this.container.getBoundingClientRect();
      this.app.renderer.resize(bounding.width, bounding.height);
      this.renderImage(); // 重新布局
    });
    this.resizeObserver.observe(this.container);

    this.mediaQuery = window.matchMedia(
      `(resolution: ${window.devicePixelRatio}dppx)`
    );
    this.mediaQuery.addEventListener("change", updateResolution);
  }

  /** 销毁 Pixi 应用和监听器 */
  destroy() {
    if (this.app) {
      this.app.destroy(true, true);
      this.app = null;
    }

    if (this.resizeObserver && this.container) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }

    if (this.mediaQuery) {
      this.mediaQuery.removeEventListener("change", this.updateResolution);
      this.mediaQuery = null;
    }

    this.imageView = null;
    this.maskView = null;
    this.initialed = false;
  }

  /** 可选：外部获取引用 */
  getApp() {
    return this.app;
  }

  getImageView() {
    return this.imageView;
  }

  getMaskView(): MaskLayer | null {
    return this.maskView;
  }

  getImageSize() {
    const sprite = this.imageView?.children[0] as Sprite;
    const imgW = sprite.texture.width;
    const imgH = sprite.texture.height;
    return {
      width: imgW,
      height: imgH,
    };
  }

  /** 如果想切换图片 */
  async updateImage(newImage: File) {
    this.image = newImage;
    if (!this.imageView) return;
    this.imageView.removeChildren();

    const texture = await createImageTexture(this.image);
    const sprite = new Sprite(texture);
    this.imageView.addChild(sprite);
    this.renderImage();
  }

  /** 内部用的更新分辨率函数 */
  private updateResolution = () => {
    if (!this.app || !this.container) return;
    const bounding = this.container.getBoundingClientRect();
    this.app.renderer.resolution = window.devicePixelRatio;
    this.app.renderer.resize(bounding.width, bounding.height);
    this.renderImage();
  };
}
