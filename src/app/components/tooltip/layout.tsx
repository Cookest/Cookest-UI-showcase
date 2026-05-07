import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tooltip — Cookest UI",
  description:
    "Interactive showcase of the Tooltip component with positioning, triggers, and rich content.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
