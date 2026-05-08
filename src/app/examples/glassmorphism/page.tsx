"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button, Skeleton } from "@cookest/ui";
import { Plus, Flame } from "lucide-react";

type MealEntry = { name: string; cal: number } | null;

interface DayMeals {
  breakfast: MealEntry;
  lunch: MealEntry;
  dinner: MealEntry;
}

const DAYS: { short: string; date: number; today?: boolean }[] = [
  { short: "MON", date: 5 },
  { short: "TUE", date: 6 },
  { short: "WED", date: 7, today: true },
  { short: "THU", date: 8 },
  { short: "FRI", date: 9 },
  { short: "SAT", date: 10 },
  { short: "SUN", date: 11 },
];

const MEALS: Record<string, DayMeals> = {
  MON: {
    breakfast: { name: "Avocado Toast", cal: 320 },
    lunch: { name: "Caesar Salad", cal: 480 },
    dinner: null,
  },
  TUE: {
    breakfast: { name: "Yogurt Parfait", cal: 290 },
    lunch: null,
    dinner: { name: "Pasta Carbonara", cal: 720 },
  },
  WED: {
    breakfast: { name: "Overnight Oats", cal: 340 },
    lunch: { name: "Chicken Wrap", cal: 540 },
    dinner: { name: "Salmon & Veg", cal: 620 },
  },
  THU: {
    breakfast: null,
    lunch: { name: "Lentil Soup", cal: 390 },
    dinner: { name: "Beef Stir Fry", cal: 680 },
  },
  FRI: {
    breakfast: { name: "Smoothie Bowl", cal: 380 },
    lunch: null,
    dinner: { name: "Tacos Al Pastor", cal: 760 },
  },
  SAT: {
    breakfast: { name: "Pancakes", cal: 520 },
    lunch: { name: "Bruschetta", cal: 310 },
    dinner: null,
  },
  SUN: {
    breakfast: null,
    lunch: { name: "Roast Chicken", cal: 650 },
    dinner: { name: "Risotto", cal: 590 },
  },
};

const CALORIE_TARGET = 2200;

const MEAL_COLORS: Record<"breakfast" | "lunch" | "dinner", string> = {
  breakfast: "#f59e0b",
  lunch: "#14b8a6",
  dinner: "#a78bfa",
};

export default function GlassmorphismPage() {
  const [hoveredDay, setHoveredDay] = useState<string | null>(null);

  // Clear body/html backgrounds so the fixed gradient shows through
  useEffect(() => {
    const prevBody = document.body.style.background;
    document.body.style.background = "transparent";
    return () => {
      document.body.style.background = prevBody;
    };
  }, []);

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      {/* ── Fixed gradient backdrop ── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -1,
          background: "linear-gradient(135deg, #7c3aed 0%, #0369a1 40%, #059669 100%)",
        }}
      >
        {/* Pink blob — top-left */}
        <div
          style={{
            position: "absolute",
            top: "-10%",
            left: "-10%",
            width: "60vw",
            height: "60vw",
            borderRadius: "50%",
            background: "#ec4899",
            filter: "blur(120px)",
            opacity: 0.6,
          }}
        />
        {/* Blue blob — bottom-right */}
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            right: "-5%",
            width: "50vw",
            height: "50vw",
            borderRadius: "50%",
            background: "#3b82f6",
            filter: "blur(120px)",
            opacity: 0.5,
          }}
        />
        {/* Cyan blob — centre */}
        <div
          style={{
            position: "absolute",
            top: "40%",
            left: "30%",
            width: "40vw",
            height: "40vw",
            borderRadius: "50%",
            background: "#22d3ee",
            filter: "blur(120px)",
            opacity: 0.4,
          }}
        />
      </div>

      {/* ── Page content ── */}
      <div style={{ padding: "3rem 1.5rem 4rem", maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
            marginBottom: "2.5rem",
          }}
        >
          <div>
            <p
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: "0.4rem",
              }}
            >
              Meal Planner
            </p>
            <h1
              style={{
                color: "rgba(255,255,255,0.95)",
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                fontWeight: 700,
                fontFamily: "var(--font-serif)",
                margin: 0,
              }}
            >
              Week of May 5 – 11, 2026
            </h1>
          </div>
          <Button variant="ghost" iconLeft={<Plus size={16} />}>
            Add Meal
          </Button>
        </motion.div>

        {/* ── 7-day grid ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, minmax(128px, 1fr))",
            gap: "0.75rem",
            overflowX: "auto",
            paddingBottom: "0.5rem",
          }}
        >
          {DAYS.map((day, dayIdx) => {
            const meals = MEALS[day.short];
            const isToday = !!day.today;
            const isHovered = hoveredDay === day.short;

            return (
              <motion.div
                key={day.short}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: dayIdx * 0.08, duration: 0.5, ease: "easeOut" }}
                onHoverStart={() => setHoveredDay(day.short)}
                onHoverEnd={() => setHoveredDay(null)}
                style={{
                  background: isToday
                    ? "rgba(255,255,255,0.13)"
                    : "rgba(255,255,255,0.07)",
                  backdropFilter: "blur(20px) saturate(180%)",
                  WebkitBackdropFilter: "blur(20px) saturate(180%)",
                  border: `1px solid ${
                    isToday
                      ? "rgba(255,255,255,0.3)"
                      : isHovered
                      ? "rgba(255,255,255,0.22)"
                      : "rgba(255,255,255,0.12)"
                  }`,
                  borderRadius: "20px",
                  padding: "1rem 0.75rem",
                  boxShadow: isToday
                    ? "0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)"
                    : "0 8px 32px rgba(0,0,0,0.2)",
                  cursor: "default",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                }}
              >
                {/* Day header */}
                <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.45)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      margin: 0,
                    }}
                  >
                    {day.short}
                  </p>
                  <div
                    style={{
                      width: "2rem",
                      height: "2rem",
                      borderRadius: "50%",
                      background: isToday ? "rgba(255,255,255,0.2)" : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0.25rem auto 0",
                    }}
                  >
                    <span
                      style={{
                        color: "rgba(255,255,255,0.9)",
                        fontSize: "0.9rem",
                        fontWeight: isToday ? 700 : 400,
                      }}
                    >
                      {day.date}
                    </span>
                  </div>
                  {isToday && (
                    <p
                      style={{
                        color: "rgba(255,255,255,0.5)",
                        fontSize: "0.55rem",
                        marginTop: "0.15rem",
                        letterSpacing: "0.1em",
                      }}
                    >
                      TODAY
                    </p>
                  )}
                </div>

                {/* Meal slots */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {(["breakfast", "lunch", "dinner"] as const).map((mealType) => {
                    const meal = meals[mealType];
                    return (
                      <div
                        key={mealType}
                        style={{
                          background: meal
                            ? "rgba(255,255,255,0.09)"
                            : "rgba(255,255,255,0.03)",
                          borderRadius: "10px",
                          padding: "0.5rem 0.6rem",
                          border: "1px solid rgba(255,255,255,0.07)",
                          minHeight: "54px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.3rem",
                            marginBottom: "0.25rem",
                          }}
                        >
                          <div
                            style={{
                              width: "6px",
                              height: "6px",
                              borderRadius: "50%",
                              background: MEAL_COLORS[mealType],
                              flexShrink: 0,
                            }}
                          />
                          <span
                            style={{
                              color: "rgba(255,255,255,0.4)",
                              fontSize: "0.55rem",
                              textTransform: "uppercase",
                              letterSpacing: "0.1em",
                            }}
                          >
                            {mealType}
                          </span>
                        </div>
                        {meal ? (
                          <p
                            style={{
                              color: "rgba(255,255,255,0.85)",
                              fontSize: "0.7rem",
                              fontWeight: 500,
                              lineHeight: 1.3,
                              margin: 0,
                            }}
                          >
                            {meal.name}
                          </p>
                        ) : (
                          <Skeleton variant="text" width="80%" height={10} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Calorie summary strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.5 }}
          style={{
            marginTop: "2rem",
            background: "rgba(255,255,255,0.07)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "20px",
            padding: "1.5rem",
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1.25rem",
            }}
          >
            <Flame size={16} style={{ color: "rgba(255,255,255,0.7)" }} />
            <p
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: "0.7rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              Daily Calories
            </p>
            <span
              style={{
                marginLeft: "auto",
                color: "rgba(255,255,255,0.4)",
                fontSize: "0.65rem",
                fontFamily: "var(--font-mono)",
              }}
            >
              Target: {CALORIE_TARGET.toLocaleString()} kcal
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: "0.75rem",
            }}
          >
            {DAYS.map((day, idx) => {
              const meals = MEALS[day.short];
              const totalCal = (Object.values(meals) as MealEntry[])
                .filter(Boolean)
                .reduce((sum, m) => sum + (m?.cal ?? 0), 0);
              const pct = Math.min(100, Math.round((totalCal / CALORIE_TARGET) * 100));

              return (
                <div
                  key={day.short}
                  style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}
                >
                  <span
                    style={{
                      color: "rgba(255,255,255,0.45)",
                      fontSize: "0.58rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {day.short}
                  </span>
                  <div
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      borderRadius: "6px",
                      height: "4px",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{
                        delay: 0.75 + idx * 0.05,
                        duration: 0.6,
                        ease: "easeOut",
                      }}
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        height: "100%",
                        background: day.today
                          ? "rgba(255,255,255,0.9)"
                          : "rgba(255,255,255,0.45)",
                        borderRadius: "6px",
                      }}
                    />
                  </div>
                  <span
                    style={{
                      color: day.today
                        ? "rgba(255,255,255,0.9)"
                        : "rgba(255,255,255,0.5)",
                      fontSize: "0.65rem",
                      fontFamily: "var(--font-mono)",
                      fontWeight: day.today ? 600 : 400,
                    }}
                  >
                    {totalCal > 0 ? `${totalCal}` : "—"}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
