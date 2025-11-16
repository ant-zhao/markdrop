import CanvasView from "./CanvasView";
import { useMaskStore } from "@/stores/useMaskStore";

export default function MaskEditor() {
  const { visible, tool, image } = useMaskStore();

  if (!visible || !tool || !image) return null;

  return (
    <div className="w-full h-full overflow-hidden p-2 rounded-xl bg-white shadow-blue-500">
      <div className="relative w-full h-full overflow-hidden bg-gray-50">
        <CanvasView image={image} />
      </div>
    </div>
  );
}
