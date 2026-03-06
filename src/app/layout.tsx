import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./global.css";
import { Navbar } from "@/components/sections/Navbar";
import { cn } from "@/lib/utils";
import { SmoothScroll } from "@/components/framer/SmoothScroll";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Imanipour | Security Architect",
  description: "Portfolio van Aryan Imanipour - Security Analist & Architect",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" className="scroll-smooth" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={cn(
          inter.className,
          "bg-black text-white antialiased selection:bg-blue-500/30"
        )}
      >
        <SmoothScroll>
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}