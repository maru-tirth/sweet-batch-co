/**
 * Chocolate Modak catalogue – prices from the supplied price-list image.
 *
 * ⚠️ PACKAGING LABEL TO CONFIRM:
 * The original price list labels the third column "Small – 21 pcs", which costs
 * the same as the 11-piece box. This looks inconsistent, so the option is marked
 * `needsConfirmation: true` and the site shows a gentle "please confirm" note.
 * Once confirmed, update `label` / `pieces` below and set `needsConfirmation: false`.
 */

export const modakPacks = [
  { id: "box11", label: "Box", pieces: 11, needsConfirmation: false },
  { id: "box21", label: "Box", pieces: 21, needsConfirmation: false },
  { id: "small21", label: "Small", pieces: 21, needsConfirmation: true },
];

export const modakPackNotice =
  "The “Small – 21 pcs” pack size is being confirmed. Please check the exact pack details with us when you order.";

export const modaks = [
  {
    id: "dark-chocolate-modak",
    name: "Dark Chocolate",
    prices: { box11: 120, box21: 240, small21: 120 },
    description: "Bold, rich dark chocolate shaped into a festive modak.",
    image: "/images/modaks/dark-chocolate-modak.jpg",
    art: { base: "#3A170B", accent: "#8F5B45", topping: "none", bg: "#E8C9A8" },
  },
  {
    id: "white-chocolate-modak",
    name: "White Chocolate",
    prices: { box11: 130, box21: 260, small21: 130 },
    description: "Creamy white chocolate modaks, soft and sweet.",
    image: "/images/modaks/white-chocolate-modak.jpg",
    art: { base: "#FBEFDD", accent: "#E8C9A8", topping: "none", bg: "#E7C3B2" },
  },
  {
    id: "milk-chocolate-modak",
    name: "Milk Chocolate",
    prices: { box11: 120, box21: 240, small21: 120 },
    description: "Classic milk chocolate in a traditional modak shape.",
    image: null,
    art: { base: "#8F5B45", accent: "#E8C9A8", topping: "none", bg: "#F9E9D8" },
  },
  {
    id: "paan-chocolate-modak",
    name: "Paan Chocolate",
    prices: { box11: 160, box21: 310, small21: 160 },
    description: "A refreshing paan flavour meets chocolatey sweetness.",
    image: null,
    art: { base: "#6B3321", accent: "#B9D49A", topping: "paan", bg: "#E8C9A8" },
  },
  {
    id: "rose-chocolate-modak",
    name: "Rose Chocolate",
    prices: { box11: 160, box21: 310, small21: 160 },
    description: "Fragrant rose notes in a pretty chocolate modak.",
    image: "/images/modaks/rose-chocolate-modak.jpg",
    art: { base: "#6B3321", accent: "#E7A3A0", topping: "rose", bg: "#E7C3B2" },
  },
  {
    id: "almond-chocolate-modak",
    name: "Almond Chocolate",
    prices: { box11: 150, box21: 290, small21: 150 },
    description: "Chocolate modaks with a delightful almond crunch.",
    image: null,
    art: { base: "#6B3321", accent: "#E8C9A8", topping: "almond", bg: "#F9E9D8" },
  },
  {
    id: "dryfruit-chocolate-modak",
    name: "Dryfruit Chocolate",
    prices: { box11: 150, box21: 290, small21: 150 },
    description: "Loaded with dry fruits for a rich, festive bite.",
    image: null,
    art: { base: "#4A1F0F", accent: "#E8C9A8", topping: "dryfruit", bg: "#E8C9A8" },
  },
  {
    id: "coconut-bounty-chocolate-modak",
    name: "Coconut Bounty Chocolate",
    prices: { box11: 170, box21: 330, small21: 170 },
    description: "Coconut and chocolate – a tropical little treat.",
    image: null,
    art: { base: "#6B3321", accent: "#FFF7ED", topping: "coconut", bg: "#F9E9D8" },
  },
  {
    id: "nutella-chocolate-modak",
    name: "Nutella Chocolate",
    prices: { box11: 190, box21: 370, small21: 190 },
    description: "Chocolate modaks with a gooey Nutella centre.",
    image: "/images/modaks/nutella-chocolate-modak.jpg",
    art: { base: "#4A1F0F", accent: "#A0674B", topping: "swirl", bg: "#E7C3B2" },
  },
  {
    id: "assorted-chocolate-modaks",
    name: "Assorted Chocolate Modaks",
    prices: { box11: 190, box21: 370, small21: 190 },
    description: "A happy mix of our flavours in one box.",
    image: "/images/modaks/assorted-chocolate-modaks.jpg",
    assorted: true,
    art: { base: "#6B3321", accent: "#E8C9A8", topping: "assorted", bg: "#F9E9D8" },
  },
];

export const getPack = (packId) => modakPacks.find((p) => p.id === packId);
export const packLabel = (pack) => `${pack.label} – ${pack.pieces} pcs`;
