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
import { Breadcrumb } from "@/components/Breadcrumb";
import { AnimateIn, StaggerContainer, StaggerItem } from "@/components/AnimateIn";
import {
  Heart,
  ShoppingCart,
  Star,
  Check,
  ChevronRight,
  Minus,
  Plus,
  Truck,
  Shield,
  RotateCcw,
  Share2,
  Package,
} from "lucide-react";

const colors = [
  { name: "Midnight Black", hex: "#1a1a2e" },
  { name: "Stainless Silver", hex: "#c0c0c0" },
  { name: "Rose Gold", hex: "#b76e79" },
  { name: "Forest Green", hex: "#2d6a4f" },
];

const sizes = ["5-Piece", "7-Piece", "10-Piece", "12-Piece"];

const features = [
  "High-carbon German stainless steel blades",
  "Ergonomic triple-riveted handles",
  "Full-tang construction for balance",
  "Ice-hardened for lasting sharpness",
  "NSF certified — dishwasher safe",
  "Lifetime manufacturer warranty",
];

const relatedProducts = [
  {
    name: "Magnetic Knife Block",
    price: "$49.99",
    rating: 4.6,
    image: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    name: "Cutting Board Set",
    price: "$34.99",
    rating: 4.9,
    image: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
  {
    name: "Knife Sharpener Pro",
    price: "$29.99",
    rating: 4.7,
    image: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  },
];

const reviews = [
  {
    name: "Elena Marchetti",
    avatar: "https://i.pravatar.cc/150?img=5",
    rating: 5,
    date: "3 days ago",
    title: "Best knives I've ever owned",
    text: "These knives are absolutely incredible. The balance is perfect, and they came razor-sharp out of the box. The chef's knife glides through everything effortlessly.",
    helpful: 24,
  },
  {
    name: "David Park",
    avatar: "https://i.pravatar.cc/150?img=11",
    rating: 4,
    date: "1 week ago",
    title: "Professional quality at home",
    text: "I'm a home cook who upgraded from a budget set. The difference is night and day — prep time has been cut in half. Only wish the paring knife was slightly smaller.",
    helpful: 18,
  },
  {
    name: "Amara Johnson",
    avatar: "https://i.pravatar.cc/150?img=20",
    rating: 5,
    date: "2 weeks ago",
    title: "Worth every penny",
    text: "Bought these as a gift for my partner who loves cooking. They were thrilled! Beautiful packaging too. The magnetic block is a great add-on if you want to display them.",
    helpful: 12,
  },
];

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span style={{ color: "#f59e0b", letterSpacing: "1px", fontSize: size }}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} style={{ opacity: i < Math.floor(rating) ? 1 : i < rating ? 0.6 : 0.2 }}>
          ★
        </span>
      ))}
    </span>
  );
}

export default function ProductPage() {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState<"description" | "features" | "shipping">("description");

  const basePrice = 89.99;
  const sizeMultipliers = [1, 1.3, 1.7, 2.1];
  const currentPrice = (basePrice * sizeMultipliers[selectedSize]).toFixed(2);

  return (
    <div className="max-w-5xl">
      <Breadcrumb />

      {addedToCart && (
        <div className="mb-6">
          <Alert
            variant="success"
            dismissible
            onDismiss={() => setAddedToCart(false)}
          >
            Added {quantity}× Professional Chef&apos;s Knife Set ({sizes[selectedSize]}) to your cart!
          </Alert>
        </div>
      )}

      <AnimateIn>
        {/* Product Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div>
            <div
              className="rounded-2xl overflow-hidden aspect-square flex items-center justify-center relative"
              style={{
                background: `linear-gradient(135deg, ${colors[selectedColor].hex}22 0%, ${colors[selectedColor].hex}44 50%, ${colors[selectedColor].hex}66 100%)`,
                border: "1px solid var(--ck-border)",
              }}
            >
              <div className="text-center">
                <div
                  className="text-6xl mb-4"
                  style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.15))" }}
                >
                  🔪
                </div>
                <p
                  className="text-sm font-medium"
                  style={{ color: "var(--ck-text-muted)" }}
                >
                  {sizes[selectedSize]} Set — {colors[selectedColor].name}
                </p>
              </div>
              <div className="absolute top-4 left-4">
                <Badge variant="info" size="sm">Best Seller</Badge>
              </div>
            </div>
            {/* Thumbnail strip */}
            <div className="flex gap-2 mt-3">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex-1 aspect-square rounded-lg cursor-pointer transition-all duration-200"
                  style={{
                    background: `linear-gradient(135deg, ${colors[selectedColor].hex}22, ${colors[selectedColor].hex}44)`,
                    border: i === 0
                      ? "2px solid var(--ck-primary)"
                      : "1px solid var(--ck-border)",
                    opacity: i === 0 ? 1 : 0.6,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="success" size="sm">In Stock</Badge>
              <Badge variant="default" size="sm">Free Shipping</Badge>
            </div>

            <h1
              className="text-3xl font-bold mb-2 m-0"
              style={{ color: "var(--ck-heading)", fontFamily: "var(--font-serif)" }}
            >
              Professional Chef&apos;s Knife Set
            </h1>

            <div className="flex items-center gap-3 mb-4">
              <StarRating rating={4.8} />
              <span className="text-sm font-medium" style={{ color: "var(--ck-heading)" }}>
                4.8
              </span>
              <span className="text-sm" style={{ color: "var(--ck-text-muted)" }}>
                (2,847 reviews)
              </span>
              <Divider orientation="vertical" className="h-4" />
              <span className="text-sm" style={{ color: "var(--ck-primary)" }}>
                1.2k+ sold this month
              </span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span
                className="text-3xl font-bold"
                style={{ color: "var(--ck-heading)" }}
              >
                ${currentPrice}
              </span>
              <span
                className="text-lg line-through"
                style={{ color: "var(--ck-text-muted)" }}
              >
                ${(parseFloat(currentPrice) * 1.4).toFixed(2)}
              </span>
              <Badge variant="error" size="sm">Save 30%</Badge>
            </div>

            <Divider className="mb-6" />

            {/* Color Selector */}
            <div className="mb-5">
              <p className="text-sm font-semibold mb-2 m-0" style={{ color: "var(--ck-heading)" }}>
                Color: <span style={{ color: "var(--ck-text-muted)", fontWeight: 400 }}>{colors[selectedColor].name}</span>
              </p>
              <div className="flex gap-2">
                {colors.map((color, i) => (
                  <Tooltip key={color.name} content={color.name}>
                    <button
                      onClick={() => setSelectedColor(i)}
                      className="w-9 h-9 rounded-full border-2 transition-all duration-200 cursor-pointer"
                      style={{
                        background: color.hex,
                        borderColor: selectedColor === i ? "var(--ck-primary)" : "var(--ck-border)",
                        transform: selectedColor === i ? "scale(1.15)" : "scale(1)",
                      }}
                    />
                  </Tooltip>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="mb-5">
              <p className="text-sm font-semibold mb-2 m-0" style={{ color: "var(--ck-heading)" }}>
                Set Size
              </p>
              <div className="flex gap-2 flex-wrap">
                {sizes.map((size, i) => (
                  <Button
                    key={size}
                    variant={selectedSize === i ? "primary" : "secondary"}
                    size="sm"
                    onClick={() => setSelectedSize(i)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <p className="text-sm font-semibold mb-2 m-0" style={{ color: "var(--ck-heading)" }}>
                Quantity
              </p>
              <div
                className="inline-flex items-center rounded-lg border"
                style={{ borderColor: "var(--ck-border)" }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus size={14} />
                </Button>
                <span
                  className="w-12 text-center text-sm font-semibold"
                  style={{ color: "var(--ck-heading)" }}
                >
                  {quantity}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                >
                  <Plus size={14} />
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-6">
              <Button
                variant="primary"
                size="lg"
                iconLeft={<ShoppingCart size={18} />}
                onClick={() => setAddedToCart(true)}
                className="flex-1"
              >
                Add to Cart
              </Button>
              <Tooltip content={wishlisted ? "Remove from wishlist" : "Save to wishlist"}>
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={() => setWishlisted(!wishlisted)}
                >
                  <Heart
                    size={20}
                    fill={wishlisted ? "var(--ck-error)" : "none"}
                    style={{ color: wishlisted ? "var(--ck-error)" : "var(--ck-text-muted)" }}
                  />
                </Button>
              </Tooltip>
              <Tooltip content="Share product">
                <Button variant="ghost" size="lg">
                  <Share2 size={20} />
                </Button>
              </Tooltip>
            </div>

            {/* Trust badges */}
            <div
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl"
              style={{ background: "var(--ck-surface)", border: "1px solid var(--ck-border)" }}
            >
              {[
                { icon: Truck, label: "Free Shipping", sub: "Orders over $50" },
                { icon: Shield, label: "Lifetime Warranty", sub: "Guaranteed quality" },
                { icon: RotateCcw, label: "30-Day Returns", sub: "No questions asked" },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="text-center">
                  <Icon size={18} className="mx-auto mb-1" style={{ color: "var(--ck-primary)" }} />
                  <p className="text-xs font-semibold m-0" style={{ color: "var(--ck-heading)" }}>
                    {label}
                  </p>
                  <p className="text-[10px] m-0" style={{ color: "var(--ck-text-muted)" }}>
                    {sub}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimateIn>

      {/* Tabs Section */}
      <AnimateIn delay={0.15}>
        <Card variant="default" padding="none" className="mb-10">
          <div
            className="flex border-b"
            style={{ borderColor: "var(--ck-border)" }}
          >
            {(["description", "features", "shipping"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-6 py-3 text-sm font-medium transition-all duration-200 cursor-pointer border-b-2 bg-transparent"
                style={{
                  color: activeTab === tab ? "var(--ck-primary)" : "var(--ck-text-muted)",
                  borderColor: activeTab === tab ? "var(--ck-primary)" : "transparent",
                }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          <CardBody>
            {activeTab === "description" && (
              <div>
                <p className="leading-relaxed mb-4" style={{ color: "var(--ck-text)" }}>
                  Elevate your culinary experience with our Professional Chef&apos;s Knife Set, crafted
                  from premium high-carbon German stainless steel. Each blade is precision-forged
                  and ice-hardened for exceptional sharpness and edge retention.
                </p>
                <p className="leading-relaxed" style={{ color: "var(--ck-text)" }}>
                  The ergonomic triple-riveted handles provide a comfortable, secure grip for
                  extended use, while the full-tang construction ensures perfect balance in every
                  cut. Whether you&apos;re a professional chef or passionate home cook, this set
                  delivers restaurant-quality performance.
                </p>
              </div>
            )}
            {activeTab === "features" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: "rgba(122,154,101,0.15)" }}
                    >
                      <Check size={12} style={{ color: "var(--ck-primary)" }} />
                    </div>
                    <span className="text-sm" style={{ color: "var(--ck-text)" }}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            )}
            {activeTab === "shipping" && (
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Truck size={18} style={{ color: "var(--ck-primary)" }} className="mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold m-0 mb-1" style={{ color: "var(--ck-heading)" }}>
                      Free Standard Shipping
                    </p>
                    <p className="text-sm m-0" style={{ color: "var(--ck-text-muted)" }}>
                      Delivered in 5–7 business days. Free on all orders over $50.
                    </p>
                  </div>
                </div>
                <Divider />
                <div className="flex items-start gap-3">
                  <Package size={18} style={{ color: "var(--ck-primary)" }} className="mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold m-0 mb-1" style={{ color: "var(--ck-heading)" }}>
                      Express Shipping — $12.99
                    </p>
                    <p className="text-sm m-0" style={{ color: "var(--ck-text-muted)" }}>
                      Delivered in 1–3 business days. Available for most locations.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardBody>
        </Card>
      </AnimateIn>

      {/* Related Products */}
      <AnimateIn delay={0.25}>
        <h2
          className="text-xl font-bold mb-5"
          style={{ color: "var(--ck-heading)", fontFamily: "var(--font-serif)" }}
        >
          You Might Also Like
        </h2>
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
          {relatedProducts.map((product) => (
            <StaggerItem key={product.name}>
              <Card variant="default" padding="none" className="overflow-hidden cursor-pointer group">
                <div
                  className="h-40 flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
                  style={{ background: product.image }}
                >
                  <span className="text-3xl">
                    {product.name.includes("Block") ? "🧲" : product.name.includes("Board") ? "🪵" : "🔧"}
                  </span>
                </div>
                <CardBody>
                  <h3 className="text-sm font-semibold m-0 mb-1" style={{ color: "var(--ck-heading)" }}>
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold" style={{ color: "var(--ck-primary)" }}>
                      {product.price}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star size={12} fill="#f59e0b" style={{ color: "#f59e0b" }} />
                      <span className="text-xs" style={{ color: "var(--ck-text-muted)" }}>
                        {product.rating}
                      </span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </AnimateIn>

      {/* Reviews Section */}
      <AnimateIn delay={0.35}>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2
              className="text-xl font-bold m-0 mb-1"
              style={{ color: "var(--ck-heading)", fontFamily: "var(--font-serif)" }}
            >
              Customer Reviews
            </h2>
            <div className="flex items-center gap-2">
              <StarRating rating={4.8} size={16} />
              <span className="text-sm" style={{ color: "var(--ck-text-muted)" }}>
                Based on 2,847 reviews
              </span>
            </div>
          </div>
          <Button variant="secondary" size="sm">
            Write a Review
          </Button>
        </div>

        <StaggerContainer className="space-y-4 mb-10">
          {reviews.map((review) => (
            <StaggerItem key={review.name}>
              <Card variant="default" padding="md">
                <CardBody>
                  <div className="flex items-start gap-4">
                    <Avatar src={review.avatar} alt={review.name} size="md" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-sm font-semibold" style={{ color: "var(--ck-heading)" }}>
                          {review.name}
                        </span>
                        <Badge variant="success" size="sm">Verified Purchase</Badge>
                        <span className="text-xs" style={{ color: "var(--ck-text-muted)" }}>
                          {review.date}
                        </span>
                      </div>
                      <div className="mb-2">
                        <StarRating rating={review.rating} size={12} />
                      </div>
                      <h4
                        className="text-sm font-semibold m-0 mb-1"
                        style={{ color: "var(--ck-heading)" }}
                      >
                        {review.title}
                      </h4>
                      <p className="text-sm m-0 mb-3 leading-relaxed" style={{ color: "var(--ck-text)" }}>
                        {review.text}
                      </p>
                      <div className="flex items-center gap-4">
                        <button
                          className="text-xs flex items-center gap-1 cursor-pointer bg-transparent border-0"
                          style={{ color: "var(--ck-text-muted)" }}
                        >
                          👍 Helpful ({review.helpful})
                        </button>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </AnimateIn>
    </div>
  );
}
