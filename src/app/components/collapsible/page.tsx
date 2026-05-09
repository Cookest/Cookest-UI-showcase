"use client";

import { useState } from "react";
import {
  Collapsible, CollapsibleContent, CollapsibleTrigger,
  Button,
} from "@cookest/ui";
import { Playground, PropsTable, PageHeader } from "@/components/Playground";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ChevronDown, ChevronRight } from "lucide-react";

export default function CollapsiblePage() {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(true);

  return (
    <div>
      <Breadcrumb />
      <PageHeader
        title="Collapsible"
        description="An interactive component that can be expanded or collapsed to show or hide content. Lighter than Accordion — best for single items."
      />

      <div className="flex flex-col gap-8">
        <Playground
          title="Basic"
          description="A simple collapsible section for recipe tips."
          code={`const [open, setOpen] = useState(false);

<Collapsible open={open} onOpenChange={setOpen}>
  <CollapsibleTrigger asChild>
    <Button variant="ghost">
      Chef's Tips {open ? <ChevronDown /> : <ChevronRight />}
    </Button>
  </CollapsibleTrigger>
  <CollapsibleContent>
    <p>Rest your pasta for 2 minutes before serving...</p>
  </CollapsibleContent>
</Collapsible>`}
        >
          <div className="w-full max-w-sm">
            <Collapsible open={open1} onOpenChange={setOpen1}>
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold" style={{ color: "var(--ck-heading)" }}>Chef&apos;s Tips</h4>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm">
                    {open1 ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </Button>
                </CollapsibleTrigger>
              </div>
              <div className="py-2 px-3 rounded-lg text-sm" style={{ background: "var(--ck-bg-card)", color: "var(--ck-text)", border: "1px solid var(--ck-border)" }}>
                Always use guanciale, not bacon.
              </div>
              <CollapsibleContent className="space-y-2 mt-2">
                <div className="py-2 px-3 rounded-lg text-sm" style={{ background: "var(--ck-bg-card)", color: "var(--ck-text)", border: "1px solid var(--ck-border)" }}>
                  Remove from heat before adding the egg mixture.
                </div>
                <div className="py-2 px-3 rounded-lg text-sm" style={{ background: "var(--ck-bg-card)", color: "var(--ck-text)", border: "1px solid var(--ck-border)" }}>
                  Use pasta water to adjust consistency.
                </div>
                <div className="py-2 px-3 rounded-lg text-sm" style={{ background: "var(--ck-bg-card)", color: "var(--ck-text)", border: "1px solid var(--ck-border)" }}>
                  Freshly cracked black pepper is essential.
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </Playground>

        <Playground
          title="Ingredient Notes"
          description="Use Collapsible to progressively reveal substitution information."
          code={`<Collapsible defaultOpen>
  <CollapsibleTrigger>Show substitutions</CollapsibleTrigger>
  <CollapsibleContent>
    <p>If you can't find guanciale, use pancetta.</p>
  </CollapsibleContent>
</Collapsible>`}
        >
          <div className="w-full max-w-sm space-y-4">
            <Collapsible open={open2} onOpenChange={setOpen2}>
              <div className="rounded-xl border p-4" style={{ borderColor: "var(--ck-border)", background: "var(--ck-surface)" }}>
                <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
                  <span className="text-sm font-medium" style={{ color: "var(--ck-heading)" }}>Ingredient Substitutions</span>
                  <ChevronDown size={16} className="transition-transform" style={{ transform: open2 ? "rotate(0)" : "rotate(-90deg)", color: "var(--ck-text-muted)" }} />
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-3 space-y-2">
                  {[
                    { ing: "Guanciale", sub: "Pancetta or thick-cut bacon" },
                    { ing: "Pecorino Romano", sub: "Parmigiano Reggiano" },
                    { ing: "Egg yolks only", sub: "Whole eggs (lighter result)" },
                  ].map(row => (
                    <div key={row.ing} className="flex justify-between text-xs">
                      <span className="font-medium" style={{ color: "var(--ck-text)" }}>{row.ing}</span>
                      <span style={{ color: "var(--ck-text-muted)" }}>{row.sub}</span>
                    </div>
                  ))}
                </CollapsibleContent>
              </div>
            </Collapsible>
          </div>
        </Playground>

        <PropsTable
          props={[
            { name: "open", type: "boolean", description: "Controlled open state." },
            { name: "onOpenChange", type: "(open: boolean) => void", description: "Callback when open state changes." },
            { name: "defaultOpen", type: "boolean", default: "false", description: "Uncontrolled default open state." },
            { name: "CollapsibleTrigger", type: "ReactNode", description: "Element that toggles the collapsible. Supports asChild." },
            { name: "CollapsibleContent", type: "ReactNode", description: "The content shown/hidden based on open state." },
          ]}
        />
      </div>
    </div>
  );
}
