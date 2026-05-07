import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login Form Example — Cookest UI",
  description:
    "Authentication flow with login/signup tabs, form validation, and social login built with Cookest UI.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
