"use client";

import { Accordion } from "@cookest/ui";
import { PageHeader, Playground, PropsTable } from "@/components/Playground";
import { RelatedComponents } from "@/components/RelatedComponents";
import { Breadcrumb } from "@/components/Breadcrumb";

export default function AccordionPage() {
  return (
    <div>
      <Breadcrumb />
      <PageHeader
        title="Accordion"
        description="Accordions display a list of high-level options that can expand and collapse to reveal or hide content."
      />

      <div className="flex flex-col gap-8">
        {/* Default */}
        <Playground
          title="Default"
          description="The default accordion variant with Cookest FAQ content."
          code={`<Accordion
  items={[
    {
      id: "faq-1",
      title: "How do I create a recipe?",
      content: <p>Click "New Recipe" in the top bar...</p>,
    },
    {
      id: "faq-2",
      title: "Can I share my recipes?",
      content: <p>Yes — every recipe has a shareable link...</p>,
    },
    // ...
  ]}
/>`}
        >
          <div className="w-full max-w-xl">
            <Accordion
              items={[
                {
                  id: "faq-1",
                  title: "How do I create a recipe?",
                  content: (
                    <p className="text-sm m-0" style={{ color: "var(--ck-text)" }}>
                      Click <strong>New Recipe</strong> in the top navigation bar. Fill in the title, add ingredients
                      using the smart ingredient picker, write your instructions step-by-step, and hit{" "}
                      <strong>Publish</strong>. Your recipe will be live instantly.
                    </p>
                  ),
                },
                {
                  id: "faq-2",
                  title: "Can I share my recipes?",
                  content: (
                    <p className="text-sm m-0" style={{ color: "var(--ck-text)" }}>
                      Absolutely! Every published recipe gets a unique shareable URL. You can also export to PDF,
                      share directly to social media, or invite collaborators to co-author a recipe collection.
                    </p>
                  ),
                },
                {
                  id: "faq-3",
                  title: "What cuisines are supported?",
                  content: (
                    <p className="text-sm m-0" style={{ color: "var(--ck-text)" }}>
                      Cookest supports over 80 world cuisines — from Italian and Japanese to Ethiopian and Peruvian.
                      You can tag recipes with one or more cuisine types and filter the library accordingly.
                    </p>
                  ),
                },
                {
                  id: "faq-4",
                  title: "How do I customise my meal plan?",
                  content: (
                    <p className="text-sm m-0" style={{ color: "var(--ck-text)" }}>
                      Head to <strong>Meal Planner</strong>, choose your dietary goals (calorie target, macros,
                      allergies), and Cookest will auto-generate a weekly plan. You can drag-and-drop meals to
                      swap days or replace individual dishes from the library.
                    </p>
                  ),
                },
              ]}
            />
          </div>
        </Playground>

        {/* Bordered */}
        <Playground
          title="Bordered"
          description="The bordered variant wraps each item in a visible border, useful for cooking technique guides."
          code={`<Accordion
  variant="bordered"
  items={[
    {
      id: "tech-1",
      title: "What is blanching?",
      content: <p>Blanching is briefly boiling vegetables...</p>,
    },
    // ...
  ]}
/>`}
        >
          <div className="w-full max-w-xl">
            <Accordion
              variant="bordered"
              items={[
                {
                  id: "tech-1",
                  title: "What is blanching?",
                  content: (
                    <p className="text-sm m-0" style={{ color: "var(--ck-text)" }}>
                      Blanching is briefly boiling vegetables for 1–3 minutes then immediately plunging them into
                      ice water. It preserves colour, texture, and nutrients — and is the essential first step
                      before freezing most vegetables.
                    </p>
                  ),
                },
                {
                  id: "tech-2",
                  title: "How do I deglaze a pan?",
                  content: (
                    <p className="text-sm m-0" style={{ color: "var(--ck-text)" }}>
                      After searing meat, pour a cold liquid (wine, stock, or vinegar) into the hot pan. The liquid
                      lifts the caramelised fond from the bottom, creating an instant, flavour-packed sauce. Scrape
                      with a wooden spoon and reduce until slightly thickened.
                    </p>
                  ),
                },
                {
                  id: "tech-3",
                  title: "What does it mean to fold an ingredient?",
                  content: (
                    <p className="text-sm m-0" style={{ color: "var(--ck-text)" }}>
                      Folding is a gentle mixing technique that preserves air in a batter or mousse. Use a large
                      spatula, cut down through the centre, sweep along the bottom, and fold up over the top.
                      Repeat, rotating the bowl each time. Never stir — that deflates the mix.
                    </p>
                  ),
                },
                {
                  id: "tech-4",
                  title: "When should I use a bain-marie?",
                  content: (
                    <p className="text-sm m-0" style={{ color: "var(--ck-text)" }}>
                      A bain-marie (water bath) provides gentle, even heat — perfect for custards, crème brûlée,
                      cheesecakes, and melting chocolate without burning it. Place your dish inside a larger pan
                      filled with hot water and bake or heat as directed.
                    </p>
                  ),
                },
              ]}
            />
          </div>
        </Playground>

        {/* Separated */}
        <Playground
          title="Separated"
          description="The separated variant adds visible gaps between items, great for ingredient substitution guides."
          code={`<Accordion
  variant="separated"
  items={[
    {
      id: "sub-1",
      title: "Egg substitutes for baking",
      content: <p>Use a flax egg (1 tbsp ground flax + 3 tbsp water)...</p>,
    },
    // ...
  ]}
/>`}
        >
          <div className="w-full max-w-xl">
            <Accordion
              variant="separated"
              items={[
                {
                  id: "sub-1",
                  title: "Egg substitutes for baking",
                  content: (
                    <div className="flex flex-col gap-2">
                      {[
                        { sub: "Flax egg", ratio: "1 tbsp ground flax + 3 tbsp water (per egg)", note: "Best for dense baked goods like brownies." },
                        { sub: "Applesauce", ratio: "60 g (¼ cup) per egg", note: "Adds moisture and slight sweetness." },
                        { sub: "Aquafaba", ratio: "3 tbsp per egg", note: "Ideal for meringues and mousses." },
                      ].map((item) => (
                        <div key={item.sub} className="p-2 rounded-lg" style={{ background: "rgba(122,154,101,0.05)" }}>
                          <p className="text-xs font-semibold m-0" style={{ color: "var(--ck-heading)" }}>{item.sub} — {item.ratio}</p>
                          <p className="text-xs m-0 mt-0.5" style={{ color: "var(--ck-text-muted)" }}>{item.note}</p>
                        </div>
                      ))}
                    </div>
                  ),
                },
                {
                  id: "sub-2",
                  title: "Dairy milk alternatives",
                  content: (
                    <div className="flex flex-col gap-2">
                      {[
                        { sub: "Oat milk", note: "Creamy flavour — excellent in coffee and sauces." },
                        { sub: "Almond milk", note: "Light and slightly sweet; use unsweetened for savoury dishes." },
                        { sub: "Coconut milk (full-fat)", note: "Rich and thick — perfect for curries and desserts." },
                      ].map((item) => (
                        <div key={item.sub} className="p-2 rounded-lg" style={{ background: "rgba(122,154,101,0.05)" }}>
                          <p className="text-xs font-semibold m-0" style={{ color: "var(--ck-heading)" }}>{item.sub}</p>
                          <p className="text-xs m-0 mt-0.5" style={{ color: "var(--ck-text-muted)" }}>{item.note}</p>
                        </div>
                      ))}
                    </div>
                  ),
                },
                {
                  id: "sub-3",
                  title: "Butter substitutes",
                  content: (
                    <p className="text-sm m-0" style={{ color: "var(--ck-text)" }}>
                      Replace butter 1:1 with coconut oil (solid) for baking, or use avocado for spreads.
                      In sautéing, extra-virgin olive oil works well — use ¾ the amount called for in the recipe.
                    </p>
                  ),
                },
              ]}
            />
          </div>
        </Playground>

        {/* Multiple Open */}
        <Playground
          title="Multiple Open"
          description="Set multiple={true} to allow several panels to be expanded simultaneously."
          code={`<Accordion
  multiple
  defaultOpen={["multi-1", "multi-3"]}
  items={[
    { id: "multi-1", title: "Pantry essentials", content: <p>...</p> },
    { id: "multi-2", title: "Fridge staples", content: <p>...</p> },
    { id: "multi-3", title: "Freezer must-haves", content: <p>...</p> },
    { id: "multi-4", title: "Spice rack basics", content: <p>...</p> },
  ]}
/>`}
        >
          <div className="w-full max-w-xl">
            <Accordion
              multiple
              defaultOpen={["multi-1", "multi-3"]}
              items={[
                {
                  id: "multi-1",
                  title: "Pantry essentials",
                  content: (
                    <p className="text-sm m-0" style={{ color: "var(--ck-text)" }}>
                      Olive oil, canned tomatoes, pasta, rice, lentils, tinned chickpeas, honey, soy sauce,
                      apple cider vinegar, and a selection of nuts and seeds.
                    </p>
                  ),
                },
                {
                  id: "multi-2",
                  title: "Fridge staples",
                  content: (
                    <p className="text-sm m-0" style={{ color: "var(--ck-text)" }}>
                      Eggs, butter, aged parmesan, dijon mustard, miso paste, Greek yoghurt, capers,
                      and a good hot sauce.
                    </p>
                  ),
                },
                {
                  id: "multi-3",
                  title: "Freezer must-haves",
                  content: (
                    <p className="text-sm m-0" style={{ color: "var(--ck-text)" }}>
                      Frozen peas, edamame, spinach, homemade stock portions, and a batch of your favourite
                      sauce ready to defrost on busy weeknights.
                    </p>
                  ),
                },
                {
                  id: "multi-4",
                  title: "Spice rack basics",
                  content: (
                    <p className="text-sm m-0" style={{ color: "var(--ck-text)" }}>
                      Cumin, smoked paprika, turmeric, dried oregano, cinnamon, chilli flakes, and black pepper.
                      Buy whole spices when possible and grind fresh for maximum flavour.
                    </p>
                  ),
                },
              ]}
            />
          </div>
        </Playground>

        {/* With Subtitle */}
        <Playground
          title="With Subtitle"
          description="Items can include a subtitle for secondary context below the main title."
          code={`<Accordion
  variant="bordered"
  items={[
    {
      id: "course-1",
      title: "Italian Fundamentals",
      subtitle: "8 lessons · 4.5 hrs",
      content: <p>Master pasta, risotto, and sauces...</p>,
    },
    // ...
  ]}
/>`}
        >
          <div className="w-full max-w-xl">
            <Accordion
              variant="bordered"
              items={[
                {
                  id: "course-1",
                  title: "Italian Fundamentals",
                  subtitle: "8 lessons · 4.5 hrs",
                  content: (
                    <p className="text-sm m-0" style={{ color: "var(--ck-text)" }}>
                      Master the building blocks of Italian cooking — from hand-rolled pasta and silky risotto to
                      slow-simmered ragù and a classic tiramisu. Suitable for all skill levels.
                    </p>
                  ),
                },
                {
                  id: "course-2",
                  title: "Asian Flavour Profiles",
                  subtitle: "12 lessons · 6 hrs",
                  content: (
                    <p className="text-sm m-0" style={{ color: "var(--ck-text)" }}>
                      Explore the layered flavours of Japanese dashi, Thai aromatics, and Chinese five-spice.
                      Learn to balance salty, sour, sweet, and umami in every dish.
                    </p>
                  ),
                },
                {
                  id: "course-3",
                  title: "Plant-Based Mastery",
                  subtitle: "10 lessons · 5 hrs",
                  content: (
                    <p className="text-sm m-0" style={{ color: "var(--ck-text)" }}>
                      Go beyond salads. Discover how to build bold, satisfying plant-based meals using legumes,
                      whole grains, and fermented ingredients for maximum depth and nutrition.
                    </p>
                  ),
                },
              ]}
            />
          </div>
        </Playground>

        {/* Props Table */}
        <PropsTable
          props={[
            { name: "items", type: "AccordionItem[]", description: "Array of accordion items, each with id, title, and content." },
            { name: "defaultOpen", type: "string | string[]", description: "Id(s) of the panel(s) open on initial render (uncontrolled)." },
            { name: "multiple", type: "boolean", default: "false", description: "When true, multiple panels can be open simultaneously." },
            { name: "variant", type: '"default" | "bordered" | "separated"', default: '"default"', description: "Controls the visual style of the accordion container and items." },
            { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Controls the padding and font size of accordion headers." },
          ]}
        />

        <RelatedComponents component="accordion" />
      </div>
    </div>
  );
}
