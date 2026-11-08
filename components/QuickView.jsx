"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, Copy, Info } from "lucide-react";
import ProductVisual from "@/components/ui/ProductVisual";
import QuantitySelector from "@/components/ui/QuantitySelector";
import PackSelector from "@/components/ui/PackSelector";
import OrderButtons from "@/components/ui/OrderButtons";
import { Heart, Sparkle } from "@/components/ui/Decor";
import { chocolateMessage, modakMessage, formatPrice, copyText } from "@/lib/orders";
import { getPack, packLabel, modakPackNotice } from "@/data/modaks";
import { useToast } from "@/components/Providers";

/**
 * Quick View modal for chocolates and modaks.
 * Props: item (or null to close), kind: "chocolate" | "modak", initialPack, onClose
 */
export default function QuickView({ item, kind = "chocolate", initialPack = "box11", onClose }) {
  return (
    <AnimatePresence>
      {item && <QuickViewDialog key={item.id} item={item} kind={kind} initialPack={initialPack} onClose={onClose} />}
    </AnimatePresence>
  );
}

function QuickViewDialog({ item, kind, initialPack, onClose }) {
  const [qty, setQty] = useState(kind === "modak" ? 1 : 5);
  const [pack, setPack] = useState(initialPack);
  const closeRef = useRef(null);
  const dialogRef = useRef(null);
  const { notify } = useToast();
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const isModak = kind === "modak";
  const unitPrice = isModak ? item.prices[pack] : item.price;
  const total = unitPrice * qty;
  const message = isModak ? modakMessage(item, pack, qty) : chocolateMessage(item, qty);
  const packInfo = isModak ? getPack(pack) : null;

  // Escape key, scroll lock, focus management
  useEffect(() => {
    const prevFocus = document.activeElement;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = document.body.style.overflow;
    const prevPadding = document.body.style.paddingRight;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") onCloseRef.current();
      if (e.key === "Tab" && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPadding;
      if (prevFocus && prevFocus.focus) prevFocus.focus();
    };
  }, []);

  const onCopy = async () => {
    const ok = await copyText(message);
    notify(ok ? "Order message copied!" : "Couldn't copy – please select the text manually.", ok ? "success" : "info");
  };

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute inset-0 bg-deep/55 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="qv-title"
        initial={{ opacity: 0, y: 60, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative flex max-h-[92dvh] w-full max-w-4xl flex-col overflow-y-auto rounded-t-[2rem] bg-offwhite shadow-lift sm:rounded-[2rem] md:grid md:grid-cols-2 md:overflow-hidden"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close quick view"
          className="absolute right-4 top-4 z-10 grid size-10 place-items-center rounded-full bg-offwhite/90 text-deep shadow-soft transition hover:rotate-90 hover:bg-blush"
        >
          <X className="size-5" />
        </button>

        {/* Visual */}
        <div className="relative aspect-[4/3] shrink-0 overflow-hidden md:aspect-auto md:h-full md:min-h-[520px]">
          <motion.div
            className="h-full w-full"
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <ProductVisual item={item} kind={kind} sizes="(max-width: 768px) 100vw, 448px" />
          </motion.div>
          <Heart filled className="absolute left-6 top-8 size-6 animate-float text-blush" />
          <Sparkle className="absolute bottom-10 right-10 size-6 animate-float-slow text-caramel" />
          <span className="absolute bottom-4 left-4 rounded-full bg-offwhite/85 px-3 py-1 font-heading text-xs font-medium text-brown backdrop-blur">
            {isModak ? "Chocolate Modak" : "Handcrafted Chocolate"}
          </span>
        </div>

        {/* Details */}
        <div className="flex shrink-0 flex-col gap-5 p-6 sm:p-8 md:max-h-[92dvh] md:shrink md:overflow-y-auto">
          <div>
            <p className="font-hand text-xl text-milk">{isModak ? "traditional & chocolatey" : "little bite of happiness"}</p>
            <h3 id="qv-title" className="pr-10 font-heading text-3xl font-semibold leading-tight text-deep">
              {item.name}
              {isModak && !item.name.toLowerCase().includes("modak") && <span className="text-milk"> Modak</span>}
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-brown">{item.description}</p>
          </div>

          <dl className="grid grid-cols-2 gap-3">
            {isModak ? (
              <>
                <div className="rounded-2xl bg-cream px-4 py-3">
                  <dt className="text-xs uppercase tracking-wider text-milk">Packaging</dt>
                  <dd className="font-heading text-lg font-semibold text-deep">{packLabel(packInfo)}</dd>
                </div>
                <div className="rounded-2xl bg-cream px-4 py-3">
                  <dt className="text-xs uppercase tracking-wider text-milk">Price</dt>
                  <dd className="font-heading text-lg font-semibold text-deep">
                    {formatPrice(unitPrice)} <span className="text-sm font-medium text-milk">/ box</span>
                  </dd>
                </div>
              </>
            ) : (
              <>
                <div className="rounded-2xl bg-cream px-4 py-3">
                  <dt className="text-xs uppercase tracking-wider text-milk">Weight</dt>
                  <dd className="font-heading text-lg font-semibold text-deep">{item.weight}</dd>
                </div>
                <div className="rounded-2xl bg-cream px-4 py-3">
                  <dt className="text-xs uppercase tracking-wider text-milk">Price</dt>
                  <dd className="font-heading text-lg font-semibold text-deep">
                    {formatPrice(item.price)} <span className="text-sm font-medium text-milk">per piece</span>
                  </dd>
                </div>
              </>
            )}
          </dl>

          {isModak && (
            <div className="space-y-2">
              <p className="font-heading text-sm font-medium text-brown">Choose packaging</p>
              <PackSelector modak={item} value={pack} onChange={setPack} layoutId="qv-pack" />
              {packInfo.needsConfirmation && (
                <p className="flex gap-1.5 text-xs leading-snug text-milk">
                  <Info className="mt-px size-3.5 shrink-0" /> {modakPackNotice}
                </p>
              )}
            </div>
          )}

          <QuantitySelector value={qty} onChange={setQty} label={isModak ? "Boxes" : "Quantity"} unit={isModak ? (qty > 1 ? "boxes" : "box") : qty > 1 ? "pieces" : "piece"} />

          <div className="flex items-end justify-between rounded-2xl bg-deep px-5 py-4 text-offwhite">
            <div>
              <p className="text-xs uppercase tracking-wider text-caramel">Total</p>
              <p className="text-sm text-cream/80">
                {formatPrice(unitPrice)} × {qty}
              </p>
            </div>
            <motion.p
              key={total}
              initial={{ y: -8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="font-display text-3xl tracking-wide"
              aria-live="polite"
            >
              {formatPrice(total)}
            </motion.p>
          </div>

          <OrderButtons message={message} stacked />

          <button
            type="button"
            onClick={onCopy}
            className="mx-auto inline-flex items-center gap-1.5 text-sm text-milk underline-offset-4 transition hover:text-deep hover:underline"
          >
            <Copy className="size-3.5" /> Copy order message
          </button>
          <p className="-mt-3 text-center text-xs text-milk/90">Orders are confirmed by us directly on WhatsApp / Instagram.</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
