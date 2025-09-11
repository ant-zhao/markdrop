"use client";

import Section1 from "@/components/home/Section1";

export default function Home() {
  return (
    <div className="font-sans min-h-screen pb-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Section1 />
      </main>
    </div>
  );
}
