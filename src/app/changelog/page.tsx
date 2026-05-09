"use client";

import { Breadcrumb } from "@/components/Breadcrumb";
import { AnimateIn, StaggerContainer, StaggerItem } from "@/components/AnimateIn";
import {
  Rocket,
  Package,
  Sparkles,
  Bug,
  Zap,
  Paintbrush,
  ArrowRight,
} from "lucide-react";

interface ChangelogEntry {
  version: string;
  date: string;
  tag: "major" | "minor" | "patch";
  changes: Array<{
    type: "feat" | "fix" | "perf" | "style" | "refactor";
    title: string;
    description: string;
  }>;
}

const typeConfig = {
  feat: { icon: Sparkles, color: "var(--ck-primary)", bg: "rgba(122,154,101,0.1)", label: "Feature" },
  fix: { icon: Bug, color: "var(--ck-error, #e53e3e)", bg: "rgba(229,62,62,0.1)", label: "Fix" },
  perf: { icon: Zap, color: "var(--ck-warning, #dd6b20)", bg: "rgba(221,107,32,0.1)", label: "Performance" },
  style: { icon: Paintbrush, color: "var(--ck-info, #3182ce)", bg: "rgba(49,130,206,0.1)", label: "Style" },
  refactor: { icon: Package, color: "#805ad5", bg: "rgba(128,90,213,0.1)", label: "Refactor" },
};

const tagColors = {
  major: { bg: "rgba(229,62,62,0.1)", color: "var(--ck-error, #e53e3e)" },
  minor: { bg: "rgba(122,154,101,0.1)", color: "var(--ck-primary)" },
  patch: { bg: "rgba(49,130,206,0.1)", color: "var(--ck-info, #3182ce)" },
};

const changelog: ChangelogEntry[] = [
  {
    version: "0.1.4",
    date: "May 2026",
    tag: "minor",
    changes: [
      { type: "fix", title: "Button Layout & Alignment", description: "Enforced horizontal flex layouts and whitespace-nowrap for Button components, resolving issues where icons would stack vertically above text." },
      { type: "fix", title: "Container Corner Clipping", description: "Standardized overflow-hidden and refined border-radius (rounded-lg/md) across Card, Dialog, Command, and Dropdown components to prevent artifacts." },
      { type: "feat", title: "Component Library Expansion", description: "Added 10+ new advanced components to the React library including Chart, Carousel, Command, Calendar, and AspectRatio." },
      { type: "feat", title: "Massive Flutter Expansion", description: "Ported 13+ missing widgets to the Flutter library (cookest_ui) to achieve 50% platform parity. Added Checkbox, Label, Separator, AlertDialog, Drawer, and more." },
      { type: "fix", title: "Vercel Build Optimization", description: "Fixed invalid CSS calc() syntax in Sidebar component that was causing build warnings in Tailwind 4 environments." },
    ],
  },
  {
    version: "0.1.3",
    date: "May 2026",
    tag: "patch",
    changes: [
      { type: "fix", title: "Alert Light Mode Contrast", description: "Removed opacity modifiers from Alert body text in light mode — all four variants now render at full opacity for legibility." },
      { type: "fix", title: "Badge Color Depth", description: "Bumped badge text from -800 to -900 shade across success, warning, error, and info variants for better contrast on light backgrounds." },
      { type: "style", title: "Backdrop Blur Upgrade", description: "Sidebar now uses backdrop-filter: blur with semi-transparent surface — glassy, modern feel consistent with alerts." },
      { type: "feat", title: "7 Creative Examples", description: "Added Terminal CLI, Kitchen Display, Editorial, Recipe Story, Nutrition Dashboard, Kinetic Menu, and Filmstrip to the examples gallery." },
      { type: "style", title: "Grain Texture Background", description: "Subtle SVG noise grain added to page body for depth without visual noise." },
    ],
  },
  {
    version: "1.0.0",
    date: "May 2026",
    tag: "major",
    changes: [
      { type: "feat", title: "Initial Release", description: "12 production-ready React components with full TypeScript support." },
      { type: "feat", title: "Flutter Widgets", description: "12 matching Flutter widgets for cross-platform parity." },
      { type: "feat", title: "Design Tokens", description: "80+ CSS custom properties for colors, typography, spacing, and effects." },
      { type: "feat", title: "Dark Mode", description: "Full light and dark theme support with automatic system detection." },
      { type: "feat", title: "Storybook Integration", description: "Interactive stories for every component with controls and documentation." },
      { type: "feat", title: "Showcase Website", description: "Next.js showcase site with interactive playgrounds and real-world examples." },
    ],
  },
  {
    version: "0.9.0",
    date: "April 2026",
    tag: "minor",
    changes: [
      { type: "feat", title: "Component Library Core", description: "Built foundational components: Button, Input, Card, Badge, Alert." },
      { type: "feat", title: "Design Token System", description: "Established the CSS custom property token system with light/dark variants." },
      { type: "style", title: "Typography Scale", description: "Defined the Inter + Playfair Display + JetBrains Mono type system." },
      { type: "perf", title: "Tree Shaking", description: "Configured tsup bundler for optimal tree-shaking and minimal bundle size." },
    ],
  },
  {
    version: "0.5.0",
    date: "March 2026",
    tag: "minor",
    changes: [
      { type: "feat", title: "Project Scaffolding", description: "Initialized monorepo with React library, Storybook, and build tooling." },
      { type: "feat", title: "Color System", description: "Defined the Cookest brand palette: sage green primary with warm neutrals." },
      { type: "refactor", title: "Component Architecture", description: "Established composable component patterns with variant props." },
    ],
  },
];

export default function ChangelogPage() {
  return (
    <div className="max-w-3xl">
      <Breadcrumb />

      <AnimateIn>
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(122,154,101,0.1)" }}
            >
              <Rocket size={20} style={{ color: "var(--ck-primary)" }} />
            </div>
            <h1
              className="text-3xl font-bold m-0"
              style={{ color: "var(--ck-heading)", fontFamily: "var(--font-serif)" }}
            >
              Changelog
            </h1>
          </div>
          <p className="text-base m-0" style={{ color: "var(--ck-text-muted)" }}>
            All notable changes to @cookest/ui are documented here. We follow{" "}
            <a
              href="https://semver.org"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--ck-primary)" }}
            >
              Semantic Versioning
            </a>.
          </p>
        </div>
      </AnimateIn>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div
          className="absolute left-[19px] top-0 bottom-0 w-px"
          style={{ background: "var(--ck-border)" }}
        />

        <StaggerContainer className="space-y-12" staggerDelay={0.12}>
          {changelog.map((entry) => (
            <StaggerItem key={entry.version}>
              <div className="relative pl-12">
                {/* Timeline dot */}
                <div
                  className="absolute left-2.5 top-1 w-4 h-4 rounded-full border-2"
                  style={{
                    borderColor: "var(--ck-primary)",
                    background: "var(--ck-bg)",
                  }}
                />

                {/* Version header */}
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <h2 className="text-xl font-bold m-0" style={{ color: "var(--ck-heading)" }}>
                    v{entry.version}
                  </h2>
                  <span
                    className="px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide"
                    style={{ background: tagColors[entry.tag].bg, color: tagColors[entry.tag].color }}
                  >
                    {entry.tag}
                  </span>
                  <span className="text-xs" style={{ color: "var(--ck-text-muted)" }}>
                    {entry.date}
                  </span>
                </div>

                {/* Changes */}
                <div className="space-y-3">
                  {entry.changes.map((change, i) => {
                    const config = typeConfig[change.type];
                    const Icon = config.icon;
                    return (
                      <div
                        key={i}
                        className="flex gap-3 p-3 rounded-xl border transition-colors duration-200"
                        style={{ borderColor: "var(--ck-border)", background: "var(--ck-surface)" }}
                      >
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ background: config.bg }}
                        >
                          <Icon size={14} style={{ color: config.color }} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-sm font-semibold" style={{ color: "var(--ck-heading)" }}>
                              {change.title}
                            </span>
                            <span
                              className="px-1.5 py-0.5 rounded text-[10px] font-medium"
                              style={{ background: config.bg, color: config.color }}
                            >
                              {config.label}
                            </span>
                          </div>
                          <p className="text-xs m-0 leading-relaxed" style={{ color: "var(--ck-text-muted)" }}>
                            {change.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* CTA */}
      <AnimateIn delay={0.3}>
        <div
          className="mt-16 p-8 rounded-2xl border text-center"
          style={{ borderColor: "var(--ck-border)", background: "var(--ck-surface)" }}
        >
          <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--ck-heading)" }}>
            Stay Updated
          </h3>
          <p className="text-sm mb-4" style={{ color: "var(--ck-text-muted)" }}>
            Star us on GitHub to get notified about new releases.
          </p>
          <a
            href="https://github.com/Cookest/cookest-ui-components-library"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium no-underline transition-opacity hover:opacity-80"
            style={{ background: "var(--ck-primary)", color: "white" }}
          >
            View on GitHub
            <ArrowRight size={14} />
          </a>
        </div>
      </AnimateIn>
    </div>
  );
}
