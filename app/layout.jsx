import { Lilita_One, Fredoka, Poppins, Caveat } from "next/font/google";
import "./globals.css";
import { brand } from "@/config/brand";
import Providers from "@/components/Providers";

const lilita = Lilita_One({ subsets: ["latin"], weight: "400", variable: "--font-lilita", display: "swap" });
const fredoka = Fredoka({ subsets: ["latin"], weight: ["500", "600"], variable: "--font-fredoka", display: "swap" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-poppins", display: "swap" });
const caveat = Caveat({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-caveat", display: "swap" });

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: `${brand.name} – Homemade Chocolates & Chocolate Modaks`,
  description:
    "Handcrafted chocolates, delightful chocolate modaks and customised chocolates – made with love. Order on WhatsApp or Instagram.",
  openGraph: {
    title: `${brand.name} – A Little Box of Happiness`,
    description: "Handcrafted chocolates, delightful modaks, and little moments of sweetness – made with love.",
    images: [brand.logo.src],
  },
};

export const viewport = {
  themeColor: "#F9E9D8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${lilita.variable} ${fredoka.variable} ${poppins.variable} ${caveat.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
