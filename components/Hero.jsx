"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, Leaf, HandHeart, Gift } from "lucide-react";
import Logo from "@/components/ui/Logo";
import ChocolateArt from "@/components/art/ChocolateArt";
import ChocolateBar from "@/components/art/ChocolateBar";
import ModakArt from "@/components/art/ModakArt";
import { Heart, Sparkle, Squiggle } from "@/components/ui/Decor";
import { WhatsAppButton, InstagramButton } from "@/components/ui/OrderButtons";
import { generalMessage } from "@/lib/orders";

const headline = ["A", "Little", "Box", "of"];
const ease = [0.22, 1, 0.36, 1];
const START = 1.25; // after loader

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBack = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const yFront = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="home" ref={ref} className="relative overflow-hidden bg-cream grain pt-28 sm:pt-32">
      {/* soft background blobs */}
      <motion.div style={{ y: yBack }} className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -right-24 top-10 size-[480px] rounded-full bg-blush/50 blur-3xl" />
        <div className="absolute -left-32 bottom-0 size-[420px] rounded-full bg-caramel/50 blur-3xl" />
        <Heart className="absolute left-[6%] top-[22%] size-7 animate-float text-milk/50" style={{ "--r": "-12deg" }} />
        <Sparkle className="absolute left-[44%] top-[16%] size-5 animate-float-slow text-milk/60" />
        <Heart filled className="absolute bottom-[18%] left-[38%] size-4 animate-float-slow text-blush" />
        <Sparkle className="absolute bottom-[30%] left-[4%] size-4 animate-float text-caramel" />
      </motion.div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 pb-20 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-6 lg:pb-28">
        {/* Copy */}
        <motion.div style={{ opacity: fade }} className="text-center lg:text-left">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: START, duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full bg-offwhite/80 px-4 py-1.5 font-heading text-sm font-medium text-brown shadow-soft"
          >
            <Heart filled className="size-3.5 text-milk" /> Homemade Chocolates & Modaks
          </motion.p>

          <h1 className="mt-6 font-display text-[3.1rem] leading-[0.98] tracking-wide text-deep sm:text-7xl xl:text-[5.4rem]">
            <span className="sr-only">A Little Box of Happiness.</span>
            <span aria-hidden="true">
              {headline.map((w, i) => (
                <motion.span
                  key={w}
                  className="mr-[0.22em] inline-block"
                  initial={{ opacity: 0, y: 40, rotate: -6 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{ delay: START + 0.1 + i * 0.09, duration: 0.7, ease }}
                >
                  {w}
                </motion.span>
              ))}
              <br className="hidden sm:block" />
              <motion.span
                className="relative inline-block text-milk"
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: START + 0.5, duration: 0.8, ease }}
              >
                Happiness.
                <motion.span
                  className="absolute -bottom-2 left-0 right-0 block text-blush"
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  animate={{ clipPath: "inset(0 0% 0 0)" }}
                  transition={{ delay: START + 1, duration: 0.8, ease }}
                >
                  <Squiggle className="h-4 w-full" />
                </motion.span>
                <Sparkle className="absolute -right-6 -top-3 size-6 text-caramel" />
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: START + 0.75, duration: 0.7 }}
            className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-brown lg:mx-0"
          >
            Handcrafted chocolates, delightful modaks, and little moments of sweetness – made with love.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: START + 0.9, duration: 0.7 }}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
          >
            <motion.a
              href="#chocolates"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="group inline-flex h-14 items-center gap-2 rounded-full bg-deep px-7 font-heading text-base font-medium text-offwhite shadow-lift transition-colors hover:bg-brown"
            >
              Explore Our Collection
              <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" />
            </motion.a>
            <WhatsAppButton message={generalMessage()} size="lg" variant="light" className="shadow-card" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: START + 1.1 }}
            className="mt-3 flex justify-center lg:justify-start"
          >
            <InstagramButton message={generalMessage()} size="sm" className="!bg-transparent !shadow-none hover:!bg-offwhite/60" />
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: START + 1.2 }}
            className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-brown lg:justify-start"
          >
            {[
              [Leaf, "Small batch"],
              [HandHeart, "Handcrafted with love"],
              [Gift, "Perfect for gifting"],
            ].map(([Icon, t]) => (
              <li key={t} className="flex items-center gap-1.5">
                <Icon className="size-4 text-milk" /> {t}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Visual composition */}
        <div className="relative mx-auto aspect-square w-full max-w-[520px]">
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: START + 0.1, duration: 1, ease }}
            className="absolute inset-[10%] rounded-full bg-gradient-to-br from-offwhite via-blush/60 to-caramel shadow-lift"
          />
          <div className="absolute inset-[6%] animate-spin-slow rounded-full border-2 border-dashed border-milk/30" aria-hidden="true" />

          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ delay: START + 0.3, type: "spring", stiffness: 120, damping: 14 }}
            className="absolute inset-[22%] grid place-items-center"
          >
            <Logo size={300} priority className="!h-full !w-full ring-8 ring-offwhite" />
          </motion.div>

          <motion.div style={{ y: yFront }} className="absolute inset-0" aria-hidden="true">
            <FloatIn delay={START + 0.6} className="absolute -left-2 top-[8%] w-[30%] sm:-left-4">
              <ChocolateArt base="#4A1F0F" drizzle="#E8C9A8" topping="almond" className="w-full animate-float drop-shadow-xl" />
            </FloatIn>
            <FloatIn delay={START + 0.75} className="absolute -right-1 top-[2%] w-[24%] rotate-12">
              <ChocolateBar className="w-full animate-float-slow drop-shadow-xl" />
            </FloatIn>
            <FloatIn delay={START + 0.9} className="absolute -right-3 bottom-[8%] w-[30%]">
              <ModakArt base="#8F5B45" accent="#E8C9A8" topping="almond" className="w-full animate-float drop-shadow-xl" />
            </FloatIn>
            <FloatIn delay={START + 1.05} className="absolute bottom-[2%] left-[0%] w-[34%] -rotate-6">
              <div className="animate-float-slow rounded-2xl bg-offwhite p-1.5 pb-0 shadow-lift">
                <div className="relative aspect-square overflow-hidden rounded-xl">
                  <Image src="/images/gallery/modak-boxes.jpg" alt="" fill sizes="180px" className="object-cover" priority />
                </div>
                <p className="py-0.5 text-center font-hand text-base text-deep">our modaks ♡</p>
              </div>
            </FloatIn>
            <Heart filled className="absolute left-[46%] top-[2%] size-7 animate-float text-milk" />
            <Sparkle className="absolute right-[6%] top-[46%] size-6 animate-float-slow text-deep/70" />
            <Heart className="absolute bottom-[2%] right-[38%] size-6 animate-float text-brown/60" />
          </motion.div>

          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: START + 1.3 }}
            className="absolute left-[58%] top-[88%] -translate-x-1/2 whitespace-nowrap rounded-full bg-offwhite px-4 py-1.5 font-hand text-xl text-deep shadow-card"
          >
            made with love ♡
          </motion.span>
        </div>
      </div>

      <Marquee />
    </section>
  );
}

function FloatIn({ children, delay, className }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.4, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, type: "spring", stiffness: 140, damping: 12 }}
    >
      {children}
    </motion.div>
  );
}

const marqueeItems = ["Handcrafted", "Small Batch", "Chocolate Modaks", "Custom Chocolates", "Perfect for Gifting", "Made with Love"];

function Marquee() {
  const row = [...marqueeItems, ...marqueeItems];
  return (
    <div className="relative overflow-hidden bg-deep py-4 text-caramel" aria-hidden="true">
      <motion.div
        className="flex w-max gap-10 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10 font-heading text-lg font-medium tracking-wide">
            {t}
            <Heart filled className="size-3.5 text-blush" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
