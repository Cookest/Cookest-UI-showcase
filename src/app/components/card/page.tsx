"use client";

import { Card, CardHeader, CardBody, CardFooter, Button, Badge } from "@cookest/ui";
import { Playground, PropsTable, PageHeader } from "@/components/Playground";
import { RelatedComponents } from "@/components/RelatedComponents";
import { Breadcrumb } from "@/components/Breadcrumb";

const cardVariants = ["default", "interactive", "outlined"] as const;

export default function CardPage() {
  return (
    <div>
      <Breadcrumb />
      <PageHeader
        title="Card"
        description="Cards are content containers with optional header, body, and footer slots."
      />

      <div className="flex flex-col gap-8">
        {/* Basic */}
        <Playground
          title="Basic"
          description="A simple card with header, body, and footer."
          code={`<Card>
  <CardHeader>
    <h3>Card Title</h3>
  </CardHeader>
  <CardBody>
    <p>This is the card body content. It can contain any elements.</p>
  </CardBody>
  <CardFooter>
    <Button size="sm">Action</Button>
  </CardFooter>
</Card>`}
        >
          <div className="w-full max-w-md">
            <Card>
              <CardHeader>
                <h3
                  className="text-sm font-semibold m-0"
                  style={{ color: "var(--ck-heading)" }}
                >
                  Card Title
                </h3>
              </CardHeader>
              <CardBody>
                <p
                  className="text-sm m-0"
                  style={{ color: "var(--ck-text)" }}
                >
                  This is the card body content. It can contain any elements.
                </p>
              </CardBody>
              <CardFooter>
                <Button size="sm">Action</Button>
              </CardFooter>
            </Card>
          </div>
        </Playground>

        {/* Variants */}
        <Playground
          title="Variants"
          description="Cards support default, interactive (hover effect), and outlined styles."
          code={`<Card variant="default">Default</Card>
<Card variant="interactive">Interactive</Card>
<Card variant="outlined">Outlined</Card>`}
        >
          <div className="flex flex-wrap gap-4 w-full justify-center">
            {cardVariants.map((v) => (
              <div key={v} className="flex-1 min-w-[200px] max-w-[260px]">
                <Card variant={v}>
                  <CardHeader>
                    <h3
                      className="text-sm font-semibold m-0"
                      style={{ color: "var(--ck-heading)" }}
                    >
                      {v.charAt(0).toUpperCase() + v.slice(1)}
                    </h3>
                  </CardHeader>
                  <CardBody>
                    <p
                      className="text-xs m-0"
                      style={{ color: "var(--ck-text-muted)" }}
                    >
                      This is the{" "}
                      <strong style={{ color: "var(--ck-text)" }}>{v}</strong>{" "}
                      card variant.
                    </p>
                  </CardBody>
                </Card>
              </div>
            ))}
          </div>
        </Playground>

        {/* Recipe Example */}
        <Playground
          title="Recipe Example"
          description="A realistic recipe card showing how components compose together."
          code={`<Card variant="interactive">
  <CardHeader>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <h3>Pasta Carbonara</h3>
      <Badge variant="success" size="sm">Easy</Badge>
    </div>
  </CardHeader>
  <CardBody>
    <p>Classic Italian pasta with eggs, cheese, pancetta, and pepper.</p>
    <div style={{ display: "flex", gap: "8px" }}>
      <Badge size="sm">30 min</Badge>
      <Badge size="sm">4 servings</Badge>
    </div>
  </CardBody>
  <CardFooter>
    <Button size="sm">View Recipe</Button>
    <Button size="sm" variant="ghost">Save</Button>
  </CardFooter>
</Card>`}
        >
          <div className="w-full max-w-md">
            <Card variant="interactive">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <h3
                    className="text-base font-semibold m-0"
                    style={{
                      color: "var(--ck-heading)",
                      fontFamily: "var(--font-serif)",
                    }}
                  >
                    Pasta Carbonara
                  </h3>
                  <Badge variant="success" size="sm">
                    Easy
                  </Badge>
                </div>
              </CardHeader>
              <CardBody>
                <p
                  className="text-sm m-0 mb-3"
                  style={{ color: "var(--ck-text)" }}
                >
                  Classic Italian pasta with eggs, cheese, pancetta, and pepper.
                  A comforting dish ready in under 30 minutes.
                </p>
                <div className="flex gap-2">
                  <Badge size="sm">30 min</Badge>
                  <Badge size="sm">4 servings</Badge>
                </div>
              </CardBody>
              <CardFooter>
                <div className="flex gap-2">
                  <Button size="sm">View Recipe</Button>
                  <Button size="sm" variant="ghost">
                    Save
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </Playground>

        {/* Props Table */}
        <PropsTable
          props={[
            {
              name: "variant",
              type: '"default" | "interactive" | "outlined"',
              default: '"default"',
              description:
                "Visual style. Interactive adds hover effects, outlined uses a border-only style.",
            },
            {
              name: "padding",
              type: '"none" | "sm" | "md" | "lg"',
              default: '"md"',
              description: "Controls internal padding of the card.",
            },
            {
              name: "className",
              type: "string",
              description: "Additional CSS class names.",
            },
          ]}
        />
        <RelatedComponents component="card" />

        {/* ── Best Practices ── */}
        <section className="mt-12">
          <h2 className="text-xl font-bold mb-6" style={{ color: "var(--ck-heading)", fontFamily: "var(--font-serif)" }}>
            Best Practices
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Do's */}
            <div className="rounded-2xl border p-6" style={{ borderColor: "rgba(122,154,101,0.3)", background: "rgba(122,154,101,0.05)" }}>
              <h3 className="text-sm font-semibold mb-4 flex items-center gap-2" style={{ color: "var(--ck-primary)" }}>
                ✅ Do
              </h3>
              <ul className="space-y-2 list-none p-0 m-0">
                <li className="text-sm flex items-start gap-2" style={{ color: "var(--ck-text)" }}>
                  <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--ck-primary)" }} />
                  Use CardHeader/Body/Footer for consistent structure
                </li>
                <li className="text-sm flex items-start gap-2" style={{ color: "var(--ck-text)" }}>
                  <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--ck-primary)" }} />
                  Keep card content scannable
                </li>
                <li className="text-sm flex items-start gap-2" style={{ color: "var(--ck-text)" }}>
                  <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--ck-primary)" }} />
                  Use shadow variants for interactive cards
                </li>
                <li className="text-sm flex items-start gap-2" style={{ color: "var(--ck-text)" }}>
                  <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--ck-primary)" }} />
                  Limit cards to one primary action
                </li>
              </ul>
            </div>
            {/* Don'ts */}
            <div className="rounded-2xl border p-6" style={{ borderColor: "rgba(229,62,62,0.3)", background: "rgba(229,62,62,0.05)" }}>
              <h3 className="text-sm font-semibold mb-4 flex items-center gap-2" style={{ color: "var(--ck-error, #e53e3e)" }}>
                ❌ Don&apos;t
              </h3>
              <ul className="space-y-2 list-none p-0 m-0">
                <li className="text-sm flex items-start gap-2" style={{ color: "var(--ck-text)" }}>
                  <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--ck-primary)" }} />
                  Nest cards more than one level deep
                </li>
                <li className="text-sm flex items-start gap-2" style={{ color: "var(--ck-text)" }}>
                  <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--ck-primary)" }} />
                  Overload cards with too many actions
                </li>
                <li className="text-sm flex items-start gap-2" style={{ color: "var(--ck-text)" }}>
                  <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--ck-primary)" }} />
                  Use cards for simple text content
                </li>
                <li className="text-sm flex items-start gap-2" style={{ color: "var(--ck-text)" }}>
                  <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--ck-primary)" }} />
                  Mix card sizes in the same grid
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── Accessibility ── */}
        <section className="mt-12">
          <h2 className="text-xl font-bold mb-6" style={{ color: "var(--ck-heading)", fontFamily: "var(--font-serif)" }}>
            Accessibility
          </h2>
          <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "var(--ck-border)", background: "var(--ck-surface)" }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "var(--ck-bg)" }}>
                  <th className="text-left px-5 py-3 font-semibold border-b" style={{ borderColor: "var(--ck-border)", color: "var(--ck-heading)" }}>Feature</th>
                  <th className="text-left px-5 py-3 font-semibold border-b" style={{ borderColor: "var(--ck-border)", color: "var(--ck-heading)" }}>Support</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid var(--ck-border)" }}>
                  <td className="px-5 py-3" style={{ color: "var(--ck-text)" }}>Semantic HTML</td>
                  <td className="px-5 py-3" style={{ color: "var(--ck-text-muted)" }}>Use article element when appropriate</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--ck-border)" }}>
                  <td className="px-5 py-3" style={{ color: "var(--ck-text)" }}>Focus management</td>
                  <td className="px-5 py-3" style={{ color: "var(--ck-text-muted)" }}>Keyboard-navigable for interactive cards</td>
                </tr>
                <tr>
                  <td className="px-5 py-3" style={{ color: "var(--ck-text)" }}>aria-label</td>
                  <td className="px-5 py-3" style={{ color: "var(--ck-text-muted)" }}>Descriptive labels for card actions</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
