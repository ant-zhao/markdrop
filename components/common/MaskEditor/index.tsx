import Toolbar from "./Toolbar";
import CanvasView from "./CanvasView";
import { useMaskStore } from "@/stores/useMaskStore";

export default function MaskEditor() {
  const { visible, tool, image } = useMaskStore();

  if (!visible || !tool || !image) return null;

  return (
    <div className="flex w-full h-full overflow-hidden p-2 rounded-xl bg-white shadow-blue-500">
      <div className="w-max flex-shrink-0">
        <Toolbar />
      </div>
      <div className="flex-1 relative min-w-0 min-h-0 overflow-hidden bg-gray-50">
        <CanvasView image={image} activeTool={tool} />
      </div>
    </div>
  );
}
