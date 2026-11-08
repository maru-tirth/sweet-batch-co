"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Info } from "lucide-react";
import { modaks, modakPacks, getPack, packLabel, modakPackNotice } from "@/data/modaks";
import { formatPrice, modakMessage } from "@/lib/orders";
import QuantitySelector from "@/components/ui/QuantitySelector";
import PackSelector from "@/components/ui/PackSelector";
import OrderButtons from "@/components/ui/OrderButtons";
import ModakArt from "@/components/art/ModakArt";
import { SELECT_ARROW } from "@/lib/styles";

export default function ModakPricing() {
  const [modakId, setModakId] = useState(modaks[0].id);
  const [pack, setPack] = useState("box11");
  const [qty, setQty] = useState(1);

  const modak = modaks.find((m) => m.id === modakId);
  const price = modak.prices[pack];
  const total = price * qty;
  const packInfo = getPack(pack);

  const pick = (id, p) => {
    setModakId(id);
    setPack(p);
    if (window.matchMedia("(max-width: 1023px)").matches) {
      document.getElementById("modak-builder")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1.55fr_1fr] lg:items-start">
      {/* Price list */}
      <div className="rounded-[2rem] border border-caramel/25 bg-deep/40 p-3 backdrop-blur sm:p-5">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-2 px-2 pt-2">
          <div>
            <h3 className="font-heading text-2xl font-semibold text-offwhite">Our Price List</h3>
            <p className="font-hand text-xl text-caramel">ten flavours, three box sizes</p>
          </div>
          <p className="text-xs text-cream/70">Tap a price to select</p>
        </div>

        {/* Desktop / tablet table */}
        <div className="hidden md:block">
          <table className="w-full border-separate border-spacing-y-1.5 text-left">
            <caption className="sr-only">Chocolate modak prices by flavour and packaging</caption>
            <thead>
              <tr className="font-heading text-sm text-caramel">
                <th scope="col" className="rounded-l-2xl bg-brown/70 px-4 py-3 font-semibold">Flavour</th>
                {modakPacks.map((p, i) => (
                  <th
                    key={p.id}
                    scope="col"
                    className={`bg-brown/70 px-2 py-3 text-center font-semibold ${i === modakPacks.length - 1 ? "rounded-r-2xl" : ""}`}
                  >
                    {p.label}
                    <span className="mx-auto mt-1 block w-fit rounded-full bg-caramel px-2.5 py-0.5 text-xs text-deep">
                      {p.pieces} pcs{p.needsConfirmation ? "*" : ""}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {modaks.map((m) => {
                const rowActive = m.id === modakId;
                return (
                  <tr key={m.id} className={`transition-colors ${rowActive ? "bg-offwhite/10" : "hover:bg-offwhite/5"}`}>
                    <th scope="row" className="rounded-l-2xl px-4 py-2.5 font-heading text-[15px] font-medium text-cream">
                      <span className="flex items-center gap-2">
                        <Check className={`size-3.5 ${rowActive ? "text-caramel" : "text-caramel/30"}`} />
                        {m.name}
                      </span>
                    </th>
                    {modakPacks.map((p, i) => {
                      const active = rowActive && p.id === pack;
                      return (
                        <td key={p.id} className={`px-1.5 py-1.5 text-center ${i === modakPacks.length - 1 ? "rounded-r-2xl" : ""}`}>
                          <button
                            type="button"
                            onClick={() => pick(m.id, p.id)}
                            aria-pressed={active}
                            aria-label={`${m.name}, ${packLabel(p)}, ${formatPrice(m.prices[p.id])}`}
                            className={`w-full rounded-xl py-1.5 font-heading text-[15px] font-semibold transition-all ${
                              active ? "scale-105 bg-caramel text-deep shadow-soft" : "text-offwhite hover:bg-offwhite/10"
                            }`}
                          >
                            {formatPrice(m.prices[p.id])}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile list */}
        <ul className="grid gap-2.5 md:hidden">
          {modaks.map((m) => {
            const rowActive = m.id === modakId;
            return (
              <li key={m.id} className={`rounded-2xl p-3 transition-colors ${rowActive ? "bg-offwhite/12 ring-1 ring-caramel/40" : "bg-offwhite/5"}`}>
                <p className="flex items-center gap-2 font-heading text-base font-medium text-cream">
                  <Check className={`size-3.5 ${rowActive ? "text-caramel" : "text-caramel/30"}`} /> {m.name}
                </p>
                <div className="mt-2 grid grid-cols-3 gap-1.5">
                  {modakPacks.map((p) => {
                    const active = rowActive && p.id === pack;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => pick(m.id, p.id)}
                        aria-pressed={active}
                        className={`rounded-xl px-1 py-2 text-center transition-colors ${active ? "bg-caramel text-deep" : "bg-brown/50 text-offwhite"}`}
                      >
                        <span className={`block text-[11px] ${active ? "text-brown" : "text-caramel"}`}>
                          {p.label} {p.pieces}
                          {p.needsConfirmation ? "*" : ""}
                        </span>
                        <span className="block font-heading text-[15px] font-semibold">{formatPrice(m.prices[p.id])}</span>
                      </button>
                    );
                  })}
                </div>
              </li>
            );
          })}
        </ul>

        <p className="mt-4 flex gap-1.5 px-2 text-xs leading-snug text-cream/75">
          <Info className="mt-px size-3.5 shrink-0 text-caramel" />
          <span>* {modakPackNotice}</span>
        </p>
      </div>

      {/* Builder */}
      <div id="modak-builder" className="scroll-mt-24 rounded-[2rem] bg-offwhite p-5 shadow-lift sm:p-6 lg:sticky lg:top-28">
        <div className="flex items-center gap-4">
          <div className="grid size-20 shrink-0 place-items-center rounded-2xl" style={{ background: modak.art.bg }}>
            <AnimatePresence mode="wait">
              <motion.div key={modak.id} initial={{ scale: 0.6, opacity: 0, rotate: -10 }} animate={{ scale: 1, opacity: 1, rotate: 0 }} exit={{ scale: 0.6, opacity: 0 }}>
                <ModakArt {...modak.art} className="size-16" />
              </motion.div>
            </AnimatePresence>
          </div>
          <div>
            <p className="font-hand text-lg text-milk">build your box</p>
            <h3 className="font-heading text-2xl font-semibold leading-tight text-deep">Order Modaks</h3>
          </div>
        </div>

        <div className="mt-5 space-y-4">
          <label className="block">
            <span className="font-heading text-sm font-medium text-brown">1. Flavour</span>
            <select
              value={modakId}
              onChange={(e) => setModakId(e.target.value)}
              style={{ backgroundImage: SELECT_ARROW }}
              className="mt-1.5 h-12 w-full cursor-pointer appearance-none rounded-2xl bg-cream bg-[length:18px] bg-[right_16px_center] bg-no-repeat px-4 font-heading text-base font-medium text-deep outline-none ring-caramel focus:ring-2"
            >
              {modaks.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </label>

          <div>
            <span className="font-heading text-sm font-medium text-brown">2. Packaging</span>
            <div className="mt-1.5">
              <PackSelector modak={modak} value={pack} onChange={setPack} layoutId="builder-pack" />
            </div>
          </div>

          <div>
            <span className="mb-1.5 block font-heading text-sm font-medium text-brown">3. Number of boxes</span>
            <QuantitySelector value={qty} onChange={setQty} label="Boxes" unit={qty > 1 ? "boxes" : "box"} />
          </div>
        </div>

        <div className="mt-5 rounded-2xl bg-cream p-4 text-sm text-brown">
          <div className="flex justify-between">
            <span>{modak.name}</span>
            <span>{packLabel(packInfo)}</span>
          </div>
          <div className="mt-1 flex justify-between">
            <span>
              {formatPrice(price)} × {qty} {qty > 1 ? "boxes" : "box"}
            </span>
            <span>{packInfo.pieces * qty} pcs total</span>
          </div>
          <div className="mt-3 flex items-end justify-between border-t border-dashed border-caramel pt-3">
            <span className="font-heading text-base font-semibold text-deep">Total</span>
            <motion.span key={total} initial={{ scale: 1.15, opacity: 0.4 }} animate={{ scale: 1, opacity: 1 }} className="font-display text-3xl tracking-wide text-deep" aria-live="polite">
              {formatPrice(total)}
            </motion.span>
          </div>
        </div>

        <OrderButtons message={modakMessage(modak, pack, qty)} className="mt-5" stacked />
      </div>
    </div>
  );
}
