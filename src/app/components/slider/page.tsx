"use client";

import { useState } from "react";
import { Slider } from "@cookest/ui";
import { PageHeader, Playground, PropsTable } from "@/components/Playground";
import { RelatedComponents } from "@/components/RelatedComponents";
import { Breadcrumb } from "@/components/Breadcrumb";

export default function SliderPage() {
  const [brightness, setBrightness] = useState(40);
  const [calories, setCalories] = useState(1200);
  const [protein, setProtein] = useState(80);
  const [carbs, setCarbs] = useState(150);

  return (
    <div>
      <Breadcrumb />
      <PageHeader
        title="Slider"
        description="Sliders allow users to select a value within a range, with support for marks, colors, sizes, and controlled/uncontrolled usage."
      />

      <div className="flex flex-col gap-8">
        {/* Basic */}
        <Playground
          title="Basic"
          description="Uncontrolled slider with default value."
          code={`<Slider label="Volume" defaultValue={60} />`}
        >
          <div className="w-full max-w-sm">
            <Slider label="Volume" defaultValue={60} />
          </div>
        </Playground>

        {/* Controlled */}
        <Playground
          title="Controlled"
          description="Use value and onChange to fully control the slider state."
          code={`const [val, setVal] = useState(40);

<Slider label="Brightness" value={val} onChange={setVal} />
<span className="badge">{val}%</span>`}
        >
          <div className="flex flex-col items-center gap-4 w-full max-w-sm">
            <Slider label="Brightness" value={brightness} onChange={setBrightness} />
            <span
              className="px-3 py-1 rounded-full text-xs font-semibold"
              style={{ background: "var(--ck-primary)", color: "#fff" }}
            >
              {brightness}%
            </span>
          </div>
        </Playground>

        {/* Colors */}
        <Playground
          title="Colors"
          description="Four color variants for different semantic contexts."
          code={`<Slider label="Primary" defaultValue={60} color="primary" />
<Slider label="Success" defaultValue={75} color="success" />
<Slider label="Warning" defaultValue={45} color="warning" />
<Slider label="Error" defaultValue={30} color="error" />`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-xl">
            <Slider label="Primary" defaultValue={60} color="primary" />
            <Slider label="Success" defaultValue={75} color="success" />
            <Slider label="Warning" defaultValue={45} color="warning" />
            <Slider label="Error" defaultValue={30} color="error" />
          </div>
        </Playground>

        {/* Sizes */}
        <Playground
          title="Sizes"
          description="Three sizes: sm, md (default), and lg."
          code={`<Slider label="Small" defaultValue={50} size="sm" />
<Slider label="Medium" defaultValue={50} size="md" />
<Slider label="Large" defaultValue={50} size="lg" />`}
        >
          <div className="flex flex-col gap-6 w-full max-w-sm">
            <Slider label="Small" defaultValue={50} size="sm" />
            <Slider label="Medium" defaultValue={50} size="md" />
            <Slider label="Large" defaultValue={50} size="lg" />
          </div>
        </Playground>

        {/* With Marks */}
        <Playground
          title="With Marks"
          description="Add marks to highlight specific values along the track."
          code={`<Slider
  label="Quality"
  defaultValue={50}
  marks={[
    { value: 0, label: "0" },
    { value: 25, label: "25" },
    { value: 50, label: "Mid" },
    { value: 75, label: "75" },
    { value: 100, label: "Max" },
  ]}
/>`}
        >
          <div className="w-full max-w-sm">
            <Slider
              label="Quality"
              defaultValue={50}
              marks={[
                { value: 0, label: "0" },
                { value: 25, label: "25" },
                { value: 50, label: "Mid" },
                { value: 75, label: "75" },
                { value: 100, label: "Max" },
              ]}
            />
          </div>
        </Playground>

        {/* Real-world: Recipe Nutrition */}
        <Playground
          title="Real-world: Recipe Nutrition"
          description="Adjust nutritional targets with controlled sliders inside a card."
          code={`const [calories, setCalories] = useState(1200);
const [protein, setProtein] = useState(80);
const [carbs, setCarbs] = useState(150);

<div style={{ background: "var(--ck-surface)", borderRadius: "1rem", padding: "1.5rem" }}>
  <p>🥗 Daily Nutrition Goals</p>
  <Slider
    label={\`Calories — \${calories} kcal\`}
    value={calories} onChange={setCalories}
    min={0} max={2000} step={50}
  />
  <Slider
    label={\`Protein — \${protein}g\`}
    value={protein} onChange={setProtein}
    min={0} max={200} step={5} color="success"
  />
  <Slider
    label={\`Carbs — \${carbs}g\`}
    value={carbs} onChange={setCarbs}
    min={0} max={300} step={10} color="warning"
  />
</div>`}
        >
          <div
            className="w-full max-w-md rounded-2xl p-6 flex flex-col gap-5"
            style={{ background: "var(--ck-surface)", border: "1px solid var(--ck-border)" }}
          >
            <p className="text-base font-semibold m-0" style={{ color: "var(--ck-heading)" }}>
              🥗 Daily Nutrition Goals
            </p>
            <Slider
              label={`Calories — ${calories} kcal`}
              value={calories}
              onChange={setCalories}
              min={0}
              max={2000}
              step={50}
              color="primary"
            />
            <Slider
              label={`Protein — ${protein}g`}
              value={protein}
              onChange={setProtein}
              min={0}
              max={200}
              step={5}
              color="success"
            />
            <Slider
              label={`Carbs — ${carbs}g`}
              value={carbs}
              onChange={setCarbs}
              min={0}
              max={300}
              step={10}
              color="warning"
            />
          </div>
        </Playground>

        {/* Props Table */}
        <PropsTable
          props={[
            {
              name: "value",
              type: "number",
              description: "Controlled value.",
            },
            {
              name: "defaultValue",
              type: "number",
              default: "0",
              description: "Initial value for uncontrolled usage.",
            },
            {
              name: "min",
              type: "number",
              default: "0",
              description: "Minimum allowed value.",
            },
            {
              name: "max",
              type: "number",
              default: "100",
              description: "Maximum allowed value.",
            },
            {
              name: "step",
              type: "number",
              default: "1",
              description: "Increment step between values.",
            },
            {
              name: "label",
              type: "string",
              description: "Label shown above the track.",
            },
            {
              name: "showValue",
              type: "boolean",
              default: "true",
              description: "Display the current value as a badge.",
            },
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description: "Disables interaction.",
            },
            {
              name: "size",
              type: '"sm" | "md" | "lg"',
              default: '"md"',
              description: "Track and thumb size.",
            },
            {
              name: "color",
              type: '"primary" | "success" | "warning" | "error"',
              default: '"primary"',
              description: "Fill color of the slider.",
            },
            {
              name: "marks",
              type: "SliderMark[]",
              description: "Array of { value, label? } objects for tick mark indicators.",
            },
            {
              name: "onChange",
              type: "(value: number) => void",
              description: "Callback fired when the value changes.",
            },
          ]}
        />

        <RelatedComponents component="slider" />
      </div>
    </div>
  );
}
