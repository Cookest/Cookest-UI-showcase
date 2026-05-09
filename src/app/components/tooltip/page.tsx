"use client";

import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger, Button, Badge } from "@cookest/ui";
import { Playground, PropsTable, PageHeader } from "@/components/Playground";
import { RelatedComponents } from "@/components/RelatedComponents";
import { Breadcrumb } from "@/components/Breadcrumb";

export default function TooltipPage() {
  return (
    <div>
      <Breadcrumb />
      <PageHeader
        title="Tooltip"
        description="Tooltips display brief helper text when users hover or focus an element. (Powered by Radix)"
      />

      <div className="flex flex-col gap-8">
        <Playground
          title="Basic"
          description="A basic tooltip."
          code={`<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Hover</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Add to library</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`}
        >
          <div className="flex flex-col items-center gap-6">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="secondary">Hover me</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add to library</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </Playground>

        <Playground
          title="On Different Elements"
          description="Tooltips can wrap any element — buttons, badges, or inline text."
          code={`<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Badge variant="success">New</Badge>
    </TooltipTrigger>
    <TooltipContent side="right">
      <p>You have 5 new notifications</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`}
        >
          <div className="flex items-center gap-6">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant="success">New</Badge>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>You have 5 new notifications</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <span
                    style={{
                      textDecoration: "underline",
                      cursor: "help",
                      color: "var(--ck-text)",
                    }}
                  >
                    Hover this text
                  </span>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Click to learn more</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </Playground>

        <PropsTable
          props={[
            {
              name: "side",
              type: '"top" | "bottom" | "left" | "right"',
              default: '"top"',
              description: "Which side of the trigger the tooltip appears on.",
            },
            {
              name: "delayDuration",
              type: "number",
              default: "700",
              description: "Delay in milliseconds before the tooltip appears on hover (set on TooltipProvider).",
            },
            {
              name: "asChild",
              type: "boolean",
              description: "Whether the Trigger should merge its props onto its immediate child.",
            },
          ]}
        />
        <RelatedComponents component="tooltip" />
      </div>
    </div>
  );
}
