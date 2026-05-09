"use client";

import { useState } from "react";
import {
  Toaster, useToast, Button,
  Toast, ToastAction, ToastDescription, ToastProvider, ToastTitle, ToastViewport,
} from "@cookest/ui";
import { Playground, PropsTable, PageHeader } from "@/components/Playground";
import { Breadcrumb } from "@/components/Breadcrumb";

function ToastDemo() {
  const { toast } = useToast();

  return (
    <div className="flex flex-wrap gap-3">
      <Button
        variant="secondary"
        onClick={() => toast({ title: "Recipe Saved", description: "Pasta Carbonara has been saved to your collection." })}
      >
        Default Toast
      </Button>
      <Button
        variant="secondary"
        onClick={() => toast({ title: "Recipe Published", description: "Your recipe is now live for the community.", variant: "default" })}
      >
        Success Toast
      </Button>
      <Button
        variant="secondary"
        onClick={() => toast({ title: "Error saving recipe", description: "Please check your connection and try again.", variant: "destructive" })}
      >
        Destructive Toast
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast({
            title: "Recipe shared",
            description: "Pasta Carbonara has been shared.",
            action: <ToastAction altText="Undo">Undo</ToastAction>,
          })
        }
      >
        With Action
      </Button>
    </div>
  );
}

export default function ToastPage() {
  return (
    <div>
      <Breadcrumb />
      <PageHeader
        title="Toast"
        description="Brief, auto-dismissing notifications that provide feedback on user actions. Built on Radix UI Toast."
      />

      <div className="flex flex-col gap-8">
        <Playground
          title="Toast Variants"
          description="Trigger toasts from anywhere — they stack and auto-dismiss after 5 seconds."
          code={`function MyComponent() {
  const { toast } = useToast();

  return (
    <Button onClick={() => toast({
      title: "Recipe Saved",
      description: "Pasta Carbonara saved to your collection.",
    })}>
      Save Recipe
    </Button>
  );
}

// In your root layout:
<Toaster />`}
        >
          <ToastDemo />
        </Playground>

        <PropsTable
          props={[
            { name: "useToast", type: "Hook", description: "Returns a toast() function to trigger toasts." },
            { name: "title", type: "string", description: "Main toast heading." },
            { name: "description", type: "string", description: "Supporting message text." },
            { name: "variant", type: '"default" | "destructive"', default: '"default"', description: "Toast visual variant." },
            { name: "action", type: "ReactNode", description: "Optional action button (use ToastAction component)." },
            { name: "duration", type: "number", default: "5000", description: "Auto-dismiss delay in milliseconds." },
          ]}
        />
      </div>
      <Toaster />
    </div>
  );
}
