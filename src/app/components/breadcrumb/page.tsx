"use client";

import { useState } from "react";
import { Breadcrumb as BreadcrumbComp, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage as BreadcrumbCurrentPage, BreadcrumbSeparator, BreadcrumbEllipsis } from "@cookest/ui";
import { Playground, PropsTable, PageHeader } from "@/components/Playground";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ChevronRight, Home } from "lucide-react";

export default function BreadcrumbPage() {
  return (
    <div>
      <Breadcrumb />
      <PageHeader
        title="Breadcrumb"
        description="Shows the current page location within a hierarchy. Fully accessible with ARIA landmark support."
      />

      <div className="flex flex-col gap-8">
        <Playground
          title="Basic"
          description="A simple three-level breadcrumb trail."
          code={`<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/recipes">Recipes</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbCurrentPage>Pasta Carbonara</BreadcrumbCurrentPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`}
        >
          <BreadcrumbComp>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#"><Home size={14} /></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Recipes</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Italian</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbCurrentPage>Pasta Carbonara</BreadcrumbCurrentPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </BreadcrumbComp>
        </Playground>

        <Playground
          title="With Ellipsis"
          description="Collapse middle items for long paths."
          code={`<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbEllipsis />
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbCurrentPage>Current Page</BreadcrumbCurrentPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`}
        >
          <BreadcrumbComp>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbEllipsis />
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Italian</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbCurrentPage>Pasta Carbonara</BreadcrumbCurrentPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </BreadcrumbComp>
        </Playground>

        <Playground
          title="Custom Separator"
          description="Replace the default separator with any icon."
          code={`<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator>
      <ChevronRight size={14} />
    </BreadcrumbSeparator>
    <BreadcrumbItem>
      <BreadcrumbCurrentPage>Recipes</BreadcrumbCurrentPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`}
        >
          <BreadcrumbComp>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator><ChevronRight size={14} /></BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Recipes</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator><ChevronRight size={14} /></BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbCurrentPage>Pasta Carbonara</BreadcrumbCurrentPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </BreadcrumbComp>
        </Playground>

        <PropsTable
          props={[
            { name: "BreadcrumbLink", type: "ReactNode", description: "A navigable ancestor link in the trail." },
            { name: "BreadcrumbPage", type: "ReactNode", description: "The current page — non-interactive, aria-current='page'." },
            { name: "BreadcrumbSeparator", type: "ReactNode", description: "Visual separator between items. Defaults to '/'." },
            { name: "BreadcrumbEllipsis", type: "—", description: "Collapses hidden ancestors with a '...' indicator." },
          ]}
        />
      </div>
    </div>
  );
}
