"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Badge, Button } from "@cookest/ui";

const scenes = [
  {
    city: "Tokyo",
    country: "Japan",
    dish: "Tonkotsu Ramen",
    desc: "Eighteen-hour pork bone broth, wavy noodles, chashu, soft egg.",
    price: "¥1,200",
    time: "15 min",
    bg: "linear-gradient(135deg, #0f0f1a 0%, #1a0a2e 50%, #0d1a0d 100%)",
    accent: "#c084fc",
    tag: "noodles",
  },
  {
    city: "Mexico City",
    country: "Mexico",
    dish: "Tacos al Pastor",
    desc: "Achiote-marinated pork carved from a trompo, pineapple, cilantro, onion.",
    price: "$45 MXN",
    time: "8 min",
    bg: "linear-gradient(135deg, #1a0800 0%, #3d1400 50%, #1a0f00 100%)",
    accent: "#fb923c",
    tag: "street food",
  },
  {
    city: "Istanbul",
    country: "Turkey",
    dish: "Lahmacun",
    desc: "Thin crisp dough, spiced lamb, fresh parsley, sumac, rolled tight.",
    price: "₺80",
    time: "10 min",
    bg: "linear-gradient(135deg, #0a1628 0%, #1e3a5f 50%, #0a0f1e 100%)",
    accent: "#38bdf8",
    tag: "flatbread",
  },
  {
    city: "Bangkok",
    country: "Thailand",
    dish: "Pad Kra Pao",
    desc: "Holy basil stir-fry, minced pork, bird's eye chilli, crispy fried egg.",
    price: "฿60",
    time: "5 min",
    bg: "linear-gradient(135deg, #001a00 0%, #0d3d1a 50%, #001a0f 100%)",
    accent: "#4ade80",
    tag: "stir-fry",
  },
  {
    city: "Paris",
    country: "France",
    dish: "Croissant au Beurre",
    desc: "Seventy-two-layer laminated dough, AOP butter, honey beurre noisette.",
    price: "€3.20",
    time: "3 days",
    bg: "linear-gradient(135deg, #1a1000 0%, #3d2800 50%, #1a0800 100%)",
    accent: "#fbbf24",
    tag: "boulangerie",
  },
  {
    city: "Naples",
    country: "Italy",
    dish: "Pizza Napoletana",
    desc: "San Marzano tomato, fior di latte, fresh basil, 485°C wood fire, 90 seconds.",
    price: "€7",
    time: "90 sec",
    bg: "linear-gradient(135deg, #1a0000 0%, #3d0f00 50%, #1a0800 100%)",
    accent: "#f87171",
    tag: "pizza",
  },
  {
    city: "Lagos",
    country: "Nigeria",
    dish: "Pepper Soup",
    desc: "Catfish, uziza leaves, utazi, ehuru, cameroon pepper, deep warmth.",
    price: "₦1,500",
    time: "35 min",
    bg: "linear-gradient(135deg, #0a0014 0%, #1e0033 50%, #14000a 100%)",
    accent: "#e879f9",
    tag: "soup",
  },
];

function Scene({ scene, index }: { scene: typeof scenes[0]; index: number }) {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        flexShrink: 0,
        background: scene.bg,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "clamp(2rem, 5vw, 5rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Large background city name */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "clamp(6rem, 18vw, 16rem)",
          fontWeight: 900,
          letterSpacing: "-0.04em",
          color: "rgba(255,255,255,0.04)",
          textTransform: "uppercase",
          pointerEvents: "none",
          userSelect: "none",
          whiteSpace: "nowrap",
          fontFamily: "'Playfair Display', Georgia, serif",
        }}
      >
        {scene.city}
      </div>

      {/* Scene number */}
      <div
        style={{
          position: "absolute",
          top: "clamp(1.5rem, 4vw, 3rem)",
          right: "clamp(1.5rem, 4vw, 3rem)",
          fontFamily: "var(--font-geist-mono, monospace)",
          fontSize: "0.7rem",
          letterSpacing: "0.2em",
          color: "rgba(255,255,255,0.2)",
        }}
      >
        {String(index + 1).padStart(2, "0")} / {String(scenes.length).padStart(2, "0")}
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
          <Badge
            variant="default"
            style={{
              borderColor: `${scene.accent}40`,
              color: scene.accent,
              background: `${scene.accent}12`,
              fontSize: "0.65rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            {scene.tag}
          </Badge>
          <span style={{ fontSize: "0.65rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>
            {scene.country}
          </span>
        </div>

        <h2
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
            fontWeight: 400,
            color: "rgba(255,255,255,0.92)",
            margin: "0 0 0.5rem 0",
            lineHeight: 1.1,
          }}
        >
          {scene.dish}
        </h2>

        <p
          style={{
            fontSize: "clamp(0.85rem, 1.5vw, 1rem)",
            color: "rgba(255,255,255,0.45)",
            maxWidth: "480px",
            lineHeight: 1.7,
            marginBottom: "1.5rem",
            fontStyle: "italic",
            fontFamily: "'Playfair Display', serif",
          }}
        >
          {scene.desc}
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <Badge variant="default" style={{ borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.55)", background: "transparent", fontSize: "0.7rem" }}>
              {scene.price}
            </Badge>
            <Badge variant="default" style={{ borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.55)", background: "transparent", fontSize: "0.7rem" }}>
              {scene.time}
            </Badge>
          </div>

          <div
            style={{
              width: "2.5rem",
              height: "1px",
              background: `linear-gradient(to right, ${scene.accent}60, transparent)`,
            }}
          />
        </div>

        <div style={{ marginTop: "1.5rem" }}>
          <p
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(3rem, 8vw, 7rem)",
              fontWeight: 700,
              color: scene.accent,
              opacity: 0.9,
              margin: 0,
              lineHeight: 0.85,
              letterSpacing: "-0.02em",
            }}
          >
            {scene.city}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default function FilmstripPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0vw", `-${(scenes.length - 1) * 100}vw`]
  );
  const smoothX = useSpring(x, { stiffness: 80, damping: 20 });

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&display=swap');
      `}</style>

      {/* Scroll progress bar */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: "2px", background: "rgba(255,255,255,0.06)", zIndex: 50 }}>
        <motion.div style={{ height: "100%", background: "var(--ck-primary, #16a34a)", width: progressWidth }} />
      </div>

      {/* Back link */}
      <Link
        href="/examples"
        style={{
          position: "fixed",
          top: "1.25rem",
          left: "1.5rem",
          zIndex: 50,
          fontSize: "0.65rem",
          letterSpacing: "0.2em",
          color: "rgba(255,255,255,0.3)",
          textDecoration: "none",
          textTransform: "uppercase",
        }}
      >
        ← Examples
      </Link>

      {/* Label */}
      <div style={{ position: "fixed", top: "1.25rem", right: "1.5rem", zIndex: 50, fontSize: "0.6rem", letterSpacing: "0.3em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase" }}>
        Scroll to travel
      </div>

      {/* Scrollable outer container — tall for sticky pin */}
      <div
        ref={containerRef}
        style={{
          height: "100vh",
          overflowY: "scroll",
          overflowX: "hidden",
          position: "relative",
        }}
      >
        {/* Tall inner to create scroll distance */}
        <div style={{ height: `${scenes.length * 100}vh`, position: "relative" }}>
          {/* Sticky filmstrip wrapper */}
          <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
            <motion.div
              style={{
                display: "flex",
                width: `${scenes.length * 100}vw`,
                height: "100vh",
                x: smoothX,
              }}
            >
              {scenes.map((scene, i) => (
                <Scene key={scene.city} scene={scene} index={i} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
