import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Example — Cookest UI",
  description:
    "Analytics overview with stat cards, activity feed, and skeleton loading built with Cookest UI.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
