import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Social Feed Example — Cookest UI",
  description:
    "A social media feed for food and recipe sharing built with Cookest UI components.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
