import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Getting Started — Cookest UI",
  description:
    "Installation guide and quick start tutorial for the @cookest/ui component library.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
