"use client";

import Link from "next/link";
import {
  Button,
  Input,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Badge,
  Avatar,
  AvatarGroup,
  Toggle,
  Alert,
  Divider,
  Skeleton,
  Tooltip,
  Select,
} from "@cookest/ui";
import {
  ArrowRight,
  Utensils,
  Clock,
  Users,
  Star,
  Heart,
  ChefHat,
  Leaf,
  Flame,
  Layers,
  Palette,
  Copy,
  Check,
} from "lucide-react";
import { useState } from "react";

/* ─── Mini-preview wrapper ─── */
function PreviewCard({
  title,
  href,
  children,
}: {
  title: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className="group no-underline block">
      <div
        className="rounded-2xl border overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
        style={{ borderColor: "var(--ck-border)", background: "var(--ck-surface)" }}
      >
        <div
          className="p-6 flex items-center justify-center min-h-[160px]"
          style={{ background: "var(--ck-bg)" }}
        >
          {children}
        </div>
        <div
          className="px-5 py-3 border-t flex items-center justify-between"
          style={{ borderColor: "var(--ck-border)" }}
        >
          <span className="text-sm font-semibold" style={{ color: "var(--ck-heading)" }}>
            {title}
          </span>
          <ArrowRight
            size={14}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ color: "var(--ck-primary)" }}
          />
        </div>
      </div>
    </Link>
  );
}

/* ─── Example card wrapper ─── */
function ExampleCard({
  title,
  description,
  href,
  icon: Icon,
}: {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
}) {
  return (
    <Link href={href} className="no-underline block group">
      <div
        className="rounded-2xl border p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full"
        style={{ borderColor: "var(--ck-border)", background: "var(--ck-surface)" }}
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
          style={{ background: "rgba(122,154,101,0.1)" }}
        >
          <Icon size={20} style={{ color: "var(--ck-primary)" }} />
        </div>
        <h3 className="text-base font-semibold mb-1" style={{ color: "var(--ck-heading)" }}>
          {title}
        </h3>
        <p className="text-xs leading-relaxed m-0" style={{ color: "var(--ck-text-muted)" }}>
          {description}
        </p>
      </div>
    </Link>
  );
}

export default function Home() {
  const [demoToggle, setDemoToggle] = useState(true);
  const [installCopied, setInstallCopied] = useState(false);

  const handleCopyInstall = () => {
    navigator.clipboard.writeText("bun add @cookest/ui");
    setInstallCopied(true);
    setTimeout(() => setInstallCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl">
      {/* ── Hero ── */}
      <section className="mb-20">
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-6"
          style={{ background: "rgba(122,154,101,0.1)", color: "var(--ck-primary)" }}
        >
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--ck-primary)" }} />
          v1.0.0 — React + Flutter
        </div>
        <h1
          className="text-5xl font-bold mb-4 leading-tight"
          style={{ color: "var(--ck-heading)", fontFamily: "Playfair Display, serif" }}
        >
          Beautiful components,{" "}
          <span style={{ color: "var(--ck-primary)" }}>one design system.</span>
        </h1>
        <p className="text-lg max-w-2xl leading-relaxed mb-8" style={{ color: "var(--ck-text-muted)" }}>
          12 production-ready components shared across React and Flutter.
          Built from a single source of design tokens for pixel-perfect
          visual parity across platforms.
        </p>
        <div className="flex items-center gap-4 flex-wrap">
          <div
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm"
            style={{ background: "var(--ck-surface)", border: "1px solid var(--ck-border)" }}
          >
            <code style={{ color: "var(--ck-text)" }}>bun add @cookest/ui</code>
            <button
              onClick={handleCopyInstall}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs cursor-pointer border-0 transition-colors"
              style={{
                background: installCopied ? "rgba(122,154,101,0.15)" : "transparent",
                color: installCopied ? "var(--ck-primary)" : "var(--ck-text-muted)",
              }}
              aria-label={installCopied ? "Copied to clipboard" : "Copy install command"}
            >
              {installCopied ? <Check size={14} /> : <Copy size={14} />}
              {installCopied ? "Copied!" : "Copy"}
            </button>
          </div>
          <Link
            href="/components/button"
            className="no-underline inline-flex items-center gap-2 text-sm font-medium"
            style={{ color: "var(--ck-primary)" }}
          >
            Browse components <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="grid grid-cols-4 gap-4 mb-20">
        {[
          { label: "Components", value: "12" },
          { label: "Platforms", value: "2" },
          { label: "Unit Tests", value: "63" },
          { label: "Design Tokens", value: "80+" },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl p-5 border text-center"
            style={{ borderColor: "var(--ck-border)", background: "var(--ck-surface)" }}
          >
            <div className="text-2xl font-bold" style={{ color: "var(--ck-primary)" }}>
              {s.value}
            </div>
            <div className="text-xs mt-1" style={{ color: "var(--ck-text-muted)" }}>
              {s.label}
            </div>
          </div>
        ))}
      </section>

      {/* ── Live Hero Demo ── */}
      <section className="mb-20">
        <h2 className="text-xl font-semibold mb-2" style={{ color: "var(--ck-heading)" }}>
          See it in action
        </h2>
        <p className="text-sm mb-6" style={{ color: "var(--ck-text-muted)" }}>
          A real recipe card built entirely with Cookest UI components.
        </p>
        <div
          className="rounded-2xl border p-8"
          style={{ borderColor: "var(--ck-border)", background: "var(--ck-bg)" }}
        >
          <Card variant="interactive">
            <CardHeader>
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <Avatar src="https://i.pravatar.cc/40?u=chef" alt="Chef Maria" size="sm" />
                  <div>
                    <div className="text-sm font-semibold" style={{ color: "var(--ck-heading)" }}>
                      Chef Maria
                    </div>
                    <div className="text-xs" style={{ color: "var(--ck-text-muted)" }}>
                      Italian Cuisine
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge variant="success" dot>
                    Healthy
                  </Badge>
                  <Badge variant="warning">30 min</Badge>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <h3
                className="text-lg font-bold mb-2"
                style={{ color: "var(--ck-heading)", fontFamily: "Playfair Display, serif" }}
              >
                Tuscan Herb Grilled Chicken
              </h3>
              <p className="text-sm mb-4" style={{ color: "var(--ck-text-muted)" }}>
                Tender chicken breast marinated in a blend of rosemary, thyme, and garlic,
                grilled to perfection and served with roasted vegetables.
              </p>
              <div className="flex gap-4 mb-4">
                {[
                  { icon: Clock, label: "30 min" },
                  { icon: Users, label: "4 servings" },
                  { icon: Flame, label: "420 kcal" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-1.5 text-xs" style={{ color: "var(--ck-text-muted)" }}>
                    <item.icon size={14} />
                    {item.label}
                  </div>
                ))}
              </div>
              <div className="flex gap-2 flex-wrap">
                {["Rosemary", "Thyme", "Garlic", "Olive Oil", "Lemon"].map((tag) => (
                  <Badge key={tag} size="sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardBody>
            <CardFooter>
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <AvatarGroup max={3}>
                    <Avatar src="https://i.pravatar.cc/32?u=a" alt="User 1" size="xs" />
                    <Avatar src="https://i.pravatar.cc/32?u=b" alt="User 2" size="xs" />
                    <Avatar src="https://i.pravatar.cc/32?u=c" alt="User 3" size="xs" />
                    <Avatar src="https://i.pravatar.cc/32?u=d" alt="User 4" size="xs" />
                  </AvatarGroup>
                  <span className="text-xs" style={{ color: "var(--ck-text-muted)" }}>
                    127 cooked this
                  </span>
                </div>
                <Button variant="primary" size="sm" iconRight={<ArrowRight size={14} />}>
                  Start Cooking
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* ── Component Previews Grid ── */}
      <section className="mb-20">
        <h2 className="text-xl font-semibold mb-2" style={{ color: "var(--ck-heading)" }}>
          Components
        </h2>
        <p className="text-sm mb-6" style={{ color: "var(--ck-text-muted)" }}>
          Every component rendered live — click any preview to explore.
        </p>
        <div className="grid grid-cols-3 gap-5">
          {/* Button */}
          <PreviewCard title="Button" href="/components/button">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <Button variant="primary" size="sm">Primary</Button>
                <Button variant="secondary" size="sm">Secondary</Button>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">Ghost</Button>
                <Button variant="danger" size="sm">Danger</Button>
              </div>
            </div>
          </PreviewCard>

          {/* Input */}
          <PreviewCard title="Input" href="/components/input">
            <div className="flex flex-col gap-2 w-full px-2">
              <Input label="Email" placeholder="you@cookest.app" inputSize="sm" />
            </div>
          </PreviewCard>

          {/* Card */}
          <PreviewCard title="Card" href="/components/card">
            <Card padding="sm">
              <CardBody>
                <div className="text-xs font-semibold mb-1" style={{ color: "var(--ck-heading)" }}>
                  Recipe of the Day
                </div>
                <div className="text-[10px]" style={{ color: "var(--ck-text-muted)" }}>
                  Pasta Carbonara — 25 min
                </div>
              </CardBody>
            </Card>
          </PreviewCard>

          {/* Badge */}
          <PreviewCard title="Badge" href="/components/badge">
            <div className="flex flex-wrap gap-2 justify-center">
              <Badge variant="success" dot>Active</Badge>
              <Badge variant="warning">Pending</Badge>
              <Badge variant="error">Expired</Badge>
              <Badge variant="info">New</Badge>
            </div>
          </PreviewCard>

          {/* Avatar */}
          <PreviewCard title="Avatar" href="/components/avatar">
            <AvatarGroup max={4}>
              <Avatar src="https://i.pravatar.cc/48?u=1" alt="Alice" size="md" />
              <Avatar src="https://i.pravatar.cc/48?u=2" alt="Bob" size="md" />
              <Avatar src="https://i.pravatar.cc/48?u=3" alt="Charlie" size="md" />
              <Avatar src="https://i.pravatar.cc/48?u=4" alt="Diana" size="md" />
              <Avatar src="https://i.pravatar.cc/48?u=5" alt="Eve" size="md" />
            </AvatarGroup>
          </PreviewCard>

          {/* Toggle */}
          <PreviewCard title="Toggle" href="/components/toggle">
            <div className="flex flex-col gap-3">
              <Toggle
                checked={demoToggle}
                onChange={(e) => setDemoToggle(e.target.checked)}
                label="Notifications"
              />
              <Toggle
                checked={!demoToggle}
                onChange={() => setDemoToggle((prev) => !prev)}
                label="Dark mode"
              />
            </div>
          </PreviewCard>

          {/* Alert */}
          <PreviewCard title="Alert" href="/components/alert">
            <div className="w-full px-2">
              <Alert variant="success" title="Recipe saved!">
                Your meal plan has been updated.
              </Alert>
            </div>
          </PreviewCard>

          {/* Select */}
          <PreviewCard title="Select" href="/components/select">
            <div className="w-full px-2">
              <Select
                label="Cuisine"
                placeholder="Pick a cuisine..."
                options={[
                  { value: "italian", label: "🇮🇹 Italian" },
                  { value: "japanese", label: "🇯🇵 Japanese" },
                  { value: "mexican", label: "🇲🇽 Mexican" },
                ]}
                value=""
                onChange={() => {}}
              />
            </div>
          </PreviewCard>

          {/* Tooltip */}
          <PreviewCard title="Tooltip" href="/components/tooltip">
            <div className="flex gap-3">
              <Tooltip content="Save recipe" position="top">
                <Button variant="secondary" size="sm">
                  <Heart size={14} />
                </Button>
              </Tooltip>
              <Tooltip content="Add to plan" position="top">
                <Button variant="primary" size="sm">
                  <Star size={14} />
                </Button>
              </Tooltip>
            </div>
          </PreviewCard>

          {/* Skeleton */}
          <PreviewCard title="Skeleton" href="/components/skeleton">
            <div className="w-full px-2">
              <div className="flex items-center gap-3">
                <Skeleton variant="circular" width={40} height={40} />
                <div className="flex-1">
                  <Skeleton variant="text" />
                  <div className="mt-1">
                    <Skeleton variant="text" width="60%" />
                  </div>
                </div>
              </div>
            </div>
          </PreviewCard>

          {/* Modal */}
          <PreviewCard title="Modal" href="/components/modal">
            <div className="w-full px-2">
              <div
                className="rounded-xl border p-3 text-center"
                style={{ borderColor: "var(--ck-border)", background: "var(--ck-surface)" }}
              >
                <div className="text-xs font-semibold mb-1" style={{ color: "var(--ck-heading)" }}>
                  Delete Recipe?
                </div>
                <div className="text-[10px] mb-2" style={{ color: "var(--ck-text-muted)" }}>
                  This action cannot be undone.
                </div>
                <div className="flex gap-1.5 justify-center">
                  <Button variant="ghost" size="sm">Cancel</Button>
                  <Button variant="danger" size="sm">Delete</Button>
                </div>
              </div>
            </div>
          </PreviewCard>

          {/* Divider */}
          <PreviewCard title="Divider" href="/components/divider">
            <div className="w-full px-4 flex flex-col gap-2">
              <div className="text-xs" style={{ color: "var(--ck-text-muted)" }}>Section A</div>
              <Divider />
              <div className="text-xs" style={{ color: "var(--ck-heading)" }}>Section B</div>
              <Divider label="OR" />
              <div className="text-xs" style={{ color: "var(--ck-text-muted)" }}>Section C</div>
            </div>
          </PreviewCard>
        </div>
      </section>

      {/* ── Examples ── */}
      <section className="mb-20">
        <h2 className="text-xl font-semibold mb-2" style={{ color: "var(--ck-heading)" }}>
          Examples
        </h2>
        <p className="text-sm mb-6" style={{ color: "var(--ck-text-muted)" }}>
          Real-world UI patterns built with Cookest components.
        </p>
        <div className="grid grid-cols-3 gap-5">
          <ExampleCard
            title="Recipe Card"
            description="A complete recipe card with image, metadata, ingredients, and cooking actions."
            href="/examples/recipe-card"
            icon={Utensils}
          />
          <ExampleCard
            title="Login Form"
            description="Authentication form with validation, social login, and password visibility toggle."
            href="/examples/login-form"
            icon={ChefHat}
          />
          <ExampleCard
            title="Settings Panel"
            description="User preferences with toggles, selects, and form inputs in a card layout."
            href="/examples/settings-panel"
            icon={Layers}
          />
          <ExampleCard
            title="Dashboard"
            description="Analytics overview with stat cards, alerts, and avatar groups."
            href="/examples/dashboard"
            icon={Flame}
          />
          <ExampleCard
            title="Meal Planner"
            description="Weekly meal planning grid with drag targets, badges, and skeleton loading."
            href="/examples/meal-planner"
            icon={Leaf}
          />
          <ExampleCard
            title="Design Tokens"
            description="Visual reference for colors, typography, spacing, and effects."
            href="/tokens"
            icon={Palette}
          />
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="pt-8 pb-4 border-t" style={{ borderColor: "var(--ck-border)" }}>
        <div className="flex items-center justify-between">
          <div className="text-xs" style={{ color: "var(--ck-text-muted)" }}>
            Built with @cookest/ui · Open source
          </div>
          <div className="flex gap-4">
            <a
              href="https://github.com/Cookest/cookest-ui-components-library"
              className="text-xs no-underline"
              style={{ color: "var(--ck-text-muted)" }}
              target="_blank"
            >
              GitHub
            </a>
            <a
              href="/tokens"
              className="text-xs no-underline"
              style={{ color: "var(--ck-text-muted)" }}
            >
              Tokens
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
