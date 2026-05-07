"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Search, SquareIcon, LayoutGrid, Palette, BookOpen, ArrowRight,
  RectangleHorizontal, ToggleLeft, Type, CreditCard, AlertTriangle,
  CircleUser, Circle, SeparatorHorizontal, MessageSquare, Loader2,
  ChefHat, Lock, Settings, BarChart3, CalendarDays, Sparkles,
} from "lucide-react";

interface SearchItem {
  name: string;
  path: string;
  category: string;
  icon: React.ReactNode;
  keywords: string[];
}

const searchItems: SearchItem[] = [
  { name: "Getting Started", path: "/getting-started", category: "Guide", icon: <BookOpen size={16} />, keywords: ["install", "setup", "begin", "start", "quick"] },
  { name: "Design Tokens", path: "/tokens", category: "Reference", icon: <Palette size={16} />, keywords: ["colors", "spacing", "typography", "theme", "variables", "css"] },
  { name: "Button", path: "/components/button", category: "Component", icon: <RectangleHorizontal size={16} />, keywords: ["click", "action", "submit", "cta", "press"] },
  { name: "Input", path: "/components/input", category: "Component", icon: <Type size={16} />, keywords: ["text", "field", "form", "type", "search", "email"] },
  { name: "Card", path: "/components/card", category: "Component", icon: <CreditCard size={16} />, keywords: ["container", "panel", "box", "content", "wrapper"] },
  { name: "Badge", path: "/components/badge", category: "Component", icon: <Circle size={16} />, keywords: ["tag", "label", "chip", "status", "count"] },
  { name: "Alert", path: "/components/alert", category: "Component", icon: <AlertTriangle size={16} />, keywords: ["notification", "message", "warning", "error", "info"] },
  { name: "Avatar", path: "/components/avatar", category: "Component", icon: <CircleUser size={16} />, keywords: ["user", "profile", "image", "photo", "picture"] },
  { name: "Modal", path: "/components/modal", category: "Component", icon: <SquareIcon size={16} />, keywords: ["dialog", "popup", "overlay", "confirmation"] },
  { name: "Select", path: "/components/select", category: "Component", icon: <LayoutGrid size={16} />, keywords: ["dropdown", "option", "picker", "choose", "menu"] },
  { name: "Toggle", path: "/components/toggle", category: "Component", icon: <ToggleLeft size={16} />, keywords: ["switch", "checkbox", "on", "off", "boolean"] },
  { name: "Tooltip", path: "/components/tooltip", category: "Component", icon: <MessageSquare size={16} />, keywords: ["hint", "info", "popover", "help", "hover"] },
  { name: "Skeleton", path: "/components/skeleton", category: "Component", icon: <Loader2 size={16} />, keywords: ["loading", "placeholder", "shimmer", "ghost"] },
  { name: "Divider", path: "/components/divider", category: "Component", icon: <SeparatorHorizontal size={16} />, keywords: ["separator", "line", "hr", "rule"] },
  { name: "Recipe Card", path: "/examples/recipe-card", category: "Example", icon: <ChefHat size={16} />, keywords: ["food", "cooking", "meal", "dish"] },
  { name: "Login Form", path: "/examples/login-form", category: "Example", icon: <Lock size={16} />, keywords: ["auth", "signin", "signup", "password"] },
  { name: "Settings Panel", path: "/examples/settings-panel", category: "Example", icon: <Settings size={16} />, keywords: ["preferences", "config", "profile", "account"] },
  { name: "Dashboard", path: "/examples/dashboard", category: "Example", icon: <BarChart3 size={16} />, keywords: ["analytics", "stats", "overview", "metrics"] },
  { name: "Meal Planner", path: "/examples/meal-planner", category: "Example", icon: <CalendarDays size={16} />, keywords: ["calendar", "schedule", "weekly", "plan"] },
  { name: "Design Principles", path: "/design-principles", category: "Reference", icon: <BookOpen size={16} />, keywords: ["philosophy", "guidelines", "spacing", "typography", "color", "principles"] },
  { name: "Examples", path: "/examples", category: "Guide", icon: <Sparkles size={16} />, keywords: ["demo", "showcase", "real-world", "patterns"] },
];

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const filtered = query.length === 0
    ? searchItems
    : searchItems.filter((item) => {
        const q = query.toLowerCase();
        return (
          item.name.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.keywords.some((k) => k.includes(q))
        );
      });

  const groupedResults = filtered.reduce<Record<string, SearchItem[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    setQuery("");
    setSelectedIndex(0);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setQuery("");
  }, []);

  const handleSelect = useCallback(
    (path: string) => {
      router.push(path);
      handleClose();
    },
    [router, handleClose]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) handleClose();
        else handleOpen();
      }
      if (e.key === "Escape" && isOpen) handleClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleOpen, handleClose]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyNav = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      handleSelect(filtered[selectedIndex].path);
    }
  };

  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-index="${selectedIndex}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  if (!isOpen) return null;

  let flatIndex = -1;

  return (
    <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-label="Search components">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
        style={{ animation: "fadeIn 0.15s ease" }}
      />

      {/* Dialog */}
      <div
        className="relative mx-auto mt-[15vh] w-full max-w-xl rounded-2xl border overflow-hidden shadow-2xl"
        style={{
          borderColor: "var(--ck-border)",
          background: "var(--ck-surface)",
          animation: "slideDown 0.2s ease",
        }}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b" style={{ borderColor: "var(--ck-border)" }}>
          <Search size={18} style={{ color: "var(--ck-text-muted)" }} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyNav}
            placeholder="Search components, examples, tokens..."
            className="flex-1 bg-transparent border-0 outline-none text-sm"
            style={{ color: "var(--ck-text)" }}
          />
          <kbd
            className="px-2 py-0.5 rounded text-[10px] font-mono border"
            style={{ borderColor: "var(--ck-border)", color: "var(--ck-text-muted)" }}
          >
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div ref={listRef} className="max-h-[50vh] overflow-y-auto p-2" role="listbox">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-sm" style={{ color: "var(--ck-text-muted)" }}>
              No results found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            Object.entries(groupedResults).map(([category, items]) => (
              <div key={category}>
                <div
                  className="px-3 py-2 text-[10px] font-semibold uppercase tracking-widest"
                  style={{ color: "var(--ck-text-muted)" }}
                >
                  {category}
                </div>
                {items.map((item) => {
                  flatIndex++;
                  const idx = flatIndex;
                  return (
                    <button
                      key={item.path}
                      data-index={idx}
                      onClick={() => handleSelect(item.path)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left border-0 cursor-pointer transition-colors duration-100"
                      style={{
                        background: idx === selectedIndex ? "rgba(122,154,101,0.12)" : "transparent",
                        color: idx === selectedIndex ? "var(--ck-primary)" : "var(--ck-text)",
                      }}
                      role="option"
                      aria-selected={idx === selectedIndex}
                    >
                      <span style={{ color: idx === selectedIndex ? "var(--ck-primary)" : "var(--ck-text-muted)" }}>
                        {item.icon}
                      </span>
                      <span className="flex-1 text-sm font-medium">{item.name}</span>
                      <ArrowRight
                        size={14}
                        className="transition-transform duration-200"
                        style={{
                          opacity: idx === selectedIndex ? 1 : 0,
                          transform: idx === selectedIndex ? "translateX(0)" : "translateX(-4px)",
                          color: "var(--ck-primary)",
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div
          className="flex items-center gap-4 px-5 py-3 border-t text-[11px]"
          style={{ borderColor: "var(--ck-border)", color: "var(--ck-text-muted)" }}
        >
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded border text-[10px]" style={{ borderColor: "var(--ck-border)" }}>↑↓</kbd>
            Navigate
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded border text-[10px]" style={{ borderColor: "var(--ck-border)" }}>↵</kbd>
            Open
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded border text-[10px]" style={{ borderColor: "var(--ck-border)" }}>esc</kbd>
            Close
          </span>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-12px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}

export function SearchTrigger() {
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf("MAC") >= 0);
  }, []);

  const handleClick = () => {
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: !isMac, metaKey: isMac }));
  };

  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg border text-sm cursor-pointer transition-all duration-200"
      style={{
        borderColor: "var(--ck-border)",
        background: "var(--ck-bg)",
        color: "var(--ck-text-muted)",
      }}
      aria-label="Open search"
    >
      <Search size={14} />
      <span className="flex-1 text-left text-xs">Search...</span>
      <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded border" style={{ borderColor: "var(--ck-border)" }}>
        {isMac ? "⌘" : "Ctrl+"}K
      </kbd>
    </button>
  );
}
