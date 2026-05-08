"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  Component,
  type ReactNode,
} from "react";
import { Highlight, themes } from "prism-react-renderer";
import {
  Button,
  Input,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Badge,
  Toggle,
  Tooltip,
  Select,
  Tabs,
  Textarea,
  Slider,
  Progress,
  Spinner,
} from "@cookest/ui";
import { Grain } from "@/components/Grain";
import { Copy, Check, RefreshCcw, Code2, Settings2, Play } from "lucide-react";

// ═══════════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════════

type PlaygroundMode = "props" | "sandbox";
type PropControlType = "select" | "boolean" | "string" | "number";

interface PropDef {
  type: PropControlType;
  options?: string[];
  default: string | boolean | number;
  label: string;
  min?: number;
  max?: number;
  step?: number;
}

interface ExtraState {
  toggleChecked: boolean;
  setToggleChecked: (v: boolean) => void;
}

interface ComponentConfig {
  name: string;
  props: Record<string, PropDef>;
  render: (props: Record<string, any>, extra?: ExtraState) => ReactNode;
}

// ═══════════════════════════════════════════════════════════════════════
// ErrorBoundary
// ═══════════════════════════════════════════════════════════════════════

interface EBProps { children: ReactNode; resetKey?: unknown; }
interface EBState { error: string | null; }

class ErrorBoundary extends Component<EBProps, EBState> {
  constructor(props: EBProps) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(err: Error): EBState {
    return { error: err.message };
  }
  componentDidUpdate(prev: EBProps) {
    if (prev.resetKey !== this.props.resetKey && this.state.error) {
      this.setState({ error: null });
    }
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{
          padding: "14px 16px",
          background: "rgba(239,68,68,0.07)",
          border: "1px solid rgba(239,68,68,0.2)",
          borderRadius: "10px",
          color: "#f87171",
          fontFamily: "var(--font-mono), monospace",
          fontSize: "12px",
          lineHeight: 1.6,
          wordBreak: "break-word",
        }}>
          <div style={{ fontWeight: 700, marginBottom: "6px" }}>⚠ Runtime Error</div>
          {this.state.error}
        </div>
      );
    }
    return this.props.children;
  }
}

// ═══════════════════════════════════════════════════════════════════════
// Utilities
// ═══════════════════════════════════════════════════════════════════════

function propsToCode(
  componentName: string,
  props: Record<string, any>,
  defaults: Record<string, any>,
): string {
  const entries = Object.entries(props).filter(([k, v]) => {
    if (k === "children") return false;
    if (v === defaults[k]) return false;
    if (v === "" || v === undefined || v === null) return false;
    return true;
  });
  const attrs = entries.map(([k, v]) => {
    if (typeof v === "boolean") return v ? k : `${k}={false}`;
    if (typeof v === "number") return `${k}={${v}}`;
    return `${k}="${v}"`;
  });
  const attrStr = attrs.length > 0 ? "\n  " + attrs.join("\n  ") + "\n" : "";
  const children = (props.children ?? defaults.children) as string | undefined;
  if (children) {
    return `<${componentName}${attrStr}>\n  ${children}\n</${componentName}>`;
  }
  return `<${componentName}${attrStr}/>`;
}

function useCopyToClipboard() {
  const [copied, setCopied] = useState(false);
  const copy = useCallback((text: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);
  return { copied, copy };
}

// ═══════════════════════════════════════════════════════════════════════
// Demo wrappers — stateful helpers for prop editor interactive components
// ═══════════════════════════════════════════════════════════════════════

function SelectPropDemo({ label, placeholder, disabled, searchable }: {
  label: string; placeholder: string; disabled: boolean; searchable: boolean;
}) {
  const [value, setValue] = useState("");
  return (
    <div style={{ width: "100%", maxWidth: "280px" }}>
      <Select
        label={label || undefined}
        placeholder={placeholder}
        value={value}
        onChange={setValue}
        disabled={disabled}
        searchable={searchable}
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

function SliderPropDemo({ min, max, step, label, showValue, disabled, size, color, defaultValue }: any) {
  const [value, setValue] = useState(Number(defaultValue ?? 50));
  useEffect(() => { setValue(Number(defaultValue ?? 50)); }, [defaultValue]);
  return (
    <div style={{ width: "100%", maxWidth: "300px" }}>
      <Slider
        min={Number(min)} max={Number(max)} step={Number(step) || 1}
        value={value} onChange={setValue}
        label={label || undefined}
        showValue={showValue}
        disabled={disabled}
        size={size}
        color={color}
      />
    </div>
  );
}

function TextareaPropDemo({ label, placeholder, disabled, inputSize, helperText, maxLength, showCount, resize }: any) {
  const [value, setValue] = useState("");
  return (
    <div style={{ width: "100%", maxWidth: "300px" }}>
      <Textarea
        label={label || undefined}
        placeholder={placeholder || undefined}
        disabled={disabled}
        inputSize={inputSize}
        helperText={helperText || undefined}
        maxLength={Number(maxLength) > 0 ? Number(maxLength) : undefined}
        showCount={showCount}
        resize={resize}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={4}
        fullWidth
      />
    </div>
  );
}

function TabsPropDemo({ variant, size, fullWidth }: any) {
  return (
    <div style={{ width: "100%", maxWidth: "420px" }}>
      <Tabs
        variant={variant}
        size={size}
        fullWidth={fullWidth}
        defaultTab="ingredients"
        items={[
          {
            id: "ingredients",
            label: "Ingredients",
            content: (
              <div style={{ padding: "10px 0", fontSize: "13px", color: "var(--ck-text)", lineHeight: 1.8 }}>
                400g spaghetti · 200g guanciale · 4 eggs · 100g Pecorino Romano
              </div>
            ),
          },
          {
            id: "method",
            label: "Method",
            content: (
              <div style={{ padding: "10px 0", fontSize: "13px", color: "var(--ck-text)", lineHeight: 1.7 }}>
                Boil pasta al dente. Fry guanciale crispy. Whisk eggs with cheese. Combine off-heat.
              </div>
            ),
          },
          {
            id: "tips",
            label: "Tips",
            content: (
              <div style={{ padding: "10px 0", fontSize: "13px", color: "var(--ck-text)", lineHeight: 1.7 }}>
                Never heat the pan when adding egg mixture — it will scramble. Reserve pasta water.
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// Component Configs (Prop Editor)
// ═══════════════════════════════════════════════════════════════════════

const COMPONENT_CONFIGS: ComponentConfig[] = [
  {
    name: "Button",
    props: {
      variant:   { type: "select",  options: ["primary", "secondary", "ghost", "danger"], default: "primary", label: "variant" },
      size:      { type: "select",  options: ["sm", "md", "lg"], default: "md", label: "size" },
      disabled:  { type: "boolean", default: false, label: "disabled" },
      loading:   { type: "boolean", default: false, label: "loading" },
      fullWidth: { type: "boolean", default: false, label: "fullWidth" },
      children:  { type: "string",  default: "Click me", label: "children" },
    },
    render: (p) => (
      <Button variant={p.variant} size={p.size} disabled={p.disabled} loading={p.loading} fullWidth={p.fullWidth}>
        {String(p.children || "Click me")}
      </Button>
    ),
  },
  {
    name: "Badge",
    props: {
      variant:  { type: "select",  options: ["default", "success", "warning", "error", "info"], default: "default", label: "variant" },
      size:     { type: "select",  options: ["sm", "md", "lg"], default: "md", label: "size" },
      dot:      { type: "boolean", default: false, label: "dot" },
      children: { type: "string",  default: "New", label: "children" },
    },
    render: (p) => (
      <Badge variant={p.variant} size={p.size} dot={p.dot}>
        {String(p.children || "New")}
      </Badge>
    ),
  },
  {
    name: "Card",
    props: {
      variant: { type: "select", options: ["default", "interactive", "outlined"], default: "default", label: "variant" },
      padding: { type: "select", options: ["none", "sm", "md", "lg"], default: "md", label: "padding" },
    },
    render: (p) => (
      <Card variant={p.variant} padding={p.padding} style={{ width: "100%", maxWidth: "280px" } as any}>
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
    name: "Select",
    props: {
      label:       { type: "string",  default: "Cuisine", label: "label" },
      placeholder: { type: "string",  default: "Choose cuisine…", label: "placeholder" },
      disabled:    { type: "boolean", default: false, label: "disabled" },
      searchable:  { type: "boolean", default: false, label: "searchable" },
    },
    render: (p) => (
      <SelectPropDemo
        label={p.label}
        placeholder={p.placeholder}
        disabled={p.disabled}
        searchable={p.searchable}
      />
    ),
  },
  {
    name: "Slider",
    props: {
      defaultValue: { type: "number", default: 50,  label: "value",  min: 0,   max: 100 },
      min:          { type: "number", default: 0,   label: "min" },
      max:          { type: "number", default: 100, label: "max" },
      step:         { type: "number", default: 1,   label: "step" },
      size:         { type: "select", options: ["sm", "md", "lg"],                          default: "md",     label: "size" },
      color:        { type: "select", options: ["primary", "success", "warning", "error"], default: "primary", label: "color" },
      label:        { type: "string",  default: "Serving size", label: "label" },
      showValue:    { type: "boolean", default: true,  label: "showValue" },
      disabled:     { type: "boolean", default: false, label: "disabled" },
    },
    render: (p) => <SliderPropDemo {...p} />,
  },
  {
    name: "Tabs",
    props: {
      variant:   { type: "select",  options: ["underline", "pills", "boxed"], default: "underline", label: "variant" },
      size:      { type: "select",  options: ["sm", "md", "lg"],              default: "md",        label: "size" },
      fullWidth: { type: "boolean", default: false, label: "fullWidth" },
    },
    render: (p) => <TabsPropDemo {...p} />,
  },
  {
    name: "Toggle",
    props: {
      checked:     { type: "boolean", default: false,                    label: "checked" },
      label:       { type: "string",  default: "Enable notifications",   label: "label" },
      description: { type: "string",  default: "Get notified about updates", label: "description" },
      disabled:    { type: "boolean", default: false,                    label: "disabled" },
      toggleSize:  { type: "select",  options: ["sm", "md", "lg"],       default: "md", label: "toggleSize" },
    },
    render: (p, extra) => (
      <Toggle
        checked={extra?.toggleChecked ?? Boolean(p.checked)}
        onChange={(e) => extra?.setToggleChecked(e.target.checked)}
        label={p.label || undefined}
        description={p.description || undefined}
        disabled={p.disabled}
        toggleSize={p.toggleSize}
      />
    ),
  },
  {
    name: "Progress",
    props: {
      value:    { type: "number",  default: 65,        label: "value",     min: 0, max: 100 },
      size:     { type: "select",  options: ["xs", "sm", "md", "lg"],                       default: "md",     label: "size" },
      color:    { type: "select",  options: ["primary", "success", "warning", "error"],     default: "primary", label: "color" },
      label:    { type: "string",  default: "Recipe completion", label: "label" },
      showValue:{ type: "boolean", default: true,  label: "showValue" },
      striped:  { type: "boolean", default: false, label: "striped" },
      animated: { type: "boolean", default: false, label: "animated" },
    },
    render: (p) => (
      <div style={{ width: "100%", maxWidth: "300px" }}>
        <Progress
          value={Number(p.value)}
          size={p.size}
          color={p.color}
          label={p.label || undefined}
          showValue={p.showValue}
          striped={p.striped}
          animated={p.animated}
        />
      </div>
    ),
  },
  {
    name: "Spinner",
    props: {
      size:  { type: "select", options: ["xs", "sm", "md", "lg", "xl"],   default: "md",     label: "size" },
      color: { type: "select", options: ["primary", "white", "current"],  default: "primary", label: "color" },
    },
    render: (p) => <Spinner size={p.size} color={p.color} />,
  },
  {
    name: "Input",
    props: {
      inputSize:   { type: "select",  options: ["sm", "md", "lg"], default: "md", label: "inputSize" },
      label:       { type: "string",  default: "Email address",   label: "label" },
      placeholder: { type: "string",  default: "Enter email…",    label: "placeholder" },
      helperText:  { type: "string",  default: "",                label: "helperText" },
      error:       { type: "string",  default: "",                label: "error" },
      disabled:    { type: "boolean", default: false,             label: "disabled" },
    },
    render: (p) => (
      <div style={{ width: "100%", maxWidth: "300px" }}>
        <Input
          inputSize={p.inputSize}
          disabled={p.disabled}
          error={p.error || undefined}
          label={p.label || undefined}
          placeholder={p.placeholder || undefined}
          helperText={p.helperText || undefined}
          fullWidth
        />
      </div>
    ),
  },
  {
    name: "Textarea",
    props: {
      inputSize:  { type: "select",  options: ["sm", "md", "lg"],                          default: "md",      label: "inputSize" },
      label:      { type: "string",  default: "Recipe description",                        label: "label" },
      placeholder:{ type: "string",  default: "Describe your recipe…",                    label: "placeholder" },
      helperText: { type: "string",  default: "",                                          label: "helperText" },
      maxLength:  { type: "number",  default: 0,                                           label: "maxLength (0=none)" },
      showCount:  { type: "boolean", default: false,                                       label: "showCount" },
      disabled:   { type: "boolean", default: false,                                       label: "disabled" },
      resize:     { type: "select",  options: ["none", "vertical", "horizontal", "both"],  default: "vertical", label: "resize" },
    },
    render: (p) => (
      <TextareaPropDemo
        label={p.label}
        placeholder={p.placeholder}
        disabled={p.disabled}
        inputSize={p.inputSize}
        helperText={p.helperText}
        maxLength={p.maxLength}
        showCount={p.showCount}
        resize={p.resize}
      />
    ),
  },
  {
    name: "Tooltip",
    props: {
      content:  { type: "string", default: "This is a tooltip!", label: "content" },
      position: { type: "select", options: ["top", "bottom", "left", "right"], default: "top", label: "position" },
    },
    render: (p) => (
      <Tooltip content={String(p.content || "This is a tooltip!")} position={p.position}>
        <Button variant="secondary">Hover me</Button>
      </Tooltip>
    ),
  },
];

// ═══════════════════════════════════════════════════════════════════════
// Sandbox Presets
// ═══════════════════════════════════════════════════════════════════════

const SANDBOX_PRESETS: Record<string, string> = {
  Button: `function Demo() {
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "center" }}>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center" }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
      </div>
      <Button
        variant="primary"
        loading={loading}
        onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 2000); }}
      >
        {loading ? "Loading\u2026" : "Simulate Load"}
      </Button>
      <Button variant="secondary" onClick={() => setCount(c => c + 1)}>
        Clicked {count} {count === 1 ? "time" : "times"}
      </Button>
    </div>
  );
}`,

  Badge: `function Demo() {
  const [count, setCount] = useState(5);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", alignItems: "center" }}>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center" }}>
        <Badge variant="default">Default</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="error">Error</Badge>
        <Badge variant="info">Info</Badge>
      </div>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <Button variant="ghost" size="sm" onClick={() => setCount(c => Math.max(0, c - 1))}>\u2212</Button>
        <Badge variant="info" size="lg">{count} notifications</Badge>
        <Button variant="ghost" size="sm" onClick={() => setCount(c => c + 1)}>+</Button>
      </div>
      <div style={{ display: "flex", gap: "8px" }}>
        <Badge dot variant="success">Online</Badge>
        <Badge dot variant="warning">Away</Badge>
        <Badge dot variant="error">Offline</Badge>
      </div>
    </div>
  );
}`,

  Card: `function Demo() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%", maxWidth: "320px" }}>
      <Card variant="default">
        <CardHeader>Pasta Carbonara</CardHeader>
        <CardBody>A rich Roman pasta with eggs, Pecorino, and guanciale \u2014 no cream needed.</CardBody>
        <CardFooter>
          <div style={{ display: "flex", gap: "6px" }}>
            <Badge variant="success" size="sm">Published</Badge>
            <Badge variant="info" size="sm">Italian</Badge>
          </div>
        </CardFooter>
      </Card>
      <Card variant="outlined">
        <CardHeader>Tonkotsu Ramen</CardHeader>
        <CardBody>Rich pork broth simmered 12 hours for a creamy, deeply flavored base.</CardBody>
      </Card>
    </div>
  );
}`,

  Select: `function Demo() {
  const [cuisine, setCuisine] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%", maxWidth: "300px" }}>
      <Select
        label="Cuisine"
        placeholder="Choose a cuisine\u2026"
        value={cuisine}
        onChange={setCuisine}
        searchable
        options={[
          { value: "italian", label: "Italian" },
          { value: "french", label: "French" },
          { value: "japanese", label: "Japanese" },
          { value: "mexican", label: "Mexican" },
          { value: "thai", label: "Thai" },
          { value: "indian", label: "Indian" },
        ]}
      />
      <Select
        label="Difficulty"
        value={difficulty}
        onChange={setDifficulty}
        options={[
          { value: "easy", label: "Easy" },
          { value: "medium", label: "Medium" },
          { value: "hard", label: "Hard" },
          { value: "expert", label: "Expert", disabled: true },
        ]}
      />
      {cuisine && (
        <p style={{ fontSize: "13px", color: "var(--ck-text-muted)", margin: 0 }}>
          Showing {cuisine} recipes \u00b7 {difficulty} difficulty
        </p>
      )}
    </div>
  );
}`,

  Slider: `function Demo() {
  const [servings, setServings] = useState(4);
  const [temp, setTemp] = useState(180);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px", width: "100%", maxWidth: "340px" }}>
      <Slider
        label="Serving size"
        value={servings}
        onChange={setServings}
        min={1} max={12} step={1}
        showValue
      />
      <Slider
        label="Oven temperature (\u00b0C)"
        value={temp}
        onChange={setTemp}
        min={100} max={260} step={10}
        showValue
        color="warning"
      />
      <p style={{ fontSize: "13px", color: "var(--ck-text-muted)", margin: 0 }}>
        Cooking for <strong style={{ color: "var(--ck-text)" }}>{servings}</strong> people
        at <strong style={{ color: "var(--ck-text)" }}>{temp}\u00b0C</strong>
      </p>
    </div>
  );
}`,

  Tabs: `function Demo() {
  return (
    <div style={{ width: "100%", maxWidth: "440px" }}>
      <Tabs
        variant="pills"
        defaultTab="ingredients"
        items={[
          {
            id: "ingredients",
            label: "Ingredients",
            content: (
              <ul style={{ padding: "12px 0 12px 18px", fontSize: "14px", color: "var(--ck-text)", lineHeight: 1.8, margin: 0 }}>
                <li>400g spaghetti</li>
                <li>200g guanciale or pancetta</li>
                <li>4 large eggs (2 whole + 2 yolks)</li>
                <li>100g Pecorino Romano</li>
                <li>Black pepper to taste</li>
              </ul>
            ),
          },
          {
            id: "method",
            label: "Method",
            content: (
              <p style={{ padding: "12px 0", fontSize: "14px", color: "var(--ck-text)", lineHeight: 1.7, margin: 0 }}>
                Cook pasta al dente. Fry guanciale until crispy. Whisk eggs with cheese.
                Drain pasta reserving water, toss with guanciale off heat, add egg mixture,
                loosen with pasta water to achieve a silky sauce.
              </p>
            ),
          },
          {
            id: "tips",
            label: "Tips",
            badge: "3",
            content: (
              <ol style={{ padding: "12px 0 12px 18px", fontSize: "14px", color: "var(--ck-text)", lineHeight: 1.8, margin: 0 }}>
                <li>Never add cream \u2014 it\u2019s not traditional.</li>
                <li>Remove pan from heat before adding eggs.</li>
                <li>Reserve pasta water for the perfect consistency.</li>
              </ol>
            ),
          },
        ]}
      />
    </div>
  );
}`,

  Toggle: `function Demo() {
  const [notifs, setNotifs] = useState(true);
  const [dark, setDark] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%", maxWidth: "320px" }}>
      <Toggle
        checked={notifs}
        onChange={e => setNotifs(e.target.checked)}
        label="Notifications"
        description="Receive push notifications"
      />
      <Toggle
        checked={dark}
        onChange={e => setDark(e.target.checked)}
        label="Dark mode"
        description="Switch to dark theme"
        toggleSize="lg"
      />
      <Toggle
        checked={autoSave}
        onChange={e => setAutoSave(e.target.checked)}
        label="Auto-save"
        description="Save drafts automatically"
        toggleSize="sm"
      />
      <Toggle label="Disabled" description="Cannot be changed" disabled />
    </div>
  );
}`,

  Progress: `function Demo() {
  const [value, setValue] = useState(65);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "100%", maxWidth: "360px" }}>
      <Progress value={value} label="Recipe completion" showValue />
      <Progress value={80} color="success" label="Ingredients ready" showValue size="sm" />
      <Progress value={40} color="warning" label="Steps completed" showValue animated striped />
      <Progress value={95} color="error" label="Storage almost full" showValue size="xs" />
      <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
        <Button variant="secondary" size="sm" onClick={() => setValue(v => Math.max(0, v - 10))}>-10%</Button>
        <Button variant="primary"   size="sm" onClick={() => setValue(v => Math.min(100, v + 10))}>+10%</Button>
      </div>
    </div>
  );
}`,

  Spinner: `function Demo() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px", alignItems: "center" }}>
      <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
        <Spinner size="xs" />
        <Spinner size="sm" />
        <Spinner size="md" />
        <Spinner size="lg" />
        <Spinner size="xl" />
      </div>
      <Spinner size="lg" label="Loading recipes\u2026" />
    </div>
  );
}`,

  Input: `function Demo() {
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const isValid = email.includes("@") && email.includes(".");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%", maxWidth: "320px" }}>
      <Input
        label="Email address"
        placeholder="you@example.com"
        value={email}
        onChange={e => setEmail(e.target.value)}
        onBlur={() => setTouched(true)}
        error={touched && !isValid && email.length > 0 ? "Please enter a valid email" : undefined}
        helperText={isValid ? "\u2713 Looks good!" : "Enter your email address"}
        fullWidth
      />
      <Input label="Disabled field" placeholder="Cannot edit this" disabled fullWidth />
    </div>
  );
}`,

  Textarea: `function Demo() {
  const [recipe, setRecipe] = useState("");
  const limit = 200;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%", maxWidth: "340px" }}>
      <Textarea
        label="Recipe description"
        placeholder="Describe your recipe\u2026"
        value={recipe}
        onChange={e => setRecipe(e.target.value)}
        maxLength={limit}
        showCount
        error={recipe.length > limit ? "Description too long" : undefined}
        rows={4}
        fullWidth
      />
      <Textarea
        label="Notes (auto-resize)"
        placeholder="Jot down cooking notes\u2026"
        autoResize
        rows={3}
        fullWidth
      />
    </div>
  );
}`,

  Tooltip: `function Demo() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px", alignItems: "center", padding: "20px 0" }}>
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
        <Tooltip content="Top tooltip" position="top">
          <Button variant="secondary" size="sm">Top</Button>
        </Tooltip>
        <Tooltip content="Right tooltip" position="right">
          <Button variant="secondary" size="sm">Right</Button>
        </Tooltip>
        <Tooltip content="Bottom tooltip" position="bottom">
          <Button variant="secondary" size="sm">Bottom</Button>
        </Tooltip>
        <Tooltip content="Left tooltip" position="left">
          <Button variant="secondary" size="sm">Left</Button>
        </Tooltip>
      </div>
      <Tooltip content="Save your recipe changes" position="top">
        <Button variant="primary">Save Recipe</Button>
      </Tooltip>
    </div>
  );
}`,
};

// Scope keys and values for the sandbox new Function executor
const SANDBOX_SCOPE_KEYS = [
  "React", "useState", "useEffect", "useRef", "useCallback",
  "Button", "Input", "Card", "CardHeader", "CardBody", "CardFooter",
  "Badge", "Toggle", "Tooltip", "Select", "Tabs", "Textarea",
  "Slider", "Progress", "Spinner",
];

function buildScope() {
  return {
    React, useState, useEffect, useRef, useCallback,
    Button, Input, Card, CardHeader, CardBody, CardFooter,
    Badge, Toggle, Tooltip, Select, Tabs, Textarea,
    Slider, Progress, Spinner,
  };
}

// ═══════════════════════════════════════════════════════════════════════
// PropControl — individual prop editing widget
// ═══════════════════════════════════════════════════════════════════════

function PropControl({ def, value, onChange }: {
  def: PropDef;
  value: any;
  onChange: (v: any) => void;
}) {
  const labelStyle: React.CSSProperties = {
    fontSize: "10px",
    fontWeight: 700,
    letterSpacing: "0.07em",
    textTransform: "uppercase",
    color: "var(--ck-text-muted)",
    marginBottom: "5px",
    display: "block",
  };

  const inputBase: React.CSSProperties = {
    width: "100%",
    padding: "6px 10px",
    background: "var(--ck-bg)",
    color: "var(--ck-text)",
    border: "1px solid var(--ck-border)",
    borderRadius: "7px",
    fontSize: "13px",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <span style={labelStyle}>{def.label}</span>

      {def.type === "select" && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginTop: "2px" }}>
          {def.options?.map((opt) => {
            const isActive = String(value) === opt;
            return (
              <button
                key={opt}
                onClick={() => onChange(opt)}
                style={{
                  padding: "4px 11px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontFamily: "inherit",
                  fontWeight: isActive ? 600 : 400,
                  cursor: "pointer",
                  border: "1px solid",
                  borderColor: isActive ? "var(--ck-primary)" : "var(--ck-border)",
                  background: isActive ? "var(--ck-primary)" : "var(--ck-bg)",
                  color: isActive ? "#fff" : "var(--ck-text-muted)",
                  transition: "all 0.15s ease",
                  outline: "none",
                }}
              >
                {opt}
              </button>
            );
          })}
        </div>
      )}

      {def.type === "boolean" && (
        <button
          role="switch"
          aria-checked={Boolean(value)}
          onClick={() => onChange(!Boolean(value))}
          style={{
            display: "inline-flex",
            alignSelf: "flex-start",
            alignItems: "center",
            gap: "8px",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          <span style={{
            display: "inline-flex",
            width: "34px",
            height: "19px",
            borderRadius: "9999px",
            background: Boolean(value) ? "var(--ck-primary)" : "var(--ck-border)",
            position: "relative",
            transition: "background 0.18s",
            flexShrink: 0,
          }}>
            <span style={{
              position: "absolute",
              top: "2px",
              left: Boolean(value) ? "17px" : "2px",
              width: "15px",
              height: "15px",
              borderRadius: "50%",
              background: "#fff",
              transition: "left 0.18s",
              boxShadow: "0 1px 3px rgba(0,0,0,0.25)",
            }} />
          </span>
          <span style={{ fontSize: "12px", color: Boolean(value) ? "var(--ck-text)" : "var(--ck-text-muted)" }}>
            {Boolean(value) ? "true" : "false"}
          </span>
        </button>
      )}

      {def.type === "string" && (
        <input
          type="text"
          value={String(value)}
          onChange={(e) => onChange(e.target.value)}
          style={inputBase}
        />
      )}

      {def.type === "number" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <input
              type="range"
              min={def.min ?? 0}
              max={def.max ?? 100}
              step={def.step ?? 1}
              value={Number(value)}
              onChange={(e) => onChange(Number(e.target.value))}
              style={{
                flex: 1,
                marginRight: "10px",
                accentColor: "var(--ck-primary)",
                cursor: "pointer",
              }}
            />
            <input
              type="number"
              value={Number(value)}
              onChange={(e) => onChange(Number(e.target.value))}
              style={{ ...inputBase, width: "56px", textAlign: "center", padding: "4px 6px" }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// PropEditor (Mode 1)
// ═══════════════════════════════════════════════════════════════════════

function PropEditor() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [allProps, setAllProps] = useState<Record<string, Record<string, any>>>(() =>
    Object.fromEntries(
      COMPONENT_CONFIGS.map((c) => [
        c.name,
        Object.fromEntries(Object.entries(c.props).map(([k, v]) => [k, v.default])),
      ])
    )
  );
  const [toggleChecked, setToggleChecked] = useState(false);
  const { copied, copy } = useCopyToClipboard();

  const config = COMPONENT_CONFIGS[selectedIdx];
  const currentProps = allProps[config.name];
  const defaults = Object.fromEntries(
    Object.entries(config.props).map(([k, v]) => [k, v.default])
  );
  const code = propsToCode(config.name, currentProps, defaults);

  const updateProp = (key: string, value: any) =>
    setAllProps((prev) => ({
      ...prev,
      [config.name]: { ...prev[config.name], [key]: value },
    }));

  const resetProps = () => {
    setAllProps((prev) => ({
      ...prev,
      [config.name]: Object.fromEntries(
        Object.entries(config.props).map(([k, v]) => [k, v.default])
      ),
    }));
    setToggleChecked(false);
  };

  useEffect(() => {
    if (config.name === "Toggle") {
      setToggleChecked(Boolean(currentProps.checked));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentProps.checked, config.name]);

  useEffect(() => { setToggleChecked(false); }, [selectedIdx]);

  const extra: ExtraState = { toggleChecked, setToggleChecked };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "20px" }}
         className="max-md:!grid-cols-1">
      {/* ── Left: component selector + props ── */}
      <div style={{
        background: "var(--ck-surface)",
        border: "1px solid var(--ck-border)",
        borderRadius: "16px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}>
        {/* Panel header */}
        <div style={{
          padding: "11px 16px",
          borderBottom: "1px solid var(--ck-border)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <span style={{
            fontSize: "10px", fontWeight: 700, letterSpacing: "0.07em",
            textTransform: "uppercase", color: "var(--ck-text-muted)",
          }}>
            Component
          </span>
          <button
            onClick={resetProps}
            style={{
              display: "flex", alignItems: "center", gap: "4px",
              fontSize: "11px", color: "var(--ck-text-muted)",
              background: "none", border: "none", cursor: "pointer",
              padding: "3px 7px", borderRadius: "5px",
              fontFamily: "inherit",
            }}
          >
            <RefreshCcw size={10} />
            Reset
          </button>
        </div>

        <div style={{ padding: "14px 16px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Component pill grid */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {COMPONENT_CONFIGS.map((c, i) => (
              <button
                key={c.name}
                onClick={() => setSelectedIdx(i)}
                style={{
                  padding: "4px 11px",
                  borderRadius: "6px",
                  border: `1px solid ${i === selectedIdx ? "var(--ck-primary)" : "var(--ck-border)"}`,
                  background: i === selectedIdx ? "var(--ck-primary)" : "transparent",
                  color: i === selectedIdx ? "#fff" : "var(--ck-text-muted)",
                  fontSize: "12px",
                  fontWeight: i === selectedIdx ? 600 : 400,
                  cursor: "pointer",
                  transition: "all 0.15s",
                  fontFamily: "inherit",
                }}
              >
                {c.name}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "var(--ck-border)", margin: "0 -2px" }} />

          {/* Props section header */}
          <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--ck-text-muted)" }}>
            Props
          </span>

          {/* Prop controls */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {Object.entries(config.props).map(([key, def]) => (
              <PropControl
                key={key}
                def={def}
                value={currentProps[key]}
                onChange={(v) => updateProp(key, v)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Right: preview + code ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {/* Preview panel */}
        <div style={{
          background: "var(--ck-surface)",
          border: "1px solid var(--ck-border)",
          borderRadius: "16px",
          overflow: "hidden",
          flex: 1,
        }}>
          <div style={{
            padding: "11px 16px",
            borderBottom: "1px solid var(--ck-border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
            <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--ck-text-muted)" }}>
              Preview
            </span>
            <Badge variant="info" size="sm">{config.name}</Badge>
          </div>
          <div
            className="dot-grid-pattern"
            style={{
              padding: "40px 28px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "140px",
            }}
          >
            <ErrorBoundary resetKey={JSON.stringify(currentProps)}>
              {config.render(currentProps, extra)}
            </ErrorBoundary>
          </div>
        </div>

        {/* Code panel */}
        <div style={{
          background: "var(--ck-surface)",
          border: "1px solid var(--ck-border)",
          borderRadius: "16px",
          overflow: "hidden",
        }}>
          <div style={{
            padding: "11px 16px",
            borderBottom: "1px solid var(--ck-border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
            <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--ck-text-muted)" }}>
              Code
            </span>
            <button
              onClick={() => copy(code)}
              style={{
                display: "flex", alignItems: "center", gap: "5px",
                fontSize: "11px",
                color: copied ? "var(--ck-primary)" : "var(--ck-text-muted)",
                background: "none", border: "none", cursor: "pointer",
                padding: "3px 7px", borderRadius: "5px",
                fontFamily: "inherit",
                transition: "color 0.15s",
              }}
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <Highlight theme={themes.nightOwl} code={code} language="jsx">
            {({ style, tokens, getLineProps, getTokenProps }) => (
              <pre style={{
                ...style,
                margin: 0,
                padding: "16px",
                borderRadius: 0,
                fontSize: "12px",
                lineHeight: 1.7,
                overflowX: "auto",
                border: "none",
              }}>
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
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// CodeSandbox (Mode 2)
// ═══════════════════════════════════════════════════════════════════════

function CodeSandbox() {
  const presetNames = Object.keys(SANDBOX_PRESETS);
  const [selectedComp, setSelectedComp] = useState(presetNames[0]);
  const [code, setCode] = useState(SANDBOX_PRESETS[presetNames[0]]);
  const [DemoComp, setDemoComp] = useState<React.ComponentType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [babelLoading, setBabelLoading] = useState(false);
  const [babelReady, setBabelReady] = useState(false);
  const babelRef = useRef<any>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumRef = useRef<HTMLDivElement>(null);
  const resetCountRef = useRef(0);
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    setBabelLoading(true);
    import("@babel/standalone")
      .then((Babel) => {
        babelRef.current = Babel;
        setBabelReady(true);
        setBabelLoading(false);
      })
      .catch((err: Error) => {
        setError(`Failed to load Babel: ${err.message}`);
        setBabelLoading(false);
      });
  }, []);

  const executeCode = useCallback((src: string) => {
    if (!babelRef.current) return;
    setError(null);
    try {
      const transformed: string = babelRef.current.transform(src, {
        presets: ["react"],
        filename: "demo.jsx",
      }).code;
      const scope = buildScope();
      // eslint-disable-next-line no-new-func
      const factory = new Function(
        ...SANDBOX_SCOPE_KEYS,
        `"use strict";\n${transformed}\nreturn typeof Demo !== "undefined" ? Demo : null;`
      );
      const Demo = factory(...SANDBOX_SCOPE_KEYS.map((k) => (scope as any)[k]));
      if (!Demo) {
        setError('No "Demo" function found.\nDefine: function Demo() { return <JSX>; }');
        setDemoComp(null);
      } else {
        resetCountRef.current += 1;
        setResetKey(resetCountRef.current);
        setDemoComp(() => Demo as React.ComponentType);
      }
    } catch (err: any) {
      setError(String(err.message ?? err));
      setDemoComp(null);
    }
  }, []);

  // Auto-run on code change (debounced)
  useEffect(() => {
    if (!babelReady) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => executeCode(code), 600);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [code, babelReady, executeCode]);

  const syncLineNumbers = () => {
    if (lineNumRef.current && textareaRef.current) {
      lineNumRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const handlePresetChange = (name: string) => {
    setSelectedComp(name);
    setCode(SANDBOX_PRESETS[name]);
  };

  const lineCount = code.split("\n").length;

  const NIGHT_OWL_BG = "#011627";
  const NIGHT_OWL_TEXT = "#d6deeb";

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}
         className="max-md:!grid-cols-1">
      {/* ── Left: editor ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {/* Toolbar */}
        <div style={{
          display: "flex",
          gap: "8px",
          alignItems: "center",
          background: "var(--ck-surface)",
          border: "1px solid var(--ck-border)",
          borderRadius: "12px",
          padding: "8px 12px",
        }}>
          {/* Preset picker — custom pill row */}
          <div style={{ flex: 1, display: "flex", flexWrap: "wrap", gap: "4px" }}>
            {presetNames.map((name) => {
              const isActive = name === selectedComp;
              return (
                <button
                  key={name}
                  onClick={() => handlePresetChange(name)}
                  style={{
                    padding: "3px 10px",
                    borderRadius: "6px",
                    fontSize: "11px",
                    fontFamily: "inherit",
                    fontWeight: isActive ? 600 : 400,
                    cursor: "pointer",
                    border: "1px solid",
                    borderColor: isActive ? "var(--ck-primary)" : "rgba(255,255,255,0.1)",
                    background: isActive ? "var(--ck-primary)" : "transparent",
                    color: isActive ? "#fff" : "rgba(214,222,235,0.55)",
                    transition: "all 0.15s",
                    outline: "none",
                  }}
                >
                  {name}
                </button>
              );
            })}
          </div>
          <button
            onClick={() => setCode(SANDBOX_PRESETS[selectedComp])}
            title="Reset to preset"
            style={{
              display: "flex", alignItems: "center", gap: "4px",
              padding: "5px 10px",
              background: "var(--ck-bg)", color: "var(--ck-text-muted)",
              border: "1px solid var(--ck-border)", borderRadius: "7px",
              fontSize: "12px", cursor: "pointer", whiteSpace: "nowrap",
              fontFamily: "inherit",
            }}
          >
            <RefreshCcw size={11} />
          </button>
          <button
            onClick={() => babelReady && executeCode(code)}
            disabled={!babelReady}
            style={{
              display: "flex", alignItems: "center", gap: "5px",
              padding: "5px 13px",
              background: babelReady ? "var(--ck-primary)" : "var(--ck-border)",
              color: babelReady ? "#fff" : "var(--ck-text-muted)",
              border: "none", borderRadius: "7px",
              fontSize: "12px", fontWeight: 600, cursor: babelReady ? "pointer" : "default",
              whiteSpace: "nowrap",
              fontFamily: "inherit",
              transition: "background 0.15s",
            }}
          >
            <Play size={11} />
            Run
          </button>
        </div>

        {/* Editor box */}
        <div style={{
          background: NIGHT_OWL_BG,
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "14px",
          overflow: "hidden",
          flex: 1,
        }}>
          {/* macOS window chrome */}
          <div style={{
            padding: "9px 14px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            display: "flex", alignItems: "center", gap: "6px",
            background: "rgba(0,0,0,0.2)",
          }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57", display: "inline-block" }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e", display: "inline-block" }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840", display: "inline-block" }} />
            <span style={{ marginLeft: 8, fontSize: "11px", color: "rgba(214,222,235,0.35)", fontFamily: "var(--font-mono), monospace" }}>
              demo.jsx
            </span>
          </div>

          {/* Line numbers + textarea */}
          <div style={{ display: "flex", maxHeight: "480px", overflow: "hidden" }}>
            <div
              ref={lineNumRef}
              aria-hidden="true"
              style={{
                padding: "14px 10px 14px 14px",
                color: "rgba(99,119,119,0.6)",
                fontSize: "13px",
                lineHeight: "1.6",
                fontFamily: "var(--font-mono), monospace",
                overflowY: "hidden",
                userSelect: "none",
                textAlign: "right",
                minWidth: "36px",
                boxSizing: "border-box",
                flexShrink: 0,
              }}
            >
              {Array.from({ length: lineCount }, (_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>

            <textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onScroll={syncLineNumbers}
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              style={{
                flex: 1,
                padding: "14px 16px 14px 4px",
                background: "transparent",
                color: NIGHT_OWL_TEXT,
                border: "none",
                outline: "none",
                fontFamily: "var(--font-mono), monospace",
                fontSize: "13px",
                lineHeight: "1.6",
                resize: "none",
                height: "480px",
                overflowY: "auto",
                tabSize: 2,
                caretColor: NIGHT_OWL_TEXT,
                boxSizing: "border-box",
              }}
            />
          </div>
        </div>

        <p style={{ fontSize: "11px", color: "var(--ck-text-muted)", margin: 0, lineHeight: 1.5 }}>
          Define <code style={{ fontFamily: "var(--font-mono), monospace", background: "var(--ck-surface)", padding: "1px 5px", borderRadius: "4px", border: "1px solid var(--ck-border)" }}>function Demo()</code> returning JSX.
          All @cookest/ui components and React hooks are in scope.
        </p>
      </div>

      {/* ── Right: live preview ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{
          background: "var(--ck-surface)",
          border: "1px solid var(--ck-border)",
          borderRadius: "14px",
          overflow: "hidden",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}>
          <div style={{
            padding: "11px 16px",
            borderBottom: "1px solid var(--ck-border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
            <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--ck-text-muted)" }}>
              Live Preview
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {babelLoading && <Spinner size="xs" />}
              <Badge variant="info" size="sm">{selectedComp}</Badge>
            </div>
          </div>

          <div
            className="dot-grid-pattern"
            style={{ padding: "32px 24px", minHeight: "260px", flex: 1 }}
          >
            {babelLoading ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", padding: "50px 0" }}>
                <Spinner size="lg" />
                <span style={{ fontSize: "13px", color: "var(--ck-text-muted)" }}>Loading Babel\u2026</span>
              </div>
            ) : error ? (
              <div style={{
                padding: "14px 16px",
                background: "rgba(239,68,68,0.07)",
                border: "1px solid rgba(239,68,68,0.2)",
                borderRadius: "10px",
                color: "#f87171",
                fontFamily: "var(--font-mono), monospace",
                fontSize: "12px",
                lineHeight: 1.6,
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}>
                <div style={{ fontWeight: 700, marginBottom: "6px" }}>⚠ Transpile Error</div>
                {error}
              </div>
            ) : DemoComp ? (
              <ErrorBoundary resetKey={resetKey}>
                <DemoComp />
              </ErrorBoundary>
            ) : (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "140px" }}>
                <span style={{ fontSize: "13px", color: "var(--ck-text-muted)" }}>Waiting for code\u2026</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// PlaygroundPage (default export)
// ═══════════════════════════════════════════════════════════════════════

const MODES: { id: PlaygroundMode; label: string; icon: ReactNode }[] = [
  { id: "props",   label: "Prop Editor",  icon: <Settings2 size={14} /> },
  { id: "sandbox", label: "Code Sandbox", icon: <Code2 size={14} /> },
];

export default function PlaygroundPage() {
  const [mode, setMode] = useState<PlaygroundMode>("props");

  return (
    <>
      <Grain />

      {/* Full-page dot-grid canvas */}
      <div style={{
        minHeight: "100vh",
        padding: "40px 28px 64px",
      }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

          {/* ── Header ── */}
          <div style={{ marginBottom: "36px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
              <div style={{
                width: "36px", height: "36px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, var(--ck-primary), #8db06e)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "18px",
                flexShrink: 0,
              }}>
                🧪
              </div>
              <h1 style={{
                fontSize: "28px",
                fontWeight: 800,
                letterSpacing: "-0.025em",
                margin: 0,
                color: "var(--ck-text)",
              }}>
                Component Playground
              </h1>
            </div>
            <p style={{
              color: "var(--ck-text-muted)",
              fontSize: "15px",
              margin: "0 0 0 46px",
              lineHeight: 1.5,
            }}>
              Explore, customize, and test @cookest/ui components interactively.
            </p>
          </div>

          {/* ── Mode tab switcher ── */}
          <div style={{ marginBottom: "28px" }}>
            <div style={{
              display: "inline-flex",
              gap: "3px",
              background: "var(--ck-surface)",
              border: "1px solid var(--ck-border)",
              borderRadius: "12px",
              padding: "4px",
            }}>
              {MODES.map((m) => {
                const isActive = mode === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setMode(m.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "7px",
                      padding: "8px 18px",
                      borderRadius: "8px",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "13px",
                      fontWeight: isActive ? 600 : 400,
                      fontFamily: "inherit",
                      transition: "all 0.18s",
                      background: isActive ? "var(--ck-bg)" : "transparent",
                      color: isActive ? "var(--ck-text)" : "var(--ck-text-muted)",
                      boxShadow: isActive ? "0 1px 4px rgba(0,0,0,0.12), inset 0 0 0 1px var(--ck-border)" : "none",
                    }}
                  >
                    <span style={{ color: isActive ? "var(--ck-primary)" : "inherit", display: "flex" }}>
                      {m.icon}
                    </span>
                    {m.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Content ── */}
          {mode === "props"   && <PropEditor />}
          {mode === "sandbox" && <CodeSandbox />}
        </div>
      </div>
    </>
  );
}
