"use client";

import { useState } from "react";
import { Button } from "@cookest/ui";
import { Playground, PropsTable, PageHeader } from "@/components/Playground";
import { Download, ArrowRight, Mail } from "lucide-react";
import { RelatedComponents } from "@/components/RelatedComponents";
import { Breadcrumb } from "@/components/Breadcrumb";

const variants = ["primary", "secondary", "ghost", "danger"] as const;
const sizes = ["sm", "md", "lg"] as const;

export default function ButtonPage() {
  const [activeVariant, setActiveVariant] =
    useState<(typeof variants)[number]>("primary");
  const [activeSize, setActiveSize] = useState<(typeof sizes)[number]>("md");
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  return (
    <div>
      <Breadcrumb />
      <PageHeader
        title="Button"
        description="Buttons trigger actions. They support multiple variants, sizes, loading states, and icons."
      />

      <div className="flex flex-col gap-8">
        {/* Variants */}
        <Playground
          title="Variants"
          description="Four visual variants for different levels of emphasis."
          code={`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>`}
        >
          {variants.map((v) => (
            <Button key={v} variant={v}>
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </Button>
          ))}
        </Playground>

        {/* Sizes */}
        <Playground
          title="Sizes"
          description="Buttons come in sm, md, and lg sizes."
          code={`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`}
        >
          {sizes.map((s) => (
            <Button key={s} size={s}>
              {s === "sm" ? "Small" : s === "md" ? "Medium" : "Large"}
            </Button>
          ))}
        </Playground>

        {/* States */}
        <Playground
          title="States"
          description="Loading, disabled, and full-width button states."
          code={`<Button loading>Loading…</Button>
<Button disabled>Disabled</Button>
<Button fullWidth>Full Width</Button>`}
        >
          <div className="flex flex-col items-center gap-4 w-full">
            <div className="flex gap-4">
              <Button loading>Loading…</Button>
              <Button disabled>Disabled</Button>
            </div>
            <Button fullWidth>Full Width</Button>
          </div>
        </Playground>

        {/* With Icons */}
        <Playground
          title="With Icons"
          description="Buttons can include leading or trailing icons."
          code={`<Button iconLeft={<Download size={16} />}>Download</Button>
<Button iconRight={<ArrowRight size={16} />}>Continue</Button>
<Button variant="secondary" iconLeft={<Mail size={16} />}>
  Send Email
</Button>`}
        >
          <Button iconLeft={<Download size={16} />}>Download</Button>
          <Button iconRight={<ArrowRight size={16} />}>Continue</Button>
          <Button variant="secondary" iconLeft={<Mail size={16} />}>
            Send Email
          </Button>
        </Playground>

        {/* Interactive */}
        <Playground
          title="Interactive"
          description="Pick a variant and size to see a live preview."
          code={`const [variant, setVariant] = useState("primary");
const [size, setSize] = useState("md");

<Button variant={variant} size={size}>
  Click Me
</Button>`}
        >
          <div className="flex flex-col items-center gap-6 w-full">
            {/* Controls */}
            <div className="flex flex-wrap gap-6 justify-center">
              {/* Variant picker */}
              <div className="flex flex-col gap-2">
                <span
                  className="text-xs font-semibold"
                  style={{ color: "var(--ck-text-muted)" }}
                >
                  Variant
                </span>
                <div className="flex gap-1">
                  {variants.map((v) => (
                    <button
                      key={v}
                      onClick={() => setActiveVariant(v)}
                      className="px-3 py-1 text-xs rounded-lg cursor-pointer border"
                      style={{
                        borderColor: "var(--ck-border)",
                        background:
                          activeVariant === v
                            ? "var(--ck-primary)"
                            : "var(--ck-surface)",
                        color: activeVariant === v ? "#fff" : "var(--ck-text)",
                      }}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size picker */}
              <div className="flex flex-col gap-2">
                <span
                  className="text-xs font-semibold"
                  style={{ color: "var(--ck-text-muted)" }}
                >
                  Size
                </span>
                <div className="flex gap-1">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setActiveSize(s)}
                      className="px-3 py-1 text-xs rounded-lg cursor-pointer border"
                      style={{
                        borderColor: "var(--ck-border)",
                        background:
                          activeSize === s
                            ? "var(--ck-primary)"
                            : "var(--ck-surface)",
                        color: activeSize === s ? "#fff" : "var(--ck-text)",
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Loading toggle */}
              <div className="flex flex-col gap-2">
                <span
                  className="text-xs font-semibold"
                  style={{ color: "var(--ck-text-muted)" }}
                >
                  Loading
                </span>
                <button
                  onClick={() => setIsLoading((l) => !l)}
                  className="px-3 py-1 text-xs rounded-lg cursor-pointer border"
                  style={{
                    borderColor: "var(--ck-border)",
                    background: isLoading
                      ? "var(--ck-primary)"
                      : "var(--ck-surface)",
                    color: isLoading ? "#fff" : "var(--ck-text)",
                  }}
                >
                  {isLoading ? "On" : "Off"}
                </button>
              </div>

              {/* Disabled toggle */}
              <div className="flex flex-col gap-2">
                <span
                  className="text-xs font-semibold"
                  style={{ color: "var(--ck-text-muted)" }}
                >
                  Disabled
                </span>
                <button
                  onClick={() => setIsDisabled((d) => !d)}
                  className="px-3 py-1 text-xs rounded-lg cursor-pointer border"
                  style={{
                    borderColor: "var(--ck-border)",
                    background: isDisabled
                      ? "var(--ck-primary)"
                      : "var(--ck-surface)",
                    color: isDisabled ? "#fff" : "var(--ck-text)",
                  }}
                >
                  {isDisabled ? "On" : "Off"}
                </button>
              </div>
            </div>

            {/* Preview */}
            <div
              className="rounded-xl p-8 flex items-center justify-center w-full"
              style={{
                background: "var(--ck-surface)",
                border: "1px dashed var(--ck-border)",
              }}
            >
              <Button
                variant={activeVariant}
                size={activeSize}
                loading={isLoading}
                disabled={isDisabled}
              >
                Click Me
              </Button>
            </div>
          </div>
        </Playground>

        {/* Props Table */}
        <PropsTable
          props={[
            {
              name: "variant",
              type: '"primary" | "secondary" | "ghost" | "danger"',
              default: '"primary"',
              description: "Visual style of the button.",
            },
            {
              name: "size",
              type: '"sm" | "md" | "lg"',
              default: '"md"',
              description: "Size of the button.",
            },
            {
              name: "loading",
              type: "boolean",
              default: "false",
              description:
                "Shows a spinner and disables interaction while loading.",
            },
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description: "Prevents interaction when true.",
            },
            {
              name: "fullWidth",
              type: "boolean",
              default: "false",
              description: "Stretches the button to fill its container.",
            },
            {
              name: "iconLeft",
              type: "ReactNode",
              description: "Icon rendered before the label.",
            },
            {
              name: "iconRight",
              type: "ReactNode",
              description: "Icon rendered after the label.",
            },
            {
              name: "children",
              type: "ReactNode",
              description: "Button label content.",
            },
          ]}
        />
        <RelatedComponents component="button" />

        {/* ── Best Practices ── */}
        <section className="mt-12">
          <h2 className="text-xl font-bold mb-6" style={{ color: "var(--ck-heading)", fontFamily: "var(--font-serif)" }}>
            Best Practices
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Do's */}
            <div className="rounded-2xl border p-6" style={{ borderColor: "rgba(122,154,101,0.3)", background: "rgba(122,154,101,0.05)" }}>
              <h3 className="text-sm font-semibold mb-4 flex items-center gap-2" style={{ color: "var(--ck-primary)" }}>
                ✅ Do
              </h3>
              <ul className="space-y-2 list-none p-0 m-0">
                <li className="text-sm flex items-start gap-2" style={{ color: "var(--ck-text)" }}>
                  <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--ck-primary)" }} />
                  Use primary for the main CTA
                </li>
                <li className="text-sm flex items-start gap-2" style={{ color: "var(--ck-text)" }}>
                  <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--ck-primary)" }} />
                  Use descriptive labels
                </li>
                <li className="text-sm flex items-start gap-2" style={{ color: "var(--ck-text)" }}>
                  <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--ck-primary)" }} />
                  Show loading state during async operations
                </li>
                <li className="text-sm flex items-start gap-2" style={{ color: "var(--ck-text)" }}>
                  <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--ck-primary)" }} />
                  Use iconLeft for actions like Save/Delete
                </li>
              </ul>
            </div>
            {/* Don'ts */}
            <div className="rounded-2xl border p-6" style={{ borderColor: "rgba(229,62,62,0.3)", background: "rgba(229,62,62,0.05)" }}>
              <h3 className="text-sm font-semibold mb-4 flex items-center gap-2" style={{ color: "var(--ck-error, #e53e3e)" }}>
                ❌ Don&apos;t
              </h3>
              <ul className="space-y-2 list-none p-0 m-0">
                <li className="text-sm flex items-start gap-2" style={{ color: "var(--ck-text)" }}>
                  <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--ck-primary)" }} />
                  Put multiple primary buttons next to each other
                </li>
                <li className="text-sm flex items-start gap-2" style={{ color: "var(--ck-text)" }}>
                  <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--ck-primary)" }} />
                  Use vague labels like &quot;Click Here&quot;
                </li>
                <li className="text-sm flex items-start gap-2" style={{ color: "var(--ck-text)" }}>
                  <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--ck-primary)" }} />
                  Disable without explanation
                </li>
                <li className="text-sm flex items-start gap-2" style={{ color: "var(--ck-text)" }}>
                  <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--ck-primary)" }} />
                  Use ghost variant for important actions
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── Accessibility ── */}
        <section className="mt-12">
          <h2 className="text-xl font-bold mb-6" style={{ color: "var(--ck-heading)", fontFamily: "var(--font-serif)" }}>
            Accessibility
          </h2>
          <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "var(--ck-border)", background: "var(--ck-surface)" }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "var(--ck-bg)" }}>
                  <th className="text-left px-5 py-3 font-semibold border-b" style={{ borderColor: "var(--ck-border)", color: "var(--ck-heading)" }}>Feature</th>
                  <th className="text-left px-5 py-3 font-semibold border-b" style={{ borderColor: "var(--ck-border)", color: "var(--ck-heading)" }}>Support</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid var(--ck-border)" }}>
                  <td className="px-5 py-3" style={{ color: "var(--ck-text)" }}>Keyboard</td>
                  <td className="px-5 py-3" style={{ color: "var(--ck-text-muted)" }}>Space/Enter to activate</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--ck-border)" }}>
                  <td className="px-5 py-3" style={{ color: "var(--ck-text)" }}>Focus visible outline</td>
                  <td className="px-5 py-3" style={{ color: "var(--ck-text-muted)" }}>Visible focus ring on keyboard navigation</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--ck-border)" }}>
                  <td className="px-5 py-3" style={{ color: "var(--ck-text)" }}>aria-label</td>
                  <td className="px-5 py-3" style={{ color: "var(--ck-text-muted)" }}>Required for icon-only buttons</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--ck-border)" }}>
                  <td className="px-5 py-3" style={{ color: "var(--ck-text)" }}>aria-disabled</td>
                  <td className="px-5 py-3" style={{ color: "var(--ck-text-muted)" }}>Communicated to assistive technologies</td>
                </tr>
                <tr>
                  <td className="px-5 py-3" style={{ color: "var(--ck-text)" }}>role=&quot;button&quot;</td>
                  <td className="px-5 py-3" style={{ color: "var(--ck-text-muted)" }}>Implicit on native button element</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
