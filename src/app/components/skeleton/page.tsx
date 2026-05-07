"use client";

import { useState } from "react";
import { Skeleton, SkeletonCard } from "@cookest/ui";
import { PageHeader, Playground, PropsTable } from "@/components/Playground";

export default function SkeletonPage() {
  const [loading, setLoading] = useState(true);

  return (
    <div>
      <PageHeader
        title="Skeleton"
        description="Placeholder loading indicators for content that is still being fetched."
      />

      <div className="space-y-8">
        <Playground
          title="Text"
          description="Text skeleton with configurable line count."
          code={`<Skeleton variant="text" />
<Skeleton variant="text" lines={3} />`}
        >
          <div style={{ display: "flex", gap: "48px", width: "100%" }}>
            <div style={{ flex: 1 }}>
              <p className="text-xs" style={{ color: "var(--ck-text-muted)", margin: "0 0 8px 0" }}>1 line</p>
              <Skeleton variant="text" />
            </div>
            <div style={{ flex: 1 }}>
              <p className="text-xs" style={{ color: "var(--ck-text-muted)", margin: "0 0 8px 0" }}>3 lines</p>
              <Skeleton variant="text" lines={3} />
            </div>
          </div>
        </Playground>

        <Playground
          title="Shapes"
          description="Circular and rectangular skeleton variants."
          code={`<Skeleton variant="circular" width={64} height={64} />
<Skeleton variant="rectangular" width={200} height={100} />`}
        >
          <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
            <div style={{ textAlign: "center" }}>
              <Skeleton variant="circular" width={64} height={64} />
              <p className="text-xs" style={{ color: "var(--ck-text-muted)", margin: "8px 0 0 0" }}>Circular</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <Skeleton variant="rectangular" width={200} height={100} />
              <p className="text-xs" style={{ color: "var(--ck-text-muted)", margin: "8px 0 0 0" }}>Rectangular</p>
            </div>
          </div>
        </Playground>

        <Playground
          title="Card"
          description="Pre-built skeleton card for common card loading patterns."
          code={`<SkeletonCard />`}
        >
          <SkeletonCard />
        </Playground>

        <Playground
          title="Loading Pattern"
          description="Toggle between skeleton loading state and actual content."
          code={`const [loading, setLoading] = useState(true);

{loading ? (
  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
    <Skeleton variant="circular" width={48} height={48} />
    <div>
      <Skeleton variant="text" width={140} />
      <Skeleton variant="text" width={200} />
    </div>
  </div>
) : (
  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
    <div style={{ width: 48, height: 48, borderRadius: "50%", background: "var(--ck-primary)" }} />
    <div>
      <p style={{ fontWeight: 600 }}>Jane Cooper</p>
      <p>Senior Recipe Developer</p>
    </div>
  </div>
)}`}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "center", width: "100%" }}>
            <button
              onClick={() => setLoading(!loading)}
              className="px-4 py-2 text-sm rounded-lg cursor-pointer border-0 font-medium"
              style={{
                background: "var(--ck-primary)",
                color: "#fff",
              }}
            >
              {loading ? "Show Content" : "Show Skeleton"}
            </button>

            <div
              style={{
                padding: "20px",
                borderRadius: "12px",
                border: "1px solid var(--ck-border)",
                background: "var(--ck-surface)",
                width: "100%",
                maxWidth: "360px",
              }}
            >
              {loading ? (
                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <Skeleton variant="circular" width={48} height={48} />
                  <div style={{ flex: 1 }}>
                    <Skeleton variant="text" width={140} />
                    <Skeleton variant="text" width={200} />
                  </div>
                </div>
              ) : (
                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      background: "var(--ck-primary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontWeight: 600,
                      fontSize: "18px",
                    }}
                  >
                    JC
                  </div>
                  <div>
                    <p className="text-sm" style={{ color: "var(--ck-heading)", fontWeight: 600, margin: 0 }}>
                      Jane Cooper
                    </p>
                    <p className="text-xs" style={{ color: "var(--ck-text-muted)", margin: "4px 0 0 0" }}>
                      Senior Recipe Developer
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Playground>

        <PropsTable
          props={[
            { name: "variant", type: '"text" | "circular" | "rectangular"', default: '"text"', description: "The shape variant of the skeleton." },
            { name: "width", type: "string | number", description: "Width of the skeleton element." },
            { name: "height", type: "string | number", description: "Height of the skeleton element." },
            { name: "lines", type: "number", default: "1", description: "Number of text lines to render (only for text variant)." },
            { name: "className", type: "string", description: "Additional CSS class name." },
          ]}
        />

        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--ck-heading)" }}>
            SkeletonCard
          </h3>
          <PropsTable
            props={[
              { name: "className", type: "string", description: "Additional CSS class name for the card skeleton." },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
