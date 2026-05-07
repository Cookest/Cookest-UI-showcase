import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Select — Cookest UI",
  description:
    "Interactive showcase of the Select component with options, placeholders, and controlled state.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
