"use client";

import { useState, useEffect, useRef, KeyboardEvent } from "react";
import { Badge, Divider } from "@cookest/ui";
import { Terminal, ChevronRight, Star } from "lucide-react";
import { ExampleCliHint } from "@/components/Playground";
import { Breadcrumb } from "@/components/Breadcrumb";

// ─── Types ────────────────────────────────────────────────────────────────────

type HistoryEntry =
  | { type: "command"; text: string }
  | { type: "output"; lines: OutputLine[] }
  | { type: "divider" };

type OutputLine =
  | { kind: "text"; content: string; color?: string }
  | { kind: "recipe"; name: string; cuisine: string; time: string; rating: number }
  | { kind: "ingredient"; item: string; checked: boolean }
  | { kind: "macro"; label: string; value: string }
  | { kind: "history-item"; cmd: string; at: string }
  | { kind: "error"; content: string }
  | { kind: "help-row"; cmd: string; desc: string };

// ─── Static command database ───────────────────────────────────────────────────

const COMMANDS: Record<string, HistoryEntry[]> = {
  'brew recipe --search "pasta"': [
    {
      type: "output",
      lines: [
        { kind: "text", content: "Searching recipe index… found 3 results." },
        { kind: "recipe", name: "Cacio e Pepe", cuisine: "Italian", time: "25 min", rating: 4.9 },
        { kind: "recipe", name: "Spaghetti Carbonara", cuisine: "Italian", time: "30 min", rating: 4.7 },
        { kind: "recipe", name: "Penne Arrabbiata", cuisine: "Italian", time: "20 min", rating: 4.5 },
      ],
    },
  ],
  'cook "Cacio e Pepe" --servings 2': [
    {
      type: "output",
      lines: [
        { kind: "text", content: "Loading recipe: Cacio e Pepe  (servings: 2)" },
        { kind: "text", content: "" },
        { kind: "text", content: "Ingredients:", color: "heading" },
        { kind: "ingredient", item: "200g spaghetti", checked: true },
        { kind: "ingredient", item: "100g Pecorino Romano, finely grated", checked: true },
        { kind: "ingredient", item: "50g Parmigiano Reggiano, grated", checked: true },
        { kind: "ingredient", item: "2 tsp freshly cracked black pepper", checked: true },
        { kind: "ingredient", item: "Salt, for pasta water", checked: false },
        { kind: "text", content: "" },
        { kind: "text", content: "4 steps  ·  25 min total  ·  difficulty: easy" },
      ],
    },
  ],
  "nutrition --last": [
    {
      type: "output",
      lines: [
        { kind: "text", content: "Nutrition for: Cacio e Pepe (last cooked)" },
        { kind: "text", content: "" },
        { kind: "text", content: "┌─────────────┬────────────┐" },
        { kind: "macro", label: "Calories    ", value: "  520 kcal  " },
        { kind: "macro", label: "Protein     ", value: "   22 g     " },
        { kind: "macro", label: "Carbs       ", value: "   65 g     " },
        { kind: "macro", label: "Fat         ", value: "   18 g     " },
        { kind: "macro", label: "Fiber       ", value: "    3 g     " },
        { kind: "text", content: "└─────────────┴────────────┘" },
      ],
    },
  ],
  "history --today": [
    {
      type: "output",
      lines: [
        { kind: "text", content: "Command history — today" },
        { kind: "text", content: "" },
        { kind: "history-item", cmd: 'brew recipe --search "pasta"', at: "09:14" },
        { kind: "history-item", cmd: 'cook "Cacio e Pepe" --servings 2', at: "09:15" },
        { kind: "history-item", cmd: "nutrition --last", at: "09:16" },
      ],
    },
  ],
  help: [
    {
      type: "output",
      lines: [
        { kind: "text", content: "recipe-cli v1.0.0  —  available commands" },
        { kind: "text", content: "" },
        { kind: "help-row", cmd: "brew recipe --search <query>", desc: "Search recipe index" },
        { kind: "help-row", cmd: 'cook "<name>" --servings N', desc: "Load a recipe" },
        { kind: "help-row", cmd: "nutrition --last", desc: "Macros for last recipe" },
        { kind: "help-row", cmd: "history --today", desc: "Show today's commands" },
        { kind: "help-row", cmd: "help", desc: "Show this message" },
      ],
    },
  ],
};

const PILLS = [
  'brew recipe --search "pasta"',
  "cook --random",
  "nutrition --week",
  "help",
];

// ─── Seed history ─────────────────────────────────────────────────────────────

const SEED: HistoryEntry[] = [
  { type: "output", lines: [{ kind: "text", content: "Welcome to recipe-cli 1.0.0. Type 'help' for commands." }] },
  { type: "divider" },
  { type: "command", text: 'brew recipe --search "pasta"' },
  ...COMMANDS['brew recipe --search "pasta"'],
  { type: "divider" },
  { type: "command", text: 'cook "Cacio e Pepe" --servings 2' },
  ...COMMANDS['cook "Cacio e Pepe" --servings 2'],
  { type: "divider" },
  { type: "command", text: "nutrition --last" },
  ...COMMANDS["nutrition --last"],
  { type: "divider" },
  { type: "command", text: "history --today" },
  ...COMMANDS["history --today"],
  { type: "divider" },
];

// ─── Output line renderer ─────────────────────────────────────────────────────

function RenderLine({ line }: { line: OutputLine }) {
  switch (line.kind) {
    case "text":
      return (
        <div
          style={{
            color: line.color === "heading" ? "var(--ck-primary)" : "var(--ck-text-muted)",
            fontFamily: "var(--font-mono)",
            fontSize: "0.8rem",
            lineHeight: 1.6,
            whiteSpace: "pre",
          }}
        >
          {line.content || "\u00A0"}
        </div>
      );

    case "recipe":
      return (
        <div
          className="flex items-center gap-3 py-0.5"
          style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem" }}
        >
          <ChevronRight size={12} style={{ color: "var(--ck-primary)", flexShrink: 0 }} />
          <span style={{ color: "var(--ck-primary)", minWidth: 180 }}>{line.name}</span>
          <Badge
            variant="default"
            size="sm"
            style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", opacity: 0.85 }}
          >
            {line.cuisine}
          </Badge>
          <span style={{ color: "var(--ck-text-muted)", fontSize: "0.75rem" }}>{line.time}</span>
          <span style={{ color: "#f0c040", fontSize: "0.75rem" }}>
            <Star size={10} style={{ display: "inline", marginBottom: 1 }} /> {line.rating}
          </span>
        </div>
      );

    case "ingredient":
      return (
        <div
          className="flex items-center gap-2"
          style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", paddingLeft: 8 }}
        >
          <span style={{ color: line.checked ? "var(--ck-success)" : "var(--ck-text-muted)" }}>
            {line.checked ? "✓" : "○"}
          </span>
          <span style={{ color: line.checked ? "var(--ck-text)" : "var(--ck-text-muted)" }}>
            {line.item}
          </span>
        </div>
      );

    case "macro":
      return (
        <div
          style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--ck-text-muted)", whiteSpace: "pre" }}
        >
          {"│ "}
          <span style={{ color: "var(--ck-text)" }}>{line.label}</span>
          {"│"}
          <span style={{ color: "var(--ck-primary)" }}>{line.value}</span>
          {"│"}
        </div>
      );

    case "history-item":
      return (
        <div
          className="flex gap-3"
          style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem" }}
        >
          <span style={{ color: "var(--ck-text-muted)", minWidth: 40 }}>{line.at}</span>
          <span style={{ color: "var(--ck-primary)" }}>{line.cmd}</span>
        </div>
      );

    case "error":
      return (
        <div style={{ color: "var(--ck-error)", fontFamily: "var(--font-mono)", fontSize: "0.8rem" }}>
          {line.content}
        </div>
      );

    case "help-row":
      return (
        <div
          className="flex gap-4"
          style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", paddingLeft: 4 }}
        >
          <span style={{ color: "var(--ck-primary)", minWidth: 240 }}>{line.cmd}</span>
          <span style={{ color: "var(--ck-text-muted)" }}>{line.desc}</span>
        </div>
      );

    default:
      return null;
  }
}

// ─── Cursor blink ─────────────────────────────────────────────────────────────

function BlinkCursor() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const id = setInterval(() => setVisible((v) => !v), 530);
    return () => clearInterval(id);
  }, []);
  return (
    <span
      style={{
        display: "inline-block",
        width: 8,
        height: "1em",
        background: visible ? "var(--ck-primary)" : "transparent",
        marginLeft: 1,
        verticalAlign: "text-bottom",
      }}
    />
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function TerminalPage() {
  const [history, setHistory] = useState<HistoryEntry[]>(SEED);
  const [inputValue, setInputValue] = useState("");
  const historyEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    historyEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const runCommand = (raw: string) => {
    const cmd = raw.trim();
    if (!cmd) return;

    const result = COMMANDS[cmd];
    const newEntries: HistoryEntry[] = [
      { type: "command", text: cmd },
      ...(result
        ? result
        : [
            {
              type: "output" as const,
              lines: [
                {
                  kind: "error" as const,
                  content: `bash: ${cmd.split(" ")[0]}: command not found. Try 'help'.`,
                },
              ],
            },
          ]),
      { type: "divider" },
    ];

    setHistory((prev) => [...prev, ...newEntries]);
    setInputValue("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") runCommand(inputValue);
  };

  const handlePill = (cmd: string) => {
    setInputValue(cmd);
    inputRef.current?.focus();
  };

  return (
    <div>
      <Breadcrumb />
      <ExampleCliHint components={["Badge", "Divider", "Input"]} />

      {/* Page header */}
      <div className="mb-8 flex items-start gap-4">
        <div
          className="flex items-center justify-center rounded-xl"
          style={{
            width: 48,
            height: 48,
            background: "rgba(122,154,101,0.1)",
            color: "var(--ck-primary)",
            flexShrink: 0,
          }}
        >
          <Terminal size={22} />
        </div>
        <div>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.75rem",
              fontWeight: 700,
              color: "var(--ck-heading)",
              margin: 0,
            }}
          >
            Terminal Interface
          </h1>
          <p style={{ color: "var(--ck-text-muted)", fontSize: "0.9rem", margin: "4px 0 0" }}>
            Components used in a dark CLI aesthetic. Same design system — radically different feel.
          </p>
        </div>
      </div>

      {/* Component tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        {["Badge", "Divider", "Input"].map((t) => (
          <Badge key={t} variant="default" size="sm">{t}</Badge>
        ))}
      </div>

      {/* ── Terminal window ─────────────────────────────────────────────────── */}
      <div
        style={{
          background: "#0d1117",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)",
          maxWidth: 780,
        }}
      >
        {/* Title bar */}
        <div
          className="flex items-center gap-3 px-4 py-3"
          style={{ background: "#161b22", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div className="flex items-center gap-1.5">
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f56" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ffbd2e" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#27c93f" }} />
          </div>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: "rgba(255,255,255,0.35)",
              letterSpacing: "0.02em",
            }}
          >
            recipe-cli — bash
          </span>
        </div>

        {/* History area */}
        <div
          className="overflow-y-auto p-5"
          style={{
            height: 420,
            fontFamily: "var(--font-mono)",
          }}
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((entry, i) => {
            if (entry.type === "divider") {
              return (
                <div key={i} style={{ margin: "10px 0" }}>
                  <Divider />
                </div>
              );
            }
            if (entry.type === "command") {
              return (
                <div key={i} className="flex items-center gap-1.5" style={{ marginBottom: 4 }}>
                  <span style={{ color: "#27c93f", fontSize: "0.8rem" }}>$</span>
                  <span style={{ color: "var(--ck-primary)", fontFamily: "var(--font-mono)", fontSize: "0.8rem" }}>
                    {entry.text}
                  </span>
                </div>
              );
            }
            if (entry.type === "output") {
              return (
                <div key={i} className="flex flex-col gap-0.5 mb-1 pl-4">
                  {entry.lines.map((line, j) => (
                    <RenderLine key={j} line={line} />
                  ))}
                </div>
              );
            }
            return null;
          })}
          <div ref={historyEndRef} />
        </div>

        {/* Command suggestions (pills) */}
        <div
          className="flex flex-wrap gap-2 px-5 py-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          {PILLS.map((pill) => (
            <button
              key={pill}
              onClick={() => handlePill(pill)}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                color: "var(--ck-primary)",
                background: "rgba(122,154,101,0.1)",
                border: "1px solid rgba(122,154,101,0.25)",
                borderRadius: 20,
                padding: "3px 10px",
                cursor: "pointer",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(122,154,101,0.2)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(122,154,101,0.1)")}
            >
              {pill}
            </button>
          ))}
        </div>

        {/* Active input line */}
        <div
          className="flex items-center gap-2 px-5 py-3"
          onClick={() => inputRef.current?.focus()}
        >
          <span style={{ color: "#27c93f", fontFamily: "var(--font-mono)", fontSize: "0.85rem", flexShrink: 0 }}>
            $
          </span>
          <input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            autoComplete="off"
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "var(--ck-primary)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.85rem",
              caretColor: "var(--ck-primary)",
            }}
            placeholder="type a command…"
          />
          {inputValue === "" && <BlinkCursor />}
        </div>
      </div>

      {/* Footer note */}
      <p
        className="mt-5"
        style={{ color: "var(--ck-text-muted)", fontSize: "0.8rem", fontFamily: "var(--font-mono)" }}
      >
        # Try clicking a suggestion pill or type a command — press Enter to execute.
      </p>
    </div>
  );
}
