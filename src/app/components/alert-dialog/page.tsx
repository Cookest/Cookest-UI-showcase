"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from "@cookest/ui";
import { Playground, PropsTable, PageHeader } from "@/components/Playground";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Trash2, LogOut, AlertTriangle } from "lucide-react";

export default function AlertDialogPage() {
  const [deleted, setDeleted] = useState(false);

  return (
    <div>
      <Breadcrumb />
      <PageHeader
        title="Alert Dialog"
        description="A modal dialog that interrupts the user with important content and expects a response. Built on Radix UI for full accessibility."
      />

      <div className="flex flex-col gap-8">
        {/* Basic */}
        <Playground
          title="Basic"
          description="A standard confirmation dialog with a destructive action."
          code={`<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="danger">Delete Recipe</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Delete this recipe?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. Your recipe will be permanently removed.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Delete</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`}
        >
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="danger">
                <Trash2 size={15} className="mr-1.5" /> Delete Recipe
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete this recipe?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. Your recipe "Pasta Carbonara" will be permanently removed from your collection and cannot be recovered.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => setDeleted(true)}>Delete Recipe</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          {deleted && (
            <p className="text-sm" style={{ color: "var(--ck-primary)" }}>
              ✓ Recipe deleted.
            </p>
          )}
        </Playground>

        {/* Sign out */}
        <Playground
          title="Sign Out Confirmation"
          description="Use Alert Dialog for session-ending actions."
          code={`<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="ghost">Sign Out</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Sign out of Cookest?</AlertDialogTitle>
      <AlertDialogDescription>
        You'll be returned to the login screen. Any unsaved changes will be lost.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Stay</AlertDialogCancel>
      <AlertDialogAction>Sign Out</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`}
        >
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost">
                <LogOut size={15} className="mr-1.5" /> Sign Out
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Sign out of Cookest?</AlertDialogTitle>
                <AlertDialogDescription>
                  You'll be returned to the login screen. Any unsaved changes to your meal plan will be lost.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Stay logged in</AlertDialogCancel>
                <AlertDialogAction>Sign Out</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </Playground>

        <PropsTable
          props={[
            { name: "AlertDialogTrigger", type: "ReactNode", description: "Element that opens the dialog. Use asChild to merge props." },
            { name: "AlertDialogTitle", type: "string", description: "The dialog heading — required for accessibility." },
            { name: "AlertDialogDescription", type: "string", description: "Supporting text describing the consequence of the action." },
            { name: "AlertDialogAction", type: "ReactNode", description: "The confirming (often destructive) action button." },
            { name: "AlertDialogCancel", type: "ReactNode", description: "Dismisses the dialog without taking action." },
          ]}
        />
      </div>
    </div>
  );
}
