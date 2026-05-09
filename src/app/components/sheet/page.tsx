"use client";

import { useState } from "react";
import {
  Sheet, SheetContent, SheetDescription, SheetHeader,
  SheetTitle, SheetTrigger, SheetFooter, SheetClose,
  Button,
} from "@cookest/ui";
import { Playground, PropsTable, PageHeader } from "@/components/Playground";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Filter, ShoppingCart, X } from "lucide-react";

export default function SheetPage() {
  const [cartOpen, setCartOpen] = useState(false);
  const cartItems = [
    { name: "Arborio Rice", qty: "500g", price: "£2.40" },
    { name: "Parmigiano Reggiano", qty: "150g", price: "£3.80" },
    { name: "White Wine", qty: "250ml", price: "£4.20" },
  ];

  return (
    <div>
      <Breadcrumb />
      <PageHeader
        title="Sheet"
        description="A slide-in panel that extends from any edge of the viewport. Ideal for side panels, filters, and carts."
      />

      <div className="flex flex-col gap-8">
        <Playground
          title="Right Sheet"
          description="Slides in from the right — the default and most common side."
          code={`<Sheet>
  <SheetTrigger asChild>
    <Button variant="secondary">Open Filters</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Filter Recipes</SheetTitle>
      <SheetDescription>
        Narrow down your recipe library.
      </SheetDescription>
    </SheetHeader>
    {/* filter content */}
  </SheetContent>
</Sheet>`}
        >
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="secondary"><Filter size={15} className="mr-1.5" /> Filter Recipes</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Recipes</SheetTitle>
                <SheetDescription>
                  Narrow down your recipe library by cuisine, diet, or cook time.
                </SheetDescription>
              </SheetHeader>
              <div className="py-6 flex flex-col gap-4">
                {["Italian", "Japanese", "Mexican", "Indian", "French", "Thai", "Mediterranean"].map(cuisine => (
                  <label key={cuisine} className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm" style={{ color: "var(--ck-text)" }}>{cuisine}</span>
                  </label>
                ))}
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button variant="primary" className="w-full">Apply Filters</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </Playground>

        <Playground
          title="Shopping Cart"
          description="Use Sheet for a slide-in cart panel."
          code={`<Sheet open={cartOpen} onOpenChange={setCartOpen}>
  <SheetTrigger asChild>
    <Button>Cart (3)</Button>
  </SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Your Cart</SheetTitle>
    </SheetHeader>
    {/* cart items */}
    <SheetFooter>
      <Button variant="primary">Checkout</Button>
    </SheetFooter>
  </SheetContent>
</Sheet>`}
        >
          <Sheet open={cartOpen} onOpenChange={setCartOpen}>
            <SheetTrigger asChild>
              <Button variant="primary">
                <ShoppingCart size={15} className="mr-1.5" /> Cart ({cartItems.length})
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Your Ingredient Cart</SheetTitle>
                <SheetDescription>3 items for Risotto Milanese</SheetDescription>
              </SheetHeader>
              <div className="flex flex-col gap-3 py-6">
                {cartItems.map(item => (
                  <div key={item.name} className="flex items-center justify-between py-3 border-b" style={{ borderColor: "var(--ck-border)" }}>
                    <div>
                      <p className="text-sm font-medium" style={{ color: "var(--ck-heading)" }}>{item.name}</p>
                      <p className="text-xs" style={{ color: "var(--ck-text-muted)" }}>{item.qty}</p>
                    </div>
                    <span className="text-sm font-semibold" style={{ color: "var(--ck-primary)" }}>{item.price}</span>
                  </div>
                ))}
                <div className="flex justify-between pt-2">
                  <span className="text-sm font-semibold" style={{ color: "var(--ck-heading)" }}>Total</span>
                  <span className="text-sm font-bold" style={{ color: "var(--ck-primary)" }}>£10.40</span>
                </div>
              </div>
              <SheetFooter>
                <Button variant="primary" className="w-full" onClick={() => setCartOpen(false)}>Checkout</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </Playground>

        <Playground
          title="Left Sheet"
          description="Use side='left' for navigation-style panels."
          code={`<Sheet>
  <SheetTrigger asChild>
    <Button variant="ghost">Open Menu</Button>
  </SheetTrigger>
  <SheetContent side="left">
    <SheetHeader>
      <SheetTitle>Navigation</SheetTitle>
    </SheetHeader>
  </SheetContent>
</Sheet>`}
        >
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost">Open Left Panel</Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Cookest Menu</SheetTitle>
                <SheetDescription>Navigate your recipe workspace</SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col gap-1 py-6">
                {["My Recipes", "Meal Planner", "Shopping Lists", "Nutrition", "Settings"].map(item => (
                  <a key={item} href="#" className="px-3 py-2 rounded-lg text-sm transition-colors no-underline" style={{ color: "var(--ck-text)" }}>
                    {item}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </Playground>

        <PropsTable
          props={[
            { name: "side", type: '"top" | "right" | "bottom" | "left"', default: '"right"', description: "The edge from which the sheet slides in." },
            { name: "open", type: "boolean", description: "Controlled open state." },
            { name: "onOpenChange", type: "(open: boolean) => void", description: "Callback for open state changes." },
          ]}
        />
      </div>
    </div>
  );
}
