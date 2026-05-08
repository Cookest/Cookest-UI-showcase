"use client";

import { useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Badge,
  Divider,
  Toggle,
} from "@cookest/ui";
import { Check, X } from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";

const plans = [
  {
    id: "free",
    name: "Free",
    monthlyPrice: 0,
    annualPrice: 0,
    description: "Perfect for casual cooks getting started.",
    cta: "Get Started",
    ctaVariant: "secondary" as const,
    popular: false,
    features: [
      { label: "5 saved recipes", included: true },
      { label: "Basic recipe search", included: true },
      { label: "Community access", included: true },
      { label: "Meal planner", included: false },
      { label: "Nutritional info", included: false },
      { label: "Priority support", included: false },
      { label: "Team collaboration", included: false },
      { label: "API access", included: false },
    ],
  },
  {
    id: "chef",
    name: "Chef",
    monthlyPrice: 9,
    annualPrice: 7,
    description: "For passionate home chefs who cook every day.",
    cta: "Start Free Trial",
    ctaVariant: "primary" as const,
    popular: true,
    features: [
      { label: "Unlimited saved recipes", included: true },
      { label: "Advanced recipe search", included: true },
      { label: "Community access", included: true },
      { label: "Meal planner", included: true },
      { label: "Nutritional info", included: true },
      { label: "Priority support", included: true },
      { label: "Team collaboration", included: false },
      { label: "API access", included: false },
    ],
  },
  {
    id: "studio",
    name: "Studio",
    monthlyPrice: 29,
    annualPrice: 23,
    description: "For food studios, brands, and culinary teams.",
    cta: "Contact Sales",
    ctaVariant: "secondary" as const,
    popular: false,
    features: [
      { label: "Unlimited saved recipes", included: true },
      { label: "Advanced recipe search", included: true },
      { label: "Community access", included: true },
      { label: "Meal planner", included: true },
      { label: "Nutritional info", included: true },
      { label: "Priority support", included: true },
      { label: "Team collaboration", included: true },
      { label: "API access", included: true },
    ],
  },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <div>
      <Breadcrumb />
      <div className="max-w-4xl mx-auto py-8 px-4 md:px-0">
        {/* Page Header */}
        <div className="flex flex-col items-center gap-3 mb-10 text-center">
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "2rem",
              fontWeight: 700,
              color: "var(--ck-heading)",
            }}
          >
            Simple, transparent pricing
          </h1>
          <p style={{ color: "var(--ck-text-muted)", fontSize: "1rem", maxWidth: 480 }}>
            Start for free. Upgrade when you&apos;re ready. No hidden fees.
          </p>

          {/* Billing toggle */}
          <div className="flex items-center gap-4 mt-2">
            <span
              style={{
                fontSize: "0.9rem",
                color: annual ? "var(--ck-text-muted)" : "var(--ck-heading)",
                fontWeight: annual ? 400 : 600,
              }}
            >
              Monthly
            </span>
            <Toggle
              checked={annual}
              onChange={(e) => setAnnual(e.target.checked)}
              toggleSize="md"
            />
            <span
              style={{
                fontSize: "0.9rem",
                color: annual ? "var(--ck-heading)" : "var(--ck-text-muted)",
                fontWeight: annual ? 600 : 400,
              }}
            >
              Annual
            </span>
            {annual && (
              <Badge variant="success" size="sm">
                Save 20%
              </Badge>
            )}
          </div>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan) => {
            const price = annual ? plan.annualPrice : plan.monthlyPrice;
            return (
              <Card
                key={plan.id}
                className={plan.popular ? "shadow-2xl" : ""}
                style={
                  plan.popular
                    ? {
                        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.18)",
                        outline: "2px solid var(--ck-primary)",
                        outlineOffset: "-2px",
                      }
                    : {}
                }
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h2
                          style={{
                            fontSize: "1.1rem",
                            fontWeight: 700,
                            color: "var(--ck-heading)",
                          }}
                        >
                          {plan.name}
                        </h2>
                        {plan.popular && (
                          <Badge variant="success" size="sm">
                            Most Popular
                          </Badge>
                        )}
                      </div>
                      <p style={{ fontSize: "0.8rem", color: "var(--ck-text-muted)" }}>
                        {plan.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-end gap-1 mt-3">
                    <span
                      style={{
                        fontSize: "2.25rem",
                        fontWeight: 800,
                        color: "var(--ck-heading)",
                        lineHeight: 1,
                      }}
                    >
                      ${price}
                    </span>
                    <span style={{ color: "var(--ck-text-muted)", fontSize: "0.85rem", marginBottom: 4 }}>
                      / mo
                    </span>
                    {annual && price > 0 && (
                      <Badge variant="info" size="sm" className="mb-1 ml-1">
                        Billed annually
                      </Badge>
                    )}
                  </div>
                </CardHeader>

                <CardBody>
                  <div className="flex flex-col">
                    {plan.features.map((feature, idx) => (
                      <div key={feature.label}>
                        <div className="flex items-center gap-3 py-2.5">
                          {feature.included ? (
                            <Check
                              size={15}
                              strokeWidth={2.5}
                              style={{ color: "var(--ck-primary)", flexShrink: 0 }}
                            />
                          ) : (
                            <X
                              size={15}
                              strokeWidth={2}
                              style={{ color: "var(--ck-border)", flexShrink: 0 }}
                            />
                          )}
                          <span
                            style={{
                              fontSize: "0.875rem",
                              color: feature.included ? "var(--ck-text)" : "var(--ck-text-muted)",
                            }}
                          >
                            {feature.label}
                          </span>
                        </div>
                        {idx < plan.features.length - 1 && <Divider />}
                      </div>
                    ))}
                  </div>
                </CardBody>

                <CardFooter>
                  <Button
                    variant={plan.ctaVariant}
                    fullWidth
                    size="lg"
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* Footer note */}
        <p className="text-center mt-8 text-sm" style={{ color: "var(--ck-text-muted)" }}>
          All plans include a 14-day free trial. No credit card required.
        </p>
      </div>
    </div>
  );
}
