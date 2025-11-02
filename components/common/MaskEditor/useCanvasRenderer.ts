import { useEffect, useRef } from "react";
import { Application, Sprite, Texture } from "pixi.js";

export function useCanvasRenderer(
  containerRef: React.RefObject<HTMLDivElement | null>,
  imageUrl: string | null
) {
  const appRef = useRef<Application>(null);

  useEffect(() => {
    if (!containerRef.current || !imageUrl || appRef.current) return;

    console.log('containerRef.current.offsetWidth===>', containerRef.current.offsetWidth);
    

    // 创建 Pixi Application（新版 API）
    const app = new Application();
    app.init({
      backgroundAlpha: 0,
      resizeTo: containerRef.current,
      antialias: true,
      resolution: window.devicePixelRatio,
      width: containerRef.current.offsetWidth,
      height: containerRef.current.offsetHeight,
    }).then(() => {
      if (!containerRef.current) return;
      containerRef.current.innerHTML = ""; // 清空旧 canvas
      containerRef.current.appendChild(app.canvas);
      appRef.current = app;

      // 使用 File 对象创建纹理
      const texture = Texture.from(imageUrl);
      const sprite = new Sprite(texture);
      sprite.anchor.set(0.5);
      sprite.x = app.renderer.width / 2;
      sprite.y = app.renderer.height / 2;
      app.stage.addChild(sprite);

      // 监听 DPI / 分辨率变化
      const updateResolution = () => {
        const bounding = containerRef.current!.getBoundingClientRect();
        app.renderer.resolution = window.devicePixelRatio;
        app.renderer.resize(bounding.width, bounding.height);
      };

      const resizeObserver = new ResizeObserver(() => {
        const bounding = containerRef.current!.getBoundingClientRect();
        console.log('bounding===>', bounding);
        
        app.renderer.resize(bounding.width, bounding.height);
      });
      resizeObserver.observe(containerRef.current);

      const mq = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
      mq.addEventListener("change", updateResolution);

      return () => {
        mq.removeEventListener("change", updateResolution);
        resizeObserver.disconnect();
        app.destroy(true);
      };
    });
  }, [imageUrl, containerRef]);

  return appRef;
}
