import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recipe Card Example — Cookest UI",
  description:
    "A full recipe page with ingredients, instructions, nutrition facts, and reviews built with Cookest UI.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
