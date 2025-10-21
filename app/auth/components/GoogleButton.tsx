import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";

export default function GoogleButton() {
  return (
    <Button
      type="button"
      variant="outline"
      className="w-full flex items-center justify-center gap-2 border-gray-300 cursor-pointer hover:bg-[#5b70f8]/10"
      onClick={() => alert("Google OAuth login")}
    >
      <FcGoogle size={20} />
      Continue with Google
    </Button>
  );
}
