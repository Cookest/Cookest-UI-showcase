"use client";

import { useState } from "react";
import { Tooltip, Button, Badge } from "@cookest/ui";
import { Playground, PropsTable, PageHeader } from "@/components/Playground";
import { RelatedComponents } from "@/components/RelatedComponents";

const positions = ["top", "bottom", "left", "right"] as const;

export default function TooltipPage() {
  const [activePosition, setActivePosition] =
    useState<(typeof positions)[number]>("top");

  return (
    <div>
      <PageHeader
        title="Tooltip"
        description="Tooltips display brief helper text when users hover or focus an element."
      />

      <div className="flex flex-col gap-8">
        {/* Positions */}
        <Playground
          title="Positions"
          description="Tooltips can appear on any side of the trigger element."
          code={`<Tooltip content="Tooltip on ${activePosition}" position="${activePosition}">
  <Button variant="outline">${activePosition}</Button>
</Tooltip>`}
        >
          <div className="flex flex-col items-center gap-6">
            <div className="flex gap-2">
              {positions.map((pos) => (
                <button
                  key={pos}
                  onClick={() => setActivePosition(pos)}
                  className="px-3 py-1 text-xs rounded-lg cursor-pointer border"
                  style={{
                    borderColor: "var(--ck-border)",
                    background:
                      activePosition === pos
                        ? "var(--ck-primary)"
                        : "var(--ck-surface)",
                    color: activePosition === pos ? "#fff" : "var(--ck-text)",
                  }}
                >
                  {pos}
                </button>
              ))}
            </div>
            <div className="flex gap-4">
              {positions.map((pos) => (
                <Tooltip key={pos} content={`Tooltip on ${pos}`} position={pos}>
                  <Button
                    variant={pos === activePosition ? "primary" : "secondary"}
                  >
                    {pos}
                  </Button>
                </Tooltip>
              ))}
            </div>
          </div>
        </Playground>

        {/* On Different Elements */}
        <Playground
          title="On Different Elements"
          description="Tooltips can wrap any element — buttons, badges, or inline text."
          code={`<Tooltip content="You have 5 new notifications">
  <Badge variant="success">New</Badge>
</Tooltip>

<Tooltip content="Click to learn more">
  <span style={{ textDecoration: "underline", cursor: "help" }}>
    Hover this text
  </span>
</Tooltip>

<Tooltip content="Save your progress">
  <Button>Save</Button>
</Tooltip>`}
        >
          <div className="flex items-center gap-6">
            <Tooltip content="You have 5 new notifications">
              <Badge variant="success">New</Badge>
            </Tooltip>

            <Tooltip content="Click to learn more">
              <span
                style={{
                  textDecoration: "underline",
                  cursor: "help",
                  color: "var(--ck-text)",
                }}
              >
                Hover this text
              </span>
            </Tooltip>

            <Tooltip content="Save your progress">
              <Button>Save</Button>
            </Tooltip>
          </div>
        </Playground>

        {/* Props Table */}
        <PropsTable
          props={[
            {
              name: "content",
              type: "string",
              description: "The text displayed inside the tooltip.",
            },
            {
              name: "position",
              type: '"top" | "bottom" | "left" | "right"',
              default: '"top"',
              description: "Which side of the trigger the tooltip appears on.",
            },
            {
              name: "delay",
              type: "number",
              default: "200",
              description:
                "Delay in milliseconds before the tooltip appears on hover.",
            },
            {
              name: "children",
              type: "ReactNode",
              description: "The trigger element that the tooltip wraps.",
            },
          ]}
        />
        <RelatedComponents component="tooltip" />
      </div>
    </div>
  );
}
