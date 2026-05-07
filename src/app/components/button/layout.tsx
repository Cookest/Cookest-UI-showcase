import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Button — Cookest UI",
  description:
    "Interactive showcase of the Button component with variants, sizes, loading states, and icons.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
