"use client";

import {
  ChartContainer, ChartTooltip, ChartTooltipContent,
  ChartLegend, ChartLegendContent,
} from "@cookest/ui";
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area,
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
} from "recharts";
import { Playground, PropsTable, PageHeader } from "@/components/Playground";
import { Breadcrumb } from "@/components/Breadcrumb";

const weeklyData = [
  { day: "Mon", calories: 1820, protein: 82 },
  { day: "Tue", calories: 2100, protein: 95 },
  { day: "Wed", calories: 1650, protein: 74 },
  { day: "Thu", calories: 2340, protein: 108 },
  { day: "Fri", calories: 1980, protein: 88 },
  { day: "Sat", calories: 2580, protein: 112 },
  { day: "Sun", calories: 2200, protein: 98 },
];

const cuisineData = [
  { name: "Italian", value: 32 },
  { name: "Japanese", value: 18 },
  { name: "Mexican", value: 14 },
  { name: "Indian", value: 12 },
  { name: "Other", value: 24 },
];

const COLORS = ["#7A9A65", "#B4CC9E", "#4E7A3A", "#3A5C2C", "#8FB07A"];

const chartConfig = {
  calories: { label: "Calories", color: "#7A9A65" },
  protein: { label: "Protein (g)", color: "#4E7A3A" },
};

export default function ChartPage() {
  return (
    <div>
      <Breadcrumb />
      <PageHeader
        title="Chart"
        description="Pre-styled chart containers using Recharts. The ChartContainer handles theming, tooltips, and legends using Cookest design tokens."
      />

      <div className="flex flex-col gap-8">
        <Playground
          title="Bar Chart — Weekly Calories"
          description="Track calorie intake across the week."
          code={`<ChartContainer config={chartConfig} className="h-64">
  <BarChart data={weeklyData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="day" />
    <YAxis />
    <ChartTooltip content={<ChartTooltipContent />} />
    <Bar dataKey="calories" fill="var(--ck-primary)" radius={[4,4,0,0]} />
  </BarChart>
</ChartContainer>`}
        >
          <ChartContainer config={chartConfig} className="h-64 w-full">
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--ck-border)" />
              <XAxis dataKey="day" tick={{ fill: "var(--ck-text-muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "var(--ck-text-muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="calories" fill="var(--ck-primary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </Playground>

        <Playground
          title="Area Chart — Protein Intake"
          description="Visualise macronutrient trends over the week."
          code={`<ChartContainer config={chartConfig} className="h-64">
  <AreaChart data={weeklyData}>
    <defs>
      <linearGradient id="protein-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="var(--ck-primary)" stopOpacity={0.3} />
        <stop offset="95%" stopColor="var(--ck-primary)" stopOpacity={0} />
      </linearGradient>
    </defs>
    <Area dataKey="protein" stroke="var(--ck-primary)" fill="url(#protein-grad)" />
  </AreaChart>
</ChartContainer>`}
        >
          <ChartContainer config={chartConfig} className="h-64 w-full">
            <AreaChart data={weeklyData}>
              <defs>
                <linearGradient id="protein-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7A9A65" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#7A9A65" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--ck-border)" />
              <XAxis dataKey="day" tick={{ fill: "var(--ck-text-muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "var(--ck-text-muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area type="monotone" dataKey="protein" stroke="#7A9A65" strokeWidth={2} fill="url(#protein-grad)" />
            </AreaChart>
          </ChartContainer>
        </Playground>

        <Playground
          title="Pie Chart — Cuisine Distribution"
          description="Show how recipe collection is distributed across cuisines."
          code={`<ChartContainer config={cuisineConfig} className="h-64">
  <PieChart>
    <Pie data={cuisineData} dataKey="value" nameKey="name" cx="50%" cy="50%">
      {cuisineData.map((_, i) => (
        <Cell key={i} fill={COLORS[i % COLORS.length]} />
      ))}
    </Pie>
    <ChartTooltip content={<ChartTooltipContent />} />
    <ChartLegend content={<ChartLegendContent />} />
  </PieChart>
</ChartContainer>`}
        >
          <ChartContainer
            config={Object.fromEntries(cuisineData.map((d, i) => [d.name, { label: d.name, color: COLORS[i] }]))}
            className="h-72 w-full"
          >
            <PieChart>
              <Pie data={cuisineData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {cuisineData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ChartContainer>
        </Playground>

        <PropsTable
          props={[
            { name: "config", type: "ChartConfig", description: "Map of data keys to labels and colors." },
            { name: "className", type: "string", description: "Apply sizing — use h-* for height." },
            { name: "ChartTooltipContent", type: "—", description: "A pre-styled tooltip matching the Cookest design system." },
            { name: "ChartLegendContent", type: "—", description: "A pre-styled legend matching the Cookest design system." },
          ]}
        />
      </div>
    </div>
  );
}
