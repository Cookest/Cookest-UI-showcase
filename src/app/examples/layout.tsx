import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Examples — Cookest UI",
  description:
    "Real-world UI patterns built entirely with Cookest UI components.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
