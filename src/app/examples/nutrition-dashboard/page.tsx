"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardBody,
  Badge,
  Divider,
  Progress,
  Skeleton,
} from "@cookest/ui";
import { Check, X, Activity, Flame } from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";

// ── SVG Ring ──────────────────────────────────────────────────────────────────

const CIRCUMFERENCE = 2 * Math.PI * 52; // ≈ 326.73

interface MacroRingProps {
  percentage: number;
  color: string;
  label: string;
  current: number;
  target: number;
  unit: string;
  delay?: number;
}

function MacroRing({
  percentage,
  color,
  label,
  current,
  target,
  unit,
  delay = 0,
}: MacroRingProps) {
  const dashOffset = CIRCUMFERENCE * (1 - percentage / 100);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <div style={{ position: "relative", width: "120px", height: "120px" }}>
        <svg viewBox="0 0 120 120" width="120" height="120">
          {/* Track circle */}
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="var(--ck-border)"
            strokeWidth="8"
          />
          {/* Animated progress arc */}
          <g style={{ transform: "rotate(-90deg)", transformOrigin: "60px 60px" }}>
            <motion.circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke={color}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              initial={{ strokeDashoffset: CIRCUMFERENCE }}
              animate={{ strokeDashoffset: dashOffset }}
              transition={{ duration: 1.4, ease: "easeOut", delay }}
            />
          </g>
        </svg>
        {/* Centre text */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontSize: "1.6rem",
              fontWeight: 700,
              fontFamily: "var(--font-mono)",
              color: "var(--ck-heading)",
              lineHeight: 1,
            }}
          >
            {current}
          </span>
          <span
            style={{
              fontSize: "0.7rem",
              color: "var(--ck-text-muted)",
              fontFamily: "var(--font-mono)",
            }}
          >
            {unit}
          </span>
        </div>
      </div>

      <div style={{ textAlign: "center" }}>
        <p
          style={{
            color: "var(--ck-heading)",
            fontWeight: 600,
            fontSize: "0.875rem",
            margin: 0,
          }}
        >
          {label}
        </p>
        <p
          style={{
            color: "var(--ck-text-muted)",
            fontSize: "0.72rem",
            fontFamily: "var(--font-mono)",
            margin: "0.15rem 0 0",
          }}
        >
          {current}
          {unit} / {target}
          {unit}
        </p>
      </div>
    </div>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────

const MACROS: MacroRingProps[] = [
  {
    label: "Protein",
    current: 73,
    target: 100,
    unit: "g",
    percentage: 73,
    color: "var(--ck-primary)",
    delay: 0.3,
  },
  {
    label: "Carbs",
    current: 186,
    target: 250,
    unit: "g",
    percentage: 74,
    color: "var(--ck-info)",
    delay: 0.45,
  },
  {
    label: "Fat",
    current: 52,
    target: 70,
    unit: "g",
    percentage: 74,
    color: "var(--ck-warning)",
    delay: 0.6,
  },
];

interface Nutrient {
  name: string;
  current: number;
  target: number;
  unit: string;
}

const NUTRIENTS: Nutrient[] = [
  { name: "Fiber", current: 18, target: 30, unit: "g" },
  { name: "Sodium", current: 1.4, target: 2.3, unit: "g" },
  { name: "Calcium", current: 620, target: 1000, unit: "mg" },
  { name: "Iron", current: 12, target: 18, unit: "mg" },
  { name: "Vitamin C", current: 45, target: 90, unit: "mg" },
  { name: "Potassium", current: 2.1, target: 4.7, unit: "g" },
  { name: "Magnesium", current: 180, target: 420, unit: "mg" },
  { name: "Zinc", current: 6, target: 11, unit: "mg" },
];

const MEALS = [
  { name: "Avocado Toast", type: "Breakfast", kcal: 320, time: "7:30 AM" },
  { name: "Greek Yogurt", type: "Snack", kcal: 150, time: "10:15 AM" },
  { name: "Chicken Caesar", type: "Lunch", kcal: 580, time: "12:45 PM" },
];

const KCAL_LOGGED = MEALS.reduce((sum, m) => sum + m.kcal, 0); // 1,050
const KCAL_TARGET = 2200;

function nutrientColor(pct: number): "success" | "primary" | "warning" {
  if (pct >= 80) return "success";
  if (pct >= 50) return "primary";
  return "warning";
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function NutritionDashboardPage() {
  return (
    <div className="min-h-screen p-6 md:p-10" style={{ background: "var(--ck-bg)" }}>
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <Breadcrumb />

        {/* Header */}
        <div>
          <p
            style={{
              color: "var(--ck-text-muted)",
              fontSize: "0.7rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: "0.4rem",
            }}
          >
            Today · May 7, 2026
          </p>
          <h1
            style={{
              color: "var(--ck-heading)",
              fontFamily: "var(--font-serif)",
              fontSize: "2rem",
              fontWeight: 700,
              margin: 0,
            }}
          >
            Nutrition Dashboard
          </h1>
        </div>

        {/* ── Section A: Macro Rings ── */}
        <Card variant="default">
          <CardHeader>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Activity size={16} style={{ color: "var(--ck-primary)" }} />
                <h2
                  style={{
                    color: "var(--ck-heading)",
                    fontWeight: 600,
                    fontSize: "1rem",
                    margin: 0,
                  }}
                >
                  Macronutrients
                </h2>
              </div>
              <Badge variant="success" size="sm">
                On Track
              </Badge>
            </div>
          </CardHeader>
          <CardBody>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "clamp(2rem, 6vw, 5rem)",
                flexWrap: "wrap",
                padding: "0.5rem 0",
              }}
            >
              {MACROS.map((macro) => (
                <MacroRing key={macro.label} {...macro} />
              ))}
            </div>
          </CardBody>
        </Card>

        <Divider />

        {/* ── Sections B + C: two-column ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Section B — Micronutrient bars */}
          <Card variant="default">
            <CardHeader>
              <h2
                style={{
                  color: "var(--ck-heading)",
                  fontWeight: 600,
                  fontSize: "1rem",
                  margin: 0,
                }}
              >
                Micronutrients
              </h2>
            </CardHeader>
            <CardBody>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                {NUTRIENTS.map((nutrient, i) => {
                  const pct = Math.round((nutrient.current / nutrient.target) * 100);
                  return (
                    <motion.div
                      key={nutrient.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07, duration: 0.4 }}
                      style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <span
                          style={{
                            color: "var(--ck-text-muted)",
                            fontSize: "0.7rem",
                            fontFamily: "var(--font-mono)",
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                          }}
                        >
                          {nutrient.name}
                        </span>
                        <span
                          style={{
                            color: "var(--ck-text-muted)",
                            fontSize: "0.7rem",
                            fontFamily: "var(--font-mono)",
                          }}
                        >
                          {nutrient.current}
                          {nutrient.unit} / {nutrient.target}
                          {nutrient.unit}
                        </span>
                      </div>
                      <Progress value={pct} size="sm" color={nutrientColor(pct)} />
                    </motion.div>
                  );
                })}
              </div>
            </CardBody>
          </Card>

          {/* Section C — Meal Log + Daily Score */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* Meal Log */}
            <Card variant="default">
              <CardHeader>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Flame size={16} style={{ color: "var(--ck-warning)" }} />
                  <h2
                    style={{
                      color: "var(--ck-heading)",
                      fontWeight: 600,
                      fontSize: "1rem",
                      margin: 0,
                    }}
                  >
                    Meal Log
                  </h2>
                </div>
              </CardHeader>
              <CardBody>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {MEALS.map((meal) => (
                    <div key={meal.name}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "0.75rem 0",
                        }}
                      >
                        <div>
                          <p
                            style={{
                              color: "var(--ck-heading)",
                              fontSize: "0.875rem",
                              fontWeight: 500,
                              margin: 0,
                            }}
                          >
                            {meal.name}
                          </p>
                          <p
                            style={{
                              color: "var(--ck-text-muted)",
                              fontSize: "0.72rem",
                              margin: "0.15rem 0 0",
                            }}
                          >
                            {meal.type}
                          </p>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.75rem",
                          }}
                        >
                          <Badge variant="default" size="sm">
                            {meal.time}
                          </Badge>
                          <span
                            style={{
                              color: "var(--ck-text)",
                              fontSize: "0.85rem",
                              fontFamily: "var(--font-mono)",
                              fontWeight: 600,
                              minWidth: "60px",
                              textAlign: "right",
                            }}
                          >
                            {meal.kcal} kcal
                          </span>
                        </div>
                      </div>
                      <Divider />
                    </div>
                  ))}

                  {/* Dinner — not yet logged */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "0.75rem 0",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <p
                        style={{
                          color: "var(--ck-text-muted)",
                          fontSize: "0.72rem",
                          marginBottom: "0.4rem",
                        }}
                      >
                        Dinner
                      </p>
                      <Skeleton variant="text" width="55%" height={14} />
                    </div>
                    <span
                      style={{ color: "var(--ck-text-muted)", fontSize: "0.72rem" }}
                    >
                      not yet logged
                    </span>
                  </div>

                  <Divider />

                  {/* Total calories */}
                  <div style={{ paddingTop: "1rem" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: "0.4rem",
                        marginBottom: "0.75rem",
                      }}
                    >
                      <span
                        style={{
                          color: "var(--ck-heading)",
                          fontSize: "1.5rem",
                          fontWeight: 700,
                          fontFamily: "var(--font-mono)",
                        }}
                      >
                        {KCAL_LOGGED.toLocaleString()}
                      </span>
                      <span
                        style={{
                          color: "var(--ck-text-muted)",
                          fontSize: "0.875rem",
                          fontFamily: "var(--font-mono)",
                        }}
                      >
                        / {KCAL_TARGET.toLocaleString()} kcal
                      </span>
                    </div>
                    <Progress
                      value={Math.round((KCAL_LOGGED / KCAL_TARGET) * 100)}
                      size="sm"
                      color="primary"
                      showValue
                    />
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Daily Score */}
            <Card variant="default">
              <CardBody>
                <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                  {/* Score number */}
                  <div style={{ textAlign: "center", flexShrink: 0 }}>
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
                      style={{
                        fontSize: "3.5rem",
                        fontWeight: 900,
                        fontFamily: "var(--font-mono)",
                        color: "var(--ck-primary)",
                        lineHeight: 1,
                      }}
                    >
                      82
                    </motion.div>
                    <p
                      style={{
                        color: "var(--ck-text-muted)",
                        fontSize: "0.6rem",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        margin: "0.25rem 0 0",
                      }}
                    >
                      Score
                    </p>
                  </div>

                  {/* Label + bullets */}
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        marginBottom: "0.65rem",
                      }}
                    >
                      <h3
                        style={{
                          color: "var(--ck-heading)",
                          fontWeight: 600,
                          fontSize: "0.9rem",
                          margin: 0,
                        }}
                      >
                        Nutrition Score
                      </h3>
                      <Badge variant="success" size="sm">
                        GOOD
                      </Badge>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                      {[
                        { text: "Protein target met", ok: true },
                        { text: "Under sodium limit", ok: true },
                        { text: "Need more fiber", ok: false },
                      ].map((item) => (
                        <div
                          key={item.text}
                          style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
                        >
                          {item.ok ? (
                            <Check
                              size={13}
                              style={{ color: "var(--ck-success)", flexShrink: 0 }}
                            />
                          ) : (
                            <X
                              size={13}
                              style={{ color: "var(--ck-error)", flexShrink: 0 }}
                            />
                          )}
                          <span
                            style={{
                              color: "var(--ck-text-muted)",
                              fontSize: "0.78rem",
                            }}
                          >
                            {item.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
