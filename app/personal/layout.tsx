import { ReactNode } from "react"
import Sidebar from "./components/Sidebar"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header customClass="bg-white shadow-sm" containerId="header" pathname="/personal" />
      <div className="flex min-h-screen bg-gradient-to-bl from-[#FFF6F2] via-[#FFF9EF] to-[#F0FFFD]">
        <aside
          className="hidden sm:flex sm:w-64 flex-col bg-white pt-20"
          style={{ boxShadow: "6px 0 6px -5px rgba(0, 0, 0, 0.1)" }}
        >
          <Sidebar />
        </aside>
        <main className="flex-1 overflow-y-auto pt-20">{children}</main>
      </div>
      <Footer />
    </>
  )
}
