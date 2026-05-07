import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Avatar — Cookest UI",
  description:
    "Interactive showcase of the Avatar and AvatarGroup components with sizes, fallbacks, and status indicators.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
