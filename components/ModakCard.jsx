"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Eye } from "lucide-react";
import ProductVisual from "@/components/ui/ProductVisual";
import PackSelector from "@/components/ui/PackSelector";
import { WhatsAppButton, InstagramButton } from "@/components/ui/OrderButtons";
import { getPack, packLabel } from "@/data/modaks";
import { modakMessage, formatPrice } from "@/lib/orders";

export default function ModakCard({ modak, onQuickView, index = 0 }) {
  const [pack, setPack] = useState("box11");
  const price = modak.prices[pack];
  const message = modakMessage(modak, pack, 1);
  const displayName = modak.name.toLowerCase().includes("modak") ? modak.name : `${modak.name} Modak`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group flex w-full flex-col overflow-hidden rounded-[2rem] bg-offwhite p-3 shadow-[0_24px_50px_-24px_rgb(0_0_0_/_0.6)]"
    >
      <button
        type="button"
        onClick={() => onQuickView(modak, pack)}
        aria-label={`Quick view ${displayName}`}
        className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem]"
      >
        <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-2">
          <ProductVisual item={modak} kind="modak" />
        </div>
        <span className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-offwhite/90 text-deep opacity-0 shadow-soft transition-opacity group-hover:opacity-100">
          <Eye className="size-4" />
        </span>
      </button>

      <div className="flex flex-1 flex-col px-2 pb-1 pt-4">
        <h3 className="font-heading text-xl font-semibold leading-tight text-deep">{displayName}</h3>
        <p className="mt-1 text-sm leading-relaxed text-brown/90">{modak.description}</p>

        <div className="mt-4">
          <PackSelector modak={modak} value={pack} onChange={setPack} layoutId={`pack-${modak.id}`} compact />
        </div>

        <div className="mt-3 flex items-baseline justify-between">
          <span className="text-sm text-milk">{packLabel(getPack(pack))}</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={price}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.18 }}
              className="font-display text-2xl tracking-wide text-deep"
            >
              {formatPrice(price)}
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="mt-4 grid gap-2">
          <button
            type="button"
            onClick={() => onQuickView(modak, pack)}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-cream font-heading text-sm font-medium text-deep transition-colors hover:bg-caramel"
          >
            <Eye className="size-4" /> Quick View
          </button>
          <div className="grid grid-cols-2 gap-2">
            <WhatsAppButton message={message} size="sm" label={<><span className="sr-only">Order on </span>WhatsApp</>} className="!px-2" />
            <InstagramButton message={message} size="sm" label={<><span className="sr-only">Order on </span>Instagram</>} className="!px-2" />
          </div>
        </div>
      </div>
    </motion.article>
  );
}
