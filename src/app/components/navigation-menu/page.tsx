"use client";

import {
  NavigationMenu, NavigationMenuContent, NavigationMenuItem,
  NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger,
} from "@cookest/ui";
import { Playground, PropsTable, PageHeader } from "@/components/Playground";
import { Breadcrumb } from "@/components/Breadcrumb";

export default function NavigationMenuPage() {
  return (
    <div>
      <Breadcrumb />
      <PageHeader
        title="Navigation Menu"
        description="A rich navigation component with mega-menu dropdown panels. Ideal for site-wide top navigation."
      />

      <div className="flex flex-col gap-8">
        <Playground
          title="Site Navigation"
          description="A full site navigation bar with dropdown panels."
          code={`<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Recipes</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink href="/recipes/italian">Italian</NavigationMenuLink>
        <NavigationMenuLink href="/recipes/asian">Asian</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`}
        >
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Recipes</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                    {[
                      { title: "Italian", desc: "Pasta, risotto, pizza and more", emoji: "🇮🇹" },
                      { title: "Japanese", desc: "Ramen, sushi, and Japanese classics", emoji: "🇯🇵" },
                      { title: "Mexican", desc: "Tacos, enchiladas, and bold flavours", emoji: "🇲🇽" },
                      { title: "Indian", desc: "Curries, biryanis, and street food", emoji: "🇮🇳" },
                    ].map(item => (
                      <li key={item.title}>
                        <NavigationMenuLink
                          href="#"
                          className="flex flex-col gap-1 p-3 rounded-lg no-underline transition-colors"
                          style={{ background: "var(--ck-bg-card)" }}
                        >
                          <span className="text-base">{item.emoji} {item.title}</span>
                          <span className="text-xs" style={{ color: "var(--ck-text-muted)" }}>{item.desc}</span>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Learn</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 w-[350px]">
                    {[
                      { title: "Cooking Techniques", desc: "Knife skills, heat control, and more" },
                      { title: "Ingredient Guides", desc: "Deep dives into key ingredients" },
                      { title: "Video Courses", desc: "Watch and cook along with chefs" },
                    ].map(item => (
                      <li key={item.title}>
                        <NavigationMenuLink
                          href="#"
                          className="flex flex-col gap-1 p-3 rounded-lg no-underline"
                          style={{ background: "var(--ck-bg-card)" }}
                        >
                          <span className="text-sm font-medium" style={{ color: "var(--ck-heading)" }}>{item.title}</span>
                          <span className="text-xs" style={{ color: "var(--ck-text-muted)" }}>{item.desc}</span>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink href="#" className="px-4 py-2 text-sm">
                  Meal Planner
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </Playground>

        <PropsTable
          props={[
            { name: "NavigationMenuList", type: "ReactNode", description: "Container for the list of navigation menu items." },
            { name: "NavigationMenuItem", type: "ReactNode", description: "A single top-level navigation item." },
            { name: "NavigationMenuTrigger", type: "ReactNode", description: "Trigger for a dropdown panel. Shows a chevron indicator." },
            { name: "NavigationMenuContent", type: "ReactNode", description: "The dropdown panel shown when trigger is active." },
            { name: "NavigationMenuLink", type: "ReactNode", description: "A link within the menu or content panel." },
          ]}
        />
      </div>
    </div>
  );
}
