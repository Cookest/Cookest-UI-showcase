"use client";

import { useState } from "react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "@cookest/ui";
import { Playground, PropsTable, PageHeader } from "@/components/Playground";
import { Breadcrumb } from "@/components/Breadcrumb";

export default function PaginationPage() {
  const [page, setPage] = useState(3);
  const totalPages = 8;

  return (
    <div>
      <Breadcrumb />
      <PageHeader
        title="Pagination"
        description="Navigation for splitting large datasets into pages. Fully accessible with keyboard support."
      />

      <div className="flex flex-col gap-8">
        <Playground
          title="Basic"
          description="A pagination bar for a recipe library with previous, page numbers, and next."
          code={`<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>2</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`}
        >
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              {[1, 2, 3].map(p => (
                <PaginationItem key={p}>
                  <PaginationLink href="#" isActive={p === 2}>{p}</PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">8</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </Playground>

        <Playground
          title="Interactive"
          description="Click pages to navigate through a recipe collection."
          code={`const [page, setPage] = useState(1);

<Pagination>
  <PaginationContent>
    <PaginationPrevious onClick={() => setPage(p => Math.max(1, p - 1))} />
    {pages.map(p => (
      <PaginationLink
        key={p}
        isActive={p === page}
        onClick={() => setPage(p)}
      >
        {p}
      </PaginationLink>
    ))}
    <PaginationNext onClick={() => setPage(p => Math.min(total, p + 1))} />
  </PaginationContent>
</Pagination>`}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="text-sm" style={{ color: "var(--ck-text-muted)" }}>
              Showing page <strong style={{ color: "var(--ck-heading)" }}>{page}</strong> of {totalPages} · 10 recipes per page
            </div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => { e.preventDefault(); setPage(p => Math.max(1, p - 1)); }}
                    aria-disabled={page === 1}
                    className={page === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => {
                  if (p === 1 || p === totalPages || (p >= page - 1 && p <= page + 1)) {
                    return (
                      <PaginationItem key={p}>
                        <PaginationLink
                          href="#"
                          isActive={p === page}
                          onClick={(e) => { e.preventDefault(); setPage(p); }}
                        >
                          {p}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  }
                  if (p === page - 2 || p === page + 2) {
                    return <PaginationItem key={p}><PaginationEllipsis /></PaginationItem>;
                  }
                  return null;
                })}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => { e.preventDefault(); setPage(p => Math.min(totalPages, p + 1)); }}
                    aria-disabled={page === totalPages}
                    className={page === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </Playground>

        <PropsTable
          props={[
            { name: "PaginationPrevious", type: "ReactNode", description: "Previous page link/button." },
            { name: "PaginationNext", type: "ReactNode", description: "Next page link/button." },
            { name: "PaginationLink", type: "ReactNode", description: "Individual page number." },
            { name: "isActive", type: "boolean", description: "Marks the current page with active styling.", default: "false" },
            { name: "PaginationEllipsis", type: "—", description: "Ellipsis for skipped page ranges." },
          ]}
        />
      </div>
    </div>
  );
}
