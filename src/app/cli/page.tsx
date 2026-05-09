"use client";

import { useState } from "react";
import { Copy, Check, Terminal, Package, List, Plus, Zap } from "lucide-react";
import { Badge, Card, CardBody, Divider } from "@cookest/ui";
import { Breadcrumb } from "@/components/Breadcrumb";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="p-1.5 rounded-md cursor-pointer border-0 transition-opacity opacity-60 hover:opacity-100"
      style={{ background: "transparent", color: "inherit" }}
      aria-label="Copy to clipboard"
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
    </button>
  );
}

function TerminalWindow({
  title,
  children,
  command,
}: {
  title?: string;
  children: React.ReactNode;
  command?: string;
}) {
  return (
    <div
      className="rounded-2xl overflow-hidden font-mono text-sm"
      style={{
        background: "#0d1117",
        border: "1px solid rgba(255,255,255,0.07)",
        boxShadow: "0 24px 48px rgba(0,0,0,0.4)",
      }}
    >
      {/* Window chrome */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ background: "#161b22", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
          <div className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
          <div className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
        </div>
        <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
          {title ?? "terminal"}
        </span>
        {command && (
          <CopyButton text={command} />
        )}
      </div>

      {/* Content */}
      <div className="px-5 py-5 leading-relaxed text-[13px] overflow-x-auto">
        {children}
      </div>
    </div>
  );
}

const green = (s: string) => <span style={{ color: "#3fb950" }}>{s}</span>;
const cyan = (s: string) => <span style={{ color: "#79c0ff" }}>{s}</span>;
const dim = (s: string) => <span style={{ color: "rgba(255,255,255,0.35)" }}>{s}</span>;
const white = (s: string) => <span style={{ color: "#e6edf3" }}>{s}</span>;
const yellow = (s: string) => <span style={{ color: "#e3b341" }}>{s}</span>;

function StepBadge({ n }: { n: number }) {
  return (
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
      style={{ background: "var(--ck-primary)", color: "#fff" }}
    >
      {n}
    </div>
  );
}

function InlineCode({ children }: { children: string }) {
  return (
    <code
      className="px-1.5 py-0.5 rounded text-xs font-mono"
      style={{ background: "rgba(122,154,101,0.12)", color: "var(--ck-primary)" }}
    >
      {children}
    </code>
  );
}

export default function CLIPage() {
  return (
    <div className="max-w-3xl">
      <Breadcrumb />

      {/* Header */}
      <div className="mb-12">
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4"
          style={{ background: "rgba(122,154,101,0.1)", color: "var(--ck-primary)" }}
        >
          <Terminal size={12} />
          Tooling
        </div>
        <h1
          className="text-4xl font-bold mb-3"
          style={{ color: "var(--ck-heading)", fontFamily: "var(--font-serif)" }}
        >
          Cookest UI CLI
        </h1>
        <p className="text-base leading-relaxed" style={{ color: "var(--ck-text-muted)" }}>
          A zero-config command-line tool for adding Cookest UI components
          directly to your React or Flutter project — no setup, no friction.
        </p>
        <div className="flex items-center gap-2 mt-4">
          <Badge variant="success" size="sm">v0.1.1</Badge>
          <Badge variant="info" size="sm">React</Badge>
          <Badge variant="info" size="sm">Flutter</Badge>
        </div>
      </div>

      {/* Quick install */}
      <section className="mb-12">
        <div
          className="rounded-2xl p-5"
          style={{ background: "var(--ck-surface)", border: "1px solid var(--ck-border)" }}
        >
          <p className="text-xs font-medium mb-3 m-0" style={{ color: "var(--ck-text-muted)" }}>
            No install required — run with npx or bunx:
          </p>
          <div className="flex items-center gap-3 justify-between flex-wrap">
            <code
              className="text-sm font-mono"
              style={{ color: "var(--ck-heading)" }}
            >
              bunx @cookest/ui-cli [command]
            </code>
            <CopyButton text="bunx @cookest/ui-cli" />
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-8" style={{ color: "var(--ck-heading)" }}>
          Workflow
        </h2>

        {/* Step 1 */}
        <div className="flex gap-5 mb-12">
          <div className="flex flex-col items-center">
            <StepBadge n={1} />
            <div className="flex-1 w-px mt-3" style={{ background: "var(--ck-border)" }} />
          </div>
          <div className="pb-10 flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Zap size={16} style={{ color: "var(--ck-primary)" }} />
              <h3 className="text-base font-semibold m-0" style={{ color: "var(--ck-heading)" }}>
                Initialize your project
              </h3>
            </div>
            <p className="text-sm mb-4" style={{ color: "var(--ck-text-muted)" }}>
              Run <InlineCode>init</InlineCode> inside your project root. The CLI auto-detects
              your framework and package manager — no questions asked.
            </p>
            <TerminalWindow title="terminal" command="bunx @cookest/ui-cli init">
              <div>
                {dim("$ ")}
                {white("bunx @cookest/ui-cli init")}
              </div>
              <div className="mt-3">{dim("")}</div>
              <div>{"  "}{white("Cookest UI")}</div>
              <div className="mt-3">
                {"  "}{green("✔")}{" "}{white("React")}{"  "}{dim("(bun) detected")}
              </div>
              <div>{"  "}{green("✔")}{" "}{white("Created .cookestrc")}</div>
              <div className="mt-4">{"  "}{white("Next steps")}</div>
              <div className="mt-2">
                {"  "}{dim("1.")}{" "}{cyan("bun add @cookest/ui")}
              </div>
              <div>
                {"  "}{dim("2.")}{" "}{cyan("cookest-ui add button input badge")}
              </div>
              <div>
                {"  "}{dim("3.")}{" "}{yellow('import { Button } from "@cookest/ui"')}
              </div>
              <div className="mt-3">
                {"  "}{dim("Docs: https://docs.cookest.app")}
              </div>
            </TerminalWindow>

            <div className="mt-4">
              <p className="text-xs mb-2" style={{ color: "var(--ck-text-muted)" }}>
                Generated <InlineCode>.cookestrc</InlineCode>:
              </p>
              <div
                className="rounded-xl px-5 py-4 font-mono text-sm"
                style={{
                  background: "var(--ck-surface)",
                  border: "1px solid var(--ck-border)",
                  color: "var(--ck-text)",
                }}
              >
                <span style={{ color: "var(--ck-text-muted)" }}>{`{`}</span>
                <br />
                <span style={{ color: "var(--ck-primary)" }}>{"  "}&quot;framework&quot;</span>
                <span style={{ color: "var(--ck-text)" }}>: </span>
                <span style={{ color: "var(--ck-heading)" }}>&quot;react&quot;</span>
                <span style={{ color: "var(--ck-text)" }}>,</span>
                <br />
                <span style={{ color: "var(--ck-primary)" }}>{"  "}&quot;componentsDir&quot;</span>
                <span style={{ color: "var(--ck-text)" }}>: </span>
                <span style={{ color: "var(--ck-heading)" }}>&quot;src/components/ui&quot;</span>
                <br />
                <span style={{ color: "var(--ck-text-muted)" }}>{`}`}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex gap-5 mb-12">
          <div className="flex flex-col items-center">
            <StepBadge n={2} />
            <div className="flex-1 w-px mt-3" style={{ background: "var(--ck-border)" }} />
          </div>
          <div className="pb-10 flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <List size={16} style={{ color: "var(--ck-primary)" }} />
              <h3 className="text-base font-semibold m-0" style={{ color: "var(--ck-heading)" }}>
                Explore available components
              </h3>
            </div>
            <p className="text-sm mb-4" style={{ color: "var(--ck-text-muted)" }}>
              Use <InlineCode>list</InlineCode> to see all components grouped by category,
              with their full description. Filter by name or tag.
            </p>
            <TerminalWindow title="terminal" command="bunx @cookest/ui-cli list">
              <div>{dim("$ ")}{white("bunx @cookest/ui-cli list")}</div>
              <div className="mt-3">
                {"  "}{white("Cookest UI")}{" "}{dim("18 components")}
              </div>
              <div className="mt-3">{dim("  Inputs")}</div>
              <div>{dim("  ────────────────────────────────────────────────────")}</div>
              <div>{"  "}{cyan("button")}{" ".repeat(7)}{dim("Pressable button with variants, loading state...")}</div>
              <div>{"  "}{cyan("input")}{" ".repeat(8)}{dim("Text input with label, error, helper text...")}</div>
              <div>{"  "}{cyan("toggle")}{" ".repeat(7)}{dim("Animated on/off switch with label...")}</div>
              <div>{"  "}{cyan("select")}{" ".repeat(7)}{dim("Custom dropdown with search, keyboard nav...")}</div>
              <div className="mt-2">{dim("  Display")}</div>
              <div>{dim("  ────────────────────────────────────────────────────")}</div>
              <div>{"  "}{cyan("badge")}{" ".repeat(8)}{dim("Status label — info, success, warning...")}</div>
              <div>{"  "}{cyan("alert")}{" ".repeat(8)}{dim("Info, success, warning, error banners...")}</div>
              <div>{"  "}{cyan("avatar")}{" ".repeat(7)}{dim("User avatar with image, initials fallback...")}</div>
              <div className="mt-2">{dim("  … and 11 more")}</div>
              <div className="mt-3">{"  "}{dim("cookest-ui add <component>")}</div>
            </TerminalWindow>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex gap-5 mb-8">
          <div className="flex flex-col items-center">
            <StepBadge n={3} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Plus size={16} style={{ color: "var(--ck-primary)" }} />
              <h3 className="text-base font-semibold m-0" style={{ color: "var(--ck-heading)" }}>
                Add components to your project
              </h3>
            </div>
            <p className="text-sm mb-4" style={{ color: "var(--ck-text-muted)" }}>
              Run <InlineCode>add</InlineCode> with one or more component names.
              Files are fetched from the registry and written directly into your project —
              ready to customize.
            </p>
            <TerminalWindow title="terminal" command="bunx @cookest/ui-cli add button badge card">
              <div>{dim("$ ")}{white("bunx @cookest/ui-cli add button badge card")}</div>
              <div className="mt-3">{"  "}{white("Cookest UI — add")}</div>
              <div className="mt-2">
                {"  "}{dim("Fetching from registry (github.com/Cookest)")}
              </div>
              <div className="mt-2">
                {"  "}{white("Adding 3 components (react)")}
              </div>
              <div className="mt-2">
                {"  "}{white("Adding button...")}
              </div>
              <div>{"    "}{green("✔")}{" "}{dim("src/components/ui/Button.tsx")}</div>
              <div>{"  "}{white("Adding badge...")}
              </div>
              <div>{"    "}{green("✔")}{" "}{dim("src/components/ui/Badge.tsx")}</div>
              <div>{"  "}{white("Adding card...")}
              </div>
              <div>{"    "}{green("✔")}{" "}{dim("src/components/ui/Card.tsx")}</div>
              <div className="mt-3">{"  "}{dim("Import in your project:")}</div>
              <div>
                {"  "}{yellow("import")}
                {" { "}{cyan("Button")}{" } "}{yellow("from")}
                {" "}{yellow('"@/components/ui/Button"')}
                {yellow(";")}
              </div>
              <div className="mt-3">{"  "}{green("✔")}{" "}{white("Done!")}</div>
            </TerminalWindow>
          </div>
        </div>
      </section>

      <Divider label="Reference" />

      {/* Commands reference */}
      <section className="mt-10 mb-12">
        <h2 className="text-xl font-semibold mb-6" style={{ color: "var(--ck-heading)" }}>
          Commands
        </h2>

        <div className="flex flex-col gap-4">
          {[
            {
              cmd: "cookest-ui init",
              flag: "--yes",
              description: "Create .cookestrc in the current project. Auto-detects framework and package manager. Use --yes to skip confirmation prompts.",
            },
            {
              cmd: "cookest-ui list",
              flag: "[filter]",
              description: "List all available components grouped by category. Pass a string to filter by name, description, or tag.",
            },
            {
              cmd: "cookest-ui add <name>",
              flag: "--overwrite",
              description: "Add one or more components to your project. Fetches source files from the registry. Use --overwrite to replace existing files.",
            },
            {
              cmd: "cookest-ui diff <name>",
              flag: "--all",
              description: "Compare your local component files against the registry source. Useful when upgrading.",
            },
          ].map(({ cmd, flag, description }) => (
            <Card key={cmd} variant="outlined" padding="md">
              <CardBody>
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <code
                        className="text-sm font-mono font-bold"
                        style={{ color: "var(--ck-heading)" }}
                      >
                        {cmd}
                      </code>
                      <code
                        className="text-xs font-mono"
                        style={{ color: "var(--ck-text-muted)" }}
                      >
                        {flag}
                      </code>
                    </div>
                    <p className="text-sm m-0" style={{ color: "var(--ck-text-muted)" }}>
                      {description}
                    </p>
                  </div>
                  <CopyButton text={cmd} />
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      {/* Package info */}
      <section className="mb-12">
        <div
          className="rounded-2xl p-6"
          style={{ background: "var(--ck-surface)", border: "1px solid var(--ck-border)" }}
        >
          <div className="flex items-start gap-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "rgba(122,154,101,0.1)" }}
            >
              <Package size={18} style={{ color: "var(--ck-primary)" }} />
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-1 m-0" style={{ color: "var(--ck-heading)" }}>
                npm — @cookest/ui-cli
              </h3>
              <p className="text-sm m-0 mb-3" style={{ color: "var(--ck-text-muted)" }}>
                Available on npm. Use <InlineCode>bunx</InlineCode>,{" "}
                <InlineCode>npx</InlineCode>, or <InlineCode>pnpx</InlineCode> to run
                without installing globally.
              </p>
              <div className="flex gap-2 flex-wrap">
                {["bunx @cookest/ui-cli", "npx @cookest/ui-cli", "pnpx @cookest/ui-cli"].map((c) => (
                  <code
                    key={c}
                    className="text-xs font-mono px-2.5 py-1.5 rounded-lg"
                    style={{
                      background: "rgba(122,154,101,0.08)",
                      color: "var(--ck-text)",
                      border: "1px solid var(--ck-border)",
                    }}
                  >
                    {c}
                  </code>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
