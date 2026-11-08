"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { story } from "@/data/story";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import ChocolateArt from "@/components/art/ChocolateArt";
import ChocolateBar from "@/components/art/ChocolateBar";
import ModakArt from "@/components/art/ModakArt";
import GiftBox from "@/components/art/GiftBox";
import Logo from "@/components/ui/Logo";
import { Heart, Sparkle } from "@/components/ui/Decor";

const panelBg = [
  "from-blush/70 to-caramel/70",
  "from-caramel/80 to-cream",
  "from-cream to-blush/70",
  "from-milk to-deep",
];

function StoryArt({ type }) {
  switch (type) {
    case "truffles":
      return (
        <div className="relative h-full w-full">
          <ChocolateArt base="#4A1F0F" drizzle="#E8C9A8" className="absolute left-[8%] top-[30%] w-[46%]" />
          <ChocolateArt base="#8F5B45" drizzle="#FFF7ED" topping="almond" className="absolute right-[6%] top-[14%] w-[42%]" />
          <ChocolateArt base="#FBEFDD" drizzle="#8F5B45" topping="rose" className="absolute bottom-[4%] right-[18%] w-[40%]" />
        </div>
      );
    case "hands":
      return (
        <div className="relative h-full w-full">
          <ChocolateBar className="absolute left-[12%] top-[14%] w-[34%] -rotate-12" />
          <ModakArt base="#6B3321" accent="#E8C9A8" topping="dryfruit" className="absolute bottom-[6%] right-[8%] w-[52%]" />
          <Heart filled className="absolute right-[16%] top-[16%] size-10 text-blush" />
        </div>
      );
    case "gift":
      return (
        <div className="relative h-full w-full">
          <GiftBox className="absolute left-[10%] top-[16%] w-[58%]" />
          <ChocolateArt base="#6B3321" drizzle="#E7A3A0" topping="rose" className="absolute bottom-[6%] right-[6%] w-[40%]" />
          <Sparkle className="absolute right-[18%] top-[14%] size-8 text-offwhite" />
        </div>
      );
    default:
      return (
        <div className="relative grid h-full w-full place-items-center">
          <Heart filled className="absolute size-[86%] text-blush/30" />
          <Logo size={220} className="!h-[52%] !w-[52%] ring-8 ring-offwhite/70" />
          <Sparkle className="absolute left-[16%] top-[18%] size-8 text-caramel" />
          <Heart filled className="absolute bottom-[16%] right-[18%] size-8 text-caramel" />
        </div>
      );
  }
}

function StoryRow({ item, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const rotate = useTransform(scrollYProgress, [0, 1], [index % 2 ? 3 : -3, index % 2 ? -3 : 3]);
  const flip = index % 2 === 1;

  return (
    <article ref={ref} className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
      <Reveal x={flip ? 40 : -40} y={0} className={flip ? "md:order-2" : ""}>
        <motion.div
          style={{ y, rotate }}
          className={`relative mx-auto aspect-[5/4] w-full max-w-md overflow-hidden rounded-[2.5rem] bg-gradient-to-br ${panelBg[index % panelBg.length]} shadow-card`}
        >
          {item.image ? (
            <>
              <Image src={item.image} alt={item.imageAlt || item.title} fill sizes="(max-width: 768px) 90vw, 448px" className="object-cover transition-transform duration-700 hover:scale-105" />
              <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] ring-8 ring-inset ring-offwhite/70" />
              <span className="absolute bottom-4 left-4 rounded-full bg-offwhite/90 px-3 py-1 font-hand text-lg text-deep shadow-soft backdrop-blur">
                {item.accent} ♡
              </span>
            </>
          ) : (
            <StoryArt type={item.art} />
          )}
        </motion.div>
      </Reveal>
      <div className={`text-center md:text-left ${flip ? "md:order-1" : ""}`}>
        <Reveal>
          <span className="font-display text-6xl text-blush">0{index + 1}</span>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="-mt-2 font-hand text-2xl text-milk">{item.accent}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h3 className="mt-1 font-heading text-3xl font-semibold text-deep sm:text-4xl">{item.title}</h3>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="mx-auto mt-4 max-w-md text-[17px] leading-relaxed text-brown md:mx-0">{item.text}</p>
        </Reveal>
      </div>
    </article>
  );
}

export default function OurStory() {
  return (
    <section id="story" className="relative overflow-hidden bg-offwhite py-24 sm:py-32">
      <Sparkle className="absolute right-[8%] top-24 size-6 animate-float text-caramel" />
      <Heart className="absolute left-[5%] top-[40%] size-8 animate-float-slow text-blush" />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading eyebrow="a little about us" title="Our Chocolate Story" subtitle="Made in our kitchen, shared with your heart." />
        <div className="relative mt-16 space-y-20 sm:mt-20 sm:space-y-28">
          <div className="absolute bottom-0 left-1/2 top-0 hidden w-px -translate-x-1/2 border-l-2 border-dashed border-caramel md:block" aria-hidden="true" />
          {story.map((item, i) => (
            <StoryRow key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
