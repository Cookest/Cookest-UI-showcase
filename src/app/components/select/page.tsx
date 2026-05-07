"use client";

import { useState } from "react";
import { Select } from "@cookest/ui";
import { PageHeader, Playground, PropsTable } from "@/components/Playground";
import { RelatedComponents } from "@/components/RelatedComponents";
import { Breadcrumb } from "@/components/Breadcrumb";

const cuisineOptions = [
  { value: "italian", label: "Italian" },
  { value: "japanese", label: "Japanese" },
  { value: "mexican", label: "Mexican" },
  { value: "thai", label: "Thai" },
  { value: "french", label: "French" },
];

const allCuisineOptions = [
  { value: "italian", label: "Italian" },
  { value: "japanese", label: "Japanese" },
  { value: "mexican", label: "Mexican" },
  { value: "thai", label: "Thai" },
  { value: "french", label: "French" },
  { value: "indian", label: "Indian" },
  { value: "chinese", label: "Chinese" },
  { value: "korean", label: "Korean" },
  { value: "greek", label: "Greek" },
  { value: "spanish", label: "Spanish" },
  { value: "vietnamese", label: "Vietnamese" },
  { value: "turkish", label: "Turkish" },
];

export default function SelectPage() {
  const [searchValue, setSearchValue] = useState("");
  const [controlledValue, setControlledValue] = useState("");

  return (
    <div>
      <Breadcrumb />
      <PageHeader
        title="Select"
        description="A dropdown selection component with optional search, labels, and error states."
      />

      <div className="space-y-8">
        <Playground
          title="Basic"
          description="A simple select with cuisine options."
          code={`<Select
  options={[
    { value: "italian", label: "Italian" },
    { value: "japanese", label: "Japanese" },
    { value: "mexican", label: "Mexican" },
    { value: "thai", label: "Thai" },
    { value: "french", label: "French" },
  ]}
  placeholder="Choose a cuisine"
/>`}
        >
          <Select options={cuisineOptions} placeholder="Choose a cuisine" />
        </Playground>

        <Playground
          title="Searchable"
          description="A select with search filtering for long option lists."
          code={`<Select
  options={allCuisineOptions}
  searchable
  placeholder="Search cuisines..."
  value={value}
  onChange={setValue}
/>`}
        >
          <Select
            options={allCuisineOptions}
            searchable
            placeholder="Search cuisines..."
            value={searchValue}
            onChange={setSearchValue}
          />
        </Playground>

        <Playground
          title="With Label"
          description="Select with a label and placeholder text."
          code={`<Select
  label="Favorite Cuisine"
  options={cuisineOptions}
  placeholder="Pick your favorite..."
/>`}
        >
          <Select
            label="Favorite Cuisine"
            options={cuisineOptions}
            placeholder="Pick your favorite..."
          />
        </Playground>

        <Playground
          title="Interactive"
          description="Controlled select that displays the selected value."
          code={`const [value, setValue] = useState("");

<Select
  label="Select a cuisine"
  options={cuisineOptions}
  value={value}
  onChange={setValue}
  placeholder="Choose one..."
/>
<p>Selected: {value || "none"}</p>`}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "center", width: "100%" }}>
            <Select
              label="Select a cuisine"
              options={cuisineOptions}
              value={controlledValue}
              onChange={setControlledValue}
              placeholder="Choose one..."
            />
            <p
              className="text-sm"
              style={{
                color: "var(--ck-text-muted)",
                margin: 0,
                padding: "8px 16px",
                borderRadius: "8px",
                background: "var(--ck-surface)",
                border: "1px solid var(--ck-border)",
              }}
            >
              Selected: <strong style={{ color: "var(--ck-heading)" }}>{controlledValue || "none"}</strong>
            </p>
          </div>
        </Playground>

        <PropsTable
          props={[
            { name: "options", type: "Array<{ value: string; label: string; disabled?: boolean }>", description: "Array of options to display in the dropdown." },
            { name: "value", type: "string", description: "The currently selected value (controlled)." },
            { name: "onChange", type: "(value: string) => void", description: "Callback fired when the selection changes." },
            { name: "label", type: "string", description: "Label text displayed above the select." },
            { name: "placeholder", type: "string", description: "Placeholder text when no value is selected." },
            { name: "searchable", type: "boolean", default: "false", description: "Enables a search input to filter options." },
            { name: "disabled", type: "boolean", default: "false", description: "Disables the select component." },
            { name: "error", type: "string", description: "Error message displayed below the select." },
          ]}
        />
        <RelatedComponents component="select" />
      </div>
    </div>
  );
}
