"use client";

import { AnimateIn, StaggerContainer, StaggerItem } from "@/components/AnimateIn";
import { Breadcrumb } from "@/components/Breadcrumb";
import {
  Utensils,
  Ruler,
  Feather,
  Accessibility,
  Smartphone,
  Puzzle,
  Palette,
  Grid3X3,
  Type,
  CheckCircle2,
  XCircle,
} from "lucide-react";

/* ── Data ──────────────────────────────────────────────────── */

const principles = [
  {
    emoji: "🍳",
    icon: Utensils,
    title: "Flavor First",
    description:
      "Every component should feel warm, inviting, and appetizing. We use earthy greens, warm ambers, and creamy whites to evoke the joy of cooking.",
  },
  {
    emoji: "📐",
    icon: Ruler,
    title: "Consistent Proportions",
    description:
      "Like a well-balanced recipe, every component follows an 8px spacing grid and consistent border-radius scale.",
  },
  {
    emoji: "🪶",
    icon: Feather,
    title: "Lightweight by Default",
    description:
      "Components ship minimal CSS. No heavy dependencies. Tree-shakeable. Under 15KB gzipped.",
  },
  {
    emoji: "♿",
    icon: Accessibility,
    title: "Inclusive Design",
    description:
      "WCAG 2.1 AA compliant. Every component is keyboard navigable, screen reader compatible, and supports reduced motion.",
  },
  {
    emoji: "📱",
    icon: Smartphone,
    title: "Cross-Platform Parity",
    description:
      "React and Flutter components share identical design tokens, ensuring visual consistency across web and mobile.",
  },
  {
    emoji: "🧩",
    icon: Puzzle,
    title: "Composable Architecture",
    description:
      "Small, focused components that compose naturally. Build complex UIs from simple building blocks.",
  },
];

const colorSwatches = [
  {
    label: "Primary Green",
    hex: "#7A9A65",
    note: "Inspired by fresh herbs and garden greens",
  },
  {
    label: "Background",
    hex: "#F5F5F0",
    note: "Warm cream — like parchment or flour-dusted counters",
  },
  {
    label: "Heading",
    hex: "#1C3A2A",
    note: "Deep forest ink for clear, grounded headlines",
  },
  {
    label: "Text",
    hex: "#3D5040",
    note: "Soft, readable body text with natural warmth",
  },
  {
    label: "Success",
    hex: "#4CAF50",
    note: "Intuitive green for positive feedback",
  },
  {
    label: "Warning",
    hex: "#FF9800",
    note: "Amber caution — like a timer about to ring",
  },
  {
    label: "Error",
    hex: "#F44336",
    note: "Clear red for errors and destructive actions",
  },
];

const spacingScale = [
  { token: "0.5", px: 4 },
  { token: "1", px: 8 },
  { token: "1.5", px: 12 },
  { token: "2", px: 16 },
  { token: "3", px: 24 },
  { token: "4", px: 32 },
  { token: "6", px: 48 },
  { token: "8", px: 64 },
  { token: "12", px: 96 },
];

const typeSamples = [
  {
    family: "Playfair Display",
    css: "var(--font-serif), 'Playfair Display', serif",
    role: "Display & Headlines",
    tag: "Serif",
    sizes: [
      { label: "5xl · 48px", px: 48, weight: 700 },
      { label: "4xl · 36px", px: 36, weight: 700 },
      { label: "3xl · 30px", px: 30, weight: 600 },
    ],
  },
  {
    family: "Inter",
    css: "'Inter', sans-serif",
    role: "Body & UI",
    tag: "Sans-serif",
    sizes: [
      { label: "lg · 18px", px: 18, weight: 400 },
      { label: "base · 16px", px: 16, weight: 400 },
      { label: "sm · 14px", px: 14, weight: 500 },
    ],
  },
  {
    family: "JetBrains Mono",
    css: "'JetBrains Mono', monospace",
    role: "Code & Technical",
    tag: "Monospace",
    sizes: [
      { label: "base · 16px", px: 16, weight: 400 },
      { label: "sm · 14px", px: 14, weight: 400 },
      { label: "xs · 12px", px: 12, weight: 400 },
    ],
  },
];

const dos = [
  "Use consistent spacing from the 8px grid",
  "Follow the color system — use tokens, not hex codes",
  "Compose small components into complex layouts",
  "Test with keyboard and screen readers",
  "Respect reduced-motion preferences",
];

const donts = [
  "Override design tokens with arbitrary values",
  "Nest cards more than two levels deep",
  "Mix serif and sans-serif fonts in body text",
  "Use color alone to convey meaning",
  "Skip focus indicators for interactive elements",
];

/* ── Shared Styles ─────────────────────────────────────────── */

const sectionStyle: React.CSSProperties = {
  marginTop: 64,
};

const sectionTitleStyle: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontSize: 28,
  fontWeight: 700,
  color: "var(--ck-heading)",
  marginBottom: 8,
};

const sectionSubStyle: React.CSSProperties = {
  fontSize: 15,
  lineHeight: 1.7,
  color: "var(--ck-text-muted)",
  maxWidth: 640,
  marginBottom: 32,
};

const cardStyle: React.CSSProperties = {
  background: "var(--ck-surface)",
  border: "1px solid var(--ck-border)",
  borderRadius: 16,
  padding: 28,
};

/* ── Page ──────────────────────────────────────────────────── */

export default function DesignPrinciplesPage() {
  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "40px 24px 80px" }}>
      {/* ── Header ──────────────────────────────────────────── */}
      <AnimateIn>
        <Breadcrumb />
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: 44,
            fontWeight: 700,
            color: "var(--ck-heading)",
            lineHeight: 1.15,
            marginBottom: 12,
          }}
        >
          Design Principles
        </h1>
        <p
          style={{
            fontSize: 17,
            lineHeight: 1.7,
            color: "var(--ck-text-muted)",
            maxWidth: 620,
          }}
        >
          The philosophy behind every color, component, and interaction in the
          Cookest design system. These principles guide us in creating interfaces
          that feel as delightful as the meals our users create.
        </p>
      </AnimateIn>

      {/* ── Decorative divider ──────────────────────────────── */}
      <div
        style={{
          height: 1,
          background:
            "linear-gradient(90deg, transparent, var(--ck-border), transparent)",
          margin: "40px 0",
        }}
      />

      {/* ── Core Principles ─────────────────────────────────── */}
      <AnimateIn delay={0.1}>
        <section style={sectionStyle}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <Palette size={20} style={{ color: "var(--ck-primary)" }} />
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: 1.2,
                textTransform: "uppercase",
                color: "var(--ck-primary)",
              }}
            >
              Foundation
            </span>
          </div>
          <h2 style={sectionTitleStyle}>Core Principles</h2>
          <p style={sectionSubStyle}>
            Six guiding ideas that shape every decision we make — from choosing
            a border-radius to building an entire page layout.
          </p>

          <StaggerContainer className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5">
            {principles.map((p) => (
              <StaggerItem key={p.title}>
                <div style={{ ...cardStyle, height: "100%" }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: "var(--ck-bg)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 16,
                      fontSize: 22,
                    }}
                  >
                    {p.emoji}
                  </div>
                  <h3
                    style={{
                      fontSize: 17,
                      fontWeight: 600,
                      color: "var(--ck-heading)",
                      marginBottom: 8,
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 14,
                      lineHeight: 1.65,
                      color: "var(--ck-text)",
                      margin: 0,
                    }}
                  >
                    {p.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>
      </AnimateIn>

      {/* ── Color Philosophy ────────────────────────────────── */}
      <AnimateIn delay={0.15}>
        <section style={sectionStyle}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <Palette size={20} style={{ color: "var(--ck-primary)" }} />
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: 1.2,
                textTransform: "uppercase",
                color: "var(--ck-primary)",
              }}
            >
              Color
            </span>
          </div>
          <h2 style={sectionTitleStyle}>Color Philosophy</h2>
          <p style={sectionSubStyle}>
            Our palette is drawn from the kitchen — fresh herbs, warm wood, and
            sun-ripened produce. Every hue is chosen for meaning, not decoration.
          </p>

          <StaggerContainer className="flex flex-col gap-3">
            {colorSwatches.map((c) => (
              <StaggerItem key={c.label}>
                <div
                  style={{
                    ...cardStyle,
                    padding: "16px 20px",
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 10,
                      background: c.hex,
                      border: "1px solid var(--ck-border)",
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 2 }}>
                      <span
                        style={{
                          fontWeight: 600,
                          fontSize: 14,
                          color: "var(--ck-heading)",
                        }}
                      >
                        {c.label}
                      </span>
                      <code
                        style={{
                          fontSize: 12,
                          color: "var(--ck-text-muted)",
                          fontFamily: "'JetBrains Mono', monospace",
                        }}
                      >
                        {c.hex}
                      </code>
                    </div>
                    <p style={{ fontSize: 13, color: "var(--ck-text)", margin: 0, lineHeight: 1.5 }}>
                      {c.note}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>
      </AnimateIn>

      {/* ── Spacing System ──────────────────────────────────── */}
      <AnimateIn delay={0.15}>
        <section style={sectionStyle}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <Grid3X3 size={20} style={{ color: "var(--ck-primary)" }} />
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: 1.2,
                textTransform: "uppercase",
                color: "var(--ck-primary)",
              }}
            >
              Spacing
            </span>
          </div>
          <h2 style={sectionTitleStyle}>Spacing System</h2>
          <p style={sectionSubStyle}>
            A base-8 spacing scale keeps layouts rhythmic and predictable.
            Multiples of 8px create natural vertical and horizontal harmony,
            with a 4px half-step for tighter contexts.
          </p>

          <div style={cardStyle}>
            <StaggerContainer className="flex flex-col gap-3.5">
              {spacingScale.map((s) => (
                <StaggerItem key={s.token}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <code
                      style={{
                        width: 48,
                        textAlign: "right",
                        fontSize: 13,
                        fontFamily: "'JetBrains Mono', monospace",
                        color: "var(--ck-text-muted)",
                        flexShrink: 0,
                      }}
                    >
                      {s.token}
                    </code>
                    <div
                      style={{
                        width: Math.min(s.px * 3, 480),
                        height: 28,
                        borderRadius: 6,
                        background:
                          "linear-gradient(90deg, var(--ck-primary), color-mix(in srgb, var(--ck-primary) 40%, transparent))",
                        transition: "width 0.4s ease",
                      }}
                    />
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 500,
                        color: "var(--ck-heading)",
                        flexShrink: 0,
                      }}
                    >
                      {s.px}px
                    </span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      </AnimateIn>

      {/* ── Typography Scale ────────────────────────────────── */}
      <AnimateIn delay={0.15}>
        <section style={sectionStyle}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <Type size={20} style={{ color: "var(--ck-primary)" }} />
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: 1.2,
                textTransform: "uppercase",
                color: "var(--ck-primary)",
              }}
            >
              Typography
            </span>
          </div>
          <h2 style={sectionTitleStyle}>Typography Scale</h2>
          <p style={sectionSubStyle}>
            Three typeface families — each chosen for a specific role.
            Playfair Display brings editorial warmth, Inter ensures effortless
            readability, and JetBrains Mono keeps code crisp.
          </p>

          <StaggerContainer className="flex flex-col gap-5">
            {typeSamples.map((t) => (
              <StaggerItem key={t.family}>
                <div style={cardStyle}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      marginBottom: 20,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: "var(--ck-heading)",
                      }}
                    >
                      {t.family}
                    </span>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        padding: "2px 8px",
                        borderRadius: 6,
                        background: "var(--ck-bg)",
                        color: "var(--ck-primary)",
                      }}
                    >
                      {t.tag}
                    </span>
                    <span style={{ fontSize: 13, color: "var(--ck-text-muted)" }}>
                      — {t.role}
                    </span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {t.sizes.map((s) => (
                      <div
                        key={s.label}
                        style={{
                          display: "flex",
                          alignItems: "baseline",
                          gap: 16,
                        }}
                      >
                        <code
                          style={{
                            width: 100,
                            flexShrink: 0,
                            fontSize: 12,
                            fontFamily: "'JetBrains Mono', monospace",
                            color: "var(--ck-text-muted)",
                          }}
                        >
                          {s.label}
                        </code>
                        <span
                          style={{
                            fontFamily: t.css,
                            fontSize: s.px,
                            fontWeight: s.weight,
                            color: "var(--ck-heading)",
                            lineHeight: 1.3,
                          }}
                        >
                          The quick brown fox
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>
      </AnimateIn>

      {/* ── Do's & Don'ts ───────────────────────────────────── */}
      <AnimateIn delay={0.15}>
        <section style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Do&rsquo;s &amp; Don&rsquo;ts</h2>
          <p style={sectionSubStyle}>
            Quick guidelines to keep your Cookest interfaces consistent and
            accessible.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 20,
            }}
          >
            {/* DO */}
            <div
              style={{
                ...cardStyle,
                borderTop: "3px solid #4CAF50",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 16,
                }}
              >
                <CheckCircle2 size={20} style={{ color: "#4CAF50" }} />
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#4CAF50",
                  }}
                >
                  Do
                </span>
              </div>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {dos.map((d) => (
                  <li
                    key={d}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 8,
                      fontSize: 14,
                      lineHeight: 1.6,
                      color: "var(--ck-text)",
                    }}
                  >
                    <span style={{ color: "#4CAF50", flexShrink: 0, marginTop: 2 }}>✓</span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            {/* DON'T */}
            <div
              style={{
                ...cardStyle,
                borderTop: "3px solid #F44336",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 16,
                }}
              >
                <XCircle size={20} style={{ color: "#F44336" }} />
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#F44336",
                  }}
                >
                  Don&rsquo;t
                </span>
              </div>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {donts.map((d) => (
                  <li
                    key={d}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 8,
                      fontSize: 14,
                      lineHeight: 1.6,
                      color: "var(--ck-text)",
                    }}
                  >
                    <span style={{ color: "#F44336", flexShrink: 0, marginTop: 2 }}>✗</span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </AnimateIn>

      {/* ── Footer spacer ───────────────────────────────────── */}
      <div style={{ height: 48 }} />
    </div>
  );
}
