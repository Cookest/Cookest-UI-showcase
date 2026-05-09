"use client";

import { useState } from "react";
import { Calendar } from "@cookest/ui";
import { Playground, PropsTable, PageHeader } from "@/components/Playground";
import { Breadcrumb } from "@/components/Breadcrumb";

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [range, setRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: new Date(),
    to: undefined,
  });

  return (
    <div>
      <Breadcrumb />
      <PageHeader
        title="Calendar"
        description="A date picker calendar component. Supports single date selection and date ranges. Built on React Day Picker."
      />

      <div className="flex flex-col gap-8">
        <Playground
          title="Single Date"
          description="Select a single date — for scheduling a recipe or meal plan day."
          code={`const [date, setDate] = useState(new Date());

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  className="rounded-xl border"
/>`}
        >
          <div className="flex flex-col items-center gap-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-xl border"
              style={{ borderColor: "var(--ck-border)" }}
            />
            {date && (
              <p className="text-sm" style={{ color: "var(--ck-text-muted)" }}>
                Selected: <strong style={{ color: "var(--ck-primary)" }}>{date.toLocaleDateString("en-GB", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</strong>
              </p>
            )}
          </div>
        </Playground>

        <Playground
          title="Date Range"
          description="Select a date range — for planning a weekly meal prep schedule."
          code={`const [range, setRange] = useState({ from: new Date(), to: undefined });

<Calendar
  mode="range"
  selected={range}
  onSelect={setRange}
  className="rounded-xl border"
/>`}
        >
          <div className="flex flex-col items-center gap-4">
            <Calendar
              mode="range"
              selected={range}
              onSelect={setRange as any}
              className="rounded-xl border"
              style={{ borderColor: "var(--ck-border)" }}
              numberOfMonths={2}
            />
            {range.from && (
              <p className="text-sm" style={{ color: "var(--ck-text-muted)" }}>
                From: <strong style={{ color: "var(--ck-primary)" }}>{range.from.toLocaleDateString()}</strong>
                {range.to && <> → <strong style={{ color: "var(--ck-primary)" }}>{range.to.toLocaleDateString()}</strong></>}
              </p>
            )}
          </div>
        </Playground>

        <PropsTable
          props={[
            { name: "mode", type: '"single" | "range" | "multiple"', description: "Selection mode." },
            { name: "selected", type: "Date | DateRange | Date[]", description: "Controlled selected date(s)." },
            { name: "onSelect", type: "(date) => void", description: "Callback when a date is selected." },
            { name: "disabled", type: "Matcher", description: "Dates to disable (e.g. past dates, specific days)." },
            { name: "numberOfMonths", type: "number", default: "1", description: "Number of months to show at once." },
          ]}
        />
      </div>
    </div>
  );
}
