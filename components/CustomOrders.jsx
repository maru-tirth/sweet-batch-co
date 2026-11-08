"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Cake, Gift, PartyPopper, Palette, Sparkles, Package, Heart as HeartIcon, Send, CircleCheck, RotateCcw } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { DripEdge, Heart, Sparkle } from "@/components/ui/Decor";
import { WhatsAppIcon, InstagramIcon } from "@/components/ui/BrandIcons";
import { WhatsAppButton, InstagramButton } from "@/components/ui/OrderButtons";
import ChocolateArt from "@/components/art/ChocolateArt";
import GiftBox from "@/components/art/GiftBox";
import { customMessage, whatsappUrl } from "@/lib/orders";
import { useToast } from "@/components/Providers";
import { SELECT_ARROW } from "@/lib/styles";
import { chocolates } from "@/data/chocolates";

const highlights = [
  [Palette, "Customised chocolates"],
  [Sparkles, "Personalised designs"],
  [Cake, "Birthday chocolates"],
  [HeartIcon, "Special occasions"],
  [PartyPopper, "Celebration chocolates"],
  [Gift, "Custom gifting"],
  [Package, "Personalised boxes"],
];

const occasions = ["Birthday", "Anniversary", "Festival", "Wedding / Engagement", "Baby Shower", "Corporate Gifting", "Thank You Gift", "Other"];
const chocolateTypes = [...chocolates.map((c) => c.name), "Chocolate Modaks", "Assorted / Mix", "Not sure – please suggest"];

const empty = { name: "", phone: "", occasion: "", chocolateType: "", quantity: "", details: "", platform: "whatsapp" };

function validate(f) {
  const e = {};
  if (f.name.trim().length < 2) e.name = "Please enter your name.";
  const digits = f.phone.replace(/\D/g, "");
  if (!/^(91)?[6-9]\d{9}$/.test(digits)) e.phone = "Please enter a valid 10-digit mobile number.";
  if (!f.occasion) e.occasion = "Please choose an occasion.";
  if (!f.chocolateType) e.chocolateType = "Please choose a chocolate type.";
  if (!f.quantity.trim()) e.quantity = "Please tell us how many you need.";
  if (f.details.trim().length < 10) e.details = "Please share a few details (at least 10 characters).";
  return e;
}

const inputBase =
  "mt-1.5 w-full rounded-2xl bg-cream px-4 text-[15px] text-deep placeholder:text-milk/60 outline-none ring-milk/50 transition focus:bg-offwhite focus:ring-2";

function Field({ label, error, id, children }) {
  return (
    <div>
      <label htmlFor={id} className="font-heading text-sm font-medium text-brown">
        {label} <span className="text-milk">*</span>
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p id={`${id}-err`} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-1 text-xs text-[#B4412E]">
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function CustomOrders() {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(null); // { message, platform }
  const { startInstagramOrder } = useToast();

  const update = (k) => (e) => {
    const v = e.target.value;
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      document.getElementById(`co-${first}`)?.focus();
      return;
    }
    const message = customMessage(form);
    if (form.platform === "whatsapp") {
      window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
    } else {
      startInstagramOrder(message);
    }
    setSent({ message, platform: form.platform });
  };

  const err = (k) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `co-${k}-err` : undefined });

  return (
    <section id="custom" className="relative overflow-hidden bg-cream grain pb-24 sm:pb-32">
      <DripEdge className="block h-14 w-full sm:h-20" color="#4A1F0F" />
      <Sparkle className="absolute right-[6%] top-40 size-6 animate-float text-milk/40" />

      <div className="mx-auto mt-14 max-w-7xl px-5 sm:mt-20 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          {/* Intro */}
          <div>
            <SectionHeading
              className="lg:mx-0 lg:text-left lg:[&>div>div]:justify-start"
              eyebrow="made just for you"
              title="Your Chocolates, Your Way!"
              subtitle="Have something special in mind? Let's create chocolates made just for you."
            />

            <ul className="mt-8 flex flex-wrap justify-center gap-2.5 lg:justify-start">
              {highlights.map(([Icon, label], i) => (
                <Reveal as="li" key={label} delay={i * 0.05}>
                  <span className="flex items-center gap-2 rounded-full bg-offwhite px-4 py-2 font-heading text-sm font-medium text-deep shadow-soft">
                    <Icon className="size-4 text-milk" /> {label}
                  </span>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={0.1}>
              <div className="relative mx-auto mt-10 aspect-[16/10] max-w-lg overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-blush to-caramel shadow-card lg:mx-0">
                <GiftBox className="absolute bottom-[4%] left-[6%] w-[46%]" />
                <ChocolateArt base="#4A1F0F" drizzle="#E7C3B2" topping="rose" className="absolute right-[24%] top-[8%] w-[30%] animate-float" />
                <ChocolateArt base="#FBEFDD" drizzle="#8F5B45" topping="tutifruti" className="absolute bottom-[6%] right-[4%] w-[32%] animate-float-slow" />
                <span className="absolute left-[8%] top-[10%] -rotate-6 rounded-xl bg-offwhite px-3 py-1.5 font-hand text-2xl text-deep shadow-soft">
                  Happy Birthday!
                </span>
                <Heart filled className="absolute right-[8%] top-[12%] size-7 text-offwhite" />
              </div>
              <p className="mt-3 text-center text-xs text-milk lg:text-left">Illustrative example – tell us your idea and we&apos;ll work out what&apos;s possible.</p>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={0.1}>
            <div className="relative rounded-[2.5rem] bg-offwhite p-6 shadow-lift sm:p-9">
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div key="done" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center py-6 text-center">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 14 }} className="grid size-20 place-items-center rounded-full bg-cream">
                      <CircleCheck className="size-10 text-milk" />
                    </motion.div>
                    <h3 className="mt-5 font-heading text-2xl font-semibold text-deep">Your enquiry is ready to send!</h3>
                    <p className="mt-2 max-w-sm text-[15px] text-brown">
                      {sent.platform === "whatsapp"
                        ? "We've opened WhatsApp with your details filled in – just tap send."
                        : "We've copied your enquiry – paste it into our Instagram chat and send."}{" "}
                      This is an enquiry, not a confirmed order – we&apos;ll reply with possibilities and pricing.
                    </p>
                    <pre className="mt-5 max-h-48 w-full overflow-auto whitespace-pre-wrap rounded-2xl bg-cream p-4 text-left font-body text-xs leading-relaxed text-brown">{sent.message}</pre>
                    <div className="mt-5 grid w-full gap-2 sm:grid-cols-2">
                      <WhatsAppButton message={sent.message} label="Send on WhatsApp" />
                      <InstagramButton message={sent.message} label="Send on Instagram" />
                    </div>
                    <button type="button" onClick={() => { setSent(null); setForm(empty); }} className="mt-4 inline-flex items-center gap-1.5 text-sm text-milk hover:text-deep">
                      <RotateCcw className="size-3.5" /> Start a new enquiry
                    </button>
                  </motion.div>
                ) : (
                  <motion.form key="form" noValidate onSubmit={onSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <h3 className="font-heading text-2xl font-semibold text-deep">Custom Order Enquiry</h3>
                      <p className="mt-1 text-sm text-brown">Fill this in and we&apos;ll prepare a message for you to send.</p>
                    </div>

                    <Field label="Your Name" id="co-name" error={errors.name}>
                      <input id="co-name" autoComplete="name" value={form.name} onChange={update("name")} placeholder="e.g. Priya" className={`${inputBase} h-12`} {...err("name")} />
                    </Field>
                    <Field label="Contact Number" id="co-phone" error={errors.phone}>
                      <input id="co-phone" type="tel" inputMode="tel" autoComplete="tel" value={form.phone} onChange={update("phone")} placeholder="10-digit mobile number" className={`${inputBase} h-12`} {...err("phone")} />
                    </Field>
                    <Field label="Occasion" id="co-occasion" error={errors.occasion}>
                      <select id="co-occasion" value={form.occasion} onChange={update("occasion")} style={{ backgroundImage: SELECT_ARROW }} className={`${inputBase} h-12 cursor-pointer appearance-none bg-[length:18px] bg-[right_16px_center] bg-no-repeat ${form.occasion ? "" : "text-milk/70"}`} {...err("occasion")}>
                        <option value="" disabled>Select an occasion</option>
                        {occasions.map((o) => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </Field>
                    <Field label="Type of Chocolate" id="co-chocolateType" error={errors.chocolateType}>
                      <select id="co-chocolateType" value={form.chocolateType} onChange={update("chocolateType")} style={{ backgroundImage: SELECT_ARROW }} className={`${inputBase} h-12 cursor-pointer appearance-none bg-[length:18px] bg-[right_16px_center] bg-no-repeat ${form.chocolateType ? "" : "text-milk/70"}`} {...err("chocolateType")}>
                        <option value="" disabled>Select a type</option>
                        {chocolateTypes.map((o) => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </Field>
                    <div className="sm:col-span-2">
                      <Field label="Quantity Required" id="co-quantity" error={errors.quantity}>
                        <input id="co-quantity" value={form.quantity} onChange={update("quantity")} placeholder="e.g. 25 pieces or 2 boxes" className={`${inputBase} h-12`} {...err("quantity")} />
                      </Field>
                    </div>
                    <div className="sm:col-span-2">
                      <Field label="Customisation Details" id="co-details" error={errors.details}>
                        <textarea id="co-details" rows={4} value={form.details} onChange={update("details")} placeholder="Names, messages, colours, theme, packaging, date needed…" className={`${inputBase} resize-none py-3`} {...err("details")} />
                      </Field>
                    </div>

                    <fieldset className="sm:col-span-2">
                      <legend className="font-heading text-sm font-medium text-brown">Preferred Ordering Platform</legend>
                      <div className="mt-1.5 grid grid-cols-2 gap-2">
                        {[
                          ["whatsapp", "WhatsApp", WhatsAppIcon],
                          ["instagram", "Instagram", InstagramIcon],
                        ].map(([val, label, Icon]) => (
                          <label key={val} className={`flex h-12 cursor-pointer items-center justify-center gap-2 rounded-2xl font-heading text-[15px] font-medium transition ${form.platform === val ? "bg-deep text-offwhite shadow-soft" : "bg-cream text-brown hover:bg-caramel/60"}`}>
                            <input type="radio" name="platform" value={val} checked={form.platform === val} onChange={update("platform")} className="sr-only" />
                            <Icon className={`size-[18px] ${val === "whatsapp" && form.platform === val ? "text-whatsapp" : ""}`} /> {label}
                          </label>
                        ))}
                      </div>
                    </fieldset>

                    <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} type="submit" className="mt-2 inline-flex h-14 items-center justify-center gap-2 rounded-full bg-deep font-heading text-base font-medium text-offwhite shadow-lift transition-colors hover:bg-brown sm:col-span-2">
                      <Send className="size-4" /> Enquire for Custom Chocolates
                    </motion.button>
                    <p className="text-center text-xs text-milk sm:col-span-2">Submitting prepares a message – nothing is sent or confirmed automatically.</p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
