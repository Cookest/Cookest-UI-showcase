"use client";

import { useState } from "react";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle, DialogTrigger,
  Button, Input, Label,
} from "@cookest/ui";
import { Playground, PropsTable, PageHeader } from "@/components/Playground";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Plus, Settings } from "lucide-react";

export default function DialogPage() {
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Breadcrumb />
      <PageHeader
        title="Dialog"
        description="A window overlaid on the primary window. Blocks interaction until dismissed. Built on Radix UI Dialog."
      />

      <div className="flex flex-col gap-8">
        <Playground
          title="Basic"
          description="Simple informational dialog triggered by a button."
          code={`<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Add to Meal Plan</DialogTitle>
      <DialogDescription>
        Choose a day to schedule this recipe.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>`}
        >
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="primary"><Plus size={15} className="mr-1.5" /> Add to Meal Plan</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add to Meal Plan</DialogTitle>
                <DialogDescription>
                  Choose a day and meal slot to schedule Pasta Carbonara.
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-2 py-2">
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
                  <button
                    key={day}
                    className="px-3 py-2 text-sm rounded-lg border text-left transition-colors"
                    style={{ borderColor: "var(--ck-border)", color: "var(--ck-text)", background: "var(--ck-bg-card)" }}
                  >
                    {day}
                  </button>
                ))}
              </div>
              <DialogFooter>
                <Button variant="primary">Schedule</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Playground>

        <Playground
          title="Form Dialog"
          description="Use dialogs to capture input without leaving the current page."
          code={`<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <Button variant="secondary">Edit Profile</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogDescription>Update your display name.</DialogDescription>
    </DialogHeader>
    <div className="grid gap-4 py-4">
      <div className="grid gap-1.5">
        <Label htmlFor="display-name">Display Name</Label>
        <Input id="display-name" value={name} onChange={e => setName(e.target.value)} />
      </div>
    </div>
    <DialogFooter>
      <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
      <Button variant="primary" onClick={() => setOpen(false)}>Save Changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
        >
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="secondary"><Settings size={15} className="mr-1.5" /> Edit Profile</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Update your chef profile. Changes are visible to all Cookest users.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-1.5">
                  <Label htmlFor="chef-name">Chef Name</Label>
                  <Input id="chef-name" placeholder="e.g. Chef Marco" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="bio">Bio</Label>
                  <Input id="bio" placeholder="Tell us about your cooking style..." />
                </div>
              </div>
              <DialogFooter>
                <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                <Button variant="primary" onClick={() => setOpen(false)}>Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Playground>

        <PropsTable
          props={[
            { name: "open", type: "boolean", description: "Controlled open state of the dialog." },
            { name: "onOpenChange", type: "(open: boolean) => void", description: "Callback when the dialog open state changes." },
            { name: "DialogTrigger", type: "ReactNode", description: "The element that opens the dialog. Use asChild to forward props." },
            { name: "DialogTitle", type: "string", description: "Required accessible title displayed in the dialog header." },
            { name: "DialogDescription", type: "string", description: "Optional supporting description text." },
            { name: "DialogFooter", type: "ReactNode", description: "Container for action buttons, right-aligned by default." },
          ]}
        />
      </div>
    </div>
  );
}
