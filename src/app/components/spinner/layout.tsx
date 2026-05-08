import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spinner — Cookest UI",
  description:
    "Interactive showcase of the Spinner component with sizes, colors, button integration, and loading state examples.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
