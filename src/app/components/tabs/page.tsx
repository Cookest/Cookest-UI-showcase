"use client";

import { useState } from "react";
import { Tabs } from "@cookest/ui";
import { PageHeader, Playground, PropsTable } from "@/components/Playground";
import { RelatedComponents } from "@/components/RelatedComponents";
import { Breadcrumb } from "@/components/Breadcrumb";

const HomeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const UserIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
  </svg>
);

const BellIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

export default function TabsPage() {
  const [controlledTab, setControlledTab] = useState("profile");

  return (
    <div>
      <Breadcrumb />
      <PageHeader
        title="Tabs"
        description="Tabs organise content into multiple sections and allow users to navigate between them."
      />

      <div className="flex flex-col gap-8">
        {/* Underline */}
        <Playground
          title="Underline"
          description="The default underline variant, ideal for content-heavy pages like recipes."
          code={`<Tabs
  variant="underline"
  defaultTab="overview"
  items={[
    {
      id: "overview",
      label: "Overview",
      content: <p>A classic Italian Margherita pizza...</p>,
    },
    {
      id: "ingredients",
      label: "Ingredients",
      content: <p>200g pizza dough, 100ml tomato sauce...</p>,
    },
    {
      id: "instructions",
      label: "Instructions",
      content: <p>1. Preheat oven to 250 °C...</p>,
    },
    {
      id: "reviews",
      label: "Reviews",
      content: <p>★★★★★ "Perfect every time!"</p>,
    },
  ]}
/>`}
        >
          <div className="w-full max-w-xl">
            <Tabs
              variant="underline"
              defaultTab="overview"
              items={[
                {
                  id: "overview",
                  label: "Overview",
                  content: (
                    <p className="text-sm m-0" style={{ color: "var(--ck-text)" }}>
                      A classic Italian Margherita pizza with San Marzano tomato sauce, fresh mozzarella,
                      and fragrant basil. Simple ingredients, extraordinary flavour — ready in under 30 minutes.
                    </p>
                  ),
                },
                {
                  id: "ingredients",
                  label: "Ingredients",
                  content: (
                    <ul className="text-sm m-0 pl-4 flex flex-col gap-1" style={{ color: "var(--ck-text)" }}>
                      <li>200 g pizza dough (store-bought or homemade)</li>
                      <li>100 ml San Marzano tomato sauce</li>
                      <li>125 g fresh mozzarella, torn</li>
                      <li>Handful of fresh basil leaves</li>
                      <li>2 tbsp extra-virgin olive oil · salt &amp; pepper</li>
                    </ul>
                  ),
                },
                {
                  id: "instructions",
                  label: "Instructions",
                  content: (
                    <ol className="text-sm m-0 pl-4 flex flex-col gap-1" style={{ color: "var(--ck-text)" }}>
                      <li>Preheat oven to 250 °C (480 °F) with a pizza stone or baking sheet inside.</li>
                      <li>Stretch dough into a 30 cm round on a floured surface.</li>
                      <li>Spread sauce, scatter mozzarella, drizzle with olive oil.</li>
                      <li>Bake 10–12 minutes until crust is golden and cheese is bubbling.</li>
                      <li>Top with fresh basil and serve immediately.</li>
                    </ol>
                  ),
                },
                {
                  id: "reviews",
                  label: "Reviews",
                  content: (
                    <div className="flex flex-col gap-3">
                      {[
                        { author: "Sofia M.", rating: "★★★★★", text: "Perfect every time! The San Marzano tomatoes make all the difference." },
                        { author: "Luca R.", rating: "★★★★☆", text: "Fantastic recipe — I add a pinch of chilli for extra kick." },
                      ].map((r) => (
                        <div key={r.author} className="rounded-lg p-3 border" style={{ borderColor: "var(--ck-border)" }}>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-semibold" style={{ color: "var(--ck-heading)" }}>{r.author}</span>
                            <span className="text-xs" style={{ color: "var(--ck-primary)" }}>{r.rating}</span>
                          </div>
                          <p className="text-xs m-0" style={{ color: "var(--ck-text-muted)" }}>{r.text}</p>
                        </div>
                      ))}
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </Playground>

        {/* Pills */}
        <Playground
          title="Pills"
          description="The pills variant works well for filtering and category switching."
          code={`<Tabs
  variant="pills"
  defaultTab="daily"
  items={[
    { id: "daily", label: "Daily", content: <p>Today's meal plan...</p> },
    { id: "weekly", label: "Weekly", content: <p>This week's plan...</p> },
    { id: "monthly", label: "Monthly", content: <p>Monthly overview...</p> },
  ]}
/>`}
        >
          <div className="w-full max-w-xl">
            <Tabs
              variant="pills"
              defaultTab="daily"
              items={[
                {
                  id: "daily",
                  label: "Daily",
                  content: (
                    <div className="flex flex-col gap-2">
                      {[
                        { meal: "Breakfast", dish: "Greek yoghurt with granola & berries", cal: "350 kcal" },
                        { meal: "Lunch", dish: "Grilled chicken Caesar salad", cal: "520 kcal" },
                        { meal: "Dinner", dish: "Salmon with roasted vegetables", cal: "680 kcal" },
                      ].map((m) => (
                        <div key={m.meal} className="flex items-center justify-between p-3 rounded-lg border" style={{ borderColor: "var(--ck-border)" }}>
                          <div>
                            <p className="text-xs font-semibold m-0" style={{ color: "var(--ck-primary)" }}>{m.meal}</p>
                            <p className="text-sm m-0" style={{ color: "var(--ck-text)" }}>{m.dish}</p>
                          </div>
                          <span className="text-xs" style={{ color: "var(--ck-text-muted)" }}>{m.cal}</span>
                        </div>
                      ))}
                    </div>
                  ),
                },
                {
                  id: "weekly",
                  label: "Weekly",
                  content: (
                    <div className="flex flex-col gap-2">
                      {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day) => (
                        <div key={day} className="flex items-center gap-3 p-2 rounded-lg border" style={{ borderColor: "var(--ck-border)" }}>
                          <span className="text-xs font-bold w-8" style={{ color: "var(--ck-primary)" }}>{day}</span>
                          <span className="text-sm" style={{ color: "var(--ck-text)" }}>Balanced meal plan · 1,550 kcal avg</span>
                        </div>
                      ))}
                    </div>
                  ),
                },
                {
                  id: "monthly",
                  label: "Monthly",
                  content: (
                    <p className="text-sm m-0" style={{ color: "var(--ck-text)" }}>
                      Your monthly overview shows an average of <strong>1,580 kcal/day</strong> across 30 days,
                      with 62 % of meals hitting your nutritional targets. Great consistency!
                    </p>
                  ),
                },
              ]}
            />
          </div>
        </Playground>

        {/* Boxed */}
        <Playground
          title="Boxed"
          description="The boxed variant suits settings panels and structured navigation."
          code={`<Tabs
  variant="boxed"
  defaultTab="profile"
  items={[
    { id: "profile", label: "Profile", content: <ProfileSettings /> },
    { id: "security", label: "Security", content: <SecuritySettings /> },
    { id: "notifications", label: "Notifications", content: <NotifSettings /> },
  ]}
/>`}
        >
          <div className="w-full max-w-xl">
            <Tabs
              variant="boxed"
              defaultTab="profile"
              items={[
                {
                  id: "profile",
                  label: "Profile",
                  content: (
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-3 p-3 rounded-lg border" style={{ borderColor: "var(--ck-border)" }}>
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: "var(--ck-primary)" }}>CK</div>
                        <div>
                          <p className="text-sm font-semibold m-0" style={{ color: "var(--ck-heading)" }}>Chef Kitchen</p>
                          <p className="text-xs m-0" style={{ color: "var(--ck-text-muted)" }}>chef@cookest.io</p>
                        </div>
                      </div>
                      <p className="text-xs m-0" style={{ color: "var(--ck-text-muted)" }}>Update your display name, bio, and avatar photo.</p>
                    </div>
                  ),
                },
                {
                  id: "security",
                  label: "Security",
                  content: (
                    <div className="flex flex-col gap-2">
                      {["Change password", "Two-factor authentication", "Active sessions"].map((item) => (
                        <div key={item} className="flex items-center justify-between p-3 rounded-lg border" style={{ borderColor: "var(--ck-border)" }}>
                          <span className="text-sm" style={{ color: "var(--ck-text)" }}>{item}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(122,154,101,0.1)", color: "var(--ck-primary)" }}>Configure</span>
                        </div>
                      ))}
                    </div>
                  ),
                },
                {
                  id: "notifications",
                  label: "Notifications",
                  content: (
                    <div className="flex flex-col gap-2">
                      {[
                        { label: "New recipe comments", on: true },
                        { label: "Follower activity", on: false },
                        { label: "Weekly digest email", on: true },
                      ].map((n) => (
                        <div key={n.label} className="flex items-center justify-between p-3 rounded-lg border" style={{ borderColor: "var(--ck-border)" }}>
                          <span className="text-sm" style={{ color: "var(--ck-text)" }}>{n.label}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: n.on ? "rgba(122,154,101,0.1)" : "rgba(0,0,0,0.04)", color: n.on ? "var(--ck-primary)" : "var(--ck-text-muted)" }}>{n.on ? "On" : "Off"}</span>
                        </div>
                      ))}
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </Playground>

        {/* With Icons */}
        <Playground
          title="With Icons"
          description="Tabs support optional icons placed before the label."
          code={`<Tabs
  variant="underline"
  defaultTab="home"
  items={[
    { id: "home", label: "Home", icon: <HomeIcon />, content: <p>Home content</p> },
    { id: "profile", label: "Profile", icon: <UserIcon />, content: <p>Profile content</p> },
    { id: "settings", label: "Settings", icon: <SettingsIcon />, content: <p>Settings content</p> },
    { id: "notifications", label: "Alerts", icon: <BellIcon />, content: <p>Alerts content</p> },
  ]}
/>`}
        >
          <div className="w-full max-w-xl">
            <Tabs
              variant="underline"
              defaultTab="home"
              items={[
                {
                  id: "home",
                  label: "Home",
                  icon: <HomeIcon />,
                  content: <p className="text-sm m-0" style={{ color: "var(--ck-text)" }}>Your personalised recipe feed and recent activity.</p>,
                },
                {
                  id: "profile",
                  label: "Profile",
                  icon: <UserIcon />,
                  content: <p className="text-sm m-0" style={{ color: "var(--ck-text)" }}>Manage your chef profile, bio, and public recipes.</p>,
                },
                {
                  id: "settings",
                  label: "Settings",
                  icon: <SettingsIcon />,
                  content: <p className="text-sm m-0" style={{ color: "var(--ck-text)" }}>Configure dietary preferences, units, and app behaviour.</p>,
                },
                {
                  id: "alerts",
                  label: "Alerts",
                  icon: <BellIcon />,
                  content: <p className="text-sm m-0" style={{ color: "var(--ck-text)" }}>View notifications about comments, followers, and meal reminders.</p>,
                },
              ]}
            />
          </div>
        </Playground>

        {/* With Badges */}
        <Playground
          title="With Badges"
          description="Badges surface counts or status directly on the tab label."
          code={`<Tabs
  variant="pills"
  defaultTab="messages"
  items={[
    { id: "messages", label: "Messages", badge: 3, content: <p>3 unread messages</p> },
    { id: "notifications", label: "Notifications", badge: 12, content: <p>12 new notifications</p> },
    { id: "requests", label: "Requests", badge: 1, content: <p>1 pending request</p> },
  ]}
/>`}
        >
          <div className="w-full max-w-xl">
            <Tabs
              variant="pills"
              defaultTab="messages"
              items={[
                {
                  id: "messages",
                  label: "Messages",
                  badge: 3,
                  content: (
                    <div className="flex flex-col gap-2">
                      {["Sofia M.", "Luca R.", "Aria K."].map((name) => (
                        <div key={name} className="p-3 rounded-lg border" style={{ borderColor: "var(--ck-border)" }}>
                          <p className="text-xs font-semibold m-0" style={{ color: "var(--ck-heading)" }}>{name}</p>
                          <p className="text-xs m-0" style={{ color: "var(--ck-text-muted)" }}>Loved your new pasta recipe!</p>
                        </div>
                      ))}
                    </div>
                  ),
                },
                {
                  id: "notifications",
                  label: "Notifications",
                  badge: 12,
                  content: <p className="text-sm m-0" style={{ color: "var(--ck-text)" }}>You have 12 unread notifications — new followers, recipe likes, and weekly digest.</p>,
                },
                {
                  id: "requests",
                  label: "Requests",
                  badge: 1,
                  content: <p className="text-sm m-0" style={{ color: "var(--ck-text)" }}>1 collaboration request from Marco B. to co-author a dessert collection.</p>,
                },
              ]}
            />
          </div>
        </Playground>

        {/* Full Width */}
        <Playground
          title="Full Width"
          description="The fullWidth prop distributes tabs evenly across the container."
          code={`<Tabs
  variant="underline"
  fullWidth
  defaultTab="all"
  items={[
    { id: "all", label: "All Recipes", content: <p>Browse all recipes</p> },
    { id: "saved", label: "Saved", content: <p>Your saved recipes</p> },
    { id: "created", label: "My Recipes", content: <p>Recipes you created</p> },
  ]}
/>`}
        >
          <div className="w-full max-w-xl">
            <Tabs
              variant="underline"
              fullWidth
              defaultTab="all"
              items={[
                {
                  id: "all",
                  label: "All Recipes",
                  content: <p className="text-sm m-0" style={{ color: "var(--ck-text)" }}>Browse the full Cookest library — thousands of chef-curated recipes at your fingertips.</p>,
                },
                {
                  id: "saved",
                  label: "Saved",
                  content: <p className="text-sm m-0" style={{ color: "var(--ck-text)" }}>Your saved recipes appear here for quick access. You have 24 saved recipes.</p>,
                },
                {
                  id: "created",
                  label: "My Recipes",
                  content: <p className="text-sm m-0" style={{ color: "var(--ck-text)" }}>Recipes you&apos;ve authored and published. Share them with the community!</p>,
                },
              ]}
            />
          </div>
        </Playground>

        {/* Controlled */}
        <Playground
          title="Controlled"
          description="Use value and onChange for full external control of the active tab."
          code={`const [tab, setTab] = useState("profile");

<Tabs
  variant="boxed"
  value={tab}
  onChange={setTab}
  items={[...]}
/>`}
        >
          <div className="w-full max-w-xl flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs" style={{ color: "var(--ck-text-muted)" }}>Active tab:</span>
              <code className="text-xs px-2 py-0.5 rounded" style={{ background: "rgba(122,154,101,0.1)", color: "var(--ck-primary)" }}>{controlledTab}</code>
            </div>
            <Tabs
              variant="boxed"
              value={controlledTab}
              onChange={setControlledTab}
              items={[
                { id: "profile", label: "Profile", content: <p className="text-sm m-0" style={{ color: "var(--ck-text)" }}>Profile settings content.</p> },
                { id: "billing", label: "Billing", content: <p className="text-sm m-0" style={{ color: "var(--ck-text)" }}>Billing and subscription details.</p> },
                { id: "api", label: "API", content: <p className="text-sm m-0" style={{ color: "var(--ck-text)" }}>Manage your API keys and webhooks.</p> },
              ]}
            />
          </div>
        </Playground>

        {/* Props Table */}
        <PropsTable
          props={[
            { name: "items", type: "TabItem[]", description: "Array of tab definitions — each with an id, label, and content." },
            { name: "defaultTab", type: "string", description: "The id of the tab that is selected on initial render (uncontrolled)." },
            { name: "value", type: "string", description: "The currently active tab id (controlled mode)." },
            { name: "onChange", type: "(id: string) => void", description: "Callback fired when the user selects a different tab." },
            { name: "variant", type: '"underline" | "pills" | "boxed"', default: '"underline"', description: "Visual style of the tab bar." },
            { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Controls the font size and padding of the tab labels." },
            { name: "fullWidth", type: "boolean", default: "false", description: "When true, tabs stretch equally to fill the available width." },
          ]}
        />

        <RelatedComponents component="tabs" />
      </div>
    </div>
  );
}
