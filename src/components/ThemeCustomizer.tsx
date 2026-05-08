"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, X, Check } from "lucide-react";

const THEMES = [
  { id: "sage",       name: "Sage",       primary: "#7a9a65", light: "#b4cc9e", dark: "#4e7a3a" },
  { id: "forest",     name: "Forest",     primary: "#2d6a4f", light: "#52b788", dark: "#1b4332" },
  { id: "ocean",      name: "Ocean",      primary: "#0369a1", light: "#7dd3fc", dark: "#0c4a6e" },
  { id: "terracotta", name: "Terracotta", primary: "#c2410c", light: "#fb923c", dark: "#7c2d12" },
  { id: "violet",     name: "Violet",     primary: "#7c3aed", light: "#c4b5fd", dark: "#4c1d95" },
  { id: "rose",       name: "Rose",       primary: "#be185d", light: "#fda4af", dark: "#881337" },
  { id: "amber",      name: "Amber",      primary: "#d97706", light: "#fcd34d", dark: "#92400e" },
  { id: "slate",      name: "Slate",      primary: "#475569", light: "#cbd5e1", dark: "#1e293b" },
] as const;

type ThemeId = (typeof THEMES)[number]["id"];

function applyTheme(theme: (typeof THEMES)[number]) {
  const root = document.documentElement;
  root.style.setProperty("--ck-primary", theme.primary);
  root.style.setProperty("--ck-primary-light", theme.light);
  root.style.setProperty("--ck-primary-dark", theme.dark);
  // Update selection colour
  const styleId = "ck-selection-override";
  let tag = document.getElementById(styleId) as HTMLStyleElement | null;
  if (!tag) {
    tag = document.createElement("style");
    tag.id = styleId;
    document.head.appendChild(tag);
  }
  tag.textContent = `::selection { background: ${theme.primary}33; color: inherit; }`;
  localStorage.setItem("cookest-theme-id", theme.id);
}

export function ThemeCustomizer() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<ThemeId>("sage");
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedId = localStorage.getItem("cookest-theme-id") as ThemeId | null;
    if (savedId) {
      const t = THEMES.find((th) => th.id === savedId);
      if (t) { applyTheme(t); setActiveId(t.id); }
    }
  }, []);

  // Close when clicking outside
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const activeTheme = THEMES.find((t) => t.id === activeId)!;

  return (
    <div ref={panelRef} className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.17, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border shadow-2xl p-4 w-[196px]"
            style={{
              background: "var(--ck-surface)",
              borderColor: "var(--ck-border)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <span
                className="text-[10px] font-semibold tracking-widest uppercase"
                style={{ color: "var(--ck-text-muted)" }}
              >
                Accent
              </span>
              <button
                onClick={() => setOpen(false)}
                className="opacity-40 hover:opacity-80 transition-opacity p-0.5"
                aria-label="Close"
              >
                <X size={11} style={{ color: "var(--ck-text)" }} />
              </button>
            </div>

            {/* Color grid */}
            <div className="grid grid-cols-4 gap-2">
              {THEMES.map((theme) => {
                const isActive = activeId === theme.id;
                return (
                  <button
                    key={theme.id}
                    title={theme.name}
                    onClick={() => {
                      applyTheme(theme);
                      setActiveId(theme.id);
                    }}
                    className="relative w-full aspect-square rounded-xl flex items-center justify-center transition-transform duration-150 hover:scale-110 active:scale-95 focus-visible:outline-none"
                    style={{
                      background: theme.primary,
                      boxShadow: isActive
                        ? `0 0 0 2px var(--ck-surface), 0 0 0 3.5px ${theme.primary}`
                        : "none",
                    }}
                  >
                    {isActive && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-white"
                      >
                        <Check size={11} strokeWidth={2.5} />
                      </motion.span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Active name */}
            <p
              className="mt-3 text-[11px] font-medium text-center"
              style={{ color: "var(--ck-text-muted)" }}
            >
              {activeTheme.name}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        className="w-11 h-11 rounded-full shadow-xl flex items-center justify-center focus-visible:outline-none focus-visible:ring-2"
        style={{ background: "var(--ck-primary)", color: "white" }}
        aria-label="Customize accent colour"
        title="Customize accent"
      >
        <Palette size={17} />
      </motion.button>
    </div>
  );
}
