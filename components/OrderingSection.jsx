import { Phone, MessageCircleHeart, Search, ListChecks, Send } from "lucide-react";
import { brand } from "@/config/brand";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { WhatsAppButton, InstagramButton } from "@/components/ui/OrderButtons";
import { Heart, Sparkle } from "@/components/ui/Decor";
import { WhatsAppIcon, InstagramIcon } from "@/components/ui/BrandIcons";
import { generalMessage, telUrl } from "@/lib/orders";

const steps = [
  [Search, "Explore", "Browse our chocolates & modaks."],
  [ListChecks, "Choose", "Pick quantity or packaging and see your total."],
  [Send, "Send", "Tap WhatsApp or Instagram to send your order."],
  [MessageCircleHeart, "Confirm", "We'll confirm availability & delivery with you."],
];

export default function OrderingSection() {
  const ig = brand.instagram;
  return (
    <>
      {/* Unified ordering */}
      <section id="order" className="relative overflow-hidden bg-offwhite py-24 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <SectionHeading eyebrow="it's easy" title="Order Your Favourites" subtitle="No checkout, no fuss – just send us a message." />
          <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(([Icon, title, text], i) => (
              <Reveal as="li" key={title} delay={i * 0.08} className="relative rounded-[2rem] bg-cream p-6 text-center">
                <span className="absolute right-5 top-4 font-display text-3xl text-blush">{i + 1}</span>
                <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-offwhite text-milk shadow-soft">
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-4 font-heading text-xl font-semibold text-deep">{title}</h3>
                <p className="mt-1 text-sm text-brown">{text}</p>
              </Reveal>
            ))}
          </ol>
          <Reveal delay={0.2}>
            <div className="mx-auto mt-12 flex max-w-xl flex-col gap-3 sm:flex-row">
              <WhatsAppButton message={generalMessage()} size="lg" className="flex-1" />
              <InstagramButton message={generalMessage()} size="lg" className="flex-1" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* WhatsApp CTA + contact */}
      <section id="contact" className="relative overflow-hidden bg-cream px-5 py-24 sm:px-8 sm:py-28">
        <Reveal>
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.75rem] bg-deep px-6 py-14 text-center shadow-lift sm:px-14 sm:py-20">
            <div className="pointer-events-none absolute -left-20 -top-20 size-72 rounded-full bg-milk/40 blur-3xl" aria-hidden="true" />
            <div className="pointer-events-none absolute -bottom-24 -right-16 size-80 rounded-full bg-brown blur-3xl" aria-hidden="true" />
            <Heart filled className="absolute left-[10%] top-12 size-8 animate-float text-blush/70" />
            <Sparkle className="absolute right-[12%] top-16 size-7 animate-float-slow text-caramel" />
            <Heart className="absolute bottom-12 right-[18%] size-6 animate-float text-caramel/70" />

            <div className="relative">
              <span className="mx-auto grid size-16 place-items-center rounded-full bg-offwhite/10 text-whatsapp ring-1 ring-offwhite/20">
                <WhatsAppIcon className="size-8" />
              </span>
              <h2 className="mt-6 text-balance font-display text-4xl leading-tight tracking-wide text-offwhite sm:text-6xl">Sweet Cravings? Let&apos;s Chat!</h2>
              <p className="mx-auto mt-4 max-w-md text-lg text-cream/85">Have questions or want to place an order? We&apos;re just one message away!</p>
              <div className="mt-8 flex justify-center">
                <WhatsAppButton message={generalMessage()} size="lg" variant="light" />
              </div>

              <div className="mx-auto mt-12 grid max-w-2xl gap-3 text-left sm:grid-cols-2">
                <a href={telUrl()} className="flex items-center gap-3 rounded-2xl bg-offwhite/8 p-4 ring-1 ring-offwhite/15 transition hover:bg-offwhite/12">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-caramel text-deep">
                    <Phone className="size-5" />
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-wider text-caramel">Call / WhatsApp · {brand.whatsapp.contactName}</span>
                    <span className="font-heading text-lg font-semibold text-offwhite">{brand.whatsapp.display}</span>
                  </span>
                </a>
                <div className="flex items-center gap-3 rounded-2xl bg-offwhite/8 p-4 ring-1 ring-offwhite/15">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-blush text-deep">
                    <InstagramIcon className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs uppercase tracking-wider text-caramel">Instagram</span>
                    {ig.username ? (
                      <a href={ig.profileUrl || `https://www.instagram.com/${ig.username}/`} target="_blank" rel="noopener noreferrer" className="font-heading text-lg font-semibold text-offwhite hover:underline">
                        @{ig.username}
                      </a>
                    ) : (
                      <span className="font-heading text-lg font-semibold text-offwhite/80">Coming soon</span>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
