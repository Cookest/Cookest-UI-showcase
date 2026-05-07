"use client";

import Link from "next/link";
import {
  Card,
  CardBody,
  Badge,
  Button,
  Avatar,
  Toggle,
  Input,
  Select,
  Skeleton,
  SkeletonCard,
} from "@cookest/ui";
import {
  ArrowRight,
  Utensils,
  ChefHat,
  Settings,
  BarChart3,
  Leaf,
  Clock,
  Users,
  Star,
} from "lucide-react";

const examples = [
  {
    title: "Recipe Card",
    description:
      "A full recipe page with ingredients, step-by-step instructions, nutrition facts, and user reviews.",
    href: "/examples/recipe-card",
    icon: Utensils,
    tags: ["Card", "Badge", "Avatar", "Toggle", "Button", "Alert"],
  },
  {
    title: "Login Form",
    description:
      "Authentication flow with login/signup tabs, form validation, password visibility, and social login.",
    href: "/examples/login-form",
    icon: ChefHat,
    tags: ["Input", "Button", "Toggle", "Card", "Alert", "Divider"],
  },
  {
    title: "Settings Panel",
    description:
      "User preferences page with profile editing, notification toggles, language select, and danger zone.",
    href: "/examples/settings-panel",
    icon: Settings,
    tags: ["Input", "Toggle", "Select", "Modal", "Avatar", "Alert"],
  },
  {
    title: "Dashboard",
    description:
      "Analytics overview with stat cards, activity feed, popular recipes table, and skeleton loading.",
    href: "/examples/dashboard",
    icon: BarChart3,
    tags: ["Card", "Badge", "Avatar", "Skeleton", "Toggle", "Alert"],
  },
  {
    title: "Meal Planner",
    description:
      "Weekly meal planning grid with add/remove meals, daily nutrition, and shopping list sidebar.",
    href: "/examples/meal-planner",
    icon: Leaf,
    tags: ["Card", "Modal", "Select", "Badge", "Skeleton", "Alert"],
  },
];

function ExamplePreview({ example }: { example: (typeof examples)[number] }) {
  const Icon = example.icon;

  return (
    <Link href={example.href} className="no-underline block group">
      <div
        className="rounded-2xl border overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
        style={{ borderColor: "var(--ck-border)", background: "var(--ck-surface)" }}
      >
        {/* Preview thumbnail area */}
        <div
          className="p-6 flex items-center justify-center min-h-[180px] relative"
          style={{ background: "var(--ck-bg)" }}
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ background: "rgba(122,154,101,0.1)" }}
          >
            <Icon size={28} style={{ color: "var(--ck-primary)" }} />
          </div>
        </div>

        {/* Info */}
        <div className="px-5 py-4 border-t" style={{ borderColor: "var(--ck-border)" }}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold m-0" style={{ color: "var(--ck-heading)" }}>
              {example.title}
            </h3>
            <ArrowRight
              size={14}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ color: "var(--ck-primary)" }}
            />
          </div>
          <p className="text-xs leading-relaxed m-0 mb-3" style={{ color: "var(--ck-text-muted)" }}>
            {example.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {example.tags.map((tag) => (
              <Badge key={tag} size="sm" variant="default">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function ExamplesIndexPage() {
  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-10">
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4"
          style={{ background: "rgba(122,154,101,0.1)", color: "var(--ck-primary)" }}
        >
          {examples.length} Examples
        </div>
        <h1
          className="text-4xl font-bold mb-3"
          style={{ color: "var(--ck-heading)", fontFamily: "'Playfair Display', serif" }}
        >
          Examples
        </h1>
        <p className="text-base leading-relaxed" style={{ color: "var(--ck-text-muted)" }}>
          Real-world UI patterns built entirely with Cookest UI components. Each example
          shows how components compose together to create production-ready interfaces.
        </p>
      </div>

      {/* Examples grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-16">
        {examples.map((example) => (
          <ExamplePreview key={example.href} example={example} />
        ))}
      </div>

      {/* CTA */}
      <div
        className="rounded-2xl border p-8 text-center"
        style={{ borderColor: "var(--ck-border)", background: "var(--ck-surface)" }}
      >
        <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--ck-heading)" }}>
          Want to build your own?
        </h2>
        <p className="text-sm mb-5" style={{ color: "var(--ck-text-muted)" }}>
          Start with the getting started guide and explore all 12 components.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/getting-started" className="no-underline">
            <Button variant="primary" iconRight={<ArrowRight size={14} />}>
              Getting Started
            </Button>
          </Link>
          <Link href="/components/button" className="no-underline">
            <Button variant="secondary">Browse Components</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
