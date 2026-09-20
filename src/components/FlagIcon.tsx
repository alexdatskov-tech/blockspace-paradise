import type { RegionCode } from "@/lib/plans";

interface FlagIconProps {
  code: RegionCode;
  className?: string;
}

/**
 * Inline 3:2 SVG flags for the regions we deploy in.
 *
 * Regional-indicator emoji are deliberately avoided: Windows ships no flag
 * glyphs, so emoji flags render as bare letter pairs there. Drawing them keeps
 * the icons identical on every platform.
 */
export function FlagIcon({ code, className = "h-3.5 w-5" }: FlagIconProps) {
  const shared = `${className} shrink-0 rounded-[2px] ring-1 ring-black/25`;

  switch (code) {
    case "NL":
      return (
        <svg viewBox="0 0 24 16" className={shared} role="img" aria-label="Netherlands">
          <rect width="24" height="16" fill="#fff" />
          <rect width="24" height="5.33" fill="#ae1c28" />
          <rect y="10.67" width="24" height="5.33" fill="#21468b" />
        </svg>
      );

    case "PL":
      return (
        <svg viewBox="0 0 24 16" className={shared} role="img" aria-label="Poland">
          <rect width="24" height="16" fill="#fff" />
          <rect y="8" width="24" height="8" fill="#dc143c" />
        </svg>
      );

    case "IT":
      return (
        <svg viewBox="0 0 24 16" className={shared} role="img" aria-label="Italy">
          <rect width="24" height="16" fill="#f1f5f2" />
          <rect width="8" height="16" fill="#008c45" />
          <rect x="16" width="8" height="16" fill="#cd212a" />
        </svg>
      );

    case "FI":
      return (
        <svg viewBox="0 0 24 16" className={shared} role="img" aria-label="Finland">
          <rect width="24" height="16" fill="#fff" />
          <rect y="6" width="24" height="4" fill="#003580" />
          <rect x="7" width="4" height="16" fill="#003580" />
        </svg>
      );

    case "US":
      return (
        <svg viewBox="0 0 24 16" className={shared} role="img" aria-label="United States">
          <rect width="24" height="16" fill="#fff" />
          {[0, 2, 4, 6, 8, 10, 12].map((y) => (
            <rect key={y} y={y * (16 / 13)} width="24" height={16 / 13} fill="#b22234" />
          ))}
          <rect width="10" height={(16 / 13) * 7} fill="#3c3b6e" />
          {[1.1, 3.3, 5.5].map((y) =>
            [1.2, 3.2, 5.2, 7.2].map((x) => (
              <circle key={`${x}-${y}`} cx={x + 0.6} cy={y + 0.7} r="0.62" fill="#fff" />
            )),
          )}
        </svg>
      );

    default:
      return null;
  }
}
