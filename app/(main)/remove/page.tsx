import Header from "@/components/Header";
import Section1 from "@/components/remove/Section1";
import Section4 from "@/components/home/Section4";
import Section2 from "@/components/remove/Section2";
// import RemoveScript from "./script";

export default function Home() {
  return (
    <div className="font-sans min-h-screen pb-12">
      <Header pathname="/remove" />
      <main className="flex flex-col row-start-2 items-center sm:items-start">
        <section className="pt-28 min-h-[100vh] flex flex-col items-center justify-center w-full bg-gradient-to-bl from-[#FFF6F2] via-[#FFF9EF] to-[#F0FFFD]">
          <Section1 />
          <Section2 />
        </section>
        <Section4 />
      </main>
      {/* <RemoveScript /> */}
    </div>
  );
}
