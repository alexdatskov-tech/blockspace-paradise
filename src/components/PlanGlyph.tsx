interface BlockPalette {
  /** Top face, base then highlight inset. */
  top: [string, string];
  /** Left face, base then lit inset. */
  left: [string, string];
  /** Right face, base then inset. */
  right: [string, string];
  /** Speck colours: light and dark, scattered as single pixels. */
  specks: [string, string];
  /** Optional thin outline, used by the darkest blocks to stay readable. */
  outline?: string;
}

/**
 * Isometric 32x32 voxel block artwork, one entry per plan tier.
 * Each block is drawn from three faces plus a handful of pixel specks, so
 * adding a tier means adding a palette rather than another SVG by hand.
 */
const palettes: Record<string, BlockPalette> = {
  iron: {
    top: ["#dce0e5", "#f0f3f6"],
    left: ["#b8bdc5", "#c9ced6"],
    right: ["#9da3ac", "#abb1bb"],
    specks: ["#ffffff", "#8e949e"],
  },
  gold: {
    top: ["#f6d337", "#fdec6e"],
    left: ["#dfb31d", "#ecc329"],
    right: ["#b88f11", "#cf9f14"],
    specks: ["#fffbe0", "#98740a"],
  },
  diamond: {
    top: ["#4fe3d4", "#7bf3e7"],
    left: ["#31c2b3", "#40d4c5"],
    right: ["#1f9a8e", "#27ad9f"],
    specks: ["#d7fffa", "#14756c"],
  },
  netherite: {
    top: ["#443f45", "#58525a"],
    left: ["#363237", "#423e44"],
    right: ["#282529", "#322e33"],
    specks: ["#7e7480", "#1d1a1e"],
  },
  draconium: {
    top: ["#6f36a3", "#8b47c6"],
    left: ["#552a7e", "#63318f"],
    right: ["#3d1e5c", "#48236c"],
    specks: ["#d089f7", "#2a1240"],
  },
  void: {
    top: ["#131019", "#1c1824"],
    left: ["#0d0b12", "#14111a"],
    right: ["#07060a", "#0c0a10"],
    specks: ["#8b6dd6", "#2a2140"],
    outline: "#3d3352",
  },
};

interface PlanGlyphProps {
  type: string;
  className?: string;
}

export function PlanGlyph({ type, className = "" }: PlanGlyphProps) {
  const palette = palettes[type.toLowerCase()];
  if (!palette) return null;

  const { top, left, right, specks, outline } = palette;

  return (
    <div
      className={`relative inline-flex size-8 shrink-0 items-center justify-center ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 32 32"
        width="32"
        height="32"
        className="size-8 overflow-visible"
        shapeRendering="crispEdges"
      >
        {/* Top face */}
        <polygon points="16,2 30,9 16,16 2,9" fill={top[0]} />
        <polygon points="16,4 27,9.5 16,14.5 5,9.5" fill={top[1]} />
        <rect x="15" y="6" width="2" height="2" fill={specks[0]} />
        <rect x="20" y="9" width="2" height="2" fill={specks[1]} />

        {/* Left face */}
        <polygon points="2,9 16,16 16,30 2,23" fill={left[0]} />
        <polygon points="4,11 14,16 14,27 4,22" fill={left[1]} />
        <rect x="5" y="14" width="2" height="2" fill={specks[0]} />
        <rect x="10" y="21" width="2" height="2" fill={specks[1]} />

        {/* Right face */}
        <polygon points="16,16 30,9 30,23 16,30" fill={right[0]} />
        <polygon points="18,16 28,11 28,22 18,27" fill={right[1]} />
        <rect x="23" y="16" width="2" height="2" fill={specks[1]} />

        {outline && (
          <polygon
            points="16,2 30,9 30,23 16,30 2,23 2,9"
            fill="none"
            stroke={outline}
            strokeWidth="1"
          />
        )}
      </svg>
    </div>
  );
}
