"use client";

import { useState } from "react";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuSeparator, ContextMenuShortcut, ContextMenuTrigger, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger } from "@cookest/ui";
import { Playground, PropsTable, PageHeader } from "@/components/Playground";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Copy, Trash2, Edit, Share2, Plus } from "lucide-react";

export default function ContextMenuPage() {
  const [action, setAction] = useState<string | null>(null);

  return (
    <div>
      <Breadcrumb />
      <PageHeader
        title="Context Menu"
        description="Displays a menu anchored to a right-click (or long-press on mobile). Ideal for recipe card contextual actions."
      />

      <div className="flex flex-col gap-8">
        <Playground
          title="Recipe Card"
          description="Right-click the card to see the context menu."
          code={`<ContextMenu>
  <ContextMenuTrigger>Right-click me</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Edit Recipe</ContextMenuItem>
    <ContextMenuItem>Duplicate</ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuItem>Delete</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`}
        >
          <ContextMenu>
            <ContextMenuTrigger>
              <div
                className="w-72 rounded-xl border p-5 cursor-context-menu select-none"
                style={{ borderColor: "var(--ck-border)", background: "var(--ck-surface)" }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">🍝</span>
                  <div>
                    <h3 className="text-sm font-semibold" style={{ color: "var(--ck-heading)" }}>Pasta Carbonara</h3>
                    <p className="text-xs" style={{ color: "var(--ck-text-muted)" }}>Italian · 25 min · ★ 4.9</p>
                  </div>
                </div>
                <p className="text-xs" style={{ color: "var(--ck-text-muted)" }}>
                  Right-click to see contextual actions
                </p>
              </div>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-48">
              <ContextMenuLabel>Pasta Carbonara</ContextMenuLabel>
              <ContextMenuSeparator />
              <ContextMenuItem onClick={() => setAction("Edit")}>
                <Edit size={14} className="mr-2" /> Edit Recipe
                <ContextMenuShortcut>⌘E</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem onClick={() => setAction("Duplicate")}>
                <Copy size={14} className="mr-2" /> Duplicate
                <ContextMenuShortcut>⌘D</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuSub>
                <ContextMenuSubTrigger>
                  <Share2 size={14} className="mr-2" /> Share
                </ContextMenuSubTrigger>
                <ContextMenuSubContent>
                  <ContextMenuItem onClick={() => setAction("Share Link")}>Copy Link</ContextMenuItem>
                  <ContextMenuItem onClick={() => setAction("Share Email")}>Share via Email</ContextMenuItem>
                  <ContextMenuItem onClick={() => setAction("Share Social")}>Share to Social</ContextMenuItem>
                </ContextMenuSubContent>
              </ContextMenuSub>
              <ContextMenuItem onClick={() => setAction("Add to Plan")}>
                <Plus size={14} className="mr-2" /> Add to Meal Plan
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem onClick={() => setAction("Delete")} className="text-red-500 focus:text-red-500">
                <Trash2 size={14} className="mr-2" /> Delete Recipe
                <ContextMenuShortcut>⌫</ContextMenuShortcut>
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
          {action && (
            <p className="text-sm mt-2" style={{ color: "var(--ck-primary)" }}>
              ✓ Action: {action}
            </p>
          )}
        </Playground>

        <PropsTable
          props={[
            { name: "ContextMenuTrigger", type: "ReactNode", description: "The element that becomes right-clickable." },
            { name: "ContextMenuContent", type: "ReactNode", description: "The floating menu panel." },
            { name: "ContextMenuItem", type: "ReactNode", description: "A single menu action item." },
            { name: "ContextMenuSub", type: "ReactNode", description: "A nested submenu container." },
            { name: "ContextMenuSubTrigger", type: "ReactNode", description: "Trigger for the nested submenu." },
            { name: "ContextMenuShortcut", type: "string", description: "Keyboard shortcut hint displayed on the right." },
          ]}
        />
      </div>
    </div>
  );
}
