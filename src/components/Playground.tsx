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
      className="rounded-2xl border transition-shadow duration-300 hover:shadow-lg overflow-hidden"
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

// Map display component names to CLI component names (deduplicated)
const CLI_NAME_MAP: Record<string, string> = {
  card: "card", cardheader: "card", cardbody: "card", cardfooter: "card",
  tab: "tabs",
  avatargroup: "avatar",
  checkbox: "checkbox",
};

function toCliName(name: string): string {
  const key = name.toLowerCase();
  return CLI_NAME_MAP[key] ?? key;
}

export function ExampleCliHint({ components }: { components: string[] }) {
  const cliNames = [...new Set(components.map(toCliName))];
  const cmd = `cookest-ui add ${cliNames.join(" ")}`;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="mb-6 rounded-xl p-4"
      style={{ background: "var(--ck-surface)", border: "1px solid var(--ck-border)" }}
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="text-xs font-medium" style={{ color: "var(--ck-text-muted)" }}>
          Components used:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {cliNames.map((name) => (
            <span
              key={name}
              className="px-2 py-0.5 rounded-md text-xs font-medium"
              style={{
                background: "rgba(122,154,101,0.12)",
                color: "var(--ck-primary)",
                fontFamily: "var(--font-mono, monospace)",
              }}
            >
              {name}
            </span>
          ))}
        </div>
        <div className="flex-1" />
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-xs cursor-pointer border-0 transition-all"
          style={{
            background: "var(--ck-bg)",
            border: "1px solid var(--ck-border)",
            color: copied ? "var(--ck-success)" : "var(--ck-text-muted)",
          }}
          aria-label={copied ? "Copied" : "Copy install command"}
        >
          {copied ? <Check size={11} /> : <Copy size={11} />}
          {copied ? "Copied!" : `$ ${cmd}`}
        </button>
      </div>
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
  const cliName = title.toLowerCase().replace(/\s+/g, '-');
  const cmd = `cookest-ui add ${cliName}`;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mb-10">
      <h1
        className="text-3xl font-bold mb-2"
        style={{ color: "var(--ck-heading)", fontFamily: "var(--font-serif)" }}
      >
        {title}
      </h1>
      <p className="text-base mb-4" style={{ color: "var(--ck-text-muted)" }}>
        {description}
      </p>
      {/* CLI install command */}
      <div
        className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl font-mono text-sm"
        style={{
          background: "var(--ck-surface)",
          border: "1px solid var(--ck-border)",
        }}
      >
        <span style={{ color: "var(--ck-text-muted)", fontSize: "11px" }}>$</span>
        <span style={{ color: "var(--ck-heading)" }}>{cmd}</span>
        <button
          onClick={handleCopy}
          className="ml-1 p-1 rounded-md cursor-pointer border-0 transition-all"
          style={{
            background: "transparent",
            color: copied ? "var(--ck-success)" : "var(--ck-text-muted)",
          }}
          aria-label={copied ? "Copied" : "Copy command"}
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
        </button>
      </div>
    </div>
  );
}
