"use client";

import { useState } from "react";

interface PlaygroundProps {
  title: string;
  description: string;
  children: React.ReactNode;
  code: string;
}

export function Playground({ title, description, children, code }: PlaygroundProps) {
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="rounded-2xl border overflow-hidden"
      style={{ borderColor: "var(--ck-border)", background: "var(--ck-surface)" }}
    >
      {/* Header */}
      <div
        className="px-6 py-4 border-b flex items-center justify-between"
        style={{ borderColor: "var(--ck-border)" }}
      >
        <div>
          <h3 className="text-sm font-semibold m-0" style={{ color: "var(--ck-heading)" }}>
            {title}
          </h3>
          <p className="text-xs mt-1 m-0" style={{ color: "var(--ck-text-muted)" }}>
            {description}
          </p>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => setShowCode(!showCode)}
            className="px-3 py-1.5 text-xs rounded-lg cursor-pointer border-0"
            style={{
              color: showCode ? "var(--ck-primary)" : "var(--ck-text-muted)",
              background: showCode ? "rgba(122,154,101,0.1)" : "transparent",
            }}
            aria-label={showCode ? "Show preview" : "Show code"}
          >
            {showCode ? "Preview" : "Code"}
          </button>
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 text-xs rounded-lg cursor-pointer border-0"
            style={{
              color: "var(--ck-text-muted)",
              background: "transparent",
            }}
            aria-label={copied ? "Copied to clipboard" : "Copy code to clipboard"}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      {/* Preview */}
      {!showCode && (
        <div className="p-8 flex flex-wrap items-center justify-center gap-4 min-h-[120px]"
          style={{ background: "var(--ck-bg)" }}>
          {children}
        </div>
      )}

      {/* Code */}
      {showCode && (
        <div className="p-4 overflow-x-auto" style={{ background: "var(--ck-bg)" }}>
          <pre className="!m-0 !border-0 text-sm" style={{ background: "transparent" }}>
            <code>{code}</code>
          </pre>
        </div>
      )}
    </div>
  );
}

interface PropsTableProps {
  props: Array<{
    name: string;
    type: string;
    default?: string;
    description: string;
  }>;
}

export function PropsTable({ props }: PropsTableProps) {
  return (
    <div className="rounded-2xl border overflow-hidden mt-8"
      style={{ borderColor: "var(--ck-border)" }}>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr style={{ background: "var(--ck-surface)" }}>
            <th className="text-left px-4 py-3 font-semibold border-b"
              style={{ borderColor: "var(--ck-border)", color: "var(--ck-heading)" }}>
              Prop
            </th>
            <th className="text-left px-4 py-3 font-semibold border-b"
              style={{ borderColor: "var(--ck-border)", color: "var(--ck-heading)" }}>
              Type
            </th>
            <th className="text-left px-4 py-3 font-semibold border-b"
              style={{ borderColor: "var(--ck-border)", color: "var(--ck-heading)" }}>
              Default
            </th>
            <th className="text-left px-4 py-3 font-semibold border-b"
              style={{ borderColor: "var(--ck-border)", color: "var(--ck-heading)" }}>
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr key={prop.name} style={{ borderBottom: "1px solid var(--ck-border)" }}>
              <td className="px-4 py-3">
                <code className="px-1.5 py-0.5 rounded text-xs font-mono"
                  style={{ background: "rgba(122,154,101,0.1)", color: "var(--ck-primary)" }}>
                  {prop.name}
                </code>
              </td>
              <td className="px-4 py-3 font-mono text-xs" style={{ color: "var(--ck-text-muted)" }}>
                {prop.type}
              </td>
              <td className="px-4 py-3 text-xs" style={{ color: "var(--ck-text-muted)" }}>
                {prop.default ?? "—"}
              </td>
              <td className="px-4 py-3 text-xs" style={{ color: "var(--ck-text)" }}>
                {prop.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function PageHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mb-10">
      <h1
        className="text-3xl font-bold mb-2"
        style={{ color: "var(--ck-heading)", fontFamily: "var(--font-serif)" }}
      >
        {title}
      </h1>
      <p className="text-base" style={{ color: "var(--ck-text-muted)" }}>
        {description}
      </p>
    </div>
  );
}
