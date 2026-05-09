"use client";

import {
  Table, TableBody, TableCaption, TableCell,
  TableHead, TableHeader, TableRow, TableFooter,
} from "@cookest/ui";
import { Playground, PropsTable, PageHeader } from "@/components/Playground";
import { Breadcrumb } from "@/components/Breadcrumb";

const recipes = [
  { name: "Pasta Carbonara", cuisine: "Italian", time: "25 min", servings: 4, rating: 4.9 },
  { name: "Risotto Milanese", cuisine: "Italian", time: "40 min", servings: 2, rating: 4.8 },
  { name: "Chicken Tikka Masala", cuisine: "Indian", time: "50 min", servings: 6, rating: 4.7 },
  { name: "Pad Thai", cuisine: "Thai", time: "30 min", servings: 2, rating: 4.6 },
  { name: "Beef Tacos", cuisine: "Mexican", time: "20 min", servings: 8, rating: 4.5 },
];

const ingredients = [
  { item: "Guanciale", qty: "200g", unit: "g", kcal: 700, protein: "18g" },
  { item: "Spaghetti", qty: "400g", unit: "g", kcal: 1408, protein: "50g" },
  { item: "Egg Yolks", qty: "4", unit: "each", kcal: 220, protein: "10g" },
  { item: "Pecorino Romano", qty: "80g", unit: "g", kcal: 310, protein: "22g" },
];

export default function TablePage() {
  return (
    <div>
      <Breadcrumb />
      <PageHeader
        title="Table"
        description="Structured data display in rows and columns. Semantic HTML table with Cookest styling."
      />

      <div className="flex flex-col gap-8">
        <Playground
          title="Recipe Library"
          description="Use Table to display a sortable recipe collection."
          code={`<Table>
  <TableCaption>Your recipe collection</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Recipe</TableHead>
      <TableHead>Cuisine</TableHead>
      <TableHead>Time</TableHead>
      <TableHead>Rating</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {recipes.map(r => (
      <TableRow key={r.name}>
        <TableCell>{r.name}</TableCell>
        <TableCell>{r.cuisine}</TableCell>
        <TableCell>{r.time}</TableCell>
        <TableCell>{r.rating}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>`}
        >
          <div className="w-full overflow-auto">
            <Table>
              <TableCaption>Your Cookest recipe collection</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Recipe</TableHead>
                  <TableHead>Cuisine</TableHead>
                  <TableHead>Cook Time</TableHead>
                  <TableHead>Servings</TableHead>
                  <TableHead className="text-right">Rating</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recipes.map(r => (
                  <TableRow key={r.name}>
                    <TableCell className="font-medium">{r.name}</TableCell>
                    <TableCell>{r.cuisine}</TableCell>
                    <TableCell>{r.time}</TableCell>
                    <TableCell>{r.servings}</TableCell>
                    <TableCell className="text-right">
                      <span style={{ color: "var(--ck-primary)" }}>★ {r.rating}</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Playground>

        <Playground
          title="Ingredient Nutrition"
          description="Use Table with a footer for totals — great for nutritional breakdowns."
          code={`<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Ingredient</TableHead>
      <TableHead>Qty</TableHead>
      <TableHead>Kcal</TableHead>
      <TableHead>Protein</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {ingredients.map(i => (
      <TableRow key={i.item}>
        <TableCell>{i.item}</TableCell>
        <TableCell>{i.qty}</TableCell>
        <TableCell>{i.kcal}</TableCell>
        <TableCell>{i.protein}</TableCell>
      </TableRow>
    ))}
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell colSpan={2}>Total</TableCell>
      <TableCell>2,638 kcal</TableCell>
      <TableCell>100g</TableCell>
    </TableRow>
  </TableFooter>
</Table>`}
        >
          <div className="w-full overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ingredient</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Calories</TableHead>
                  <TableHead className="text-right">Protein</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ingredients.map(i => (
                  <TableRow key={i.item}>
                    <TableCell className="font-medium">{i.item}</TableCell>
                    <TableCell>{i.qty}</TableCell>
                    <TableCell>{i.kcal} kcal</TableCell>
                    <TableCell className="text-right">{i.protein}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={2}>Total (4 servings)</TableCell>
                  <TableCell>2,638 kcal</TableCell>
                  <TableCell className="text-right">100g</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </Playground>

        <PropsTable
          props={[
            { name: "TableCaption", type: "string", description: "An accessible caption for the table (displayed below)." },
            { name: "TableHeader", type: "ReactNode", description: "The thead section containing TableHead cells." },
            { name: "TableBody", type: "ReactNode", description: "The tbody section containing TableRow elements." },
            { name: "TableFooter", type: "ReactNode", description: "Optional tfoot section, typically for totals." },
            { name: "TableRow", type: "ReactNode", description: "A single row. Receives hover styling automatically." },
            { name: "TableHead", type: "ReactNode", description: "A th cell with bold styling." },
            { name: "TableCell", type: "ReactNode", description: "A td cell." },
          ]}
        />
      </div>
    </div>
  );
}
