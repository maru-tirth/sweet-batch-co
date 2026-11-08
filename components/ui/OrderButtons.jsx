"use client";

import { motion } from "motion/react";
import { WhatsAppIcon, InstagramIcon } from "./BrandIcons";
import { whatsappUrl, generalMessage } from "@/lib/orders";
import { useToast } from "@/components/Providers";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full font-heading font-medium transition-colors focus-visible:outline-offset-2";

const sizes = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-[15px]",
  lg: "h-14 px-7 text-base",
};

export function WhatsAppButton({ message, size = "md", label = "Order on WhatsApp", className = "", variant = "solid" }) {
  const styles =
    variant === "light"
      ? "bg-offwhite text-deep hover:bg-cream"
      : "bg-deep text-offwhite hover:bg-brown shadow-soft";
  return (
    <motion.a
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96 }}
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${sizes[size]} ${styles} ${className}`}
    >
      <WhatsAppIcon className="size-[18px] text-whatsapp transition-transform group-hover:rotate-[-10deg]" />
      {label}
    </motion.a>
  );
}

/**
 * Instagram can't receive pre-filled DMs. Clicking copies the order message
 * first, then shows a short "paste it in the chat" step with an Open Instagram button.
 */
export function InstagramButton({ message, size = "md", label = "Order on Instagram", className = "", variant = "outline" }) {
  const { startInstagramOrder } = useToast();
  const styles =
    variant === "light"
      ? "text-offwhite shadow-[inset_0_0_0_2px_rgb(255_247_237_/_0.6)] hover:bg-offwhite/10"
      : "bg-offwhite/70 text-deep shadow-[inset_0_0_0_2px_var(--color-deep)] hover:bg-blush/60";

  return (
    <motion.button
      type="button"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96 }}
      onClick={() => startInstagramOrder(message || generalMessage())}
      aria-haspopup="dialog"
      className={`${base} ${sizes[size]} ${styles} ${className}`}
    >
      <InstagramIcon className="size-[18px] transition-transform group-hover:scale-110" />
      {label}
    </motion.button>
  );
}

export default function OrderButtons({ message, size = "md", stacked = false, className = "" }) {
  return (
    <div className={`flex gap-2.5 ${stacked ? "flex-col" : "flex-col sm:flex-row"} ${className}`}>
      <WhatsAppButton message={message} size={size} className={`shrink-0 whitespace-nowrap ${stacked ? "" : "sm:flex-1"}`} />
      <InstagramButton message={message} size={size} className={`shrink-0 whitespace-nowrap ${stacked ? "" : "sm:flex-1"}`} />
    </div>
  );
}
