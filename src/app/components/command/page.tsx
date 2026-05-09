"use client";

import { useState } from "react";
import {
  Command, CommandDialog, CommandEmpty, CommandGroup,
  CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut,
  Button,
} from "@cookest/ui";
import { Playground, PropsTable, PageHeader } from "@/components/Playground";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Search, BookOpen, Settings, Star, Plus } from "lucide-react";
import { useEffect } from "react";

export default function CommandPage() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(o => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div>
      <Breadcrumb />
      <PageHeader
        title="Command"
        description="A fast, keyboard-first command palette for searching and executing actions. Press ⌘K to open a global dialog."
      />

      <div className="flex flex-col gap-8">
        <Playground
          title="Inline Command"
          description="An embedded command menu for recipe search."
          code={`<Command className="rounded-xl border">
  <CommandInput placeholder="Search recipes..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Popular Recipes">
      <CommandItem>Pasta Carbonara</CommandItem>
      <CommandItem>Risotto Milanese</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`}
        >
          <div className="w-full max-w-md">
            <Command className="rounded-xl border shadow-md" style={{ border: "1px solid var(--ck-border)" }}>
              <CommandInput placeholder="Search recipes, cuisines, or ingredients..." />
              <CommandList>
                <CommandEmpty>No recipes found. Try a different search.</CommandEmpty>
                <CommandGroup heading="Popular Recipes">
                  <CommandItem>
                    <span className="mr-2">🍝</span> Pasta Carbonara
                    <CommandShortcut>⌘P</CommandShortcut>
                  </CommandItem>
                  <CommandItem>
                    <span className="mr-2">🍚</span> Risotto Milanese
                  </CommandItem>
                  <CommandItem>
                    <span className="mr-2">🍜</span> Pad Thai
                  </CommandItem>
                  <CommandItem>
                    <span className="mr-2">🌮</span> Beef Tacos
                  </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Actions">
                  <CommandItem>
                    <Plus size={14} className="mr-2" /> New Recipe
                    <CommandShortcut>⌘N</CommandShortcut>
                  </CommandItem>
                  <CommandItem>
                    <Star size={14} className="mr-2" /> Saved Recipes
                  </CommandItem>
                  <CommandItem>
                    <Settings size={14} className="mr-2" /> Settings
                    <CommandShortcut>⌘,</CommandShortcut>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        </Playground>

        <Playground
          title="Command Dialog"
          description="The most common pattern — press ⌘K or click the button to open a global command palette."
          code={`const [open, setOpen] = useState(false);

useEffect(() => {
  const down = (e) => {
    if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      setOpen(o => !o);
    }
  };
  document.addEventListener("keydown", down);
  return () => document.removeEventListener("keydown", down);
}, []);

<Button onClick={() => setOpen(true)}>
  Open Command Palette
</Button>
<CommandDialog open={open} onOpenChange={setOpen}>
  <CommandInput placeholder="Type a recipe or action..." />
  <CommandList>
    <CommandGroup heading="Recipes">
      <CommandItem>Pasta Carbonara</CommandItem>
    </CommandGroup>
  </CommandList>
</CommandDialog>`}
        >
          <div className="flex flex-col items-center gap-3">
            <Button variant="secondary" onClick={() => setOpen(true)}>
              <Search size={15} className="mr-1.5" /> Open Command Palette
            </Button>
            <p className="text-xs" style={{ color: "var(--ck-text-muted)" }}>or press <kbd className="px-1.5 py-0.5 rounded border text-xs" style={{ borderColor: "var(--ck-border)", background: "var(--ck-bg-card)" }}>⌘K</kbd></p>

            <CommandDialog open={open} onOpenChange={setOpen}>
              <CommandInput placeholder="Search recipes or run a command..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Recipes">
                  <CommandItem onSelect={() => setOpen(false)}>
                    <span className="mr-2">🍝</span> Pasta Carbonara
                  </CommandItem>
                  <CommandItem onSelect={() => setOpen(false)}>
                    <span className="mr-2">🍚</span> Risotto Milanese
                  </CommandItem>
                  <CommandItem onSelect={() => setOpen(false)}>
                    <span className="mr-2">🍜</span> Pad Thai
                  </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Quick Actions">
                  <CommandItem onSelect={() => setOpen(false)}>
                    <Plus size={14} className="mr-2" /> New Recipe
                    <CommandShortcut>⌘N</CommandShortcut>
                  </CommandItem>
                  <CommandItem onSelect={() => setOpen(false)}>
                    <BookOpen size={14} className="mr-2" /> Meal Planner
                  </CommandItem>
                  <CommandItem onSelect={() => setOpen(false)}>
                    <Settings size={14} className="mr-2" /> Settings
                    <CommandShortcut>⌘,</CommandShortcut>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </CommandDialog>
          </div>
        </Playground>

        <PropsTable
          props={[
            { name: "CommandInput", type: "ReactNode", description: "The search input — filters items in real time." },
            { name: "CommandList", type: "ReactNode", description: "Scrollable container for groups and items." },
            { name: "CommandGroup", type: "ReactNode", description: "Groups items with a label heading." },
            { name: "CommandItem", type: "ReactNode", description: "A single selectable action/result." },
            { name: "CommandEmpty", type: "ReactNode", description: "Shown when CommandList has no matching items." },
            { name: "CommandShortcut", type: "string", description: "Keyboard shortcut displayed on the right." },
            { name: "CommandDialog", type: "ReactNode", description: "A pre-styled Dialog wrapper for the full-screen palette." },
          ]}
        />
      </div>
    </div>
  );
}
