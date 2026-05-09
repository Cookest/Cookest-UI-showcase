"use client";

import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@cookest/ui";
import { Playground, PropsTable, PageHeader } from "@/components/Playground";
import { Breadcrumb } from "@/components/Breadcrumb";
import { AlignLeft, AlignCenter, AlignRight, Bold, Italic, Underline, Grid2X2, LayoutList, Columns2 } from "lucide-react";

export default function ToggleGroupPage() {
  const [diet, setDiet] = useState("all");
  const [layout, setLayout] = useState("grid");
  const [alignment, setAlignment] = useState("left");
  const [formatting, setFormatting] = useState<string[]>([]);

  return (
    <div>
      <Breadcrumb />
      <PageHeader
        title="Toggle Group"
        description="A set of two-state buttons where exactly one (single) or multiple options can be active at a time."
      />

      <div className="flex flex-col gap-8">
        <Playground
          title="Single Select — Diet Filter"
          description="Only one diet filter can be active at a time (type='single')."
          code={`<ToggleGroup type="single" value={diet} onValueChange={setDiet}>
  <ToggleGroupItem value="all">All</ToggleGroupItem>
  <ToggleGroupItem value="vegan">Vegan</ToggleGroupItem>
  <ToggleGroupItem value="gluten-free">Gluten-Free</ToggleGroupItem>
  <ToggleGroupItem value="keto">Keto</ToggleGroupItem>
</ToggleGroup>`}
        >
          <div className="flex flex-col gap-3">
            <ToggleGroup type="single" value={diet} onValueChange={(v) => v && setDiet(v)}>
              <ToggleGroupItem value="all">All</ToggleGroupItem>
              <ToggleGroupItem value="vegan">🌱 Vegan</ToggleGroupItem>
              <ToggleGroupItem value="vegetarian">🥦 Vegetarian</ToggleGroupItem>
              <ToggleGroupItem value="gluten-free">🌾 Gluten-Free</ToggleGroupItem>
              <ToggleGroupItem value="keto">🥑 Keto</ToggleGroupItem>
            </ToggleGroup>
            <p className="text-xs" style={{ color: "var(--ck-text-muted)" }}>
              Filter: <strong style={{ color: "var(--ck-primary)" }}>{diet}</strong>
            </p>
          </div>
        </Playground>

        <Playground
          title="Layout View Toggle"
          description="Switch between Grid, List, and Columns view for recipe display."
          code={`<ToggleGroup type="single" value={layout} onValueChange={setLayout}>
  <ToggleGroupItem value="grid"><Grid2X2 size={16} /></ToggleGroupItem>
  <ToggleGroupItem value="list"><LayoutList size={16} /></ToggleGroupItem>
  <ToggleGroupItem value="columns"><Columns2 size={16} /></ToggleGroupItem>
</ToggleGroup>`}
        >
          <div className="flex items-center gap-4">
            <ToggleGroup type="single" value={layout} onValueChange={(v) => v && setLayout(v)}>
              <ToggleGroupItem value="grid" aria-label="Grid view">
                <Grid2X2 size={16} />
              </ToggleGroupItem>
              <ToggleGroupItem value="list" aria-label="List view">
                <LayoutList size={16} />
              </ToggleGroupItem>
              <ToggleGroupItem value="columns" aria-label="Columns view">
                <Columns2 size={16} />
              </ToggleGroupItem>
            </ToggleGroup>
            <span className="text-sm" style={{ color: "var(--ck-text-muted)" }}>
              Current: <strong style={{ color: "var(--ck-heading)" }}>{layout}</strong>
            </span>
          </div>
        </Playground>

        <Playground
          title="Multiple Select — Text Formatting"
          description="Multiple formatting options can be active simultaneously (type='multiple')."
          code={`<ToggleGroup type="multiple" value={formatting} onValueChange={setFormatting}>
  <ToggleGroupItem value="bold"><Bold size={16} /></ToggleGroupItem>
  <ToggleGroupItem value="italic"><Italic size={16} /></ToggleGroupItem>
  <ToggleGroupItem value="underline"><Underline size={16} /></ToggleGroupItem>
</ToggleGroup>`}
        >
          <div className="flex flex-col gap-3">
            <ToggleGroup type="multiple" value={formatting} onValueChange={setFormatting}>
              <ToggleGroupItem value="bold" aria-label="Bold">
                <Bold size={16} />
              </ToggleGroupItem>
              <ToggleGroupItem value="italic" aria-label="Italic">
                <Italic size={16} />
              </ToggleGroupItem>
              <ToggleGroupItem value="underline" aria-label="Underline">
                <Underline size={16} />
              </ToggleGroupItem>
            </ToggleGroup>
            <p
              className="text-base px-1"
              style={{
                color: "var(--ck-text)",
                fontWeight: formatting.includes("bold") ? 700 : 400,
                fontStyle: formatting.includes("italic") ? "italic" : "normal",
                textDecoration: formatting.includes("underline") ? "underline" : "none",
              }}
            >
              Pasta Carbonara recipe text preview
            </p>
          </div>
        </Playground>

        <PropsTable
          props={[
            { name: "type", type: '"single" | "multiple"', description: "Whether one or multiple items can be selected." },
            { name: "value", type: "string | string[]", description: "Controlled selected value(s)." },
            { name: "onValueChange", type: "(value) => void", description: "Callback when selection changes." },
            { name: "disabled", type: "boolean", default: "false", description: "Disables all items in the group." },
            { name: "variant", type: '"default" | "outline"', default: '"default"', description: "Visual style of the toggle items." },
          ]}
        />
      </div>
    </div>
  );
}
