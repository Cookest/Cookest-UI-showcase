"use client";

import { useState } from "react";
import {
  HoverCard, HoverCardContent, HoverCardTrigger,
  Avatar, Badge,
} from "@cookest/ui";
import { Playground, PropsTable, PageHeader } from "@/components/Playground";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CalendarDays, Star, BookOpen } from "lucide-react";

export default function HoverCardPage() {
  return (
    <div>
      <Breadcrumb />
      <PageHeader
        title="Hover Card"
        description="A card that appears when hovering over a trigger. Perfect for previewing user profiles, recipe info, or ingredients."
      />

      <div className="flex flex-col gap-8">
        <Playground
          title="Chef Profile"
          description="Show chef details on hover — great for recipe attribution."
          code={`<HoverCard>
  <HoverCardTrigger asChild>
    <a href="#">@chef_marco</a>
  </HoverCardTrigger>
  <HoverCardContent>
    <Avatar alt="CM" />
    <div>
      <h4>Chef Marco</h4>
      <p>Head chef at Osteria Verde</p>
    </div>
  </HoverCardContent>
</HoverCard>`}
        >
          <HoverCard>
            <HoverCardTrigger asChild>
              <a href="#" className="text-sm font-medium underline-offset-4 hover:underline cursor-pointer" style={{ color: "var(--ck-primary)" }}>
                @chef_marco
              </a>
            </HoverCardTrigger>
            <HoverCardContent className="w-72">
              <div className="flex gap-4">
                <Avatar alt="CM" size="md" />
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold" style={{ color: "var(--ck-heading)" }}>Chef Marco Rossi</h4>
                  <p className="text-xs" style={{ color: "var(--ck-text-muted)" }}>Head chef at Osteria Verde · Rome</p>
                  <div className="flex items-center gap-3 pt-1">
                    <div className="flex items-center gap-1 text-xs" style={{ color: "var(--ck-text-muted)" }}>
                      <BookOpen size={12} /> 148 recipes
                    </div>
                    <div className="flex items-center gap-1 text-xs" style={{ color: "var(--ck-text-muted)" }}>
                      <Star size={12} /> 4.9 rating
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs pt-1" style={{ color: "var(--ck-text-muted)" }}>
                    <CalendarDays size={12} /> Joined January 2022
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </Playground>

        <Playground
          title="Ingredient Preview"
          description="Show nutritional or sourcing info for an ingredient on hover."
          code={`<HoverCard>
  <HoverCardTrigger>
    <Badge>Guanciale</Badge>
  </HoverCardTrigger>
  <HoverCardContent>
    <h4>Guanciale</h4>
    <p>Cured pork cheek from central Italy...</p>
  </HoverCardContent>
</HoverCard>`}
        >
          <div className="flex gap-3 flex-wrap">
            {[
              {
                name: "Guanciale",
                desc: "Cured pork cheek — the traditional fat base for Carbonara and Amatriciana.",
                cal: "350 kcal/100g",
              },
              {
                name: "Pecorino Romano",
                desc: "Sharp, salty sheep's milk cheese from Rome. Stronger than Parmesan.",
                cal: "387 kcal/100g",
              },
              {
                name: "Spaghetti",
                desc: "Long thin pasta — the classic shape for Carbonara.",
                cal: "352 kcal/100g (dry)",
              },
            ].map(ing => (
              <HoverCard key={ing.name}>
                <HoverCardTrigger asChild>
                  <span className="cursor-default">
                    <Badge variant="info">{ing.name}</Badge>
                  </span>
                </HoverCardTrigger>
                <HoverCardContent className="w-64">
                  <h4 className="text-sm font-semibold mb-1" style={{ color: "var(--ck-heading)" }}>{ing.name}</h4>
                  <p className="text-xs mb-2" style={{ color: "var(--ck-text)" }}>{ing.desc}</p>
                  <p className="text-xs" style={{ color: "var(--ck-text-muted)" }}>⚡ {ing.cal}</p>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
        </Playground>

        <PropsTable
          props={[
            { name: "HoverCardTrigger", type: "ReactNode", description: "Element that triggers the card on hover." },
            { name: "HoverCardContent", type: "ReactNode", description: "The floating card content." },
            { name: "openDelay", type: "number", default: "700", description: "Delay in ms before the card opens." },
            { name: "closeDelay", type: "number", default: "300", description: "Delay in ms before the card closes." },
            { name: "side", type: '"top" | "right" | "bottom" | "left"', default: '"bottom"', description: "Side the card appears on." },
          ]}
        />
      </div>
    </div>
  );
}
