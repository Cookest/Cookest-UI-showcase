import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CommandPalette } from "@/components/CommandPalette";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";

export const metadata: Metadata = {
  title: {
    default: "Cookest UI — Design System",
    template: "%s — Cookest UI",
  },
  description:
    "Production-ready React & Flutter components for modern food & cooking applications. 12 components, design tokens, and real-world examples.",
  keywords: ["ui", "components", "react", "flutter", "design-system", "cookest", "food"],
  openGraph: {
    title: "Cookest UI — Design System",
    description: "Production-ready cross-platform components with flavor.",
    type: "website",
    siteName: "Cookest UI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@400;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <CommandPalette />
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm"
            style={{ background: "var(--ck-primary)", color: "white" }}
          >
            Skip to content
          </a>
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 ml-0 md:ml-[280px] flex flex-col min-h-screen">
              <main id="main-content" className="flex-1 p-4 md:p-8 max-w-6xl">
                {children}
              </main>
              <Footer />
            </div>
          </div>
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
