import { brand } from "@/config/brand";
import { getPack, packLabel } from "@/data/modaks";

export const formatPrice = (amount) =>
  `${brand.currency}${Number(amount).toLocaleString("en-IN")}`;

const greeting = `Hi ${brand.name}! `;
const closing = "\nPlease confirm availability and delivery details.\n\nThank you!";

export function generalMessage() {
  return `${greeting}I'd love to know more about your chocolates and modaks and place an order. 🍫`;
}

export function chocolateMessage(product, quantity) {
  return [
    `${greeting}I'd like to order:`,
    "",
    `Product: ${product.name}`,
    `Weight: ${product.weight}`,
    `Price: ${formatPrice(product.price)} per piece`,
    `Quantity: ${quantity}`,
    `Total: ${formatPrice(product.price * quantity)}`,
    closing,
  ].join("\n");
}

export function modakMessage(modak, packId, quantity) {
  const pack = getPack(packId);
  const price = modak.prices[packId];
  const lines = [
    `${greeting}I'd like to order Chocolate Modaks:`,
    "",
    `Flavour: ${modak.name}`,
    `Packaging: ${packLabel(pack)}`,
    `Pieces per box: ${pack.pieces}`,
    `Price: ${formatPrice(price)} per box`,
    `Quantity: ${quantity} box${quantity > 1 ? "es" : ""}`,
    `Total: ${formatPrice(price * quantity)}`,
  ];
  if (pack.needsConfirmation) lines.push("", "(Please confirm the exact details of this pack size.)");
  lines.push(closing);
  return lines.join("\n");
}

export function customMessage(form) {
  return [
    `${greeting}I'd like to enquire about customised chocolates:`,
    "",
    `Name: ${form.name}`,
    `Contact Number: ${form.phone}`,
    `Occasion: ${form.occasion}`,
    `Type of Chocolate: ${form.chocolateType}`,
    `Quantity Required: ${form.quantity}`,
    `Customisation Details: ${form.details}`,
    "",
    "Please let me know the possibilities, pricing and timeline.",
    "",
    "Thank you!",
  ].join("\n");
}

export function whatsappUrl(message) {
  const { countryCode, number } = brand.whatsapp;
  const phone = `${countryCode}${number}`.replace(/\D/g, "");
  return `https://wa.me/${phone}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
}

export function instagramUrl() {
  return brand.instagram.dmUrl || brand.instagram.profileUrl || null;
}

export function telUrl() {
  return `tel:+${brand.whatsapp.countryCode}${brand.whatsapp.number}`;
}

export async function copyText(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (_) {
    /* fall through */
  }
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch (_) {
    return false;
  }
}
