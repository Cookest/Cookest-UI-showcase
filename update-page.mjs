import fs from "fs";

const content = fs.readFileSync("src/app/page.tsx", "utf-8");

const newCards = `
          {[
            "Separator",
            "Sidebar",
            "Toast",
          ].map((name) => (
            <StaggerItem key={name}>
              <PreviewCard title={name} href={"/components/" + name.toLowerCase()}>
                <div className="flex items-center justify-center p-4">
                  <div className="text-xs text-[var(--ck-text-muted)] italic">Coming soon</div>
                </div>
              </PreviewCard>
            </StaggerItem>
          ))}
`;

const updatedContent = content.replace("</StaggerContainer>", newCards + "\n        </StaggerContainer>");

const finalContent = updatedContent.replace(/47 components/g, "50 components");

fs.writeFileSync("src/app/page.tsx", finalContent);
console.log("Updated page.tsx!");
