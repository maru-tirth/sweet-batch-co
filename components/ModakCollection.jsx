"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Leaf, HandHeart, Sparkles } from "lucide-react";
import { modaks } from "@/data/modaks";
import SectionHeading from "@/components/ui/SectionHeading";
import ModakCard from "@/components/ModakCard";
import ModakPricing from "@/components/ModakPricing";
import QuickView from "@/components/QuickView";
import Reveal from "@/components/ui/Reveal";
import ModakArt from "@/components/art/ModakArt";
import { Heart, Sparkle } from "@/components/ui/Decor";

const promises = [
  [Leaf, "Premium Ingredients"],
  [HandHeart, "Handcrafted with Love"],
  [Sparkles, "Perfect for Gifting & Celebrations"],
];

function Polaroid({ src, alt, caption, className, delay = 0 }) {
  return (
    <motion.figure
      className={`absolute hidden w-44 rounded-2xl bg-offwhite p-2 pb-1 shadow-lift lg:block xl:w-52 ${className}`}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 6, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="relative aspect-square overflow-hidden rounded-xl">
        <Image src={src} alt={alt} fill sizes="208px" className="object-cover" />
      </div>
      <figcaption className="py-1 text-center font-hand text-lg text-deep">{caption}</figcaption>
    </motion.figure>
  );
}

function PromoBanner() {
  return (
    <Reveal>
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-blush via-caramel to-blush px-6 py-12 text-center shadow-lift sm:px-12 sm:py-16">
        <Polaroid src="/images/gallery/dark-modak-box.jpg" alt="A box of 11 dark chocolate modaks" caption="dark & dreamy" className="left-6 top-1/2 -translate-y-1/2 -rotate-6 xl:left-10" delay={0} />
        <Polaroid src="/images/gallery/white-modaks.jpg" alt="White chocolate modaks in a gold tray" caption="fresh batch!" className="right-6 top-1/2 -translate-y-1/2 rotate-6 xl:right-10" delay={0.6} />
        <Sparkle className="absolute left-[22%] top-8 size-6 animate-float text-offwhite" />
        <Heart filled className="absolute bottom-8 right-[24%] size-6 animate-float-slow text-offwhite/80" />

        <p className="relative font-heading text-xs font-medium uppercase tracking-[0.18em] text-brown sm:text-sm sm:tracking-[0.3em]">Handcrafted · Small Batch</p>
        <h3 className="relative mx-auto mt-3 max-w-2xl font-hand text-5xl font-bold leading-[0.95] text-deep sm:text-7xl">
          Chocolate Modaks Are Made Here!
        </h3>
        <ul className="relative mx-auto mt-8 flex max-w-2xl flex-col items-center justify-center gap-3 sm:flex-row sm:gap-6">
          {promises.map(([Icon, label]) => (
            <li key={label} className="flex items-center gap-2 rounded-full bg-offwhite/70 px-4 py-2 font-heading text-sm font-medium text-deep backdrop-blur">
              <Icon className="size-4 text-milk" /> {label}
            </li>
          ))}
        </ul>
        <div className="relative mx-auto mt-8 grid max-w-xs grid-cols-2 gap-3 lg:hidden">
          {[
            ["/images/gallery/dark-modak-box.jpg", "A box of 11 dark chocolate modaks", "-rotate-3"],
            ["/images/gallery/white-modaks.jpg", "White chocolate modaks in a gold tray", "rotate-3"],
          ].map(([src, alt, rot]) => (
            <div key={src} className={`rounded-2xl bg-offwhite p-1.5 shadow-card ${rot}`}>
              <div className="relative aspect-square overflow-hidden rounded-xl">
                <Image src={src} alt={alt} fill sizes="160px" className="object-cover" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

export default function ModakCollection() {
  const [selected, setSelected] = useState(null);
  const [initialPack, setInitialPack] = useState("box11");

  const openQuickView = (modak, pack) => {
    setInitialPack(pack);
    setSelected(modak);
  };

  return (
    <section id="modaks" className="relative overflow-hidden bg-deep py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(rgb(232_201_168_/_0.08)_1px,transparent_1px)] [background-size:22px_22px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-40 top-20 size-[480px] rounded-full bg-milk/25 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-40 bottom-40 size-[420px] rounded-full bg-brown/60 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          light
          eyebrow="festive favourites"
          title="Our Special Chocolate Modaks"
          subtitle="Traditional sweetness meets chocolatey happiness."
        />

        <div className="mt-14">
          <PromoBanner />
        </div>

        <p className="mt-14 text-center font-hand text-xl text-caramel sm:hidden" aria-hidden="true">swipe to see all 10 flavours →</p>
        <div className="no-scrollbar -mx-5 mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:mx-auto sm:mt-16 sm:flex-wrap sm:justify-center sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0">
          {modaks.map((m, i) => (
            <div key={m.id} className="flex w-[82%] max-w-sm shrink-0 snap-center sm:w-[calc(50%-12px)] sm:max-w-none lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)]">
              <ModakCard modak={m} index={i} onQuickView={openQuickView} />
            </div>
          ))}
        </div>

        {modaks.some((m) => !m.image) && (
          <p className="mt-6 text-center text-xs text-cream/60">
            Some flavours are shown as illustrations until their photos are added. Every modak is handmade, so each one may look a little different.
          </p>
        )}

        <div className="mt-20">
          <ModakPricing />
        </div>
      </div>

      <QuickView item={selected} kind="modak" initialPack={initialPack} onClose={() => setSelected(null)} />
    </section>
  );
}
