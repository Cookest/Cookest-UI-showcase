import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Divider — Cookest UI",
  description:
    "Interactive showcase of the Divider component with labels, spacing, and orientations.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
