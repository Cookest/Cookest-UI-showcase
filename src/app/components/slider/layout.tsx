import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Slider — Cookest UI",
  description:
    "Interactive showcase of the Slider component with marks, colors, sizes, controlled state, and a real-world nutrition example.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
