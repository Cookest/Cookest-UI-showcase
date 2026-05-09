"use client";

import { useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Badge,
  Avatar,
  Tabs,
  Divider,
} from "@cookest/ui";
import { Bell, Check } from "lucide-react";
import { ExampleCliHint } from "@/components/Playground";
import { Breadcrumb } from "@/components/Breadcrumb";

interface Notification {
  id: number;
  type: "like" | "comment" | "follow" | "order" | "mention";
  avatar: string;
  name: string;
  text: string;
  time: string;
  read: boolean;
}

const initialNotifications: Notification[] = [
  {
    id: 1,
    type: "like",
    avatar: "https://i.pravatar.cc/150?img=11",
    name: "Sofia Esposito",
    text: "liked your recipe — Truffle Risotto",
    time: "2 min ago",
    read: false,
  },
  {
    id: 2,
    type: "comment",
    avatar: "https://i.pravatar.cc/150?img=32",
    name: "Liam Chen",
    text: "replied to your comment: \"The technique is perfect, I tried it!\"",
    time: "14 min ago",
    read: false,
  },
  {
    id: 3,
    type: "follow",
    avatar: "https://i.pravatar.cc/150?img=47",
    name: "Amara Okafor",
    text: "started following you",
    time: "1 hr ago",
    read: false,
  },
  {
    id: 4,
    type: "order",
    avatar: "https://i.pravatar.cc/150?img=60",
    name: "Cookest Shop",
    text: "Your order #CK-8821 has shipped — Gourmet Spice Kit",
    time: "3 hr ago",
    read: false,
  },
  {
    id: 5,
    type: "like",
    avatar: "https://i.pravatar.cc/150?img=22",
    name: "Marco Ferretti",
    text: "liked your recipe — Lemon Tart with Meringue",
    time: "5 hr ago",
    read: true,
  },
  {
    id: 6,
    type: "comment",
    avatar: "https://i.pravatar.cc/150?img=55",
    name: "Yuki Tanaka",
    text: "commented on your post: \"This looks absolutely incredible 🤩\"",
    time: "Yesterday",
    read: true,
  },
  {
    id: 7,
    type: "follow",
    avatar: "https://i.pravatar.cc/150?img=38",
    name: "Priya Nair",
    text: "started following you",
    time: "Yesterday",
    read: true,
  },
  {
    id: 8,
    type: "order",
    avatar: "https://i.pravatar.cc/150?img=15",
    name: "Cookest Shop",
    text: "Your order #CK-8750 has been delivered — Pasta-Making Set",
    time: "2 days ago",
    read: true,
  },
];

function NotificationRow({ notif, onToggleRead }: { notif: Notification; onToggleRead: (id: number) => void }) {
  return (
    <div
      className="flex items-start gap-3 px-4 py-3 transition-colors rounded-lg cursor-pointer"
      style={{ background: notif.read ? "transparent" : "rgba(122,154,101,0.06)" }}
      onClick={() => onToggleRead(notif.id)}
    >
      <div className="relative shrink-0 mt-0.5">
        <Avatar src={notif.avatar} alt={notif.name} size="md" />
        {!notif.read && (
          <span
            className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2"
            style={{
              background: "var(--ck-primary)",
              borderColor: "var(--ck-bg)",
            }}
          />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm leading-snug" style={{ color: "var(--ck-text)" }}>
          <span style={{ fontWeight: 600, color: "var(--ck-heading)" }}>{notif.name}</span>{" "}
          {notif.text}
        </p>
        <p className="text-xs mt-0.5" style={{ color: "var(--ck-text-muted)" }}>
          {notif.time}
        </p>
      </div>

      <div className="shrink-0 flex items-center gap-2 mt-0.5">
        {!notif.read && (
          <Badge variant="error" size="sm" dot>
            New
          </Badge>
        )}
      </div>
    </div>
  );
}

export default function NotificationCenterPage() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const toggleRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  const allNotifs = notifications;
  const unreadNotifs = notifications.filter((n) => !n.read);
  const mentionNotifs: Notification[] = [];

  const renderList = (list: Notification[]) => {
    if (list.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12 gap-3">
          <Bell size={36} style={{ color: "var(--ck-text-muted)", opacity: 0.4 }} />
          <p style={{ color: "var(--ck-text-muted)", fontSize: "0.9rem" }}>
            No mentions yet
          </p>
          <p style={{ color: "var(--ck-text-muted)", fontSize: "0.8rem" }}>
            When someone mentions you, it will appear here.
          </p>
        </div>
      );
    }
    return (
      <div className="flex flex-col">
        {list.map((notif, idx) => (
          <div key={notif.id}>
            <NotificationRow notif={notif} onToggleRead={toggleRead} />
            {idx < list.length - 1 && <Divider />}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <Breadcrumb />
      <ExampleCliHint components={["Card", "Badge", "Avatar", "Tabs", "Divider", "Button"]} />
      <div className="max-w-4xl mx-auto py-8 px-4 md:px-0">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <h1
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    color: "var(--ck-heading)",
                    fontFamily: "var(--font-serif)",
                  }}
                >
                  Notifications
                </h1>
                {unreadCount > 0 && (
                  <Badge variant="error" size="md">
                    {unreadCount}
                  </Badge>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                iconLeft={<Check size={14} />}
                onClick={markAllRead}
                disabled={unreadCount === 0}
              >
                Mark all read
              </Button>
            </div>
          </CardHeader>
          <CardBody>
            <Tabs
              variant="underline"
              items={[
                {
                  id: "all",
                  label: "All",
                  badge: allNotifs.length,
                  content: renderList(allNotifs),
                },
                {
                  id: "unread",
                  label: "Unread",
                  badge: unreadNotifs.length > 0 ? unreadNotifs.length : undefined,
                  content: renderList(unreadNotifs),
                },
                {
                  id: "mentions",
                  label: "Mentions",
                  content: renderList(mentionNotifs),
                },
              ]}
            />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
