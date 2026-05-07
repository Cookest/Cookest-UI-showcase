import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Page Example — Cookest UI",
  description:
    "An e-commerce product detail page built with Cookest UI components.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
