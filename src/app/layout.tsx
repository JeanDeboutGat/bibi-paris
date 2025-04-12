import type { Metadata } from "next";
import { Inter } from "next/font/google";
import './globals.css';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// You can use any font you prefer - Inter is a good starting point
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Luxury E-commerce | Home",
  description: "Discover our collection of luxury products",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
