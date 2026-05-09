"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@cookest/ui";

const courses = [
  {
    number: "01",
    name: "AMUSE-BOUCHE",
    description: "Cucumber vichyssoise, dill oil, caviar",
  },
  {
    number: "02",
    name: "TARTARE",
    description: "Wagyu A5, black truffle, compressed cucumber, mustard ice cream",
  },
  {
    number: "03",
    name: "BISQUE",
    description: "Maine lobster, saffron cream, micro herbs, sherry",
  },
  {
    number: "04",
    name: "INTERMEZZO",
    description: "Lemon verbena granita, prosecco foam",
  },
  {
    number: "05",
    name: "CÔTE DE BŒUF",
    description: "45-day dry-aged, bone marrow butter, pommes soufflées",
  },
  {
    number: "06",
    name: "FROMAGES",
    description: "Aged comté, époisses, roquefort, honeycomb, walnut bread",
  },
  {
    number: "07",
    name: "MIGNARDISES",
    description: "Valrhona petit fours, salted caramel, jasmine tea",
  },
];

function CourseRow({ course, index }: { course: typeof courses[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group cursor-default"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.07)",
        padding: "2.5rem 0",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: "2rem" }}>
        {/* Course number */}
        <span
          style={{
            fontFamily: "var(--font-geist-mono, monospace)",
            fontSize: "0.65rem",
            color: "rgba(255,255,255,0.2)",
            letterSpacing: "0.15em",
            paddingTop: "1rem",
            minWidth: "2.5rem",
            fontStyle: "italic",
          }}
        >
          {course.number}
        </span>

        {/* Main content */}
        <div style={{ flex: 1 }}>
          <motion.div
            animate={{ fontWeight: hovered ? 900 : 300 }}
            transition={{ type: "spring", stiffness: 200, damping: 22 }}
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(2.8rem, 7vw, 6.5rem)",
              letterSpacing: "0.02em",
              color: hovered ? "rgba(255,255,255,0.96)" : "rgba(255,255,255,0.72)",
              lineHeight: 1,
              transition: "color 0.4s ease",
            }}
          >
            {course.name}
          </motion.div>

          <AnimatePresence>
            {hovered && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.25 }}
                style={{
                  marginTop: "0.75rem",
                  fontSize: "0.875rem",
                  color: "rgba(255,255,255,0.4)",
                  fontStyle: "italic",
                  fontFamily: "'Playfair Display', Georgia, serif",
                  letterSpacing: "0.01em",
                }}
              >
                {course.description}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Gold accent on hover */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, scaleY: hovered ? 1 : 0.4 }}
          transition={{ duration: 0.3 }}
          style={{
            width: "1px",
            height: "3rem",
            background: "linear-gradient(to bottom, transparent, rgba(201,169,110,0.6), transparent)",
            marginTop: "0.5rem",
            transformOrigin: "top",
          }}
        />
      </div>
    </motion.div>
  );
}

export default function KineticMenuPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400&display=swap');
      `}</style>

      {/* Grain overlay */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          opacity: 0.035,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      <div
        style={{
          minHeight: "100vh",
          background: "#0a0a0a",
          padding: "clamp(2rem, 5vw, 5rem) clamp(1.5rem, 8vw, 8rem)",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Back link */}
        <Link
          href="/examples"
          style={{
            display: "inline-block",
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
            color: "rgba(255,255,255,0.25)",
            textTransform: "uppercase",
            textDecoration: "none",
            marginBottom: "4rem",
          }}
        >
          ← Examples
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{ marginBottom: "1rem" }}
        >
          <p
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.45em",
              color: "rgba(255,255,255,0.25)",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
            }}
          >
            Cookest Kitchen
          </p>
          <div style={{ height: "1px", background: "rgba(255,255,255,0.07)", marginBottom: "0.75rem" }} />
          <p
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.45em",
              color: "rgba(255,255,255,0.25)",
              textTransform: "uppercase",
              marginBottom: "0.4rem",
            }}
          >
            Tasting Menu
          </p>
          <p
            style={{
              fontSize: "0.6rem",
              letterSpacing: "0.3em",
              color: "rgba(255,255,255,0.15)",
              textTransform: "uppercase",
            }}
          >
            Seven Courses · Spring 2026
          </p>
        </motion.div>

        {/* Courses */}
        <div style={{ marginTop: "3rem" }}>
          {courses.map((course, i) => (
            <CourseRow key={course.number} course={course} index={i} />
          ))}
        </div>

        {/* Bottom gold line */}
        <div
          style={{
            height: "1px",
            background: "linear-gradient(to right, transparent, rgba(201,169,110,0.35), transparent)",
            marginTop: "0.5rem",
            marginBottom: "3rem",
          }}
        />

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <p
            style={{
              fontSize: "0.6rem",
              letterSpacing: "0.3em",
              color: "rgba(255,255,255,0.18)",
              textTransform: "uppercase",
            }}
          >
            Prix Fixe · €285 · Wine Pairing Available
          </p>

          <Button
            variant="ghost"
            size="sm"
            style={{
              borderColor: "rgba(201,169,110,0.45)",
              color: "rgba(201,169,110,0.85)",
              fontSize: "0.7rem",
              letterSpacing: "0.1em",
              background: "transparent",
            }}
          >
            Reserve Your Table →
          </Button>
        </div>
      </div>
    </>
  );
}
