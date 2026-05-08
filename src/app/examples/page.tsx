"use client";

import Link from "next/link";
import {
  Badge,
  Button,
} from "@cookest/ui";
import {
  ArrowRight,
  Utensils,
  ChefHat,
  Settings,
  BarChart3,
  Leaf,
  ShoppingBag,
  MessageCircle,
  Sparkles,
  Bell,
  BadgeDollarSign,
  UserCircle,
  ShoppingCart,
} from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";

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
  {
    title: "Product Page",
    description:
      "E-commerce product detail page with color/size selectors, quantity picker, reviews, and related products.",
    href: "/examples/product-page",
    icon: ShoppingBag,
    tags: ["Card", "Badge", "Button", "Tooltip", "Avatar", "Divider"],
  },
  {
    title: "Social Feed",
    description:
      "Social media feed for food sharing with posts, comments, likes, follow suggestions, and trending topics.",
    href: "/examples/social-feed",
    icon: MessageCircle,
    tags: ["Card", "Avatar", "AvatarGroup", "Badge", "Input", "Tooltip"],
  },
  {
    title: "Onboarding Wizard",
    description:
      "Multi-step onboarding flow with name input, dietary toggles, skill level selection, and summary.",
    href: "/examples/onboarding-wizard",
    icon: Sparkles,
    tags: ["Card", "Input", "Toggle", "Badge", "Button", "Alert"],
  },
  {
    title: "Notification Center",
    description:
      "Notification inbox with read/unread state, tabs for All, Unread, and Mentions, and a mark-all-read action.",
    href: "/examples/notification-center",
    icon: Bell,
    tags: ["Card", "Badge", "Avatar", "Tabs", "Divider", "Button"],
  },
  {
    title: "Pricing Plans",
    description:
      "Three-tier pricing cards with monthly/annual toggle, feature lists, and a highlighted 'Most Popular' plan.",
    href: "/examples/pricing",
    icon: BadgeDollarSign,
    tags: ["Card", "Badge", "Button", "Divider", "Toggle"],
  },
  {
    title: "User Profile",
    description:
      "Chef profile page with avatar, stats bar, profile completion progress, follow action, and tabbed recipe grid.",
    href: "/examples/user-profile",
    icon: UserCircle,
    tags: ["Avatar", "Badge", "Tabs", "Skeleton", "Progress", "Card"],
  },
  {
    title: "Order Checkout",
    description:
      "Multi-section checkout form with contact, delivery, add-ons, payment fields, and a live order summary sidebar.",
    href: "/examples/checkout",
    icon: ShoppingCart,
    tags: ["Input", "Select", "Toggle", "Progress", "Card", "Button"],
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
      <Breadcrumb />

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
          style={{ color: "var(--ck-heading)", fontFamily: "var(--font-serif)" }}
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
