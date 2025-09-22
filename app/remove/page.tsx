"use client";

import Section1 from "@/components/remove/Section1";
import Section4 from "@/components/home/Section4";

export default function Home() {
  return (
    <div className="font-sans min-h-screen pb-12">
      <main className="flex flex-col row-start-2 items-center sm:items-start">
        <Section1 />
        <Section4 />
      </main>
    </div>
  );
}
