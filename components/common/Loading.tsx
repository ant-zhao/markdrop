import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="w-full h-full flex items-center justify-center absolute top-0 left-0 bg-black/30">
      <Loader className="animate-spin" size={24} />
    </div>
  );
}