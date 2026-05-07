"use client";

import { useState } from "react";
import { Input } from "@cookest/ui";
import { Playground, PropsTable, PageHeader } from "@/components/Playground";
import { Search, Mail } from "lucide-react";
import { RelatedComponents } from "@/components/RelatedComponents";
import { Breadcrumb } from "@/components/Breadcrumb";

const inputSizes = ["sm", "md", "lg"] as const;

export default function InputPage() {
  const [controlledValue, setControlledValue] = useState("");
  const [hasError, setHasError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  return (
    <div>
      <Breadcrumb />
      <PageHeader
        title="Input"
        description="Text inputs with labels, validation states, helper text, and icon support."
      />

      <div className="flex flex-col gap-8">
        {/* Basic */}
        <Playground
          title="Basic"
          description="A simple input with a label and placeholder."
          code={`<Input
  label="Email"
  placeholder="you@example.com"
/>`}
        >
          <div className="w-full max-w-sm">
            <Input label="Email" placeholder="you@example.com" />
          </div>
        </Playground>

        {/* Sizes */}
        <Playground
          title="Sizes"
          description="Inputs come in sm, md, and lg sizes."
          code={`<Input inputSize="sm" placeholder="Small" />
<Input inputSize="md" placeholder="Medium" />
<Input inputSize="lg" placeholder="Large" />`}
        >
          <div className="flex flex-col gap-4 w-full max-w-sm">
            {inputSizes.map((s) => (
              <Input
                key={s}
                inputSize={s}
                label={s === "sm" ? "Small" : s === "md" ? "Medium" : "Large"}
                placeholder={`${s} input`}
              />
            ))}
          </div>
        </Playground>

        {/* Validation */}
        <Playground
          title="Validation"
          description="Inputs with error messages and helper text."
          code={`<Input
  label="Password"
  type="password"
  error="Password must be at least 8 characters."
/>
<Input
  label="Username"
  placeholder="johndoe"
  helperText="Must be 3-20 characters, no spaces."
/>`}
        >
          <div className="flex flex-col gap-4 w-full max-w-sm">
            <Input
              label="Password"
              type="password"
              placeholder="Enter password"
              error="Password must be at least 8 characters."
            />
            <Input
              label="Username"
              placeholder="johndoe"
              helperText="Must be 3-20 characters, no spaces."
            />
          </div>
        </Playground>

        {/* With Icons */}
        <Playground
          title="With Icons"
          description="Inputs can include a leading icon for context."
          code={`<Input
  label="Search"
  placeholder="Search recipes…"
  iconLeft={<Search size={16} />}
/>
<Input
  label="Email"
  placeholder="you@example.com"
  iconLeft={<Mail size={16} />}
/>`}
        >
          <div className="flex flex-col gap-4 w-full max-w-sm">
            <Input
              label="Search"
              placeholder="Search recipes…"
              iconLeft={<Search size={16} />}
            />
            <Input
              label="Email"
              placeholder="you@example.com"
              iconLeft={<Mail size={16} />}
            />
          </div>
        </Playground>

        {/* Interactive */}
        <Playground
          title="Interactive"
          description="A controlled input with live value display and toggles for error and disabled states."
          code={`const [value, setValue] = useState("");
const [hasError, setHasError] = useState(false);
const [isDisabled, setIsDisabled] = useState(false);

<Input
  label="Interactive Input"
  placeholder="Type something…"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  error={hasError ? "This field has an error." : undefined}
  disabled={isDisabled}
/>`}
        >
          <div className="flex flex-col items-center gap-6 w-full">
            {/* Controls */}
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => setHasError((e) => !e)}
                className="px-3 py-1 text-xs rounded-lg cursor-pointer border"
                style={{
                  borderColor: "var(--ck-border)",
                  background: hasError
                    ? "var(--ck-primary)"
                    : "var(--ck-surface)",
                  color: hasError ? "#fff" : "var(--ck-text)",
                }}
              >
                Error: {hasError ? "On" : "Off"}
              </button>
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
                Disabled: {isDisabled ? "On" : "Off"}
              </button>
            </div>

            {/* Input */}
            <div className="w-full max-w-sm">
              <Input
                label="Interactive Input"
                placeholder="Type something…"
                value={controlledValue}
                onChange={(e) => setControlledValue(e.target.value)}
                error={hasError ? "This field has an error." : undefined}
                disabled={isDisabled}
              />
            </div>

            {/* Live value */}
            <div
              className="text-xs px-4 py-2 rounded-lg w-full max-w-sm"
              style={{
                background: "var(--ck-surface)",
                color: "var(--ck-text-muted)",
                border: "1px dashed var(--ck-border)",
              }}
            >
              Current value:{" "}
              <span style={{ color: "var(--ck-heading)" }}>
                {controlledValue || "(empty)"}
              </span>
            </div>
          </div>
        </Playground>

        {/* Props Table */}
        <PropsTable
          props={[
            {
              name: "label",
              type: "string",
              description: "Label text displayed above the input.",
            },
            {
              name: "placeholder",
              type: "string",
              description: "Placeholder text shown when the input is empty.",
            },
            {
              name: "error",
              type: "string",
              description:
                "Error message. When set, the input is styled as invalid.",
            },
            {
              name: "helperText",
              type: "string",
              description: "Hint text displayed below the input.",
            },
            {
              name: "inputSize",
              type: '"sm" | "md" | "lg"',
              default: '"md"',
              description: "Controls the height and font size of the input.",
            },
            {
              name: "iconLeft",
              type: "ReactNode",
              description: "Icon rendered inside the input on the left.",
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
              description: "Stretches the input to fill its container.",
            },
          ]}
        />
        <RelatedComponents component="input" />

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
                  Always include a visible label
                </li>
                <li className="text-sm flex items-start gap-2" style={{ color: "var(--ck-text)" }}>
                  <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--ck-primary)" }} />
                  Show validation feedback inline
                </li>
                <li className="text-sm flex items-start gap-2" style={{ color: "var(--ck-text)" }}>
                  <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--ck-primary)" }} />
                  Use placeholder text as hints not labels
                </li>
                <li className="text-sm flex items-start gap-2" style={{ color: "var(--ck-text)" }}>
                  <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--ck-primary)" }} />
                  Use the correct input type (email, password, etc.)
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
                  Use placeholder as the only label
                </li>
                <li className="text-sm flex items-start gap-2" style={{ color: "var(--ck-text)" }}>
                  <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--ck-primary)" }} />
                  Show errors before user interaction
                </li>
                <li className="text-sm flex items-start gap-2" style={{ color: "var(--ck-text)" }}>
                  <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--ck-primary)" }} />
                  Auto-clear fields on validation error
                </li>
                <li className="text-sm flex items-start gap-2" style={{ color: "var(--ck-text)" }}>
                  <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--ck-primary)" }} />
                  Make required fields unmarked
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
                  <td className="px-5 py-3" style={{ color: "var(--ck-text)" }}>Label association</td>
                  <td className="px-5 py-3" style={{ color: "var(--ck-text-muted)" }}>Via htmlFor/id pairing</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--ck-border)" }}>
                  <td className="px-5 py-3" style={{ color: "var(--ck-text)" }}>aria-required</td>
                  <td className="px-5 py-3" style={{ color: "var(--ck-text-muted)" }}>Marks required fields for assistive technologies</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--ck-border)" }}>
                  <td className="px-5 py-3" style={{ color: "var(--ck-text)" }}>aria-invalid + aria-describedby</td>
                  <td className="px-5 py-3" style={{ color: "var(--ck-text-muted)" }}>Links error messages to the input for screen readers</td>
                </tr>
                <tr>
                  <td className="px-5 py-3" style={{ color: "var(--ck-text)" }}>autocomplete attribute</td>
                  <td className="px-5 py-3" style={{ color: "var(--ck-text-muted)" }}>Supports browser autofill for common fields</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
