import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Toggle — Cookest UI",
  description:
    "Interactive showcase of the Toggle component with sizes, labels, and controlled state.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
