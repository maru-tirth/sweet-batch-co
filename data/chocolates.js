/**
 * Chocolate catalogue. Prices are per piece.
 * To use a real photo, drop it in /public/images/chocolates/ and set `image`
 * (e.g. "/images/chocolates/milk.jpg"). While `image` is null, an
 * illustration is shown instead.
 *
 * `art` controls the illustration: base/drizzle colours + topping style.
 */

export const chocolateFilters = [
  { id: "all", label: "All Chocolates" },
  { id: "milk", label: "Milk Chocolate" },
  { id: "dark", label: "Dark Chocolate" },
  { id: "white", label: "White Chocolate" },
  { id: "nut", label: "Nut & Dry Fruit" },
  { id: "special", label: "Special Flavours" },
];

export const chocolates = [
  {
    id: "milk-chocolate",
    name: "Milk Chocolate",
    weight: "18 gm",
    price: 15,
    categories: ["milk"],
    description: "Smooth, creamy and comforting – the classic everyone loves.",
    image: "/images/chocolates/milk-chocolate.jpg",
    art: { base: "#8F5B45", drizzle: "#E8C9A8", topping: "none", bg: "#F9E9D8" },
  },
  {
    id: "dark-chocolate",
    name: "Dark Chocolate",
    weight: "18 gm",
    price: 15,
    categories: ["dark"],
    description: "Rich and intense, for those who like their chocolate bold.",
    image: "/images/chocolates/dark-chocolate.jpg",
    art: { base: "#3A170B", drizzle: "#8F5B45", topping: "none", bg: "#E8C9A8" },
  },
  {
    id: "white-chocolate",
    name: "White Chocolate",
    weight: "18 gm",
    price: 15,
    categories: ["white"],
    description: "Sweet, milky and melt-in-your-mouth soft.",
    image: "/images/chocolates/white-chocolate.jpg",
    art: { base: "#FBEFDD", drizzle: "#8F5B45", topping: "none", bg: "#E7C3B2" },
  },
  {
    id: "almond-chocolate",
    name: "Almond Chocolate",
    weight: "19 gm",
    price: 20,
    categories: ["nut"],
    description: "Chocolate with a lovely almond crunch in every bite.",
    image: "/images/chocolates/almond-chocolate.jpg",
    art: { base: "#6B3321", drizzle: "#E8C9A8", topping: "almond", bg: "#F9E9D8" },
  },
  {
    id: "paan-chocolate",
    name: "Paan Chocolate",
    weight: "19 gm",
    price: 20,
    categories: ["special"],
    description: "A refreshing paan twist wrapped in chocolatey goodness.",
    image: "/images/chocolates/paan-chocolate.jpg",
    art: { base: "#6B3321", drizzle: "#B9D49A", topping: "paan", bg: "#E8C9A8" },
  },
  {
    id: "nutella-chocolate",
    name: "Nutella Chocolate",
    weight: "19 gm",
    price: 20,
    categories: ["special"],
    description: "Chocolate filled with a generous, gooey Nutella heart.",
    image: "/images/chocolates/nutella-chocolate.jpg",
    art: { base: "#4A1F0F", drizzle: "#A0674B", topping: "swirl", bg: "#E7C3B2" },
  },
  {
    id: "tutifruti-chocolate",
    name: "Tutifruti Chocolate",
    weight: "19 gm",
    price: 20,
    categories: ["nut", "special"],
    description: "Colourful tutifruti bits for a fun, fruity bite.",
    image: "/images/chocolates/tutifruti-chocolate.jpg",
    art: { base: "#8F5B45", drizzle: "#F9E9D8", topping: "tutifruti", bg: "#F9E9D8" },
  },
  {
    id: "rose-chocolate",
    name: "Rose Chocolate",
    weight: "19 gm",
    price: 20,
    categories: ["special"],
    description: "Delicately floral rose notes with a soft chocolate finish.",
    image: "/images/chocolates/rose-chocolate.jpg",
    art: { base: "#6B3321", drizzle: "#E7A3A0", topping: "rose", bg: "#E7C3B2" },
  },
];
