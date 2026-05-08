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
  Avatar,
  AvatarGroup,
  Toggle,
  Alert,
  Divider,
  Skeleton,
  SkeletonCard,
  Tooltip,
  Select,
  Tabs,
  Accordion,
  Textarea,
  Slider,
  Progress,
  Spinner,
  Modal,
} from "@cookest/ui";
import { Copy, Check, RefreshCcw, Code2, Layers, Settings2 } from "lucide-react";

// ═══════════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════════

type PlaygroundMode = "props" | "sandbox" | "stories";
type PropControlType = "select" | "boolean" | "string" | "number";

interface PropDef {
  type: PropControlType;
  options?: string[];
  default: string | boolean | number;
  label: string;
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

interface StoryDef {
  label: string;
  description: string;
  render: () => ReactNode;
}

interface ComponentStories {
  name: string;
  stories: StoryDef[];
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
          padding: "12px 14px",
          background: "rgba(239,68,68,0.08)",
          border: "1px solid rgba(239,68,68,0.3)",
          borderRadius: "8px",
          color: "#ef4444",
          fontFamily: "monospace",
          fontSize: "12px",
          lineHeight: 1.5,
          wordBreak: "break-word",
        }}>
          <strong>Runtime error:</strong> {this.state.error}
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
// Story helper components (stateful, defined before story data)
// ═══════════════════════════════════════════════════════════════════════

function ButtonLoadingDemo() {
  const [loading, setLoading] = useState(false);
  return (
    <Button
      variant="primary"
      loading={loading}
      onClick={() => {
        setLoading(true);
        setTimeout(() => setLoading(false), 2000);
      }}
    >
      {loading ? "Loading…" : "Click to load"}
    </Button>
  );
}

function ToggleSizeDemo({ size }: { size: "sm" | "md" | "lg" }) {
  const [checked, setChecked] = useState(false);
  return (
    <Toggle
      toggleSize={size}
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
      label={`${size} toggle`}
    />
  );
}

function ToggleDescriptionDemo() {
  const [notifs, setNotifs] = useState(true);
  const [dark, setDark] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <Toggle
        checked={notifs}
        onChange={(e) => setNotifs(e.target.checked)}
        label="Notifications"
        description="Receive push notifications for new messages"
      />
      <Toggle
        checked={dark}
        onChange={(e) => setDark(e.target.checked)}
        label="Dark mode"
        description="Switch the interface to dark theme"
      />
    </div>
  );
}

function AlertDismissDemo() {
  const [visible, setVisible] = useState(true);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
      <Alert variant="info" title="Information">Your recipe has been saved as a draft.</Alert>
      <Alert variant="success" title="Success">Recipe published successfully!</Alert>
      <Alert variant="warning" title="Warning">Some ingredients may be out of stock.</Alert>
      <Alert
        variant="error"
        title="Error"
        dismissible
        visible={visible}
        onDismiss={() => setVisible(false)}
      >
        Failed to upload image. Please try again.
      </Alert>
      {!visible && (
        <Button variant="secondary" onClick={() => setVisible(true)}>
          Restore error alert
        </Button>
      )}
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
      variant: { type: "select", options: ["primary", "secondary", "ghost", "danger"], default: "primary", label: "variant" },
      size:    { type: "select", options: ["sm", "md", "lg"], default: "md", label: "size" },
      disabled:  { type: "boolean", default: false, label: "disabled" },
      loading:   { type: "boolean", default: false, label: "loading" },
      fullWidth:  { type: "boolean", default: false, label: "fullWidth" },
      children:  { type: "string",  default: "Click me", label: "children (text)" },
    },
    render: (p) => (
      <Button variant={p.variant} size={p.size} disabled={p.disabled} loading={p.loading} fullWidth={p.fullWidth}>
        {String(p.children || "Click me")}
      </Button>
    ),
  },
  {
    name: "Input",
    props: {
      inputSize:  { type: "select", options: ["sm", "md", "lg"], default: "md", label: "inputSize" },
      disabled:   { type: "boolean", default: false, label: "disabled" },
      error:      { type: "string",  default: "", label: "error" },
      label:      { type: "string",  default: "Email address", label: "label" },
      placeholder:{ type: "string",  default: "Enter email…", label: "placeholder" },
      helperText: { type: "string",  default: "", label: "helperText" },
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
    name: "Badge",
    props: {
      variant:  { type: "select", options: ["default", "success", "warning", "error", "info"], default: "default", label: "variant" },
      size:     { type: "select", options: ["sm", "md", "lg"], default: "md", label: "size" },
      dot:      { type: "boolean", default: false, label: "dot" },
      children: { type: "string",  default: "New", label: "children (text)" },
    },
    render: (p) => (
      <Badge variant={p.variant} size={p.size} dot={p.dot}>
        {String(p.children || "New")}
      </Badge>
    ),
  },
  {
    name: "Avatar",
    props: {
      size: { type: "select", options: ["xs", "sm", "md", "lg", "xl"], default: "md", label: "size" },
      alt:  { type: "string",  default: "JD", label: "alt (initials)" },
    },
    render: (p) => <Avatar size={p.size} alt={String(p.alt || "JD")} />,
  },
  {
    name: "Alert",
    props: {
      variant:     { type: "select", options: ["info", "success", "warning", "error"], default: "info", label: "variant" },
      title:       { type: "string",  default: "Heads up!", label: "title" },
      children:    { type: "string",  default: "This is an alert message.", label: "children (text)" },
      dismissible: { type: "boolean", default: false, label: "dismissible" },
    },
    render: (p) => (
      <div style={{ width: "100%" }}>
        <Alert variant={p.variant} title={p.title || undefined} dismissible={p.dismissible}>
          {String(p.children || "This is an alert message.")}
        </Alert>
      </div>
    ),
  },
  {
    name: "Toggle",
    props: {
      checked:     { type: "boolean", default: false, label: "checked" },
      label:       { type: "string",  default: "Enable notifications", label: "label" },
      description: { type: "string",  default: "Get notified about updates", label: "description" },
      disabled:    { type: "boolean", default: false, label: "disabled" },
      toggleSize:  { type: "select",  options: ["sm", "md", "lg"], default: "md", label: "toggleSize" },
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
    name: "Divider",
    props: {
      orientation: { type: "select", options: ["horizontal", "vertical"], default: "horizontal", label: "orientation" },
      label:       { type: "string",  default: "", label: "label" },
    },
    render: (p) => (
      <div style={{
        width: "100%",
        height: p.orientation === "vertical" ? "80px" : "auto",
        display: "flex",
        alignItems: "center",
      }}>
        <Divider orientation={p.orientation} label={p.label || undefined} />
      </div>
    ),
  },
  {
    name: "Skeleton",
    props: {
      variant: { type: "select", options: ["text", "circular", "rectangular"], default: "text", label: "variant" },
      width:   { type: "string",  default: "100%", label: "width" },
      height:  { type: "string",  default: "16px", label: "height" },
      lines:   { type: "number",  default: 1, label: "lines" },
    },
    render: (p) => (
      <div style={{ width: "100%" }}>
        <Skeleton
          variant={p.variant}
          width={p.width || undefined}
          height={p.height || undefined}
          lines={Number(p.lines) || 1}
        />
      </div>
    ),
  },
  {
    name: "Spinner",
    props: {
      size:  { type: "select", options: ["xs", "sm", "md", "lg", "xl"], default: "md", label: "size" },
      color: { type: "select", options: ["primary", "white", "current"], default: "primary", label: "color" },
    },
    render: (p) => <Spinner size={p.size} color={p.color} />,
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
        {loading ? "Loading…" : "Simulate Load"}
      </Button>
      <Button variant="secondary" onClick={() => setCount(c => c + 1)}>
        Clicked {count} {count === 1 ? "time" : "times"}
      </Button>
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
        helperText={isValid ? "✓ Looks good!" : "Enter your email address"}
        fullWidth
      />
      <Input label="Disabled field" placeholder="Cannot edit this" disabled fullWidth />
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
        <Button variant="ghost" onClick={() => setCount(c => Math.max(0, c - 1))}>−</Button>
        <Badge variant="info" size="lg">{count} notifications</Badge>
        <Button variant="ghost" onClick={() => setCount(c => c + 1)}>+</Button>
      </div>
      <div style={{ display: "flex", gap: "8px" }}>
        <Badge dot variant="success">Online</Badge>
        <Badge dot variant="warning">Away</Badge>
        <Badge dot variant="error">Offline</Badge>
      </div>
    </div>
  );
}`,

  Avatar: `function Demo() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", alignItems: "center" }}>
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <Avatar size="xs" alt="XS" />
        <Avatar size="sm" alt="SM" />
        <Avatar size="md" alt="MD" />
        <Avatar size="lg" alt="LG" />
        <Avatar size="xl" alt="XL" />
      </div>
      <AvatarGroup max={3}>
        <Avatar alt="Alice" />
        <Avatar alt="Bob" />
        <Avatar alt="Carol" />
        <Avatar alt="Dave" />
        <Avatar alt="Eve" />
      </AvatarGroup>
    </div>
  );
}`,

  Alert: `function Demo() {
  const [visible, setVisible] = useState(true);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%" }}>
      <Alert variant="info" title="Information">Your recipe has been saved as a draft.</Alert>
      <Alert variant="success" title="Success">Recipe published successfully!</Alert>
      <Alert variant="warning" title="Warning">Some ingredients may be out of stock.</Alert>
      <Alert
        variant="error"
        title="Error"
        dismissible
        visible={visible}
        onDismiss={() => setVisible(false)}
      >
        Failed to upload image. Please try again.
      </Alert>
      {!visible && (
        <Button variant="secondary" onClick={() => setVisible(true)}>
          Restore alert
        </Button>
      )}
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

  Skeleton: `function Demo() {
  const [loaded, setLoaded] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%" }}>
      <Button variant="secondary" onClick={() => setLoaded(l => !l)}>
        {loaded ? "Show Skeleton" : "Show Content"}
      </Button>
      {loaded ? (
        <Card>
          <CardHeader><strong>Pasta al Pomodoro</strong></CardHeader>
          <CardBody>A classic Italian pasta with fresh tomatoes and basil.</CardBody>
          <CardFooter>
            <Badge variant="success">Published</Badge>
          </CardFooter>
        </Card>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <Skeleton variant="text" height="22px" width="55%" />
          <Skeleton variant="text" lines={3} />
          <Skeleton variant="rectangular" height="100px" />
        </div>
      )}
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
      <Spinner size="lg" label="Loading recipes…" />
    </div>
  );
}`,
};

// ═══════════════════════════════════════════════════════════════════════
// All Stories
// ═══════════════════════════════════════════════════════════════════════

const ALL_STORIES: ComponentStories[] = [
  {
    name: "Button",
    stories: [
      {
        label: "Variants",
        description: "Four visual variants for different emphasis levels.",
        render: () => (
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
          </div>
        ),
      },
      {
        label: "Sizes",
        description: "Three sizes: sm, md, and lg.",
        render: () => (
          <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        ),
      },
      {
        label: "States",
        description: "Normal, disabled, and interactive loading states.",
        render: () => (
          <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
            <Button variant="primary">Normal</Button>
            <Button variant="primary" disabled>Disabled</Button>
            <ButtonLoadingDemo />
          </div>
        ),
      },
      {
        label: "Full Width",
        description: "Button spanning the full container width.",
        render: () => (
          <div style={{ width: "100%" }}>
            <Button variant="primary" fullWidth>Full Width Button</Button>
          </div>
        ),
      },
    ],
  },
  {
    name: "Input",
    stories: [
      {
        label: "Default",
        description: "Basic input with label and placeholder.",
        render: () => (
          <div style={{ width: "100%", maxWidth: "280px" }}>
            <Input label="Email address" placeholder="you@example.com" fullWidth />
          </div>
        ),
      },
      {
        label: "With Error",
        description: "Input with inline validation error.",
        render: () => (
          <div style={{ width: "100%", maxWidth: "280px" }}>
            <Input
              label="Email"
              placeholder="Invalid email"
              defaultValue="notanemail"
              error="Please enter a valid email address"
              fullWidth
            />
          </div>
        ),
      },
      {
        label: "Disabled",
        description: "Input in a non-interactive disabled state.",
        render: () => (
          <div style={{ width: "100%", maxWidth: "280px" }}>
            <Input label="Username" placeholder="Cannot edit" disabled fullWidth />
          </div>
        ),
      },
      {
        label: "Sizes",
        description: "sm, md, and lg input sizes.",
        render: () => (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%", maxWidth: "280px" }}>
            <Input inputSize="sm" label="Small" placeholder="Small input" fullWidth />
            <Input inputSize="md" label="Medium" placeholder="Medium input" fullWidth />
            <Input inputSize="lg" label="Large" placeholder="Large input" fullWidth />
          </div>
        ),
      },
    ],
  },
  {
    name: "Badge",
    stories: [
      {
        label: "Variants",
        description: "Five color variants for semantic meaning.",
        render: () => (
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <Badge variant="default">Default</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="info">Info</Badge>
          </div>
        ),
      },
      {
        label: "Sizes",
        description: "Small, medium, and large sizes.",
        render: () => (
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <Badge size="sm">Small</Badge>
            <Badge size="md">Medium</Badge>
            <Badge size="lg">Large</Badge>
          </div>
        ),
      },
      {
        label: "With Dot",
        description: "Status dot indicator variants.",
        render: () => (
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <Badge dot variant="success">Online</Badge>
            <Badge dot variant="warning">Away</Badge>
            <Badge dot variant="error">Offline</Badge>
            <Badge dot variant="info">Busy</Badge>
          </div>
        ),
      },
    ],
  },
  {
    name: "Avatar",
    stories: [
      {
        label: "Sizes",
        description: "Five sizes from xs to xl.",
        render: () => (
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <Avatar size="xs" alt="XS" />
            <Avatar size="sm" alt="SM" />
            <Avatar size="md" alt="MD" />
            <Avatar size="lg" alt="LG" />
            <Avatar size="xl" alt="XL" />
          </div>
        ),
      },
      {
        label: "Groups",
        description: "Overlapping avatar groups with overflow count.",
        render: () => (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <AvatarGroup max={3}>
              <Avatar alt="Alice" />
              <Avatar alt="Bob" />
              <Avatar alt="Carol" />
              <Avatar alt="Dave" />
              <Avatar alt="Eve" />
            </AvatarGroup>
            <AvatarGroup max={4}>
              <Avatar alt="Alice" />
              <Avatar alt="Bob" />
              <Avatar alt="Carol" />
              <Avatar alt="Dave" />
              <Avatar alt="Eve" />
            </AvatarGroup>
          </div>
        ),
      },
      {
        label: "Initials",
        description: "Avatars generated from name initials.",
        render: () => (
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <Avatar alt="John Doe" />
            <Avatar alt="Alice Smith" />
            <Avatar alt="Bob Jones" />
            <Avatar alt="Carol White" />
          </div>
        ),
      },
    ],
  },
  {
    name: "Alert",
    stories: [
      {
        label: "Variants",
        description: "All four alert variants with dismiss interaction.",
        render: () => <AlertDismissDemo />,
      },
    ],
  },
  {
    name: "Toggle",
    stories: [
      {
        label: "Sizes",
        description: "sm, md, and lg toggle sizes.",
        render: () => (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <ToggleSizeDemo size="sm" />
            <ToggleSizeDemo size="md" />
            <ToggleSizeDemo size="lg" />
          </div>
        ),
      },
      {
        label: "With Description",
        description: "Toggles with descriptive helper text.",
        render: () => <ToggleDescriptionDemo />,
      },
      {
        label: "Disabled",
        description: "Toggles in a non-interactive disabled state.",
        render: () => (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Toggle label="Disabled off" description="This toggle is off and locked" disabled />
            <Toggle label="Disabled on" description="This toggle is on and locked" checked disabled />
          </div>
        ),
      },
    ],
  },
  {
    name: "Skeleton",
    stories: [
      {
        label: "Text",
        description: "Text skeleton lines for content placeholders.",
        render: () => (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", width: "100%" }}>
            <Skeleton variant="text" width="70%" height="20px" />
            <Skeleton variant="text" lines={3} />
          </div>
        ),
      },
      {
        label: "Card Skeleton",
        description: "Pre-built card-shaped loading placeholder.",
        render: () => (
          <div style={{ width: "100%" }}>
            <SkeletonCard />
          </div>
        ),
      },
      {
        label: "Avatar Skeleton",
        description: "Circular skeletons for avatar placeholders.",
        render: () => (
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <Skeleton variant="circular" width="32px" height="32px" />
            <Skeleton variant="circular" width="40px" height="40px" />
            <Skeleton variant="circular" width="48px" height="48px" />
            <Skeleton variant="circular" width="64px" height="64px" />
          </div>
        ),
      },
    ],
  },
  {
    name: "Spinner",
    stories: [
      {
        label: "Sizes",
        description: "Five spinner sizes from xs to xl.",
        render: () => (
          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <Spinner size="xs" />
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
            <Spinner size="xl" />
          </div>
        ),
      },
      {
        label: "Colors",
        description: "Primary, white (on dark), and current color.",
        render: () => (
          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <Spinner size="lg" color="primary" />
            <div style={{ background: "#18181b", borderRadius: "8px", padding: "10px" }}>
              <Spinner size="lg" color="white" />
            </div>
            <Spinner size="lg" color="current" />
          </div>
        ),
      },
      {
        label: "With Label",
        description: "Spinners with an accessible visible label.",
        render: () => (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "center" }}>
            <Spinner size="lg" label="Loading recipes…" />
            <Spinner size="md" label="Saving changes…" />
          </div>
        ),
      },
    ],
  },
];

// ═══════════════════════════════════════════════════════════════════════
// PropControl
// ═══════════════════════════════════════════════════════════════════════

function PropControl({
  def,
  value,
  onChange,
}: {
  def: PropDef;
  value: any;
  onChange: (v: any) => void;
}) {
  const inputBase: React.CSSProperties = {
    width: "100%",
    padding: "6px 10px",
    background: "var(--ck-bg)",
    color: "var(--ck-text)",
    border: "1px solid var(--ck-border)",
    borderRadius: "6px",
    fontSize: "13px",
    outline: "none",
    boxSizing: "border-box",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <label style={{
        fontSize: "10px",
        fontWeight: 600,
        color: "var(--ck-text-muted)",
        textTransform: "uppercase",
        letterSpacing: "0.06em",
      }}>
        {def.label}
      </label>

      {def.type === "select" && (
        <select
          value={String(value)}
          onChange={(e) => onChange(e.target.value)}
          style={{ ...inputBase, cursor: "pointer" }}
        >
          {def.options?.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      )}

      {def.type === "boolean" && (
        <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={Boolean(value)}
            onChange={(e) => onChange(e.target.checked)}
            style={{ width: "15px", height: "15px", cursor: "pointer", accentColor: "var(--ck-primary)" }}
          />
          <span style={{ fontSize: "12px", color: "var(--ck-text)" }}>
            {Boolean(value) ? "true" : "false"}
          </span>
        </label>
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
        <input
          type="number"
          value={Number(value)}
          onChange={(e) => onChange(Number(e.target.value))}
          style={inputBase}
        />
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

  // Sync toggle interactive state with the `checked` prop control
  useEffect(() => {
    if (config.name === "Toggle") {
      setToggleChecked(Boolean(currentProps.checked));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentProps.checked, config.name]);

  // Reset extra state when component changes
  useEffect(() => {
    setToggleChecked(false);
  }, [selectedIdx]);

  const extra: ExtraState = { toggleChecked, setToggleChecked };

  const panelStyle: React.CSSProperties = {
    background: "var(--ck-surface)",
    border: "1px solid var(--ck-border)",
    borderRadius: "16px",
    overflow: "hidden",
  };

  const panelHeaderStyle: React.CSSProperties = {
    padding: "10px 16px",
    borderBottom: "1px solid var(--ck-border)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const sectionLabelStyle: React.CSSProperties = {
    fontSize: "10px",
    fontWeight: 700,
    color: "var(--ck-text-muted)",
    textTransform: "uppercase",
    letterSpacing: "0.07em",
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* ── Left: controls ── */}
      <div style={{ ...panelStyle, display: "flex", flexDirection: "column" }}>
        <div style={panelHeaderStyle}>
          <span style={sectionLabelStyle}>Component</span>
          <button
            onClick={resetProps}
            style={{
              display: "flex", alignItems: "center", gap: "4px",
              fontSize: "11px", color: "var(--ck-text-muted)",
              background: "none", border: "none", cursor: "pointer",
              padding: "2px 6px", borderRadius: "4px",
            }}
          >
            <RefreshCcw size={11} /> Reset
          </button>
        </div>

        <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "14px", overflowY: "auto" }}>
          {/* Component picker */}
          <select
            value={selectedIdx}
            onChange={(e) => setSelectedIdx(Number(e.target.value))}
            style={{
              width: "100%", padding: "8px 12px",
              background: "var(--ck-bg)", color: "var(--ck-text)",
              border: "1px solid var(--ck-border)", borderRadius: "8px",
              fontSize: "14px", cursor: "pointer", outline: "none",
            }}
          >
            {COMPONENT_CONFIGS.map((c, i) => (
              <option key={c.name} value={i}>{c.name}</option>
            ))}
          </select>

          {/* Prop controls */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
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
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {/* Preview panel */}
        <div style={panelStyle}>
          <div style={panelHeaderStyle}>
            <span style={sectionLabelStyle}>Preview</span>
            <Badge variant="info" size="sm">{config.name}</Badge>
          </div>
          <div style={{
            padding: "32px 24px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "120px",
          }}>
            <ErrorBoundary resetKey={JSON.stringify(currentProps)}>
              {config.render(currentProps, extra)}
            </ErrorBoundary>
          </div>
        </div>

        {/* Code snippet panel */}
        <div style={panelStyle}>
          <div style={panelHeaderStyle}>
            <span style={sectionLabelStyle}>Code</span>
            <button
              onClick={() => copy(code)}
              style={{
                display: "flex", alignItems: "center", gap: "4px",
                fontSize: "11px",
                color: copied ? "var(--ck-primary)" : "var(--ck-text-muted)",
                background: "none", border: "none", cursor: "pointer",
                padding: "2px 8px", borderRadius: "4px",
              }}
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <Highlight theme={themes.vsDark} code={code} language="jsx">
            {({ style, tokens, getLineProps, getTokenProps }) => (
              <pre style={{
                ...style,
                margin: 0,
                padding: "16px",
                borderRadius: 0,
                fontSize: "12px",
                lineHeight: 1.65,
                overflowX: "auto",
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

const SANDBOX_SCOPE_KEYS = [
  "React", "useState", "useEffect", "useRef", "useCallback",
  "Button", "Input", "Card", "CardHeader", "CardBody", "CardFooter",
  "Badge", "Avatar", "AvatarGroup", "Toggle", "Alert", "Divider",
  "Skeleton", "SkeletonCard", "Tooltip", "Select", "Tabs", "Accordion",
  "Textarea", "Slider", "Progress", "Spinner", "Modal",
];

function buildScope() {
  return {
    React, useState, useEffect, useRef, useCallback,
    Button, Input, Card, CardHeader, CardBody, CardFooter,
    Badge, Avatar, AvatarGroup, Toggle, Alert, Divider,
    Skeleton, SkeletonCard, Tooltip, Select, Tabs, Accordion,
    Textarea, Slider, Progress, Spinner, Modal,
  };
}

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

  // Lazy-load Babel once
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

  // Debounced execution when code / babel-ready changes
  useEffect(() => {
    if (!babelReady) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => executeCode(code), 500);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [code, babelReady, executeCode]);

  const syncLineNumbers = () => {
    if (lineNumRef.current && textareaRef.current) {
      lineNumRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const handleCompChange = (name: string) => {
    setSelectedComp(name);
    setCode(SANDBOX_PRESETS[name]);
  };

  const lineCount = code.split("\n").length;

  const editorSelectStyle: React.CSSProperties = {
    padding: "7px 12px",
    background: "var(--ck-bg)",
    color: "var(--ck-text)",
    border: "1px solid var(--ck-border)",
    borderRadius: "8px",
    fontSize: "13px",
    cursor: "pointer",
    outline: "none",
    flex: 1,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* ── Left: editor ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {/* Toolbar */}
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <select
            value={selectedComp}
            onChange={(e) => handleCompChange(e.target.value)}
            style={editorSelectStyle}
          >
            {presetNames.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
          <button
            onClick={() => setCode(SANDBOX_PRESETS[selectedComp])}
            title="Reset to preset"
            style={{
              display: "flex", alignItems: "center", gap: "4px",
              padding: "7px 12px",
              background: "var(--ck-surface)", color: "var(--ck-text-muted)",
              border: "1px solid var(--ck-border)", borderRadius: "8px",
              fontSize: "12px", cursor: "pointer", whiteSpace: "nowrap",
            }}
          >
            <RefreshCcw size={12} /> Reset
          </button>
        </div>

        {/* Editor box */}
        <div style={{
          background: "#1e1e2e",
          border: "1px solid var(--ck-border)",
          borderRadius: "12px",
          overflow: "hidden",
        }}>
          {/* Fake window chrome */}
          <div style={{
            padding: "8px 14px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            display: "flex", alignItems: "center", gap: "6px",
          }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57", display: "inline-block" }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e", display: "inline-block" }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840", display: "inline-block" }} />
            <span style={{ marginLeft: 8, fontSize: "11px", color: "rgba(205,214,244,0.4)", fontFamily: "monospace" }}>
              demo.jsx
            </span>
          </div>

          {/* Line numbers + textarea */}
          <div style={{ display: "flex", maxHeight: "420px", overflow: "hidden" }}>
            {/* Line numbers */}
            <div
              ref={lineNumRef}
              aria-hidden="true"
              style={{
                padding: "14px 10px 14px 12px",
                background: "transparent",
                color: "rgba(205,214,244,0.25)",
                fontSize: "13px",
                lineHeight: "1.6",
                fontFamily: "monospace",
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

            {/* Textarea */}
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
                padding: "14px 14px 14px 4px",
                background: "transparent",
                color: "#cdd6f4",
                border: "none",
                outline: "none",
                fontFamily: "monospace",
                fontSize: "13px",
                lineHeight: "1.6",
                resize: "none",
                height: "420px",
                overflowY: "auto",
                tabSize: 2,
                caretColor: "#cdd6f4",
                boxSizing: "border-box",
              }}
            />
          </div>
        </div>

        <p style={{ fontSize: "11px", color: "var(--ck-text-muted)", margin: 0 }}>
          Define <code style={{ fontSize: "11px", fontFamily: "monospace" }}>function Demo()</code> returning JSX.
          All @cookest/ui components and React hooks are in scope.
        </p>
      </div>

      {/* ── Right: live preview ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{
          background: "var(--ck-surface)",
          border: "1px solid var(--ck-border)",
          borderRadius: "16px",
          overflow: "hidden",
          flex: 1,
        }}>
          <div style={{
            padding: "10px 16px",
            borderBottom: "1px solid var(--ck-border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
            <span style={{ fontSize: "10px", fontWeight: 700, color: "var(--ck-text-muted)", textTransform: "uppercase", letterSpacing: "0.07em" }}>
              Live Preview
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {babelLoading && <Spinner size="xs" />}
              <Badge variant="info" size="sm">{selectedComp}</Badge>
            </div>
          </div>

          <div style={{ padding: "24px", minHeight: "220px" }}>
            {babelLoading ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", padding: "40px 0" }}>
                <Spinner size="lg" />
                <span style={{ fontSize: "13px", color: "var(--ck-text-muted)" }}>Loading Babel…</span>
              </div>
            ) : error ? (
              <div style={{
                padding: "12px 14px",
                background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.3)",
                borderRadius: "8px",
                color: "#ef4444",
                fontFamily: "monospace",
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
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "120px" }}>
                <span style={{ fontSize: "13px", color: "var(--ck-text-muted)" }}>Waiting for code…</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// StoriesView (Mode 3)
// ═══════════════════════════════════════════════════════════════════════

function StoriesView() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const compStories = ALL_STORIES[selectedIdx];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Component tab row */}
      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
        {ALL_STORIES.map((cs, i) => (
          <button
            key={cs.name}
            onClick={() => setSelectedIdx(i)}
            style={{
              padding: "6px 14px",
              borderRadius: "8px",
              border: `1px solid ${i === selectedIdx ? "var(--ck-primary)" : "var(--ck-border)"}`,
              fontSize: "13px",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.15s",
              background: i === selectedIdx ? "var(--ck-primary)" : "var(--ck-surface)",
              color: i === selectedIdx ? "white" : "var(--ck-text)",
            }}
          >
            {cs.name}
          </button>
        ))}
      </div>

      {/* Story cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "14px",
      }}>
        {compStories.stories.map((story) => (
          <div
            key={story.label}
            style={{
              background: "var(--ck-surface)",
              border: "1px solid var(--ck-border)",
              borderRadius: "16px",
              overflow: "hidden",
            }}
          >
            <div style={{
              padding: "12px 16px",
              borderBottom: "1px solid var(--ck-border)",
            }}>
              <div style={{ fontWeight: 600, fontSize: "14px", color: "var(--ck-heading)", marginBottom: "2px" }}>
                {story.label}
              </div>
              <div style={{ fontSize: "12px", color: "var(--ck-text-muted)", lineHeight: 1.4 }}>
                {story.description}
              </div>
            </div>
            <div style={{
              padding: "20px 16px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
              <ErrorBoundary>
                {story.render()}
              </ErrorBoundary>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// PlaygroundPage (default export)
// ═══════════════════════════════════════════════════════════════════════

const MODES: { id: PlaygroundMode; label: string; icon: ReactNode }[] = [
  { id: "props",   label: "Prop Editor",   icon: <Settings2 size={14} /> },
  { id: "sandbox", label: "Code Sandbox",  icon: <Code2 size={14} /> },
  { id: "stories", label: "Stories",       icon: <Layers size={14} /> },
];

export default function PlaygroundPage() {
  const [mode, setMode] = useState<PlaygroundMode>("props");

  return (
    <div style={{ padding: "32px 24px", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{
          fontSize: "30px",
          fontWeight: 800,
          color: "var(--ck-heading)",
          margin: "0 0 8px",
          letterSpacing: "-0.02em",
        }}>
          🧪 Component Playground
        </h1>
        <p style={{ color: "var(--ck-text-muted)", fontSize: "15px", margin: 0 }}>
          Explore, customize, and test components interactively
        </p>
      </div>

      {/* Mode tabs */}
      <div style={{
        display: "inline-flex",
        gap: "3px",
        background: "var(--ck-surface)",
        border: "1px solid var(--ck-border)",
        borderRadius: "12px",
        padding: "4px",
        marginBottom: "24px",
      }}>
        {MODES.map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "7px 16px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: 500,
              transition: "background 0.15s, color 0.15s",
              background: mode === m.id ? "var(--ck-primary)" : "transparent",
              color: mode === m.id ? "white" : "var(--ck-text-muted)",
            }}
          >
            {m.icon}
            {m.label}
          </button>
        ))}
      </div>

      {/* Mode content */}
      {mode === "props"   && <PropEditor />}
      {mode === "sandbox" && <CodeSandbox />}
      {mode === "stories" && <StoriesView />}
    </div>
  );
}
