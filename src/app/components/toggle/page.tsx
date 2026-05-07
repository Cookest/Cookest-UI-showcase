"use client";

import { useState } from "react";
import { Toggle } from "@cookest/ui";
import { Playground, PropsTable, PageHeader } from "@/components/Playground";
import { RelatedComponents } from "@/components/RelatedComponents";
import { Breadcrumb } from "@/components/Breadcrumb";

const toggleSizes = ["sm", "md", "lg"] as const;

export default function TogglePage() {
  const [basicChecked, setBasicChecked] = useState(false);
  const [activeSize, setActiveSize] =
    useState<(typeof toggleSizes)[number]>("md");
  const [sizeChecked, setSizeChecked] = useState<Record<string, boolean>>({
    sm: false,
    md: true,
    lg: false,
  });
  const [labelChecked, setLabelChecked] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [analytics, setAnalytics] = useState(false);

  return (
    <div>
      <Breadcrumb />
      <PageHeader
        title="Toggle"
        description="Toggles allow users to switch between two states, typically on and off."
      />

      <div className="flex flex-col gap-8">
        {/* Basic */}
        <Playground
          title="Basic"
          description="A simple toggle controlled with React state."
          code={`const [checked, setChecked] = useState(${basicChecked});

<Toggle
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
/>`}
        >
          <div className="flex items-center gap-4">
            <Toggle
              checked={basicChecked}
              onChange={(e) => setBasicChecked(e.target.checked)}
            />
            <span className="text-sm" style={{ color: "var(--ck-text-muted)" }}>
              {basicChecked ? "On" : "Off"}
            </span>
          </div>
        </Playground>

        {/* Sizes */}
        <Playground
          title="Sizes"
          description="Toggles come in sm, md, and lg sizes."
          code={`<Toggle toggleSize="sm" checked={checked} onChange={handleChange} />
<Toggle toggleSize="md" checked={checked} onChange={handleChange} />
<Toggle toggleSize="lg" checked={checked} onChange={handleChange} />`}
        >
          <div className="flex flex-col items-center gap-6">
            <div className="flex gap-2">
              {toggleSizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setActiveSize(s)}
                  className="px-3 py-1 text-xs rounded-lg cursor-pointer border"
                  style={{
                    borderColor: "var(--ck-border)",
                    background:
                      activeSize === s ? "var(--ck-primary)" : "var(--ck-surface)",
                    color: activeSize === s ? "#fff" : "var(--ck-text)",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-6">
              {toggleSizes.map((s) => (
                <div key={s} className="flex flex-col items-center gap-2">
                  <Toggle
                    toggleSize={s}
                    checked={sizeChecked[s]}
                    onChange={(e) =>
                      setSizeChecked((prev) => ({
                        ...prev,
                        [s]: e.target.checked,
                      }))
                    }
                  />
                  <span
                    className="text-xs"
                    style={{ color: "var(--ck-text-muted)" }}
                  >
                    {s}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Playground>

        {/* With Label */}
        <Playground
          title="With Label"
          description="Toggles can display a label and description."
          code={`<Toggle
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
  label="Enable notifications"
  description="Receive email alerts when important events happen."
/>`}
        >
          <Toggle
            checked={labelChecked}
            onChange={(e) => setLabelChecked(e.target.checked)}
            label="Enable notifications"
            description="Receive email alerts when important events happen."
          />
        </Playground>

        {/* Settings Example */}
        <Playground
          title="Settings Example"
          description="Multiple toggles styled as a realistic settings panel."
          code={`<Toggle label="Notifications" description="Push and email alerts" checked={notifications} onChange={...} />
<Toggle label="Dark Mode" description="Use dark color theme" checked={darkMode} onChange={...} />
<Toggle label="Auto-Save" description="Save changes automatically" checked={autoSave} onChange={...} />
<Toggle label="Analytics" description="Share anonymous usage data" checked={analytics} onChange={...} />`}
        >
          <div
            className="w-full max-w-md rounded-xl border overflow-hidden"
            style={{
              borderColor: "var(--ck-border)",
              background: "var(--ck-surface)",
            }}
          >
            {[
              {
                label: "Notifications",
                description: "Push and email alerts",
                checked: notifications,
                onChange: setNotifications,
              },
              {
                label: "Dark Mode",
                description: "Use dark color theme",
                checked: darkMode,
                onChange: setDarkMode,
              },
              {
                label: "Auto-Save",
                description: "Save changes automatically",
                checked: autoSave,
                onChange: setAutoSave,
              },
              {
                label: "Analytics",
                description: "Share anonymous usage data",
                checked: analytics,
                onChange: setAnalytics,
              },
            ].map((item, i, arr) => (
              <div
                key={item.label}
                className="px-5 py-4"
                style={{
                  borderBottom:
                    i < arr.length - 1
                      ? "1px solid var(--ck-border)"
                      : "none",
                }}
              >
                <Toggle
                  label={item.label}
                  description={item.description}
                  checked={item.checked}
                  onChange={(e) => item.onChange(e.target.checked)}
                />
              </div>
            ))}
          </div>
        </Playground>

        {/* Props Table */}
        <PropsTable
          props={[
            {
              name: "checked",
              type: "boolean",
              description: "Whether the toggle is on.",
            },
            {
              name: "onChange",
              type: "(e: ChangeEvent) => void",
              description: "Callback fired when the toggle state changes.",
            },
            {
              name: "label",
              type: "string",
              description: "Primary label text displayed next to the toggle.",
            },
            {
              name: "description",
              type: "string",
              description: "Secondary helper text below the label.",
            },
            {
              name: "toggleSize",
              type: '"sm" | "md" | "lg"',
              default: '"md"',
              description: "Size of the toggle switch.",
            },
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description: "Whether the toggle is disabled.",
            },
          ]}
        />
        <RelatedComponents component="toggle" />

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
                  Use for binary on/off settings
                </li>
                <li className="text-sm flex items-start gap-2" style={{ color: "var(--ck-text)" }}>
                  <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--ck-primary)" }} />
                  Show the current state clearly
                </li>
                <li className="text-sm flex items-start gap-2" style={{ color: "var(--ck-text)" }}>
                  <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--ck-primary)" }} />
                  Provide a label describing the setting
                </li>
                <li className="text-sm flex items-start gap-2" style={{ color: "var(--ck-text)" }}>
                  <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--ck-primary)" }} />
                  Use for instant-apply preferences
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
                  Use toggles for form submissions (use checkboxes)
                </li>
                <li className="text-sm flex items-start gap-2" style={{ color: "var(--ck-text)" }}>
                  <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--ck-primary)" }} />
                  Group more than 10 toggles without sections
                </li>
                <li className="text-sm flex items-start gap-2" style={{ color: "var(--ck-text)" }}>
                  <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--ck-primary)" }} />
                  Use ambiguous labels
                </li>
                <li className="text-sm flex items-start gap-2" style={{ color: "var(--ck-text)" }}>
                  <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--ck-primary)" }} />
                  Change unrelated settings when toggled
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
                  <td className="px-5 py-3" style={{ color: "var(--ck-text)" }}>role=&quot;switch&quot;</td>
                  <td className="px-5 py-3" style={{ color: "var(--ck-text-muted)" }}>Identifies the element as a toggle switch</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--ck-border)" }}>
                  <td className="px-5 py-3" style={{ color: "var(--ck-text)" }}>aria-checked</td>
                  <td className="px-5 py-3" style={{ color: "var(--ck-text-muted)" }}>Reflects the current on/off state</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--ck-border)" }}>
                  <td className="px-5 py-3" style={{ color: "var(--ck-text)" }}>Keyboard toggle via Space</td>
                  <td className="px-5 py-3" style={{ color: "var(--ck-text-muted)" }}>Space key toggles the switch state</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--ck-border)" }}>
                  <td className="px-5 py-3" style={{ color: "var(--ck-text)" }}>Label association</td>
                  <td className="px-5 py-3" style={{ color: "var(--ck-text-muted)" }}>Connected to label for screen reader context</td>
                </tr>
                <tr>
                  <td className="px-5 py-3" style={{ color: "var(--ck-text)" }}>Focus visible ring</td>
                  <td className="px-5 py-3" style={{ color: "var(--ck-text-muted)" }}>Visible focus indicator on keyboard navigation</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
