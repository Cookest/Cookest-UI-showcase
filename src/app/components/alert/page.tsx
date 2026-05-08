"use client";

import { useState } from "react";
import { Alert } from "@cookest/ui";
import { PageHeader, Playground, PropsTable } from "@/components/Playground";
import { RelatedComponents } from "@/components/RelatedComponents";
import { Breadcrumb } from "@/components/Breadcrumb";

export default function AlertPage() {
  const [visible, setVisible] = useState(true);

  return (
    <div>
      <Breadcrumb />
      <PageHeader
        title="Alert"
        description="Contextual feedback messages for user actions and system status."
      />

      <div className="space-y-8">
        <Playground
          title="Variants"
          description="Info, success, warning, and error alert styles."
          code={`<Alert variant="info" title="Information">
  Your recipe has been saved as a draft.
</Alert>
<Alert variant="success" title="Success">
  Recipe published successfully!
</Alert>
<Alert variant="warning" title="Warning">
  Some ingredients may not be available in your region.
</Alert>
<Alert variant="error" title="Error">
  Failed to upload recipe image. Please try again.
</Alert>`}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%" }}>
            <Alert variant="info" title="Information">
              Your recipe has been saved as a draft.
            </Alert>
            <Alert variant="success" title="Success">
              Recipe published successfully!
            </Alert>
            <Alert variant="warning" title="Warning">
              Some ingredients may not be available in your region.
            </Alert>
            <Alert variant="error" title="Error">
              Failed to upload recipe image. Please try again.
            </Alert>
          </div>
        </Playground>

        <Playground
          title="Dismissible"
          description="Alert that can be dismissed by the user."
          code={`const [visible, setVisible] = useState(true);

{visible ? (
  <Alert
    variant="info"
    title="Tip"
    dismissible
    onDismiss={() => setVisible(false)}
  >
    You can add up to 20 ingredients per recipe.
  </Alert>
) : (
  <button onClick={() => setVisible(true)}>Show Alert</button>
)}`}
        >
          <div style={{ width: "100%" }}>
            {visible ? (
              <Alert
                variant="info"
                title="Tip"
                dismissible
                onDismiss={() => setVisible(false)}
              >
                You can add up to 20 ingredients per recipe.
              </Alert>
            ) : (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                  onClick={() => setVisible(true)}
                  className="px-4 py-2 text-sm rounded-lg cursor-pointer border-0 font-medium"
                  style={{
                    background: "var(--ck-primary)",
                    color: "#fff",
                  }}
                  aria-label="Show dismissed alert again"
                >
                  Show Alert Again
                </button>
              </div>
            )}
          </div>
        </Playground>

        <Playground
          title="Without Title"
          description="Alerts with body text only, no title."
          code={`<Alert variant="info">This is an informational message.</Alert>
<Alert variant="success">Operation completed.</Alert>
<Alert variant="warning">Please review before submitting.</Alert>
<Alert variant="error">Something went wrong.</Alert>`}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%" }}>
            <Alert variant="info">This is an informational message.</Alert>
            <Alert variant="success">Operation completed.</Alert>
            <Alert variant="warning">Please review before submitting.</Alert>
            <Alert variant="error">Something went wrong.</Alert>
          </div>
        </Playground>

        <Playground
          title="Sizes"
          description="Three sizes for different density contexts."
          code={`<Alert variant="info" size="sm">Compact — ideal for inline context.</Alert>
<Alert variant="success" size="md" title="Default">Standard medium size.</Alert>
<Alert variant="warning" size="lg" title="Large Alert">More padding for prominent messages.</Alert>`}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%" }}>
            <Alert variant="info" size="sm">Compact — ideal for inline context.</Alert>
            <Alert variant="success" size="md" title="Saved">Standard medium size alert.</Alert>
            <Alert variant="warning" size="lg" title="Attention">More padding for prominent messages.</Alert>
          </div>
        </Playground>

        <PropsTable
          props={[
            { name: "variant", type: '"info" | "success" | "warning" | "error"', default: '"info"', description: "The visual style of the alert." },
            { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Controls padding and icon size." },
            { name: "title", type: "string", description: "Optional title displayed above the alert body." },
            { name: "dismissible", type: "boolean", default: "false", description: "Whether the alert can be dismissed." },
            { name: "onDismiss", type: "() => void", description: "Callback fired when the dismiss button is clicked." },
            { name: "icon", type: "ReactNode", description: "Override the default variant icon." },
            { name: "visible", type: "boolean", default: "true", description: "Controls visibility with AnimatePresence exit animation." },
            { name: "children", type: "ReactNode", description: "The alert body content." },
          ]}
        />
        <RelatedComponents component="alert" />

        {/* ── Best Practices ── */}
        <section className="mt-12">
          <h2 className="text-xl font-bold mb-6" style={{ color: "var(--ck-heading)", fontFamily: "var(--font-serif)" }}>
            Best Practices
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Do's */}
            <div className="rounded-2xl border p-6" style={{ borderColor: "rgba(122,154,101,0.3)", background: "rgba(122,154,101,0.05)" }}>
              <h3 className="text-sm font-semibold mb-4 flex items-center gap-2" style={{ color: "var(--ck-primary)" }}>
                ✅ Do
              </h3>
              <ul className="space-y-2 list-none p-0 m-0">
                <li className="text-sm flex items-start gap-2" style={{ color: "var(--ck-text)" }}>
                  <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--ck-primary)" }} />
                  Use appropriate variants (success/warning/error/info)
                </li>
                <li className="text-sm flex items-start gap-2" style={{ color: "var(--ck-text)" }}>
                  <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--ck-primary)" }} />
                  Keep messages concise
                </li>
                <li className="text-sm flex items-start gap-2" style={{ color: "var(--ck-text)" }}>
                  <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--ck-primary)" }} />
                  Provide actionable guidance in error alerts
                </li>
                <li className="text-sm flex items-start gap-2" style={{ color: "var(--ck-text)" }}>
                  <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--ck-primary)" }} />
                  Place alerts near the relevant context
                </li>
              </ul>
            </div>
            {/* Don'ts */}
            <div className="rounded-2xl border p-6" style={{ borderColor: "rgba(229,62,62,0.3)", background: "rgba(229,62,62,0.05)" }}>
              <h3 className="text-sm font-semibold mb-4 flex items-center gap-2" style={{ color: "var(--ck-error, #e53e3e)" }}>
                ❌ Don&apos;t
              </h3>
              <ul className="space-y-2 list-none p-0 m-0">
                <li className="text-sm flex items-start gap-2" style={{ color: "var(--ck-text)" }}>
                  <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--ck-primary)" }} />
                  Use alerts for permanent content
                </li>
                <li className="text-sm flex items-start gap-2" style={{ color: "var(--ck-text)" }}>
                  <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--ck-primary)" }} />
                  Stack more than 3 alerts
                </li>
                <li className="text-sm flex items-start gap-2" style={{ color: "var(--ck-text)" }}>
                  <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--ck-primary)" }} />
                  Use error variant for warnings
                </li>
                <li className="text-sm flex items-start gap-2" style={{ color: "var(--ck-text)" }}>
                  <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--ck-primary)" }} />
                  Dismiss important alerts automatically
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── Accessibility ── */}
        <section className="mt-12">
          <h2 className="text-xl font-bold mb-6" style={{ color: "var(--ck-heading)", fontFamily: "var(--font-serif)" }}>
            Accessibility
          </h2>
          <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "var(--ck-border)", background: "var(--ck-surface)" }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "var(--ck-bg)" }}>
                  <th className="text-left px-5 py-3 font-semibold border-b" style={{ borderColor: "var(--ck-border)", color: "var(--ck-heading)" }}>Feature</th>
                  <th className="text-left px-5 py-3 font-semibold border-b" style={{ borderColor: "var(--ck-border)", color: "var(--ck-heading)" }}>Support</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid var(--ck-border)" }}>
                  <td className="px-5 py-3" style={{ color: "var(--ck-text)" }}>role=&quot;alert&quot;</td>
                  <td className="px-5 py-3" style={{ color: "var(--ck-text-muted)" }}>Applied for important messages</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--ck-border)" }}>
                  <td className="px-5 py-3" style={{ color: "var(--ck-text)" }}>aria-live=&quot;polite&quot; / &quot;assertive&quot;</td>
                  <td className="px-5 py-3" style={{ color: "var(--ck-text-muted)" }}>Controls announcement priority for screen readers</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--ck-border)" }}>
                  <td className="px-5 py-3" style={{ color: "var(--ck-text)" }}>Screen reader announcement</td>
                  <td className="px-5 py-3" style={{ color: "var(--ck-text-muted)" }}>Alert content is announced when it appears</td>
                </tr>
                <tr>
                  <td className="px-5 py-3" style={{ color: "var(--ck-text)" }}>Not auto-dismissed for errors</td>
                  <td className="px-5 py-3" style={{ color: "var(--ck-text-muted)" }}>Error alerts persist until user action</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
