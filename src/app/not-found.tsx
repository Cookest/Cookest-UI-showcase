"use client";

import Link from "next/link";
import { AnimateIn } from "@/components/AnimateIn";
import { Home, Search, UtensilsCrossed } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center" style={{ minHeight: "calc(100vh - 200px)" }}>
      <AnimateIn direction="up">
        <div className="flex flex-col items-center text-center max-w-md px-4">
          {/* Icon */}
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
            style={{ background: "rgba(122,154,101,0.1)" }}
          >
            <UtensilsCrossed size={36} style={{ color: "var(--ck-primary)" }} />
          </div>

          {/* 404 Label */}
          <span
            className="text-6xl font-bold mb-2"
            style={{ color: "var(--ck-primary)", fontFamily: "var(--font-serif)" }}
          >
            404
          </span>

          {/* Heading */}
          <h1
            className="text-2xl font-bold mb-3 m-0"
            style={{ color: "var(--ck-heading)", fontFamily: "var(--font-serif)" }}
          >
            This dish isn&apos;t on the menu
          </h1>

          {/* Description */}
          <p className="text-sm mb-6 m-0" style={{ color: "var(--ck-text-muted)", lineHeight: 1.7 }}>
            The page you&apos;re looking for doesn&apos;t exist or may have been moved.
            Try searching for what you need or head back to the kitchen.
          </p>

          {/* Search hint */}
          <div
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl mb-6 text-xs"
            style={{
              background: "var(--ck-surface)",
              border: "1px solid var(--ck-border)",
              color: "var(--ck-text-muted)",
            }}
          >
            <Search size={14} />
            <span>Press</span>
            <kbd
              className="px-1.5 py-0.5 rounded text-[10px] font-mono font-medium"
              style={{
                background: "var(--ck-bg)",
                border: "1px solid var(--ck-border)",
                color: "var(--ck-text)",
              }}
            >
              ⌘K
            </kbd>
            <span>to search the docs</span>
          </div>

          {/* Back to home */}
          <Link
            href="/"
            className="no-underline inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-opacity hover:opacity-90"
            style={{ background: "var(--ck-primary)", color: "white" }}
          >
            <Home size={16} />
            Back to Home
          </Link>
        </div>
      </AnimateIn>
    </div>
  );
}
