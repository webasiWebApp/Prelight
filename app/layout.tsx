import type { Metadata } from "next";
import { Poppins, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Prelight | The control layer for AI content workflows",
  description: "Prelight helps studios, brands, and agencies create, scale, and govern content with consistency and full ownership.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("scroll-smooth", "font-sans", geist.variable, "dark")} suppressHydrationWarning>
      <body className={`${poppins.variable} font-sans bg-prelight-black text-prelight-white antialiased`}>
        {children}
      </body>
    </html>
  );
}