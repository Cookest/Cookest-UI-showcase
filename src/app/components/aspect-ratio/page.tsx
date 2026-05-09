"use client";

import { AspectRatio } from "@cookest/ui";
import { Playground, PropsTable, PageHeader } from "@/components/Playground";
import { Breadcrumb } from "@/components/Breadcrumb";

export default function AspectRatioPage() {
  return (
    <div>
      <Breadcrumb />
      <PageHeader
        title="Aspect Ratio"
        description="Displays content within a desired ratio. Essential for maintaining consistent image shapes across responsive layouts."
      />

      <div className="flex flex-col gap-8">
        <Playground
          title="16:9 Video"
          description="Standard widescreen ratio for recipe video thumbnails."
          code={`<AspectRatio ratio={16 / 9} className="bg-muted rounded-xl overflow-hidden">
  <img src="..." alt="Pasta Carbonara recipe video" className="object-cover w-full h-full" />
</AspectRatio>`}
        >
          <div className="w-full max-w-md">
            <AspectRatio ratio={16 / 9} className="rounded-xl overflow-hidden">
              <div
                className="w-full h-full flex flex-col items-center justify-center gap-2"
                style={{ background: "linear-gradient(135deg, var(--ck-primary), #4E7A3A)" }}
              >
                <span className="text-4xl">🍝</span>
                <span className="text-white font-semibold text-sm">Pasta Carbonara — Recipe Video</span>
                <span className="text-white/70 text-xs">16:9 · 8:24</span>
              </div>
            </AspectRatio>
          </div>
        </Playground>

        <Playground
          title="1:1 Square"
          description="Square ratio for recipe card thumbnails and profile images."
          code={`<AspectRatio ratio={1} className="rounded-xl overflow-hidden">
  <img src="..." alt="Dish photo" className="object-cover w-full h-full" />
</AspectRatio>`}
        >
          <div className="flex gap-4">
            {["🍕 Margherita", "🍜 Ramen", "🥗 Salad"].map(dish => (
              <div key={dish} className="w-32">
                <AspectRatio ratio={1} className="rounded-xl overflow-hidden">
                  <div
                    className="w-full h-full flex flex-col items-center justify-center"
                    style={{ background: "var(--ck-bg-card)", border: "1px solid var(--ck-border)" }}
                  >
                    <span className="text-2xl">{dish.split(" ")[0]}</span>
                    <span className="text-xs mt-1" style={{ color: "var(--ck-text-muted)" }}>{dish.split(" ").slice(1).join(" ")}</span>
                  </div>
                </AspectRatio>
              </div>
            ))}
          </div>
        </Playground>

        <Playground
          title="4:3 Classic"
          description="Traditional photo ratio — great for printed recipe cards."
          code={`<AspectRatio ratio={4 / 3} className="rounded-xl overflow-hidden">
  <img src="..." alt="Recipe" className="object-cover w-full h-full" />
</AspectRatio>`}
        >
          <div className="w-full max-w-xs">
            <AspectRatio ratio={4 / 3} className="rounded-xl overflow-hidden">
              <div
                className="w-full h-full flex flex-col items-center justify-center gap-2"
                style={{ background: "linear-gradient(135deg, #F5F5F0, #E1EBDA)" }}
              >
                <span className="text-5xl">🥩</span>
                <span className="text-sm font-medium" style={{ color: "var(--ck-heading)" }}>Beef Bourguignon</span>
                <span className="text-xs" style={{ color: "var(--ck-text-muted)" }}>4:3 aspect ratio</span>
              </div>
            </AspectRatio>
          </div>
        </Playground>

        <PropsTable
          props={[
            { name: "ratio", type: "number", default: "1", description: "The desired aspect ratio. e.g. 16/9, 4/3, 1 (square), 9/16 (portrait)." },
            { name: "className", type: "string", description: "Custom classes applied to the outer container." },
            { name: "children", type: "ReactNode", description: "Content to display within the ratio container." },
          ]}
        />
      </div>
    </div>
  );
}
