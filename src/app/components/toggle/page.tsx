"use client";

import { useState } from "react";
import { Toggle } from "@cookest/ui";
import { Playground, PropsTable, PageHeader } from "@/components/Playground";

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
      </div>
    </div>
  );
}
