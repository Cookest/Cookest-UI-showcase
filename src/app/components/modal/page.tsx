"use client";

import { useState } from "react";
import { Modal, Button } from "@cookest/ui";
import { Playground, PropsTable, PageHeader } from "@/components/Playground";
import { RelatedComponents } from "@/components/RelatedComponents";
import { Breadcrumb } from "@/components/Breadcrumb";

export default function ModalPage() {
  const [basicOpen, setBasicOpen] = useState(false);
  const [smOpen, setSmOpen] = useState(false);
  const [mdOpen, setMdOpen] = useState(false);
  const [lgOpen, setLgOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <div>
      <Breadcrumb />
      <PageHeader
        title="Modal"
        description="Modals display content in a layer above the page, requiring user interaction."
      />

      <div className="flex flex-col gap-8">
        {/* Basic Modal */}
        <Playground
          title="Basic"
          description="A simple modal with title, body content, and footer actions."
          code={`const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open Modal</Button>
<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Welcome"
  footer={
    <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
      <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
      <Button onClick={() => setOpen(false)}>Continue</Button>
    </div>
  }
>
  <p>This is a basic modal dialog. You can place any content here.</p>
</Modal>`}
        >
          <Button onClick={() => setBasicOpen(true)}>Open Modal</Button>
          <Modal
            open={basicOpen}
            onClose={() => setBasicOpen(false)}
            title="Welcome"
            footer={
              <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
                <Button variant="ghost" onClick={() => setBasicOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setBasicOpen(false)}>Continue</Button>
              </div>
            }
          >
            <p style={{ color: "var(--ck-text)", margin: 0 }}>
              This is a basic modal dialog. You can place any content here.
            </p>
          </Modal>
        </Playground>

        {/* Sizes */}
        <Playground
          title="Sizes"
          description="Modals support sm, md, and lg sizes."
          code={`<Modal open={open} onClose={onClose} title="Small Modal" size="sm">
  <p>Small modal content</p>
</Modal>

<Modal open={open} onClose={onClose} title="Medium Modal" size="md">
  <p>Medium modal content</p>
</Modal>

<Modal open={open} onClose={onClose} title="Large Modal" size="lg">
  <p>Large modal content</p>
</Modal>`}
        >
          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => setSmOpen(true)}>
              Small
            </Button>
            <Button variant="secondary" onClick={() => setMdOpen(true)}>
              Medium
            </Button>
            <Button variant="secondary" onClick={() => setLgOpen(true)}>
              Large
            </Button>
          </div>

          <Modal
            open={smOpen}
            onClose={() => setSmOpen(false)}
            title="Small Modal"
            size="sm"
            footer={
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button onClick={() => setSmOpen(false)}>Close</Button>
              </div>
            }
          >
            <p style={{ color: "var(--ck-text)", margin: 0 }}>
              This is a small modal — great for simple confirmations.
            </p>
          </Modal>

          <Modal
            open={mdOpen}
            onClose={() => setMdOpen(false)}
            title="Medium Modal"
            size="md"
            footer={
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button onClick={() => setMdOpen(false)}>Close</Button>
              </div>
            }
          >
            <p style={{ color: "var(--ck-text)", margin: 0 }}>
              This is the default medium-sized modal, suitable for most use cases.
            </p>
          </Modal>

          <Modal
            open={lgOpen}
            onClose={() => setLgOpen(false)}
            title="Large Modal"
            size="lg"
            footer={
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button onClick={() => setLgOpen(false)}>Close</Button>
              </div>
            }
          >
            <p style={{ color: "var(--ck-text)", margin: 0 }}>
              This is a large modal — ideal for forms, detailed content, or multi-step
              workflows that need more space.
            </p>
          </Modal>
        </Playground>

        {/* Confirm Dialog */}
        <Playground
          title="Confirm Dialog"
          description="A realistic destructive action confirmation dialog."
          code={`const [open, setOpen] = useState(false);

<Button variant="danger" onClick={() => setOpen(true)}>
  Delete Account
</Button>
<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Delete Account"
  size="sm"
  footer={
    <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
      <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
      <Button variant="danger" onClick={() => setOpen(false)}>Delete</Button>
    </div>
  }
>
  <p>Are you sure you want to delete your account? This action cannot be undone.</p>
</Modal>`}
        >
          <Button variant="danger" onClick={() => setConfirmOpen(true)}>
            Delete Account
          </Button>
          <Modal
            open={confirmOpen}
            onClose={() => setConfirmOpen(false)}
            title="Delete Account"
            size="sm"
            footer={
              <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
                <Button variant="ghost" onClick={() => setConfirmOpen(false)}>
                  Cancel
                </Button>
                <Button variant="danger" onClick={() => setConfirmOpen(false)}>
                  Delete
                </Button>
              </div>
            }
          >
            <p style={{ color: "var(--ck-text)", margin: 0 }}>
              Are you sure you want to delete your account? This action cannot be
              undone and all your data will be permanently removed.
            </p>
          </Modal>
        </Playground>

        {/* Props Table */}
        <PropsTable
          props={[
            {
              name: "open",
              type: "boolean",
              description: "Whether the modal is visible.",
            },
            {
              name: "onClose",
              type: "() => void",
              description: "Callback when the modal is requested to close.",
            },
            {
              name: "title",
              type: "string",
              description: "Optional title displayed in the modal header.",
            },
            {
              name: "size",
              type: '"sm" | "md" | "lg"',
              default: '"md"',
              description: "Controls the width of the modal.",
            },
            {
              name: "closeOnBackdrop",
              type: "boolean",
              default: "true",
              description: "Whether clicking the backdrop closes the modal.",
            },
            {
              name: "footer",
              type: "ReactNode",
              description: "Content rendered in the modal footer area.",
            },
            {
              name: "children",
              type: "ReactNode",
              description: "The main content of the modal.",
            },
          ]}
        />
        <RelatedComponents component="modal" />

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
                  Always provide a clear close mechanism
                </li>
                <li className="text-sm flex items-start gap-2" style={{ color: "var(--ck-text)" }}>
                  <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--ck-primary)" }} />
                  Focus the first interactive element on open
                </li>
                <li className="text-sm flex items-start gap-2" style={{ color: "var(--ck-text)" }}>
                  <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--ck-primary)" }} />
                  Keep modal content concise
                </li>
                <li className="text-sm flex items-start gap-2" style={{ color: "var(--ck-text)" }}>
                  <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--ck-primary)" }} />
                  Use overlay to indicate background is inactive
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
                  Stack multiple modals
                </li>
                <li className="text-sm flex items-start gap-2" style={{ color: "var(--ck-text)" }}>
                  <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--ck-primary)" }} />
                  Use modals for simple confirmations (use alerts)
                </li>
                <li className="text-sm flex items-start gap-2" style={{ color: "var(--ck-text)" }}>
                  <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--ck-primary)" }} />
                  Put scrollable content in modals
                </li>
                <li className="text-sm flex items-start gap-2" style={{ color: "var(--ck-text)" }}>
                  <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--ck-primary)" }} />
                  Open modals on page load without user action
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
                  <td className="px-5 py-3" style={{ color: "var(--ck-text)" }}>Focus trap</td>
                  <td className="px-5 py-3" style={{ color: "var(--ck-text-muted)" }}>Keeps focus within the modal while open</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--ck-border)" }}>
                  <td className="px-5 py-3" style={{ color: "var(--ck-text)" }}>Escape to close</td>
                  <td className="px-5 py-3" style={{ color: "var(--ck-text-muted)" }}>Pressing Escape dismisses the modal</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--ck-border)" }}>
                  <td className="px-5 py-3" style={{ color: "var(--ck-text)" }}>aria-modal=&quot;true&quot;</td>
                  <td className="px-5 py-3" style={{ color: "var(--ck-text-muted)" }}>Indicates a modal dialog to assistive technologies</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--ck-border)" }}>
                  <td className="px-5 py-3" style={{ color: "var(--ck-text)" }}>role=&quot;dialog&quot;</td>
                  <td className="px-5 py-3" style={{ color: "var(--ck-text-muted)" }}>Identifies the element as a dialog</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--ck-border)" }}>
                  <td className="px-5 py-3" style={{ color: "var(--ck-text)" }}>Focus returns to trigger</td>
                  <td className="px-5 py-3" style={{ color: "var(--ck-text-muted)" }}>Focus moves back to the trigger element on close</td>
                </tr>
                <tr>
                  <td className="px-5 py-3" style={{ color: "var(--ck-text)" }}>aria-labelledby</td>
                  <td className="px-5 py-3" style={{ color: "var(--ck-text-muted)" }}>Links the modal to its title for screen readers</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
