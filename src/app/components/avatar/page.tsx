"use client";

import { useState } from "react";
import { Avatar, AvatarGroup } from "@cookest/ui";
import { Playground, PropsTable, PageHeader } from "@/components/Playground";
import { RelatedComponents } from "@/components/RelatedComponents";
import { Breadcrumb } from "@/components/Breadcrumb";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

export default function AvatarPage() {
  const [activeSize, setActiveSize] = useState<(typeof sizes)[number]>("md");
  const [maxAvatars, setMaxAvatars] = useState(3);

  return (
    <div>
      <Breadcrumb />
      <PageHeader
        title="Avatar"
        description="Avatars represent users or entities with images or initials fallback."
      />

      <div className="flex flex-col gap-8">
        {/* Sizes Playground */}
        <Playground
          title="Sizes"
          description="Avatars come in xs, sm, md, lg, and xl sizes."
          code={`<Avatar alt="John Doe" size="${activeSize}" />`}
        >
          <div className="flex flex-col items-center gap-6">
            <div className="flex gap-2">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setActiveSize(s)}
                  className="px-3 py-1 text-xs rounded-lg cursor-pointer border"
                  style={{
                    borderColor: "var(--ck-border)",
                    background:
                      activeSize === s ? "var(--ck-primary)" : "var(--ck-surface)",
                    color: activeSize === s ? "#fff" : "var(--ck-text)",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-4">
              {sizes.map((s) => (
                <div key={s} className="flex flex-col items-center gap-2">
                  <Avatar
                    alt="John Doe"
                    size={s}
                    style={{
                      outline: s === activeSize ? "2px solid var(--ck-primary)" : "none",
                      outlineOffset: "2px",
                    }}
                  />
                  <span
                    className="text-xs"
                    style={{ color: "var(--ck-text-muted)" }}
                  >
                    {s}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Playground>

        {/* With Image Playground */}
        <Playground
          title="With Image"
          description="Avatars can display user profile images."
          code={`<Avatar src="https://i.pravatar.cc/150?u=1" alt="Jane Smith" size="lg" />
<Avatar src="https://i.pravatar.cc/150?u=2" alt="Bob Wilson" size="lg" />
<Avatar src="https://i.pravatar.cc/150?u=3" alt="Alice Chen" size="lg" />`}
        >
          <div className="flex items-center gap-4">
            <Avatar
              src="https://i.pravatar.cc/150?u=1"
              alt="Jane Smith"
              size="lg"
            />
            <Avatar
              src="https://i.pravatar.cc/150?u=2"
              alt="Bob Wilson"
              size="lg"
            />
            <Avatar
              src="https://i.pravatar.cc/150?u=3"
              alt="Alice Chen"
              size="lg"
            />
            <Avatar alt="No Image" size="lg" />
          </div>
        </Playground>

        {/* Avatar Group Playground */}
        <Playground
          title="Group"
          description="AvatarGroup stacks avatars and shows an overflow count."
          code={`<AvatarGroup max={${maxAvatars}}>
  <Avatar src="https://i.pravatar.cc/150?u=10" alt="User 1" />
  <Avatar src="https://i.pravatar.cc/150?u=11" alt="User 2" />
  <Avatar src="https://i.pravatar.cc/150?u=12" alt="User 3" />
  <Avatar src="https://i.pravatar.cc/150?u=13" alt="User 4" />
  <Avatar src="https://i.pravatar.cc/150?u=14" alt="User 5" />
</AvatarGroup>`}
        >
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-3">
              <span className="text-xs" style={{ color: "var(--ck-text-muted)" }}>
                max:
              </span>
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => setMaxAvatars(n)}
                  className="px-3 py-1 text-xs rounded-lg cursor-pointer border"
                  style={{
                    borderColor: "var(--ck-border)",
                    background:
                      maxAvatars === n ? "var(--ck-primary)" : "var(--ck-surface)",
                    color: maxAvatars === n ? "#fff" : "var(--ck-text)",
                  }}
                >
                  {n}
                </button>
              ))}
            </div>
            <AvatarGroup max={maxAvatars}>
              <Avatar src="https://i.pravatar.cc/150?u=10" alt="User 1" />
              <Avatar src="https://i.pravatar.cc/150?u=11" alt="User 2" />
              <Avatar src="https://i.pravatar.cc/150?u=12" alt="User 3" />
              <Avatar src="https://i.pravatar.cc/150?u=13" alt="User 4" />
              <Avatar src="https://i.pravatar.cc/150?u=14" alt="User 5" />
            </AvatarGroup>
          </div>
        </Playground>

        {/* Avatar Props */}
        <h2
          className="text-xl font-semibold mt-4"
          style={{ color: "var(--ck-heading)" }}
        >
          Avatar Props
        </h2>
        <PropsTable
          props={[
            {
              name: "src",
              type: "string",
              description: "URL of the avatar image.",
            },
            {
              name: "alt",
              type: "string",
              description:
                "Alt text for the image. Also used to generate initials fallback.",
            },
            {
              name: "size",
              type: '"xs" | "sm" | "md" | "lg" | "xl"',
              default: '"md"',
              description: "Size of the avatar.",
            },
            {
              name: "className",
              type: "string",
              description: "Additional CSS class names.",
            },
          ]}
        />

        {/* AvatarGroup Props */}
        <h2
          className="text-xl font-semibold mt-4"
          style={{ color: "var(--ck-heading)" }}
        >
          AvatarGroup Props
        </h2>
        <PropsTable
          props={[
            {
              name: "max",
              type: "number",
              description:
                "Maximum number of avatars to display before showing overflow count.",
            },
            {
              name: "children",
              type: "ReactNode",
              description: "Avatar components to render in the group.",
            },
          ]}
        />
        <RelatedComponents component="avatar" />
      </div>
    </div>
  );
}
