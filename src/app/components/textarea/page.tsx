"use client";

import { useState } from "react";
import { Textarea } from "@cookest/ui";
import { PageHeader, Playground, PropsTable } from "@/components/Playground";
import { RelatedComponents } from "@/components/RelatedComponents";
import { Breadcrumb } from "@/components/Breadcrumb";

export default function TextareaPage() {
  const [validationValue, setValidationValue] = useState("");
  const [showError, setShowError] = useState(false);

  const handleValidate = () => {
    setShowError(validationValue.length < 20);
  };

  return (
    <div>
      <Breadcrumb />
      <PageHeader
        title="Textarea"
        description="A multi-line text input with support for character counts, auto-resize, validation, and multiple sizes."
      />

      <div className="flex flex-col gap-8">
        {/* Basic */}
        <Playground
          title="Basic"
          description="A simple textarea with a label and placeholder."
          code={`<Textarea
  label="Description"
  placeholder="Describe your recipe..."
/>`}
        >
          <div className="w-full max-w-md">
            <Textarea
              label="Description"
              placeholder="Describe your recipe..."
            />
          </div>
        </Playground>

        {/* Character Count */}
        <Playground
          title="With Character Count"
          description="showCount and maxLength display a live counter — useful for bios and short descriptions."
          code={`<Textarea
  label="Recipe Bio"
  placeholder="Tell us about this dish in a few sentences..."
  showCount
  maxLength={280}
  helperText="A short summary shown on recipe cards and search results."
/>`}
        >
          <div className="w-full max-w-md">
            <Textarea
              label="Recipe Bio"
              placeholder="Tell us about this dish in a few sentences..."
              showCount
              maxLength={280}
              helperText="A short summary shown on recipe cards and search results."
            />
          </div>
        </Playground>

        {/* Auto Resize */}
        <Playground
          title="Auto Resize"
          description="autoResize grows the textarea as the user types, preventing scroll within the field."
          code={`<Textarea
  label="Chef's Notes"
  placeholder="Start typing and watch the field grow..."
  autoResize
  resize="none"
  helperText="The textarea expands automatically as you type."
/>`}
        >
          <div className="w-full max-w-md">
            <Textarea
              label="Chef&apos;s Notes"
              placeholder="Start typing and watch the field grow..."
              autoResize
              resize="none"
              helperText="The textarea expands automatically as you type."
            />
          </div>
        </Playground>

        {/* Validation */}
        <Playground
          title="Validation"
          description="Pass an error string to display inline error feedback beneath the field."
          code={`const [value, setValue] = useState("");
const [showError, setShowError] = useState(false);

<Textarea
  label="Description"
  placeholder="Describe your recipe..."
  value={value}
  onChange={(e) => setValue(e.target.value)}
  error={showError ? "Description must be at least 20 characters." : undefined}
/>
<button onClick={() => setShowError(value.length < 20)}>Validate</button>`}
        >
          <div className="w-full max-w-md flex flex-col gap-3">
            <Textarea
              label="Description"
              placeholder="Describe your recipe in at least 20 characters..."
              value={validationValue}
              onChange={(e) => {
                setValidationValue(e.target.value);
                if (showError) setShowError(e.target.value.length < 20);
              }}
              error={showError ? "Description must be at least 20 characters." : undefined}
            />
            <button
              onClick={handleValidate}
              className="self-start px-4 py-2 rounded-lg text-sm font-medium cursor-pointer border-0 text-white transition-opacity hover:opacity-90"
              style={{ background: "var(--ck-primary)" }}
            >
              Validate
            </button>
          </div>
        </Playground>

        {/* Sizes */}
        <Playground
          title="Sizes"
          description="Three sizes — sm, md, and lg — to match surrounding UI density."
          code={`<Textarea inputSize="sm" label="Small" placeholder="Small textarea..." />
<Textarea inputSize="md" label="Medium" placeholder="Medium textarea..." />
<Textarea inputSize="lg" label="Large" placeholder="Large textarea..." />`}
        >
          <div className="w-full max-w-md flex flex-col gap-4">
            <Textarea inputSize="sm" label="Small" placeholder="Small textarea..." />
            <Textarea inputSize="md" label="Medium" placeholder="Medium textarea..." />
            <Textarea inputSize="lg" label="Large" placeholder="Large textarea..." />
          </div>
        </Playground>

        {/* Recipe Submission Form */}
        <Playground
          title="Recipe Submission Form"
          description="A real-world form combining multiple Textarea variants in a cohesive card layout."
          code={`<div className="rounded-xl border p-6" style={{ background: "var(--ck-surface)" }}>
  <h3>Submit a New Recipe</h3>
  <Textarea
    label="Description"
    placeholder="What makes this dish special?"
    showCount
    maxLength={200}
  />
  <Textarea
    label="Instructions"
    placeholder="Step 1: …"
    autoResize
    resize="none"
    helperText="Number your steps for clarity."
  />
  <Textarea
    label="Chef Notes"
    placeholder="Optional tips, swaps, or serving suggestions..."
    inputSize="sm"
    helperText="Optional"
  />
</div>`}
        >
          <div className="w-full max-w-lg rounded-2xl border p-6 flex flex-col gap-5" style={{ background: "var(--ck-surface)", borderColor: "var(--ck-border)" }}>
            <div>
              <h3 className="text-base font-semibold m-0 mb-0.5" style={{ color: "var(--ck-heading)", fontFamily: "var(--font-serif)" }}>
                Submit a New Recipe
              </h3>
              <p className="text-xs m-0" style={{ color: "var(--ck-text-muted)" }}>
                Fill in the details below to share your creation with the Cookest community.
              </p>
            </div>

            <Textarea
              label="Description"
              placeholder="What makes this dish special? Describe the flavour, texture, and occasion."
              showCount
              maxLength={200}
              helperText="Shown on recipe cards and in search results."
            />

            <Textarea
              label="Instructions"
              placeholder={"Step 1: Preheat the oven to 200 °C…\nStep 2: Mix the dry ingredients…"}
              autoResize
              resize="none"
              helperText="Number your steps for clarity. The field grows as you type."
            />

            <Textarea
              label="Chef Notes"
              placeholder="Optional tips, ingredient swaps, or serving suggestions..."
              inputSize="sm"
              helperText="Optional — a personal touch readers will appreciate."
            />

            <button
              className="self-end px-5 py-2 rounded-lg text-sm font-medium cursor-pointer border-0 text-white transition-opacity hover:opacity-90"
              style={{ background: "var(--ck-primary)" }}
            >
              Submit Recipe
            </button>
          </div>
        </Playground>

        {/* Props Table */}
        <PropsTable
          props={[
            { name: "label", type: "string", description: "Label displayed above the textarea." },
            { name: "helperText", type: "string", description: "Subtle helper copy rendered below the field." },
            { name: "error", type: "string", description: "Error message shown in red below the field; replaces helperText when present." },
            { name: "maxLength", type: "number", description: "Maximum number of characters allowed." },
            { name: "showCount", type: "boolean", default: "false", description: "Displays a live character counter. Works best alongside maxLength." },
            { name: "resize", type: '"none" | "vertical" | "horizontal" | "both"', default: '"vertical"', description: "CSS resize behaviour of the textarea element." },
            { name: "autoResize", type: "boolean", default: "false", description: "When true, the textarea grows in height automatically as content increases." },
            { name: "inputSize", type: '"sm" | "md" | "lg"', default: '"md"', description: "Controls the font size and inner padding of the textarea." },
            { name: "fullWidth", type: "boolean", default: "false", description: "When true, the textarea stretches to fill its container width." },
          ]}
        />

        <RelatedComponents component="textarea" />
      </div>
    </div>
  );
}
