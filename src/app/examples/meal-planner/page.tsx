"use client";

import { useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Badge,
  Modal,
  Select,
  Toggle,
  Tooltip,
  Skeleton,
  SkeletonCard,
  Divider,
  Alert,
} from "@cookest/ui";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  ShoppingCart,
  Flame,
  Drumstick,
  Wheat,
  Droplets,
  Clock,
} from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";

// --- Data Types ---

interface Recipe {
  name: string;
  calories: number;
  time: number;
  description: string;
}

type MealSlot = "breakfast" | "lunch" | "dinner";

type MealPlan = Record<string, Record<MealSlot, Recipe | null>>;

// --- Static Data ---

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const DATES = ["May 5", "May 6", "May 7", "May 8", "May 9", "May 10", "May 11"];
const SLOTS: MealSlot[] = ["breakfast", "lunch", "dinner"];

const RECIPES: Record<string, Recipe> = {
  avocado_toast: { name: "Avocado Toast", calories: 320, time: 10, description: "Whole-grain toast topped with smashed avocado, cherry tomatoes, and a poached egg." },
  greek_salad: { name: "Greek Salad", calories: 280, time: 15, description: "Crisp romaine, cucumber, olives, red onion, and feta with lemon-herb dressing." },
  chicken_stir_fry: { name: "Chicken Stir Fry", calories: 480, time: 25, description: "Tender chicken breast with mixed vegetables in a savory ginger-soy sauce." },
  pasta_primavera: { name: "Pasta Primavera", calories: 520, time: 30, description: "Penne pasta tossed with seasonal vegetables in a light garlic-olive oil sauce." },
  salmon_bowl: { name: "Salmon Bowl", calories: 450, time: 20, description: "Grilled salmon fillet over brown rice with edamame, avocado, and miso dressing." },
  veggie_wrap: { name: "Veggie Wrap", calories: 350, time: 10, description: "Spinach tortilla filled with hummus, roasted peppers, cucumber, and sprouts." },
  beef_tacos: { name: "Beef Tacos", calories: 540, time: 25, description: "Seasoned ground beef in corn tortillas with fresh salsa, lime crema, and cilantro." },
  mushroom_risotto: { name: "Mushroom Risotto", calories: 470, time: 35, description: "Creamy arborio rice slow-cooked with wild mushrooms, parmesan, and fresh thyme." },
  overnight_oats: { name: "Overnight Oats", calories: 310, time: 5, description: "Rolled oats soaked in almond milk with chia seeds, banana, and a drizzle of honey." },
  grilled_shrimp: { name: "Grilled Shrimp Skewers", calories: 390, time: 20, description: "Marinated shrimp skewers with grilled zucchini and a tangy chimichurri sauce." },
};

const RECIPE_OPTIONS = Object.entries(RECIPES).map(([value, r]) => ({ value, label: r.name }));

const INITIAL_PLAN: MealPlan = {
  Monday:    { breakfast: RECIPES.avocado_toast,    lunch: RECIPES.greek_salad,      dinner: RECIPES.chicken_stir_fry },
  Tuesday:   { breakfast: RECIPES.overnight_oats,   lunch: null,                     dinner: RECIPES.pasta_primavera },
  Wednesday: { breakfast: null,                     lunch: RECIPES.veggie_wrap,       dinner: RECIPES.salmon_bowl },
  Thursday:  { breakfast: RECIPES.avocado_toast,    lunch: RECIPES.greek_salad,      dinner: null },
  Friday:    { breakfast: null,                     lunch: null,                     dinner: RECIPES.beef_tacos },
  Saturday:  { breakfast: RECIPES.overnight_oats,   lunch: RECIPES.grilled_shrimp,   dinner: RECIPES.mushroom_risotto },
  Sunday:    { breakfast: null,                     lunch: null,                     dinner: null },
};

const SHOPPING_LIST: { category: string; items: string[] }[] = [
  { category: "Produce", items: ["Avocados", "Tomatoes", "Spinach", "Mushrooms", "Zucchini", "Cucumber"] },
  { category: "Protein", items: ["Chicken Breast", "Salmon Fillet", "Ground Beef", "Shrimp"] },
  { category: "Dairy", items: ["Feta Cheese", "Parmesan", "Almond Milk"] },
  { category: "Pantry", items: ["Olive Oil", "Penne Pasta", "Arborio Rice", "Corn Tortillas", "Rolled Oats"] },
];

// --- Component ---

export default function MealPlannerPage() {
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<MealPlan>(INITIAL_PLAN);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<{ day: string; slot: MealSlot } | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<string>("");
  const [shoppingItems, setShoppingItems] = useState(SHOPPING_LIST);
  const [addedAlert, setAddedAlert] = useState(false);

  const openAddModal = (day: string, slot: MealSlot) => {
    setEditTarget({ day, slot });
    setSelectedRecipe("");
    setModalOpen(true);
  };

  const confirmAdd = () => {
    if (!editTarget || !selectedRecipe) return;
    setPlan((prev) => ({
      ...prev,
      [editTarget.day]: { ...prev[editTarget.day], [editTarget.slot]: RECIPES[selectedRecipe] },
    }));
    setModalOpen(false);
    setAddedAlert(true);
    setTimeout(() => setAddedAlert(false), 2500);
  };

  const removeShoppingItem = (catIdx: number, itemIdx: number) => {
    setShoppingItems((prev) =>
      prev.map((cat, ci) =>
        ci === catIdx ? { ...cat, items: cat.items.filter((_, ii) => ii !== itemIdx) } : cat
      )
    );
  };

  const preview = selectedRecipe ? RECIPES[selectedRecipe] : null;

  // --- Render ---
  return (
    <div>
      <Breadcrumb />

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1
          className="text-3xl font-bold"
          style={{ color: "var(--ck-heading)", fontFamily: "var(--font-serif)" }}
        >
          Meal Planner
        </h1>
        <Toggle
          checked={loading}
          onChange={(e) => setLoading(e.target.checked)}
          label="Skeleton preview"
          toggleSize="sm"
        />
      </div>

      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="sm" iconLeft={<ChevronLeft size={16} />}>
          Prev Week
        </Button>
        <span className="text-sm font-medium" style={{ color: "var(--ck-text)" }}>
          May 5 – May 11, 2025
        </span>
        <Button variant="ghost" size="sm" iconRight={<ChevronRight size={16} />}>
          Next Week
        </Button>
      </div>

      {addedAlert && (
        <div className="mb-4">
          <Alert variant="success" title="Meal added" dismissible onDismiss={() => setAddedAlert(false)}>
            Recipe has been added to your meal plan.
          </Alert>
        </div>
      )}

      {/* Main layout: grid + sidebar */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* 7-day grid */}
        <div className="flex-1 min-w-0">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
              {DAYS.map((d) => (
                <SkeletonCard key={d} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
              {DAYS.map((day, di) => (
                <Card key={day} variant="outlined" padding="sm" className="min-w-0 overflow-hidden">
                  <CardHeader>
                    <div>
                      <div className="text-sm font-semibold" style={{ color: "var(--ck-heading)" }}>
                        {day}
                      </div>
                      <div className="text-xs" style={{ color: "var(--ck-text-muted)" }}>
                        {DATES[di]}
                      </div>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <div className="flex flex-col gap-3">
                      {SLOTS.map((slot) => {
                        const meal = plan[day]?.[slot];
                        return (
                          <div key={slot}>
                            <div
                              className="text-xs font-medium uppercase mb-1"
                              style={{ color: "var(--ck-text-muted)", letterSpacing: "0.05em" }}
                            >
                              {slot}
                            </div>
                            {meal ? (
                              <div
                                className="p-2 rounded-md overflow-hidden"
                                style={{ background: "var(--ck-bg-card)", border: "1px solid var(--ck-border)" }}
                              >
                                <div
                                  className="text-xs font-semibold mb-1 truncate"
                                  style={{ color: "var(--ck-text)" }}
                                >
                                  {meal.name}
                                </div>
                                <div className="flex flex-wrap gap-1">
                                  <Badge variant="info" size="sm">
                                    {meal.calories} cal
                                  </Badge>
                                  <Badge variant="default" size="sm">
                                    {meal.time} min
                                  </Badge>
                                </div>
                              </div>
                            ) : (
                              <Button
                                variant="ghost"
                                size="sm"
                                iconLeft={<Plus size={14} />}
                                fullWidth
                                onClick={() => openAddModal(day, slot)}
                              >
                                Add meal
                              </Button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          )}

          {/* Nutritional Summary */}
          <div className="mt-6">
            <h2
              className="text-lg font-semibold mb-3"
              style={{ color: "var(--ck-heading)", fontFamily: "var(--font-serif)" }}
            >
              Daily Averages
            </h2>
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <NutritionCard
                  icon={<Flame size={20} />}
                  value="2,150"
                  unit="kcal/day"
                  label="Calories"
                  color="var(--ck-warning)"
                />
                <NutritionCard
                  icon={<Drumstick size={20} />}
                  value="95g"
                  unit="daily avg"
                  label="Protein"
                  color="var(--ck-success)"
                />
                <NutritionCard
                  icon={<Wheat size={20} />}
                  value="280g"
                  unit="daily avg"
                  label="Carbs"
                  color="var(--ck-info)"
                />
                <NutritionCard
                  icon={<Droplets size={20} />}
                  value="72g"
                  unit="daily avg"
                  label="Fat"
                  color="var(--ck-error)"
                />
              </div>
            )}
          </div>
        </div>

        {/* Shopping list sidebar */}
        <div className="w-full lg:w-[280px] lg:shrink-0">
          {loading ? (
            <SkeletonCard />
          ) : (
            <Card variant="outlined" padding="md">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <ShoppingCart size={18} style={{ color: "var(--ck-primary)" }} />
                  <span className="font-semibold" style={{ color: "var(--ck-heading)" }}>
                    Shopping List
                  </span>
                </div>
              </CardHeader>
              <CardBody>
                <div className="flex flex-col gap-3">
                  {shoppingItems.map((cat, ci) => (
                    <div key={cat.category}>
                      {ci > 0 && <Divider orientation="horizontal" />}
                      <div
                        className="text-xs font-semibold uppercase mt-2 mb-2"
                        style={{ color: "var(--ck-text-muted)", letterSpacing: "0.05em" }}
                      >
                        {cat.category}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {cat.items.map((item, ii) => (
                          <Badge
                            key={item}
                            variant="default"
                            size="sm"
                            removable
                            onRemove={() => removeShoppingItem(ci, ii)}
                          >
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          )}
        </div>
      </div>

      {/* Add Meal Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editTarget ? `Add Meal — ${editTarget.day} ${editTarget.slot}` : "Add Meal"}
        size="md"
        closeOnBackdrop
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={confirmAdd} disabled={!selectedRecipe}>
              Add to Plan
            </Button>
          </div>
        }
      >
        <div className="flex flex-col gap-4">
          <Select
            label="Choose a recipe"
            placeholder="Search recipes…"
            options={RECIPE_OPTIONS}
            value={selectedRecipe}
            onChange={(v) => setSelectedRecipe(v as string)}
            searchable
          />

          {preview && (
            <Card variant="interactive" padding="md">
              <CardBody>
                <div className="flex flex-col gap-2">
                  <span className="font-semibold" style={{ color: "var(--ck-heading)" }}>
                    {preview.name}
                  </span>
                  <div className="flex gap-2">
                    <Tooltip content="Estimated calories" position="top">
                      <Badge variant="info" size="sm">
                        <span className="flex items-center gap-1">
                          <Flame size={12} /> {preview.calories} cal
                        </span>
                      </Badge>
                    </Tooltip>
                    <Tooltip content="Cook time" position="top">
                      <Badge variant="default" size="sm">
                        <span className="flex items-center gap-1">
                          <Clock size={12} /> {preview.time} min
                        </span>
                      </Badge>
                    </Tooltip>
                  </div>
                  <p className="text-sm" style={{ color: "var(--ck-text-muted)" }}>
                    {preview.description}
                  </p>
                </div>
              </CardBody>
            </Card>
          )}
        </div>
      </Modal>
    </div>
  );
}

// --- Sub-component ---

function NutritionCard({
  icon,
  value,
  unit,
  label,
  color,
}: {
  icon: React.ReactNode;
  value: string;
  unit: string;
  label: string;
  color: string;
}) {
  return (
    <Card variant="outlined" padding="md">
      <CardBody>
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center rounded-lg"
            style={{ width: 40, height: 40, background: color, opacity: 0.15 }}
          >
            <span style={{ color, opacity: 1 }}>{icon}</span>
          </div>
          <div>
            <div className="text-xl font-bold" style={{ color: "var(--ck-heading)" }}>
              {value}
            </div>
            <div className="text-xs" style={{ color: "var(--ck-text-muted)" }}>
              {unit}
            </div>
          </div>
        </div>
        <div
          className="text-xs font-medium mt-2"
          style={{ color }}
        >
          {label}
        </div>
      </CardBody>
    </Card>
  );
}
