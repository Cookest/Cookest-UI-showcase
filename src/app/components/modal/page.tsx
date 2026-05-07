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
      </div>
    </div>
  );
}
