"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider";
import { SearchTrigger } from "./CommandPalette";
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
  Utensils,
  ChefHat,
  Settings,
  BarChart3,
  Leaf,
  Palette,
  BookOpen,
  Menu,
  X,
  ChevronDown,
  ExternalLink,
  Sparkles,
  History,
  ShoppingBag,
  MessageCircle,
  Wand2,
  LayoutList,
  ChevronsUpDown,
  AlignLeft,
  SlidersHorizontal,
  BarChart2,
  RefreshCw,
  FlaskConical,
  CheckSquare,
  Bell,
  CreditCard,
  User,
  ShoppingCart,
} from "lucide-react";

const components = [
  { name: "Button", href: "/components/button", icon: RectangleHorizontal },
  { name: "Input", href: "/components/input", icon: Type },
  { name: "Card", href: "/components/card", icon: SquareStack },
  { name: "Checkbox", href: "/components/checkbox", icon: CheckSquare },
  { name: "Badge", href: "/components/badge", icon: Tag },
  { name: "Avatar", href: "/components/avatar", icon: CircleUser },
  { name: "Modal", href: "/components/modal", icon: PanelTop },
  { name: "Tooltip", href: "/components/tooltip", icon: MessageSquare },
  { name: "Toggle", href: "/components/toggle", icon: ToggleRight },
  { name: "Select", href: "/components/select", icon: ListFilter },
  { name: "Skeleton", href: "/components/skeleton", icon: Loader },
  { name: "Alert", href: "/components/alert", icon: AlertTriangle },
  { name: "Divider", href: "/components/divider", icon: SeparatorHorizontal },
  { name: "Tabs", href: "/components/tabs", icon: LayoutList },
  { name: "Accordion", href: "/components/accordion", icon: ChevronsUpDown },
  { name: "Textarea", href: "/components/textarea", icon: AlignLeft },
  { name: "Slider", href: "/components/slider", icon: SlidersHorizontal },
  { name: "Progress", href: "/components/progress", icon: BarChart2 },
  { name: "Spinner", href: "/components/spinner", icon: RefreshCw },
];

const examples = [
  { name: "Recipe Card", href: "/examples/recipe-card", icon: Utensils },
  { name: "Login Form", href: "/examples/login-form", icon: ChefHat },
  { name: "Settings Panel", href: "/examples/settings-panel", icon: Settings },
  { name: "Dashboard", href: "/examples/dashboard", icon: BarChart3 },
  { name: "Meal Planner", href: "/examples/meal-planner", icon: Leaf },
  { name: "Product Page", href: "/examples/product-page", icon: ShoppingBag },
  { name: "Social Feed", href: "/examples/social-feed", icon: MessageCircle },
  { name: "Onboarding Wizard", href: "/examples/onboarding-wizard", icon: Wand2 },
  { name: "Notification Center", href: "/examples/notification-center", icon: Bell },
  { name: "Pricing Plans", href: "/examples/pricing", icon: CreditCard },
  { name: "User Profile", href: "/examples/user-profile", icon: User },
  { name: "Order Checkout", href: "/examples/checkout", icon: ShoppingCart },
];

export function Sidebar({ uiVersion }: { uiVersion?: string }) {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sectionsOpen, setSectionsOpen] = useState({
    components: true,
    examples: true,
    reference: true,
  });

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile sidebar open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const toggleSection = (section: keyof typeof sectionsOpen) => {
    setSectionsOpen((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 p-2.5 rounded-xl border cursor-pointer md:hidden"
        style={{
          borderColor: "var(--ck-border)",
          background: "var(--ck-surface)",
          color: "var(--ck-text)",
          display: mobileOpen ? "none" : undefined,
        }}
        aria-label="Open navigation menu"
      >
        <Menu size={20} />
      </button>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-[280px] border-r flex flex-col z-50 transition-transform duration-300 ease-out ${
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
        style={{ borderColor: "var(--ck-border)", background: "var(--ck-surface)" }}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <div className="p-5 border-b flex items-center justify-between" style={{ borderColor: "var(--ck-border)" }}>
          <Link href="/" className="flex items-center gap-3 no-underline">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm"
              style={{ background: "linear-gradient(135deg, var(--ck-primary), var(--ck-primary-dark, #5a7a3d))" }}
            >
              Ck
            </div>
            <div>
              <div className="font-semibold text-sm" style={{ color: "var(--ck-heading)" }}>
                Cookest UI
              </div>
              <div className="text-[10px] font-medium" style={{ color: "var(--ck-text-muted)" }}>
                v{uiVersion ?? "0.1.2"} · Design System
              </div>
            </div>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-1.5 rounded-lg cursor-pointer border-0 md:hidden"
            style={{ color: "var(--ck-text-muted)", background: "transparent" }}
            aria-label="Close navigation"
          >
            <X size={18} />
          </button>
        </div>

        {/* Search */}
        <div className="px-3 pt-3">
          <SearchTrigger />
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-3 px-3">
          <div className="mb-1">
            <NavItem href="/" label="Overview" icon={Home} active={pathname === "/"} />
            <NavItem href="/getting-started" label="Getting Started" icon={BookOpen} active={pathname === "/getting-started"} />
            <NavItem href="/playground" label="Playground" icon={FlaskConical} active={pathname === "/playground"} />
          </div>

          <SectionHeader
            label="Components"
            count={components.length}
            isOpen={sectionsOpen.components}
            onToggle={() => toggleSection("components")}
          />
          {sectionsOpen.components &&
            components.map((c) => (
              <NavItem key={c.href} href={c.href} label={c.name} icon={c.icon} active={pathname === c.href} />
            ))}

          <SectionHeader
            label="Examples"
            count={examples.length}
            isOpen={sectionsOpen.examples}
            onToggle={() => toggleSection("examples")}
          />
          {sectionsOpen.examples && (
            <>
              <NavItem href="/examples" label="All Examples" icon={Sparkles} active={pathname === "/examples"} />
              {examples.map((e) => (
                <NavItem key={e.href} href={e.href} label={e.name} icon={e.icon} active={pathname === e.href} />
              ))}
            </>
          )}

          <SectionHeader
            label="Reference"
            isOpen={sectionsOpen.reference}
            onToggle={() => toggleSection("reference")}
          />
          {sectionsOpen.reference && (
            <>
              <NavItem href="/tokens" label="Design Tokens" icon={Palette} active={pathname === "/tokens"} />
              <NavItem href="/design-principles" label="Design Principles" icon={BookOpen} active={pathname === "/design-principles"} />
              <NavItem href="/changelog" label="Changelog" icon={History} active={pathname === "/changelog"} />
            </>
          )}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t flex items-center justify-between" style={{ borderColor: "var(--ck-border)" }}>
          <a
            href="https://github.com/Cookest/cookest-ui-components-library"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs no-underline px-2 py-1.5 rounded-lg transition-colors"
            style={{ color: "var(--ck-text-muted)" }}
          >
            <ExternalLink size={14} />
            GitHub
          </a>
          <div className="flex items-center gap-1">
            <button
              onClick={toggle}
              className="p-2 rounded-lg transition-colors cursor-pointer border-0"
              style={{ color: "var(--ck-text-muted)", background: "transparent" }}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

function SectionHeader({
  label,
  count,
  isOpen,
  onToggle,
}: {
  label: string;
  count?: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between px-3 py-2 mt-4 text-xs font-semibold uppercase tracking-wider border-0 cursor-pointer rounded-lg transition-colors"
      style={{ color: "var(--ck-text-muted)", background: "transparent" }}
    >
      <span className="flex items-center gap-2">
        {label}
        {count !== undefined && (
          <span
            className="text-[10px] font-medium px-1.5 py-0.5 rounded-full normal-case tracking-normal"
            style={{ background: "rgba(122,154,101,0.1)", color: "var(--ck-primary)" }}
          >
            {count}
          </span>
        )}
      </span>
      <ChevronDown
        size={14}
        className="transition-transform duration-200"
        style={{ transform: isOpen ? "rotate(0deg)" : "rotate(-90deg)" }}
      />
    </button>
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
      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm no-underline transition-all duration-150"
      style={{
        color: active ? "var(--ck-primary)" : "var(--ck-text)",
        background: active ? "rgba(122,154,101,0.1)" : "transparent",
        fontWeight: active ? 600 : 400,
      }}
    >
      <Icon size={16} />
      {label}
    </Link>
  );
}
