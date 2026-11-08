import { useId } from "react";

/** Illustrated chocolate bar with a peeled caramel-cream wrapper. */
export default function ChocolateBar({ className = "", color = "#5A2614" }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 160 220" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`bar${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8F5B45" />
          <stop offset="100%" stopColor={color} />
        </linearGradient>
      </defs>
      <ellipse cx="80" cy="210" rx="60" ry="7" fill="#4A1F0F" opacity="0.15" />
      <rect x="22" y="14" width="116" height="190" rx="14" fill={`url(#bar${id})`} />
      {[0, 1, 2].map((r) =>
        [0, 1].map((c) => (
          <g key={`${r}-${c}`}>
            <rect x={32 + c * 50} y={24 + r * 46} width="46" height="40" rx="8" fill="#000" opacity="0.12" />
            <rect x={34 + c * 50} y={26 + r * 46} width="42" height="35" rx="7" fill="#fff" opacity="0.08" />
          </g>
        ))
      )}
      <path d="M18 130 L142 112 L142 206 Q142 214 134 214 L26 214 Q18 214 18 206Z" fill="#E8C9A8" />
      <path d="M18 130 L142 112 L142 122 L18 140Z" fill="#E7C3B2" />
      <text x="80" y="178" textAnchor="middle" fontFamily="var(--font-lilita)" fontSize="17" fill="#4A1F0F" letterSpacing="0.5">SWEETBATCHCO</text>
      <path d="M72 192 c0 -4 6 -5 8 -1 c2 -4 8 -3 8 1 c0 4 -8 8 -8 8 s-8 -4 -8 -8Z" fill="#8F5B45" />
    </svg>
  );
}
