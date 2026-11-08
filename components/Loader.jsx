"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Logo from "@/components/ui/Logo";
import { Heart } from "@/components/ui/Decor";
import { brand } from "@/config/brand";

export default function Loader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => setShow(false), reduce ? 300 : 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <noscript>
        <style>{".sbc-loader{display:none!important}"}</style>
      </noscript>
      <AnimatePresence>
        {show && (
          <motion.div
            key="loader"
            className="sbc-loader fixed inset-0 z-[100] grid place-items-center bg-cream grain"
            exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
            aria-label={`Loading ${brand.name}`}
            role="status"
          >
            <div className="flex flex-col items-center gap-5">
              <motion.div
                initial={{ scale: 0.6, opacity: 0, rotate: -12 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 180, damping: 14 }}
              >
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}>
                  <Logo size={140} priority />
                </motion.div>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="font-display text-3xl tracking-wide text-deep"
              >
                {brand.name}
              </motion.p>
              <div className="flex gap-2" aria-hidden="true">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    animate={{ scale: [1, 1.35, 1], opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                  >
                    <Heart filled className="size-4 text-milk" />
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
