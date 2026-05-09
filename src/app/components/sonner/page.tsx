"use client";

import { useEffect, useState } from "react";
import { SonnerToaster, Button } from "@cookest/ui";
import { toast } from "sonner";
import { Playground, PropsTable, PageHeader } from "@/components/Playground";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CheckCircle2, AlertTriangle, Info, X } from "lucide-react";

export default function SonnerPage() {
  return (
    <div>
      <Breadcrumb />
      <PageHeader
        title="Sonner"
        description="An opinionated, beautiful toast notification library. Supports stacking, promises, and rich content. From Emil Kowalski."
      />

      <SonnerToaster position="bottom-right" />

      <div className="flex flex-col gap-8">
        <Playground
          title="Toast Types"
          description="Trigger different toast variants using the toast() function."
          code={`import { toast } from "sonner";
import { SonnerToaster } from "@cookest/ui";

// In your layout:
<SonnerToaster position="bottom-right" />

// Trigger:
toast("Recipe saved successfully");
toast.success("Recipe published!");
toast.error("Failed to save — please try again");
toast.warning("Unsaved changes will be lost");
toast.info("New recipes added to your collection");`}
        >
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" onClick={() => toast("Recipe saved to collection")}>
              Default
            </Button>
            <Button variant="secondary" onClick={() => toast.success("Recipe published successfully!")}>
              <CheckCircle2 size={15} className="mr-1.5 text-green-500" /> Success
            </Button>
            <Button variant="secondary" onClick={() => toast.error("Failed to save recipe — please try again")}>
              <X size={15} className="mr-1.5 text-red-500" /> Error
            </Button>
            <Button variant="secondary" onClick={() => toast.warning("Unsaved changes will be lost")}>
              <AlertTriangle size={15} className="mr-1.5 text-amber-500" /> Warning
            </Button>
            <Button variant="secondary" onClick={() => toast.info("3 new recipes added to Italian cuisine")}>
              <Info size={15} className="mr-1.5 text-blue-500" /> Info
            </Button>
          </div>
        </Playground>

        <Playground
          title="Promise Toast"
          description="Show loading → success/error states for async operations like saving a recipe."
          code={`toast.promise(
  saveRecipe(data),
  {
    loading: "Saving recipe...",
    success: "Recipe saved!",
    error: "Failed to save recipe",
  }
);`}
        >
          <Button
            variant="primary"
            onClick={() =>
              toast.promise(
                new Promise<string>(resolve => setTimeout(() => resolve("done"), 2000)),
                {
                  loading: "Saving your recipe...",
                  success: "Recipe saved to your collection!",
                  error: "Failed to save recipe",
                }
              )
            }
          >
            Save Recipe (async)
          </Button>
        </Playground>

        <Playground
          title="Rich Content"
          description="Toasts can include custom JSX content for richer notifications."
          code={`toast.custom(
  (t) => (
    <div className="flex gap-3 items-center">
      <span>🍝</span>
      <div>
        <p>Recipe published</p>
        <button onClick={() => toast.dismiss(t)}>Dismiss</button>
      </div>
    </div>
  )
);`}
        >
          <Button
            variant="secondary"
            onClick={() =>
              toast.custom((t) => (
                <div
                  className="flex gap-3 items-center px-4 py-3 rounded-xl border shadow-md"
                  style={{ background: "var(--ck-surface)", borderColor: "var(--ck-border)" }}
                >
                  <span className="text-2xl">🍝</span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold" style={{ color: "var(--ck-heading)" }}>Recipe Published</p>
                    <p className="text-xs" style={{ color: "var(--ck-text-muted)" }}>Pasta Carbonara is now live</p>
                  </div>
                  <button
                    onClick={() => toast.dismiss(t)}
                    className="text-xs px-2 py-1 rounded border cursor-pointer"
                    style={{ borderColor: "var(--ck-border)", color: "var(--ck-text-muted)" }}
                  >
                    Dismiss
                  </button>
                </div>
              ))
            }
          >
            Custom Toast
          </Button>
        </Playground>

        <PropsTable
          props={[
            { name: "position", type: '"top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"', default: '"bottom-right"', description: "Where toasts appear on screen." },
            { name: "duration", type: "number", default: "4000", description: "Auto-dismiss delay in milliseconds." },
            { name: "richColors", type: "boolean", default: "false", description: "Use colored backgrounds for success/error/warning." },
            { name: "expand", type: "boolean", default: "false", description: "Show expanded stacked toasts." },
            { name: "closeButton", type: "boolean", default: "false", description: "Show a close button on each toast." },
          ]}
        />
      </div>
    </div>
  );
}
