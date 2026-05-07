import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings Panel Example — Cookest UI",
  description:
    "User preferences page with profile editing, notification toggles, and danger zone built with Cookest UI.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
