import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meal Planner Example — Cookest UI",
  description:
    "Weekly meal planning grid with add/remove meals, nutrition tracking, and shopping list built with Cookest UI.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
