"use client";

import { useState } from "react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@cookest/ui";
import { Playground, PropsTable, PageHeader } from "@/components/Playground";
import { Breadcrumb } from "@/components/Breadcrumb";

export default function ResizablePage() {
  return (
    <div>
      <Breadcrumb />
      <PageHeader
        title="Resizable"
        description="Resizable panel groups that allow users to drag handles to resize adjacent panels. Ideal for split-view editor layouts."
      />

      <div className="flex flex-col gap-8">
        <Playground
          title="Horizontal Split"
          description="Drag the handle to resize the recipe list and detail panes."
          code={`<ResizablePanelGroup orientation="horizontal" className="h-64 rounded-xl border">
  <ResizablePanel defaultSize={40}>
    <div className="p-4">Recipe List</div>
  </ResizablePanel>
  <ResizableHandle />
  <ResizablePanel defaultSize={60}>
    <div className="p-4">Recipe Detail</div>
  </ResizablePanel>
</ResizablePanelGroup>`}
        >
          <div className="w-full h-64">
            <ResizablePanelGroup orientation="horizontal" className="rounded-xl border" style={{ border: "1px solid var(--ck-border)" }}>
              <ResizablePanel defaultSize={35} minSize={20}>
                <div className="flex flex-col h-full p-4" style={{ background: "var(--ck-surface)" }}>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--ck-text-muted)" }}>My Recipes</p>
                  {["Pasta Carbonara", "Risotto Milanese", "Pad Thai", "Beef Tacos", "Miso Ramen"].map(r => (
                    <div key={r} className="py-2 text-sm cursor-pointer rounded px-2 hover:bg-[var(--ck-bg-card)] transition-colors" style={{ color: "var(--ck-text)" }}>{r}</div>
                  ))}
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={65}>
                <div className="h-full p-5 flex flex-col gap-3" style={{ background: "var(--ck-bg-card)" }}>
                  <h3 className="text-base font-semibold" style={{ color: "var(--ck-heading)" }}>Pasta Carbonara</h3>
                  <p className="text-xs" style={{ color: "var(--ck-text-muted)" }}>Classic Roman pasta · 25 min · 4 servings</p>
                  <p className="text-sm" style={{ color: "var(--ck-text)" }}>
                    A rich, creamy Roman pasta made with guanciale, Pecorino Romano, eggs, and black pepper. No cream — the magic is all in the technique.
                  </p>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </Playground>

        <Playground
          title="Vertical Split"
          description="Use direction='vertical' for top/bottom splits."
          code={`<ResizablePanelGroup orientation="vertical" className="h-64 rounded-xl border">
  <ResizablePanel defaultSize={40}>
    <div className="p-4">Recipe Header</div>
  </ResizablePanel>
  <ResizableHandle />
  <ResizablePanel defaultSize={60}>
    <div className="p-4">Ingredients Panel</div>
  </ResizablePanel>
</ResizablePanelGroup>`}
        >
          <div className="w-full h-64">
            <ResizablePanelGroup orientation="vertical" className="rounded-xl border" style={{ border: "1px solid var(--ck-border)" }}>
              <ResizablePanel defaultSize={40} minSize={20}>
                <div className="p-4 h-full" style={{ background: "var(--ck-surface)" }}>
                  <h3 className="text-sm font-semibold" style={{ color: "var(--ck-heading)" }}>🍝 Pasta Carbonara</h3>
                  <p className="text-xs mt-1" style={{ color: "var(--ck-text-muted)" }}>Classic Roman · Italian · 25 min</p>
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={60}>
                <div className="p-4 h-full overflow-auto" style={{ background: "var(--ck-bg-card)" }}>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--ck-text-muted)" }}>Ingredients</p>
                  {["200g Guanciale", "400g Spaghetti", "4 Egg Yolks", "80g Pecorino Romano", "Black Pepper", "Salt"].map(i => (
                    <div key={i} className="text-sm py-1" style={{ color: "var(--ck-text)" }}>• {i}</div>
                  ))}
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </Playground>

        <PropsTable
          props={[
            { name: "direction", type: '"horizontal" | "vertical"', description: "Layout direction for the panel group." },
            { name: "defaultSize", type: "number", description: "Default size percentage of a panel (0–100)." },
            { name: "minSize", type: "number", description: "Minimum size percentage a panel can be resized to." },
            { name: "maxSize", type: "number", description: "Maximum size percentage a panel can be resized to." },
            { name: "withHandle", type: "boolean", default: "false", description: "Show a visible grip handle on ResizableHandle.", },
          ]}
        />
      </div>
    </div>
  );
}
