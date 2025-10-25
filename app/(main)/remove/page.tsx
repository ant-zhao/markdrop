import Section1 from "@/components/remove/Section1";
import Section4 from "@/components/home/Section4";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="font-sans min-h-screen pb-12">
      <Header pathname="/remove" />
      <main className="flex flex-col row-start-2 items-center sm:items-start">
        <Section1 />
        <Section4 />
      </main>
    </div>
  );
}
