"use client";

import { useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Badge,
  Avatar,
  AvatarGroup,
  Alert,
  Toggle,
  Skeleton,
  Tooltip,
  Divider,
} from "@cookest/ui";
import {
  RefreshCw,
  Star,
  TrendingUp,
  Users,
  Calendar,
  ChefHat,
} from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";

const statCards = [
  { label: "Total Recipes", value: "1,247", change: "+12.5%", variant: "success" as const, icon: ChefHat },
  { label: "Active Users", value: "8,642", change: "+5.3%", variant: "info" as const, icon: Users },
  { label: "Meals Planned This Week", value: "3,891", change: "-2.1%", variant: "warning" as const, icon: Calendar },
  { label: "Average Rating", value: "4.8", change: "+0.3", variant: "success" as const, icon: TrendingUp },
];

const activities = [
  { name: "John", action: "saved Pasta Carbonara", time: "2 min ago", badge: "Saved", variant: "success" as const },
  { name: "Maria", action: "created a new meal plan", time: "8 min ago", badge: "Created", variant: "info" as const },
  { name: "Alex", action: "rated Thai Green Curry ★★★★★", time: "15 min ago", badge: "Rated", variant: "warning" as const },
  { name: "Sophie", action: "saved Caesar Salad", time: "32 min ago", badge: "Saved", variant: "success" as const },
  { name: "Liam", action: "created Weekly Meal Prep", time: "1 hr ago", badge: "Created", variant: "info" as const },
  { name: "Emma", action: "rated Sushi Bowl ★★★★", time: "2 hr ago", badge: "Rated", variant: "warning" as const },
];

const recipes = [
  { name: "Pasta Carbonara", cuisine: "Italian", rating: 5, cooked: 482 },
  { name: "Thai Green Curry", cuisine: "Thai", rating: 4, cooked: 371 },
  { name: "Caesar Salad", cuisine: "American", rating: 4, cooked: 295 },
  { name: "Sushi Bowl", cuisine: "Japanese", rating: 5, cooked: 264 },
  { name: "Tacos Al Pastor", cuisine: "Mexican", rating: 4, cooked: 218 },
];

const teamMembers = [
  { name: "Alice Chen", role: "Head Chef", online: true },
  { name: "Bob Martinez", role: "Nutritionist", online: true },
  { name: "Carol Kim", role: "Recipe Developer", online: false },
  { name: "David Okafor", role: "Data Analyst", online: true },
];

const allTeamSeeds = ["Alice", "Bob", "Carol", "David", "Eva", "Frank"];

function dicebear(seed: string) {
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={14}
          fill={i < rating ? "var(--ck-warning)" : "none"}
          stroke={i < rating ? "var(--ck-warning)" : "var(--ck-text-muted)"}
        />
      ))}
    </span>
  );
}

export default function DashboardPage() {
  const [alertVisible, setAlertVisible] = useState(true);
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen p-6 md:p-10" style={{ background: "var(--ck-bg)" }}>
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        <Breadcrumb />

        {/* Dismissible Alert */}
        {alertVisible && (
          <Alert
            variant="info"
            title="Dashboard Update"
            dismissible
            onDismiss={() => setAlertVisible(false)}
          >
            New recipe analytics dashboard is available! Review updated nutritional metrics.
          </Alert>
        )}

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1
              className="text-3xl font-bold"
              style={{ color: "var(--ck-heading)", fontFamily: "var(--font-serif)" }}
            >
              Dashboard
            </h1>
            <p className="mt-1 text-sm" style={{ color: "var(--ck-text-muted)" }}>
              Jan 1 &ndash; Jan 31, 2025
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Toggle
              checked={loading}
              onChange={(e) => setLoading(e.target.checked)}
              label="Skeleton preview"
              toggleSize="sm"
            />
            <Button
              variant="secondary"
              size="sm"
              iconLeft={<RefreshCw size={14} />}
              onClick={() => {
                setLoading(true);
                setTimeout(() => setLoading(false), 1500);
              }}
            >
              Refresh
            </Button>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} variant="default" padding="md">
                <CardBody>
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-medium" style={{ color: "var(--ck-text-muted)" }}>
                        {stat.label}
                      </span>
                      {loading ? (
                        <Skeleton variant="text" width="60%" height={32} />
                      ) : (
                        <span
                          className="text-2xl font-bold"
                          style={{ color: "var(--ck-heading)" }}
                        >
                          {stat.value}
                        </span>
                      )}
                    </div>
                    <div
                      className="p-2 rounded-lg"
                      style={{ background: "var(--ck-surface)" }}
                    >
                      <Icon size={18} style={{ color: "var(--ck-primary)" }} />
                    </div>
                  </div>
                  <div className="mt-3">
                    {loading ? (
                      <Skeleton variant="text" width="40%" height={20} />
                    ) : (
                      <Badge variant={stat.variant} size="sm">
                        {stat.change}
                      </Badge>
                    )}
                  </div>
                </CardBody>
              </Card>
            );
          })}
        </div>

        {/* Two-column layout: Activity Feed + Popular Recipes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Activity Feed */}
          <Card variant="default">
            <CardHeader>
              <div className="flex items-center justify-between w-full">
                <h2
                  className="text-lg font-semibold"
                  style={{ color: "var(--ck-heading)" }}
                >
                  Recent Activity
                </h2>
                <Badge variant="info" size="sm">
                  {activities.length} new
                </Badge>
              </div>
            </CardHeader>
            <CardBody>
              <div className="flex flex-col">
                {activities.map((item, idx) => (
                  <div key={idx}>
                    {loading ? (
                      <div className="flex items-center gap-3 py-3">
                        <Skeleton variant="circular" width={36} height={36} />
                        <div className="flex-1 flex flex-col gap-1">
                          <Skeleton variant="text" width="75%" height={14} />
                          <Skeleton variant="text" width="30%" height={12} />
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 py-3">
                        <Avatar
                          src={dicebear(item.name)}
                          alt={item.name}
                          size="sm"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm truncate" style={{ color: "var(--ck-text)" }}>
                            <span className="font-medium">{item.name}</span>{" "}
                            {item.action}
                          </p>
                          <p className="text-xs" style={{ color: "var(--ck-text-muted)" }}>
                            {item.time}
                          </p>
                        </div>
                        <Badge variant={item.variant} size="sm">
                          {item.badge}
                        </Badge>
                      </div>
                    )}
                    {idx < activities.length - 1 && <Divider />}
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Popular Recipes */}
          <Card variant="default">
            <CardHeader>
              <h2
                className="text-lg font-semibold"
                style={{ color: "var(--ck-heading)" }}
              >
                Popular Recipes
              </h2>
            </CardHeader>
            <CardBody>
              <div className="flex flex-col">
                {/* Table header */}
                <div
                  className="grid gap-2 pb-2 text-xs font-medium"
                  style={{
                    gridTemplateColumns: "1fr auto auto auto",
                    color: "var(--ck-text-muted)",
                  }}
                >
                  <span>Recipe</span>
                  <span>Cuisine</span>
                  <span>Rating</span>
                  <span className="text-right">Cooked</span>
                </div>
                <Divider />
                {recipes.map((recipe, idx) => (
                  <div key={recipe.name}>
                    {loading ? (
                      <div className="py-3">
                        <Skeleton variant="text" width="100%" height={18} />
                      </div>
                    ) : (
                      <div
                        className="grid gap-2 items-center py-3"
                        style={{ gridTemplateColumns: "1fr auto auto auto" }}
                      >
                        <Tooltip content={`View ${recipe.name}`} position="top">
                          <span
                            className="text-sm font-medium cursor-pointer"
                            style={{ color: "var(--ck-text)" }}
                          >
                            {recipe.name}
                          </span>
                        </Tooltip>
                        <Badge variant="default" size="sm">
                          {recipe.cuisine}
                        </Badge>
                        <StarRating rating={recipe.rating} />
                        <span
                          className="text-sm text-right tabular-nums"
                          style={{ color: "var(--ck-text-muted)" }}
                        >
                          {recipe.cooked}
                        </span>
                      </div>
                    )}
                    {idx < recipes.length - 1 && <Divider />}
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Team Card */}
        <Card variant="default">
          <CardHeader>
            <h2
              className="text-lg font-semibold"
              style={{ color: "var(--ck-heading)" }}
            >
              Team Members
            </h2>
          </CardHeader>
          <CardBody>
            <div className="flex flex-col gap-6">
              {/* Avatar Group */}
              <div>
                <AvatarGroup max={4}>
                  {allTeamSeeds.map((seed) => (
                    <Avatar
                      key={seed}
                      src={dicebear(seed)}
                      alt={seed}
                      size="md"
                    />
                  ))}
                </AvatarGroup>
              </div>

              <Divider />

              {/* Member List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {teamMembers.map((member) => (
                  <div
                    key={member.name}
                    className="flex items-center gap-3 p-3 rounded-lg"
                    style={{ background: "var(--ck-surface)" }}
                  >
                    {loading ? (
                      <>
                        <Skeleton variant="circular" width={40} height={40} />
                        <div className="flex flex-col gap-1 flex-1">
                          <Skeleton variant="text" width="60%" height={14} />
                          <Skeleton variant="text" width="40%" height={12} />
                        </div>
                      </>
                    ) : (
                      <>
                        <Avatar
                          src={dicebear(member.name.split(" ")[0])}
                          alt={member.name}
                          size="md"
                        />
                        <div className="flex-1 min-w-0">
                          <p
                            className="text-sm font-medium"
                            style={{ color: "var(--ck-heading)" }}
                          >
                            {member.name}
                          </p>
                          <p
                            className="text-xs"
                            style={{ color: "var(--ck-text-muted)" }}
                          >
                            {member.role}
                          </p>
                        </div>
                        <Badge
                          dot
                          variant={member.online ? "success" : "default"}
                          size="sm"
                        >
                          {member.online ? "Online" : "Offline"}
                        </Badge>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
