"use client";

import { useState } from "react";
import { Badge } from "@cookest/ui";
import { Playground, PropsTable, PageHeader } from "@/components/Playground";
import { RelatedComponents } from "@/components/RelatedComponents";

const badgeVariants = ["default", "success", "warning", "error", "info"] as const;
const badgeSizes = ["sm", "md", "lg"] as const;

export default function BadgePage() {
  const [activeVariant, setActiveVariant] =
    useState<(typeof badgeVariants)[number]>("default");
  const [showDot, setShowDot] = useState(false);
  const [isRemovable, setIsRemovable] = useState(false);
  const [removedTags, setRemovedTags] = useState<string[]>([]);

  const tags = ["React", "Flutter", "TypeScript", "Dart"];
  const visibleTags = tags.filter((t) => !removedTags.includes(t));

  return (
    <div>
      <PageHeader
        title="Badge"
        description="Badges display status labels, tags, and counts with color variants and optional features."
      />

      <div className="flex flex-col gap-8">
        {/* Variants */}
        <Playground
          title="Variants"
          description="Five color variants for different semantic meanings."
          code={`<Badge variant="default">Default</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="info">Info</Badge>`}
        >
          {badgeVariants.map((v) => (
            <Badge key={v} variant={v}>
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </Badge>
          ))}
        </Playground>

        {/* Sizes */}
        <Playground
          title="Sizes"
          description="Badges come in sm, md, and lg sizes."
          code={`<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>`}
        >
          {badgeSizes.map((s) => (
            <Badge key={s} size={s}>
              {s === "sm" ? "Small" : s === "md" ? "Medium" : "Large"}
            </Badge>
          ))}
        </Playground>

        {/* Features */}
        <Playground
          title="Features"
          description="Badges can display a dot indicator or be removable."
          code={`<Badge dot>With Dot</Badge>
<Badge variant="success" dot>Online</Badge>

{/* Removable badges */}
{tags.map((tag) => (
  <Badge
    key={tag}
    removable
    onRemove={() => removeTag(tag)}
  >
    {tag}
  </Badge>
))}`}
        >
          <div className="flex flex-col items-center gap-6 w-full">
            {/* Dot badges */}
            <div className="flex flex-wrap gap-3 justify-center">
              <Badge dot>With Dot</Badge>
              <Badge variant="success" dot>
                Online
              </Badge>
              <Badge variant="error" dot>
                Offline
              </Badge>
              <Badge variant="warning" dot>
                Away
              </Badge>
            </div>

            {/* Removable badges */}
            <div className="flex flex-col items-center gap-2">
              <span
                className="text-xs font-semibold"
                style={{ color: "var(--ck-text-muted)" }}
              >
                Removable (click ✕ to remove)
              </span>
              <div className="flex flex-wrap gap-2 justify-center">
                {visibleTags.length > 0 ? (
                  visibleTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="info"
                      removable
                      onRemove={() =>
                        setRemovedTags((prev) => [...prev, tag])
                      }
                    >
                      {tag}
                    </Badge>
                  ))
                ) : (
                  <span
                    className="text-xs"
                    style={{ color: "var(--ck-text-muted)" }}
                  >
                    All removed —{" "}
                    <button
                      onClick={() => setRemovedTags([])}
                      className="underline cursor-pointer border-0 p-0 text-xs"
                      style={{
                        background: "none",
                        color: "var(--ck-primary)",
                      }}
                    >
                      reset
                    </button>
                  </span>
                )}
              </div>
            </div>
          </div>
        </Playground>

        {/* Interactive */}
        <Playground
          title="Interactive"
          description="Pick a variant and toggle dot/removable to see a live preview."
          code={`const [variant, setVariant] = useState("default");
const [dot, setDot] = useState(false);
const [removable, setRemovable] = useState(false);

<Badge variant={variant} dot={dot} removable={removable}>
  Preview
</Badge>`}
        >
          <div className="flex flex-col items-center gap-6 w-full">
            {/* Controls */}
            <div className="flex flex-wrap gap-6 justify-center">
              {/* Variant picker */}
              <div className="flex flex-col gap-2">
                <span
                  className="text-xs font-semibold"
                  style={{ color: "var(--ck-text-muted)" }}
                >
                  Variant
                </span>
                <div className="flex gap-1 flex-wrap">
                  {badgeVariants.map((v) => (
                    <button
                      key={v}
                      onClick={() => setActiveVariant(v)}
                      className="px-3 py-1 text-xs rounded-lg cursor-pointer border"
                      style={{
                        borderColor: "var(--ck-border)",
                        background:
                          activeVariant === v
                            ? "var(--ck-primary)"
                            : "var(--ck-surface)",
                        color:
                          activeVariant === v ? "#fff" : "var(--ck-text)",
                      }}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div className="flex flex-col gap-2">
                <span
                  className="text-xs font-semibold"
                  style={{ color: "var(--ck-text-muted)" }}
                >
                  Options
                </span>
                <div className="flex gap-1">
                  <button
                    onClick={() => setShowDot((d) => !d)}
                    className="px-3 py-1 text-xs rounded-lg cursor-pointer border"
                    style={{
                      borderColor: "var(--ck-border)",
                      background: showDot
                        ? "var(--ck-primary)"
                        : "var(--ck-surface)",
                      color: showDot ? "#fff" : "var(--ck-text)",
                    }}
                  >
                    Dot: {showDot ? "On" : "Off"}
                  </button>
                  <button
                    onClick={() => setIsRemovable((r) => !r)}
                    className="px-3 py-1 text-xs rounded-lg cursor-pointer border"
                    style={{
                      borderColor: "var(--ck-border)",
                      background: isRemovable
                        ? "var(--ck-primary)"
                        : "var(--ck-surface)",
                      color: isRemovable ? "#fff" : "var(--ck-text)",
                    }}
                  >
                    Removable: {isRemovable ? "On" : "Off"}
                  </button>
                </div>
              </div>
            </div>

            {/* Preview */}
            <div
              className="rounded-xl p-8 flex items-center justify-center w-full"
              style={{
                background: "var(--ck-surface)",
                border: "1px dashed var(--ck-border)",
              }}
            >
              <Badge
                variant={activeVariant}
                dot={showDot}
                removable={isRemovable}
                onRemove={
                  isRemovable ? () => alert("Remove clicked!") : undefined
                }
              >
                Preview Badge
              </Badge>
            </div>
          </div>
        </Playground>

        {/* Props Table */}
        <PropsTable
          props={[
            {
              name: "variant",
              type: '"default" | "success" | "warning" | "error" | "info"',
              default: '"default"',
              description: "Color variant for semantic meaning.",
            },
            {
              name: "size",
              type: '"sm" | "md" | "lg"',
              default: '"md"',
              description: "Size of the badge.",
            },
            {
              name: "dot",
              type: "boolean",
              default: "false",
              description: "Shows a small dot indicator before the label.",
            },
            {
              name: "removable",
              type: "boolean",
              default: "false",
              description: "Shows a close button to remove the badge.",
            },
            {
              name: "onRemove",
              type: "() => void",
              description:
                "Callback fired when the remove button is clicked.",
            },
            {
              name: "children",
              type: "ReactNode",
              description: "Badge label content.",
            },
          ]}
        />
        <RelatedComponents component="badge" />
      </div>
    </div>
  );
}
