"use client";

import { Separator } from "@cookest/ui";
import { Playground, PropsTable, PageHeader } from "@/components/Playground";
import { Breadcrumb } from "@/components/Breadcrumb";

export default function SeparatorPage() {
  return (
    <div>
      <Breadcrumb />
      <PageHeader
        title="Separator"
        description="Visually or semantically separates content. A thin, accessible divider built on Radix UI."
      />

      <div className="flex flex-col gap-8">
        <Playground
          title="Horizontal"
          description="Default orientation — separates content above and below."
          code={`<div>
  <p>Pasta Carbonara</p>
  <Separator className="my-4" />
  <p>Risotto Milanese</p>
</div>`}
        >
          <div className="w-full max-w-sm">
            <div className="space-y-1">
              <h4 className="text-sm font-semibold" style={{ color: "var(--ck-heading)" }}>Cookest UI</h4>
              <p className="text-sm" style={{ color: "var(--ck-text-muted)" }}>A food-grade design system.</p>
            </div>
            <Separator className="my-4" />
            <div className="flex h-5 items-center gap-4 text-sm" style={{ color: "var(--ck-text-muted)" }}>
              <span>Components</span>
              <Separator orientation="vertical" />
              <span>Tokens</span>
              <Separator orientation="vertical" />
              <span>Examples</span>
            </div>
          </div>
        </Playground>

        <Playground
          title="Vertical"
          description="Use orientation='vertical' to separate inline content side by side."
          code={`<div className="flex h-5 items-center gap-4">
  <span>Breakfast</span>
  <Separator orientation="vertical" />
  <span>Lunch</span>
  <Separator orientation="vertical" />
  <span>Dinner</span>
</div>`}
        >
          <div className="flex h-6 items-center gap-5 text-sm" style={{ color: "var(--ck-text)" }}>
            <span>Breakfast</span>
            <Separator orientation="vertical" />
            <span>Lunch</span>
            <Separator orientation="vertical" />
            <span>Dinner</span>
            <Separator orientation="vertical" />
            <span>Snacks</span>
          </div>
        </Playground>

        <Playground
          title="In Recipe Card"
          description="Use Separator to structure recipe metadata cleanly."
          code={`<div className="p-4 rounded-xl border">
  <h3>Pasta Carbonara</h3>
  <Separator className="my-3" />
  <div className="flex gap-4 text-sm text-muted">
    <span>🕐 25 min</span>
    <Separator orientation="vertical" />
    <span>🍽 4 servings</span>
    <Separator orientation="vertical" />
    <span>⚡ 640 kcal</span>
  </div>
</div>`}
        >
          <div className="w-full max-w-sm p-5 rounded-xl border" style={{ borderColor: "var(--ck-border)", background: "var(--ck-surface)" }}>
            <h3 className="text-base font-semibold" style={{ color: "var(--ck-heading)" }}>Pasta Carbonara</h3>
            <p className="text-xs mt-0.5" style={{ color: "var(--ck-text-muted)" }}>Classic Roman pasta with eggs and guanciale</p>
            <Separator className="my-3" />
            <div className="flex h-5 items-center gap-4 text-xs" style={{ color: "var(--ck-text-muted)" }}>
              <span>🕐 25 min</span>
              <Separator orientation="vertical" />
              <span>🍽 4 servings</span>
              <Separator orientation="vertical" />
              <span>⚡ 640 kcal</span>
            </div>
          </div>
        </Playground>

        <PropsTable
          props={[
            { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Direction of the separator line." },
            { name: "decorative", type: "boolean", default: "true", description: "When true, the separator is hidden from screen readers (purely visual)." },
            { name: "className", type: "string", description: "Custom CSS classes to override spacing, colour, or size." },
          ]}
        />
      </div>
    </div>
  );
}
