"use client";

import {
  SidebarProvider, Sidebar, SidebarContent, SidebarFooter,
  SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarInset, SidebarTrigger,
} from "@cookest/ui";
import { Playground, PropsTable, PageHeader } from "@/components/Playground";
import { Breadcrumb } from "@/components/Breadcrumb";
import {
  Home, BookOpen, CalendarDays, ShoppingCart, Settings,
  ChefHat, Leaf, Star, BarChart3, Users,
} from "lucide-react";

const navItems = [
  { title: "Dashboard", icon: Home, url: "#" },
  { title: "My Recipes", icon: BookOpen, url: "#" },
  { title: "Meal Planner", icon: CalendarDays, url: "#" },
  { title: "Shopping List", icon: ShoppingCart, url: "#" },
  { title: "Nutrition", icon: BarChart3, url: "#" },
];

const discoverItems = [
  { title: "Trending", icon: Star, url: "#" },
  { title: "Seasonal", icon: Leaf, url: "#" },
  { title: "Chefs", icon: Users, url: "#" },
];

export default function SidebarPage() {
  return (
    <div>
      <Breadcrumb />
      <PageHeader
        title="Sidebar"
        description="A responsive collapsible sidebar with full keyboard navigation. Supports icon-only collapsed mode, mobile overlay, and cookie-persisted state."
      />

      <div className="flex flex-col gap-8">
        <Playground
          title="Full Sidebar"
          description="The complete Cookest app sidebar with groups, icons, and a trigger button. Click the toggle to collapse it."
          code={`<SidebarProvider>
  <Sidebar>
    <SidebarHeader>Logo</SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Menu</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map(item => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
  <SidebarInset>
    <SidebarTrigger />
    {/* Page content */}
  </SidebarInset>
</SidebarProvider>`}
        >
          <div className="w-full rounded-xl border overflow-hidden" style={{ borderColor: "var(--ck-border)", height: "420px" }}>
            <SidebarProvider defaultOpen={true}>
              <Sidebar collapsible="icon">
                <SidebarHeader>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <a href="#" className="no-underline">
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
                            style={{ background: "var(--ck-primary)" }}
                          >
                            Ck
                          </div>
                          <div className="flex flex-col text-left">
                            <span className="text-sm font-semibold" style={{ color: "var(--ck-heading)" }}>Cookest</span>
                            <span className="text-xs" style={{ color: "var(--ck-text-muted)" }}>Chef Marco</span>
                          </div>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarHeader>

                <SidebarContent>
                  <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        {navItems.map(item => (
                          <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild>
                              <a href="#" className="no-underline">
                                <item.icon size={16} />
                                <span>{item.title}</span>
                              </a>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>

                  <SidebarGroup>
                    <SidebarGroupLabel>Discover</SidebarGroupLabel>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        {discoverItems.map(item => (
                          <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild>
                              <a href="#" className="no-underline">
                                <item.icon size={16} />
                                <span>{item.title}</span>
                              </a>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>
                </SidebarContent>

                <SidebarFooter>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <a href="#" className="no-underline">
                          <Settings size={16} />
                          <span>Settings</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarFooter>
              </Sidebar>

              <SidebarInset>
                <header className="flex h-12 items-center gap-2 px-4 border-b" style={{ borderColor: "var(--ck-border)" }}>
                  <SidebarTrigger>☰</SidebarTrigger>
                  <span className="text-sm font-medium" style={{ color: "var(--ck-heading)" }}>Dashboard</span>
                </header>
                <div className="p-6 flex flex-col gap-4">
                  <h2 className="text-base font-semibold" style={{ color: "var(--ck-heading)" }}>Welcome back, Chef Marco! 👋</h2>
                  <p className="text-sm" style={{ color: "var(--ck-text-muted)" }}>
                    You have 3 recipes scheduled for this week. Click the ← toggle to collapse the sidebar.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Recipes", value: "148" },
                      { label: "Collections", value: "12" },
                      { label: "Meal Plans", value: "5" },
                      { label: "This Week", value: "3 meals" },
                    ].map(s => (
                      <div key={s.label} className="rounded-xl border p-4" style={{ borderColor: "var(--ck-border)", background: "var(--ck-surface)" }}>
                        <p className="text-xs" style={{ color: "var(--ck-text-muted)" }}>{s.label}</p>
                        <p className="text-lg font-bold mt-1" style={{ color: "var(--ck-heading)" }}>{s.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </SidebarInset>
            </SidebarProvider>
          </div>
        </Playground>

        <PropsTable
          props={[
            { name: "SidebarProvider", type: "ReactNode", description: "Root context provider. Controls open state and persistence." },
            { name: "defaultOpen", type: "boolean", default: "true", description: "Default open state (uncontrolled)." },
            { name: "collapsible", type: '"offcanvas" | "icon" | "none"', default: '"offcanvas"', description: "How the sidebar collapses — icon-only or off-screen." },
            { name: "side", type: '"left" | "right"', default: '"left"', description: "Which side the sidebar is anchored to." },
            { name: "SidebarTrigger", type: "—", description: "A toggle button to open/close the sidebar." },
            { name: "SidebarInset", type: "ReactNode", description: "The main content area beside the sidebar." },
          ]}
        />
      </div>
    </div>
  );
}
