"use client";

import { useState } from "react";
import { Label, Input, Button } from "@cookest/ui";
import { Playground, PropsTable, PageHeader } from "@/components/Playground";
import { Breadcrumb } from "@/components/Breadcrumb";

export default function LabelPage() {
  return (
    <div>
      <Breadcrumb />
      <PageHeader
        title="Label"
        description="Renders an accessible label element associated with a form control. Built on Radix UI Label."
      />

      <div className="flex flex-col gap-8">
        <Playground
          title="Basic"
          description="Associate a Label with any input using the htmlFor prop."
          code={`<div className="grid gap-1.5">
  <Label htmlFor="email">Email address</Label>
  <Input id="email" type="email" placeholder="chef@example.com" />
</div>`}
        >
          <div className="w-full max-w-sm grid gap-1.5">
            <Label htmlFor="demo-email">Email address</Label>
            <Input id="demo-email" type="email" placeholder="chef@example.com" />
          </div>
        </Playground>

        <Playground
          title="Form Fields"
          description="Labels consistently applied across a recipe creation form."
          code={`<form className="grid gap-4">
  <div className="grid gap-1.5">
    <Label htmlFor="title">Recipe Name</Label>
    <Input id="title" placeholder="e.g. Pasta Carbonara" />
  </div>
  <div className="grid gap-1.5">
    <Label htmlFor="cuisine">Cuisine Type</Label>
    <Input id="cuisine" placeholder="e.g. Italian" />
  </div>
  <div className="grid gap-1.5">
    <Label htmlFor="time">Cook Time (minutes)</Label>
    <Input id="time" type="number" placeholder="25" />
  </div>
</form>`}
        >
          <div className="w-full max-w-sm grid gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="form-title">Recipe Name</Label>
              <Input id="form-title" placeholder="e.g. Pasta Carbonara" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="form-cuisine">Cuisine Type</Label>
              <Input id="form-cuisine" placeholder="e.g. Italian" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="form-time">Cook Time (minutes)</Label>
              <Input id="form-time" type="number" placeholder="25" />
            </div>
            <Button variant="primary">Save Recipe</Button>
          </div>
        </Playground>

        <Playground
          title="Disabled State"
          description="When the input is disabled, the label visually dims."
          code={`<div className="grid gap-1.5">
  <Label htmlFor="locked">Subscription Plan</Label>
  <Input id="locked" value="Pro" disabled />
</div>`}
        >
          <div className="w-full max-w-sm grid gap-1.5">
            <Label htmlFor="disabled-plan">Subscription Plan</Label>
            <Input id="disabled-plan" value="Cookest Pro" disabled />
          </div>
        </Playground>

        <PropsTable
          props={[
            { name: "htmlFor", type: "string", description: "The id of the form element this label is associated with." },
            { name: "className", type: "string", description: "Custom styles to apply to the label." },
            { name: "children", type: "ReactNode", description: "The label text content." },
          ]}
        />
      </div>
    </div>
  );
}
