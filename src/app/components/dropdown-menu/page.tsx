"use client";

import { useState } from "react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
  DropdownMenuGroup, DropdownMenuShortcut,
  Button,
} from "@cookest/ui";
import { Playground, PropsTable, PageHeader } from "@/components/Playground";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ChevronDown, User, Settings, LogOut, BookOpen, Heart, Star } from "lucide-react";

export default function DropdownMenuPage() {
  const [lastAction, setLastAction] = useState<string | null>(null);

  return (
    <div>
      <Breadcrumb />
      <PageHeader
        title="Dropdown Menu"
        description="Displays a menu to the user, triggered by a button. Fully keyboard-navigable and accessible. Built on Radix UI."
      />

      <div className="flex flex-col gap-8">
        <Playground
          title="Basic"
          description="A simple dropdown with grouped menu items."
          code={`<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="secondary">
      My Account <ChevronDown size={14} />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Log out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary">
                My Account <ChevronDown size={14} className="ml-1.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-52">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setLastAction("Profile")}>
                  <User size={14} className="mr-2" /> Profile
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLastAction("Settings")}>
                  <Settings size={14} className="mr-2" /> Settings
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setLastAction("Logout")} className="text-red-500 focus:text-red-500">
                <LogOut size={14} className="mr-2" /> Log out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {lastAction && (
            <p className="text-sm mt-2" style={{ color: "var(--ck-primary)" }}>
              ✓ Clicked: {lastAction}
            </p>
          )}
        </Playground>

        <Playground
          title="Recipe Actions"
          description="Use dropdown menus for contextual actions on recipe cards."
          code={`<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost">Actions</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Save to Collection</DropdownMenuItem>
    <DropdownMenuItem>Add to Meal Plan</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Share Recipe</DropdownMenuItem>
    <DropdownMenuItem>Print</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">Recipe Actions</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-52">
              <DropdownMenuLabel>Pasta Carbonara</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Heart size={14} className="mr-2" /> Save to Collection
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BookOpen size={14} className="mr-2" /> Add to Meal Plan
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Star size={14} className="mr-2" /> Rate Recipe
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Playground>

        <PropsTable
          props={[
            { name: "DropdownMenuTrigger", type: "ReactNode", description: "The element that opens the menu." },
            { name: "DropdownMenuContent", type: "ReactNode", description: "The panel containing menu items." },
            { name: "DropdownMenuItem", type: "ReactNode", description: "A single actionable item in the menu." },
            { name: "DropdownMenuLabel", type: "string", description: "Non-interactive label for a group." },
            { name: "DropdownMenuSeparator", type: "—", description: "A visual separator between item groups." },
            { name: "DropdownMenuShortcut", type: "string", description: "Keyboard shortcut displayed on the right of a menu item." },
          ]}
        />
      </div>
    </div>
  );
}
