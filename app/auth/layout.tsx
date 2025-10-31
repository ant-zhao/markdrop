import Header from "@/components/Header";
import SideBanner from "./components/SideBanner";
import "./index.scss";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <Header pathname="/auth" /> */}
      <div className="bg-[#f0f0f0] h-screen overflow-hidden flex text-gray-900">
        <SideBanner />
        {children}
      </div>
    </>
  );
}
