"use client";

import { useState } from "react";
import { Highlight, themes } from "prism-react-renderer";
import { useTheme } from "./ThemeProvider";
import { Code, Eye, Copy, Check, Maximize2, Minimize2 } from "lucide-react";

interface PlaygroundProps {
  title: string;
  description: string;
  children: React.ReactNode;
  code: string;
  language?: string;
}

export function Playground({ title, description, children, code, language = "tsx" }: PlaygroundProps) {
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const { theme } = useTheme();

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="rounded-2xl border transition-shadow duration-300 hover:shadow-lg"
      style={{ borderColor: "var(--ck-border)", background: "var(--ck-surface)" }}
    >
      {/* Header */}
      <div
        className="px-5 py-3 border-b flex items-center justify-between rounded-t-2xl overflow-hidden"
        style={{ borderColor: "var(--ck-border)" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "rgba(122,154,101,0.1)" }}
          >
            {showCode ? (
              <Code size={14} style={{ color: "var(--ck-primary)" }} />
            ) : (
              <Eye size={14} style={{ color: "var(--ck-primary)" }} />
            )}
          </div>
          <div>
            <h3 className="text-sm font-semibold m-0" style={{ color: "var(--ck-heading)" }}>
              {title}
            </h3>
            <p className="text-xs mt-0.5 m-0" style={{ color: "var(--ck-text-muted)" }}>
              {description}
            </p>
          </div>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-2 text-xs rounded-lg cursor-pointer border-0 transition-colors duration-200"
            style={{
              color: "var(--ck-text-muted)",
              background: "transparent",
            }}
            aria-label={expanded ? "Collapse" : "Expand"}
          >
            {expanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
          <button
            onClick={() => setShowCode(!showCode)}
            className="px-3 py-1.5 text-xs rounded-lg cursor-pointer border-0 font-medium transition-all duration-200"
            style={{
              color: showCode ? "var(--ck-primary)" : "var(--ck-text-muted)",
              background: showCode ? "rgba(122,154,101,0.12)" : "transparent",
            }}
            aria-label={showCode ? "Show preview" : "Show code"}
          >
            {showCode ? "Preview" : "Code"}
          </button>
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 text-xs rounded-lg cursor-pointer border-0 font-medium transition-all duration-200 flex items-center gap-1.5"
            style={{
              color: copied ? "var(--ck-success)" : "var(--ck-text-muted)",
              background: copied ? "rgba(72,187,120,0.1)" : "transparent",
            }}
            aria-label={copied ? "Copied to clipboard" : "Copy code to clipboard"}
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      {/* Preview */}
      {!showCode && (
        <div
          className={`p-8 flex flex-wrap items-center justify-center gap-4 transition-all duration-300 ${
            expanded ? "min-h-[300px]" : "min-h-[140px]"
          }`}
          style={{
            background: "var(--ck-bg)",
            backgroundImage:
              "radial-gradient(circle at 1px 1px, var(--ck-border) 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        >
          {children}
        </div>
      )}

      {/* Code with syntax highlighting */}
      {showCode && (
        <div className="relative rounded-b-2xl overflow-hidden">
          <div
            className="absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider"
            style={{ background: "rgba(122,154,101,0.15)", color: "var(--ck-primary)" }}
          >
            {language}
          </div>
          <Highlight
            theme={theme === "dark" ? themes.nightOwl : themes.nightOwlLight}
            code={code.trim()}
            language={language}
          >
            {({ style, tokens, getLineProps, getTokenProps }) => (
              <pre
                className="!m-0 !border-0 text-[13px] leading-relaxed overflow-x-auto p-5"
                style={{ ...style, background: theme === "dark" ? "#011627" : "#f6f8fa" }}
              >
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line })} className="table-row">
                    <span
                      className="table-cell pr-4 select-none text-right opacity-40 text-xs"
                      style={{ minWidth: "2rem" }}
                    >
                      {i + 1}
                    </span>
                    <span className="table-cell">
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token })} />
                      ))}
                    </span>
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
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
    <div className="rounded-2xl border overflow-x-auto mt-8"
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
