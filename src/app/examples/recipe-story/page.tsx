"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface Step {
  number: string;
  title: string;
  instruction: string;
  ingredients: string[];
  time: string;
  difficulty: string;
  gradient: string;
}

const STEPS: Step[] = [
  {
    number: "01",
    title: "Mise en Place",
    instruction:
      "Gather and prep all ingredients. Cut the beef chuck into 2-inch cubes, pat dry with paper towels, and season generously with salt and freshly cracked black pepper.",
    ingredients: ["500g beef chuck", "Sea salt", "Black pepper", "1 tbsp plain flour"],
    time: "15 min",
    difficulty: "Easy",
    gradient: "linear-gradient(160deg, #1c1917, #292524)",
  },
  {
    number: "02",
    title: "Brown the Beef",
    instruction:
      "Heat a heavy Dutch oven over high heat. Add oil and sear the beef in batches until deeply browned on all sides. Don't crowd the pan — this is where the flavour is built.",
    ingredients: ["2 tbsp olive oil", "Seared beef cubes"],
    time: "20 min",
    difficulty: "Medium",
    gradient: "linear-gradient(160deg, #450a0a, #7f1d1d)",
  },
  {
    number: "03",
    title: "Deglaze & Build",
    instruction:
      "Add onions and carrots to the pot. Cook until softened, then deglaze with red wine, scraping all the golden bits from the bottom — that's pure concentrated flavour.",
    ingredients: ["200ml red wine", "2 onions, diced", "3 carrots, sliced", "4 garlic cloves"],
    time: "10 min",
    difficulty: "Easy",
    gradient: "linear-gradient(160deg, #0c1445, #1e3a5f)",
  },
  {
    number: "04",
    title: "Low & Slow Simmer",
    instruction:
      "Add beef stock, tomato paste, bay leaves, and thyme. Return the beef, bring to a boil, then cover and braise in a 160 °C oven for 2½ hours until meltingly tender.",
    ingredients: ["500ml beef stock", "2 tbsp tomato paste", "Bay leaves", "Fresh thyme"],
    time: "2.5 hrs",
    difficulty: "Passive",
    gradient: "linear-gradient(160deg, #14532d, #166534)",
  },
  {
    number: "05",
    title: "The Vegetables",
    instruction:
      "While the beef braises, sauté pearl onions and mushrooms in butter until deeply golden. These get added in the last 30 minutes so they hold their shape and texture.",
    ingredients: ["200g pearl onions", "300g mushrooms", "3 tbsp butter", "Fresh parsley"],
    time: "15 min",
    difficulty: "Easy",
    gradient: "linear-gradient(160deg, #4a1d96, #6d28d9)",
  },
  {
    number: "06",
    title: "Finish the Sauce",
    instruction:
      "Remove the beef and strain the braising liquid. Reduce the sauce on the stovetop until it coats a spoon. Adjust seasoning, return the beef, onions, and mushrooms.",
    ingredients: ["Strained braising liquid", "Salt & pepper to taste"],
    time: "15 min",
    difficulty: "Medium",
    gradient: "linear-gradient(160deg, #92400e, #b45309)",
  },
  {
    number: "07",
    title: "Plate & Serve",
    instruction:
      "Serve over buttery mashed potatoes or crusty bread. Garnish with fresh flat-leaf parsley and a final crack of black pepper. Bon appétit!",
    ingredients: ["Mashed potatoes", "Crusty bread", "Flat-leaf parsley", "Cracked pepper"],
    time: "5 min",
    difficulty: "Easy",
    gradient: "linear-gradient(160deg, #0f172a, #1e293b)",
  },
];

export default function RecipeStoryPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<HTMLElement[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  const scrollToStep = useCallback((index: number) => {
    const container = containerRef.current;
    if (!container) return;
    container.scrollTo({ top: index * window.innerHeight, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const step = Math.round(container.scrollTop / window.innerHeight);
      setCurrentStep(Math.min(Math.max(step, 0), STEPS.length - 1));
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ── Full-screen story container ── */}
      <div
        ref={containerRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 100,
          overflowY: "scroll",
          scrollSnapType: "y mandatory",
        }}
      >
        {STEPS.map((step, i) => (
          <section
            key={i}
            ref={(el) => {
              if (el) sectionRefs.current[i] = el;
            }}
            style={{
              height: "100vh",
              scrollSnapAlign: "start",
              background: step.gradient,
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            {/* Top progress bar */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "3px",
                background: "rgba(255,255,255,0.1)",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${((i + 1) / STEPS.length) * 100}%`,
                  background: "rgba(255,255,255,0.7)",
                }}
              />
            </div>

            {/* Step label — top */}
            <div
              style={{
                position: "absolute",
                top: "1.5rem",
                left: "2rem",
                right: "2rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                Step {step.number} of {String(STEPS.length).padStart(2, "0")}
              </span>
              <span
                style={{
                  color: "rgba(255,255,255,0.35)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.1em",
                }}
              >
                Beef Bourguignon
              </span>
            </div>

            {/* Giant watermark number */}
            <div
              style={{
                position: "absolute",
                right: "-0.05em",
                bottom: "-0.15em",
                fontSize: "clamp(8rem, 22vw, 18rem)",
                fontWeight: 900,
                fontFamily: "var(--font-serif)",
                color: "rgba(255,255,255,0.04)",
                lineHeight: 1,
                userSelect: "none",
                pointerEvents: "none",
              }}
            >
              {step.number}
            </div>

            {/* Main content */}
            <div
              style={{
                padding: "2rem 2.5rem",
                maxWidth: "680px",
                position: "relative",
                zIndex: 1,
              }}
            >
              <AnimatePresence mode="wait">
                {currentStep === i && (
                  <motion.div
                    key={`step-${i}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    {/* Title */}
                    <motion.h2
                      initial={{ opacity: 0, y: 32 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      style={{
                        color: "rgba(255,255,255,0.95)",
                        fontSize: "clamp(1.75rem, 4vw, 3rem)",
                        fontWeight: 700,
                        fontFamily: "var(--font-serif)",
                        marginBottom: "1rem",
                        lineHeight: 1.2,
                      }}
                    >
                      {step.title}
                    </motion.h2>

                    {/* Instruction */}
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.15 }}
                      style={{
                        color: "rgba(255,255,255,0.72)",
                        fontSize: "1.05rem",
                        lineHeight: 1.75,
                        marginBottom: "1.75rem",
                        maxWidth: "520px",
                      }}
                    >
                      {step.instruction}
                    </motion.p>

                    {/* Ingredient badges */}
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "0.5rem",
                        marginBottom: "2rem",
                      }}
                    >
                      {step.ingredients.map((ingredient, badgeIdx) => (
                        <motion.span
                          key={ingredient}
                          initial={{ opacity: 0, scale: 0.85 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.35 + badgeIdx * 0.06, duration: 0.3 }}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            padding: "0.3rem 0.8rem",
                            borderRadius: "9999px",
                            border: "1px solid rgba(255,255,255,0.25)",
                            background: "rgba(255,255,255,0.08)",
                            color: "rgba(255,255,255,0.8)",
                            fontSize: "0.78rem",
                            backdropFilter: "blur(8px)",
                            WebkitBackdropFilter: "blur(8px)",
                          }}
                        >
                          {ingredient}
                        </motion.span>
                      ))}
                    </motion.div>

                    {/* Bottom row: time + next button */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.4 }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "1rem",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          color: "rgba(255,255,255,0.5)",
                          fontSize: "0.85rem",
                        }}
                      >
                        <Clock size={14} />
                        <span>{step.time}</span>
                        <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
                        <span>{step.difficulty}</span>
                      </div>

                      {i < STEPS.length - 1 && (
                        <button
                          onClick={() => scrollToStep(i + 1)}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.4rem",
                            padding: "0.5rem 1.25rem",
                            borderRadius: "9999px",
                            border: "1px solid rgba(255,255,255,0.3)",
                            background: "rgba(255,255,255,0.1)",
                            color: "rgba(255,255,255,0.9)",
                            fontSize: "0.85rem",
                            cursor: "pointer",
                            backdropFilter: "blur(8px)",
                            WebkitBackdropFilter: "blur(8px)",
                          }}
                        >
                          Next <ChevronRight size={14} />
                        </button>
                      )}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>
        ))}
      </div>

      {/* ── Navigation dots — fixed right ── */}
      <div
        style={{
          position: "fixed",
          right: "1.5rem",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 110,
          display: "flex",
          flexDirection: "column",
          gap: "0.6rem",
          alignItems: "center",
        }}
      >
        {STEPS.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToStep(i)}
            aria-label={`Go to step ${i + 1}`}
            style={{
              width: currentStep === i ? "8px" : "6px",
              height: currentStep === i ? "8px" : "6px",
              borderRadius: "50%",
              background:
                currentStep === i ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "all 0.2s ease",
            }}
          />
        ))}
      </div>

      {/* ── Back button — fixed top-left ── */}
      <Link
        href="/examples"
        style={{
          position: "fixed",
          top: "1.25rem",
          left: "1.25rem",
          zIndex: 110,
          display: "inline-flex",
          alignItems: "center",
          gap: "0.4rem",
          padding: "0.4rem 0.9rem",
          borderRadius: "9999px",
          border: "1px solid rgba(255,255,255,0.2)",
          background: "rgba(0,0,0,0.35)",
          color: "rgba(255,255,255,0.7)",
          fontSize: "0.75rem",
          textDecoration: "none",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <ChevronLeft size={13} /> Examples
      </Link>
    </>
  );
}
