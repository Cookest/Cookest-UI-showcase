"use client";

import { useState } from "react";
import { Switch, Label } from "@cookest/ui";
import { Playground, PropsTable, PageHeader } from "@/components/Playground";
import { Breadcrumb } from "@/components/Breadcrumb";

export default function SwitchPage() {
  const [notifications, setNotifications] = useState(true);
  const [newsletter, setNewsletter] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState(true);

  const settings = [
    { id: "sw-notifications", label: "Push Notifications", desc: "Get notified when your meal plan is ready", state: notifications, set: setNotifications },
    { id: "sw-newsletter", label: "Weekly Newsletter", desc: "Receive seasonal recipes every Monday", state: newsletter, set: setNewsletter },
    { id: "sw-dark", label: "Dark Mode", desc: "Use the dark theme across the app", state: darkMode, set: setDarkMode },
    { id: "sw-ai", label: "AI Recipe Suggestions", desc: "Let Cookest suggest meals based on your history", state: aiSuggestions, set: setAiSuggestions },
  ];

  return (
    <div>
      <Breadcrumb />
      <PageHeader
        title="Switch"
        description="A toggle switch for binary settings. Accessible and keyboard-operable. Built on Radix UI Switch."
      />

      <div className="flex flex-col gap-8">
        <Playground
          title="Basic"
          description="A simple switch with a label."
          code={`const [enabled, setEnabled] = useState(false);

<div className="flex items-center gap-2">
  <Switch id="airplane" checked={enabled} onCheckedChange={setEnabled} />
  <Label htmlFor="airplane">Airplane Mode</Label>
</div>`}
        >
          <div className="flex items-center gap-3">
            <Switch id="basic-switch" checked={notifications} onCheckedChange={setNotifications} />
            <Label htmlFor="basic-switch" className="cursor-pointer text-sm" style={{ color: "var(--ck-heading)" }}>
              Enable Notifications
            </Label>
          </div>
        </Playground>

        <Playground
          title="Settings Panel"
          description="Use switches in a settings list for multiple boolean toggles."
          code={`{settings.map(s => (
  <div key={s.id} className="flex items-center justify-between">
    <div>
      <Label htmlFor={s.id}>{s.label}</Label>
      <p>{s.desc}</p>
    </div>
    <Switch id={s.id} checked={s.state} onCheckedChange={s.set} />
  </div>
))}`}
        >
          <div className="w-full max-w-md space-y-0">
            {settings.map((s, i) => (
              <div
                key={s.id}
                className="flex items-center justify-between py-4"
                style={{ borderBottom: i < settings.length - 1 ? "1px solid var(--ck-border)" : "none" }}
              >
                <div className="flex-1 pr-4">
                  <Label htmlFor={s.id} className="text-sm font-medium cursor-pointer" style={{ color: "var(--ck-heading)" }}>
                    {s.label}
                  </Label>
                  <p className="text-xs mt-0.5" style={{ color: "var(--ck-text-muted)" }}>{s.desc}</p>
                </div>
                <Switch id={s.id} checked={s.state} onCheckedChange={s.set} />
              </div>
            ))}
          </div>
        </Playground>

        <PropsTable
          props={[
            { name: "checked", type: "boolean", description: "Controlled checked state of the switch." },
            { name: "onCheckedChange", type: "(checked: boolean) => void", description: "Callback when the switch is toggled." },
            { name: "defaultChecked", type: "boolean", default: "false", description: "Default state for uncontrolled usage." },
            { name: "disabled", type: "boolean", default: "false", description: "Prevents interaction when true." },
            { name: "id", type: "string", description: "ID for pairing with a Label element." },
          ]}
        />
      </div>
    </div>
  );
}
