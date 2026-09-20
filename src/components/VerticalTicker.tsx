import { useEffect, useState, type ReactNode } from "react";

interface VerticalTickerProps {
  items: ReactNode[];
  /** Milliseconds each item stays on screen. */
  interval?: number;
  className?: string;
  /** Row height in pixels; the viewport is clipped to exactly this. */
  rowHeight?: number;
}

/**
 * Cycles through `items` one at a time, sliding vertically rather than
 * scrolling sideways. Respects prefers-reduced-motion by holding the first
 * item still.
 */
export function VerticalTicker({
  items,
  interval = 3200,
  className = "",
  rowHeight = 18,
}: VerticalTickerProps) {
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setAnimate(false);
      return;
    }

    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, interval);

    return () => window.clearInterval(timer);
  }, [items.length, interval]);

  if (!animate) {
    return (
      <div className={className} style={{ height: rowHeight }}>
        <div className="flex h-full items-center">{items[0]}</div>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden ${className}`} style={{ height: rowHeight }}>
      <div
        className="transition-transform duration-500 ease-out"
        style={{ transform: `translateY(-${index * rowHeight}px)` }}
      >
        {items.map((item, itemIndex) => (
          <div
            // Items are static content in a fixed list, so the index is a stable key.
            key={itemIndex}
            className="flex items-center"
            style={{ height: rowHeight }}
            aria-hidden={itemIndex !== index}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
