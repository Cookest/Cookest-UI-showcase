"use client";

import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Badge,
  Avatar,
  Tabs,
  Progress,
  Divider,
} from "@cookest/ui";
import { Heart, Clock, BookOpen, Users, ChefHat } from "lucide-react";
import { ExampleCliHint } from "@/components/Playground";
import { Breadcrumb } from "@/components/Breadcrumb";

const recipes = [
  { id: 1, title: "Truffle Risotto", duration: "45 min", category: "Italian", liked: false },
  { id: 2, title: "Miso Ramen", duration: "1 hr 20 min", category: "Japanese", liked: true },
  { id: 3, title: "Beef Wellington", duration: "2 hr", category: "British", liked: false },
  { id: 4, title: "Shakshuka", duration: "25 min", category: "Middle Eastern", liked: true },
  { id: 5, title: "Lobster Bisque", duration: "1 hr", category: "French", liked: false },
  { id: 6, title: "Pad Thai", duration: "30 min", category: "Thai", liked: false },
];

const likedRecipes = [
  { id: 7, title: "Butter Chicken", duration: "50 min", category: "Indian", liked: true },
  { id: 8, title: "Carbonara", duration: "20 min", category: "Italian", liked: true },
  { id: 9, title: "Crème Brûlée", duration: "1 hr 30 min", category: "French", liked: true },
  { id: 10, title: "Tacos al Pastor", duration: "40 min", category: "Mexican", liked: true },
];

const collections = [
  { id: 1, title: "Sunday Brunch Favourites", count: 12, emoji: "🍳" },
  { id: 2, title: "Quick Weeknight Dinners", count: 8, emoji: "⚡" },
  { id: 3, title: "Dinner Party Showstoppers", count: 15, emoji: "🌟" },
  { id: 4, title: "Healthy Meal Prep", count: 9, emoji: "🥗" },
];

const cuisineGradients: Record<string, string> = {
  Italian: "linear-gradient(135deg, #22c55e 0%, #15803d 100%)",
  Japanese: "linear-gradient(135deg, #f43f5e 0%, #be123c 100%)",
  British: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
  "Middle Eastern": "linear-gradient(135deg, #f97316 0%, #c2410c 100%)",
  French: "linear-gradient(135deg, #6366f1 0%, #4338ca 100%)",
  Thai: "linear-gradient(135deg, #14b8a6 0%, #0f766e 100%)",
  Indian: "linear-gradient(135deg, #f97316 0%, #dc2626 100%)",
  Mexican: "linear-gradient(135deg, #eab308 0%, #d97706 100%)",
};

function RecipeGrid({ items }: { items: typeof recipes }) {
  const [liked, setLiked] = useState<Record<number, boolean>>(
    Object.fromEntries(items.map((r) => [r.id, r.liked]))
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((recipe) => (
        <Card key={recipe.id} variant="interactive">
          <CardBody style={{ padding: 0 }}>
            {/* Image zone */}
            <div
              className="relative w-full h-32 rounded-t-xl overflow-hidden"
              style={{
                background:
                  cuisineGradients[recipe.category] ??
                  "linear-gradient(135deg, var(--ck-border), var(--ck-surface))",
              }}
            >
              <span
                className="absolute inset-0 flex items-center justify-center text-4xl opacity-20 select-none"
                aria-hidden
              >
                🍽
              </span>
              <button
                className="absolute top-2 right-2 flex items-center justify-center w-7 h-7 rounded-full transition-all duration-150 hover:scale-110"
                style={{
                  background: liked[recipe.id] ? "var(--ck-primary)" : "rgba(0,0,0,0.4)",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                  backdropFilter: "blur(4px)",
                }}
                onClick={() =>
                  setLiked((prev) => ({ ...prev, [recipe.id]: !prev[recipe.id] }))
                }
              >
                <Heart
                  size={13}
                  fill={liked[recipe.id] ? "#fff" : "none"}
                  strokeWidth={2}
                />
              </button>
            </div>
            {/* Info */}
            <div className="flex flex-col gap-1.5 p-3">
              <p style={{ fontWeight: 600, color: "var(--ck-heading)", fontSize: "0.875rem" }}>
                {recipe.title}
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="default" size="sm">
                  {recipe.category}
                </Badge>
                <span
                  className="flex items-center gap-1 text-xs"
                  style={{ color: "var(--ck-text-muted)" }}
                >
                  <Clock size={11} />
                  {recipe.duration}
                </span>
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}

function CollectionsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {collections.map((col) => (
        <Card key={col.id}>
          <CardBody>
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                style={{ background: "var(--ck-surface)", fontSize: "1.5rem" }}
              >
                {col.emoji}
              </div>
              <div>
                <p style={{ fontWeight: 600, color: "var(--ck-heading)", fontSize: "0.9rem" }}>
                  {col.title}
                </p>
                <p style={{ fontSize: "0.8rem", color: "var(--ck-text-muted)" }}>
                  {col.count} recipes
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}

export default function UserProfilePage() {
  const [following, setFollowing] = useState(false);

  return (
    <div>
      <Breadcrumb />
      <ExampleCliHint components={["Avatar", "Badge", "Tabs", "Skeleton", "Progress", "Card", "Button", "Divider"]} />
      <div className="max-w-4xl mx-auto py-8 px-4 md:px-0">
        <div className="flex flex-col gap-8">
          {/* Profile header */}
          <Card>
            <CardBody>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <Avatar
                  src="https://i.pravatar.cc/150?img=68"
                  alt="Isabelle Moreau"
                  size="xl"
                />
                <div className="flex-1 flex flex-col gap-3">
                  <div>
                    <h1
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: 700,
                        color: "var(--ck-heading)",
                        fontFamily: "var(--font-serif)",
                      }}
                    >
                      Isabelle Moreau
                    </h1>
                    <p style={{ color: "var(--ck-text-muted)", fontSize: "0.9rem", marginTop: 2 }}>
                      Pastry chef & food writer based in Lyon. Obsessed with French technique and
                      seasonal ingredients. 🇫🇷
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="info" size="md">
                      <Users size={11} className="mr-1" />
                      1.2k followers
                    </Badge>
                    <Badge variant="default" size="md">
                      <BookOpen size={11} className="mr-1" />
                      42 recipes
                    </Badge>
                    <Badge variant="success" size="md">
                      <ChefHat size={11} className="mr-1" />
                      Pro Chef
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      variant={following ? "secondary" : "primary"}
                      size="sm"
                      onClick={() => setFollowing((f) => !f)}
                    >
                      {following ? "Following" : "Follow"}
                    </Button>
                    <Button variant="ghost" size="sm">
                      Message
                    </Button>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Stats bar */}
          <div
            className="grid grid-cols-3 gap-px rounded-2xl overflow-hidden"
            style={{ background: "var(--ck-border)" }}
          >
            {[
              { label: "Recipes", value: "42" },
              { label: "Followers", value: "1.2k" },
              { label: "Following", value: "89" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-1 py-5"
                style={{ background: "var(--ck-surface)" }}
              >
                <span
                  style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--ck-heading)" }}
                >
                  {stat.value}
                </span>
                <span style={{ fontSize: "0.8rem", color: "var(--ck-text-muted)" }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Profile completion */}
          <Card>
            <CardBody>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <p style={{ fontWeight: 600, color: "var(--ck-heading)", fontSize: "0.9rem" }}>
                    Profile completion
                  </p>
                  <Badge variant="warning" size="sm">75%</Badge>
                </div>
                <Progress value={75} size="md" color="primary" />
                <Divider />
                <p style={{ fontSize: "0.8rem", color: "var(--ck-text-muted)" }}>
                  Add a banner photo and link your social accounts to reach 100%.
                </p>
              </div>
            </CardBody>
          </Card>

          {/* Recipe tabs */}
          <Tabs
            variant="underline"
            items={[
              {
                id: "recipes",
                label: "Recipes",
                badge: recipes.length,
                content: <RecipeGrid items={recipes} />,
              },
              {
                id: "liked",
                label: "Liked",
                badge: likedRecipes.length,
                content: <RecipeGrid items={likedRecipes} />,
              },
              {
                id: "collections",
                label: "Collections",
                badge: collections.length,
                content: <CollectionsGrid />,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
