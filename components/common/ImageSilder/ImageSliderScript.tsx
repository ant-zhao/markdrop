"use client";

import { useCallback, useEffect, useRef } from "react";

export default function ImageSliderScript({ id }: { id: string }) {
  const dragging = useRef(false);
  const root = useRef<HTMLElement>(null);
  const clip = useRef<HTMLDivElement>(null);
  const slider = useRef<HTMLDivElement>(null);

  useEffect(() => {
    root.current = document.getElementById(`slider-${id}`);
    if (!root.current) return;
    clip.current = root.current.querySelector("[data-clip]");
    slider.current = root.current.querySelector("[data-slider]");
    if (!clip.current || !slider.current) return;

    root.current.addEventListener("mousedown", onMouseDown);

    return () => {
      if (!root.current || !clip.current || !slider.current) return;
      root.current.removeEventListener("mousedown", onMouseDown);
    }
  }, [id])

  const onMouseMove = (e: MouseEvent) => {
    if (!dragging.current || !root.current || !clip.current || !slider.current) return;
    const rect = root.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const pos = Math.min(Math.max((offsetX / rect.width) * 100, 0), 100);
    clip.current.style.clipPath = "inset(0 " + (100 - pos) + "% 0 0)";
    slider.current.style.left = "calc(" + pos + "% - 0.5rem)";
  };

  const onMouseDown = (e: MouseEvent) => {
    dragging.current = true;
    onMouseMove(e);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const onMouseUp = () => {
    dragging.current = false;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  return null;
}