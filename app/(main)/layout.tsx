import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClientComponent from "@/components/common/ClientComponent";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="mb-auto">{children}</main>
      <Footer />
      <ClientComponent />
    </>
  );
}
