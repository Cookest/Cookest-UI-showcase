"use client";

import { useState, useCallback } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Badge,
  Divider,
  Tooltip,
  Button,
} from "@cookest/ui";
import { Copy, Check, Palette, Type, Square, Circle, Layers, Sun, Moon, Zap, Move } from "lucide-react";

/* ── Token Data ────────────────────────────────────────────── */

const brandColors = [
  { name: "primary", variable: "--ck-primary", light: "#7a9a65", dark: "#8ab575" },
  { name: "primary-light", variable: "--ck-primary-light", light: "#b4cc9e", dark: "#6b9a55" },
  { name: "primary-dark", variable: "--ck-primary-dark", light: "#4e7a3a", dark: "#a8d490" },
];

const semanticColors = [
  { name: "background", variable: "--ck-bg", light: "#f5f5f0", dark: "#0e1512" },
  { name: "surface", variable: "--ck-surface", light: "#ffffff", dark: "#1a261e" },
  { name: "card", variable: "--ck-bg-card", light: "#fafaf6", dark: "#172019" },
  { name: "heading", variable: "--ck-heading", light: "#1c3a2a", dark: "#e0ede4" },
  { name: "text", variable: "--ck-text", light: "#3d5040", dark: "#b0c8b5" },
  { name: "muted", variable: "--ck-text-muted", light: "#7a8e74", dark: "#6a8a70" },
  { name: "border", variable: "--ck-border", light: "#e4ebe0", dark: "#253d2e" },
];

const statusColors = [
  { name: "success", variable: "--ck-success", hex: "#4caf50" },
  { name: "warning", variable: "--ck-warning", hex: "#ff9800" },
  { name: "error", variable: "--ck-error", hex: "#f44336" },
  { name: "info", variable: "--ck-info", hex: "#2196f3" },
];

const fontFamilies = [
  { name: "Serif", family: "'Playfair Display', serif", token: "Playfair Display" },
  { name: "Sans", family: "'Inter', sans-serif", token: "Inter" },
  { name: "Mono", family: "'JetBrains Mono', monospace", token: "JetBrains Mono" },
];

const fontSizes = [
  { name: "xs", px: 12 },
  { name: "sm", px: 14 },
  { name: "base", px: 16 },
  { name: "lg", px: 18 },
  { name: "xl", px: 20 },
  { name: "2xl", px: 24 },
  { name: "3xl", px: 30 },
  { name: "4xl", px: 36 },
  { name: "5xl", px: 48 },
];

const fontWeights = [
  { name: "light", value: 300 },
  { name: "normal", value: 400 },
  { name: "medium", value: 500 },
  { name: "semibold", value: 600 },
  { name: "bold", value: 700 },
];

const spacingValues = [
  { token: "1", px: 4 },
  { token: "2", px: 8 },
  { token: "3", px: 12 },
  { token: "4", px: 16 },
  { token: "6", px: 24 },
  { token: "8", px: 32 },
  { token: "12", px: 48 },
];

const radiusValues = [
  { name: "sm", px: 4 },
  { name: "md", px: 8 },
  { name: "lg", px: 12 },
  { name: "xl", px: 16 },
  { name: "2xl", px: 24 },
  { name: "full", px: 9999 },
];

const shadowValues = [
  { name: "sm", value: "0 1px 2px 0 rgba(0,0,0,0.05)" },
  { name: "md", value: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)" },
  { name: "lg", value: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)" },
];

const transitionValues = [
  { name: "fast", value: "150ms cubic-bezier(0.4, 0, 0.2, 1)", description: "Micro-interactions: toggles, checkboxes" },
  { name: "normal", value: "250ms cubic-bezier(0.4, 0, 0.2, 1)", description: "Standard transitions: hover, focus" },
  { name: "slow", value: "350ms cubic-bezier(0.4, 0, 0.2, 1)", description: "Larger animations: modals, panels" },
  { name: "bounce", value: "500ms cubic-bezier(0.34, 1.56, 0.64, 1)", description: "Playful bounce: notifications, badges" },
];

const zIndexValues = [
  { name: "base", value: 0, usage: "Default stacking" },
  { name: "dropdown", value: 10, usage: "Select menus, popups" },
  { name: "sticky", value: 20, usage: "Sticky headers, nav" },
  { name: "overlay", value: 30, usage: "Backdrop overlays" },
  { name: "modal", value: 40, usage: "Modal dialogs" },
  { name: "popover", value: 50, usage: "Popovers, tooltips" },
  { name: "tooltip", value: 60, usage: "Tooltip layer (top)" },
];

/* ── Helpers ────────────────────────────────────────────────── */

function useClipboard(timeout = 1500) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copy = useCallback(
    (text: string, key: string) => {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedKey(key);
        setTimeout(() => setCopiedKey(null), timeout);
      });
    },
    [timeout],
  );

  return { copiedKey, copy };
}

/* ── Color Swatch ──────────────────────────────────────────── */

function Swatch({
  color,
  label,
  hex,
  variable,
  size = 60,
  copiedKey,
  onCopy,
}: {
  color: string;
  label: string;
  hex: string;
  variable: string;
  size?: number;
  copiedKey: string | null;
  onCopy: (text: string, key: string) => void;
}) {
  const isCopied = copiedKey === variable;

  return (
    <Tooltip content={`var(${variable})`} position="top">
      <button
        onClick={() => onCopy(`var(${variable})`, variable)}
        className="flex flex-col items-center gap-2 group"
        style={{ border: "none", background: "none", cursor: "pointer" }}
      >
        <div
          className="relative flex items-center justify-center transition-transform group-hover:scale-105"
          style={{
            width: size,
            height: size,
            backgroundColor: color,
            borderRadius: 12,
            border: "1px solid var(--ck-border)",
          }}
        >
          {isCopied && <Check size={16} style={{ color: "#fff" }} />}
        </div>
        <span
          className="text-xs font-medium"
          style={{ color: "var(--ck-text)" }}
        >
          {label}
        </span>
        <span className="text-xs" style={{ color: "var(--ck-text-muted)" }}>
          {hex}
        </span>
      </button>
    </Tooltip>
  );
}

/* ── Copyable Token Value ───────────────────────────────────── */

function CopyableValue({
  label,
  value,
  copiedKey,
  onCopy,
}: {
  label: string;
  value: string;
  copiedKey: string | null;
  onCopy: (text: string, key: string) => void;
}) {
  const copyKey = `val-${label}-${value}`;
  const isCopied = copiedKey === copyKey;

  return (
    <button
      onClick={() => onCopy(value, copyKey)}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs cursor-pointer border"
      style={{
        borderColor: isCopied ? "var(--ck-primary)" : "var(--ck-border)",
        background: isCopied ? "rgba(122,154,101,0.1)" : "var(--ck-surface)",
        color: isCopied ? "var(--ck-primary)" : "var(--ck-text-muted)",
        fontFamily: "'JetBrains Mono', monospace",
      }}
      aria-label={`Copy ${value}`}
    >
      {isCopied ? <Check size={10} /> : <Copy size={10} />}
      {value}
    </button>
  );
}

/* ── Page ───────────────────────────────────────────────────── */

export default function TokensPage() {
  const { copiedKey, copy } = useClipboard();

  return (
    <div className="flex flex-col gap-12 max-w-4xl">
      {/* ── Header ──────────────────────────────────────────── */}
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <Palette size={28} style={{ color: "var(--ck-primary)" }} />
          <h1
            className="text-4xl font-bold"
            style={{
              color: "var(--ck-heading)",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Design Tokens
          </h1>
        </div>
        <p style={{ color: "var(--ck-text-muted)", fontSize: 16 }}>
          Visual reference for the Cookest design system tokens. Click any
          swatch to copy its CSS variable.
        </p>
      </header>

      {/* ── Color Palette ───────────────────────────────────── */}
      <section className="flex flex-col gap-8">
        <Divider label="Color Palette" />

        {/* Brand Colors */}
        <Card variant="outlined" padding="lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Circle size={16} style={{ color: "var(--ck-primary)" }} />
              <span
                className="font-semibold"
                style={{ color: "var(--ck-heading)" }}
              >
                Brand Colors
              </span>
            </div>
          </CardHeader>
          <CardBody>
            <div className="flex flex-wrap gap-8 items-start">
              {brandColors.map((c) => (
                <Swatch
                  key={c.variable}
                  color={c.light}
                  label={c.name}
                  hex={c.light}
                  variable={c.variable}
                  size={80}
                  copiedKey={copiedKey}
                  onCopy={copy}
                />
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Semantic Colors */}
        <Card variant="outlined" padding="lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Layers size={16} style={{ color: "var(--ck-primary)" }} />
              <span
                className="font-semibold"
                style={{ color: "var(--ck-heading)" }}
              >
                Semantic Colors
              </span>
            </div>
          </CardHeader>
          <CardBody>
            <div className="flex flex-col gap-6">
              {/* Light mode row */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Sun size={14} style={{ color: "var(--ck-text-muted)" }} />
                  <Badge variant="default" size="sm">Light</Badge>
                </div>
                <div className="flex flex-wrap gap-5 items-start">
                  {semanticColors.map((c) => (
                    <Swatch
                      key={`light-${c.variable}`}
                      color={c.light}
                      label={c.name}
                      hex={c.light}
                      variable={c.variable}
                      size={60}
                      copiedKey={copiedKey}
                      onCopy={copy}
                    />
                  ))}
                </div>
              </div>

              {/* Dark mode row */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Moon size={14} style={{ color: "var(--ck-text-muted)" }} />
                  <Badge variant="default" size="sm">Dark</Badge>
                </div>
                <div className="flex flex-wrap gap-5 items-start">
                  {semanticColors.map((c) => (
                    <Swatch
                      key={`dark-${c.variable}`}
                      color={c.dark}
                      label={c.name}
                      hex={c.dark}
                      variable={c.variable}
                      size={60}
                      copiedKey={copiedKey}
                      onCopy={copy}
                    />
                  ))}
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Status Colors */}
        <Card variant="outlined" padding="lg">
          <CardHeader>
            <span
              className="font-semibold"
              style={{ color: "var(--ck-heading)" }}
            >
              Status Colors
            </span>
          </CardHeader>
          <CardBody>
            <div className="flex flex-wrap gap-8 items-start">
              {statusColors.map((c) => (
                <Swatch
                  key={c.variable}
                  color={c.hex}
                  label={c.name}
                  hex={c.hex}
                  variable={c.variable}
                  size={60}
                  copiedKey={copiedKey}
                  onCopy={copy}
                />
              ))}
            </div>
          </CardBody>
        </Card>
      </section>

      {/* ── Typography ──────────────────────────────────────── */}
      <section className="flex flex-col gap-8">
        <Divider label="Typography" />

        {/* Font Families */}
        <Card variant="outlined" padding="lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Type size={16} style={{ color: "var(--ck-primary)" }} />
              <span
                className="font-semibold"
                style={{ color: "var(--ck-heading)" }}
              >
                Font Families
              </span>
            </div>
          </CardHeader>
          <CardBody>
            <div className="flex flex-col gap-6">
              {fontFamilies.map((f) => (
                <div key={f.name} className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <Badge variant="info" size="sm">{f.name}</Badge>
                    <span
                      className="text-xs"
                      style={{ color: "var(--ck-text-muted)" }}
                    >
                      {f.token}
                    </span>
                  </div>
                  <p
                    className="text-lg"
                    style={{
                      fontFamily: f.family,
                      color: "var(--ck-text)",
                    }}
                  >
                    The quick brown fox jumps over the lazy dog
                  </p>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Font Sizes */}
        <Card variant="outlined" padding="lg">
          <CardHeader>
            <span
              className="font-semibold"
              style={{ color: "var(--ck-heading)" }}
            >
              Font Sizes
            </span>
          </CardHeader>
          <CardBody>
            <div className="flex flex-col gap-4">
              {fontSizes.map((s) => (
                <div key={s.name} className="flex items-baseline gap-4">
                  <div style={{ minWidth: 100 }}>
                    <Badge variant="default" size="sm">
                      {s.name} — {s.px}px
                    </Badge>
                  </div>
                  <span
                    style={{
                      fontSize: s.px,
                      color: "var(--ck-text)",
                      fontFamily: "'Inter', sans-serif",
                      lineHeight: 1.4,
                    }}
                  >
                    Cookest
                  </span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Font Weights */}
        <Card variant="outlined" padding="lg">
          <CardHeader>
            <span
              className="font-semibold"
              style={{ color: "var(--ck-heading)" }}
            >
              Font Weights
            </span>
          </CardHeader>
          <CardBody>
            <div className="flex flex-col gap-4">
              {fontWeights.map((w) => (
                <div key={w.value} className="flex items-center gap-4">
                  <div style={{ minWidth: 130 }}>
                    <Badge variant="default" size="sm">
                      {w.name} — {w.value}
                    </Badge>
                  </div>
                  <span
                    className="text-lg"
                    style={{
                      fontWeight: w.value,
                      color: "var(--ck-text)",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    Cookest Design System
                  </span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </section>

      {/* ── Spacing ─────────────────────────────────────────── */}
      <section className="flex flex-col gap-8">
        <Divider label="Spacing" />

        <Card variant="outlined" padding="lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Square size={16} style={{ color: "var(--ck-primary)" }} />
              <span
                className="font-semibold"
                style={{ color: "var(--ck-heading)" }}
              >
                4px Grid Scale
              </span>
            </div>
          </CardHeader>
          <CardBody>
            <div className="flex flex-wrap gap-6 items-end">
              {spacingValues.map((s) => (
                <div
                  key={s.token}
                  className="flex flex-col items-center gap-2"
                >
                  <div
                    style={{
                      width: s.px,
                      height: s.px,
                      backgroundColor: "var(--ck-primary)",
                      borderRadius: 4,
                    }}
                  />
                  <span
                    className="text-xs font-medium"
                    style={{ color: "var(--ck-text)" }}
                  >
                    {s.token}
                  </span>
                  <span
                    className="text-xs"
                    style={{ color: "var(--ck-text-muted)" }}
                  >
                    {s.px}px
                  </span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </section>

      {/* ── Border Radius ───────────────────────────────────── */}
      <section className="flex flex-col gap-8">
        <Divider label="Border Radius" />

        <Card variant="outlined" padding="lg">
          <CardBody>
            <div className="flex flex-wrap gap-8 items-start">
              {radiusValues.map((r) => (
                <div
                  key={r.name}
                  className="flex flex-col items-center gap-2"
                >
                  <div
                    style={{
                      width: 60,
                      height: 60,
                      backgroundColor: "var(--ck-primary)",
                      borderRadius: r.px,
                    }}
                  />
                  <span
                    className="text-xs font-medium"
                    style={{ color: "var(--ck-text)" }}
                  >
                    {r.name}
                  </span>
                  <span
                    className="text-xs"
                    style={{ color: "var(--ck-text-muted)" }}
                  >
                    {r.px === 9999 ? "9999px" : `${r.px}px`}
                  </span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </section>

      {/* ── Shadows ─────────────────────────────────────────── */}
      <section className="flex flex-col gap-8">
        <Divider label="Shadows" />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {shadowValues.map((s) => (
            <button
              key={s.name}
              onClick={() => copy(s.value, `shadow-${s.name}`)}
              style={{ border: "none", background: "none", cursor: "pointer", padding: 0 }}
              aria-label={`Copy shadow ${s.name} value`}
            >
              <Card variant="default" padding="md">
                <CardBody>
                  <div
                    className="flex flex-col items-center gap-4"
                    style={{ boxShadow: s.value, borderRadius: 8, padding: 24 }}
                  >
                    <span
                      className="text-lg font-semibold"
                      style={{ color: "var(--ck-heading)" }}
                    >
                      Shadow {s.name.toUpperCase()}
                    </span>
                    <div className="flex items-center gap-2">
                      {copiedKey === `shadow-${s.name}` ? (
                        <Check size={12} style={{ color: "var(--ck-primary)" }} />
                      ) : (
                        <Copy size={12} style={{ color: "var(--ck-text-muted)" }} />
                      )}
                      <code
                        className="text-xs break-all text-center"
                        style={{
                          color: "var(--ck-text-muted)",
                          fontFamily: "'JetBrains Mono', monospace",
                        }}
                      >
                        {s.value}
                      </code>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </button>
          ))}
        </div>
      </section>

      {/* ── Transitions & Animations ────────────────────────── */}
      <section className="flex flex-col gap-8">
        <Divider label="Transitions & Animations" />

        <Card variant="outlined" padding="lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Zap size={16} style={{ color: "var(--ck-primary)" }} />
              <span className="font-semibold" style={{ color: "var(--ck-heading)" }}>
                Transition Timing
              </span>
            </div>
          </CardHeader>
          <CardBody>
            <div className="flex flex-col gap-5">
              {transitionValues.map((t) => (
                <div
                  key={t.name}
                  className="flex items-center gap-4 group"
                >
                  <div style={{ minWidth: 80 }}>
                    <Badge variant="default" size="sm">{t.name}</Badge>
                  </div>

                  {/* Animation demo */}
                  <div
                    className="flex-1 relative h-8 rounded-lg overflow-hidden"
                    style={{ background: "var(--ck-bg)", border: "1px solid var(--ck-border)" }}
                  >
                    <div
                      className="absolute top-1 left-1 bottom-1 w-8 rounded-md group-hover:left-[calc(100%-2.25rem)]"
                      style={{
                        background: "var(--ck-primary)",
                        transition: `left ${t.value}`,
                      }}
                    />
                  </div>

                  <CopyableValue
                    label={t.name}
                    value={t.value}
                    copiedKey={copiedKey}
                    onCopy={copy}
                  />
                </div>
              ))}
              <p className="text-xs m-0 mt-2" style={{ color: "var(--ck-text-muted)" }}>
                Hover each row to see the transition in action.
              </p>
            </div>
          </CardBody>
        </Card>
      </section>

      {/* ── Z-Index ─────────────────────────────────────────── */}
      <section className="flex flex-col gap-8">
        <Divider label="Z-Index" />

        <Card variant="outlined" padding="lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Move size={16} style={{ color: "var(--ck-primary)" }} />
              <span className="font-semibold" style={{ color: "var(--ck-heading)" }}>
                Stacking Order
              </span>
            </div>
          </CardHeader>
          <CardBody>
            <div className="flex flex-col gap-3">
              {zIndexValues.map((z) => (
                <div
                  key={z.name}
                  className="flex items-center gap-4"
                >
                  <div style={{ minWidth: 80 }}>
                    <Badge variant="default" size="sm">{z.name}</Badge>
                  </div>

                  {/* Visual bar */}
                  <div className="flex-1 relative h-6 rounded-md overflow-hidden"
                    style={{ background: "var(--ck-bg)" }}
                  >
                    <div
                      className="absolute top-0 left-0 bottom-0 rounded-md flex items-center justify-end pr-2"
                      style={{
                        width: `${Math.max(8, (z.value / 60) * 100)}%`,
                        background: `rgba(122,154,101,${0.15 + (z.value / 60) * 0.6})`,
                      }}
                    >
                      <span
                        className="text-xs font-mono font-semibold"
                        style={{ color: "var(--ck-primary)" }}
                      >
                        {z.value}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs shrink-0" style={{ color: "var(--ck-text-muted)", minWidth: 140 }}>
                    {z.usage}
                  </span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </section>

      {/* ── Copy Feedback Bar ───────────────────────────────── */}
      {copiedKey && (
        <div
          className="fixed bottom-6 left-1/2 flex items-center gap-2 px-4 py-2"
          style={{
            transform: "translateX(-50%)",
            backgroundColor: "var(--ck-heading)",
            color: "var(--ck-bg)",
            borderRadius: 9999,
            fontSize: 13,
            fontFamily: "'JetBrains Mono', monospace",
            zIndex: 50,
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          }}
        >
          <Check size={14} />
          <span>Copied var({copiedKey})</span>
        </div>
      )}
    </div>
  );
}
