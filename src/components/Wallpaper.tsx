import { useEffect, useState } from "react";
import heroAsset from "@/assets/blockforge-world.jpg";

interface WallpaperProps {
  /** Image to show. Defaults to the voxel world used across the site. */
  src?: string;
  /**
   * How much the image drifts as the page scrolls, as a fraction of scroll
   * distance. Zero disables the parallax entirely.
   */
  parallax?: number;
  /**
   * Strength of the dark veil over the image, 0–1. Low enough that the
   * artwork stays clearly visible; panels above it carry their own blur.
   */
  veil?: number;
}

/**
 * Fixed, full-bleed background artwork.
 *
 * It is deliberately rendered at full opacity with a mild brightness lift —
 * the source is a dusk scene, so dimming it as well as veiling it made it
 * disappear. Readability comes from the translucent panels the content sits
 * on, not from drowning the wallpaper.
 */
/**
 * Vertical overscan, in pixels. The image is this much taller than the
 * viewport at both the top and the bottom, and the parallax offset is clamped
 * to the same value — so at drift 0 the overscan hangs off the top, at full
 * drift it hangs off the bottom, and the viewport is covered either way.
 */
const OVERSCAN = 220;

export function Wallpaper({ src = heroAsset, parallax = 0.14, veil = 0.34 }: WallpaperProps) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (parallax === 0) return;

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        setOffset(Math.min(window.scrollY * parallax, OVERSCAN));
        frame = 0;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [parallax]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <img
        src={src}
        width={1920}
        height={1080}
        alt=""
        className="absolute inset-x-0 w-full object-cover object-center will-change-transform"
        style={{
          top: -OVERSCAN,
          height: `calc(100% + ${OVERSCAN * 2}px)`,
          transform: `translate3d(0, ${offset}px, 0)`,
          filter: "brightness(1.32) saturate(1.12) contrast(1.02)",
        }}
      />

      {/* Flat veil: takes the edge off without hiding the artwork. */}
      <div className="absolute inset-0" style={{ background: `rgba(6, 12, 10, ${veil})` }} />

      {/* Corner vignette, so panels near the edges keep their contrast. */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_85%_at_50%_40%,transparent_35%,rgba(4,9,8,0.55)_100%)]" />
    </div>
  );
}
