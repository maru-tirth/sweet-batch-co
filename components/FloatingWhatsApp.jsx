"use client";

import { motion } from "motion/react";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { whatsappUrl, generalMessage } from "@/lib/orders";

export default function FloatingWhatsApp() {
  return (
    <motion.a
      href={whatsappUrl(generalMessage())}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: "spring", stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      className="group fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-[60] sm:bottom-6 sm:right-6"
    >
      <span className="absolute inset-0 animate-pulse-ring rounded-full bg-whatsapp" aria-hidden="true" />
      <span className="relative grid size-14 place-items-center rounded-full bg-whatsapp text-white shadow-lift sm:size-16">
        <WhatsAppIcon className="size-7 sm:size-8" />
      </span>
      <span className="pointer-events-none absolute right-full top-1/2 mr-3 hidden -translate-y-1/2 translate-x-2 whitespace-nowrap rounded-full bg-deep px-4 py-2 font-heading text-sm font-medium text-offwhite opacity-0 shadow-card transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 sm:block">
        Chat with us
      </span>
    </motion.a>
  );
}
