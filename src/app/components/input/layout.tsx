import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Input — Cookest UI",
  description:
    "Interactive showcase of the Input component with sizes, validation, icons, and controlled state.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
