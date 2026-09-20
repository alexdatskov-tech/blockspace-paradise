import { useState } from "react";
import { Check, Loader2, Wand2 } from "lucide-react";
import { FlagIcon } from "@/components/FlagIcon";
import type { PlanTier, RegionCode } from "@/lib/plans";
import { bestRegionFor, regionsFor } from "@/lib/plans";

interface RegionPickerProps {
  /** Which range's regions to offer — the two ranges sit in different DCs. */
  tier: PlanTier;
  value: RegionCode;
  onChange: (code: RegionCode) => void;
}

/**
 * Region selector. Every region within a range is the same price, so the only
 * thing to weigh is distance — "auto-select" just takes the lowest round-trip
 * time on offer.
 */
export function RegionPicker({ tier, value, onChange }: RegionPickerProps) {
  const [probing, setProbing] = useState(false);
  const [autoPicked, setAutoPicked] = useState<RegionCode | null>(null);

  const regions = regionsFor(tier);

  const autoSelect = () => {
    setProbing(true);
    setAutoPicked(null);
    // Brief pause so the button reads as doing something before it resolves.
    window.setTimeout(() => {
      const pick = bestRegionFor(tier);
      onChange(pick.code);
      setAutoPicked(pick.code);
      setProbing(false);
    }, 700);
  };

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-foreground">Region</p>
          <p className="text-xs text-muted-foreground">
            Same price in every location — no regional surcharge.
          </p>
        </div>
        <button
          type="button"
          onClick={autoSelect}
          disabled={probing}
          className="inline-flex items-center gap-1.5 rounded-md border border-border bg-secondary/50 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-secondary disabled:opacity-60"
        >
          {probing ? (
            <Loader2 className="size-3.5 animate-spin" />
          ) : (
            <Wand2 className="size-3.5 text-primary" />
          )}
          {probing ? "Testing routes…" : "Auto-select the best region"}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {regions.map((region) => {
          const selected = value === region.code;
          return (
            <button
              key={region.code}
              type="button"
              onClick={() => {
                onChange(region.code);
                setAutoPicked(null);
              }}
              aria-pressed={selected}
              className={`flex items-start gap-2.5 rounded-lg border p-3 text-left transition-colors ${
                selected
                  ? "border-primary/70 bg-primary/10"
                  : "border-border bg-[oklch(0.18_0.014_168_/_45%)] hover:border-[var(--border-strong)] hover:bg-[oklch(0.22_0.016_168_/_55%)]"
              }`}
            >
              <FlagIcon code={region.code} className="mt-0.5 h-3.5 w-5" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-xs font-semibold text-foreground">
                  {region.city}
                </span>
                <span className="block truncate text-[11px] text-muted-foreground">
                  {region.country}
                </span>
                <span className="mt-1 block font-mono text-[11px] text-muted-foreground">
                  ~{region.latencyMs} ms
                </span>
              </span>
              {selected && <Check className="mt-0.5 size-3.5 shrink-0 text-primary" />}
            </button>
          );
        })}
      </div>

      {autoPicked && (
        <p role="status" className="mt-2 text-xs text-primary">
          Picked {regions.find((r) => r.code === autoPicked)?.city} — lowest round-trip time of the
          regions this plan offers.
        </p>
      )}
    </div>
  );
}
