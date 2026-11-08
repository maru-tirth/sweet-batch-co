"use client";

import { motion } from "motion/react";
import { modakPacks } from "@/data/modaks";
import { formatPrice } from "@/lib/orders";

export default function PackSelector({ modak, value, onChange, layoutId, compact = false }) {
  return (
    <div role="radiogroup" aria-label={`Packaging for ${modak.name}`} className="grid grid-cols-3 gap-1 rounded-2xl bg-cream p-1">
      {modakPacks.map((pack) => {
        const active = value === pack.id;
        return (
          <button
            key={pack.id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(pack.id)}
            className={`relative rounded-xl px-1 py-2 text-center transition-colors ${active ? "text-offwhite" : "text-brown hover:bg-caramel/50"}`}
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 rounded-xl bg-deep shadow-soft"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            <span className="relative block font-heading text-[13px] font-semibold leading-tight">
              {pack.label} {pack.pieces}
              {pack.needsConfirmation && <sup aria-label="to be confirmed">*</sup>}
            </span>
            {!compact && (
              <span className={`relative block text-[11px] ${active ? "text-caramel" : "text-milk"}`}>
                {formatPrice(modak.prices[pack.id])}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
