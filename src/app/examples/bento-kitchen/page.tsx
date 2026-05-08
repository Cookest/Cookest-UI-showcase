"use client";

import { useState } from "react";
import { Button, Input, Badge, Avatar, Progress, Divider } from "@cookest/ui";
import {
  Star,
  Clock,
  Users,
  Plus,
  Pause,
  RotateCcw,
  ChefHat,
} from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";

const recentRecipes = [
  { name: "Truffle Risotto", cuisine: "Italian", time: "35 min", img: 10 },
  { name: "Miso Black Cod", cuisine: "Japanese", time: "25 min", img: 11 },
  { name: "Lamb Tagine", cuisine: "Moroccan", time: "90 min", img: 12 },
];

const chefs = [
  { name: "Elena Rossi", cuisine: "Italian", img: 20 },
  { name: "Kenji Tanaka", cuisine: "Japanese", img: 21 },
  { name: "Amara Diallo", cuisine: "West African", img: 22 },
  { name: "Sofia Vargas", cuisine: "Mexican", img: 23 },
];

const circumference = 2 * Math.PI * 38;
const proteinPct = 73;
const dashoffset = circumference - (proteinPct / 100) * circumference;

const tileBase: React.CSSProperties = {
  background: "var(--ck-surface)",
  border: "1px solid var(--ck-border)",
  borderRadius: "1.5rem",
  transition: "box-shadow 0.2s ease, transform 0.2s ease",
};

export default function BentoKitchenPage() {
  const [ingredient, setIngredient] = useState("");

  return (
    <div className="flex flex-col gap-6 pb-10">
      <Breadcrumb />

      {/* Page header */}
      <div className="flex flex-col gap-1">
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "1.85rem",
            fontWeight: 700,
            color: "var(--ck-heading)",
            letterSpacing: "-0.025em",
          }}
        >
          Today&apos;s Kitchen
        </h1>
        <p style={{ color: "var(--ck-text-muted)", fontSize: "0.875rem" }}>
          Wednesday, 14 May 2026
        </p>
      </div>

      {/* ── Bento grid ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridTemplateRows: "160px 160px 160px 160px",
          gridTemplateAreas: `
            "featured  featured  nutrition  quickadd"
            "featured  featured  streak     quickadd"
            "recent    recent    streak     chefs"
            "recent    recent    timer      chefs"
          `,
          gap: "1rem",
        }}
        className="w-full"
      >
        {/* ── Featured tile (2×2) ── */}
        <div
          style={{ ...tileBase, gridArea: "featured", overflow: "hidden", display: "flex", flexDirection: "column" }}
          className="hover:shadow-xl hover:-translate-y-0.5"
        >
          {/* Gradient image zone */}
          <div
            style={{
              height: "44%",
              background: "linear-gradient(135deg, #c2410c 0%, #7c3aed 50%, #0369a1 100%)",
              position: "relative",
              flexShrink: 0,
            }}
          >
            <div style={{ position: "absolute", top: 14, left: 14 }}>
              <Badge variant="default" size="sm">Recipe of the Day</Badge>
            </div>
            <div style={{ position: "absolute", bottom: 12, right: 14, display: "flex", gap: 3 }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={13}
                  fill={i < 4 ? "#fbbf24" : "none"}
                  stroke={i < 4 ? "#fbbf24" : "rgba(255,255,255,0.55)"}
                />
              ))}
            </div>
          </div>

          {/* Content zone */}
          <div className="flex flex-col gap-3 p-5 flex-1 overflow-hidden">
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.45rem",
                  fontWeight: 700,
                  color: "var(--ck-heading)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.2,
                }}
              >
                Saffron Bouillabaisse
              </h2>
              <p style={{ fontSize: "0.78rem", color: "var(--ck-text-muted)", marginTop: 3 }}>
                Classic Provençal seafood stew with rich saffron broth
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Avatar src="https://i.pravatar.cc/80?img=33" alt="Chef Michel Arnaud" size="sm" />
              <div>
                <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--ck-heading)" }}>
                  Chef Michel Arnaud
                </p>
                <p style={{ fontSize: "0.7rem", color: "var(--ck-text-muted)" }}>Provence, France</p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="info" size="sm">
                <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
                  <Clock size={10} /> 75 min
                </span>
              </Badge>
              <Badge variant="default" size="sm">
                <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
                  <Users size={10} /> 4 servings
                </span>
              </Badge>
              <Badge variant="success" size="sm">Advanced</Badge>
            </div>

            <div className="mt-auto">
              <Button variant="primary" size="sm" fullWidth iconLeft={<ChefHat size={14} />}>
                Cook Now
              </Button>
            </div>
          </div>
        </div>

        {/* ── Nutrition tile (1×1) ── */}
        <div
          style={{
            ...tileBase,
            gridArea: "nutrition",
            padding: "1.25rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.625rem",
          }}
          className="hover:shadow-lg hover:-translate-y-0.5"
        >
          <p
            style={{
              fontSize: "0.65rem",
              fontWeight: 700,
              color: "var(--ck-text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Protein Goal
          </p>
          <div style={{ position: "relative", width: 80, height: 80 }}>
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              <circle cx="40" cy="40" r="32" stroke="var(--ck-border)" strokeWidth="6" fill="none" />
              <circle
                cx="40"
                cy="40"
                r="32"
                stroke="var(--ck-primary)"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dashoffset}
                style={{
                  transform: "rotate(-90deg)",
                  transformOrigin: "center",
                  transition: "stroke-dashoffset 0.8s cubic-bezier(0.4,0,0.2,1)",
                }}
              />
            </svg>
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
              <span style={{ fontSize: "1rem", fontWeight: 700, color: "var(--ck-heading)", lineHeight: 1 }}>
                73%
              </span>
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--ck-heading)" }}>73g / 100g</p>
            <p style={{ fontSize: "0.65rem", color: "var(--ck-text-muted)" }}>daily target</p>
          </div>
        </div>

        {/* ── Quick Add tile (1×2 tall) ── */}
        <div
          style={{
            ...tileBase,
            gridArea: "quickadd",
            padding: "1.25rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
          className="hover:shadow-lg hover:-translate-y-0.5"
        >
          <p
            style={{
              fontSize: "0.65rem",
              fontWeight: 700,
              color: "var(--ck-text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Quick Add
          </p>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "flex-end" }}>
            <Input
              inputSize="sm"
              placeholder="Search ingredient…"
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
              fullWidth
            />
            <button
              style={{
                flexShrink: 0,
                width: 34,
                height: 34,
                borderRadius: "0.625rem",
                background: "var(--ck-primary)",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Plus size={15} />
            </button>
          </div>
          <div>
            <p style={{ fontSize: "0.65rem", color: "var(--ck-text-muted)", marginBottom: "0.5rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Recent
            </p>
            <div className="flex flex-wrap gap-1.5">
              {["Garlic", "Olive Oil", "Basil", "Salt"].map((item) => (
                <Badge key={item} variant="default" size="sm">{item}</Badge>
              ))}
            </div>
          </div>
          <Divider />
          <div className="flex flex-col gap-2 flex-1 justify-end">
            <p style={{ fontSize: "0.65rem", color: "var(--ck-text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>
              Today&apos;s Log
            </p>
            {[
              { label: "Calories", value: "1,840 kcal" },
              { label: "Protein", value: "73g" },
              { label: "Carbs", value: "210g" },
            ].map((item) => (
              <div key={item.label} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem" }}>
                <span style={{ color: "var(--ck-text-muted)" }}>{item.label}</span>
                <span style={{ color: "var(--ck-heading)", fontWeight: 600 }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Streak tile (1×2 tall) ── */}
        <div
          style={{
            ...tileBase,
            gridArea: "streak",
            padding: "1.25rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "0.5rem",
          }}
          className="hover:shadow-lg hover:-translate-y-0.5"
        >
          <p
            style={{
              fontSize: "0.65rem",
              fontWeight: 700,
              color: "var(--ck-text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Cooking Streak 🔥
          </p>
          <div className="flex items-end gap-1.5">
            <span
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "3.75rem",
                fontWeight: 700,
                color: "var(--ck-heading)",
                lineHeight: 1,
                letterSpacing: "-0.04em",
              }}
            >
              14
            </span>
          </div>
          <p style={{ fontSize: "0.78rem", color: "var(--ck-text-muted)", marginTop: -2 }}>
            days in a row
          </p>
          <Progress value={70} size="sm" color="primary" />
          <p style={{ fontSize: "0.68rem", color: "var(--ck-text-muted)" }}>Best: 21 days</p>
        </div>

        {/* ── Recent Recipes tile (2×2) ── */}
        <div
          style={{
            ...tileBase,
            gridArea: "recent",
            padding: "1.25rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            overflow: "hidden",
          }}
          className="hover:shadow-lg hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-between">
            <p
              style={{
                fontSize: "0.65rem",
                fontWeight: 700,
                color: "var(--ck-text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Recent Recipes
            </p>
            <button
              style={{
                fontSize: "0.75rem",
                color: "var(--ck-primary)",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              View all
            </button>
          </div>
          <div className="flex flex-col flex-1">
            {recentRecipes.map((recipe, i) => (
              <div key={recipe.name} className="flex flex-col flex-1 justify-center">
                {i > 0 && <Divider />}
                <div className="flex items-center gap-3 py-2">
                  <Avatar
                    src={`https://i.pravatar.cc/80?img=${recipe.img}`}
                    alt={recipe.name}
                    size="sm"
                  />
                  <div className="flex-1 min-w-0">
                    <p
                      style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--ck-heading)" }}
                      className="truncate"
                    >
                      {recipe.name}
                    </p>
                  </div>
                  <Badge variant="info" size="sm">{recipe.cuisine}</Badge>
                  <span style={{ fontSize: "0.7rem", color: "var(--ck-text-muted)", whiteSpace: "nowrap" }}>
                    {recipe.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Timer tile (1×1) ── */}
        <div
          style={{
            ...tileBase,
            gridArea: "timer",
            padding: "1.25rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "0.5rem",
          }}
          className="hover:shadow-lg hover:-translate-y-0.5"
        >
          <p
            style={{
              fontSize: "0.65rem",
              fontWeight: 700,
              color: "var(--ck-text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Active Timer
          </p>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "2rem",
              fontWeight: 700,
              color: "var(--ck-heading)",
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            18:43
          </p>
          <p style={{ fontSize: "0.7rem", color: "var(--ck-text-muted)" }}>Risotto — Step 3 of 6</p>
          <Progress value={50} size="xs" color="primary" />
          <div className="flex gap-2 mt-0.5">
            {[
              { icon: <Pause size={13} />, label: "Pause" },
              { icon: <RotateCcw size={13} />, label: "Reset" },
            ].map(({ icon, label }) => (
              <button
                key={label}
                aria-label={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 28,
                  height: 28,
                  borderRadius: "0.5rem",
                  background: "var(--ck-bg)",
                  border: "1px solid var(--ck-border)",
                  color: "var(--ck-text)",
                  cursor: "pointer",
                }}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>

        {/* ── Chefs tile (1×2) ── */}
        <div
          style={{
            ...tileBase,
            gridArea: "chefs",
            padding: "1.25rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
          className="hover:shadow-lg hover:-translate-y-0.5"
        >
          <p
            style={{
              fontSize: "0.65rem",
              fontWeight: 700,
              color: "var(--ck-text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "0.25rem",
            }}
          >
            Following
          </p>
          <div className="flex flex-col flex-1">
            {chefs.map((chef, i) => (
              <div key={chef.name} className="flex flex-col flex-1 justify-center">
                {i > 0 && <Divider />}
                <div className="flex items-center gap-2.5 py-1">
                  <Avatar
                    src={`https://i.pravatar.cc/80?img=${chef.img}`}
                    alt={chef.name}
                    size="sm"
                  />
                  <div className="flex-1 min-w-0">
                    <p
                      style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--ck-heading)" }}
                      className="truncate"
                    >
                      {chef.name}
                    </p>
                    <p style={{ fontSize: "0.67rem", color: "var(--ck-text-muted)" }}>{chef.cuisine}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button variant="ghost" size="sm" fullWidth>
            Discover Chefs
          </Button>
        </div>
      </div>

      {/* Mobile hint */}
      <p className="text-xs" style={{ color: "var(--ck-text-muted)" }}>
        Bento grid — best experienced on wider screens.
      </p>
    </div>
  );
}
