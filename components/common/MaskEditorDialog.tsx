"use client";

import { useEffect, useState } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Maximize2, Minimize2 } from "lucide-react";
import { useMaskStore } from "@/stores/useMaskStore";
import MaskEditor from "./MaskEditor";
import { RemoveType } from "@/types/remove";

export default function MaskEditorDialog() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { visible, toggleVisible, setRemoveType } = useMaskStore();

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // 清理（防止泄漏）
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  const onCancel = () => {
    toggleVisible(false);
    setIsFullscreen(false);
    setRemoveType(RemoveType.AUTO);
  }

  return (
    <Dialog open={visible} modal={false}>
      <DialogContent
        className={`p-0 border-none bg-background gap-0 sm:max-w-none max-w-none ${isFullscreen
          ? "!w-screen h-screen"
          : "w-[120vh] h-[80vh]"
          }`}
        showCloseButton={false}
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <VisuallyHidden>
          <DialogTitle>Mask Editor</DialogTitle>
        </VisuallyHidden>
        {/* Header bar */}
        <DialogHeader className="border-b border-muted p-2 bg-muted/20">
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

            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              onClick={() => onCancel()}
              title="Close"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </DialogHeader>

        {/* Main content area */}
        <div className="relative flex-1 overflow-hidden">
          <MaskEditor />
        </div>
      </DialogContent>
    </Dialog>
  );
}
