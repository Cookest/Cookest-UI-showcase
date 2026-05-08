"use client";

import { useState } from "react";
import { Button, Input, Card, CardBody, Badge, Avatar, Divider } from "@cookest/ui";
import { Clock } from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";

const relatedArticles = [
  {
    title: "The Maillard Reaction: Why Searing Changes Everything",
    category: "Technique",
    readTime: "6 min read",
    gradient: "linear-gradient(160deg, #064e3b, #065f46, #047857)",
  },
  {
    title: "A Week in Burgundy: Lessons From a French Kitchen",
    category: "Travel",
    readTime: "11 min read",
    gradient: "linear-gradient(160deg, #312e81, #4338ca, #6366f1)",
  },
  {
    title: "Salt, Fat, Acid, Heat: Samin's Enduring Blueprint",
    category: "Fundamentals",
    readTime: "8 min read",
    gradient: "linear-gradient(160deg, #7f1d1d, #991b1b, #dc2626)",
  },
];

const issueArticles = [
  "The Art of the Perfect Reduction",
  "Foraging in the Scottish Highlands",
  "Zero-Waste Cooking: A System",
  "The Last Ramen Shop in Kyoto",
];

const ingredients = [
  "Veal Stock",
  "Shallots",
  "Thyme",
  "Dry Vermouth",
  "Butter",
  "Bay Leaf",
  "White Pepper",
  "Saffron",
];

export default function EditorialPage() {
  const [email, setEmail] = useState("");

  return (
    <div className="flex flex-col pb-16" style={{ maxWidth: "62rem", margin: "0 auto" }}>
      <Breadcrumb />

      {/* ══════════════════════════════════════
          Section 1 — Masthead
      ══════════════════════════════════════ */}
      <section className="flex flex-col gap-5 pb-10">
        {/* Issue label */}
        <p
          style={{
            fontSize: "0.68rem",
            fontWeight: 700,
            letterSpacing: "0.18em",
            color: "var(--ck-primary)",
          }}
        >
          ISSUE 12 · MAY 2026
        </p>

        <Divider />

        {/* Two-column header */}
        <div className="flex flex-col lg:flex-row gap-8 items-start pt-2">
          {/* Left: headline + intro */}
          <div className="flex-1">
            <h1
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2.75rem, 7vw, 4.75rem)",
                fontWeight: 700,
                color: "var(--ck-heading)",
                lineHeight: 1.03,
                letterSpacing: "-0.03em",
              }}
            >
              The Art of the Perfect Reduction
            </h1>
            <p
              className="mt-5"
              style={{
                fontSize: "1.15rem",
                color: "var(--ck-text-muted)",
                lineHeight: 1.6,
                maxWidth: "38rem",
              }}
            >
              How classical French technique became the lingua franca of modern kitchens — and why
              patience is the only ingredient that can&apos;t be substituted.
            </p>
          </div>

          {/* Right: meta column */}
          <div className="flex flex-col gap-4 lg:w-56 xl:w-60" style={{ paddingTop: "0.5rem" }}>
            <div className="flex items-center gap-3">
              <Avatar src="https://i.pravatar.cc/150?img=47" alt="Isabelle Fontaine" size="md" />
              <div>
                <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--ck-heading)" }}>
                  Isabelle Fontaine
                </p>
                <p style={{ fontSize: "0.72rem", color: "var(--ck-text-muted)" }}>
                  Contributing Editor
                </p>
              </div>
            </div>

            <div
              className="flex items-center gap-2"
              style={{ fontSize: "0.75rem", color: "var(--ck-text-muted)" }}
            >
              <Clock size={13} />
              <span>May 14, 2026 · 12 min read</span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {["Technique", "French", "Sauces", "Fine Dining", "History"].map((tag) => (
                <Badge key={tag} variant="default" size="sm">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          Section 2 — Feature image zone
      ══════════════════════════════════════ */}
      <section
        className="relative mb-14"
        style={{ height: "22rem", borderRadius: "0.875rem", overflow: "hidden" }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "linear-gradient(160deg, #92400e 0%, #d97706 55%, #fbbf24 100%)",
          }}
        />

        {/* Feature badge */}
        <div style={{ position: "absolute", top: 18, left: 18 }}>
          <Badge variant="warning" size="md">FEATURE STORY</Badge>
        </div>

        {/* Author overlay */}
        <div
          style={{
            position: "absolute",
            bottom: 18,
            left: 18,
            display: "flex",
            alignItems: "center",
            gap: 12,
            background: "rgba(0,0,0,0.42)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            borderRadius: "0.75rem",
            padding: "0.5rem 1rem",
          }}
        >
          <Avatar src="https://i.pravatar.cc/150?img=47" alt="Isabelle Fontaine" size="sm" />
          <div>
            <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "#fff" }}>Isabelle Fontaine</p>
            <p style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.72)" }}>
              Contributing Editor, Cookest Magazine
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          Section 3 — Article body, 2-col
      ══════════════════════════════════════ */}
      <section className="flex flex-col lg:flex-row gap-12 mb-16">
        {/* ── Left: article text (~60%) ── */}
        <div className="flex-1 flex flex-col gap-7" style={{ minWidth: 0 }}>
          <p style={{ fontSize: "1.1rem", lineHeight: 1.8, color: "var(--ck-text)" }}>
            In the annals of classical French cookery, few techniques carry the quiet authority of
            the sauce reduction. Long before the Maillard reaction had a name, before molecular
            gastronomy threatened to dissolve everything we understood about heat — there was the
            saucepan, the flame, and time. The reduction is not a recipe; it is a philosophy.
          </p>

          <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "var(--ck-text)" }}>
            A reduction is, at its core, a conversation between water and heat. You apply heat;
            water escapes; what remains becomes more concentrated, more <em>itself</em>. The tomato
            becomes more tomatoey. The wine becomes more wine. The stock becomes what chefs call{" "}
            <em>fond</em> — the very foundation of classical saucework.
          </p>

          {/* Pull quote */}
          <blockquote
            style={{
              borderLeft: "4px solid var(--ck-primary)",
              paddingLeft: "1.5rem",
              margin: "0.25rem 0",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.4rem",
                fontStyle: "italic",
                lineHeight: 1.4,
                color: "var(--ck-heading)",
                letterSpacing: "-0.015em",
              }}
            >
              &ldquo;The great sauces are not invented; they are revealed — one patient reduction at
              a time.&rdquo;
            </p>
            <footer
              style={{
                marginTop: "0.875rem",
                fontSize: "0.72rem",
                color: "var(--ck-text-muted)",
                fontStyle: "normal",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              — Auguste Escoffier,{" "}
              <cite style={{ fontStyle: "italic" }}>Le Guide Culinaire, 1903</cite>
            </footer>
          </blockquote>

          <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "var(--ck-text)" }}>
            The modern chef inherits this tradition with a complicated ambivalence. Pressure cookers,
            sous vide circulators, and rapid-reduction baths have compressed what once took hours
            into minutes. Yet ask any Michelin-starred brigade and they will tell you: the shortcut
            always costs you something. It costs you the smell. The colour shift from pale gold to
            dark amber. The moment just before burning when a reduction crosses into transcendence.
          </p>

          <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "var(--ck-text)" }}>
            There is something meditative about standing over a wide-bottomed saucepan, watching
            concentric rings slowly tighten toward the centre. You learn, over years, to read the
            bubbles: violent rolling boils strip flavour; the gentlest simmer concentrates without
            bruising. You learn that the reduction is also a reduction of yourself — of distraction,
            of hurry, of the insistence on controlling every variable.
          </p>

          {/* Ingredient badges */}
          <div>
            <p
              style={{
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                color: "var(--ck-text-muted)",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
              }}
            >
              Key Ingredients Discussed
            </p>
            <div className="flex flex-wrap gap-2">
              {ingredients.map((ing) => (
                <Badge key={ing} variant="default" size="sm">
                  {ing}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right: sticky sidebar (~35%) ── */}
        <aside className="flex flex-col gap-5 lg:w-68 xl:w-72" style={{ flexShrink: 0 }}>
          {/* In This Issue */}
          <Card>
            <CardBody>
              <p
                style={{
                  fontSize: "0.62rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  color: "var(--ck-text-muted)",
                  textTransform: "uppercase",
                  marginBottom: "0.5rem",
                }}
              >
                In This Issue
              </p>
              {issueArticles.map((title, i) => (
                <div key={title}>
                  <div className="flex gap-3 py-3 items-start">
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.7rem",
                        color: "var(--ck-primary)",
                        fontWeight: 700,
                        marginTop: "0.2rem",
                        minWidth: "1.5rem",
                        flexShrink: 0,
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p
                      style={{
                        fontSize: "0.85rem",
                        lineHeight: 1.45,
                        color: i === 0 ? "var(--ck-heading)" : "var(--ck-text-muted)",
                        fontWeight: i === 0 ? 600 : 400,
                        cursor: "pointer",
                      }}
                    >
                      {title}
                    </p>
                  </div>
                  {i < issueArticles.length - 1 && <Divider />}
                </div>
              ))}
            </CardBody>
          </Card>

          {/* Newsletter */}
          <Card>
            <CardBody>
              <div className="flex flex-col gap-3">
                <div>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      color: "var(--ck-heading)",
                      marginBottom: "0.25rem",
                    }}
                  >
                    Don&apos;t miss an issue
                  </p>
                  <p style={{ fontSize: "0.78rem", color: "var(--ck-text-muted)", lineHeight: 1.55 }}>
                    Cookest Magazine delivered to your inbox every month.
                  </p>
                </div>
                <Input
                  inputSize="sm"
                  placeholder="your@email.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                />
                <Button variant="primary" size="sm" fullWidth>
                  Subscribe
                </Button>
              </div>
            </CardBody>
          </Card>

          {/* Chef Spotlight */}
          <Card>
            <CardBody>
              <p
                style={{
                  fontSize: "0.62rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  color: "var(--ck-text-muted)",
                  textTransform: "uppercase",
                  marginBottom: "1rem",
                }}
              >
                Chef Spotlight
              </p>
              <div className="flex gap-3 items-center mb-4">
                <Avatar
                  src="https://i.pravatar.cc/150?img=60"
                  alt="René Beaumont"
                  size="md"
                />
                <div>
                  <p style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--ck-heading)" }}>
                    René Beaumont
                  </p>
                  <p style={{ fontSize: "0.72rem", color: "var(--ck-text-muted)" }}>
                    3-Star Michelin, Lyon
                  </p>
                </div>
              </div>
              <p
                style={{
                  fontSize: "0.82rem",
                  fontStyle: "italic",
                  color: "var(--ck-text)",
                  lineHeight: 1.65,
                  borderLeft: "2px solid var(--ck-border)",
                  paddingLeft: "0.875rem",
                }}
              >
                &ldquo;A reduction is not a shortcut to flavour. It is the only honest path to
                it.&rdquo;
              </p>
            </CardBody>
          </Card>
        </aside>
      </section>

      <Divider />

      {/* ══════════════════════════════════════
          Section 4 — Related Articles
      ══════════════════════════════════════ */}
      <section className="pt-10">
        <p
          style={{
            fontSize: "0.68rem",
            fontWeight: 700,
            letterSpacing: "0.15em",
            color: "var(--ck-text-muted)",
            textTransform: "uppercase",
            marginBottom: "1.5rem",
          }}
        >
          Continue Reading
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {relatedArticles.map((article) => (
            <div
              key={article.title}
              style={{
                background: "var(--ck-bg-card)",
                border: "1px solid var(--ck-border)",
                borderRadius: "0.875rem",
                overflow: "hidden",
                cursor: "pointer",
                transition: "box-shadow 0.2s ease, transform 0.2s ease",
              }}
              className="hover:shadow-lg hover:-translate-y-0.5"
            >
              {/* Colour zone */}
              <div style={{ height: "10rem", background: article.gradient }} />
              {/* Text zone */}
              <div className="p-4 flex flex-col gap-2.5">
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    color: "var(--ck-heading)",
                    lineHeight: 1.35,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {article.title}
                </h3>
                <div className="flex items-center justify-between">
                  <Badge variant="default" size="sm">{article.category}</Badge>
                  <span style={{ fontSize: "0.7rem", color: "var(--ck-text-muted)" }}>
                    {article.readTime}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
