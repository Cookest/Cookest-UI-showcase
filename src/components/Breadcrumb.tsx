"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

const labelMap: Record<string, string> = {
  components: "Components",
  examples: "Examples",
  tokens: "Design Tokens",
  "getting-started": "Getting Started",
  cli: "CLI",
  button: "Button",
  input: "Input",
  card: "Card",
  badge: "Badge",
  avatar: "Avatar",
  modal: "Modal",
  tooltip: "Tooltip",
  toggle: "Toggle",
  select: "Select",
  skeleton: "Skeleton",
  alert: "Alert",
  divider: "Divider",
  slider: "Slider",
  progress: "Progress",
  spinner: "Spinner",
  "recipe-card": "Recipe Card",
  "login-form": "Login Form",
  "settings-panel": "Settings Panel",
  dashboard: "Dashboard",
  "meal-planner": "Meal Planner",
  "design-principles": "Design Principles",
  changelog: "Changelog",
  "product-page": "Product Page",
  "social-feed": "Social Feed",
  "onboarding-wizard": "Onboarding Wizard",
  tabs: "Tabs",
  accordion: "Accordion",
  textarea: "Textarea",
  terminal: "Terminal CLI",
  kds: "Kitchen Display",
  editorial: "Editorial",
  "recipe-story": "Recipe Story",
  "nutrition-dashboard": "Nutrition Dashboard",
  "kinetic-menu": "Kinetic Menu",
  filmstrip: "Filmstrip",
};

export function Breadcrumb() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);
  const crumbs = segments.map((seg, i) => ({
    label: labelMap[seg] || seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, " "),
    href: "/" + segments.slice(0, i + 1).join("/"),
    isLast: i === segments.length - 1,
  }));

  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs">
      <Link
        href="/"
        className="no-underline flex items-center gap-1 transition-colors"
        style={{ color: "var(--ck-text-muted)" }}
      >
        <Home size={12} />
      </Link>
      {crumbs.map((crumb) => (
        <span key={crumb.href} className="flex items-center gap-1.5">
          <ChevronRight size={12} style={{ color: "var(--ck-text-muted)", opacity: 0.5 }} />
          {crumb.isLast ? (
            <span className="font-medium" style={{ color: "var(--ck-heading)" }}>
              {crumb.label}
            </span>
          ) : (
            <Link
              href={crumb.href}
              className="no-underline transition-colors hover:underline"
              style={{ color: "var(--ck-text-muted)" }}
            >
              {crumb.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
