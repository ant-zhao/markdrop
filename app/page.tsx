"use client";

import Section1 from "@/components/home/Section1";
import Section2 from "@/components/home/Section2";
import Section3 from "@/components/home/Section3";

export default function Home() {
  return (
    <div className="font-sans min-h-screen pb-20">
      <main className="flex flex-col row-start-2 items-center sm:items-start">
        <Section1 />
        <Section2 />
        <Section3 />
      </main>
    </div>
  );
}
