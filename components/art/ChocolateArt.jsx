import { useId } from "react";
import { shade } from "./color";
import Toppings from "./Toppings";

/**
 * Illustrated chocolate bonbon. Used as a stand-in until real product photos are added.
 */
export default function ChocolateArt({ base = "#6B3321", drizzle = "#E8C9A8", topping = "none", className = "", title }) {
  const id = useId().replace(/:/g, "");
  const light = base.toLowerCase() === "#fbefdd";
  return (
    <svg viewBox="0 0 200 200" className={className} role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      <defs>
        <radialGradient id={`g${id}`} cx="35%" cy="25%" r="85%">
          <stop offset="0%" stopColor={shade(base, light ? 0.5 : 0.28)} />
          <stop offset="55%" stopColor={base} />
          <stop offset="100%" stopColor={shade(base, light ? -0.14 : -0.35)} />
        </radialGradient>
      </defs>
      <ellipse cx="100" cy="150" rx="70" ry="11" fill="#4A1F0F" opacity="0.16" />
      <path
        d="M36 128 C36 76 64 52 100 52 C136 52 164 76 164 128 C164 141 140 148 100 148 C60 148 36 141 36 128Z"
        fill={`url(#g${id})`}
      />
      <path d="M36 128 C36 141 60 148 100 148 C140 148 164 141 164 128" fill="none" stroke={shade(base, -0.4)} strokeOpacity="0.35" strokeWidth="2" />
      <path
        d="M46 104 C60 84 70 120 84 96 S104 116 116 92 S138 116 154 100"
        fill="none"
        stroke={drizzle}
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M42 120 C58 102 70 134 86 112 S108 132 120 110 S144 130 158 116"
        fill="none"
        stroke={drizzle}
        strokeWidth="4.5"
        strokeLinecap="round"
        opacity="0.9"
      />
      <ellipse cx="72" cy="78" rx="19" ry="8" fill="#fff" opacity={light ? 0.6 : 0.25} transform="rotate(-28 72 78)" />
      <Toppings type={topping} cx={100} cy={72} accent={drizzle} />
    </svg>
  );
}
