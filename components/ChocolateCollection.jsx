"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { chocolates, chocolateFilters } from "@/data/chocolates";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductCard from "@/components/ProductCard";
import QuickView from "@/components/QuickView";
import Reveal from "@/components/ui/Reveal";
import { Heart, Sparkle } from "@/components/ui/Decor";

export default function ChocolateCollection() {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  const visible = useMemo(
    () => (filter === "all" ? chocolates : chocolates.filter((c) => c.categories.includes(filter))),
    [filter]
  );

  return (
    <section id="chocolates" className="relative overflow-hidden bg-cream grain py-24 sm:py-32">
      <Heart filled className="absolute left-[7%] top-28 size-6 animate-float text-blush" />
      <Sparkle className="absolute right-[10%] top-40 size-5 animate-float-slow text-milk/50" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="the collection" title="Our Chocolate Collection" subtitle="Little bites, endless happiness." />

        <Reveal delay={0.1}>
          <div
            role="tablist"
            aria-label="Filter chocolates"
            className="no-scrollbar -mx-5 mt-10 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0"
          >
            {chocolateFilters.map((f) => {
              const active = f.id === filter;
              return (
                <button
                  key={f.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(f.id)}
                  className={`relative shrink-0 rounded-full px-5 py-2.5 font-heading text-[15px] font-medium transition-colors ${
                    active ? "text-offwhite" : "bg-offwhite/70 text-brown hover:bg-offwhite"
                  }`}
                >
                  {active && (
                    <motion.span layoutId="choc-filter" className="absolute inset-0 rounded-full bg-deep shadow-soft" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
                  )}
                  <span className="relative">{f.label}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <p className="mt-4 text-center text-sm text-milk" aria-live="polite">
          Showing {visible.length} {visible.length === 1 ? "flavour" : "flavours"} · All prices are per piece
        </p>

        <motion.div layout className="mx-auto mt-10 grid max-w-sm gap-6 sm:max-w-none sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {visible.map((p) => (
              <ProductCard key={p.id} product={p} onQuickView={setSelected} />
            ))}
          </AnimatePresence>
        </motion.div>

        <p className="mt-10 text-center text-xs text-milk/90">
          {chocolates.some((c) => !c.image) ? "Some product images shown are illustrations. " : ""}
          Every chocolate is handmade, so each piece may look a little different.
        </p>
      </div>

      <QuickView item={selected} kind="chocolate" onClose={() => setSelected(null)} />
    </section>
  );
}
