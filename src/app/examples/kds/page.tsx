"use client";

import { useState, useEffect, useRef } from "react";
import { Badge, Button, Divider } from "@cookest/ui";
import { Clock, Plus, CheckCheck, ChevronRight } from "lucide-react";
import { ExampleCliHint } from "@/components/Playground";
import { Breadcrumb } from "@/components/Breadcrumb";

// ─── Types ────────────────────────────────────────────────────────────────────

type Stage = "NEW" | "COOKING" | "PLATING" | "READY";

interface OrderItem {
  qty: number;
  name: string;
  allergies?: string[];
}

interface Order {
  id: string;
  table: number;
  stage: Stage;
  startedAt: number; // Date.now() - N*1000
  items: OrderItem[];
}

// ─── Stage config ─────────────────────────────────────────────────────────────

const STAGES: { key: Stage; label: string; accentColor: string }[] = [
  { key: "NEW",     label: "NEW",     accentColor: "var(--ck-error)" },
  { key: "COOKING", label: "COOKING", accentColor: "var(--ck-warning)" },
  { key: "PLATING", label: "PLATING", accentColor: "#3b9ede" },
  { key: "READY",   label: "READY",   accentColor: "var(--ck-success)" },
];

// ─── Seed orders ─────────────────────────────────────────────────────────────

const now = Date.now();

const SEED_ORDERS: Order[] = [
  {
    id: "#041",
    table: 4,
    stage: "NEW",
    startedAt: now - 2 * 60 * 1000,
    items: [
      { qty: 1, name: "Tonkotsu Ramen", allergies: ["GLUTEN"] },
      { qty: 1, name: "Gyoza (6 pcs)" },
    ],
  },
  {
    id: "#042",
    table: 7,
    stage: "NEW",
    startedAt: now - 1 * 60 * 1000,
    items: [
      { qty: 2, name: "Margherita Pizza", allergies: ["GLUTEN"] },
      { qty: 1, name: "Burrata Salad" },
      { qty: 1, name: "Tiramisu", allergies: ["GLUTEN"] },
    ],
  },
  {
    id: "#038",
    table: 2,
    stage: "COOKING",
    startedAt: now - 8 * 60 * 1000,
    items: [
      { qty: 1, name: "Beef Tartare", allergies: ["NUTS"] },
      { qty: 2, name: "Duck Confit" },
    ],
  },
  {
    id: "#039",
    table: 11,
    stage: "COOKING",
    startedAt: now - 12 * 60 * 1000,
    items: [
      { qty: 1, name: "Wagyu Ribeye 200g" },
      { qty: 1, name: "Truffle Fries", allergies: ["GLUTEN"] },
      { qty: 1, name: "Caesar Salad" },
    ],
  },
  {
    id: "#040",
    table: 5,
    stage: "COOKING",
    startedAt: now - 6 * 60 * 1000,
    items: [
      { qty: 3, name: "Cacio e Pepe", allergies: ["GLUTEN"] },
      { qty: 1, name: "Arancini (4 pcs)" },
    ],
  },
  {
    id: "#035",
    table: 9,
    stage: "PLATING",
    startedAt: now - 18 * 60 * 1000,
    items: [
      { qty: 2, name: "Lobster Bisque" },
      { qty: 1, name: "Pan-Seared Scallops" },
      { qty: 1, name: "Crème Brûlée" },
    ],
  },
  {
    id: "#037",
    table: 3,
    stage: "PLATING",
    startedAt: now - 14 * 60 * 1000,
    items: [
      { qty: 1, name: "Chicken Piccata" },
      { qty: 1, name: "Risotto Funghi", allergies: ["NUTS"] },
    ],
  },
  {
    id: "#033",
    table: 8,
    stage: "READY",
    startedAt: now - 22 * 60 * 1000,
    items: [
      { qty: 2, name: "Miso Salmon" },
      { qty: 2, name: "Edamame" },
    ],
  },
  {
    id: "#034",
    table: 1,
    stage: "READY",
    startedAt: now - 19 * 60 * 1000,
    items: [
      { qty: 1, name: "Steak Frites", allergies: ["GLUTEN"] },
      { qty: 1, name: "Onion Soup Gratinée", allergies: ["GLUTEN"] },
      { qty: 1, name: "Profiteroles", allergies: ["NUTS", "GLUTEN"] },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const RANDOM_ITEMS: OrderItem[][] = [
  [{ qty: 2, name: "Tagliatelle Bolognese", allergies: ["GLUTEN"] }, { qty: 1, name: "Panna Cotta" }],
  [{ qty: 1, name: "Grilled Seabass" }, { qty: 1, name: "Green Salad" }, { qty: 2, name: "Sourdough" , allergies: ["GLUTEN"] }],
  [{ qty: 3, name: "Cheeseburger", allergies: ["GLUTEN"] }, { qty: 3, name: "Truffle Fries", allergies: ["GLUTEN"] }],
  [{ qty: 1, name: "Rack of Lamb" }, { qty: 2, name: "Dauphinois Gratin" }, { qty: 1, name: "Lava Cake", allergies: ["NUTS", "GLUTEN"] }],
  [{ qty: 1, name: "Sushi Platter (12 pcs)" }, { qty: 1, name: "Miso Soup" }, { qty: 1, name: "Matcha Ice Cream" }],
];

let nextOrderNum = 43;

function formatElapsed(ms: number): { label: string; urgency: "normal" | "warn" | "critical" } {
  const secs = Math.floor(ms / 1000);
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  const label = `${m}m ${s < 10 ? "0" + s : s}s`;
  return {
    label,
    urgency: m >= 15 ? "critical" : m >= 10 ? "warn" : "normal",
  };
}

const NEXT_STAGE: Record<Stage, Stage | null> = {
  NEW: "COOKING",
  COOKING: "PLATING",
  PLATING: "READY",
  READY: null,
};

// ─── Order Card ───────────────────────────────────────────────────────────────

function OrderCard({
  order,
  tick,
  onAdvance,
  onDone,
}: {
  order: Order;
  tick: number;
  onAdvance: (id: string) => void;
  onDone: (id: string) => void;
}) {
  const elapsed = formatElapsed(tick - order.startedAt);

  const elapsedColor =
    elapsed.urgency === "critical"
      ? "var(--ck-error)"
      : elapsed.urgency === "warn"
      ? "var(--ck-warning)"
      : "var(--ck-text-muted)";

  return (
    <div
      style={{
        border: "2px solid var(--ck-border)",
        borderRadius: 0,
        background: "var(--ck-bg)",
        padding: 12,
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      {/* Top row */}
      <div className="flex items-center justify-between">
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontWeight: 700,
            fontSize: "1rem",
            color: "var(--ck-heading)",
            letterSpacing: "-0.02em",
          }}
        >
          {order.id}
        </span>
        <div className="flex items-center gap-2">
          <Badge variant="default" size="sm" style={{ fontFamily: "var(--font-mono)", borderRadius: 0 }}>
            T{order.table}
          </Badge>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              color: elapsedColor,
              fontWeight: elapsed.urgency !== "normal" ? 700 : 400,
            }}
          >
            <Clock size={10} style={{ display: "inline", marginBottom: 1, marginRight: 3 }} />
            {elapsed.label}
          </span>
        </div>
      </div>

      <Divider />

      {/* Items */}
      <div className="flex flex-col gap-1">
        {order.items.map((item, i) => (
          <div key={i} className="flex items-start gap-2">
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                color: "var(--ck-primary)",
                minWidth: 18,
                fontWeight: 700,
              }}
            >
              {item.qty}×
            </span>
            <div className="flex flex-wrap items-center gap-1 flex-1">
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  color: "var(--ck-text)",
                }}
              >
                {item.name}
              </span>
              {item.allergies?.map((a) => (
                <Badge key={a} variant="error" size="sm" style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", borderRadius: 0 }}>
                  {a}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Action row */}
      <div className="flex items-center gap-2 mt-1">
        {order.stage !== "READY" ? (
          <Button
            variant="primary"
            size="sm"
            style={{ borderRadius: 0, fontFamily: "var(--font-mono)", fontSize: "0.7rem", flex: 1 }}
            iconRight={<ChevronRight size={12} />}
            onClick={() => onAdvance(order.id)}
          >
            {order.stage === "NEW" ? "START" : order.stage === "COOKING" ? "PLATE" : "MARK READY"}
          </Button>
        ) : (
          <Button
            variant="secondary"
            size="sm"
            style={{ borderRadius: 0, fontFamily: "var(--font-mono)", fontSize: "0.7rem", flex: 1 }}
            iconRight={<CheckCheck size={12} />}
            onClick={() => onDone(order.id)}
          >
            SERVED
          </Button>
        )}
      </div>
    </div>
  );
}

// ─── KDS Column ───────────────────────────────────────────────────────────────

function KDSColumn({
  stage,
  orders,
  tick,
  onAdvance,
  onDone,
}: {
  stage: (typeof STAGES)[number];
  orders: Order[];
  tick: number;
  onAdvance: (id: string) => void;
  onDone: (id: string) => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 0,
        border: "2px solid var(--ck-border)",
        borderTop: `4px solid ${stage.accentColor}`,
        borderRadius: 0,
        overflow: "hidden",
        background: "var(--ck-surface)",
      }}
    >
      {/* Column header */}
      <div
        className="flex items-center justify-between px-3 py-2"
        style={{
          background: "var(--ck-surface)",
          borderBottom: "2px solid var(--ck-border)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontWeight: 800,
            fontSize: "0.85rem",
            letterSpacing: "0.12em",
            color: stage.accentColor,
            textTransform: "uppercase",
          }}
        >
          {stage.label}
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            fontWeight: 700,
            minWidth: 22,
            height: 22,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: stage.accentColor,
            color: "#fff",
            borderRadius: 0,
          }}
        >
          {orders.length}
        </span>
      </div>

      {/* Cards */}
      <div
        className="flex flex-col overflow-y-auto"
        style={{ gap: 0, flex: 1, minHeight: 120 }}
      >
        {orders.length === 0 ? (
          <div
            className="flex items-center justify-center"
            style={{
              height: 80,
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              color: "var(--ck-text-muted)",
              opacity: 0.5,
              letterSpacing: "0.05em",
            }}
          >
            — EMPTY —
          </div>
        ) : (
          orders.map((order, i) => (
            <div key={order.id} style={{ borderTop: i === 0 ? "none" : "2px solid var(--ck-border)" }}>
              <div style={{ padding: "10px 10px 8px" }}>
                <OrderCard
                  order={order}
                  tick={tick}
                  onAdvance={onAdvance}
                  onDone={onDone}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function KDSPage() {
  const [orders, setOrders] = useState<Order[]>(SEED_ORDERS);
  const [tick, setTick] = useState(Date.now());
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    tickRef.current = setInterval(() => setTick(Date.now()), 1000);
    return () => { if (tickRef.current) clearInterval(tickRef.current); };
  }, []);

  const advanceOrder = (id: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== id) return o;
        const next = NEXT_STAGE[o.stage];
        return next ? { ...o, stage: next } : o;
      })
    );
  };

  const doneOrder = (id: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
  };

  const addTestOrder = () => {
    const num = `#${String(nextOrderNum++).padStart(3, "0")}`;
    const table = Math.floor(Math.random() * 14) + 1;
    const items = RANDOM_ITEMS[Math.floor(Math.random() * RANDOM_ITEMS.length)];
    setOrders((prev) => [
      ...prev,
      {
        id: num,
        table,
        stage: "NEW",
        startedAt: Date.now(),
        items,
      },
    ]);
  };

  const ordersByStage = (stage: Stage) => orders.filter((o) => o.stage === stage);

  return (
    <div>
      <Breadcrumb />
      <ExampleCliHint components={["Badge", "Button", "Card", "Divider"]} />

      {/* Page header */}
      <div className="flex items-start justify-between mb-6 gap-4">
        <div className="flex items-start gap-4">
          <div
            className="flex items-center justify-center"
            style={{
              width: 48,
              height: 48,
              background: "rgba(122,154,101,0.1)",
              color: "var(--ck-primary)",
              flexShrink: 0,
              borderRadius: 0,
              border: "2px solid var(--ck-border)",
            }}
          >
            <Clock size={22} />
          </div>
          <div>
            <h1
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "1.5rem",
                fontWeight: 800,
                color: "var(--ck-heading)",
                margin: 0,
                letterSpacing: "-0.02em",
                textTransform: "uppercase",
              }}
            >
              Kitchen Display System
            </h1>
            <p style={{ color: "var(--ck-text-muted)", fontSize: "0.85rem", margin: "4px 0 0", fontFamily: "var(--font-mono)" }}>
              Live order board. Brutalist. Functional. Zero softness.
            </p>
          </div>
        </div>

        <Button
          variant="secondary"
          size="sm"
          iconLeft={<Plus size={14} />}
          onClick={addTestOrder}
          style={{ borderRadius: 0, fontFamily: "var(--font-mono)", flexShrink: 0 }}
        >
          ADD TEST ORDER
        </Button>
      </div>

      {/* Component tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {["Badge", "Button", "Divider"].map((t) => (
          <Badge key={t} variant="default" size="sm">{t}</Badge>
        ))}
        <Badge variant="warning" size="sm" style={{ borderRadius: 0, fontFamily: "var(--font-mono)" }}>LIVE TIMER</Badge>
      </div>

      {/* ── KDS Grid ──────────────────────────────────────────────────────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 12,
          alignItems: "start",
        }}
      >
        {STAGES.map((stage) => (
          <KDSColumn
            key={stage.key}
            stage={stage}
            orders={ordersByStage(stage.key)}
            tick={tick}
            onAdvance={advanceOrder}
            onDone={doneOrder}
          />
        ))}
      </div>

      {/* Footer note */}
      <p
        className="mt-6"
        style={{
          color: "var(--ck-text-muted)",
          fontSize: "0.75rem",
          fontFamily: "var(--font-mono)",
          letterSpacing: "0.04em",
        }}
      >
        // CLICK "START" TO MOVE ORDER THROUGH STAGES. TIMES UPDATE EVERY SECOND. YELLOW &gt;10MIN, RED &gt;15MIN.
      </p>
    </div>
  );
}
