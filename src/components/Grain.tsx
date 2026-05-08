/**
 * Subtle animated film-grain texture overlay.
 * Renders as a fixed full-screen SVG using feTurbulence.
 * Completely non-interactive (pointer-events: none).
 */
export function Grain() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="fixed inset-0 w-full h-full pointer-events-none select-none"
      style={{ zIndex: 9998, opacity: 0.028, mixBlendMode: "overlay" }}
    >
      <filter id="ck-grain-filter" x="0%" y="0%" width="100%" height="100%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.72"
          numOctaves="4"
          stitchTiles="stitch"
          result="noise"
        />
        <feColorMatrix type="saturate" values="0" in="noise" result="grey" />
        <feBlend in="SourceGraphic" in2="grey" mode="overlay" />
      </filter>
      <rect width="100%" height="100%" filter="url(#ck-grain-filter)" />
    </svg>
  );
}
