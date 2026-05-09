"use client";

import { useState } from "react";
import {
  RadioGroup, RadioGroupItem, Label, Button,
} from "@cookest/ui";
import { Playground, PropsTable, PageHeader } from "@/components/Playground";
import { Breadcrumb } from "@/components/Breadcrumb";

export default function RadioGroupPage() {
  const [diet, setDiet] = useState("omnivore");
  const [plan, setPlan] = useState("pro");

  return (
    <div>
      <Breadcrumb />
      <PageHeader
        title="Radio Group"
        description="A set of interactive radio buttons where only one option can be selected at a time. Fully accessible and keyboard navigable."
      />

      <div className="flex flex-col gap-8">
        <Playground
          title="Dietary Preference"
          description="Use Radio Group when the user must choose exactly one from a list."
          code={`const [diet, setDiet] = useState("omnivore");

<RadioGroup value={diet} onValueChange={setDiet}>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="omnivore" id="omnivore" />
    <Label htmlFor="omnivore">Omnivore</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="vegetarian" id="vegetarian" />
    <Label htmlFor="vegetarian">Vegetarian</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="vegan" id="vegan" />
    <Label htmlFor="vegan">Vegan</Label>
  </div>
</RadioGroup>`}
        >
          <div className="flex flex-col gap-4">
            <RadioGroup value={diet} onValueChange={setDiet} className="gap-3">
              {[
                { value: "omnivore", label: "🥩 Omnivore", desc: "All foods" },
                { value: "vegetarian", label: "🥦 Vegetarian", desc: "No meat or fish" },
                { value: "vegan", label: "🌱 Vegan", desc: "No animal products" },
                { value: "pescatarian", label: "🐟 Pescatarian", desc: "Fish, no meat" },
                { value: "keto", label: "🥑 Keto", desc: "Low-carb, high-fat" },
              ].map(opt => (
                <div key={opt.value} className="flex items-center gap-3">
                  <RadioGroupItem value={opt.value} id={`diet-${opt.value}`} />
                  <Label htmlFor={`diet-${opt.value}`} className="cursor-pointer flex flex-col">
                    <span className="text-sm font-medium" style={{ color: "var(--ck-heading)" }}>{opt.label}</span>
                    <span className="text-xs" style={{ color: "var(--ck-text-muted)" }}>{opt.desc}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
            <p className="text-xs" style={{ color: "var(--ck-text-muted)" }}>Selected: <strong style={{ color: "var(--ck-primary)" }}>{diet}</strong></p>
          </div>
        </Playground>

        <Playground
          title="Pricing Plans"
          description="Use card-style radio groups for feature-rich plan selection."
          code={`<RadioGroup value={plan} onValueChange={setPlan}>
  {plans.map(p => (
    <label key={p.id} className="plan-card">
      <RadioGroupItem value={p.id} />
      <span>{p.name}</span>
      <span>{p.price}</span>
    </label>
  ))}
</RadioGroup>`}
        >
          <div className="w-full max-w-sm">
            <RadioGroup value={plan} onValueChange={setPlan} className="gap-3">
              {[
                { id: "free", name: "Free", price: "£0/mo", features: "50 recipes · Basic planner" },
                { id: "pro", name: "Pro", price: "£7/mo", features: "Unlimited recipes · AI suggestions" },
                { id: "chef", name: "Chef", price: "£19/mo", features: "Team access · Custom branding" },
              ].map(p => (
                <label
                  key={p.id}
                  className="flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all"
                  style={{
                    borderColor: plan === p.id ? "var(--ck-primary)" : "var(--ck-border)",
                    background: plan === p.id ? "rgba(122,154,101,0.06)" : "var(--ck-surface)",
                  }}
                >
                  <RadioGroupItem value={p.id} id={`plan-${p.id}`} className="mt-0.5" />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold" style={{ color: "var(--ck-heading)" }}>{p.name}</span>
                      <span className="text-sm font-bold" style={{ color: "var(--ck-primary)" }}>{p.price}</span>
                    </div>
                    <p className="text-xs mt-0.5" style={{ color: "var(--ck-text-muted)" }}>{p.features}</p>
                  </div>
                </label>
              ))}
            </RadioGroup>
          </div>
        </Playground>

        <PropsTable
          props={[
            { name: "value", type: "string", description: "The controlled selected value." },
            { name: "onValueChange", type: "(value: string) => void", description: "Callback when selection changes." },
            { name: "defaultValue", type: "string", description: "Default selected value (uncontrolled)." },
            { name: "disabled", type: "boolean", default: "false", description: "Disables the entire radio group." },
            { name: "orientation", type: '"horizontal" | "vertical"', default: '"vertical"', description: "Layout direction of the items." },
          ]}
        />
      </div>
    </div>
  );
}
