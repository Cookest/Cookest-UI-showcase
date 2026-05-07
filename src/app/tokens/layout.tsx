import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design Tokens — Cookest UI",
  description:
    "Visual reference for all design tokens: colors, typography, spacing, borders, and effects.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
