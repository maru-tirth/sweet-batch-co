import Reveal from "./Reveal";
import { Heart, Squiggle } from "./Decor";

export default function SectionHeading({ eyebrow, title, subtitle, light = false, className = "" }) {
  return (
    <div className={`mx-auto max-w-2xl text-center ${className}`}>
      {eyebrow && (
        <Reveal>
          <p className={`font-hand text-2xl ${light ? "text-caramel" : "text-milk"}`}>{eyebrow}</p>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2
          className={`text-balance font-display text-4xl leading-[1.05] tracking-wide sm:text-5xl ${
            light ? "text-offwhite" : "text-deep"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <div className={`mx-auto mt-3 flex items-center justify-center gap-2 ${light ? "text-caramel" : "text-blush"}`}>
          <Squiggle className="h-3 w-16" />
          <Heart filled className={`size-4 ${light ? "text-caramel" : "text-milk"}`} />
          <Squiggle className="h-3 w-16" />
        </div>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.15}>
          <p className={`mt-4 font-heading text-lg font-medium ${light ? "text-cream/85" : "text-brown"}`}>{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}
