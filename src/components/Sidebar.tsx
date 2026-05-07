"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";
import {
  Sun,
  Moon,
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
  Home,
  Layers,
  Utensils,
  ChefHat,
  Settings,
  BarChart3,
  Leaf,
  Palette,
  BookOpen,
} from "lucide-react";

const components = [
  { name: "Button", href: "/components/button", icon: RectangleHorizontal },
  { name: "Input", href: "/components/input", icon: Type },
  { name: "Card", href: "/components/card", icon: SquareStack },
  { name: "Badge", href: "/components/badge", icon: Tag },
  { name: "Avatar", href: "/components/avatar", icon: CircleUser },
  { name: "Modal", href: "/components/modal", icon: PanelTop },
  { name: "Tooltip", href: "/components/tooltip", icon: MessageSquare },
  { name: "Toggle", href: "/components/toggle", icon: ToggleRight },
  { name: "Select", href: "/components/select", icon: ListFilter },
  { name: "Skeleton", href: "/components/skeleton", icon: Loader },
  { name: "Alert", href: "/components/alert", icon: AlertTriangle },
  { name: "Divider", href: "/components/divider", icon: SeparatorHorizontal },
];

const examples = [
  { name: "Recipe Card", href: "/examples/recipe-card", icon: Utensils },
  { name: "Login Form", href: "/examples/login-form", icon: ChefHat },
  { name: "Settings Panel", href: "/examples/settings-panel", icon: Settings },
  { name: "Dashboard", href: "/examples/dashboard", icon: BarChart3 },
  { name: "Meal Planner", href: "/examples/meal-planner", icon: Leaf },
];

export function Sidebar() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();

  return (
    <aside
      className="fixed top-0 left-0 h-screen w-[280px] border-r flex flex-col"
      style={{ borderColor: "var(--ck-border)", background: "var(--ck-surface)" }}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Logo */}
      <div className="p-6 border-b" style={{ borderColor: "var(--ck-border)" }}>
        <Link href="/" className="flex items-center gap-3 no-underline">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm"
            style={{ background: "var(--ck-primary)" }}>
            Ck
          </div>
          <div>
            <div className="font-semibold text-sm" style={{ color: "var(--ck-heading)" }}>
              Cookest UI
            </div>
            <div className="text-xs" style={{ color: "var(--ck-text-muted)" }}>
              Component Library
            </div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <div className="mb-2">
          <NavItem
            href="/"
            label="Overview"
            icon={Home}
            active={pathname === "/"}
          />
          <NavItem
            href="/getting-started"
            label="Getting Started"
            icon={BookOpen}
            active={pathname === "/getting-started"}
          />
        </div>

        <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider"
          style={{ color: "var(--ck-text-muted)" }}>
          Components
        </div>
        {components.map((c) => (
          <NavItem
            key={c.href}
            href={c.href}
            label={c.name}
            icon={c.icon}
            active={pathname === c.href}
          />
        ))}

        <div className="px-3 py-2 mt-4 text-xs font-semibold uppercase tracking-wider"
          style={{ color: "var(--ck-text-muted)" }}>
          <Link
            href="/examples"
            className="no-underline uppercase tracking-wider"
            style={{ color: pathname === "/examples" ? "var(--ck-primary)" : "var(--ck-text-muted)" }}
          >
            Examples
          </Link>
        </div>
        {examples.map((e) => (
          <NavItem
            key={e.href}
            href={e.href}
            label={e.name}
            icon={e.icon}
            active={pathname === e.href}
          />
        ))}

        <div className="px-3 py-2 mt-4 text-xs font-semibold uppercase tracking-wider"
          style={{ color: "var(--ck-text-muted)" }}>
          Reference
        </div>
        <NavItem
          href="/tokens"
          label="Design Tokens"
          icon={Palette}
          active={pathname === "/tokens"}
        />
      </nav>

      {/* Footer */}
      <div className="p-4 border-t flex items-center justify-between"
        style={{ borderColor: "var(--ck-border)" }}>
        <span className="text-xs" style={{ color: "var(--ck-text-muted)" }}>
          v1.0.0
        </span>
        <button
          onClick={toggle}
          className="p-2 rounded-lg transition-colors cursor-pointer"
          style={{
            color: "var(--ck-text-muted)",
            background: "transparent",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "var(--ck-border)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "transparent")
          }
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </aside>
  );
}

function NavItem({
  href,
  label,
  icon: Icon,
  active,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm no-underline transition-colors"
      style={{
        color: active ? "var(--ck-primary)" : "var(--ck-text)",
        background: active ? "var(--ck-primary-light, rgba(122,154,101,0.1))" : "transparent",
        fontWeight: active ? 600 : 400,
      }}
    >
      <Icon size={18} />
      {label}
    </Link>
  );
}
