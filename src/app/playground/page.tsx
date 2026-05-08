"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Highlight, themes } from "prism-react-renderer";
import { Copy, Check, ChefHat } from "lucide-react";
import {
  Button,
  Input,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Badge,
  Avatar,
  AvatarGroup,
  Alert,
  Select,
  Toggle,
  Tabs,
  Textarea,
  Slider,
  Progress,
  Spinner,
  Skeleton,
  Divider,
  Tooltip,
} from "@cookest/ui";

// ─── Types ────────────────────────────────────────────────────────────────

interface VariantDef {
  name: string;
  code: string;
  preview: React.ReactNode;
}

interface ComponentDef {
  id: string;
  name: string;
  category: string;
  variants: VariantDef[];
}

// ─── Categories ───────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: "inputs", label: "Inputs" },
  { id: "display", label: "Display" },
  { id: "layout", label: "Layout" },
] as const;

// ─── Stateful preview wrappers ────────────────────────────────────────────

function SelectDemo() {
  const [value, setValue] = useState("");
  return (
    <div style={{ width: "100%", maxWidth: "260px" }}>
      <Select
        placeholder="Choose cuisine"
        value={value}
        onChange={setValue}
        options={[
          { value: "italian", label: "Italian" },
          { value: "french", label: "French" },
          { value: "japanese", label: "Japanese" },
          { value: "mexican", label: "Mexican" },
          { value: "thai", label: "Thai" },
        ]}
      />
    </div>
  );
}

function SliderDemo() {
  const [value, setValue] = useState(60);
  return (
    <div style={{ width: "100%", maxWidth: "280px" }}>
      <Slider
        min={0}
        max={100}
        value={value}
        onChange={setValue}
        label="Spice level"
        showValue
      />
    </div>
  );
}

function ToggleDemo() {
  const [a, setA] = useState(false);
  const [b, setB] = useState(true);
  return (
    <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
        <Toggle checked={a} onChange={(e) => setA(e.target.checked)} />
        <span style={{ fontSize: "11px", color: "var(--ck-text-muted)", fontFamily: "var(--font-sans)" }}>
          Off
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
        <Toggle checked={b} onChange={(e) => setB(e.target.checked)} />
        <span style={{ fontSize: "11px", color: "var(--ck-text-muted)", fontFamily: "var(--font-sans)" }}>
          On
        </span>
      </div>
    </div>
  );
}

function TabsDemo() {
  return (
    <div style={{ width: "100%", maxWidth: "380px" }}>
      <Tabs
        defaultTab="ingredients"
        items={[
          {
            id: "ingredients",
            label: "Ingredients",
            content: (
              <p style={{ fontSize: "13px", color: "var(--ck-text)", lineHeight: 1.8, padding: "8px 0" }}>
                400g spaghetti · 200g guanciale · 4 eggs · 100g Pecorino Romano
              </p>
            ),
          },
          {
            id: "method",
            label: "Method",
            content: (
              <p style={{ fontSize: "13px", color: "var(--ck-text)", lineHeight: 1.7, padding: "8px 0" }}>
                Boil pasta al dente. Fry guanciale crispy. Whisk eggs with cheese off-heat.
              </p>
            ),
          },
          {
            id: "tips",
            label: "Tips",
            content: (
              <p style={{ fontSize: "13px", color: "var(--ck-text)", lineHeight: 1.7, padding: "8px 0" }}>
                Never add the egg mixture on heat — it will scramble. Reserve pasta water.
              </p>
            ),
          },
        ]}
      />
    </div>
  );
}

function TextareaDemo() {
  const [value, setValue] = useState("");
  return (
    <div style={{ width: "100%", maxWidth: "300px" }}>
      <Textarea
        label="Recipe notes"
        placeholder="Add your preparation notes here…"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={3}
        fullWidth
      />
    </div>
  );
}

// ─── Component Definitions ────────────────────────────────────────────────

const COMPONENT_DEFS: ComponentDef[] = [
  // ── Button ──────────────────────────────────────────────────────────────
  {
    id: "button",
    name: "Button",
    category: "inputs",
    variants: [
      {
        name: "Default",
        code: `<Button>Save Recipe</Button>`,
        preview: <Button>Save Recipe</Button>,
      },
      {
        name: "Secondary",
        code: `<Button variant="secondary">Learn More</Button>`,
        preview: <Button variant="secondary">Learn More</Button>,
      },
      {
        name: "Ghost",
        code: `<Button variant="ghost">Cancel</Button>`,
        preview: <Button variant="ghost">Cancel</Button>,
      },
      {
        name: "Destructive",
        code: `<Button variant="danger">Delete</Button>`,
        preview: <Button variant="danger">Delete</Button>,
      },
      {
        name: "With Icon",
        code: `<Button iconLeft={<ChefHat size={14} />}>Add Recipe</Button>`,
        preview: <Button iconLeft={<ChefHat size={14} />}>Add Recipe</Button>,
      },
      {
        name: "Loading",
        code: `<Button loading>Saving…</Button>`,
        preview: <Button loading>Saving…</Button>,
      },
      {
        name: "Small",
        code: `<Button size="sm">Filter</Button>`,
        preview: <Button size="sm">Filter</Button>,
      },
    ],
  },

  // ── Input ────────────────────────────────────────────────────────────────
  {
    id: "input",
    name: "Input",
    category: "inputs",
    variants: [
      {
        name: "Default",
        code: `<Input placeholder="Search recipes…" />`,
        preview: (
          <div style={{ width: "100%", maxWidth: "260px" }}>
            <Input placeholder="Search recipes…" />
          </div>
        ),
      },
      {
        name: "With Label",
        code: `<Input label="Recipe name" placeholder="Herb-Crusted Salmon" />`,
        preview: (
          <div style={{ width: "100%", maxWidth: "260px" }}>
            <Input label="Recipe name" placeholder="Herb-Crusted Salmon" />
          </div>
        ),
      },
      {
        name: "Error State",
        code: `<Input
  label="Email"
  defaultValue="invalid"
  error="Please enter a valid email"
/>`,
        preview: (
          <div style={{ width: "100%", maxWidth: "260px" }}>
            <Input label="Email" defaultValue="invalid" error="Please enter a valid email" />
          </div>
        ),
      },
      {
        name: "Disabled",
        code: `<Input placeholder="Unavailable" disabled />`,
        preview: (
          <div style={{ width: "100%", maxWidth: "260px" }}>
            <Input placeholder="Unavailable" disabled />
          </div>
        ),
      },
      {
        name: "Small",
        code: `<Input inputSize="sm" placeholder="Quick filter" />`,
        preview: (
          <div style={{ width: "100%", maxWidth: "260px" }}>
            <Input inputSize="sm" placeholder="Quick filter" />
          </div>
        ),
      },
    ],
  },

  // ── Select ───────────────────────────────────────────────────────────────
  {
    id: "select",
    name: "Select",
    category: "inputs",
    variants: [
      {
        name: "Default",
        code: `<Select
  placeholder="Choose cuisine"
  value={value}
  onChange={setValue}
  options={[
    { value: "italian", label: "Italian" },
    { value: "french", label: "French" },
    { value: "japanese", label: "Japanese" },
    { value: "mexican", label: "Mexican" },
    { value: "thai", label: "Thai" },
  ]}
/>`,
        preview: <SelectDemo />,
      },
    ],
  },

  // ── Textarea ─────────────────────────────────────────────────────────────
  {
    id: "textarea",
    name: "Textarea",
    category: "inputs",
    variants: [
      {
        name: "Default",
        code: `<Textarea
  label="Recipe notes"
  placeholder="Add your preparation notes here…"
  rows={3}
  fullWidth
/>`,
        preview: <TextareaDemo />,
      },
    ],
  },

  // ── Slider ───────────────────────────────────────────────────────────────
  {
    id: "slider",
    name: "Slider",
    category: "inputs",
    variants: [
      {
        name: "Default",
        code: `<Slider
  min={0}
  max={100}
  value={value}
  onChange={setValue}
  label="Spice level"
  showValue
/>`,
        preview: <SliderDemo />,
      },
    ],
  },

  // ── Toggle ───────────────────────────────────────────────────────────────
  {
    id: "toggle",
    name: "Toggle",
    category: "inputs",
    variants: [
      {
        name: "States",
        code: `{/* Unchecked */}
<Toggle
  checked={false}
  onChange={(e) => setChecked(e.target.checked)}
/>

{/* Checked */}
<Toggle
  checked={true}
  onChange={(e) => setChecked(e.target.checked)}
/>`,
        preview: <ToggleDemo />,
      },
    ],
  },

  // ── Badge ────────────────────────────────────────────────────────────────
  {
    id: "badge",
    name: "Badge",
    category: "display",
    variants: [
      {
        name: "All Variants",
        code: `<Badge variant="default">Default</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="info">Info</Badge>`,
        preview: (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            <Badge variant="default">Default</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="info">Info</Badge>
          </div>
        ),
      },
      {
        name: "Sizes",
        code: `<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>`,
        preview: (
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <Badge size="sm">Small</Badge>
            <Badge size="md">Medium</Badge>
            <Badge size="lg">Large</Badge>
          </div>
        ),
      },
      {
        name: "With Dot",
        code: `<Badge variant="success" dot>Live</Badge>
<Badge variant="warning" dot>Pending</Badge>
<Badge variant="error" dot>Offline</Badge>`,
        preview: (
          <div style={{ display: "flex", gap: "8px" }}>
            <Badge variant="success" dot>Live</Badge>
            <Badge variant="warning" dot>Pending</Badge>
            <Badge variant="error" dot>Offline</Badge>
          </div>
        ),
      },
    ],
  },

  // ── Avatar ───────────────────────────────────────────────────────────────
  {
    id: "avatar",
    name: "Avatar",
    category: "display",
    variants: [
      {
        name: "Sizes",
        code: `<Avatar alt="Julia Child" size="sm" initials="JC" />
<Avatar alt="Gordon Ramsay" size="md" initials="GR" />
<Avatar alt="Nigella Lawson" size="lg" initials="NL" />`,
        preview: (
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <Avatar alt="Julia Child" size="sm" initials="JC" />
            <Avatar alt="Gordon Ramsay" size="md" initials="GR" />
            <Avatar alt="Nigella Lawson" size="lg" initials="NL" />
          </div>
        ),
      },
      {
        name: "AvatarGroup",
        code: `<AvatarGroup max={4}>
  <Avatar alt="Julia Child" initials="JC" />
  <Avatar alt="Gordon Ramsay" initials="GR" />
  <Avatar alt="Nigella Lawson" initials="NL" />
  <Avatar alt="Yotam Ottolenghi" initials="YO" />
  <Avatar alt="Jamie Oliver" initials="JO" />
</AvatarGroup>`,
        preview: (
          <AvatarGroup max={4}>
            <Avatar alt="Julia Child" initials="JC" />
            <Avatar alt="Gordon Ramsay" initials="GR" />
            <Avatar alt="Nigella Lawson" initials="NL" />
            <Avatar alt="Yotam Ottolenghi" initials="YO" />
            <Avatar alt="Jamie Oliver" initials="JO" />
          </AvatarGroup>
        ),
      },
    ],
  },

  // ── Card ─────────────────────────────────────────────────────────────────
  {
    id: "card",
    name: "Card",
    category: "display",
    variants: [
      {
        name: "Default",
        code: `<Card>
  <CardHeader>Pasta Carbonara</CardHeader>
  <CardBody>
    A rich Roman pasta with eggs, Pecorino,
    and guanciale — no cream needed.
  </CardBody>
  <CardFooter>
    <Badge variant="success" size="sm">Published</Badge>
    <Badge variant="info" size="sm">Italian</Badge>
  </CardFooter>
</Card>`,
        preview: (
          <Card style={{ maxWidth: "280px", width: "100%" }}>
            <CardHeader>Pasta Carbonara</CardHeader>
            <CardBody>A rich Roman pasta with eggs, Pecorino, and guanciale — no cream needed.</CardBody>
            <CardFooter>
              <div style={{ display: "flex", gap: "6px" }}>
                <Badge variant="success" size="sm">Published</Badge>
                <Badge variant="info" size="sm">Italian</Badge>
              </div>
            </CardFooter>
          </Card>
        ),
      },
      {
        name: "Interactive",
        code: `<Card variant="interactive">
  <CardHeader>Herb-Crusted Salmon</CardHeader>
  <CardBody>
    Hover or tap to see the interactive
    lift and shadow effect.
  </CardBody>
</Card>`,
        preview: (
          <Card variant="interactive" style={{ maxWidth: "280px", width: "100%" }}>
            <CardHeader>Herb-Crusted Salmon</CardHeader>
            <CardBody>Hover or tap to see the interactive lift and shadow effect.</CardBody>
          </Card>
        ),
      },
    ],
  },

  // ── Progress ─────────────────────────────────────────────────────────────
  {
    id: "progress",
    name: "Progress",
    category: "display",
    variants: [
      {
        name: "Values",
        code: `<Progress value={25} label="Prep time" showValue />
<Progress value={60} color="warning" label="Cooking" showValue />
<Progress value={90} color="success" label="Almost done" showValue />`,
        preview: (
          <div style={{ width: "100%", maxWidth: "280px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <Progress value={25} label="Prep time" showValue />
            <Progress value={60} color="warning" label="Cooking" showValue />
            <Progress value={90} color="success" label="Almost done" showValue />
          </div>
        ),
      },
    ],
  },

  // ── Spinner ──────────────────────────────────────────────────────────────
  {
    id: "spinner",
    name: "Spinner",
    category: "display",
    variants: [
      {
        name: "Sizes",
        code: `<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />`,
        preview: (
          <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
          </div>
        ),
      },
    ],
  },

  // ── Skeleton ─────────────────────────────────────────────────────────────
  {
    id: "skeleton",
    name: "Skeleton",
    category: "display",
    variants: [
      {
        name: "Variants",
        code: `{/* Text lines */}
<Skeleton variant="text" lines={3} />

{/* With avatar */}
<div style={{ display: "flex", gap: "12px" }}>
  <Skeleton variant="circular" width={40} height={40} />
  <Skeleton variant="text" lines={2} />
</div>

{/* Rectangular block */}
<Skeleton variant="rectangular" height={80} />`,
        preview: (
          <div style={{ width: "100%", maxWidth: "280px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <Skeleton variant="text" lines={3} />
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <Skeleton variant="circular" width={40} height={40} />
              <div style={{ flex: 1 }}>
                <Skeleton variant="text" lines={2} />
              </div>
            </div>
            <Skeleton variant="rectangular" height={80} />
          </div>
        ),
      },
    ],
  },

  // ── Alert ────────────────────────────────────────────────────────────────
  {
    id: "alert",
    name: "Alert",
    category: "display",
    variants: [
      {
        name: "All Variants",
        code: `<Alert variant="info" title="Did you know?">
  Carbonara should never contain cream.
</Alert>
<Alert variant="success" title="Recipe saved">
  Your recipe has been published.
</Alert>
<Alert variant="warning" title="Heads up">
  This recipe contains tree nuts.
</Alert>
<Alert variant="error" title="Uh oh">
  Something went wrong saving your recipe.
</Alert>`,
        preview: (
          <div style={{ width: "100%", maxWidth: "340px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <Alert variant="info" title="Did you know?">Carbonara should never contain cream.</Alert>
            <Alert variant="success" title="Recipe saved">Your recipe has been published.</Alert>
            <Alert variant="warning" title="Heads up">This recipe contains tree nuts.</Alert>
            <Alert variant="error" title="Uh oh">Something went wrong saving your recipe.</Alert>
          </div>
        ),
      },
    ],
  },

  // ── Divider ──────────────────────────────────────────────────────────────
  {
    id: "divider",
    name: "Divider",
    category: "layout",
    variants: [
      {
        name: "Horizontal",
        code: `<Divider />
<Divider label="or continue with" />`,
        preview: (
          <div style={{ width: "100%", maxWidth: "300px", display: "flex", flexDirection: "column", gap: "20px" }}>
            <Divider />
            <Divider label="or continue with" />
          </div>
        ),
      },
      {
        name: "Vertical",
        code: `<div style={{ display: "flex", height: "40px", alignItems: "center" }}>
  <span>Starters</span>
  <Divider orientation="vertical" />
  <span>Mains</span>
  <Divider orientation="vertical" />
  <span>Desserts</span>
</div>`,
        preview: (
          <div style={{ display: "flex", height: "40px", alignItems: "center", gap: "4px" }}>
            <span style={{ fontSize: "13px", color: "var(--ck-text)" }}>Starters</span>
            <Divider orientation="vertical" />
            <span style={{ fontSize: "13px", color: "var(--ck-text)" }}>Mains</span>
            <Divider orientation="vertical" />
            <span style={{ fontSize: "13px", color: "var(--ck-text)" }}>Desserts</span>
          </div>
        ),
      },
    ],
  },

  // ── Tabs ─────────────────────────────────────────────────────────────────
  {
    id: "tabs",
    name: "Tabs",
    category: "layout",
    variants: [
      {
        name: "Underline",
        code: `<Tabs
  defaultTab="ingredients"
  items={[
    {
      id: "ingredients",
      label: "Ingredients",
      content: <p>400g spaghetti · 200g guanciale…</p>,
    },
    {
      id: "method",
      label: "Method",
      content: <p>Boil pasta al dente…</p>,
    },
    {
      id: "tips",
      label: "Tips",
      content: <p>Never add egg on heat…</p>,
    },
  ]}
/>`,
        preview: <TabsDemo />,
      },
    ],
  },

  // ── Tooltip ──────────────────────────────────────────────────────────────
  {
    id: "tooltip",
    name: "Tooltip",
    category: "layout",
    variants: [
      {
        name: "Default",
        code: `<Tooltip content="Add to your recipe book">
  <Button variant="ghost" size="sm">Hover me</Button>
</Tooltip>`,
        preview: (
          <Tooltip content="Add to your recipe book">
            <Button variant="ghost" size="sm">Hover me</Button>
          </Tooltip>
        ),
      },
      {
        name: "Positions",
        code: `<Tooltip content="Above" position="top">
  <Button size="sm">Top</Button>
</Tooltip>
<Tooltip content="Below" position="bottom">
  <Button size="sm">Bottom</Button>
</Tooltip>
<Tooltip content="Left side" position="left">
  <Button size="sm">Left</Button>
</Tooltip>
<Tooltip content="Right side" position="right">
  <Button size="sm">Right</Button>
</Tooltip>`,
        preview: (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center" }}>
            <Tooltip content="Above" position="top">
              <Button size="sm">Top</Button>
            </Tooltip>
            <Tooltip content="Below" position="bottom">
              <Button size="sm">Bottom</Button>
            </Tooltip>
            <Tooltip content="Left side" position="left">
              <Button size="sm">Left</Button>
            </Tooltip>
            <Tooltip content="Right side" position="right">
              <Button size="sm">Right</Button>
            </Tooltip>
          </div>
        ),
      },
    ],
  },
];

// ─── CodeBlock ────────────────────────────────────────────────────────────

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [code]);

  return (
    <div style={{ position: "relative" }}>
      <Highlight theme={themes.oneDark} code={code.trim()} language="jsx">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={className}
            style={{
              ...style,
              margin: 0,
              padding: "14px 16px",
              borderRadius: "0 0 14px 14px",
              fontSize: "12.5px",
              lineHeight: 1.7,
              maxHeight: "200px",
              overflowY: "auto",
              overflowX: "auto",
              fontFamily: "var(--font-mono), monospace",
              background: "#1e1e2e",
            }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>

      <motion.button
        onClick={handleCopy}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Copy code"
        style={{
          position: "absolute",
          top: "8px",
          right: "8px",
          width: "28px",
          height: "28px",
          borderRadius: "6px",
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "rgba(255,255,255,0.65)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span
              key="check"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ duration: 0.15 }}
              style={{ display: "flex", color: "#a6e3a1" }}
            >
              <Check size={13} />
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ duration: 0.15 }}
              style={{ display: "flex" }}
            >
              <Copy size={13} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}

// ─── VariantCard ──────────────────────────────────────────────────────────

function VariantCard({ variant, index }: { variant: VariantDef; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      style={{
        borderRadius: "16px",
        background: "var(--ck-surface)",
        border: "1px solid var(--ck-border)",
        overflow: "hidden",
      }}
    >
      {/* Label */}
      <div
        style={{
          padding: "10px 16px",
          borderBottom: "1px solid var(--ck-border)",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span
          style={{
            fontSize: "11px",
            fontWeight: 600,
            color: "var(--ck-text-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.07em",
            fontFamily: "var(--font-sans)",
          }}
        >
          {variant.name}
        </span>
      </div>

      {/* Preview */}
      <div
        className="dot-grid-pattern"
        style={{
          padding: "36px 24px",
          minHeight: "120px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "1px solid var(--ck-border)",
        }}
      >
        {variant.preview}
      </div>

      {/* Code block */}
      <CodeBlock code={variant.code} />
    </motion.div>
  );
}

// ─── ComponentSidebar ─────────────────────────────────────────────────────

function ComponentSidebar({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <aside
      style={{
        width: "220px",
        flexShrink: 0,
        position: "sticky",
        top: "1rem",
        maxHeight: "calc(100vh - 3rem)",
        overflowY: "auto",
        paddingRight: "4px",
      }}
    >
      <div
        style={{
          borderRadius: "14px",
          background: "var(--ck-surface)",
          border: "1px solid var(--ck-border)",
          overflow: "hidden",
          padding: "6px",
        }}
      >
        {CATEGORIES.map((cat) => {
          const components = COMPONENT_DEFS.filter((c) => c.category === cat.id);
          return (
            <div key={cat.id} style={{ marginBottom: "4px" }}>
              <div
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  color: "var(--ck-text-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  padding: "8px 10px 4px",
                  fontFamily: "var(--font-sans)",
                }}
              >
                {cat.label}
              </div>
              {components.map((comp) => {
                const isActive = selected === comp.id;
                return (
                  <motion.button
                    key={comp.id}
                    onClick={() => onSelect(comp.id)}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "7px 10px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      border: "none",
                      fontFamily: "var(--font-sans)",
                      fontSize: "13px",
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? "var(--ck-primary)" : "var(--ck-text)",
                      background: isActive ? "rgba(122,154,101,0.1)" : "transparent",
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      transition: "background 0.15s, color 0.15s",
                    }}
                    whileHover={!isActive ? { backgroundColor: "var(--ck-bg-card)" } : {}}
                    whileTap={{ scale: 0.97 }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="sidebar-active-dot"
                        style={{
                          width: "5px",
                          height: "5px",
                          borderRadius: "50%",
                          background: "var(--ck-primary)",
                          flexShrink: 0,
                          display: "inline-block",
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    {!isActive && (
                      <span
                        style={{
                          width: "5px",
                          height: "5px",
                          flexShrink: 0,
                          display: "inline-block",
                        }}
                      />
                    )}
                    {comp.name}
                  </motion.button>
                );
              })}
            </div>
          );
        })}
      </div>
    </aside>
  );
}

// ─── MobileTabs ───────────────────────────────────────────────────────────

function MobileTabs({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (id: string) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current?.querySelector(`[data-active="true"]`) as HTMLElement | null;
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [selected]);

  return (
    <div
      ref={scrollRef}
      style={{
        display: "flex",
        gap: "6px",
        overflowX: "auto",
        paddingBottom: "4px",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        WebkitOverflowScrolling: "touch",
      }}
    >
      {COMPONENT_DEFS.map((comp) => {
        const isActive = selected === comp.id;
        return (
          <motion.button
            key={comp.id}
            data-active={isActive}
            onClick={() => onSelect(comp.id)}
            whileTap={{ scale: 0.95 }}
            style={{
              flexShrink: 0,
              padding: "6px 12px",
              borderRadius: "20px",
              border: isActive ? "1px solid var(--ck-primary)" : "1px solid var(--ck-border)",
              background: isActive ? "rgba(122,154,101,0.12)" : "var(--ck-surface)",
              color: isActive ? "var(--ck-primary)" : "var(--ck-text)",
              fontSize: "12px",
              fontWeight: isActive ? 600 : 400,
              fontFamily: "var(--font-sans)",
              cursor: "pointer",
              transition: "all 0.15s",
              whiteSpace: "nowrap",
            }}
          >
            {comp.name}
          </motion.button>
        );
      })}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────

export default function PlaygroundPage() {
  const [selectedId, setSelectedId] = useState("button");

  const selectedComp = COMPONENT_DEFS.find((c) => c.id === selectedId) ?? COMPONENT_DEFS[0];

  return (
    <div style={{ fontFamily: "var(--font-sans)" }}>
      {/* Page header */}
      <div style={{ marginBottom: "28px" }}>
        <h1
          style={{
            fontSize: "clamp(22px, 4vw, 30px)",
            fontWeight: 700,
            color: "var(--ck-heading)",
            margin: "0 0 8px",
            letterSpacing: "-0.02em",
            fontFamily: "var(--font-sans)",
          }}
        >
          Playground
        </h1>
        <p
          style={{
            fontSize: "14px",
            color: "var(--ck-text-muted)",
            margin: 0,
            lineHeight: 1.6,
            fontFamily: "var(--font-sans)",
          }}
        >
          Browse component variants, see them live, and copy the code.
        </p>
      </div>

      {/* Mobile tabs */}
      <div className="block md:hidden" style={{ marginBottom: "20px" }}>
        <MobileTabs selected={selectedId} onSelect={setSelectedId} />
      </div>

      {/* Two-column layout */}
      <div
        style={{
          display: "flex",
          gap: "24px",
          alignItems: "flex-start",
        }}
      >
        {/* Sidebar — desktop only */}
        <div className="hidden md:block">
          <ComponentSidebar selected={selectedId} onSelect={setSelectedId} />
        </div>

        {/* Main content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Section heading */}
              <div style={{ marginBottom: "20px" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
                  <h2
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "var(--ck-heading)",
                      margin: 0,
                      letterSpacing: "-0.01em",
                      fontFamily: "var(--font-sans)",
                    }}
                  >
                    {selectedComp.name}
                  </h2>
                  <span
                    style={{
                      fontSize: "12px",
                      color: "var(--ck-text-muted)",
                      fontFamily: "var(--font-sans)",
                    }}
                  >
                    {selectedComp.variants.length} variant{selectedComp.variants.length !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>

              {/* Variant cards */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 420px), 1fr))",
                  gap: "16px",
                }}
              >
                {selectedComp.variants.map((variant, i) => (
                  <VariantCard key={variant.name} variant={variant} index={i} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
