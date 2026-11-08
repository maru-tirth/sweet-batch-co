"use client";

import { motion } from "motion/react";
import { Eye } from "lucide-react";
import ProductVisual from "@/components/ui/ProductVisual";
import { WhatsAppButton, InstagramButton } from "@/components/ui/OrderButtons";
import { chocolateMessage, formatPrice } from "@/lib/orders";

export default function ProductCard({ product, onQuickView }) {
  const message = chocolateMessage(product, 1);
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group flex flex-col overflow-hidden rounded-[2rem] bg-offwhite p-3 shadow-card transition-shadow hover:shadow-lift"
    >
      <button
        type="button"
        onClick={() => onQuickView(product)}
        className="relative aspect-square overflow-hidden rounded-[1.5rem]"
        aria-label={`Quick view ${product.name}`}
      >
        <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-110">
          <ProductVisual item={product} kind="chocolate" />
        </div>
        <span className="absolute left-3 top-3 rounded-full bg-offwhite/90 px-3 py-1 font-heading text-xs font-semibold text-brown backdrop-blur">
          {product.weight}
        </span>
        <span className="absolute inset-x-3 bottom-3 flex translate-y-3 items-center justify-center gap-1.5 rounded-full bg-deep/90 py-2 font-heading text-sm font-medium text-offwhite opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <Eye className="size-4" /> Quick View
        </span>
      </button>

      <div className="flex flex-1 flex-col px-2 pb-1 pt-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-heading text-xl font-semibold leading-tight text-deep">{product.name}</h3>
          <p className="shrink-0 text-right">
            <span className="block font-display text-2xl leading-none tracking-wide text-deep">{formatPrice(product.price)}</span>
            <span className="text-[11px] text-milk">per piece</span>
          </p>
        </div>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-brown/90">{product.description}</p>

        <div className="mt-4 grid gap-2">
          <button
            type="button"
            onClick={() => onQuickView(product)}
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
