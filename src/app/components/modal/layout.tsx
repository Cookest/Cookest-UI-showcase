import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Modal — Cookest UI",
  description:
    "Interactive showcase of the Modal component with sizes, confirmation dialogs, and form overlays.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
