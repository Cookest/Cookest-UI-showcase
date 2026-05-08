import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Sidebar } from "@/components/Sidebar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CommandPalette } from "@/components/CommandPalette";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { Grain } from "@/components/Grain";
import { ThemeCustomizer } from "@/components/ThemeCustomizer";

export const metadata: Metadata = {
  title: {
    default: "Cookest UI — Design System",
    template: "%s — Cookest UI",
  },
  description:
    "Production-ready React components for modern food & cooking applications. 19 components, design tokens, and real-world examples.",
  keywords: ["ui", "components", "react", "design-system", "cookest", "food"],
  openGraph: {
    title: "Cookest UI — Design System",
    description: "Production-ready components with a distinct culinary identity.",
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
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <ThemeProvider>
          <Grain />
          <CommandPalette />
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm"
            style={{ background: "var(--ck-primary)", color: "white" }}
          >
            Skip to content
          </a>
          <div className="flex min-h-screen">
            <Sidebar uiVersion={process.env.NEXT_PUBLIC_UI_VERSION} />
            <div className="flex-1 ml-0 md:ml-[280px] flex flex-col min-h-screen">
              <main
                id="main-content"
                className="flex-1 p-4 md:p-8 max-w-6xl mx-auto w-full"
              >
                {children}
              </main>
              <Footer />
            </div>
          </div>
          <BackToTop />
          <ThemeCustomizer />
        </ThemeProvider>
      </body>
    </html>
  );
}
