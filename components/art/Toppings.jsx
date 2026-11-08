/* Topping decorations shared by chocolate & modak illustrations. (cx, cy) = centre of the top area. */

const Almond = ({ x, y, r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r})`}>
    <ellipse rx="9" ry="4.6" fill="#EBCFA9" stroke="#B88B62" strokeWidth="1.2" />
    <path d="M-6 0 Q0 -2 6 0" stroke="#C9A27E" strokeWidth="1" fill="none" />
  </g>
);

const Bit = ({ x, y, c, r = 0, s = 6 }) => (
  <rect x={x - s / 2} y={y - s / 2} width={s} height={s} rx="1.6" fill={c} transform={`rotate(${r} ${x} ${y})`} />
);

const Petal = ({ x, y, r = 0, c = "#E7A3A0" }) => (
  <g transform={`translate(${x} ${y}) rotate(${r})`}>
    <path d="M0 -8 C6 -6 7 3 0 8 C-7 3 -6 -6 0 -8Z" fill={c} />
    <path d="M0 -6 L0 6" stroke="#fff" strokeOpacity=".35" strokeWidth="1" />
  </g>
);

export default function Toppings({ type, cx = 100, cy = 78, accent = "#E8C9A8" }) {
  switch (type) {
    case "almond":
      return (
        <g>
          <Almond x={cx - 20} y={cy + 4} r={-25} />
          <Almond x={cx + 2} y={cy - 6} r={10} />
          <Almond x={cx + 22} y={cy + 6} r={35} />
          <Almond x={cx - 2} y={cy + 12} r={-5} />
        </g>
      );
    case "paan":
      return (
        <g>
          <path d={`M${cx - 6} ${cy - 10} C${cx + 14} ${cy - 22} ${cx + 26} ${cy - 2} ${cx + 10} ${cy + 8} C${cx} ${cy + 2} ${cx - 10} ${cy - 2} ${cx - 6} ${cy - 10}Z`} fill="#7FAF5A" />
          <path d={`M${cx - 4} ${cy - 8} Q${cx + 8} ${cy - 6} ${cx + 10} ${cy + 6}`} stroke="#5E8E3E" strokeWidth="1.4" fill="none" />
          <Bit x={cx - 22} y={cy + 6} c="#B9D49A" r={20} />
          <Bit x={cx - 12} y={cy + 14} c="#E7A3A0" r={-15} s={5} />
          <Bit x={cx + 20} y={cy + 14} c="#F5D27A" r={30} s={5} />
          <Bit x={cx + 4} y={cy + 16} c="#B9D49A" r={10} s={5} />
        </g>
      );
    case "swirl":
      return (
        <g>
          <path
            d={`M${cx} ${cy + 6} c-10 0 -12 -14 0 -16 c14 -2 18 18 2 22 c-18 4 -26 -22 -6 -30`}
            stroke={accent}
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx={cx + 22} cy={cy + 10} r="5" fill="#A86B3C" />
          <circle cx={cx - 22} cy={cy + 12} r="4" fill="#A86B3C" />
        </g>
      );
    case "tutifruti":
      return (
        <g>
          <Bit x={cx - 22} y={cy + 6} c="#E5484D" r={15} />
          <Bit x={cx - 8} y={cy - 4} c="#7BC67B" r={-20} />
          <Bit x={cx + 8} y={cy + 6} c="#F5C044" r={30} />
          <Bit x={cx + 22} y={cy - 2} c="#F08A4B" r={-10} />
          <Bit x={cx - 2} y={cy + 16} c="#E5484D" r={40} s={5} />
          <Bit x={cx + 18} y={cy + 16} c="#7BC67B" r={5} s={5} />
          <Bit x={cx - 18} y={cy + 18} c="#F5C044" r={-30} s={5} />
        </g>
      );
    case "rose":
      return (
        <g>
          <Petal x={cx - 16} y={cy + 6} r={-40} />
          <Petal x={cx + 2} y={cy - 4} r={10} c="#D9787A" />
          <Petal x={cx + 18} y={cy + 8} r={50} />
          <Petal x={cx} y={cy + 14} r={-10} c="#F0B9B6" />
        </g>
      );
    case "dryfruit":
      return (
        <g>
          <Almond x={cx - 16} y={cy + 6} r={-30} />
          <Almond x={cx + 16} y={cy + 8} r={30} />
          <Bit x={cx} y={cy - 2} c="#9BC27A" r={20} s={7} />
          <Bit x={cx - 4} y={cy + 16} c="#9BC27A" r={-10} s={5} />
          <circle cx={cx + 6} cy={cy + 14} r="3.5" fill="#7A3B2A" />
        </g>
      );
    case "coconut":
      return (
        <g fill="#FFF7ED">
          {[[-22, 6, 20], [-10, -4, -30], [4, 8, 10], [18, -2, 40], [24, 12, -15], [-4, 16, 60], [-18, 16, -10], [10, 18, 25]].map(([dx, dy, r], i) => (
            <rect key={i} x={cx + dx - 4} y={cy + dy - 1.5} width="8" height="3" rx="1.5" transform={`rotate(${r} ${cx + dx} ${cy + dy})`} />
          ))}
        </g>
      );
    default:
      return null;
  }
}
