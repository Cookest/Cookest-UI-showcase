import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Progress — Cookest UI",
  description:
    "Interactive showcase of the Progress component with indeterminate, striped, sizes, colors, and a live upload demo.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
