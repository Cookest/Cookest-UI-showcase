"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

const managers = [
  { id: "bun", label: "bun", prefix: "bun add" },
  { id: "npm", label: "npm", prefix: "npm install" },
  { id: "pnpm", label: "pnpm", prefix: "pnpm add" },
  { id: "yarn", label: "yarn", prefix: "yarn add" },
] as const;

interface PackageManagerTabsProps {
  packageName?: string;
  command?: string;
}

export function PackageManagerTabs({
  packageName = "@cookest/ui",
  command,
}: PackageManagerTabsProps) {
  const [active, setActive] = useState<string>("bun");
  const [copied, setCopied] = useState(false);

  const activeManager = managers.find((m) => m.id === active)!;
  const fullCommand = command || `${activeManager.prefix} ${packageName}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="rounded-xl border overflow-hidden"
      style={{ borderColor: "var(--ck-border)" }}
    >
      {/* Tabs */}
      <div
        className="flex border-b"
        style={{ borderColor: "var(--ck-border)", background: "var(--ck-surface)" }}
      >
        {managers.map((m) => (
          <button
            key={m.id}
            onClick={() => setActive(m.id)}
            className="px-4 py-2 text-xs font-medium border-0 cursor-pointer transition-all duration-150 relative"
            style={{
              color: active === m.id ? "var(--ck-primary)" : "var(--ck-text-muted)",
              background: "transparent",
            }}
          >
            {m.label}
            {active === m.id && (
              <span
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ background: "var(--ck-primary)" }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Command */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ background: "var(--ck-bg)" }}
      >
        <code className="text-sm font-mono" style={{ color: "var(--ck-text)" }}>
          <span style={{ color: "var(--ck-text-muted)" }}>$ </span>
          {fullCommand}
        </code>
        <button
          onClick={handleCopy}
          className="p-1.5 rounded-md border-0 cursor-pointer transition-colors"
          style={{
            color: copied ? "var(--ck-success, #48bb78)" : "var(--ck-text-muted)",
            background: "transparent",
          }}
          aria-label={copied ? "Copied" : "Copy command"}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
      </div>
    </div>
  );
}
