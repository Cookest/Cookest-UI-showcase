"use client";

import { Divider } from "@cookest/ui";
import { PageHeader, Playground, PropsTable } from "@/components/Playground";

export default function DividerPage() {
  return (
    <div>
      <PageHeader
        title="Divider"
        description="A visual separator for content sections, available in horizontal and vertical orientations."
      />

      <div className="space-y-8">
        <Playground
          title="Horizontal"
          description="Basic horizontal divider between content blocks."
          code={`<p>First section of content</p>
<Divider />
<p>Second section of content</p>`}
        >
          <div style={{ width: "100%" }}>
            <p className="text-sm" style={{ color: "var(--ck-text)", margin: "0 0 16px 0" }}>
              Preheat the oven to 375°F. Prepare the baking sheet with parchment paper.
            </p>
            <Divider />
            <p className="text-sm" style={{ color: "var(--ck-text)", margin: "16px 0 0 0" }}>
              Mix the dry ingredients together in a large bowl before adding the wet ingredients.
            </p>
          </div>
        </Playground>

        <Playground
          title="With Label"
          description="Divider with a centered label."
          code={`<p>Sign in with your account</p>
<Divider label="OR" />
<p>Continue as guest</p>`}
        >
          <div style={{ width: "100%" }}>
            <p className="text-sm" style={{ color: "var(--ck-text)", margin: "0 0 16px 0", textAlign: "center" }}>
              Sign in with your account
            </p>
            <Divider label="OR" />
            <p className="text-sm" style={{ color: "var(--ck-text)", margin: "16px 0 0 0", textAlign: "center" }}>
              Continue as guest
            </p>
          </div>
        </Playground>

        <Playground
          title="Vertical"
          description="Vertical divider between side-by-side content."
          code={`<div style={{ display: "flex", height: 120, alignItems: "center", gap: 24 }}>
  <div>Left content</div>
  <Divider orientation="vertical" />
  <div>Right content</div>
</div>`}
        >
          <div
            style={{
              display: "flex",
              height: "120px",
              alignItems: "center",
              gap: "24px",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <div style={{ flex: 1, textAlign: "center" }}>
              <p className="text-sm" style={{ color: "var(--ck-heading)", fontWeight: 600, margin: "0 0 4px 0" }}>
                Prep Time
              </p>
              <p className="text-xs" style={{ color: "var(--ck-text-muted)", margin: 0 }}>
                15 minutes
              </p>
            </div>
            <Divider orientation="vertical" />
            <div style={{ flex: 1, textAlign: "center" }}>
              <p className="text-sm" style={{ color: "var(--ck-heading)", fontWeight: 600, margin: "0 0 4px 0" }}>
                Cook Time
              </p>
              <p className="text-xs" style={{ color: "var(--ck-text-muted)", margin: 0 }}>
                45 minutes
              </p>
            </div>
            <Divider orientation="vertical" />
            <div style={{ flex: 1, textAlign: "center" }}>
              <p className="text-sm" style={{ color: "var(--ck-heading)", fontWeight: 600, margin: "0 0 4px 0" }}>
                Servings
              </p>
              <p className="text-xs" style={{ color: "var(--ck-text-muted)", margin: 0 }}>
                4 people
              </p>
            </div>
          </div>
        </Playground>

        <PropsTable
          props={[
            { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "The direction of the divider." },
            { name: "label", type: "string", description: "Optional text label displayed in the center of the divider." },
            { name: "className", type: "string", description: "Additional CSS class name." },
          ]}
        />
      </div>
    </div>
  );
}
