"use client";

import { useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Badge,
  Alert,
  Input,
  Toggle,
  Divider,
} from "@cookest/ui";
import { Copy, Check, ArrowRight, Terminal, Package, Paintbrush, Layers } from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PackageManagerTabs } from "@/components/PackageManagerTabs";

function CodeBlock({ code, language = "bash" }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-xl overflow-hidden" style={{ border: "1px solid var(--ck-border)" }}>
      <div
        className="flex items-center justify-between px-4 py-2"
        style={{ background: "var(--ck-surface)", borderBottom: "1px solid var(--ck-border)" }}
      >
        <span className="text-xs font-mono" style={{ color: "var(--ck-text-muted)" }}>
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 text-xs rounded-md cursor-pointer border-0"
          style={{ background: "transparent", color: "var(--ck-text-muted)" }}
          aria-label={copied ? "Copied to clipboard" : "Copy code to clipboard"}
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre
        className="!m-0 !border-0 !rounded-none px-4 py-4 overflow-x-auto text-sm"
        style={{ background: "var(--ck-bg)", fontFamily: "'JetBrains Mono', monospace" }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}

function StepCard({
  step,
  title,
  icon: Icon,
  children,
}: {
  step: number;
  title: string;
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-5">
      <div className="flex flex-col items-center">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
          style={{ background: "var(--ck-primary)", color: "#fff" }}
        >
          {step}
        </div>
        <div className="flex-1 w-px mt-3" style={{ background: "var(--ck-border)" }} />
      </div>
      <div className="pb-10 flex-1">
        <div className="flex items-center gap-2 mb-3">
          <Icon size={18} style={{ color: "var(--ck-primary)" }} />
          <h3 className="text-lg font-semibold m-0" style={{ color: "var(--ck-heading)" }}>
            {title}
          </h3>
        </div>
        {children}
      </div>
    </div>
  );
}

export default function GettingStartedPage() {
  const [demoToggle, setDemoToggle] = useState(false);

  return (
    <div className="max-w-4xl">
      <Breadcrumb />

      {/* Header */}
      <div className="mb-12">
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4"
          style={{ background: "rgba(122,154,101,0.1)", color: "var(--ck-primary)" }}
        >
          Quick Start
        </div>
        <h1
          className="text-4xl font-bold mb-3"
          style={{ color: "var(--ck-heading)", fontFamily: "var(--font-serif)" }}
        >
          Getting Started
        </h1>
        <p className="text-base leading-relaxed" style={{ color: "var(--ck-text-muted)" }}>
          Get up and running with Cookest UI in under 5 minutes. Install the package,
          set up your project, and build your first component.
        </p>
      </div>

      {/* Prerequisites */}
      <section className="mb-12">
        <Alert variant="info" title="Prerequisites">
          Cookest UI requires React 18+ and a CSS-capable bundler (Next.js, Vite, etc.).
          We recommend using Bun or Node.js 18+ as your package manager.
        </Alert>
      </section>

      {/* Steps */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-8" style={{ color: "var(--ck-heading)" }}>
          Setup Guide
        </h2>

        <StepCard step={1} title="Install the package" icon={Package}>
          <p className="text-sm mb-4" style={{ color: "var(--ck-text)" }}>
            Install <code className="px-1.5 py-0.5 rounded text-xs" style={{ background: "rgba(122,154,101,0.1)", color: "var(--ck-primary)" }}>@cookest/ui</code> using your preferred package manager:
          </p>
          <PackageManagerTabs />
        </StepCard>

        <StepCard step={2} title="Import the styles" icon={Paintbrush}>
          <p className="text-sm mb-4" style={{ color: "var(--ck-text)" }}>
            Import the Cookest UI stylesheet in your global CSS file or app entry point.
            This provides all design tokens and component styles.
          </p>
          <CodeBlock
            code={`/* globals.css or app entry */
@import "@cookest/ui/src/styles.css";`}
            language="css"
          />
          <p className="text-sm mt-4" style={{ color: "var(--ck-text-muted)" }}>
            If you use Tailwind CSS, import it alongside your Tailwind directives:
          </p>
          <CodeBlock
            code={`@import "tailwindcss";
@import "@cookest/ui/src/styles.css";`}
            language="css"
          />
        </StepCard>

        <StepCard step={3} title="Use a component" icon={Layers}>
          <p className="text-sm mb-4" style={{ color: "var(--ck-text)" }}>
            Import components from <code className="px-1.5 py-0.5 rounded text-xs" style={{ background: "rgba(122,154,101,0.1)", color: "var(--ck-primary)" }}>@cookest/ui</code> and
            use them in your JSX. All components are tree-shakable.
          </p>
          <CodeBlock
            code={`import { Button, Card, CardBody, Badge } from "@cookest/ui";

export function RecipeCard() {
  return (
    <Card variant="interactive">
      <CardBody>
        <Badge variant="success" dot>Healthy</Badge>
        <h3>Pasta Primavera</h3>
        <p>Fresh vegetables in a light garlic sauce.</p>
        <Button variant="primary" size="sm">
          View Recipe
        </Button>
      </CardBody>
    </Card>
  );
}`}
            language="tsx"
          />
        </StepCard>

        <StepCard step={4} title="Run your app" icon={Terminal}>
          <p className="text-sm mb-4" style={{ color: "var(--ck-text)" }}>
            Start the development server and see your component in action:
          </p>
          <CodeBlock code="bun dev" language="bash" />
        </StepCard>
      </section>

      <Divider label="Live Preview" />

      {/* Live demo */}
      <section className="mt-10 mb-12">
        <h2 className="text-2xl font-semibold mb-2" style={{ color: "var(--ck-heading)" }}>
          Your First Component
        </h2>
        <p className="text-sm mb-6" style={{ color: "var(--ck-text-muted)" }}>
          Here is the recipe card from Step 3, rendered live with Cookest UI:
        </p>

        <div
          className="rounded-2xl border p-8"
          style={{ borderColor: "var(--ck-border)", background: "var(--ck-bg)" }}
        >
          <div className="max-w-sm mx-auto">
            <Card variant="interactive">
              <CardBody>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="success" dot>Healthy</Badge>
                  <Badge variant="default" size="sm">25 min</Badge>
                </div>
                <h3
                  className="text-lg font-bold mb-2 m-0"
                  style={{ color: "var(--ck-heading)", fontFamily: "var(--font-serif)" }}
                >
                  Pasta Primavera
                </h3>
                <p className="text-sm mb-4 m-0" style={{ color: "var(--ck-text-muted)" }}>
                  Fresh seasonal vegetables tossed in a light garlic and olive oil sauce
                  with al dente penne pasta.
                </p>
                <div className="flex items-center gap-3 mb-4">
                  <Input
                    placeholder="Add a note…"
                    inputSize="sm"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Toggle
                    checked={demoToggle}
                    onChange={(e) => setDemoToggle(e.target.checked)}
                    label="Favorite"
                  />
                  <Button variant="primary" size="sm" iconRight={<ArrowRight size={14} />}>
                    View Recipe
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      <Divider label="What's Next" />

      {/* Next steps */}
      <section className="mt-10 mb-12">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            {
              title: "Browse Components",
              description: "Explore all 19 components with interactive playgrounds.",
              href: "/components/button",
            },
            {
              title: "See Examples",
              description: "Real-world UI patterns built with Cookest UI.",
              href: "/examples",
            },
            {
              title: "Design Tokens",
              description: "Colors, typography, spacing, and effects reference.",
              href: "/tokens",
            },
          ].map((item) => (
            <a key={item.href} href={item.href} className="no-underline block group">
              <Card variant="interactive">
                <CardBody>
                  <h3
                    className="text-sm font-semibold mb-1 m-0"
                    style={{ color: "var(--ck-heading)" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-xs m-0 mb-3" style={{ color: "var(--ck-text-muted)" }}>
                    {item.description}
                  </p>
                  <span
                    className="text-xs font-medium inline-flex items-center gap-1"
                    style={{ color: "var(--ck-primary)" }}
                  >
                    Explore <ArrowRight size={12} />
                  </span>
                </CardBody>
              </Card>
            </a>
          ))}
        </div>
      </section>

      {/* Dark mode */}
      <section className="mb-12">
        <Card variant="outlined" padding="lg">
          <CardBody>
            <div className="flex items-start gap-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "rgba(122,154,101,0.1)" }}
              >
                <Paintbrush size={20} style={{ color: "var(--ck-primary)" }} />
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-1 m-0" style={{ color: "var(--ck-heading)" }}>
                  Dark Mode Support
                </h3>
                <p className="text-sm m-0" style={{ color: "var(--ck-text-muted)" }}>
                  Cookest UI includes built-in dark mode. Add the{" "}
                  <code className="px-1.5 py-0.5 rounded text-xs" style={{ background: "rgba(122,154,101,0.1)", color: "var(--ck-primary)" }}>dark</code>{" "}
                  class to your <code className="px-1.5 py-0.5 rounded text-xs" style={{ background: "rgba(122,154,101,0.1)", color: "var(--ck-primary)" }}>&lt;html&gt;</code>{" "}
                  element and all CSS variables automatically switch to their dark variants.
                  Try the toggle in the sidebar to see it in action!
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </section>
    </div>
  );
}
