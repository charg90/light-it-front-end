import type { Metadata } from "next";

import "./globals.css"; // Tu archivo CSS global de Tailwind
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
export const metadata: Metadata = {
  title: "HealthCare Company",
  description: "Your health, our priority.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
