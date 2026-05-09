"use client";

import { useState } from "react";
import { ScrollArea } from "@cookest/ui";
import { Playground, PropsTable, PageHeader } from "@/components/Playground";
import { Breadcrumb } from "@/components/Breadcrumb";

const recipes = [
  "Pasta Carbonara", "Risotto Milanese", "Chicken Tikka Masala", "Pad Thai",
  "Beef Tacos", "Spaghetti Bolognese", "Ramen Tonkotsu", "Moussaka",
  "Paella Valenciana", "Souvlaki", "Tom Yum Soup", "Bibimbap",
  "Beef Pho", "Shakshuka", "Falafel Wrap", "Miso Ramen",
  "Greek Salad", "Caprese Salad", "Ceasar Salad", "Nicoise Salad",
];

const steps = [
  "Bring a large pot of salted water to a boil.",
  "While water heats, dice the guanciale into small lardons.",
  "Render the guanciale in a cold pan over medium heat until crispy.",
  "In a bowl, whisk together egg yolks and grated Pecorino Romano.",
  "Season the egg mixture with black pepper — be generous.",
  "Cook the spaghetti until al dente — save 1 cup of pasta water.",
  "Remove guanciale from heat, let the pan cool slightly.",
  "Add pasta to the guanciale pan, toss to coat in the fat.",
  "Off the heat, pour in the egg mixture and toss rapidly.",
  "Add pasta water a splash at a time to loosen the sauce.",
  "The sauce should be creamy, glossy, and coat every strand.",
  "Serve immediately with extra Pecorino and cracked pepper.",
];

export default function ScrollAreaPage() {
  return (
    <div>
      <Breadcrumb />
      <PageHeader
        title="Scroll Area"
        description="A custom-styled scrollable container. Replaces native browser scrollbars with a styled, cross-platform alternative."
      />

      <div className="flex flex-col gap-8">
        <Playground
          title="Recipe List"
          description="Scroll through a long list of recipes in a constrained container."
          code={`<ScrollArea className="h-72 rounded-xl border">
  <div className="p-4">
    {recipes.map(r => (
      <div key={r} className="py-2 border-b">{r}</div>
    ))}
  </div>
</ScrollArea>`}
        >
          <div className="w-full max-w-sm">
            <ScrollArea className="h-64 rounded-xl border" style={{ borderColor: "var(--ck-border)" }}>
              <div className="p-4">
                <h4 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--ck-text-muted)" }}>
                  My Recipe Collection
                </h4>
                {recipes.map((recipe, i) => (
                  <div
                    key={recipe}
                    className="flex items-center justify-between py-2.5"
                    style={{ borderBottom: i < recipes.length - 1 ? "1px solid var(--ck-border)" : "none" }}
                  >
                    <span className="text-sm" style={{ color: "var(--ck-text)" }}>{recipe}</span>
                    <span className="text-xs" style={{ color: "var(--ck-text-muted)" }}>★ {(4.3 + Math.random() * 0.7).toFixed(1)}</span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </Playground>

        <Playground
          title="Recipe Instructions"
          description="Show step-by-step cooking instructions in a scrollable panel."
          code={`<ScrollArea className="h-48 w-full rounded-xl border p-4">
  {steps.map((step, i) => (
    <div key={i} className="flex gap-3 mb-3">
      <span className="step-number">{i + 1}</span>
      <p>{step}</p>
    </div>
  ))}
</ScrollArea>`}
        >
          <div className="w-full max-w-lg">
            <ScrollArea className="h-52 rounded-xl border" style={{ borderColor: "var(--ck-border)" }}>
              <div className="p-5 space-y-3">
                <h4 className="text-sm font-semibold mb-4" style={{ color: "var(--ck-heading)" }}>Pasta Carbonara — Method</h4>
                {steps.map((step, i) => (
                  <div key={i} className="flex gap-3">
                    <span
                      className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white mt-0.5"
                      style={{ background: "var(--ck-primary)" }}
                    >
                      {i + 1}
                    </span>
                    <p className="text-sm" style={{ color: "var(--ck-text)" }}>{step}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </Playground>

        <PropsTable
          props={[
            { name: "className", type: "string", description: "Pass height (h-*), width, border, and rounding classes." },
            { name: "type", type: '"auto" | "always" | "scroll" | "hover"', default: '"hover"', description: "When the scrollbar is visible." },
            { name: "scrollHideDelay", type: "number", default: "600", description: "Delay in ms before scrollbar hides after scrolling." },
          ]}
        />
      </div>
    </div>
  );
}
