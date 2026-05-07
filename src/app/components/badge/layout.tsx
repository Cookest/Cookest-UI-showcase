import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Badge — Cookest UI",
  description:
    "Interactive showcase of the Badge component with variants, sizes, dots, and removable tags.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
