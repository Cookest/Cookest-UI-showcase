import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alert — Cookest UI",
  description:
    "Interactive showcase of the Alert component with variants, dismissible alerts, and action buttons.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
