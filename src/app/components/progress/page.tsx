"use client";

import { useState, useEffect } from "react";
import { Progress, Button } from "@cookest/ui";
import { PageHeader, Playground, PropsTable } from "@/components/Playground";
import { RelatedComponents } from "@/components/RelatedComponents";
import { Breadcrumb } from "@/components/Breadcrumb";

export default function ProgressPage() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!uploading) return;
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        const next = prev + 100 / 30;
        if (next >= 100) {
          clearInterval(interval);
          setUploading(false);
          setDone(true);
          return 100;
        }
        return next;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [uploading]);

  const startUpload = () => {
    setUploadProgress(0);
    setDone(false);
    setUploading(true);
  };

  return (
    <div>
      <Breadcrumb />
      <PageHeader
        title="Progress"
        description="Progress bars indicate operation completion, with support for determinate values, indeterminate state, sizes, colors, and striped patterns."
      />

      <div className="flex flex-col gap-8">
        {/* Basic */}
        <Playground
          title="Basic"
          description="Determinate progress bars at various completion levels."
          code={`<Progress value={25} label="25%" showValue />
<Progress value={50} label="50%" showValue />
<Progress value={75} label="75%" showValue />
<Progress value={100} label="100%" showValue />`}
        >
          <div className="flex flex-col gap-4 w-full max-w-sm">
            <Progress value={25} label="25%" showValue />
            <Progress value={50} label="50%" showValue />
            <Progress value={75} label="75%" showValue />
            <Progress value={100} label="100%" showValue />
          </div>
        </Playground>

        {/* Indeterminate */}
        <Playground
          title="Indeterminate"
          description="Use when progress is unknown — omit the value prop."
          code={`<Progress label="Loading…" />`}
        >
          <div className="w-full max-w-sm">
            <Progress label="Loading…" />
          </div>
        </Playground>

        {/* Sizes */}
        <Playground
          title="Sizes"
          description="Four sizes: xs, sm, md (default), and lg."
          code={`<Progress value={60} size="xs" label="Extra Small" />
<Progress value={60} size="sm" label="Small" />
<Progress value={60} size="md" label="Medium" />
<Progress value={60} size="lg" label="Large" />`}
        >
          <div className="flex flex-col gap-4 w-full max-w-sm">
            <Progress value={60} size="xs" label="Extra Small" />
            <Progress value={60} size="sm" label="Small" />
            <Progress value={60} size="md" label="Medium" />
            <Progress value={60} size="lg" label="Large" />
          </div>
        </Playground>

        {/* Colors */}
        <Playground
          title="Colors"
          description="Four semantic color variants at 65% completion."
          code={`<Progress value={65} color="primary" label="Primary" showValue />
<Progress value={65} color="success" label="Success" showValue />
<Progress value={65} color="warning" label="Warning" showValue />
<Progress value={65} color="error" label="Error" showValue />`}
        >
          <div className="flex flex-col gap-4 w-full max-w-sm">
            <Progress value={65} color="primary" label="Primary" showValue />
            <Progress value={65} color="success" label="Success" showValue />
            <Progress value={65} color="warning" label="Warning" showValue />
            <Progress value={65} color="error" label="Error" showValue />
          </div>
        </Playground>

        {/* Striped */}
        <Playground
          title="Striped"
          description="Add a diagonal stripe pattern with the striped prop — useful for active transfers."
          code={`<Progress value={70} label="Regular" showValue />
<Progress value={70} striped label="Striped" showValue />`}
        >
          <div className="flex flex-col gap-4 w-full max-w-sm">
            <Progress value={70} label="Regular" showValue />
            <Progress value={70} striped label="Striped" showValue />
          </div>
        </Playground>

        {/* Live Demo */}
        <Playground
          title="Live Demo: Upload"
          description="Simulate a file upload with real-time progress animation over 3 seconds."
          code={`const [progress, setProgress] = useState(0);
const [uploading, setUploading] = useState(false);
const [done, setDone] = useState(false);

useEffect(() => {
  if (!uploading) return;
  const interval = setInterval(() => {
    setProgress((prev) => {
      const next = prev + 100 / 30;
      if (next >= 100) {
        clearInterval(interval);
        setUploading(false);
        setDone(true);
        return 100;
      }
      return next;
    });
  }, 100);
  return () => clearInterval(interval);
}, [uploading]);

<Progress
  value={Math.round(progress)}
  color={done ? "success" : "primary"}
  label={done ? "Upload complete!" : uploading ? \`Uploading... \${Math.round(progress)}%\` : "Ready to upload"}
  showValue={!done}
  striped={uploading}
/>
<Button onClick={startUpload} disabled={uploading}>
  {done ? "Upload Again" : uploading ? "Uploading…" : "Start Upload"}
</Button>`}
        >
          <div className="flex flex-col items-center gap-5 w-full max-w-sm">
            <Progress
              value={Math.round(uploadProgress)}
              color={done ? "success" : "primary"}
              label={
                done
                  ? "Upload complete!"
                  : uploading
                  ? `Uploading... ${Math.round(uploadProgress)}%`
                  : "Ready to upload"
              }
              showValue={!done}
              striped={uploading}
            />
            <Button
              onClick={startUpload}
              disabled={uploading}
              variant={done ? "secondary" : "primary"}
            >
              {done ? "Upload Again" : uploading ? "Uploading…" : "Start Upload"}
            </Button>
          </div>
        </Playground>

        {/* Props Table */}
        <PropsTable
          props={[
            {
              name: "value",
              type: "number",
              description: "Progress percentage (0–100). Omit for indeterminate animation.",
            },
            {
              name: "label",
              type: "string",
              description: "Label shown above the track.",
            },
            {
              name: "showValue",
              type: "boolean",
              default: "false",
              description: "Display the numeric percentage alongside the label.",
            },
            {
              name: "size",
              type: '"xs" | "sm" | "md" | "lg"',
              default: '"md"',
              description: "Height of the progress track.",
            },
            {
              name: "color",
              type: '"primary" | "success" | "warning" | "error"',
              default: '"primary"',
              description: "Fill color of the progress bar.",
            },
            {
              name: "striped",
              type: "boolean",
              default: "false",
              description: "Applies a diagonal stripe overlay pattern.",
            },
            {
              name: "animated",
              type: "boolean",
              default: "false",
              description: "Adds a pulse animation to the filled bar.",
            },
            {
              name: "rounded",
              type: "boolean",
              default: "true",
              description: "Rounds the ends of the track and fill bar.",
            },
          ]}
        />

        <RelatedComponents component="progress" />
      </div>
    </div>
  );
}
