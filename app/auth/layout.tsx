import { Suspense } from "react";
import Loading from "@/components/common/Loading";
import SideBanner from "@/app/auth/components/SideBanner";
import AuthClientComponent from "@/app/auth/components/ClientComponent";
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
        <Suspense fallback={<Loading />}>
          <AuthClientComponent />
        </Suspense>
      </div>
    </>
  );
}
