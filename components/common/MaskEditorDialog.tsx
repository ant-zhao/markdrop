"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Maximize2, Minimize2 } from "lucide-react";
import { useMaskStore } from "@/stores/useMaskStore";
import MaskEditor from "@/components/common/MaskEditor";
import Toolbar from "@/components/common/MaskEditor/Toolbar";

export default function MaskEditorDialog() {
  const { visible, isFullscreen, setIsFullscreen } = useMaskStore();

  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isFullscreen]);

  if (!visible) return null;

  return (
    <div className={(
      isFullscreen
        ? "fixed w-screen h-screen top-0 py-2 px-4 left-0 bg-white flex flex-col z-999"
        : "absolute w-full h-full box-content pt-12 px-12 top-[-3rem] left-[-3rem] z-10"
    )}>
      <div className={"w-full px-4 h-12 flex items-center justify-between bg-white rounded-t-sm " + (isFullscreen ? "" : "absolute top-0 left-0")}>
        <Toolbar />
        <div className="flex justify-end items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="size-8"
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? (
              <Minimize2 className="h-3 w-3" />
            ) : (
              <Maximize2 className="h-3 w-3" />
            )}
          </Button>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 relative w-full h-full overflow-hidden">
        <MaskEditor />
      </div>
    </div>
  );
}
