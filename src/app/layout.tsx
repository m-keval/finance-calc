import type { Metadata } from "next";
import { Outfit, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AdBanner } from "@/components/shared/AdBanner";
import { ScrollRestorationReset } from "@/components/shared/ScrollRestorationReset";

const outfitFont = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-outfit",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-calc-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-calc-mono",
});

export const metadata: Metadata = {
  title: {
    default: "CalcNiv | The foundation for smarter decisions",
    template: "%s | CalcNiv",
  },
  description: "The foundation for smarter decisions through calculation. A premium suite of modern, fast, and accurate tools.",
  openGraph: {
    title: "CalcNiv | Smart Decisions",
    description: "The foundation for smarter decisions through calculation.",
    url: "https://calcniv.example.com",
    siteName: "CalcNiv",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${outfitFont.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6742401640080288"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body suppressHydrationWarning className={`min-h-full flex flex-col font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ScrollRestorationReset />
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
