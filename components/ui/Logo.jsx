import Image from "next/image";
import { brand } from "@/config/brand";

export default function Logo({ size = 48, className = "", priority = false }) {
  return (
    <span
      className={`relative inline-block shrink-0 overflow-hidden rounded-full ring-2 ring-offwhite/80 shadow-soft ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={brand.logo.src}
        alt={brand.logo.alt}
        fill
        sizes={`${size}px`}
        priority={priority}
        className="scale-[1.04] object-cover"
      />
    </span>
  );
}
