import Link from "next/link";
import {
  RectangleHorizontal,
  Type,
  SquareStack,
  Tag,
  CircleUser,
  PanelTop,
  MessageSquare,
  ToggleRight,
  ListFilter,
  Loader,
  AlertTriangle,
  SeparatorHorizontal,
} from "lucide-react";

const components = [
  { name: "Button", href: "/components/button", icon: RectangleHorizontal, desc: "Triggers actions with variants, sizes, loading, and icons" },
  { name: "Input", href: "/components/input", icon: Type, desc: "Text fields with labels, validation, and icon support" },
  { name: "Card", href: "/components/card", icon: SquareStack, desc: "Content containers with header, body, and footer slots" },
  { name: "Badge", href: "/components/badge", icon: Tag, desc: "Status labels with dot indicators and removable tags" },
  { name: "Avatar", href: "/components/avatar", icon: CircleUser, desc: "User images with initials fallback and group layout" },
  { name: "Modal", href: "/components/modal", icon: PanelTop, desc: "Dialog overlays with focus trap and animations" },
  { name: "Tooltip", href: "/components/tooltip", icon: MessageSquare, desc: "Contextual hints with directional positioning" },
  { name: "Toggle", href: "/components/toggle", icon: ToggleRight, desc: "Switch controls with animated thumb and labels" },
  { name: "Select", href: "/components/select", icon: ListFilter, desc: "Dropdown selection with search and keyboard nav" },
  { name: "Skeleton", href: "/components/skeleton", icon: Loader, desc: "Animated loading placeholders for any content" },
  { name: "Alert", href: "/components/alert", icon: AlertTriangle, desc: "Status messages — info, success, warning, error" },
  { name: "Divider", href: "/components/divider", icon: SeparatorHorizontal, desc: "Visual separators with optional labels" },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <div className="mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-6"
          style={{ background: "rgba(122,154,101,0.1)", color: "var(--ck-primary)" }}>
          <span className="w-2 h-2 rounded-full" style={{ background: "var(--ck-primary)" }} />
          v1.0.0 — React + Flutter
        </div>
        <h1 className="text-5xl font-bold mb-4 leading-tight"
          style={{ color: "var(--ck-heading)", fontFamily: "Playfair Display, serif" }}>
          Cookest UI
        </h1>
        <p className="text-lg max-w-2xl leading-relaxed"
          style={{ color: "var(--ck-text-muted)" }}>
          A cross-platform design system with 12 components shared between
          React and Flutter. Built from shared design tokens for pixel-perfect
          visual parity.
        </p>
        <div className="flex gap-3 mt-8">
          <code className="px-4 py-2.5 rounded-xl text-sm"
            style={{ background: "var(--ck-surface)", border: "1px solid var(--ck-border)", color: "var(--ck-text)" }}>
            bun add @cookest/ui
          </code>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-16">
        {[
          { label: "Components", value: "12" },
          { label: "Platforms", value: "2" },
          { label: "Tests", value: "63" },
          { label: "Tokens", value: "80+" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl p-5 border text-center"
            style={{ borderColor: "var(--ck-border)", background: "var(--ck-surface)" }}>
            <div className="text-2xl font-bold" style={{ color: "var(--ck-primary)" }}>
              {stat.value}
            </div>
            <div className="text-xs mt-1" style={{ color: "var(--ck-text-muted)" }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Component Grid */}
      <h2 className="text-xl font-semibold mb-6" style={{ color: "var(--ck-heading)" }}>
        Components
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {components.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group rounded-xl p-5 border no-underline transition-all hover:shadow-md"
            style={{
              borderColor: "var(--ck-border)",
              background: "var(--ck-surface)",
            }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(122,154,101,0.1)" }}>
                <c.icon size={16} style={{ color: "var(--ck-primary)" }} />
              </div>
              <span className="font-semibold text-sm" style={{ color: "var(--ck-heading)" }}>
                {c.name}
              </span>
            </div>
            <p className="text-xs leading-relaxed m-0" style={{ color: "var(--ck-text-muted)" }}>
              {c.desc}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
