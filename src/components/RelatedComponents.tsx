"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface RelatedComponent {
  name: string;
  href: string;
  description: string;
}

const componentRelations: Record<string, RelatedComponent[]> = {
  button: [
    { name: "Input", href: "/components/input", description: "Pair with inputs for form actions" },
    { name: "Modal", href: "/components/modal", description: "Trigger modals with button clicks" },
    { name: "Tooltip", href: "/components/tooltip", description: "Add context to icon-only buttons" },
  ],
  input: [
    { name: "Button", href: "/components/button", description: "Submit form data with buttons" },
    { name: "Select", href: "/components/select", description: "Alternative for predefined choices" },
    { name: "Toggle", href: "/components/toggle", description: "Boolean inputs for settings" },
  ],
  card: [
    { name: "Badge", href: "/components/badge", description: "Add status labels to cards" },
    { name: "Avatar", href: "/components/avatar", description: "Show user info in card headers" },
    { name: "Divider", href: "/components/divider", description: "Separate card content sections" },
  ],
  badge: [
    { name: "Card", href: "/components/card", description: "Label cards with status badges" },
    { name: "Avatar", href: "/components/avatar", description: "Show status on user avatars" },
    { name: "Alert", href: "/components/alert", description: "Categorize alert importance" },
  ],
  avatar: [
    { name: "Card", href: "/components/card", description: "Display user info in cards" },
    { name: "Badge", href: "/components/badge", description: "Show online/offline status" },
    { name: "Tooltip", href: "/components/tooltip", description: "Show full name on hover" },
  ],
  modal: [
    { name: "Button", href: "/components/button", description: "Trigger and confirm modal actions" },
    { name: "Input", href: "/components/input", description: "Collect data in modal forms" },
    { name: "Alert", href: "/components/alert", description: "Show feedback after modal actions" },
  ],
  tooltip: [
    { name: "Button", href: "/components/button", description: "Explain button actions on hover" },
    { name: "Avatar", href: "/components/avatar", description: "Show user details on hover" },
    { name: "Badge", href: "/components/badge", description: "Explain badge meanings" },
  ],
  toggle: [
    { name: "Input", href: "/components/input", description: "Other form input types" },
    { name: "Select", href: "/components/select", description: "Multi-option alternatives" },
    { name: "Card", href: "/components/card", description: "Group toggles in settings cards" },
  ],
  select: [
    { name: "Input", href: "/components/input", description: "Text-based form inputs" },
    { name: "Toggle", href: "/components/toggle", description: "Binary yes/no choices" },
    { name: "Button", href: "/components/button", description: "Submit selections" },
  ],
  skeleton: [
    { name: "Card", href: "/components/card", description: "Show loading card placeholders" },
    { name: "Avatar", href: "/components/avatar", description: "Placeholder for user images" },
    { name: "Badge", href: "/components/badge", description: "Loading state for labels" },
  ],
  alert: [
    { name: "Button", href: "/components/button", description: "Dismissible alert actions" },
    { name: "Badge", href: "/components/badge", description: "Alert severity indicators" },
    { name: "Card", href: "/components/card", description: "Contextual alerts within cards" },
  ],
  divider: [
    { name: "Card", href: "/components/card", description: "Separate card content sections" },
    { name: "Input", href: "/components/input", description: "Divide form sections" },
    { name: "Badge", href: "/components/badge", description: "Inline badges with dividers" },
  ],
  tabs: [
    { name: "Accordion", href: "/components/accordion", description: "Alternative expand/collapse navigation" },
    { name: "Card", href: "/components/card", description: "Wrap tab content in cards" },
    { name: "Badge", href: "/components/badge", description: "Show counts on tab labels" },
  ],
  accordion: [
    { name: "Tabs", href: "/components/tabs", description: "Alternative tabbed navigation pattern" },
    { name: "Card", href: "/components/card", description: "Nest accordions inside cards" },
    { name: "Divider", href: "/components/divider", description: "Separate accordion groups" },
  ],
  textarea: [
    { name: "Input", href: "/components/input", description: "Single-line sibling for text fields" },
    { name: "Button", href: "/components/button", description: "Submit textarea content with a button" },
    { name: "Toggle", href: "/components/toggle", description: "Pair with toggles in settings forms" },
  ],
};

export function RelatedComponents({ component }: { component: string }) {
  const related = componentRelations[component];
  if (!related) return null;

  return (
    <section className="mt-12">
      <h2
        className="text-xl font-bold mb-6"
        style={{ color: "var(--ck-heading)", fontFamily: "var(--font-serif)" }}
      >
        Related Components
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {related.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group no-underline rounded-xl border p-4 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
            style={{ borderColor: "var(--ck-border)", background: "var(--ck-surface)" }}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-semibold" style={{ color: "var(--ck-heading)" }}>
                {item.name}
              </span>
              <ArrowRight
                size={14}
                className="opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0.5"
                style={{ color: "var(--ck-primary)" }}
              />
            </div>
            <p className="text-xs m-0" style={{ color: "var(--ck-text-muted)" }}>
              {item.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
