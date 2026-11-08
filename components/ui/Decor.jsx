export function Heart({ className = "", filled = false, style }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden="true">
      <path
        d="M12 20.5s-7.5-4.6-9.2-9.3C1.6 7.9 3.7 4.5 7.2 4.5c2 0 3.5 1.1 4.8 2.9 1.3-1.8 2.8-2.9 4.8-2.9 3.5 0 5.6 3.4 4.4 6.7-1.7 4.7-9.2 9.3-9.2 9.3Z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={filled ? 0 : 1.8}
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Sparkle({ className = "", style }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden="true">
      <path d="M12 1.5c.6 5.3 2.2 8.4 10.5 10.5-8.3 2.1-9.9 5.2-10.5 10.5C11.4 17.2 9.8 14.1 1.5 12 9.8 9.9 11.4 6.8 12 1.5Z" fill="currentColor" />
    </svg>
  );
}

/** Hand-drawn squiggle underline */
export function Squiggle({ className = "" }) {
  return (
    <svg viewBox="0 0 200 16" className={className} aria-hidden="true" preserveAspectRatio="none">
      <path d="M2 10c18-8 30 6 48-1s30-7 48 0 30 7 48 0 30-6 52 1" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/** Wavy chocolate drip edge, place at top of a dark section */
export function DripEdge({ className = "", color = "#4A1F0F" }) {
  return (
    <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className={className} aria-hidden="true">
      <path
        fill={color}
        d="M0 0h1440v28c-30 0-38 34-62 34s-26-30-54-30-30 46-60 46-30-44-62-44-26 22-52 22-30-30-60-30-34 40-64 40-30-36-62-36-30 18-56 18-28-26-58-26-30 44-62 44-32-40-60-40-28 22-54 22-30-30-62-30-30 36-60 36-32-32-60-32-26 16-52 16-30-28-60-28-34 48-64 48-30-44-62-44-28 20-52 20-32-30-60-30-30 38-62 38-30-34-58-34-30 20-56 20-28-26-58-26-34 42-64 42S28 28 0 28Z"
      />
    </svg>
  );
}
