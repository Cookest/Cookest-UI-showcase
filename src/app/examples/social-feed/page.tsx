"use client";

import { useState } from "react";
import {
  Button,
  Input,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Badge,
  Avatar,
  AvatarGroup,
  Toggle,
  Alert,
  Divider,
  Skeleton,
  Tooltip,
  Select,
} from "@cookest/ui";
import { ExampleCliHint } from "@/components/Playground";
import { Breadcrumb } from "@/components/Breadcrumb";
import { AnimateIn, StaggerContainer, StaggerItem } from "@/components/AnimateIn";
import {
  Heart,
  MessageSquare,
  Share2,
  Image as ImageIcon,
  Send,
  MoreHorizontal,
  Bookmark,
  MapPin,
  Clock,
  TrendingUp,
  UserPlus,
  Smile,
} from "lucide-react";

interface Post {
  id: number;
  author: string;
  avatar: string;
  handle: string;
  time: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  tags: string[];
  replies: {
    author: string;
    avatar: string;
    text: string;
    time: string;
  }[];
}

const posts: Post[] = [
  {
    id: 1,
    author: "Chef Maria",
    avatar: "https://i.pravatar.cc/150?img=5",
    handle: "@chefmaria",
    time: "25 min ago",
    content:
      "Just perfected my grandmother's risotto recipe after months of testing! The secret? Toasting the rice in butter for exactly 3 minutes before adding the first ladle of broth. Patience is everything. 🍚✨",
    image: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    likes: 234,
    comments: 42,
    shares: 18,
    tags: ["ItalianCooking", "Risotto"],
    replies: [
      {
        author: "Tom Baker",
        avatar: "https://i.pravatar.cc/150?img=12",
        text: "I've been looking for the perfect risotto technique! Trying this tonight 🙌",
        time: "15 min ago",
      },
      {
        author: "Lily Chen",
        avatar: "https://i.pravatar.cc/150?img=9",
        text: "Do you use carnaroli or arborio rice? I find carnaroli holds its shape much better.",
        time: "8 min ago",
      },
    ],
  },
  {
    id: 2,
    author: "Plant Kitchen",
    avatar: "https://i.pravatar.cc/150?img=32",
    handle: "@plantkitchen",
    time: "2 hours ago",
    content:
      "Sunday meal prep done! 🌱 Made a big batch of Thai coconut curry, quinoa tabbouleh, and roasted chickpea bowls. That's lunch sorted for the entire week. Who else is on the meal prep train?",
    image: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    likes: 189,
    comments: 31,
    shares: 45,
    tags: ["MealPrep", "PlantBased", "HealthyEating"],
    replies: [
      {
        author: "Nadia Rose",
        avatar: "https://i.pravatar.cc/150?img=25",
        text: "Would love the coconut curry recipe! Is it on your blog?",
        time: "1 hour ago",
      },
    ],
  },
  {
    id: 3,
    author: "Baker Joe",
    avatar: "https://i.pravatar.cc/150?img=15",
    handle: "@bakerjoe",
    time: "4 hours ago",
    content:
      "First attempt at sourdough focaccia and I'm honestly impressed with myself 😄 Crispy on the outside, pillowy soft inside. Topped with cherry tomatoes, olives, rosemary, and flaky sea salt.",
    image: "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)",
    likes: 412,
    comments: 67,
    shares: 89,
    tags: ["Sourdough", "HomeCooking", "BreadBaking"],
    replies: [
      {
        author: "Sarah Mills",
        avatar: "https://i.pravatar.cc/150?img=44",
        text: "That dimpling technique is perfect! How long did you proof it?",
        time: "3 hours ago",
      },
      {
        author: "Chef Maria",
        avatar: "https://i.pravatar.cc/150?img=5",
        text: "Beautiful! Try adding a drizzle of garlic oil before baking next time — game changer 🧄",
        time: "2 hours ago",
      },
    ],
  },
  {
    id: 4,
    author: "Spice Route",
    avatar: "https://i.pravatar.cc/150?img=60",
    handle: "@spiceroute",
    time: "6 hours ago",
    content:
      "Tip of the day: Toast your whole spices in a dry pan before grinding them. The aroma difference is incredible — you'll never go back to pre-ground. Today's blend: cumin, coriander, cardamom, and a touch of cinnamon. 🌶️",
    likes: 156,
    comments: 23,
    shares: 34,
    tags: ["SpiceTips", "HomeCooking"],
    replies: [],
  },
];

const suggestedChefs = [
  { name: "Yuki Tanaka", avatar: "https://i.pravatar.cc/150?img=3", specialty: "Japanese Cuisine" },
  { name: "Marco Bianchi", avatar: "https://i.pravatar.cc/150?img=8", specialty: "Pasta Master" },
  { name: "Priya Sharma", avatar: "https://i.pravatar.cc/150?img=23", specialty: "Indian Flavors" },
  { name: "Alex Rivera", avatar: "https://i.pravatar.cc/150?img=18", specialty: "BBQ & Grilling" },
];

const trendingTopics = [
  { tag: "#MealPrep", posts: "2.4k posts" },
  { tag: "#HomeCooking", posts: "5.1k posts" },
  { tag: "#PlantBased", posts: "1.8k posts" },
  { tag: "#Sourdough", posts: "982 posts" },
  { tag: "#FarmToTable", posts: "743 posts" },
  { tag: "#BudgetMeals", posts: "1.2k posts" },
];

export default function SocialFeedPage() {
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [expandedComments, setExpandedComments] = useState<Set<number>>(new Set());
  const [savedPosts, setSavedPosts] = useState<Set<number>>(new Set());
  const [postText, setPostText] = useState("");
  const [followed, setFollowed] = useState<Set<string>>(new Set());
  const [showAlert, setShowAlert] = useState(false);

  const toggleLike = (postId: number) => {
    setLikedPosts((prev) => {
      const next = new Set(prev);
      if (next.has(postId)) next.delete(postId);
      else next.add(postId);
      return next;
    });
  };

  const toggleComments = (postId: number) => {
    setExpandedComments((prev) => {
      const next = new Set(prev);
      if (next.has(postId)) next.delete(postId);
      else next.add(postId);
      return next;
    });
  };

  const toggleSave = (postId: number) => {
    setSavedPosts((prev) => {
      const next = new Set(prev);
      if (next.has(postId)) next.delete(postId);
      else next.add(postId);
      return next;
    });
  };

  const toggleFollow = (name: string) => {
    setFollowed((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const handlePost = () => {
    if (!postText.trim()) return;
    setPostText("");
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <div className="max-w-5xl">
      <Breadcrumb />
      <ExampleCliHint components={["Card", "Avatar", "Badge", "Input", "Tooltip", "Alert", "Button", "Divider", "Select", "Skeleton", "Toggle"]} />

      {showAlert && (
        <div className="mb-6">
          <Alert variant="success" dismissible onDismiss={() => setShowAlert(false)}>
            Your post has been published! 🎉
          </Alert>
        </div>
      )}

      <AnimateIn>
        <div className="mb-8">
          <h1
            className="text-3xl font-bold mb-2 m-0"
            style={{ color: "var(--ck-heading)", fontFamily: "var(--font-serif)" }}
          >
            Community Feed
          </h1>
          <p className="text-sm m-0" style={{ color: "var(--ck-text-muted)" }}>
            Discover recipes, share your creations, and connect with fellow food lovers.
          </p>
        </div>
      </AnimateIn>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-5">
          {/* Create Post */}
          <AnimateIn>
            <Card variant="default" padding="md">
              <CardBody>
                <div className="flex gap-3">
                  <Avatar
                    src="https://i.pravatar.cc/150?img=68"
                    alt="You"
                    size="md"
                  />
                  <div className="flex-1">
                    <Input
                      placeholder="What are you cooking today?"
                      value={postText}
                      onChange={(e) => setPostText(e.target.value)}
                    />
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex gap-2">
                        <Tooltip content="Add photo">
                          <Button variant="ghost" size="sm">
                            <ImageIcon size={16} />
                          </Button>
                        </Tooltip>
                        <Tooltip content="Add emoji">
                          <Button variant="ghost" size="sm">
                            <Smile size={16} />
                          </Button>
                        </Tooltip>
                        <Tooltip content="Add location">
                          <Button variant="ghost" size="sm">
                            <MapPin size={16} />
                          </Button>
                        </Tooltip>
                      </div>
                      <Button
                        variant="primary"
                        size="sm"
                        iconLeft={<Send size={14} />}
                        onClick={handlePost}
                      >
                        Post
                      </Button>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </AnimateIn>

          {/* Posts */}
          <StaggerContainer className="space-y-5">
            {posts.map((post) => (
              <StaggerItem key={post.id}>
                <Card variant="default" padding="none">
                  {/* Post Header */}
                  <div className="px-5 pt-5 pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar src={post.avatar} alt={post.author} size="md" />
                        <div>
                          <div className="flex items-center gap-2">
                            <span
                              className="text-sm font-semibold"
                              style={{ color: "var(--ck-heading)" }}
                            >
                              {post.author}
                            </span>
                            <span
                              className="text-xs"
                              style={{ color: "var(--ck-text-muted)" }}
                            >
                              {post.handle}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="default" size="sm">
                              <Clock size={10} className="mr-1 inline" />
                              {post.time}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal size={16} />
                      </Button>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="px-5 pb-3">
                    <p className="text-sm leading-relaxed m-0" style={{ color: "var(--ck-text)" }}>
                      {post.content}
                    </p>
                    {post.tags.length > 0 && (
                      <div className="flex gap-1.5 mt-2 flex-wrap">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="info" size="sm">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Post Image */}
                  {post.image && (
                    <div
                      className="mx-5 mb-3 h-52 rounded-xl flex items-center justify-center"
                      style={{ background: post.image }}
                    >
                      <span className="text-4xl">
                        {post.id === 1 ? "🍚" : post.id === 2 ? "🥗" : post.id === 3 ? "🍞" : "🌶️"}
                      </span>
                    </div>
                  )}

                  <Divider />

                  {/* Engagement Row */}
                  <div className="px-5 py-2 flex items-center justify-between">
                    <div className="flex gap-1">
                      <Tooltip content={likedPosts.has(post.id) ? "Unlike" : "Like"}>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleLike(post.id)}
                        >
                          <Heart
                            size={16}
                            fill={likedPosts.has(post.id) ? "var(--ck-error)" : "none"}
                            style={{
                              color: likedPosts.has(post.id) ? "var(--ck-error)" : "var(--ck-text-muted)",
                            }}
                          />
                          <span
                            className="ml-1.5 text-xs"
                            style={{
                              color: likedPosts.has(post.id) ? "var(--ck-error)" : "var(--ck-text-muted)",
                            }}
                          >
                            {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                          </span>
                        </Button>
                      </Tooltip>
                      <Tooltip content="Comments">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleComments(post.id)}
                        >
                          <MessageSquare size={16} style={{ color: "var(--ck-text-muted)" }} />
                          <span className="ml-1.5 text-xs" style={{ color: "var(--ck-text-muted)" }}>
                            {post.comments}
                          </span>
                        </Button>
                      </Tooltip>
                      <Tooltip content="Share">
                        <Button variant="ghost" size="sm">
                          <Share2 size={16} style={{ color: "var(--ck-text-muted)" }} />
                          <span className="ml-1.5 text-xs" style={{ color: "var(--ck-text-muted)" }}>
                            {post.shares}
                          </span>
                        </Button>
                      </Tooltip>
                    </div>
                    <Tooltip content={savedPosts.has(post.id) ? "Unsave" : "Save post"}>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleSave(post.id)}
                      >
                        <Bookmark
                          size={16}
                          fill={savedPosts.has(post.id) ? "var(--ck-primary)" : "none"}
                          style={{
                            color: savedPosts.has(post.id) ? "var(--ck-primary)" : "var(--ck-text-muted)",
                          }}
                        />
                      </Button>
                    </Tooltip>
                  </div>

                  {/* Comments Section */}
                  {expandedComments.has(post.id) && post.replies.length > 0 && (
                    <div
                      className="px-5 pb-4 pt-1"
                      style={{ borderTop: "1px solid var(--ck-border)" }}
                    >
                      <div className="space-y-3 mt-3">
                        {post.replies.map((reply, i) => (
                          <div key={i} className="flex gap-3">
                            <Avatar src={reply.avatar} alt={reply.author} size="sm" />
                            <div
                              className="flex-1 p-3 rounded-xl"
                              style={{ background: "var(--ck-bg)" }}
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <span
                                  className="text-xs font-semibold"
                                  style={{ color: "var(--ck-heading)" }}
                                >
                                  {reply.author}
                                </span>
                                <span className="text-[10px]" style={{ color: "var(--ck-text-muted)" }}>
                                  {reply.time}
                                </span>
                              </div>
                              <p
                                className="text-xs m-0 leading-relaxed"
                                style={{ color: "var(--ck-text)" }}
                              >
                                {reply.text}
                              </p>
                              <button
                                className="text-[10px] mt-1 bg-transparent border-0 cursor-pointer font-medium"
                                style={{ color: "var(--ck-primary)" }}
                              >
                                Reply
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      {/* Add comment */}
                      <div className="flex items-center gap-2 mt-3">
                        <Avatar src="https://i.pravatar.cc/150?img=68" alt="You" size="sm" />
                        <div className="flex-1">
                          <Input placeholder="Write a comment..." />
                        </div>
                        <Button variant="ghost" size="sm">
                          <Send size={14} />
                        </Button>
                      </div>
                    </div>
                  )}
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Chefs to Follow */}
          <AnimateIn delay={0.1}>
            <Card variant="default" padding="md">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <UserPlus size={16} style={{ color: "var(--ck-primary)" }} />
                  <h3 className="text-sm font-semibold m-0" style={{ color: "var(--ck-heading)" }}>
                    Chefs to Follow
                  </h3>
                </div>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  {suggestedChefs.map((chef) => (
                    <div key={chef.name} className="flex items-center gap-3">
                      <Avatar src={chef.avatar} alt={chef.name} size="sm" />
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-xs font-semibold m-0 truncate"
                          style={{ color: "var(--ck-heading)" }}
                        >
                          {chef.name}
                        </p>
                        <p className="text-[10px] m-0" style={{ color: "var(--ck-text-muted)" }}>
                          {chef.specialty}
                        </p>
                      </div>
                      <Button
                        variant={followed.has(chef.name) ? "secondary" : "primary"}
                        size="sm"
                        onClick={() => toggleFollow(chef.name)}
                      >
                        {followed.has(chef.name) ? "Following" : "Follow"}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </AnimateIn>

          {/* Trending Topics */}
          <AnimateIn delay={0.2}>
            <Card variant="default" padding="md">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <TrendingUp size={16} style={{ color: "var(--ck-primary)" }} />
                  <h3 className="text-sm font-semibold m-0" style={{ color: "var(--ck-heading)" }}>
                    Trending Now
                  </h3>
                </div>
              </CardHeader>
              <CardBody>
                <div className="flex flex-wrap gap-2 mb-4">
                  {trendingTopics.slice(0, 3).map((topic) => (
                    <Badge key={topic.tag} variant="info" size="md">
                      {topic.tag}
                    </Badge>
                  ))}
                  {trendingTopics.slice(3).map((topic) => (
                    <Badge key={topic.tag} variant="default" size="md">
                      {topic.tag}
                    </Badge>
                  ))}
                </div>
                <Divider className="mb-3" />
                <div className="space-y-2.5">
                  {trendingTopics.map((topic) => (
                    <div
                      key={topic.tag}
                      className="flex items-center justify-between cursor-pointer"
                    >
                      <span className="text-xs font-medium" style={{ color: "var(--ck-primary)" }}>
                        {topic.tag}
                      </span>
                      <span className="text-[10px]" style={{ color: "var(--ck-text-muted)" }}>
                        {topic.posts}
                      </span>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </AnimateIn>

          {/* Community Stats */}
          <AnimateIn delay={0.3}>
            <Card variant="default" padding="md">
              <CardBody>
                <h3
                  className="text-sm font-semibold m-0 mb-3"
                  style={{ color: "var(--ck-heading)" }}
                >
                  Community
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs" style={{ color: "var(--ck-text-muted)" }}>
                      Active members
                    </span>
                    <Badge variant="success" size="sm">12.4k</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs" style={{ color: "var(--ck-text-muted)" }}>
                      Recipes shared today
                    </span>
                    <Badge variant="info" size="sm">847</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs" style={{ color: "var(--ck-text-muted)" }}>
                      Photos uploaded
                    </span>
                    <Badge variant="warning" size="sm">2.3k</Badge>
                  </div>
                </div>
                <Divider className="my-3" />
                <div className="flex items-center gap-2">
                  <AvatarGroup max={4}>
                    <Avatar src="https://i.pravatar.cc/150?img=5" alt="User 1" size="sm" />
                    <Avatar src="https://i.pravatar.cc/150?img=12" alt="User 2" size="sm" />
                    <Avatar src="https://i.pravatar.cc/150?img=9" alt="User 3" size="sm" />
                    <Avatar src="https://i.pravatar.cc/150?img=15" alt="User 4" size="sm" />
                    <Avatar src="https://i.pravatar.cc/150?img=32" alt="User 5" size="sm" />
                  </AvatarGroup>
                  <span className="text-[10px]" style={{ color: "var(--ck-text-muted)" }}>
                    +8.2k online now
                  </span>
                </div>
              </CardBody>
            </Card>
          </AnimateIn>
        </div>
      </div>
    </div>
  );
}
