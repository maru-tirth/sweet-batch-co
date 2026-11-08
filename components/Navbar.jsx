"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, ShoppingBag } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { brand, navLinks } from "@/config/brand";
import { WhatsAppButton, InstagramButton } from "@/components/ui/OrderButtons";
import { generalMessage } from "@/lib/orders";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section in view
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`));
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <motion.nav
        aria-label="Main navigation"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-full px-3 py-2 transition-all duration-500 sm:px-4 ${
          scrolled || open ? "bg-offwhite/85 shadow-card backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <a href="#home" className="flex items-center gap-2.5" aria-label={`${brand.name} home`}>
          <Logo size={44} priority />
          <span className="font-display text-xl tracking-wide text-deep sm:text-2xl">{brand.name}</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`relative rounded-full px-3.5 py-2 font-heading text-[15px] font-medium transition-colors ${
                  active === l.href ? "text-offwhite" : "text-brown hover:text-deep"
                }`}
              >
                {active === l.href && (
                  <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-deep" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                )}
                <span className="relative">{l.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <motion.a
            href="#order"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="hidden h-11 items-center gap-2 rounded-full bg-deep px-5 font-heading text-[15px] font-medium text-offwhite shadow-soft transition-colors hover:bg-brown sm:inline-flex"
          >
            <ShoppingBag className="size-4" /> Order Now
          </motion.a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-11 place-items-center rounded-full bg-deep text-offwhite lg:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={open ? "x" : "m"} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                {open ? <X className="size-5" /> : <Menu className="size-5" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="mx-auto mt-2 max-w-7xl overflow-hidden rounded-[1.75rem] bg-offwhite/95 p-4 shadow-lift backdrop-blur-md lg:hidden"
          >
            <ul className="flex flex-col">
              {navLinks.map((l, i) => (
                <motion.li key={l.href} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i }}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between rounded-2xl px-4 py-3 font-heading text-lg font-medium ${
                      active === l.href ? "bg-cream text-deep" : "text-brown"
                    }`}
                  >
                    {l.label}
                    {active === l.href && <span className="size-2 rounded-full bg-milk" />}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-3 grid gap-2 border-t border-caramel/60 pt-4 sm:grid-cols-2">
              <WhatsAppButton message={generalMessage()} />
              <InstagramButton message={generalMessage()} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
