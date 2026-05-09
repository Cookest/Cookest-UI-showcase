"use client";

import { useState } from "react";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger, MenubarSub, MenubarSubContent, MenubarSubTrigger } from "@cookest/ui";
import { Playground, PropsTable, PageHeader } from "@/components/Playground";
import { Breadcrumb } from "@/components/Breadcrumb";

export default function MenubarPage() {
  const [lastAction, setLastAction] = useState<string | null>(null);

  return (
    <div>
      <Breadcrumb />
      <PageHeader
        title="Menubar"
        description="A horizontal menu bar providing access to a consistent set of commands. Common in desktop-style applications."
      />

      <div className="flex flex-col gap-8">
        <Playground
          title="Recipe Editor Menubar"
          description="A desktop-style menubar for the recipe editor view."
          code={`<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>New Recipe <MenubarShortcut>⌘N</MenubarShortcut></MenubarItem>
      <MenubarItem>Save <MenubarShortcut>⌘S</MenubarShortcut></MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Export as PDF</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`}
        >
          <div className="flex flex-col gap-4">
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>File</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem onClick={() => setLastAction("New Recipe")}>
                    New Recipe <MenubarShortcut>⌘N</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem onClick={() => setLastAction("Open")}>
                    Open <MenubarShortcut>⌘O</MenubarShortcut>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem onClick={() => setLastAction("Save")}>
                    Save <MenubarShortcut>⌘S</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem onClick={() => setLastAction("Save As")}>
                    Save As <MenubarShortcut>⇧⌘S</MenubarShortcut>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarSub>
                    <MenubarSubTrigger>Export</MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem onClick={() => setLastAction("Export PDF")}>Export as PDF</MenubarItem>
                      <MenubarItem onClick={() => setLastAction("Export JSON")}>Export as JSON</MenubarItem>
                      <MenubarItem onClick={() => setLastAction("Print")}>Print</MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger>Edit</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem onClick={() => setLastAction("Undo")}>
                    Undo <MenubarShortcut>⌘Z</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem onClick={() => setLastAction("Redo")}>
                    Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem onClick={() => setLastAction("Cut")}>Cut <MenubarShortcut>⌘X</MenubarShortcut></MenubarItem>
                  <MenubarItem onClick={() => setLastAction("Copy")}>Copy <MenubarShortcut>⌘C</MenubarShortcut></MenubarItem>
                  <MenubarItem onClick={() => setLastAction("Paste")}>Paste <MenubarShortcut>⌘V</MenubarShortcut></MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger>View</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem onClick={() => setLastAction("Toggle Sidebar")}>
                    Toggle Sidebar <MenubarShortcut>⌘B</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem onClick={() => setLastAction("Full Screen")}>
                    Full Screen <MenubarShortcut>⌘⇧F</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger>Help</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem onClick={() => setLastAction("Documentation")}>Documentation</MenubarItem>
                  <MenubarItem onClick={() => setLastAction("Shortcuts")}>Keyboard Shortcuts</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem onClick={() => setLastAction("About")}>About Cookest</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
            {lastAction && (
              <p className="text-sm" style={{ color: "var(--ck-primary)" }}>✓ Action: {lastAction}</p>
            )}
          </div>
        </Playground>

        <PropsTable
          props={[
            { name: "MenubarMenu", type: "ReactNode", description: "A top-level menu item group." },
            { name: "MenubarTrigger", type: "ReactNode", description: "The button that opens a menu." },
            { name: "MenubarContent", type: "ReactNode", description: "The dropdown panel containing items." },
            { name: "MenubarItem", type: "ReactNode", description: "A single actionable item." },
            { name: "MenubarShortcut", type: "string", description: "Keyboard shortcut hint." },
            { name: "MenubarSub", type: "ReactNode", description: "A nested submenu container." },
          ]}
        />
      </div>
    </div>
  );
}
