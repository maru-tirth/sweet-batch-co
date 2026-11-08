/** Illustrated gift box with ribbon. */
export default function GiftBox({ className = "" }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <ellipse cx="100" cy="176" rx="72" ry="10" fill="#4A1F0F" opacity="0.15" />
      <rect x="36" y="84" width="128" height="90" rx="10" fill="#6B3321" />
      <rect x="28" y="64" width="144" height="30" rx="8" fill="#8F5B45" />
      <rect x="90" y="64" width="20" height="110" fill="#E7C3B2" />
      <rect x="36" y="94" width="128" height="6" fill="#4A1F0F" opacity="0.25" />
      <path d="M100 64 C80 30 52 40 62 58 C68 68 86 66 100 64Z" fill="#E7C3B2" />
      <path d="M100 64 C120 30 148 40 138 58 C132 68 114 66 100 64Z" fill="#E8C9A8" />
      <circle cx="100" cy="64" r="9" fill="#F9E9D8" />
      <path d="M86 128 c0 -7 10 -9 14 -2 c4 -7 14 -5 14 2 c0 8 -14 16 -14 16 s-14 -8 -14 -16Z" fill="#F9E9D8" />
    </svg>
  );
}
