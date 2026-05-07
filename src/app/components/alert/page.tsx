"use client";

import { useState } from "react";
import { Alert } from "@cookest/ui";
import { PageHeader, Playground, PropsTable } from "@/components/Playground";

export default function AlertPage() {
  const [visible, setVisible] = useState(true);

  return (
    <div>
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

        <PropsTable
          props={[
            { name: "variant", type: '"info" | "success" | "warning" | "error"', default: '"info"', description: "The visual style of the alert." },
            { name: "title", type: "string", description: "Optional title displayed above the alert body." },
            { name: "dismissible", type: "boolean", default: "false", description: "Whether the alert can be dismissed." },
            { name: "onDismiss", type: "() => void", description: "Callback fired when the dismiss button is clicked." },
            { name: "children", type: "ReactNode", description: "The alert body content." },
          ]}
        />
      </div>
    </div>
  );
}
