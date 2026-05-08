"use client";

import { useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Badge,
  Avatar,
  Toggle,
  Divider,
  Tooltip,
  Alert,
} from "@cookest/ui";
import {
  ArrowLeft,
  ChevronRight,
  Clock,
  Users,
  Flame,
  Heart,
  Share2,
  Bookmark,
  Printer,
  ChefHat,
} from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";

const ingredients = [
  { id: 1, name: "Spaghetti", amount: "400g" },
  { id: 2, name: "Guanciale", amount: "200g" },
  { id: 3, name: "Egg yolks", amount: "6 large" },
  { id: 4, name: "Pecorino Romano", amount: "100g, finely grated" },
  { id: 5, name: "Black pepper", amount: "2 tsp, freshly cracked" },
  { id: 6, name: "Sea salt", amount: "To taste" },
];

const steps = [
  {
    title: "Prepare the guanciale",
    text: "Cut the guanciale into small strips or lardons, about 1cm thick. Place in a cold skillet and render over medium-low heat for 8-10 minutes until golden and crispy. Remove from heat and set aside, reserving the fat.",
  },
  {
    title: "Make the egg mixture",
    text: "In a bowl, whisk the egg yolks with most of the grated Pecorino Romano (reserve some for garnish). Add a generous amount of freshly cracked black pepper. The mixture should be thick and creamy.",
  },
  {
    title: "Cook the pasta",
    text: "Bring a large pot of salted water to a rolling boil. Cook the spaghetti until al dente — about 1 minute less than the package instructions. Reserve 1 cup of pasta water before draining.",
  },
  {
    title: "Combine everything",
    text: "Add the hot drained pasta to the skillet with guanciale. Toss to coat in the rendered fat. Remove from heat, wait 30 seconds, then pour in the egg mixture, tossing vigorously. Add pasta water a splash at a time until silky.",
  },
  {
    title: "Serve immediately",
    text: "Divide among warm bowls. Top with the reserved Pecorino, extra black pepper, and a final drizzle of guanciale fat. Serve immediately — carbonara waits for no one.",
  },
];

const nutrition = [
  { label: "Calories", value: "580", unit: "kcal" },
  { label: "Protein", value: "28", unit: "g" },
  { label: "Carbs", value: "62", unit: "g" },
  { label: "Fat", value: "24", unit: "g" },
  { label: "Fiber", value: "3", unit: "g" },
  { label: "Sodium", value: "820", unit: "mg" },
];

const reviews = [
  {
    name: "Maria Rossi",
    avatar: "https://i.pravatar.cc/150?img=5",
    rating: 5,
    date: "2 days ago",
    text: "Absolutely authentic! The trick of removing from heat before adding the egg mixture makes all the difference. My Roman grandmother would approve.",
  },
  {
    name: "James Chen",
    avatar: "https://i.pravatar.cc/150?img=12",
    rating: 4,
    date: "1 week ago",
    text: "Delicious recipe. I substituted pancetta since I couldn't find guanciale — still turned out amazing. Will try with the real thing next time.",
  },
  {
    name: "Sophie Laurent",
    avatar: "https://i.pravatar.cc/150?img=9",
    rating: 5,
    date: "2 weeks ago",
    text: "This has become my go-to weeknight dinner. Simple ingredients, incredible flavor. The key is really good quality eggs and cheese.",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <span style={{ color: "var(--ck-primary)", letterSpacing: "2px" }}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} style={{ opacity: i < rating ? 1 : 0.25 }}>
          ★
        </span>
      ))}
    </span>
  );
}

export default function RecipeCardPage() {
  const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(
    new Set()
  );
  const [saved, setSaved] = useState(false);
  const [liked, setLiked] = useState(false);
  const [addedToPlan, setAddedToPlan] = useState(false);
  const [servings, setServings] = useState(4);

  const toggleIngredient = (id: number) => {
    setCheckedIngredients((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="flex flex-col gap-8 pb-28">
      <Breadcrumb />

      {/* Success Alert */}
      {addedToPlan && (
        <div className="fixed top-6 right-6 z-50" style={{ maxWidth: 380 }}>
          <Alert
            variant="success"
            title="Added to Meal Plan"
            dismissible
            onDismiss={() => setAddedToPlan(false)}
          >
            Spaghetti Carbonara has been added to your Wednesday dinner.
          </Alert>
        </div>
      )}

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2" style={{ color: "var(--ck-text-muted)", fontSize: "0.875rem" }}>
        <Button variant="ghost" size="sm" iconLeft={<ArrowLeft size={16} />}>
          Back
        </Button>
        <ChevronRight size={14} />
        <span>Recipes</span>
        <ChevronRight size={14} />
        <span>Italian</span>
        <ChevronRight size={14} />
        <span style={{ color: "var(--ck-text)" }}>Spaghetti Carbonara</span>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-3 flex-wrap">
          <Badge variant="success">Quick & Easy</Badge>
          <Badge variant="info">Italian</Badge>
          <Badge variant="warning">High Protein</Badge>
          <Badge variant="default">Comfort Food</Badge>
        </div>

        <h1
          className="leading-tight"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "2.75rem",
            fontWeight: 700,
            color: "var(--ck-heading)",
          }}
        >
          Spaghetti Carbonara
        </h1>

        <p style={{ color: "var(--ck-text-muted)", fontSize: "1.1rem", lineHeight: 1.6, maxWidth: "640px" }}>
          The classic Roman pasta — rich, silky, and deceptively simple. Made with just five
          ingredients, this dish proves that restraint is the highest form of elegance.
        </p>

        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <Avatar src="https://i.pravatar.cc/150?img=68" alt="Chef Marco" size="md" />
            <div>
              <p style={{ fontWeight: 600, color: "var(--ck-heading)", fontSize: "0.95rem" }}>
                Chef Marco Bianchi
              </p>
              <p style={{ color: "var(--ck-text-muted)", fontSize: "0.8rem" }}>
                Roman cuisine specialist
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Tooltip content={liked ? "Unlike" : "Like this recipe"} position="top">
              <Button
                variant={liked ? "primary" : "ghost"}
                size="sm"
                iconLeft={<Heart size={16} fill={liked ? "currentColor" : "none"} />}
                onClick={() => setLiked(!liked)}
              >
                {liked ? "243" : "242"}
              </Button>
            </Tooltip>
            <Tooltip content={saved ? "Unsave" : "Save recipe"} position="top">
              <Button
                variant={saved ? "primary" : "ghost"}
                size="sm"
                iconLeft={<Bookmark size={16} fill={saved ? "currentColor" : "none"} />}
                onClick={() => setSaved(!saved)}
              >
                {saved ? "Saved" : "Save"}
              </Button>
            </Tooltip>
            <Tooltip content="Share" position="top">
              <Button variant="ghost" size="sm" iconLeft={<Share2 size={16} />}>
                Share
              </Button>
            </Tooltip>
            <Tooltip content="Print" position="top">
              <Button variant="ghost" size="sm" iconLeft={<Printer size={16} />}>
                Print
              </Button>
            </Tooltip>
          </div>
        </div>

        {/* Quick Info Bar */}
        <Card variant="outlined" padding="md">
          <div className="flex items-center justify-around flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Clock size={18} style={{ color: "var(--ck-primary)" }} />
              <div>
                <p style={{ fontSize: "0.75rem", color: "var(--ck-text-muted)" }}>Prep Time</p>
                <p style={{ fontWeight: 600, color: "var(--ck-heading)" }}>10 min</p>
              </div>
            </div>
            <Divider orientation="vertical" />
            <div className="flex items-center gap-2">
              <Flame size={18} style={{ color: "var(--ck-primary)" }} />
              <div>
                <p style={{ fontSize: "0.75rem", color: "var(--ck-text-muted)" }}>Cook Time</p>
                <p style={{ fontWeight: 600, color: "var(--ck-heading)" }}>20 min</p>
              </div>
            </div>
            <Divider orientation="vertical" />
            <div className="flex items-center gap-2">
              <Users size={18} style={{ color: "var(--ck-primary)" }} />
              <div>
                <p style={{ fontSize: "0.75rem", color: "var(--ck-text-muted)" }}>Servings</p>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => setServings(Math.max(1, servings - 1))}>−</Button>
                  <span style={{ fontWeight: 600, color: "var(--ck-heading)", minWidth: 20, textAlign: "center" }}>{servings}</span>
                  <Button variant="ghost" size="sm" onClick={() => setServings(servings + 1)}>+</Button>
                </div>
              </div>
            </div>
            <Divider orientation="vertical" />
            <div className="flex items-center gap-2">
              <ChefHat size={18} style={{ color: "var(--ck-primary)" }} />
              <div>
                <p style={{ fontSize: "0.75rem", color: "var(--ck-text-muted)" }}>Difficulty</p>
                <p style={{ fontWeight: 600, color: "var(--ck-heading)" }}>Medium</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Divider />

      {/* Ingredients */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--ck-heading)" }}>
              Ingredients
            </h2>
            <Badge size="sm" variant="default">
              {checkedIngredients.size}/{ingredients.length} checked
            </Badge>
          </div>
        </CardHeader>
        <CardBody>
          <div className="flex flex-col gap-1">
            {ingredients.map((ing) => (
              <div
                key={ing.id}
                className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer"
                style={{
                  background: checkedIngredients.has(ing.id) ? "var(--ck-surface)" : "transparent",
                }}
                onClick={() => toggleIngredient(ing.id)}
              >
                <Toggle
                  checked={checkedIngredients.has(ing.id)}
                  onChange={() => toggleIngredient(ing.id)}
                  label={ing.name}
                  toggleSize="sm"
                />
                <span
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--ck-text-muted)",
                    textDecoration: checkedIngredients.has(ing.id) ? "line-through" : "none",
                  }}
                >
                  {ing.amount}
                </span>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Instructions */}
      <div className="flex flex-col gap-4">
        <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--ck-heading)" }}>
          Instructions
        </h2>
        {steps.map((step, i) => (
          <Card key={i} variant="outlined" padding="md">
            <div className="flex gap-4">
              <div
                className="flex items-center justify-center shrink-0 rounded-full"
                style={{
                  width: 36,
                  height: 36,
                  background: "var(--ck-primary)",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                }}
              >
                {i + 1}
              </div>
              <div className="flex flex-col gap-1">
                <h3 style={{ fontWeight: 600, color: "var(--ck-heading)", fontSize: "1rem" }}>
                  {step.title}
                </h3>
                <p style={{ color: "var(--ck-text)", lineHeight: 1.7, fontSize: "0.925rem" }}>
                  {step.text}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Nutrition Facts */}
      <Card>
        <CardHeader>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--ck-heading)" }}>
            Nutrition Facts
          </h2>
          <p style={{ fontSize: "0.8rem", color: "var(--ck-text-muted)" }}>Per serving</p>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {nutrition.map((n) => (
              <div
                key={n.label}
                className="flex flex-col items-center gap-1 p-4 rounded-xl"
                style={{ background: "var(--ck-surface)" }}
              >
                <span style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--ck-primary)" }}>
                  {n.value}
                </span>
                <span style={{ fontSize: "0.7rem", color: "var(--ck-text-muted)" }}>{n.unit}</span>
                <span style={{ fontSize: "0.8rem", fontWeight: 500, color: "var(--ck-text)" }}>
                  {n.label}
                </span>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      <Divider label="Reviews" />

      {/* Reviews */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--ck-heading)" }}>
              Reviews
            </h2>
            <Badge variant="info" size="sm">
              {reviews.length}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <StarRating rating={5} />
            <span style={{ fontWeight: 600, color: "var(--ck-heading)" }}>4.8</span>
          </div>
        </div>

        {reviews.map((review, i) => (
          <Card key={i} variant="outlined" padding="md">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar src={review.avatar} alt={review.name} size="sm" />
                  <div>
                    <p style={{ fontWeight: 600, color: "var(--ck-heading)", fontSize: "0.9rem" }}>
                      {review.name}
                    </p>
                    <p style={{ fontSize: "0.75rem", color: "var(--ck-text-muted)" }}>
                      {review.date}
                    </p>
                  </div>
                </div>
                <StarRating rating={review.rating} />
              </div>
              <p style={{ color: "var(--ck-text)", lineHeight: 1.65, fontSize: "0.9rem" }}>
                {review.text}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Floating Bottom Bar */}
      <div
        className="fixed bottom-0 left-0 md:left-[280px] right-0 flex items-center justify-center gap-4 px-6 py-4 z-40"
        style={{
          background: "var(--ck-bg)",
          borderTop: "1px solid var(--ck-border)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="flex items-center gap-4" style={{ maxWidth: 600, width: "100%" }}>
          <div className="flex-1">
            <p style={{ fontWeight: 600, color: "var(--ck-heading)", fontSize: "0.95rem" }}>
              Spaghetti Carbonara
            </p>
            <p style={{ fontSize: "0.8rem", color: "var(--ck-text-muted)" }}>
              30 min · {servings} servings
            </p>
          </div>
          <Button
            variant="primary"
            size="lg"
            onClick={() => setAddedToPlan(true)}
            iconLeft={<Bookmark size={18} />}
          >
            Add to Meal Plan
          </Button>
        </div>
      </div>
    </div>
  );
}
