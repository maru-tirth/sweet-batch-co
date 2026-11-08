import { Phone } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { brand, navLinks } from "@/config/brand";
import { chocolates } from "@/data/chocolates";
import { modaks } from "@/data/modaks";
import { WhatsAppButton, InstagramButton } from "@/components/ui/OrderButtons";
import { Heart } from "@/components/ui/Decor";
import { DripEdge } from "@/components/ui/Decor";
import { generalMessage, telUrl, formatPrice } from "@/lib/orders";

export default function Footer() {
  const year = new Date().getFullYear();
  const minModak = Math.min(...modaks.flatMap((m) => Object.values(m.prices)));
  return (
    <footer className="relative bg-deep text-cream">
      <div className="bg-cream">
        <DripEdge className="block h-12 w-full rotate-180 sm:h-16" color="#4A1F0F" />
      </div>

      <div className="mx-auto max-w-7xl px-5 pb-28 pt-10 sm:px-8 sm:pb-12">
        <div className="text-center">
          <p className="font-hand text-2xl text-caramel">one last thing…</p>
          <p className="mt-1 text-balance font-display text-4xl tracking-wide text-offwhite sm:text-6xl">{brand.finalCta}</p>
        </div>

        <div className="mt-14 grid gap-10 border-t border-offwhite/10 pt-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <a href="#home" className="flex items-center gap-3" aria-label={`${brand.name} – back to top`}>
              <Logo size={64} />
              <span className="font-display text-2xl tracking-wide text-offwhite">{brand.name}</span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/75">{brand.shortDescription}</p>
            <p className="mt-4 flex items-center gap-2 font-hand text-xl text-caramel">
              <Heart filled className="size-4 text-blush" /> {brand.tagline}
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <h3 className="font-heading text-lg font-semibold text-offwhite">Explore</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-cream/75 transition hover:text-caramel">{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="font-heading text-lg font-semibold text-offwhite">Our Treats</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-cream/75">
              <li>
                <a href="#chocolates" className="transition hover:text-caramel">Chocolate Collection</a>
                <span className="block text-xs text-cream/50">{chocolates.length} flavours · from {formatPrice(Math.min(...chocolates.map((c) => c.price)))} per piece</span>
              </li>
              <li>
                <a href="#modaks" className="transition hover:text-caramel">Chocolate Modaks</a>
                <span className="block text-xs text-cream/50">{modaks.length} flavours · from {formatPrice(minModak)} per box</span>
              </li>
              <li>
                <a href="#custom" className="transition hover:text-caramel">Custom Chocolate Enquiries</a>
                <span className="block text-xs text-cream/50">Birthdays, gifting & celebrations</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-lg font-semibold text-offwhite">Order & Contact</h3>
            <a href={telUrl()} className="mt-4 flex items-center gap-2 text-sm text-cream/75 transition hover:text-caramel">
              <Phone className="size-4" /> {brand.whatsapp.contactName} · {brand.whatsapp.display}
            </a>
            <div className="mt-5 grid gap-2">
              <WhatsAppButton message={generalMessage()} size="sm" variant="light" />
              <InstagramButton message={generalMessage()} size="sm" variant="light" label={brand.instagram.username ? `@${brand.instagram.username}` : "Order on Instagram"} />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-2 border-t border-offwhite/10 pt-6 text-xs text-cream/50 sm:flex-row">
          <p>© {year} {brand.name}. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Homemade with <Heart filled className="size-3 text-blush" /> in small batches
          </p>
        </div>
      </div>
    </footer>
  );
}
