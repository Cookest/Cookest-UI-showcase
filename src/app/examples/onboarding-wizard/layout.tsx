import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Onboarding Wizard Example — Cookest UI",
  description:
    "A multi-step onboarding flow for a cooking app built with Cookest UI components.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
