import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Card — Cookest UI",
  description:
    "Interactive showcase of the Card component with header, body, footer slots and variant options.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
