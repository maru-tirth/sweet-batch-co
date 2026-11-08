import Image from "next/image";
import ChocolateArt from "@/components/art/ChocolateArt";
import ModakArt from "@/components/art/ModakArt";

/**
 * Shows the real product photo when `item.image` is set, otherwise an illustration.
 */
export default function ProductVisual({ item, kind = "chocolate", sizes = "(max-width: 640px) 90vw, 320px", className = "", artClassName = "" }) {
  if (item.image) {
    return (
      <div className={`relative h-full w-full ${className}`}>
        <Image src={item.image} alt={`${item.name}${kind === "modak" ? " chocolate modak" : ""}`} fill sizes={sizes} className="object-cover" />
      </div>
    );
  }
  const label = `Illustration of ${item.name}${kind === "modak" ? " chocolate modak" : ""}`;
  return (
    <div
      className={`relative flex h-full w-full items-center justify-center ${className}`}
      style={{ background: `radial-gradient(circle at 50% 45%, #FFF7ED 0%, ${item.art.bg} 70%)` }}
    >
      {kind === "modak" ? (
        <ModakArt {...item.art} title={label} className={`h-[78%] w-[78%] ${artClassName}`} />
      ) : (
        <ChocolateArt {...item.art} title={label} className={`h-[80%] w-[80%] ${artClassName}`} />
      )}
    </div>
  );
}
