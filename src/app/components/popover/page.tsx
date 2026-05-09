"use client";

import { useState } from "react";
import {
  Popover, PopoverContent, PopoverTrigger,
  Button, Input, Label,
} from "@cookest/ui";
import { Playground, PropsTable, PageHeader } from "@/components/Playground";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Info, CalendarDays, ChefHat } from "lucide-react";

export default function PopoverPage() {
  const [servings, setServings] = useState(4);

  return (
    <div>
      <Breadcrumb />
      <PageHeader
        title="Popover"
        description="Floating content anchored to a trigger element. Non-modal and keyboard accessible. Built on Radix UI."
      />

      <div className="flex flex-col gap-8">
        <Playground
          title="Nutrition Info"
          description="Display compact nutritional info in a popover on hover or click."
          code={`<Popover>
  <PopoverTrigger asChild>
    <Button variant="ghost" size="sm">
      <Info size={14} /> Nutrition
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-64">
    <h4 className="font-semibold mb-2">Per Serving</h4>
    <div>Calories: 640 kcal</div>
    <div>Protein: 28g</div>
    <div>Carbs: 72g</div>
  </PopoverContent>
</Popover>`}
        >
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm">
                <Info size={14} className="mr-1.5" /> Nutrition Facts
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64">
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-semibold" style={{ color: "var(--ck-heading)" }}>Per Serving</h4>
                  <p className="text-xs" style={{ color: "var(--ck-text-muted)" }}>Pasta Carbonara (1 of 4 servings)</p>
                </div>
                <div className="border-t pt-3 space-y-1.5" style={{ borderColor: "var(--ck-border)" }}>
                  {[
                    { label: "Calories", val: "640 kcal" },
                    { label: "Protein", val: "28g" },
                    { label: "Carbohydrates", val: "72g" },
                    { label: "Fat", val: "24g" },
                    { label: "Fibre", val: "3g" },
                  ].map(n => (
                    <div key={n.label} className="flex justify-between text-xs">
                      <span style={{ color: "var(--ck-text-muted)" }}>{n.label}</span>
                      <span className="font-medium" style={{ color: "var(--ck-heading)" }}>{n.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </Playground>

        <Playground
          title="Serving Size Adjuster"
          description="Use a popover to adjust settings inline without a full modal."
          code={`<Popover>
  <PopoverTrigger asChild>
    <Button variant="secondary">Serves: 4</Button>
  </PopoverTrigger>
  <PopoverContent>
    <Label>Servings</Label>
    <Input type="number" value={4} min={1} max={20} />
  </PopoverContent>
</Popover>`}
        >
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="secondary">
                <ChefHat size={14} className="mr-1.5" /> Serves: {servings}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-60">
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-semibold" style={{ color: "var(--ck-heading)" }}>Adjust Servings</h4>
                  <p className="text-xs" style={{ color: "var(--ck-text-muted)" }}>Ingredients will scale automatically.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setServings(s => Math.max(1, s - 1))}
                    className="w-8 h-8 rounded-lg border flex items-center justify-center text-lg font-bold"
                    style={{ borderColor: "var(--ck-border)", color: "var(--ck-heading)", background: "var(--ck-bg-card)" }}>−</button>
                  <span className="flex-1 text-center text-lg font-bold" style={{ color: "var(--ck-heading)" }}>{servings}</span>
                  <button onClick={() => setServings(s => Math.min(20, s + 1))}
                    className="w-8 h-8 rounded-lg border flex items-center justify-center text-lg font-bold"
                    style={{ borderColor: "var(--ck-border)", color: "var(--ck-heading)", background: "var(--ck-bg-card)" }}>+</button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </Playground>

        <PropsTable
          props={[
            { name: "PopoverTrigger", type: "ReactNode", description: "The element that opens the popover." },
            { name: "PopoverContent", type: "ReactNode", description: "The floating panel content." },
            { name: "side", type: '"top" | "right" | "bottom" | "left"', default: '"bottom"', description: "Which side of the trigger the popover appears on." },
            { name: "align", type: '"start" | "center" | "end"', default: '"center"', description: "Alignment of the popover relative to the trigger." },
          ]}
        />
      </div>
    </div>
  );
}
