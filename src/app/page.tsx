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
  AnimateIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/AnimateIn";
import { PackageManagerTabs } from "@/components/PackageManagerTabs";
import { BezierDivider } from "@/components/BezierDivider";
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
  Sparkles,
  Smartphone,
  Accessibility,
  ExternalLink,
  LayoutDashboard,
  CalendarDays,
  Command,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

/* ─── Mini-preview card with dot-grid background ─── */
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
        className="rounded-2xl border overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5"
        style={{
          borderColor: "var(--ck-border)",
          background: "var(--ck-surface)",
        }}
      >
        <div
          className="dot-grid-pattern p-6 flex items-center justify-center min-h-[160px] relative"
          style={{ background: "var(--ck-bg)" }}
        >
          <div className="relative z-10">{children}</div>
        </div>
        <div
          className="px-5 py-3.5 border-t flex items-center justify-between"
          style={{ borderColor: "var(--ck-border)" }}
        >
          <span
            className="text-sm font-semibold"
            style={{ color: "var(--ck-heading)" }}
          >
            {title}
          </span>
          <ArrowRight
            size={14}
            className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
            style={{ color: "var(--ck-primary)" }}
          />
        </div>
      </div>
    </Link>
  );
}

/* ─── Example card ─── */
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
        className="rounded-2xl border p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 h-full"
        style={{
          borderColor: "var(--ck-border)",
          background: "var(--ck-surface)",
        }}
      >
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
          style={{ background: "rgba(122,154,101,0.1)" }}
        >
          <Icon size={20} style={{ color: "var(--ck-primary)" }} />
        </div>
        <h3
          className="text-base font-semibold mb-1.5"
          style={{ color: "var(--ck-heading)" }}
        >
          {title}
        </h3>
        <p
          className="text-xs leading-relaxed m-0"
          style={{ color: "var(--ck-text-muted)" }}
        >
          {description}
        </p>
      </div>
    </Link>
  );
}

/* ═══════════════════════════════════════════════════
   HOME PAGE
   ═══════════════════════════════════════════════════ */
export default function Home() {
  const [demoToggle, setDemoToggle] = useState(true);

  return (
    <div className="max-w-5xl">
      {/* ──────────────────────────────────────────────
          SECTION 1 — HERO
          ────────────────────────────────────────────── */}
      <section className="relative pt-4 pb-28">
        {/* Radial glow behind hero */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -top-24 overflow-hidden"
        >
          <div
            className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full opacity-30 blur-[120px]"
            style={{
              background:
                "radial-gradient(circle, rgba(122,154,101,0.35) 0%, transparent 70%)",
            }}
          />
        </div>

        <div className="relative z-10">
          {/* Announcement banner */}
          <AnimateIn direction="down" delay={0}>
            <Link
              href="/getting-started"
              className="no-underline inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-medium mb-8 transition-all duration-200 hover:shadow-md"
              style={{
                background: "rgba(122,154,101,0.1)",
                color: "var(--ck-primary)",
                border: "1px solid rgba(122,154,101,0.2)",
              }}
            >
              <motion.span
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block w-2 h-2 rounded-full"
                style={{ background: "var(--ck-primary)" }}
              />
              New: 12 components, 2 platforms, 1 design system
              <ArrowRight size={12} />
            </Link>
          </AnimateIn>

          {/* Headline */}
          <AnimateIn direction="up" delay={0.1}>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-[1.1] tracking-tight"
              style={{
                color: "var(--ck-heading)",
                fontFamily: "var(--font-serif)",
              }}
            >
              A component library
              <br />
              with{" "}
              <span className="gradient-text">flavor.</span>
            </h1>
          </AnimateIn>

          {/* Subtitle */}
          <AnimateIn direction="up" delay={0.2}>
            <p
              className="text-lg max-w-xl leading-relaxed mb-8"
              style={{ color: "var(--ck-text-muted)" }}
            >
              Production-ready React &amp; Flutter components for modern food
              &amp; cooking applications.
            </p>
          </AnimateIn>

          {/* Stats row */}
          <AnimateIn direction="up" delay={0.25}>
            <div
              className="flex items-center gap-3 mb-8 text-sm"
              style={{ color: "var(--ck-text-muted)" }}
            >
              <span className="font-semibold" style={{ color: "var(--ck-heading)" }}>
                19
              </span>{" "}
              Components
              <span style={{ color: "var(--ck-border)" }}>·</span>
              <span className="font-semibold" style={{ color: "var(--ck-heading)" }}>
                2
              </span>{" "}
              Platforms
              <span style={{ color: "var(--ck-border)" }}>·</span>
              <span className="font-semibold" style={{ color: "var(--ck-heading)" }}>
                80+
              </span>{" "}
              Tokens
              <span style={{ color: "var(--ck-border)" }}>·</span>
              <span className="font-semibold" style={{ color: "var(--ck-heading)" }}>
                MIT
              </span>{" "}
              License
            </div>
          </AnimateIn>

          {/* Package manager tabs */}
          <AnimateIn direction="up" delay={0.3}>
            <div className="max-w-md mb-8">
              <PackageManagerTabs />
            </div>
          </AnimateIn>

          {/* CTA buttons */}
          <AnimateIn direction="up" delay={0.35}>
            <div className="flex items-center gap-4 flex-wrap mb-6">
              <Link href="/getting-started" className="no-underline">
                <Button variant="primary" size="md" iconRight={<ArrowRight size={16} />}>
                  Get Started
                </Button>
              </Link>
              <Link href="/components/button" className="no-underline">
                <Button variant="secondary" size="md">
                  Browse Components
                </Button>
              </Link>
            </div>
          </AnimateIn>

          {/* Keyboard shortcut hint */}
          <AnimateIn direction="up" delay={0.4}>
            <div
              className="inline-flex items-center gap-2 text-xs"
              style={{ color: "var(--ck-text-muted)" }}
            >
              <span>Press</span>
              <kbd
                className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[11px] font-medium border"
                style={{
                  borderColor: "var(--ck-border)",
                  background: "var(--ck-surface)",
                  color: "var(--ck-text-muted)",
                }}
              >
                <Command size={10} />K
              </kbd>
              <span>to search</span>
            </div>
          </AnimateIn>
        </div>


      </section>

      <BezierDivider opacity={0.8} speed={1.2} className="-mb-4" />

      {/* ──────────────────────────────────────────────
          SECTION 2 — LIVE COMPONENT SHOWCASE
          ────────────────────────────────────────────── */}
      <section className="mb-28">
        <AnimateIn direction="up">
          <div className="text-center mb-10">
            <h2
              className="text-2xl font-bold mb-2"
              style={{ color: "var(--ck-heading)" }}
            >
              See it in action
            </h2>
            <p
              className="text-sm max-w-lg mx-auto"
              style={{ color: "var(--ck-text-muted)" }}
            >
              A real recipe card built entirely with Cookest UI
              components — rendered live, not a screenshot.
            </p>
          </div>
        </AnimateIn>

        <AnimateIn direction="up" delay={0.15}>
          <div
            className="rounded-3xl border p-10 dot-grid-pattern relative overflow-hidden"
            style={{
              borderColor: "var(--ck-border)",
              background: "var(--ck-bg)",
            }}
          >
            {/* Subtle top-left glow */}
            <div
              aria-hidden
              className="absolute -top-20 -left-20 w-60 h-60 rounded-full opacity-20 blur-[80px] pointer-events-none"
              style={{
                background: "var(--ck-primary)",
              }}
            />

            <div className="relative z-10 max-w-lg mx-auto">
              <Card variant="interactive">
                <CardHeader>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                      <Avatar
                        src="https://i.pravatar.cc/40?u=chef-salmon"
                        alt="Chef Laurent"
                        size="sm"
                      />
                      <div>
                        <div
                          className="text-sm font-semibold"
                          style={{ color: "var(--ck-heading)" }}
                        >
                          Chef Laurent
                        </div>
                        <div
                          className="text-xs"
                          style={{ color: "var(--ck-text-muted)" }}
                        >
                          French Cuisine
                        </div>
                      </div>
                    </div>
                    <Badge variant="warning">
                      <Star size={10} className="inline -mt-px mr-0.5" />
                      4.9
                    </Badge>
                  </div>
                </CardHeader>

                <CardBody>
                  <h3
                    className="text-lg font-bold mb-2"
                    style={{
                      color: "var(--ck-heading)",
                      fontFamily: "var(--font-serif)",
                    }}
                  >
                    Herb-Crusted Salmon
                  </h3>
                  <p
                    className="text-sm mb-4"
                    style={{ color: "var(--ck-text-muted)" }}
                  >
                    Atlantic salmon with a crispy herb crust of dill, parsley
                    and lemon zest, served on a bed of wilted spinach.
                  </p>

                  <div className="flex gap-3 mb-4">
                    <Badge size="sm" variant="default">
                      <Clock size={10} className="inline -mt-px mr-1" />
                      35 min
                    </Badge>
                    <Badge size="sm" variant="default">
                      <Users size={10} className="inline -mt-px mr-1" />
                      2 servings
                    </Badge>
                    <Badge size="sm" variant="success">
                      Easy
                    </Badge>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    {["Salmon", "Dill", "Parsley", "Lemon", "Spinach"].map(
                      (tag) => (
                        <Badge key={tag} size="sm">
                          {tag}
                        </Badge>
                      )
                    )}
                  </div>
                </CardBody>

                <CardFooter>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <AvatarGroup max={3}>
                        <Avatar
                          src="https://i.pravatar.cc/32?u=s1"
                          alt="User 1"
                          size="xs"
                        />
                        <Avatar
                          src="https://i.pravatar.cc/32?u=s2"
                          alt="User 2"
                          size="xs"
                        />
                        <Avatar
                          src="https://i.pravatar.cc/32?u=s3"
                          alt="User 3"
                          size="xs"
                        />
                        <Avatar
                          src="https://i.pravatar.cc/32?u=s4"
                          alt="User 4"
                          size="xs"
                        />
                      </AvatarGroup>
                      <span
                        className="text-xs"
                        style={{ color: "var(--ck-text-muted)" }}
                      >
                        243 cooked this
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Heart size={14} />
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        iconRight={<ArrowRight size={14} />}
                      >
                        Start Cooking
                      </Button>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </AnimateIn>
      </section>

      <BezierDivider flip opacity={0.6} speed={1.5} className="-mb-4" />

      {/* ──────────────────────────────────────────────
          SECTION 3 — COMPONENT GRID
          ────────────────────────────────────────────── */}
      <section className="mb-28">
        <AnimateIn direction="up">
          <div className="text-center mb-10">
            <h2
              className="text-2xl font-bold mb-2"
              style={{ color: "var(--ck-heading)" }}
            >
              Every component, live
            </h2>
            <p
              className="text-sm max-w-lg mx-auto"
              style={{ color: "var(--ck-text-muted)" }}
            >
              19 production-ready components rendered in real time. Click any
              card to explore docs, props, and examples.
            </p>
          </div>
        </AnimateIn>

        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5"
          staggerDelay={0.06}
        >
          {/* Button */}
          <StaggerItem>
            <PreviewCard title="Button" href="/components/button">
              <div className="flex gap-2">
                <Button variant="primary" size="sm">
                  Primary
                </Button>
                <Button variant="secondary" size="sm">
                  Secondary
                </Button>
                <Button variant="ghost" size="sm">
                  Ghost
                </Button>
              </div>
            </PreviewCard>
          </StaggerItem>

          {/* Input */}
          <StaggerItem>
            <PreviewCard title="Input" href="/components/input">
              <div className="w-full px-3">
                <Input placeholder="Search recipes..." inputSize="sm" />
              </div>
            </PreviewCard>
          </StaggerItem>

          {/* Card */}
          <StaggerItem>
            <PreviewCard title="Card" href="/components/card">
              <Card padding="sm">
                <CardBody>
                  <div
                    className="text-xs font-semibold mb-1"
                    style={{ color: "var(--ck-heading)" }}
                  >
                    Recipe of the Day
                  </div>
                  <div
                    className="text-[10px]"
                    style={{ color: "var(--ck-text-muted)" }}
                  >
                    Pasta Carbonara — 25 min
                  </div>
                </CardBody>
              </Card>
            </PreviewCard>
          </StaggerItem>

          {/* Badge */}
          <StaggerItem>
            <PreviewCard title="Badge" href="/components/badge">
              <div className="flex gap-2 justify-center">
                <Badge variant="success">New</Badge>
                <Badge variant="info">Popular</Badge>
                <Badge variant="error">Spicy</Badge>
              </div>
            </PreviewCard>
          </StaggerItem>

          {/* Avatar */}
          <StaggerItem>
            <PreviewCard title="Avatar" href="/components/avatar">
              <div className="flex gap-2 justify-center">
                <Avatar alt="JD" size="md" />
                <Avatar alt="SK" size="md" />
                <Avatar alt="AR" size="md" />
              </div>
            </PreviewCard>
          </StaggerItem>

          {/* Modal */}
          <StaggerItem>
            <PreviewCard title="Modal" href="/components/modal">
              <div className="w-full px-2">
                <div
                  className="rounded-xl border p-3 text-center"
                  style={{
                    borderColor: "var(--ck-border)",
                    background: "var(--ck-surface)",
                  }}
                >
                  <div
                    className="text-xs font-semibold mb-1"
                    style={{ color: "var(--ck-heading)" }}
                  >
                    Confirm Action
                  </div>
                  <div
                    className="text-[10px] mb-2"
                    style={{ color: "var(--ck-text-muted)" }}
                  >
                    Save changes to your recipe?
                  </div>
                  <div className="flex gap-1.5 justify-center">
                    <Button variant="ghost" size="sm">
                      Cancel
                    </Button>
                    <Button variant="primary" size="sm">
                      Confirm
                    </Button>
                  </div>
                </div>
              </div>
            </PreviewCard>
          </StaggerItem>

          {/* Tooltip */}
          <StaggerItem>
            <PreviewCard title="Tooltip" href="/components/tooltip">
              <div className="flex gap-3 items-center">
                <Tooltip content="Hover for hints" position="top">
                  <Badge variant="info">Hover me</Badge>
                </Tooltip>
              </div>
            </PreviewCard>
          </StaggerItem>

          {/* Toggle */}
          <StaggerItem>
            <PreviewCard title="Toggle" href="/components/toggle">
              <div className="flex flex-col gap-3">
                <Toggle
                  checked={demoToggle}
                  onChange={(e) => setDemoToggle(e.target.checked)}
                  label="Notifications"
                />
              </div>
            </PreviewCard>
          </StaggerItem>

          {/* Select */}
          <StaggerItem>
            <PreviewCard title="Select" href="/components/select">
              <div className="w-full px-3">
                <Select
                  placeholder="Choose cuisine..."
                  options={[
                    { value: "italian", label: "Italian" },
                    { value: "japanese", label: "Japanese" },
                    { value: "mexican", label: "Mexican" },
                  ]}
                  value=""
                  onChange={() => {}}
                />
              </div>
            </PreviewCard>
          </StaggerItem>

          {/* Skeleton */}
          <StaggerItem>
            <PreviewCard title="Skeleton" href="/components/skeleton">
              <div className="w-full px-3 flex flex-col gap-2">
                <Skeleton variant="text" />
                <Skeleton variant="text" width="75%" />
                <Skeleton variant="text" width="50%" />
              </div>
            </PreviewCard>
          </StaggerItem>

          {/* Alert */}
          <StaggerItem>
            <PreviewCard title="Alert" href="/components/alert">
              <div className="w-full px-2">
                <Alert variant="success" title="Saved!">
                  Recipe published successfully.
                </Alert>
              </div>
            </PreviewCard>
          </StaggerItem>

          {/* Divider */}
          <StaggerItem>
            <PreviewCard title="Divider" href="/components/divider">
              <div className="w-full px-4 flex flex-col gap-2">
                <div
                  className="text-xs"
                  style={{ color: "var(--ck-text-muted)" }}
                >
                  Ingredients
                </div>
                <Divider />
                <div
                  className="text-xs"
                  style={{ color: "var(--ck-heading)" }}
                >
                  Instructions
                </div>
                <Divider label="OR" />
                <div
                  className="text-xs"
                  style={{ color: "var(--ck-text-muted)" }}
                >
                  Notes
                </div>
              </div>
            </PreviewCard>
          </StaggerItem>

          {/* Checkbox */}
          <StaggerItem>
            <PreviewCard title="Checkbox" href="/components/checkbox">
              <div className="flex flex-col gap-2.5">
                {[
                  { label: "Fresh herbs", checked: true },
                  { label: "Olive oil", checked: true },
                  { label: "Sea salt", checked: false },
                ].map(({ label, checked }) => (
                  <label key={label} className="flex items-center gap-2.5 cursor-pointer">
                    <span
                      className="w-4 h-4 rounded flex items-center justify-center border flex-shrink-0"
                      style={{
                        borderColor: checked ? "var(--ck-primary)" : "var(--ck-border)",
                        background: checked ? "var(--ck-primary)" : "transparent",
                      }}
                    >
                      {checked && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 3.5L4 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                    <span className="text-xs" style={{ color: checked ? "var(--ck-text)" : "var(--ck-text-muted)" }}>{label}</span>
                  </label>
                ))}
              </div>
            </PreviewCard>
          </StaggerItem>
        </StaggerContainer>
      </section>

      {/* ──────────────────────────────────────────────
          SECTION 4 — FEATURES
          ────────────────────────────────────────────── */}
      <section className="mb-28">
        <AnimateIn direction="up">
          <div className="text-center mb-10">
            <h2
              className="text-2xl font-bold mb-2"
              style={{ color: "var(--ck-heading)" }}
            >
              Built for real products
            </h2>
            <p
              className="text-sm max-w-lg mx-auto"
              style={{ color: "var(--ck-text-muted)" }}
            >
              Every detail carefully considered, from design tokens to
              accessibility.
            </p>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Sparkles,
              title: "Design Tokens",
              description:
                "80+ carefully crafted CSS variables for colors, typography, spacing, and more.",
            },
            {
              icon: Smartphone,
              title: "Cross-Platform",
              description:
                "Build once, deploy everywhere. React for web, Flutter for mobile.",
            },
            {
              icon: Accessibility,
              title: "Accessible",
              description:
                "WCAG 2.1 compliant. Keyboard navigable. Screen reader friendly.",
            },
          ].map((feature, i) => (
            <AnimateIn key={feature.title} direction="up" delay={i * 0.1}>
              <div
                className="rounded-2xl border p-7 h-full transition-all duration-300 hover:shadow-lg"
                style={{
                  borderColor: "var(--ck-border)",
                  background: "var(--ck-surface)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: "rgba(122,154,101,0.1)" }}
                >
                  <feature.icon size={22} style={{ color: "var(--ck-primary)" }} />
                </div>
                <h3
                  className="text-base font-bold mb-2"
                  style={{ color: "var(--ck-heading)" }}
                >
                  {feature.title}
                </h3>
                <p
                  className="text-sm leading-relaxed m-0"
                  style={{ color: "var(--ck-text-muted)" }}
                >
                  {feature.description}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>

      <BezierDivider opacity={0.5} height={56} speed={2} className="-mb-4" />

      {/* ──────────────────────────────────────────────
          SECTION 5 — EXAMPLES
          ────────────────────────────────────────────── */}
      <section className="mb-28">
        <AnimateIn direction="up">
          <div className="text-center mb-10">
            <h2
              className="text-2xl font-bold mb-2"
              style={{ color: "var(--ck-heading)" }}
            >
              Real-world examples
            </h2>
            <p
              className="text-sm max-w-lg mx-auto"
              style={{ color: "var(--ck-text-muted)" }}
            >
              Complete UI patterns built with Cookest components, ready to copy
              into your project.
            </p>
          </div>
        </AnimateIn>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.06}>
          <StaggerItem>
            <ExampleCard
              title="Recipe Card"
              description="Complete recipe card with metadata, ingredients, and cooking actions."
              href="/examples/recipe-card"
              icon={Utensils}
            />
          </StaggerItem>
          <StaggerItem>
            <ExampleCard
              title="Login Form"
              description="Authentication form with validation and social login options."
              href="/examples/login-form"
              icon={ChefHat}
            />
          </StaggerItem>
          <StaggerItem>
            <ExampleCard
              title="Settings Panel"
              description="User preferences with toggles, selects, and form inputs."
              href="/examples/settings-panel"
              icon={Layers}
            />
          </StaggerItem>
          <StaggerItem>
            <ExampleCard
              title="Dashboard"
              description="Analytics overview with stat cards, alerts, and avatar groups."
              href="/examples/dashboard"
              icon={LayoutDashboard}
            />
          </StaggerItem>
          <StaggerItem>
            <ExampleCard
              title="Meal Planner"
              description="Weekly meal planning with badges, skeleton loading, and more."
              href="/examples/meal-planner"
              icon={CalendarDays}
            />
          </StaggerItem>
        </StaggerContainer>
      </section>

      {/* ──────────────────────────────────────────────
          SECTION 6 — FOOTER CTA
          ────────────────────────────────────────────── */}
      <section className="mb-16">
        <AnimateIn direction="up">
          <div
            className="rounded-3xl border p-12 text-center relative overflow-hidden"
            style={{
              borderColor: "var(--ck-border)",
              background: "var(--ck-surface)",
            }}
          >
            {/* Background glow */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
            >
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[250px] rounded-full opacity-15 blur-[100px]"
                style={{ background: "var(--ck-primary)" }}
              />
            </div>

            <div className="relative z-10">
              <h2
                className="text-3xl font-bold mb-3"
                style={{
                  color: "var(--ck-heading)",
                  fontFamily: "var(--font-serif)",
                }}
              >
                Ready to cook up something great?
              </h2>
              <p
                className="text-sm mb-8 max-w-md mx-auto"
                style={{ color: "var(--ck-text-muted)" }}
              >
                Get started with Cookest UI in minutes. Install, import, and
                build beautiful food experiences.
              </p>
              <div className="flex items-center justify-center gap-4">
                <Link href="/getting-started" className="no-underline">
                  <Button
                    variant="primary"
                    size="md"
                    iconRight={<ArrowRight size={16} />}
                  >
                    Get Started
                  </Button>
                </Link>
                <a
                  href="https://github.com/nicMusic/cookest-ui-components-library"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="no-underline"
                >
                  <Button variant="ghost" size="md">
                    <ExternalLink size={16} className="mr-2" />
                    GitHub
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </AnimateIn>
      </section>

      {/* ── Footer ── */}
      <footer
        className="pt-8 pb-6 border-t"
        style={{ borderColor: "var(--ck-border)" }}
      >
        <div className="flex items-center justify-between">
          <div className="text-xs" style={{ color: "var(--ck-text-muted)" }}>
            Built with @cookest/ui · Open source · MIT License
          </div>
          <div className="flex gap-4">
            <a
              href="https://github.com/nicMusic/cookest-ui-components-library"
              className="text-xs no-underline transition-colors hover:underline"
              style={{ color: "var(--ck-text-muted)" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <Link
              href="/tokens"
              className="text-xs no-underline transition-colors hover:underline"
              style={{ color: "var(--ck-text-muted)" }}
            >
              Tokens
            </Link>
            <Link
              href="/getting-started"
              className="text-xs no-underline transition-colors hover:underline"
              style={{ color: "var(--ck-text-muted)" }}
            >
              Docs
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
