# SWEETBATCHCO – Online Chocolate Catalogue

A premium, animated, fully responsive product catalogue for **SWEETBATCHCO** homemade chocolates and chocolate modaks. Customers browse, pick a quantity or pack, see their total, and send the order on **WhatsApp** (main channel) or **Instagram** (second channel). There is no checkout: every order is confirmed by the brand in chat.

**Stack:** Next.js 16 (App Router) · React 19 · plain JavaScript JSX (no TypeScript) · Tailwind CSS v4 · Motion (Framer Motion) · Lucide React · Google Fonts via `next/font`.

## Run locally

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev        # http://localhost:3000
```

For a production build: `npm run build && npm start`.

## Project structure

```text
app/
  layout.jsx          fonts, metadata, providers
  page.jsx            assembles all sections (Server Component)
  globals.css         Tailwind theme: brand colours, fonts, shadows, keyframes
  icon.png            favicon (from the logo)
components/
  Loader, Navbar, Hero, OurStory, ChocolateCollection, ProductCard,
  ModakCollection, ModakCard, ModakPricing, QuickView, CustomOrders,
  OrderingSection, Footer, FloatingWhatsApp, BackToTop, Providers (toasts + reduced motion)
  ui/                 Logo, OrderButtons, QuantitySelector, PackSelector, ProductVisual,
                      Reveal, SectionHeading, Decor (hearts/sparkles/drips), BrandIcons
  art/                SVG product illustrations (chocolate, modak, bar, gift box)
config/brand.js       ← ALL business details (name, logo, colours, WhatsApp, Instagram)
data/chocolates.js    ← chocolate flavours, weights, prices, filters
data/modaks.js        ← modak flavours, pack sizes, prices
data/story.js         ← "Our Chocolate Story" copy
lib/orders.js         WhatsApp/Instagram message + link builders, price formatting
public/logo/          logo file
public/images/        product photos (chocolates/, modaks/) and gallery shots (gallery/)
scripts/process_images.py   re-creates the edited photos from the original WhatsApp images
```

## Before you publish – please confirm or fill in

1. **The "Small – 21 pcs" modak pack.** The supplied price list has a third column, "Small 21 pcs", that costs the same as the 11-piece box. This looks inconsistent. The site keeps the label and prices exactly as supplied, but marks this pack with `*` and shows a "please confirm" note. Once you've checked it, update `modakPacks` in `data/modaks.js` and set `needsConfirmation: false`. The note then disappears everywhere.
2. **Which photo is which flavour.** All 8 chocolates and 5 modaks (Dark, White, Rose, Nutella, Assorted) use real photos. The chocolate photos were matched to flavours in the order of the price list. The pink modaks are assumed to be Rose. To swap a photo, change that product's `image` path in `data/chocolates.js` or `data/modaks.js`.
3. **Modaks still shown as illustrations:** Milk, Paan, Almond, Dryfruit and Coconut Bounty. To replace them, add a photo to `public/images/modaks/` and set the product's `image` field.
4. **Story copy.** `data/story.js` has neutral placeholder text with no founder history or achievements. Edit it freely.
5. **Logo.** Only one logo (the round badge) was supplied, at `public/logo/sweetbatchco-badge.png`. To use a different file, replace it or change `brand.logo` in `config/brand.js`.
6. **Site URL.** Set `NEXT_PUBLIC_SITE_URL` when you deploy, so social-share previews link correctly.

## Editing photos

The original WhatsApp photos were edited by `scripts/process_images.py`. It crops each photo square, adjusts the colour (warmer, a little more saturation, lifted shadows), sharpens it, and on the chocolate shots adds a soft background blur and a cream-coloured vignette. That vignette hides the tray and background. To re-run it, for example with new photos, you need Python 3 with Pillow and numpy:

```bash
python3 scripts/process_images.py "/path/to/photo/folder"
```

Crop positions for each photo are listed at the top of the script.

## How ordering works

- **WhatsApp:** links use `https://wa.me/917498971201?text=...` with a pre-filled, encoded message. Chocolate messages include the product, weight, price per piece, quantity and total. Modak messages include the flavour, pack, pieces, price per box, number of boxes and total. Custom enquiries include every form field.
- **Instagram ([@sweetbatchco__](https://www.instagram.com/sweetbatchco__/)):** Instagram doesn't let any website pre-fill a DM (unlike WhatsApp). So "Order on Instagram" first copies the order message, then shows a short card: "Your message is copied", the message itself with a Copy button, paste instructions for phone and desktop, and an **Open Instagram chat** button (`https://ig.me/m/sweetbatchco__`). The customer pastes the message and sends it. If the DM link doesn't suit your account type, clear `dmUrl` in `config/brand.js` and the button will open your profile instead.
- **Custom order form:** checks every field (including a valid Indian mobile number), then opens WhatsApp or copies the message for Instagram. A success screen lets the customer resend on either platform. Nothing is confirmed automatically.

## Accessibility & motion

- The modal supports keyboard focus trapping, Esc to close, closing on outside click, and locks background scrolling.
- Product filters and pack selectors use ARIA tabs and radios.
- Animations are reduced when the visitor's system asks for reduced motion (`prefers-reduced-motion`).
