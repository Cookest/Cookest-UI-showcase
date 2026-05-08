"use client";

import { useState } from "react";
import { Spinner, Button } from "@cookest/ui";
import { PageHeader, Playground, PropsTable } from "@/components/Playground";
import { RelatedComponents } from "@/components/RelatedComponents";
import { Breadcrumb } from "@/components/Breadcrumb";

export default function SpinnerPage() {
  const [loadingPrimary, setLoadingPrimary] = useState(false);
  const [loadingSecondary, setLoadingSecondary] = useState(false);
  const [loadingGhost, setLoadingGhost] = useState(false);
  const [contentLoaded, setContentLoaded] = useState(false);

  const simulate = (setter: (v: boolean) => void) => {
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  return (
    <div>
      <Breadcrumb />
      <PageHeader
        title="Spinner"
        description="Spinners indicate an active loading or processing state. Available in multiple sizes and colors for flexible integration."
      />

      <div className="flex flex-col gap-8">
        {/* Sizes */}
        <Playground
          title="Sizes"
          description="Five sizes: xs, sm, md (default), lg, and xl."
          code={`<Spinner size="xs" label="Extra small" />
<Spinner size="sm" label="Small" />
<Spinner size="md" label="Medium" />
<Spinner size="lg" label="Large" />
<Spinner size="xl" label="Extra large" />`}
        >
          <div className="flex items-end gap-8 flex-wrap">
            {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
              <div key={s} className="flex flex-col items-center gap-2">
                <Spinner size={s} label={s} />
                <span className="text-xs" style={{ color: "var(--ck-text-muted)" }}>
                  {s}
                </span>
              </div>
            ))}
          </div>
        </Playground>

        {/* Colors */}
        <Playground
          title="Colors"
          description="Three color options: primary, white (on dark background), and current (inherits text color)."
          code={`{/* Primary */}
<Spinner color="primary" size="lg" />

{/* White — on a dark surface */}
<div style={{ background: "#1a1a2e", padding: "1rem", borderRadius: "0.75rem" }}>
  <Spinner color="white" size="lg" />
</div>

{/* Current — inherits surrounding text color */}
<div style={{ color: "var(--ck-error)" }}>
  <Spinner color="current" size="lg" />
</div>`}
        >
          <div className="flex items-center gap-10 flex-wrap">
            <div className="flex flex-col items-center gap-2">
              <Spinner color="primary" size="lg" />
              <span className="text-xs" style={{ color: "var(--ck-text-muted)" }}>
                primary
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div
                className="flex items-center justify-center w-16 h-16 rounded-xl"
                style={{ background: "#1a1a2e" }}
              >
                <Spinner color="white" size="lg" />
              </div>
              <span className="text-xs" style={{ color: "var(--ck-text-muted)" }}>
                white
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div style={{ color: "var(--ck-error)" }}>
                <Spinner color="current" size="lg" />
              </div>
              <span className="text-xs" style={{ color: "var(--ck-text-muted)" }}>
                current
              </span>
            </div>
          </div>
        </Playground>

        {/* In Buttons */}
        <Playground
          title="In Buttons"
          description="Use Spinner as iconLeft in Button for interactive loading states. Click each button to trigger a 2-second simulation."
          code={`<Button
  variant="primary"
  iconLeft={loading ? <Spinner size="sm" color="white" label="Loading" /> : undefined}
  disabled={loading}
>
  {loading ? "Saving…" : "Save Recipe"}
</Button>

<Button
  variant="secondary"
  iconLeft={loading ? <Spinner size="sm" label="Loading" /> : undefined}
  disabled={loading}
>
  {loading ? "Loading…" : "Load More"}
</Button>

<Button
  variant="ghost"
  iconLeft={loading ? <Spinner size="sm" label="Loading" /> : undefined}
  disabled={loading}
>
  {loading ? "Refreshing…" : "Refresh"}
</Button>`}
        >
          <div className="flex flex-wrap gap-4 items-center">
            <Button
              variant="primary"
              iconLeft={
                loadingPrimary ? (
                  <Spinner size="sm" color="white" label="Loading" />
                ) : undefined
              }
              onClick={() => simulate(setLoadingPrimary)}
              disabled={loadingPrimary}
            >
              {loadingPrimary ? "Saving…" : "Save Recipe"}
            </Button>
            <Button
              variant="secondary"
              iconLeft={
                loadingSecondary ? (
                  <Spinner size="sm" label="Loading" />
                ) : undefined
              }
              onClick={() => simulate(setLoadingSecondary)}
              disabled={loadingSecondary}
            >
              {loadingSecondary ? "Loading…" : "Load More"}
            </Button>
            <Button
              variant="ghost"
              iconLeft={
                loadingGhost ? (
                  <Spinner size="sm" label="Loading" />
                ) : undefined
              }
              onClick={() => simulate(setLoadingGhost)}
              disabled={loadingGhost}
            >
              {loadingGhost ? "Refreshing…" : "Refresh"}
            </Button>
          </div>
        </Playground>

        {/* Real-world: Loading States */}
        <Playground
          title="Real-world: Loading States"
          description="Toggle between a spinner-driven skeleton and loaded card content."
          code={`const [loaded, setLoaded] = useState(false);

{!loaded ? (
  <div className="card loading">
    {/* Avatar placeholder with spinner */}
    <div className="avatar-area">
      <div className="avatar-circle"><Spinner size="sm" /></div>
      <div className="placeholder-lines" />
    </div>
    {/* Title and body with inline spinners */}
    <div className="row"><Spinner size="xs" /><div className="line" /></div>
    <div className="row"><Spinner size="xs" /><div className="line short" /></div>
  </div>
) : (
  <div className="card loaded">
    <div className="avatar">CK</div>
    <h3>🍝 Homemade Pasta</h3>
    <p>Fresh handmade pasta in a vibrant tomato basil sauce…</p>
  </div>
)}
<Button onClick={() => setLoaded((v) => !v)}>
  {loaded ? "Reset" : "Load Content"}
</Button>`}
        >
          <div className="flex flex-col items-center gap-5 w-full max-w-md">
            <div
              className="w-full rounded-2xl p-5 flex flex-col gap-4"
              style={{
                background: "var(--ck-surface)",
                border: "1px solid var(--ck-border)",
              }}
            >
              {!contentLoaded ? (
                <>
                  {/* Avatar area */}
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                      style={{
                        background: "var(--ck-bg)",
                        border: "1px solid var(--ck-border)",
                      }}
                    >
                      <Spinner size="sm" />
                    </div>
                    <div className="flex flex-col gap-1.5 flex-1">
                      <div
                        className="h-3 rounded"
                        style={{ background: "var(--ck-border)", width: "60%" }}
                      />
                      <div
                        className="h-2 rounded"
                        style={{ background: "var(--ck-border)", width: "40%" }}
                      />
                    </div>
                  </div>
                  {/* Title row */}
                  <div className="flex items-center gap-2">
                    <Spinner size="xs" />
                    <span className="text-xs" style={{ color: "var(--ck-text-muted)" }}>
                      Fetching recipe…
                    </span>
                  </div>
                  {/* Body rows */}
                  <div className="flex flex-col gap-2">
                    {[100, 100, 60].map((w, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Spinner size="xs" />
                        <div
                          className="h-2 rounded"
                          style={{
                            background: "var(--ck-border)",
                            width: `${w}%`,
                            flex: 1,
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                      style={{ background: "var(--ck-primary)" }}
                    >
                      CK
                    </div>
                    <div>
                      <p
                        className="text-sm font-semibold m-0"
                        style={{ color: "var(--ck-heading)" }}
                      >
                        Cookest Chef
                      </p>
                      <p className="text-xs m-0" style={{ color: "var(--ck-text-muted)" }}>
                        @cookest
                      </p>
                    </div>
                  </div>
                  <h3
                    className="text-base font-bold m-0"
                    style={{ color: "var(--ck-heading)" }}
                  >
                    🍝 Homemade Pasta
                  </h3>
                  <p className="text-sm m-0" style={{ color: "var(--ck-text)" }}>
                    Fresh handmade pasta tossed in a vibrant tomato basil sauce. Ready in 30
                    minutes with just a handful of pantry staples.
                  </p>
                </>
              )}
            </div>
            <Button
              variant={contentLoaded ? "secondary" : "primary"}
              onClick={() => setContentLoaded((v) => !v)}
            >
              {contentLoaded ? "Reset" : "Load Content"}
            </Button>
          </div>
        </Playground>

        {/* Props Table */}
        <PropsTable
          props={[
            {
              name: "size",
              type: '"xs" | "sm" | "md" | "lg" | "xl"',
              default: '"md"',
              description: "Diameter of the spinner SVG.",
            },
            {
              name: "color",
              type: '"primary" | "white" | "current"',
              default: '"primary"',
              description:
                'Stroke color. Use "current" to inherit the surrounding text color.',
            },
            {
              name: "label",
              type: "string",
              default: '"Loading…"',
              description: "Accessible label read by screen readers (visually hidden).",
            },
          ]}
        />

        <RelatedComponents component="spinner" />
      </div>
    </div>
  );
}
