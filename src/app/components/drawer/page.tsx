"use client";

import { useState } from "react";
import {
  Drawer, DrawerClose, DrawerContent, DrawerDescription,
  DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger,
  Button,
} from "@cookest/ui";
import { Playground, PropsTable, PageHeader } from "@/components/Playground";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ShoppingCart, Filter } from "lucide-react";

export default function DrawerPage() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div>
      <Breadcrumb />
      <PageHeader
        title="Drawer"
        description="A bottom sheet that slides up from the bottom of the screen. Optimised for mobile — can be dragged to dismiss. Built on Vaul."
      />

      <div className="flex flex-col gap-8">
        <Playground
          title="Basic"
          description="A simple bottom drawer triggered by a button."
          code={`<Drawer>
  <DrawerTrigger asChild>
    <Button>Open Drawer</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Filter Recipes</DrawerTitle>
      <DrawerDescription>Narrow by cuisine, diet, or time.</DrawerDescription>
    </DrawerHeader>
    {/* content */}
    <DrawerFooter>
      <DrawerClose asChild>
        <Button>Apply</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`}
        >
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="secondary">
                <Filter size={15} className="mr-1.5" /> Filter Recipes
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                  <DrawerTitle>Filter Recipes</DrawerTitle>
                  <DrawerDescription>Select cuisines to narrow your recipe library.</DrawerDescription>
                </DrawerHeader>
                <div className="px-4 py-2 grid grid-cols-2 gap-2">
                  {["Italian", "Japanese", "Mexican", "Indian", "Thai", "French"].map(cuisine => (
                    <label key={cuisine} className="flex items-center gap-2 p-3 rounded-lg border cursor-pointer" style={{ borderColor: "var(--ck-border)", background: "var(--ck-bg-card)" }}>
                      <input type="checkbox" />
                      <span className="text-sm" style={{ color: "var(--ck-text)" }}>{cuisine}</span>
                    </label>
                  ))}
                </div>
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button variant="primary" className="w-full">Apply Filters</Button>
                  </DrawerClose>
                  <DrawerClose asChild>
                    <Button variant="ghost" className="w-full">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </Playground>

        <Playground
          title="Shopping Cart"
          description="A mobile-optimised cart drawer for ingredient orders."
          code={`<Drawer open={cartOpen} onOpenChange={setCartOpen}>
  <DrawerTrigger asChild>
    <Button>Cart (3)</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Your Cart</DrawerTitle>
    </DrawerHeader>
    {/* items */}
    <DrawerFooter>
      <Button>Checkout</Button>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`}
        >
          <Drawer open={cartOpen} onOpenChange={setCartOpen}>
            <DrawerTrigger asChild>
              <Button variant="primary">
                <ShoppingCart size={15} className="mr-1.5" /> Cart (3)
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                  <DrawerTitle>Ingredient Cart</DrawerTitle>
                  <DrawerDescription>3 items for Pasta Carbonara</DrawerDescription>
                </DrawerHeader>
                <div className="px-4 space-y-3">
                  {[
                    { name: "Guanciale", qty: "200g", price: "£3.20" },
                    { name: "Spaghetti", qty: "400g", price: "£1.40" },
                    { name: "Pecorino Romano", qty: "80g", price: "£2.80" },
                  ].map(item => (
                    <div key={item.name} className="flex justify-between items-center py-3 border-b" style={{ borderColor: "var(--ck-border)" }}>
                      <div>
                        <p className="text-sm font-medium" style={{ color: "var(--ck-heading)" }}>{item.name}</p>
                        <p className="text-xs" style={{ color: "var(--ck-text-muted)" }}>{item.qty}</p>
                      </div>
                      <span className="font-semibold text-sm" style={{ color: "var(--ck-primary)" }}>{item.price}</span>
                    </div>
                  ))}
                  <div className="flex justify-between py-3 font-semibold">
                    <span style={{ color: "var(--ck-heading)" }}>Total</span>
                    <span style={{ color: "var(--ck-primary)" }}>£7.40</span>
                  </div>
                </div>
                <DrawerFooter>
                  <Button variant="primary" className="w-full" onClick={() => setCartOpen(false)}>Checkout</Button>
                  <DrawerClose asChild>
                    <Button variant="ghost" className="w-full">Continue Shopping</Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </Playground>

        <PropsTable
          props={[
            { name: "open", type: "boolean", description: "Controlled open state." },
            { name: "onOpenChange", type: "(open: boolean) => void", description: "Callback for open state changes." },
            { name: "DrawerTrigger", type: "ReactNode", description: "The element that opens the drawer." },
            { name: "DrawerClose", type: "ReactNode", description: "The element that closes the drawer." },
            { name: "shouldScaleBackground", type: "boolean", default: "true", description: "Scales the page background when the drawer is open (Vaul feature)." },
          ]}
        />
      </div>
    </div>
  );
}
