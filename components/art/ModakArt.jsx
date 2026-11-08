import { useId } from "react";
import { shade } from "./color";
import Toppings from "./Toppings";

function ModakShape({ base, accent, topping, gid }) {
  const dark = shade(base, -0.45);
  const light = base.toLowerCase() === "#fbefdd";
  return (
    <g>
      <ellipse cx="100" cy="164" rx="58" ry="9" fill="#4A1F0F" opacity="0.16" />
      <path
        d="M100 30 C108 62 152 92 154 130 C156 154 132 166 100 166 C68 166 44 154 46 130 C48 92 92 62 100 30Z"
        fill={`url(#${gid})`}
      />
      <g fill="none" stroke={dark} strokeOpacity={light ? 0.25 : 0.4} strokeWidth="2.4" strokeLinecap="round">
        <path d="M100 38 C90 78 64 108 58 152" />
        <path d="M100 38 C95 84 82 122 79 163" />
        <path d="M100 38 L100 166" />
        <path d="M100 38 C105 84 118 122 121 163" />
        <path d="M100 38 C110 78 136 108 142 152" />
      </g>
      <path d="M68 92 C60 108 56 124 58 140" stroke="#fff" strokeOpacity={light ? 0.7 : 0.28} strokeWidth="6" strokeLinecap="round" fill="none" />
      <circle cx="100" cy="32" r="5" fill={accent} />
      <path d="M48 138 C70 148 130 148 152 138" stroke={accent} strokeWidth="3.5" strokeLinecap="round" fill="none" opacity="0.9" />
      <Toppings type={topping} cx={100} cy={100} accent={accent} />
    </g>
  );
}

/** Illustrated chocolate modak. `assorted` renders a trio of flavours. */
export default function ModakArt({ base = "#6B3321", accent = "#E8C9A8", topping = "none", className = "", title }) {
  const id = useId().replace(/:/g, "");
  const grad = (key, c) => (
    <radialGradient id={`${key}${id}`} cx="35%" cy="30%" r="85%">
      <stop offset="0%" stopColor={shade(c, c.toLowerCase() === "#fbefdd" ? 0.5 : 0.3)} />
      <stop offset="55%" stopColor={c} />
      <stop offset="100%" stopColor={shade(c, c.toLowerCase() === "#fbefdd" ? -0.14 : -0.35)} />
    </radialGradient>
  );

  if (topping === "assorted") {
    return (
      <svg viewBox="0 0 200 200" className={className} role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
        <defs>
          {grad("a", "#3A170B")}
          {grad("b", "#FBEFDD")}
          {grad("c", "#8F5B45")}
        </defs>
        <g transform="translate(-14 34) scale(0.62)">
          <ModakShape base="#3A170B" accent="#8F5B45" topping="none" gid={`a${id}`} />
        </g>
        <g transform="translate(90 38) scale(0.62)">
          <ModakShape base="#FBEFDD" accent="#E7A3A0" topping="rose" gid={`b${id}`} />
        </g>
        <g transform="translate(38 14) scale(0.72)">
          <ModakShape base="#8F5B45" accent="#E8C9A8" topping="almond" gid={`c${id}`} />
        </g>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 200 200" className={className} role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      <defs>{grad("m", base)}</defs>
      <ModakShape base={base} accent={accent} topping={topping} gid={`m${id}`} />
    </svg>
  );
}
