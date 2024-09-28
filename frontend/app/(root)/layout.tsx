import { Navbar } from "@/components/ui/Navbar/navbar";

export default function CustomerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
    </>
  );
}
