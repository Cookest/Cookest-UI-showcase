import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skeleton — Cookest UI",
  description:
    "Interactive showcase of the Skeleton component with text, circular, and card loading placeholders.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
