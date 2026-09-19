import React from "react";

interface PlanGlyphProps {
  type: "sprout" | "copper" | "iron" | "gold" | "diamond" | "netherite" | string;
  className?: string;
}

/**
 * Authentic 32x32 pixel-art isometric voxel block icons.
 * Specifically built for 32x32 resolution with crisp pixel rendering.
 */
export function PlanGlyph({ type, className = "" }: PlanGlyphProps) {
  const normalized = type.toLowerCase();

  return (
    <div
      className={`relative inline-flex size-8 shrink-0 items-center justify-center ${className}`}
      title={`${type} block icon (32x32)`}
    >
      {normalized === "sprout" && (
        /* Grass Block (32x32) */
        <svg
          viewBox="0 0 32 32"
          width="32"
          height="32"
          className="size-8 overflow-visible"
          shapeRendering="crispEdges"
        >
          {/* Top Face - Lush Green Grass */}
          <polygon points="16,2 30,9 16,16 2,9" fill="#5b8f36" />
          <polygon points="16,4 28,10 16,15 4,10" fill="#6ba642" />
          <rect x="15" y="6" width="2" height="2" fill="#84c852" />
          <rect x="10" y="8" width="2" height="2" fill="#84c852" />
          <rect x="20" y="8" width="2" height="2" fill="#4d7c2c" />

          {/* Left Face - Dirt with Grass Overhang */}
          <polygon points="2,9 16,16 16,30 2,23" fill="#694e33" />
          <rect x="4" y="15" width="2" height="2" fill="#523a23" />
          <rect x="10" y="20" width="2" height="2" fill="#7f6142" />
          <polygon points="2,9 16,16 16,19 14,18 12,20 10,17 7,19 5,16 2,17" fill="#4d7c2c" />
          <polygon points="2,9 16,16 16,17 12,15 7,16 2,13" fill="#5b8f36" />

          {/* Right Face - Shaded Dirt with Grass Overhang */}
          <polygon points="16,16 30,9 30,23 16,30" fill="#523a23" />
          <rect x="22" y="16" width="2" height="2" fill="#3e2a18" />
          <rect x="18" y="22" width="2" height="2" fill="#694e33" />
          <polygon points="16,16 30,9 30,15 27,17 25,15 22,18 19,16 16,18" fill="#3f6624" />
          <polygon points="16,16 30,9 30,13 25,14 20,13 16,16" fill="#4d7c2c" />
        </svg>
      )}

      {normalized === "copper" && (
        /* Cut Copper Block (32x32) */
        <svg
          viewBox="0 0 32 32"
          width="32"
          height="32"
          className="size-8 overflow-visible"
          shapeRendering="crispEdges"
        >
          {/* Top Face */}
          <polygon points="16,2 30,9 16,16 2,9" fill="#c06d50" />
          <polygon points="16,4 28,10 16,15 4,10" fill="#d97d5d" />
          <line x1="16" y1="4" x2="16" y2="15" stroke="#a35438" strokeWidth="1" />
          <line x1="4" y1="10" x2="28" y2="10" stroke="#a35438" strokeWidth="1" />

          {/* Left Face */}
          <polygon points="2,9 16,16 16,30 2,23" fill="#b05d40" />
          <line x1="9" y1="13" x2="9" y2="26" stroke="#8c442a" strokeWidth="1" />
          <line x1="2" y1="16" x2="16" y2="23" stroke="#8c442a" strokeWidth="1" />
          <rect x="4" y="18" width="2" height="2" fill="#c06d50" />

          {/* Right Face */}
          <polygon points="16,16 30,9 30,23 16,30" fill="#8f462c" />
          <line x1="23" y1="13" x2="23" y2="26" stroke="#6e311b" strokeWidth="1" />
          <line x1="16" y1="23" x2="30" y2="16" stroke="#6e311b" strokeWidth="1" />
          <rect x="25" y="18" width="2" height="2" fill="#a35438" />
        </svg>
      )}

      {normalized === "iron" && (
        /* Iron Block (32x32) */
        <svg
          viewBox="0 0 32 32"
          width="32"
          height="32"
          className="size-8 overflow-visible"
          shapeRendering="crispEdges"
        >
          {/* Top Face */}
          <polygon points="16,2 30,9 16,16 2,9" fill="#dce0e5" />
          <polygon points="16,4 27,9.5 16,14.5 5,9.5" fill="#f0f3f6" />
          <rect x="15" y="6" width="2" height="2" fill="#ffffff" />
          <rect x="20" y="8" width="2" height="2" fill="#ffffff" />

          {/* Left Face */}
          <polygon points="2,9 16,16 16,30 2,23" fill="#b8bdc5" />
          <polygon points="4,11 14,16 14,27 4,22" fill="#c9ced6" />
          <rect x="6" y="14" width="2" height="2" fill="#e5e9ef" />

          {/* Right Face */}
          <polygon points="16,16 30,9 30,23 16,30" fill="#9da3ac" />
          <polygon points="18,16 28,11 28,22 18,27" fill="#abb1bb" />
          <rect x="24" y="15" width="2" height="2" fill="#8e949e" />
        </svg>
      )}

      {normalized === "gold" && (
        /* Gold Block (32x32) */
        <svg
          viewBox="0 0 32 32"
          width="32"
          height="32"
          className="size-8 overflow-visible"
          shapeRendering="crispEdges"
        >
          {/* Top Face */}
          <polygon points="16,2 30,9 16,16 2,9" fill="#f6d337" />
          <polygon points="16,4 27,9.5 16,14.5 5,9.5" fill="#fdec6e" />
          <rect x="14" y="6" width="3" height="2" fill="#fffbe0" />

          {/* Left Face */}
          <polygon points="2,9 16,16 16,30 2,23" fill="#dfb31d" />
          <polygon points="4,11 14,16 14,27 4,22" fill="#ecc329" />
          <rect x="5" y="13" width="2" height="2" fill="#fdec6e" />
          <rect x="10" y="19" width="2" height="2" fill="#b99110" />

          {/* Right Face */}
          <polygon points="16,16 30,9 30,23 16,30" fill="#b88f11" />
          <polygon points="18,16 28,11 28,22 18,27" fill="#cf9f14" />
          <rect x="22" y="15" width="2" height="2" fill="#98740a" />
        </svg>
      )}

      {normalized === "diamond" && (
        /* Diamond Block (32x32) */
        <svg
          viewBox="0 0 32 32"
          width="32"
          height="32"
          className="size-8 overflow-visible"
          shapeRendering="crispEdges"
        >
          {/* Top Face */}
          <polygon points="16,2 30,9 16,16 2,9" fill="#4fe3d4" />
          <polygon points="16,4 27,9.5 16,14.5 5,9.5" fill="#7bf3e7" />
          <rect x="15" y="6" width="3" height="2" fill="#d7fffa" />
          <rect x="10" y="8" width="2" height="2" fill="#32bcae" />

          {/* Left Face */}
          <polygon points="2,9 16,16 16,30 2,23" fill="#31c2b3" />
          <polygon points="4,11 14,16 14,27 4,22" fill="#40d4c5" />
          <rect x="6" y="14" width="2" height="2" fill="#7bf3e7" />
          <rect x="10" y="20" width="2" height="2" fill="#20988c" />

          {/* Right Face */}
          <polygon points="16,16 30,9 30,23 16,30" fill="#1f9a8e" />
          <polygon points="18,16 28,11 28,22 18,27" fill="#27ad9f" />
          <rect x="23" y="16" width="2" height="2" fill="#14756c" />
        </svg>
      )}

      {normalized === "netherite" && (
        /* Netherite Block (32x32) */
        <svg
          viewBox="0 0 32 32"
          width="32"
          height="32"
          className="size-8 overflow-visible"
          shapeRendering="crispEdges"
        >
          {/* Top Face */}
          <polygon points="16,2 30,9 16,16 2,9" fill="#443f45" />
          <polygon points="16,4 27,9.5 16,14.5 5,9.5" fill="#58525a" />
          <rect x="14" y="6" width="3" height="2" fill="#746c76" />
          <rect x="19" y="9" width="2" height="2" fill="#353036" />

          {/* Left Face */}
          <polygon points="2,9 16,16 16,30 2,23" fill="#363237" />
          <polygon points="4,11 14,16 14,27 4,22" fill="#423e44" />
          <rect x="5" y="14" width="2" height="2" fill="#554f57" />
          <rect x="10" y="21" width="2" height="2" fill="#252126" />

          {/* Right Face */}
          <polygon points="16,16 30,9 30,23 16,30" fill="#282529" />
          <polygon points="18,16 28,11 28,22 18,27" fill="#322e33" />
          <rect x="23" y="16" width="2" height="2" fill="#1d1a1e" />
        </svg>
      )}
    </div>
  );
}
