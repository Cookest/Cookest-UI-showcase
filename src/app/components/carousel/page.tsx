"use client";

import { useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@cookest/ui";
import { Playground, PropsTable, PageHeader } from "@/components/Playground";
import { Breadcrumb } from "@/components/Breadcrumb";

const recipes = [
  { emoji: "🍝", name: "Pasta Carbonara", cuisine: "Italian", time: "25 min", rating: 4.9 },
  { emoji: "🍚", name: "Risotto Milanese", cuisine: "Italian", time: "40 min", rating: 4.8 },
  { emoji: "🍜", name: "Pad Thai", cuisine: "Thai", time: "30 min", rating: 4.7 },
  { emoji: "🌮", name: "Beef Tacos", cuisine: "Mexican", time: "20 min", rating: 4.6 },
  { emoji: "🍣", name: "Salmon Sushi", cuisine: "Japanese", time: "45 min", rating: 4.9 },
  { emoji: "🍛", name: "Chicken Tikka", cuisine: "Indian", time: "50 min", rating: 4.7 },
];

export default function CarouselPage() {
  return (
    <div>
      <Breadcrumb />
      <PageHeader
        title="Carousel"
        description="A cycling slideshow of content items. Supports keyboard navigation, touch gestures, and multiple visible items."
      />

      <div className="flex flex-col gap-8">
        <Playground
          title="Recipe Cards"
          description="A horizontally scrollable carousel of recipe cards."
          code={`<Carousel className="w-full">
  <CarouselContent>
    {recipes.map(recipe => (
      <CarouselItem key={recipe.name} className="md:basis-1/3">
        <RecipeCard recipe={recipe} />
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious></CarouselPrevious>
  <CarouselNext></CarouselNext>
</Carousel>`}
        >
          <div className="w-full px-4">
            <Carousel className="w-full" opts={{ align: "start" }}>
              <CarouselContent className="-ml-2">
                {recipes.map(r => (
                  <CarouselItem key={r.name} className="pl-2 basis-full sm:basis-1/2 md:basis-1/3">
                    <div className="rounded-xl border p-5 h-full" style={{ borderColor: "var(--ck-border)", background: "var(--ck-surface)" }}>
                      <div className="text-4xl mb-3">{r.emoji}</div>
                      <h3 className="text-sm font-semibold" style={{ color: "var(--ck-heading)" }}>{r.name}</h3>
                      <p className="text-xs mt-0.5" style={{ color: "var(--ck-text-muted)" }}>{r.cuisine} · {r.time}</p>
                      <p className="text-xs mt-2 font-medium" style={{ color: "var(--ck-primary)" }}>★ {r.rating}</p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious></CarouselPrevious>
              <CarouselNext></CarouselNext>
            </Carousel>
          </div>
        </Playground>

        <Playground
          title="Full-Width Slides"
          description="One item visible at a time — great for recipe step-by-step walkthroughs."
          code={`<Carousel className="w-full">
  <CarouselContent>
    {steps.map((step, i) => (
      <CarouselItem key={i}>
        <div className="step-card">{step}</div>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious></CarouselPrevious>
  <CarouselNext></CarouselNext>
</Carousel>`}
        >
          <div className="w-full px-12">
            <Carousel className="w-full">
              <CarouselContent>
                {[
                  { step: 1, title: "Render the Guanciale", desc: "Add diced guanciale to a cold pan. Slowly render over medium heat until golden and crispy, about 8–10 minutes." },
                  { step: 2, title: "Cook the Pasta", desc: "Bring a large pot of salted water to a rolling boil. Cook spaghetti until 1 minute before al dente. Reserve 1 cup of pasta water." },
                  { step: 3, title: "Make the Sauce", desc: "Whisk egg yolks and grated Pecorino Romano in a bowl. Season generously with freshly cracked black pepper." },
                  { step: 4, title: "Combine", desc: "Remove guanciale from heat. Add pasta, toss to coat. Off heat, pour in the egg mixture and toss rapidly, adding pasta water to achieve a glossy, creamy sauce." },
                ].map(s => (
                  <CarouselItem key={s.step}>
                    <div
                      className="rounded-xl border p-8 text-center"
                      style={{ borderColor: "var(--ck-border)", background: "var(--ck-surface)", minHeight: "160px" }}
                    >
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white mx-auto mb-4"
                        style={{ background: "var(--ck-primary)" }}
                      >
                        {s.step}
                      </div>
                      <h3 className="text-base font-semibold mb-2" style={{ color: "var(--ck-heading)" }}>{s.title}</h3>
                      <p className="text-sm" style={{ color: "var(--ck-text)" }}>{s.desc}</p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious></CarouselPrevious>
              <CarouselNext></CarouselNext>
            </Carousel>
          </div>
        </Playground>

        <PropsTable
          props={[
            { name: "opts", type: "EmblaOptionsType", description: "Embla Carousel options (align, loop, dragFree, etc.)" },
            { name: "CarouselItem", type: "ReactNode", description: "A single slide. Use basis-* classes for partial slides." },
            { name: "CarouselPrevious / CarouselNext", type: "—", description: "Navigation arrow buttons." },
            { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Scroll direction of the carousel." },
          ]}
        />
      </div>
    </div>
  );
}
