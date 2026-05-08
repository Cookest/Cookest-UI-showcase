"use client";

import { useState, useRef, useEffect } from "react";
import { Playground, PropsTable, PageHeader } from "@/components/Playground";
import { RelatedComponents } from "@/components/RelatedComponents";
import { Breadcrumb } from "@/components/Breadcrumb";

// ── Inline Checkbox component (not yet in @cookest/ui) ──────────────────────

type CheckboxSize = "sm" | "md" | "lg";

interface CkCheckboxProps {
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  error?: boolean;
  size?: CheckboxSize;
  label?: string;
  description?: string;
  id?: string;
  onChange?: (checked: boolean) => void;
}

const sizeMap: Record<CheckboxSize, { box: number; icon: number; text: number; gap: number }> = {
  sm: { box: 14, icon: 8,  text: 13, gap: 7  },
  md: { box: 16, icon: 10, text: 14, gap: 9  },
  lg: { box: 20, icon: 13, text: 15, gap: 11 },
};

function CkCheckbox({
  checked = false,
  indeterminate = false,
  disabled = false,
  error = false,
  size = "md",
  label,
  description,
  id,
  onChange,
}: CkCheckboxProps) {
  const dim = sizeMap[size];
  const isActive = checked || indeterminate;

  const borderColor = error
    ? "var(--ck-error, #e53e3e)"
    : isActive
    ? "var(--ck-primary)"
    : "var(--ck-border)";

  const bg = isActive && !disabled
    ? "var(--ck-primary)"
    : "transparent";

  return (
    <label
      htmlFor={id}
      style={{
        display: "inline-flex",
        alignItems: label ? "flex-start" : "center",
        gap: dim.gap,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.45 : 1,
        userSelect: "none",
      }}
      onClick={(e) => {
        if (disabled) return;
        e.preventDefault();
        onChange?.(!checked);
      }}
    >
      {/* Box */}
      <div
        style={{
          width: dim.box,
          height: dim.box,
          borderRadius: 4,
          border: `2px solid ${borderColor}`,
          background: bg,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "border-color 0.15s, background 0.15s, box-shadow 0.15s",
          marginTop: label ? 2 : 0,
          boxShadow: error
            ? "0 0 0 3px rgba(229,62,62,0.15)"
            : isActive
            ? "0 0 0 0px transparent"
            : "none",
        }}
      >
        {checked && !indeterminate && (
          <svg
            width={dim.icon}
            height={dim.icon}
            viewBox="0 0 10 8"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M1 4L3.5 6.5L9 1"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
        {indeterminate && (
          <svg
            width={dim.icon}
            height={dim.icon * 0.35}
            viewBox="0 0 10 2"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M1 1H9"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        )}
      </div>

      {/* Label + description */}
      {label && (
        <div>
          <div
            style={{
              fontSize: dim.text,
              color: "var(--ck-text)",
              lineHeight: 1.4,
              fontWeight: 500,
            }}
          >
            {label}
          </div>
          {description && (
            <div
              style={{
                fontSize: dim.text - 1,
                color: "var(--ck-text-muted)",
                marginTop: 2,
                lineHeight: 1.4,
              }}
            >
              {description}
            </div>
          )}
        </div>
      )}
    </label>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

const dietaryOptions = [
  { key: "vegan",       label: "Vegan",        description: "No animal products" },
  { key: "gluten-free", label: "Gluten-Free",  description: "No gluten-containing grains" },
  { key: "nut-free",    label: "Nut-Free",     description: "No tree nuts or peanuts" },
  { key: "dairy-free",  label: "Dairy-Free",   description: "No milk or dairy products" },
];

export default function CheckboxPage() {
  // Default / variants
  const [defaultChecked, setDefaultChecked] = useState(false);
  const [indetermChecked, setIndetermChecked] = useState(false);

  // Sizes
  const [smChecked,  setSmChecked]  = useState(true);
  const [mdChecked,  setMdChecked]  = useState(false);
  const [lgChecked,  setLgChecked]  = useState(true);

  // States
  const [errorChecked, setErrorChecked] = useState(false);

  // Group / select-all
  const [selected, setSelected] = useState<Record<string, boolean>>({
    vegan: true, "gluten-free": false, "nut-free": true, "dairy-free": false,
  });

  const allSelected     = dietaryOptions.every((o) => selected[o.key]);
  const someSelected    = dietaryOptions.some((o) => selected[o.key]);
  const noneSelected    = !someSelected;
  const parentIndeterm  = someSelected && !allSelected;

  const toggleAll = () => {
    const next = noneSelected || parentIndeterm ? true : false;
    setSelected(Object.fromEntries(dietaryOptions.map((o) => [o.key, next])));
  };

  // With label state
  const [termsAccepted,      setTermsAccepted]     = useState(false);
  const [newsletterAccepted, setNewsletterAccepted] = useState(true);

  return (
    <div>
      <Breadcrumb />
      <PageHeader
        title="Checkbox"
        description="Checkboxes let users select one or more options from a list. They support checked, unchecked, and indeterminate states."
      />

      <div className="flex flex-col gap-8">

        {/* ── Variants ── */}
        <Playground
          title="Variants"
          description="Unchecked, checked, and indeterminate — the three core visual states."
          code={`// Unchecked
<CkCheckbox checked={false} onChange={setChecked} />

// Checked
<CkCheckbox checked={true} onChange={setChecked} />

// Indeterminate (partial group selection)
<CkCheckbox indeterminate={true} />`}
        >
          <div className="flex items-center gap-10">
            <div className="flex flex-col items-center gap-3">
              <CkCheckbox checked={defaultChecked} onChange={setDefaultChecked} />
              <span className="text-xs" style={{ color: "var(--ck-text-muted)" }}>
                {defaultChecked ? "Checked" : "Unchecked"}
              </span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <CkCheckbox checked={indetermChecked} onChange={setIndetermChecked} />
              <span className="text-xs" style={{ color: "var(--ck-text-muted)" }}>
                {indetermChecked ? "Checked" : "Unchecked"}
              </span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <CkCheckbox indeterminate checked={false} />
              <span className="text-xs" style={{ color: "var(--ck-text-muted)" }}>
                Indeterminate
              </span>
            </div>
          </div>
        </Playground>

        {/* ── Sizes ── */}
        <Playground
          title="Sizes"
          description="Three sizes — sm (14 px), md (16 px), lg (20 px) — to fit any context."
          code={`<CkCheckbox size="sm" checked={checked} onChange={setChecked} label="Small" />
<CkCheckbox size="md" checked={checked} onChange={setChecked} label="Medium" />
<CkCheckbox size="lg" checked={checked} onChange={setChecked} label="Large" />`}
        >
          <div className="flex flex-col gap-5">
            <CkCheckbox size="sm" checked={smChecked} onChange={setSmChecked} label="Small (sm)" />
            <CkCheckbox size="md" checked={mdChecked} onChange={setMdChecked} label="Medium (md)" />
            <CkCheckbox size="lg" checked={lgChecked} onChange={setLgChecked} label="Large (lg)" />
          </div>
        </Playground>

        {/* ── States ── */}
        <Playground
          title="States"
          description="Disabled prevents interaction; error highlights invalid or required fields."
          code={`// Disabled unchecked
<CkCheckbox disabled checked={false} label="Disabled" />

// Disabled checked
<CkCheckbox disabled checked={true} label="Disabled checked" />

// Error state
<CkCheckbox error checked={checked} onChange={setChecked} label="Required field" />`}
        >
          <div className="flex flex-col gap-5">
            <CkCheckbox disabled checked={false} label="Disabled" description="Cannot be interacted with" />
            <CkCheckbox disabled checked label="Disabled checked" description="Locked in on state" />
            <CkCheckbox error checked={errorChecked} onChange={setErrorChecked} label="Required field" description="You must accept to continue" />
          </div>
        </Playground>

        {/* ── Group ── */}
        <Playground
          title="Checkbox Group"
          description="A select-all parent checkbox with indeterminate state driven by child selections."
          code={`const [selected, setSelected] = useState({
  vegan: true, "gluten-free": false, "nut-free": true, "dairy-free": false,
});

const allSelected    = options.every((o) => selected[o.key]);
const parentIndeterm = options.some((o) => selected[o.key]) && !allSelected;

// Parent
<CkCheckbox
  checked={allSelected}
  indeterminate={parentIndeterm}
  label="Select all dietary filters"
  onChange={(val) => setSelected(/* all true/false */)}
/>

// Children
{options.map((o) => (
  <CkCheckbox
    key={o.key}
    checked={selected[o.key]}
    label={o.label}
    description={o.description}
    onChange={(val) => setSelected((prev) => ({ ...prev, [o.key]: val }))}
  />
))}`}
        >
          <div
            className="w-full max-w-sm rounded-xl border overflow-hidden"
            style={{ borderColor: "var(--ck-border)", background: "var(--ck-surface)" }}
          >
            {/* Select all row */}
            <div
              className="px-5 py-4 border-b"
              style={{ borderColor: "var(--ck-border)", background: "var(--ck-bg)" }}
            >
              <CkCheckbox
                checked={allSelected}
                indeterminate={parentIndeterm}
                label="Select all dietary filters"
                onChange={toggleAll}
              />
            </div>
            {/* Individual rows */}
            {dietaryOptions.map((opt, i, arr) => (
              <div
                key={opt.key}
                className="px-5 py-4"
                style={{
                  paddingLeft: 36,
                  borderBottom: i < arr.length - 1 ? "1px solid var(--ck-border)" : "none",
                }}
              >
                <CkCheckbox
                  checked={selected[opt.key]}
                  label={opt.label}
                  description={opt.description}
                  onChange={(val) =>
                    setSelected((prev) => ({ ...prev, [opt.key]: val }))
                  }
                />
              </div>
            ))}
          </div>
        </Playground>

        {/* ── With Label ── */}
        <Playground
          title="With Label &amp; Description"
          description="Checkboxes used in form agreements — each with a primary label and supporting description."
          code={`<CkCheckbox
  checked={termsAccepted}
  onChange={setTermsAccepted}
  label="I agree to the Terms of Service"
  description="You must accept the terms before creating an account."
/>

<CkCheckbox
  checked={newsletterAccepted}
  onChange={setNewsletterAccepted}
  label="Send me recipe inspiration"
  description="Weekly curated recipes and cooking tips. Unsubscribe anytime."
/>`}
        >
          <div className="flex flex-col gap-6 w-full max-w-sm">
            <CkCheckbox
              checked={termsAccepted}
              onChange={setTermsAccepted}
              label="I agree to the Terms of Service"
              description="You must accept the terms before creating an account."
              error={!termsAccepted}
            />
            <CkCheckbox
              checked={newsletterAccepted}
              onChange={setNewsletterAccepted}
              label="Send me recipe inspiration"
              description="Weekly curated recipes and cooking tips. Unsubscribe anytime."
            />
          </div>
        </Playground>

        {/* ── Props Table ── */}
        <PropsTable
          props={[
            {
              name: "checked",
              type: "boolean",
              default: "false",
              description: "Whether the checkbox is checked.",
            },
            {
              name: "indeterminate",
              type: "boolean",
              default: "false",
              description: "Shows a minus (−) icon to indicate partial child selection.",
            },
            {
              name: "size",
              type: '"sm" | "md" | "lg"',
              default: '"md"',
              description: "Controls the visual size of the checkbox box and label text.",
            },
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description: "Prevents interaction and renders the checkbox at reduced opacity.",
            },
            {
              name: "error",
              type: "boolean",
              default: "false",
              description: "Highlights the checkbox with an error ring (requires acceptance).",
            },
            {
              name: "label",
              type: "string",
              description: "Primary label text rendered beside the checkbox.",
            },
            {
              name: "description",
              type: "string",
              description: "Secondary helper text shown below the label.",
            },
            {
              name: "id",
              type: "string",
              description: "HTML id forwarded to the label element for external association.",
            },
            {
              name: "onChange",
              type: "(checked: boolean) => void",
              description: "Callback fired with the new boolean state on every click.",
            },
          ]}
        />

        <RelatedComponents component="checkbox" />

        {/* ── Best Practices ── */}
        <section className="mt-12">
          <h2
            className="text-xl font-bold mb-6"
            style={{ color: "var(--ck-heading)", fontFamily: "var(--font-serif)" }}
          >
            Best Practices
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className="rounded-2xl border p-6"
              style={{
                borderColor: "rgba(122,154,101,0.3)",
                background: "rgba(122,154,101,0.05)",
              }}
            >
              <h3
                className="text-sm font-semibold mb-4 flex items-center gap-2"
                style={{ color: "var(--ck-primary)" }}
              >
                ✅ Do
              </h3>
              <ul className="space-y-2 list-none p-0 m-0">
                {[
                  "Use for multi-select options in forms",
                  "Use indeterminate to signal partial group selection",
                  "Always pair with a visible, descriptive label",
                  "Show an error state when a required checkbox is unchecked",
                ].map((text) => (
                  <li
                    key={text}
                    className="text-sm flex items-start gap-2"
                    style={{ color: "var(--ck-text)" }}
                  >
                    <span
                      className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: "var(--ck-primary)" }}
                    />
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="rounded-2xl border p-6"
              style={{
                borderColor: "rgba(229,62,62,0.3)",
                background: "rgba(229,62,62,0.05)",
              }}
            >
              <h3
                className="text-sm font-semibold mb-4 flex items-center gap-2"
                style={{ color: "var(--ck-error, #e53e3e)" }}
              >
                ❌ Don&apos;t
              </h3>
              <ul className="space-y-2 list-none p-0 m-0">
                {[
                  "Use checkboxes as toggle switches for instant settings",
                  "Leave checkboxes without a label or aria-label",
                  "Nest checkbox groups more than one level deep",
                  "Use a single standalone checkbox for binary yes/no — use Toggle instead",
                ].map((text) => (
                  <li
                    key={text}
                    className="text-sm flex items-start gap-2"
                    style={{ color: "var(--ck-text)" }}
                  >
                    <span
                      className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: "var(--ck-error, #e53e3e)" }}
                    />
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Accessibility ── */}
        <section className="mt-12">
          <h2
            className="text-xl font-bold mb-6"
            style={{ color: "var(--ck-heading)", fontFamily: "var(--font-serif)" }}
          >
            Accessibility
          </h2>
          <div
            className="rounded-2xl border overflow-hidden"
            style={{ borderColor: "var(--ck-border)", background: "var(--ck-surface)" }}
          >
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "var(--ck-bg)" }}>
                  <th
                    className="text-left px-5 py-3 font-semibold border-b"
                    style={{ borderColor: "var(--ck-border)", color: "var(--ck-heading)" }}
                  >
                    Feature
                  </th>
                  <th
                    className="text-left px-5 py-3 font-semibold border-b"
                    style={{ borderColor: "var(--ck-border)", color: "var(--ck-heading)" }}
                  >
                    Support
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Keyboard: Space to toggle", "Space key checks or unchecks the focused checkbox"],
                  ["aria-checked", "Reflects checked, unchecked, or mixed (indeterminate) state"],
                  ["aria-disabled", "Communicated to assistive technologies when disabled"],
                  ["Label association", "htmlFor/id pair connects label text to the control"],
                  ["Focus visible ring", "Visible outline on keyboard navigation for all interactive states"],
                  ["role=\"checkbox\"", "Implicit on native input type=checkbox; use explicit role for custom implementations"],
                ].map(([feature, support], i, arr) => (
                  <tr
                    key={feature}
                    style={{ borderBottom: i < arr.length - 1 ? "1px solid var(--ck-border)" : "none" }}
                  >
                    <td className="px-5 py-3" style={{ color: "var(--ck-text)" }}>
                      {feature}
                    </td>
                    <td className="px-5 py-3" style={{ color: "var(--ck-text-muted)" }}>
                      {support}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
