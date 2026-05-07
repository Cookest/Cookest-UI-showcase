"use client";

import { useState } from "react";
import {
  Button,
  Input,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Badge,
  Avatar,
  AvatarGroup,
  Toggle,
  Alert,
  Divider,
  Skeleton,
  Tooltip,
  Select,
} from "@cookest/ui";
import { Breadcrumb } from "@/components/Breadcrumb";
import { AnimateIn } from "@/components/AnimateIn";
import {
  ArrowLeft,
  ArrowRight,
  User,
  Camera,
  Check,
  Sparkles,
  ChefHat,
  Flame,
  Award,
  Leaf,
  Wheat,
  Milk,
  Nut,
  Zap,
  PartyPopper,
} from "lucide-react";

const dietaryOptions = [
  { key: "vegetarian", label: "Vegetarian", icon: Leaf, description: "No meat or fish" },
  { key: "vegan", label: "Vegan", icon: Leaf, description: "No animal products" },
  { key: "glutenFree", label: "Gluten-Free", icon: Wheat, description: "No wheat or gluten" },
  { key: "dairyFree", label: "Dairy-Free", icon: Milk, description: "No milk products" },
  { key: "nutFree", label: "Nut-Free", icon: Nut, description: "No tree nuts or peanuts" },
  { key: "keto", label: "Keto", icon: Zap, description: "High fat, low carb" },
];

const cookingLevels = [
  {
    key: "beginner",
    label: "Beginner",
    icon: ChefHat,
    emoji: "🌱",
    description: "I'm just getting started in the kitchen. Show me the basics — simple recipes, essential techniques, and helpful tips.",
    recipes: "500+ beginner recipes",
  },
  {
    key: "intermediate",
    label: "Intermediate",
    icon: Flame,
    emoji: "🔥",
    description: "I'm comfortable cooking and ready to level up. Challenge me with new cuisines, techniques, and more complex dishes.",
    recipes: "2,000+ intermediate recipes",
  },
  {
    key: "expert",
    label: "Expert",
    icon: Award,
    emoji: "⭐",
    description: "I'm a seasoned cook who loves a challenge. Bring on the advanced techniques, restaurant-level plating, and fusion experiments.",
    recipes: "5,000+ expert recipes",
  },
];

interface FormData {
  name: string;
  dietary: Record<string, boolean>;
  level: string;
}

export default function OnboardingWizardPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    dietary: {
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      dairyFree: false,
      nutFree: false,
      keto: false,
    },
    level: "",
  });
  const [showCompletion, setShowCompletion] = useState(false);

  const totalSteps = 4;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const canProceed = () => {
    if (currentStep === 0) return formData.name.trim().length > 0;
    if (currentStep === 1) return true;
    if (currentStep === 2) return formData.level !== "";
    return true;
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((s) => s + 1);
      if (currentStep === 2) setShowCompletion(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
      if (currentStep === 3) setShowCompletion(false);
    }
  };

  const toggleDietary = (key: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      dietary: { ...prev.dietary, [key]: checked },
    }));
  };

  const selectedPreferences = Object.entries(formData.dietary)
    .filter(([, v]) => v)
    .map(([k]) => dietaryOptions.find((d) => d.key === k)?.label ?? k);

  const selectedLevel = cookingLevels.find((l) => l.key === formData.level);

  return (
    <div className="max-w-2xl mx-auto">
      <Breadcrumb />

      <AnimateIn>
        <div className="mb-8 text-center">
          <h1
            className="text-3xl font-bold mb-2 m-0"
            style={{ color: "var(--ck-heading)", fontFamily: "'Playfair Display', serif" }}
          >
            Welcome to Cookest
          </h1>
          <p className="text-sm m-0" style={{ color: "var(--ck-text-muted)" }}>
            Let&apos;s personalize your cooking experience
          </p>
        </div>
      </AnimateIn>

      {/* Step Indicator */}
      <AnimateIn delay={0.05}>
        <div className="flex items-center justify-center gap-2 mb-2">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
                style={{
                  background:
                    i < currentStep
                      ? "var(--ck-primary)"
                      : i === currentStep
                        ? "var(--ck-primary)"
                        : "var(--ck-surface)",
                  color:
                    i <= currentStep ? "#fff" : "var(--ck-text-muted)",
                  border:
                    i <= currentStep
                      ? "2px solid var(--ck-primary)"
                      : "2px solid var(--ck-border)",
                }}
              >
                {i < currentStep ? <Check size={14} /> : i + 1}
              </div>
              {i < totalSteps - 1 && (
                <div
                  className="w-10 h-0.5 rounded transition-all duration-300"
                  style={{
                    background:
                      i < currentStep ? "var(--ck-primary)" : "var(--ck-border)",
                  }}
                />
              )}
            </div>
          ))}
        </div>
        <div className="text-center mb-6">
          <span className="text-xs" style={{ color: "var(--ck-text-muted)" }}>
            Step {currentStep + 1} of {totalSteps}
          </span>
        </div>
      </AnimateIn>

      {/* Progress Bar */}
      <AnimateIn delay={0.1}>
        <div
          className="h-1.5 rounded-full mb-8 overflow-hidden"
          style={{ background: "var(--ck-border)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${progress}%`,
              background: "var(--ck-primary)",
            }}
          />
        </div>
      </AnimateIn>

      {/* Step Content */}
      <AnimateIn key={currentStep} direction="left">
        <Card variant="default" padding="lg" className="mb-6">
          <CardBody>
            {/* Step 1: Welcome */}
            {currentStep === 0 && (
              <div>
                <div className="text-center mb-6">
                  <div
                    className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
                    style={{ background: "rgba(122,154,101,0.1)" }}
                  >
                    <Sparkles size={32} style={{ color: "var(--ck-primary)" }} />
                  </div>
                  <h2
                    className="text-xl font-bold m-0 mb-2"
                    style={{ color: "var(--ck-heading)", fontFamily: "'Playfair Display', serif" }}
                  >
                    Let&apos;s get to know you
                  </h2>
                  <p className="text-sm m-0" style={{ color: "var(--ck-text-muted)" }}>
                    Tell us your name so we can personalize your experience.
                  </p>
                </div>

                <div className="max-w-sm mx-auto space-y-5">
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: "var(--ck-heading)" }}
                    >
                      Your Name
                    </label>
                    <Input
                      placeholder="e.g., Alex Johnson"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: "var(--ck-heading)" }}
                    >
                      Profile Photo
                    </label>
                    <div
                      className="w-24 h-24 rounded-full mx-auto flex flex-col items-center justify-center cursor-pointer transition-all duration-200 hover:opacity-80"
                      style={{
                        background: "var(--ck-surface)",
                        border: "2px dashed var(--ck-border)",
                      }}
                    >
                      <Camera size={20} style={{ color: "var(--ck-text-muted)" }} />
                      <span
                        className="text-[10px] mt-1"
                        style={{ color: "var(--ck-text-muted)" }}
                      >
                        Upload
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Dietary Preferences */}
            {currentStep === 1 && (
              <div>
                <div className="text-center mb-6">
                  <div
                    className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
                    style={{ background: "rgba(122,154,101,0.1)" }}
                  >
                    <Leaf size={32} style={{ color: "var(--ck-primary)" }} />
                  </div>
                  <h2
                    className="text-xl font-bold m-0 mb-2"
                    style={{ color: "var(--ck-heading)", fontFamily: "'Playfair Display', serif" }}
                  >
                    Dietary Preferences
                  </h2>
                  <p className="text-sm m-0" style={{ color: "var(--ck-text-muted)" }}>
                    Select any dietary requirements so we can tailor recipes for you.
                  </p>
                </div>

                <div className="space-y-3">
                  {dietaryOptions.map((option) => {
                    const Icon = option.icon;
                    const isActive = formData.dietary[option.key];
                    return (
                      <div
                        key={option.key}
                        className="flex items-center justify-between p-4 rounded-xl transition-all duration-200 cursor-pointer"
                        style={{
                          background: isActive ? "rgba(122,154,101,0.08)" : "var(--ck-surface)",
                          border: isActive
                            ? "1px solid var(--ck-primary)"
                            : "1px solid var(--ck-border)",
                        }}
                        onClick={() => toggleDietary(option.key, !isActive)}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-9 h-9 rounded-lg flex items-center justify-center"
                            style={{
                              background: isActive
                                ? "rgba(122,154,101,0.15)"
                                : "var(--ck-bg)",
                            }}
                          >
                            <Icon
                              size={18}
                              style={{
                                color: isActive
                                  ? "var(--ck-primary)"
                                  : "var(--ck-text-muted)",
                              }}
                            />
                          </div>
                          <div>
                            <p
                              className="text-sm font-semibold m-0"
                              style={{ color: "var(--ck-heading)" }}
                            >
                              {option.label}
                            </p>
                            <p className="text-xs m-0" style={{ color: "var(--ck-text-muted)" }}>
                              {option.description}
                            </p>
                          </div>
                        </div>
                        <Toggle
                          checked={isActive}
                          onChange={(e) => toggleDietary(option.key, e.target.checked)}
                          label=""
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 3: Cooking Level */}
            {currentStep === 2 && (
              <div>
                <div className="text-center mb-6">
                  <div
                    className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
                    style={{ background: "rgba(122,154,101,0.1)" }}
                  >
                    <ChefHat size={32} style={{ color: "var(--ck-primary)" }} />
                  </div>
                  <h2
                    className="text-xl font-bold m-0 mb-2"
                    style={{ color: "var(--ck-heading)", fontFamily: "'Playfair Display', serif" }}
                  >
                    Your Cooking Level
                  </h2>
                  <p className="text-sm m-0" style={{ color: "var(--ck-text-muted)" }}>
                    This helps us recommend recipes that match your skill level.
                  </p>
                </div>

                <div className="space-y-3">
                  {cookingLevels.map((level) => {
                    const isSelected = formData.level === level.key;
                    return (
                      <div
                        key={level.key}
                        className="p-5 rounded-xl cursor-pointer transition-all duration-200"
                        style={{
                          background: isSelected
                            ? "rgba(122,154,101,0.08)"
                            : "var(--ck-surface)",
                          border: isSelected
                            ? "2px solid var(--ck-primary)"
                            : "2px solid var(--ck-border)",
                          transform: isSelected ? "scale(1.01)" : "scale(1)",
                        }}
                        onClick={() => setFormData({ ...formData, level: level.key })}
                      >
                        <div className="flex items-start gap-4">
                          <span className="text-3xl">{level.emoji}</span>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3
                                className="text-base font-bold m-0"
                                style={{ color: "var(--ck-heading)" }}
                              >
                                {level.label}
                              </h3>
                              {isSelected && (
                                <Badge variant="success" size="sm">Selected</Badge>
                              )}
                            </div>
                            <p
                              className="text-sm m-0 mb-2 leading-relaxed"
                              style={{ color: "var(--ck-text)" }}
                            >
                              {level.description}
                            </p>
                            <Badge variant="default" size="sm">{level.recipes}</Badge>
                          </div>
                          <div
                            className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1"
                            style={{
                              borderColor: isSelected
                                ? "var(--ck-primary)"
                                : "var(--ck-border)",
                              background: isSelected ? "var(--ck-primary)" : "transparent",
                            }}
                          >
                            {isSelected && <Check size={12} color="#fff" />}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 4: All Set! */}
            {currentStep === 3 && (
              <div>
                <div className="text-center mb-6 relative">
                  {/* Confetti-style decorations */}
                  {showCompletion && (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                      {["🎉", "🎊", "✨", "🌟", "🎈", "⭐"].map((emoji, i) => (
                        <span
                          key={i}
                          className="absolute text-xl"
                          style={{
                            left: `${15 + i * 14}%`,
                            top: `${10 + (i % 3) * 20}%`,
                            opacity: 0.7,
                            animation: `float ${2 + i * 0.3}s ease-in-out infinite alternate`,
                          }}
                        >
                          {emoji}
                        </span>
                      ))}
                    </div>
                  )}
                  <div
                    className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center"
                    style={{ background: "rgba(122,154,101,0.15)" }}
                  >
                    <PartyPopper size={40} style={{ color: "var(--ck-primary)" }} />
                  </div>
                  <h2
                    className="text-2xl font-bold m-0 mb-2"
                    style={{ color: "var(--ck-heading)", fontFamily: "'Playfair Display', serif" }}
                  >
                    All Set, {formData.name || "Chef"}! 🎉
                  </h2>
                  <p className="text-sm m-0" style={{ color: "var(--ck-text-muted)" }}>
                    Your personalized cooking experience is ready. Here&apos;s a summary of your preferences.
                  </p>
                </div>

                <Card
                  variant="default"
                  padding="md"
                  className="mb-5"
                >
                  <CardBody>
                    <div className="space-y-4">
                      {/* Name */}
                      <div className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center"
                          style={{ background: "rgba(122,154,101,0.1)" }}
                        >
                          <User size={18} style={{ color: "var(--ck-primary)" }} />
                        </div>
                        <div>
                          <p className="text-xs m-0" style={{ color: "var(--ck-text-muted)" }}>
                            Name
                          </p>
                          <p
                            className="text-sm font-semibold m-0"
                            style={{ color: "var(--ck-heading)" }}
                          >
                            {formData.name || "Not provided"}
                          </p>
                        </div>
                      </div>

                      <Divider />

                      {/* Dietary */}
                      <div className="flex items-start gap-3">
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: "rgba(122,154,101,0.1)" }}
                        >
                          <Leaf size={18} style={{ color: "var(--ck-primary)" }} />
                        </div>
                        <div>
                          <p className="text-xs m-0 mb-1" style={{ color: "var(--ck-text-muted)" }}>
                            Dietary Preferences
                          </p>
                          {selectedPreferences.length > 0 ? (
                            <div className="flex flex-wrap gap-1.5">
                              {selectedPreferences.map((p) => (
                                <Badge key={p} variant="info" size="sm">
                                  {p}
                                </Badge>
                              ))}
                            </div>
                          ) : (
                            <p
                              className="text-sm m-0"
                              style={{ color: "var(--ck-text-muted)" }}
                            >
                              No restrictions
                            </p>
                          )}
                        </div>
                      </div>

                      <Divider />

                      {/* Level */}
                      <div className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center"
                          style={{ background: "rgba(122,154,101,0.1)" }}
                        >
                          <ChefHat size={18} style={{ color: "var(--ck-primary)" }} />
                        </div>
                        <div>
                          <p className="text-xs m-0" style={{ color: "var(--ck-text-muted)" }}>
                            Cooking Level
                          </p>
                          <p
                            className="text-sm font-semibold m-0"
                            style={{ color: "var(--ck-heading)" }}
                          >
                            {selectedLevel
                              ? `${selectedLevel.emoji} ${selectedLevel.label}`
                              : "Not selected"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>

                <Alert variant="success">
                  We&apos;ve curated {selectedLevel?.key === "expert" ? "5,000+" : selectedLevel?.key === "intermediate" ? "2,000+" : "500+"} recipes
                  just for you. Start exploring now!
                </Alert>
              </div>
            )}
          </CardBody>

          {/* Navigation Buttons */}
          <CardFooter>
            <div className="flex items-center justify-between w-full">
              <Button
                variant="ghost"
                onClick={handleBack}
                iconLeft={<ArrowLeft size={16} />}
                disabled={currentStep === 0}
              >
                Back
              </Button>
              {currentStep < totalSteps - 1 ? (
                <Button
                  variant="primary"
                  onClick={handleNext}
                  iconRight={<ArrowRight size={16} />}
                  disabled={!canProceed()}
                >
                  {currentStep === 2 ? "Finish" : "Next"}
                </Button>
              ) : (
                <Button
                  variant="primary"
                  iconRight={<Sparkles size={16} />}
                >
                  Start Cooking
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      </AnimateIn>

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes float {
          from { transform: translateY(0px) rotate(0deg); }
          to { transform: translateY(-15px) rotate(10deg); }
        }
      `}</style>
    </div>
  );
}
