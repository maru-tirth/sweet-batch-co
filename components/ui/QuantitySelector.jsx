"use client";

import { Minus, Plus } from "lucide-react";

export default function QuantitySelector({ value, onChange, min = 1, max = 500, label = "Quantity", unit }) {
  const set = (v) => {
    const n = Number.isFinite(v) ? Math.min(max, Math.max(min, Math.round(v))) : min;
    onChange(n);
  };
  return (
    <div className="flex items-center gap-3">
      <span className="font-heading text-sm font-medium text-brown">{label}</span>
      <div className="flex items-center rounded-full bg-offwhite p-1 shadow-[inset_0_0_0_1.5px_var(--color-caramel)]">
        <button
          type="button"
          onClick={() => set(value - 1)}
          disabled={value <= min}
          aria-label="Decrease quantity"
          className="grid size-9 place-items-center rounded-full text-deep transition hover:bg-caramel active:scale-90 disabled:opacity-35 disabled:hover:bg-transparent"
        >
          <Minus className="size-4" />
        </button>
        <input
          type="number"
          inputMode="numeric"
          min={min}
          max={max}
          value={value}
          aria-label={label}
          onChange={(e) => set(parseInt(e.target.value, 10))}
          className="w-12 appearance-none bg-transparent text-center font-heading text-lg font-semibold text-deep outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]"
        />
        <button
          type="button"
          onClick={() => set(value + 1)}
          disabled={value >= max}
          aria-label="Increase quantity"
          className="grid size-9 place-items-center rounded-full text-deep transition hover:bg-caramel active:scale-90 disabled:opacity-35"
        >
          <Plus className="size-4" />
        </button>
      </div>
      {unit && <span className="text-sm text-milk">{unit}</span>}
    </div>
  );
}
