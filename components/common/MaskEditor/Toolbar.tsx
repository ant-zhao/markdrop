import cx from 'classnames';
import { Brush, Square, Lasso, Eraser } from "lucide-react";
import { useMaskStore } from "@/stores/useMaskStore";
import { ToolType } from "./tools/interface";

export default function Toolbar() {
  const { tool, setTool } = useMaskStore();

  const tools = [
    { key: ToolType.BRUSH, icon: <Brush size={16} />, label: "Brush" },
    { key: ToolType.RECT, icon: <Square size={16} />, label: "Rectangle" },
    { key: ToolType.LASSO, icon: <Lasso size={16} />, label: "Lasso" },
    { key: ToolType.ERASER, icon: <Eraser size={16} />, label: "Eraser" },
  ];

  return (
    <div className="flex gap-2 py-2 pr-2 text-[#333333]">
      {tools.map((t) => (
        <button
          key={t.key}
          className={cx('flex items-center gap-2 p-2 rounded border-[1px] cursor-pointer hover:text-[#4f46e5]', {
            [tool === t.key ? "bg-[rgb(79,70,229,0.2)] border-[#4f46e5] text-[#4f46e5]" : "border-[transparent]"]: true,
          })}
          onClick={() => {
            setTool(t.key);
          }}
        >
          {t.icon}
        </button>
      ))}
    </div>
  );
}
