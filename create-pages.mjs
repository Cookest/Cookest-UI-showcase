import fs from "fs";
import path from "path";

const components = [
  "separator",
  "toast",
  "sidebar"
];

const template = (name) => `"use client";

import { ${name.replace(/-./g, x => x[1].toUpperCase()).replace(/^./, x => x.toUpperCase())} } from "@cookest/ui";
import { PageHeader } from "@/components/Playground";

export default function Page() {
  return (
    <div className="max-w-3xl py-8">
      <PageHeader
        title="${name.replace(/-./g, x => x[1].toUpperCase()).replace(/^./, x => x.toUpperCase())}"
        description="A new addition from Shadcn."
      />
      <div className="mt-8 space-y-8">
        <div className="p-8 border border-[var(--ck-border)] rounded-xl flex items-center justify-center bg-[var(--ck-surface)]">
          <div className="text-[var(--ck-text-muted)] text-sm italic">
            Add your ${name} demo here
          </div>
        </div>
      </div>
    </div>
  );
}
`;

for (const comp of components) {
  const dirPath = path.join(process.cwd(), "src/app/components", comp);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  fs.writeFileSync(path.join(dirPath, "page.tsx"), template(comp));
}

console.log("Created showcase pages!");
