"use client";

import { useState } from "react";
import {
  useForm,
  FormProvider,
  useFormContext,
} from "react-hook-form";
import {
  Form, FormControl, FormDescription, FormField, FormItem,
  FormLabel, FormMessage,
  Input, Textarea, Button,
} from "@cookest/ui";
import { Playground, PropsTable, PageHeader } from "@/components/Playground";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CheckCircle2 } from "lucide-react";

export default function FormPage() {
  const [submitted, setSubmitted] = useState(false);
  const form = useForm({
    defaultValues: { name: "", cuisine: "", time: "", description: "" },
  });

  function onSubmit(values: any) {
    setSubmitted(true);
  }

  return (
    <div>
      <Breadcrumb />
      <PageHeader
        title="Form"
        description="Composable form building blocks with built-in validation state and accessible label/error associations. Integrates with react-hook-form."
      />

      <div className="flex flex-col gap-8">
        <Playground
          title="Recipe Submission Form"
          description="A fully validated form with labels, descriptions, and inline error messages."
          code={`const form = useForm({ defaultValues: { name: "", cuisine: "" } });

<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)}>
    <FormField
      control={form.control}
      name="name"
      rules={{ required: "Recipe name is required" }}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Recipe Name</FormLabel>
          <FormControl>
            <Input placeholder="e.g. Pasta Carbonara" {...field} />
          </FormControl>
          <FormDescription>
            Choose a clear, descriptive name.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
    <Button type="submit">Submit</Button>
  </form>
</Form>`}
        >
          {submitted ? (
            <div className="flex flex-col items-center gap-3 py-8">
              <CheckCircle2 size={40} style={{ color: "var(--ck-primary)" }} />
              <p className="text-sm font-semibold" style={{ color: "var(--ck-heading)" }}>Recipe submitted!</p>
              <button
                className="text-xs underline"
                style={{ color: "var(--ck-text-muted)" }}
                onClick={() => { setSubmitted(false); form.reset(); }}
              >
                Submit another
              </button>
            </div>
          ) : (
            <div className="w-full max-w-md">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField
                    control={form.control}
                    name="name"
                    rules={{ required: "Recipe name is required", minLength: { value: 3, message: "Name must be at least 3 characters" } }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Recipe Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Pasta Carbonara" {...field} />
                        </FormControl>
                        <FormDescription>Choose a clear, recognisable name.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cuisine"
                    rules={{ required: "Cuisine type is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cuisine</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Italian" {...field} />
                        </FormControl>
                        <FormDescription>The primary cuisine type of this recipe.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="time"
                    rules={{ required: "Cook time is required", pattern: { value: /^\d+$/, message: "Enter a number in minutes" } }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cook Time (minutes)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="e.g. 25" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Describe this recipe in a few sentences..." {...field} />
                        </FormControl>
                        <FormDescription>Optional — shown on the recipe card.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" variant="primary" className="w-full">Submit Recipe</Button>
                </form>
              </Form>
            </div>
          )}
        </Playground>

        <PropsTable
          props={[
            { name: "Form", type: "ReactNode", description: "Wraps the form and provides react-hook-form context." },
            { name: "FormField", type: "{ control, name, render }", description: "Connects a form field to the form state." },
            { name: "FormItem", type: "ReactNode", description: "Groups the label, control, description, and message." },
            { name: "FormLabel", type: "ReactNode", description: "The field label — automatically associates with the control." },
            { name: "FormControl", type: "ReactNode", description: "Wraps the actual input element." },
            { name: "FormDescription", type: "ReactNode", description: "Helper text displayed below the input." },
            { name: "FormMessage", type: "—", description: "Displays the validation error message automatically." },
          ]}
        />
      </div>
    </div>
  );
}
