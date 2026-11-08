/**
 * SWEETBATCHCO – central brand configuration.
 * Every business detail used across the site lives here.
 * Update this file only; components read from it.
 */

export const brand = {
  name: "SWEETBATCHCO",
  shortDescription:
    "Homemade chocolates and chocolate modaks, handcrafted in small batches and shared with lots of love.",
  tagline: "Handcrafted with Love. Shared with Happiness.",
  finalCta: "Life is Better with Chocolates.",

  logo: {
    src: "/logo/sweetbatchco-badge.png",
    alt: "SWEETBATCHCO – Homemade Chocolates logo",
    width: 800,
    height: 800,
  },

  colors: {
    deepChocolate: "#4A1F0F",
    chocolateBrown: "#6B3321",
    milkChocolate: "#8F5B45",
    caramelCream: "#E8C9A8",
    creamyBeige: "#F9E9D8",
    blushBeige: "#E7C3B2",
    offWhite: "#FFF7ED",
  },

  currency: "₹",

  // WhatsApp (from the supplied Modak catalogue)
  whatsapp: {
    contactName: "Arya",
    countryCode: "91",
    number: "7498971201", // 10-digit number without country code
    display: "+91 74989 71201",
  },

  // Instagram – buttons copy the order message, then open the DM link
  // (falls back to the profile URL if dmUrl is emptied).
  instagram: {
    username: "sweetbatchco__",
    profileUrl: "https://www.instagram.com/sweetbatchco__/",
    dmUrl: "https://ig.me/m/sweetbatchco__",
  },
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Our Story", href: "#story" },
  { label: "Chocolates", href: "#chocolates" },
  { label: "Modaks", href: "#modaks" },
  { label: "Custom Chocolates", href: "#custom" },
  { label: "Contact", href: "#contact" },
];
