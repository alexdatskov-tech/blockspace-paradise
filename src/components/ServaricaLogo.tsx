import React from "react";
import servaricaAsset from "@/assets/servarica-logo.png.asset.json";

interface ServaricaLogoProps {
  className?: string;
}

export function ServaricaLogo({ className = "size-10" }: ServaricaLogoProps) {
  const [imgError, setImgError] = React.useState(false);

  // If the uploaded asset URL is available and loads, use it. Otherwise fallback to the hardcoded SVG.
  if (!imgError && servaricaAsset?.url) {
    return (
      <img
        src={servaricaAsset.url}
        alt="Servarica Networks Logo"
        className={`${className} object-contain`}
        onError={() => setImgError(true)}
      />
    );
  }

  // Hardcoded high-resolution vector recreation of the Servarica "S" arrow mark
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="servaricaBlue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0072FF" />
          <stop offset="100%" stopColor="#004AE0" />
        </linearGradient>
        <linearGradient id="servaricaDarkBlue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#004BD6" />
          <stop offset="100%" stopColor="#002D9C" />
        </linearGradient>
      </defs>

      {/* Top arrow header */}
      <path
        d="M 68 12 L 105 32 L 68 52 L 68 40 L 45 40 C 32 40 24 48 24 60 C 24 54 30 46 42 46 L 68 46 Z"
        fill="url(#servaricaBlue)"
      />

      {/* Main S Ribbon Body */}
      <path
        d="M 68 22 L 87 32 L 68 42 L 68 36 L 45 36 C 30 36 20 46 20 60 C 20 74 30 84 45 84 L 75 84 C 88 84 98 74 98 60 L 86 60 C 86 68 78 74 68 74 L 45 74 C 36 74 30 68 30 60 C 30 52 36 46 45 46 L 68 46 Z"
        fill="url(#servaricaBlue)"
      />

      {/* Middle Dark Blue Accent Stripe */}
      <path
        d="M 68 30 L 76 34 L 68 38 L 68 35 L 45 35 C 33 35 25 43 25 55 C 25 67 33 75 45 75 L 75 75 C 83 75 90 68 90 60 L 82 60 C 82 64 76 68 68 68 L 45 68 C 38 68 34 64 34 58 C 34 52 38 48 45 48 L 68 48 Z"
        fill="url(#servaricaDarkBlue)"
      />

      {/* Bottom Horizontal Base Loop with rounded cap */}
      <path
        d="M 15 72 C 10 72 6 76 6 81 C 6 86 10 90 15 90 L 65 90 C 78 90 88 80 88 67 L 76 67 C 76 74 70 80 62 80 L 15 80 Z"
        fill="url(#servaricaBlue)"
      />
      <path
        d="M 15 77 C 12 77 10 79 10 82 C 10 85 12 87 15 87 L 55 87 C 62 87 68 81 68 74 L 60 74 C 60 77 56 81 50 81 L 15 81 Z"
        fill="url(#servaricaDarkBlue)"
      />
    </svg>
  );
}
