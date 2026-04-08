import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Prelight | The control layer for AI content workflows",
  description:
    "Prelight helps studios, brands, and agencies create, scale, and govern content with consistency and full ownership.",
  icons: {
    icon: "/logo.ico",
    shortcut: "/logo.ico",
    apple: "/logo.ico",
  },
  openGraph: {
    title: "Prelight | The control layer for AI content workflows",
    description:
      "Create, scale, and govern content with consistency and full ownership.",
    type: "website",
    siteName: "Prelight",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prelight | AI Content Control",
    description:
      "Create, scale, and govern content with consistency and full ownership.",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth dark ${poppins.variable}`} suppressHydrationWarning>
      <body className="font-sans bg-prelight-black text-prelight-white antialiased">
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-8QZXDRC8J1"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8QZXDRC8J1');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}