"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { X, Copy, CircleCheck, ClipboardPaste, Send, ExternalLink } from "lucide-react";
import { InstagramIcon } from "@/components/ui/BrandIcons";
import { brand } from "@/config/brand";
import { copyText, instagramUrl } from "@/lib/orders";

/**
 * Instagram can't receive pre-filled DM text, so before opening Instagram we
 * copy the message (while this page still has focus) and show the customer
 * exactly what to do: open the chat, paste, send.
 */
export default function InstagramHandoff({ message, copied: initiallyCopied, onClose }) {
  const [copied, setCopied] = useState(initiallyCopied);
  const openRef = useRef(null);
  const textRef = useRef(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  const url = instagramUrl();
  const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.userAgent);
  const isTouch = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
  const pasteHint = isTouch ? "Long-press the message box and tap Paste" : `Click the message box and press ${isMac ? "⌘" : "Ctrl"} + V`;

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    openRef.current?.focus();
    // capture phase on window so Esc closes only this dialog, not a Quick View underneath
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      e.stopPropagation();
      onCloseRef.current();
    };
    window.addEventListener("keydown", onKey, true);
    return () => {
      window.removeEventListener("keydown", onKey, true);
      document.body.style.overflow = prev;
    };
  }, []);

  const copyAgain = async () => {
    const ok = await copyText(message);
    setCopied(ok);
    if (!ok && textRef.current) {
      textRef.current.focus();
      textRef.current.select();
    }
  };

  // Re-copy at the moment of opening too, in case the clipboard was overwritten.
  const onOpen = () => {
    copyText(message);
  };

  return (
    <motion.div className="fixed inset-0 z-[95] flex items-end justify-center sm:items-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-deep/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="ig-title"
        initial={{ y: 50, opacity: 0, scale: 0.97 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 30, opacity: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
        className="relative max-h-[92dvh] w-full max-w-md overflow-y-auto rounded-t-[2rem] bg-offwhite p-6 shadow-lift sm:rounded-[2rem] sm:p-7"
      >
        <button type="button" onClick={onClose} aria-label="Close" className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-cream text-deep transition hover:rotate-90 hover:bg-blush">
          <X className="size-5" />
        </button>

        <div className="flex items-center gap-3 pr-10">
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-blush to-caramel text-deep">
            <InstagramIcon className="size-6" />
          </span>
          <div>
            <h3 id="ig-title" className="font-heading text-xl font-semibold leading-tight text-deep">
              {copied ? "Your message is copied!" : "Copy your message"}
            </h3>
            <p className="text-sm text-milk">Order on Instagram · @{brand.instagram.username}</p>
          </div>
        </div>

        <p className="mt-4 rounded-2xl bg-blush/40 px-4 py-3 text-sm leading-relaxed text-deep">
          Instagram doesn&apos;t let websites type the message for you, so just <strong>paste</strong> it into the chat:
        </p>

        <ol className="mt-4 space-y-3 text-sm text-brown">
          {[
            [ExternalLink, "Tap “Open Instagram chat” below"],
            [ClipboardPaste, pasteHint],
            [Send, "Hit send – we'll confirm your order there"],
          ].map(([Icon, text], i) => (
            <li key={i} className="flex items-center gap-3">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-cream font-heading text-sm font-semibold text-deep">{i + 1}</span>
              <Icon className="size-4 shrink-0 text-milk" />
              <span>{text}</span>
            </li>
          ))}
        </ol>

        <div className="relative mt-5">
          <textarea
            ref={textRef}
            readOnly
            value={message}
            rows={6}
            aria-label="Your order message"
            className="w-full resize-none rounded-2xl bg-cream p-4 pr-24 text-xs leading-relaxed text-brown outline-none focus:ring-2 focus:ring-milk/50"
          />
          <button
            type="button"
            onClick={copyAgain}
            className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-offwhite px-3 py-1.5 font-heading text-xs font-medium text-deep shadow-soft transition hover:bg-blush"
          >
            {copied ? <CircleCheck className="size-3.5 text-milk" /> : <Copy className="size-3.5" />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        {!copied && <p className="mt-1 text-xs text-[#B4412E]">Couldn&apos;t copy automatically – tap “Copy”, or select the text above and copy it.</p>}

        {url ? (
          <a
            ref={openRef}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onOpen}
            className="mt-5 flex h-13 min-h-[3.25rem] items-center justify-center gap-2 rounded-full bg-deep font-heading text-base font-medium text-offwhite shadow-lift transition-colors hover:bg-brown"
          >
            <InstagramIcon className="size-5" /> Open Instagram chat
          </a>
        ) : (
          <p className="mt-5 rounded-2xl bg-cream p-4 text-center text-sm text-brown">Our Instagram link is coming soon – please send this on WhatsApp meanwhile.</p>
        )}
      </motion.div>
    </motion.div>
  );
}
