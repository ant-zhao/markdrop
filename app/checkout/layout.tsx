import { ReactNode } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header customClass="bg-white shadow-sm" containerId="header" pathname="/checkout" />
      <div className="flex min-h-screen bg-gradient-to-bl pt-20 from-[#FFF6F2] via-[#FFF9EF] to-[#F0FFFD]">
        {children}
      </div>
      <Footer />
    </>
  )
}
