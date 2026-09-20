/**
 * Single source of truth for the plan catalogue and deployment regions.
 * Both the pricing grid on the home page and the checkout flow read from here,
 * so a price only ever needs changing in one place.
 */

export type RegionCode = "NL" | "FI" | "IT" | "US" | "PL";

export interface Region {
  code: RegionCode;
  country: string;
  city: string;
  /** Indicative round-trip time from Western Europe, used by "auto-select". */
  latencyMs: number;
}

/**
 * Every region costs the same — there is no regional surcharge on any plan.
 */
export const regions: Region[] = [
  { code: "NL", country: "Netherlands", city: "Amsterdam", latencyMs: 12 },
  { code: "PL", country: "Poland", city: "Warsaw", latencyMs: 24 },
  { code: "IT", country: "Italy", city: "Milan", latencyMs: 29 },
  { code: "FI", country: "Finland", city: "Helsinki", latencyMs: 34 },
  { code: "US", country: "United States", city: "Ashburn, VA", latencyMs: 88 },
];

export type PlanTier = "standard" | "premium";

export interface Plan {
  /** URL-safe id used by the checkout route. */
  slug: string;
  name: string;
  /** Key into the block artwork in PlanGlyph. */
  glyph: string;
  tier: PlanTier;
  vcpu: number;
  ramGb: number;
  storageGb: number;
  /** Port speed in Gbps. */
  portGbps: number;
  /** Included outbound traffic, in TB. */
  trafficTb: number;
  /** Price per month when billed annually. */
  monthlyOnAnnual: number;
  /** Full price per month when billed month to month. */
  monthlyOnMonthly: number;
  /** Total charged once per year. */
  annualTotal: number;
  /** Discount applied to the annual rate, as a percentage. */
  annualDiscountPct: number;
  players: string;
  tagline: string;
  /** Units left in stock; null when supply is not constrained. */
  stock: number | null;
  popular?: boolean;
  badge?: string;
}

/**
 * Standard range. Shared vCPU on NVMe nodes, 1 Gbps port on every plan.
 */
export const standardPlans: Plan[] = [
  {
    slug: "copper",
    name: "Copper",
    glyph: "copper",
    tier: "standard",
    vcpu: 2,
    ramGb: 4,
    storageGb: 60,
    portGbps: 1,
    trafficTb: 3,
    monthlyOnAnnual: 4.37,
    monthlyOnMonthly: 6.24,
    annualTotal: 52.39,
    annualDiscountPct: 30,
    players: "1–8 players",
    tagline: "Vanilla SMP with friends",
    stock: 3,
  },
  {
    slug: "iron",
    name: "Iron",
    glyph: "iron",
    tier: "standard",
    vcpu: 4,
    ramGb: 8,
    storageGb: 120,
    portGbps: 1,
    trafficTb: 3,
    monthlyOnAnnual: 5.28,
    monthlyOnMonthly: 7.54,
    annualTotal: 63.39,
    annualDiscountPct: 30,
    players: "10–25 players",
    tagline: "Paper or Spigot with a plugin stack",
    stock: 3,
    popular: true,
    badge: "Most picked",
  },
  {
    slug: "gold",
    name: "Gold",
    glyph: "gold",
    tier: "standard",
    vcpu: 8,
    ramGb: 16,
    storageGb: 160,
    portGbps: 1,
    trafficTb: 3,
    monthlyOnAnnual: 11.26,
    monthlyOnMonthly: 16.09,
    annualTotal: 135.08,
    annualDiscountPct: 30,
    players: "30–60 players",
    tagline: "Forge and mid-weight modpacks",
    stock: 4,
  },
  {
    slug: "diamond",
    name: "Diamond",
    glyph: "diamond",
    tier: "standard",
    vcpu: 8,
    ramGb: 32,
    storageGb: 240,
    portGbps: 1,
    trafficTb: 3,
    monthlyOnAnnual: 22.51,
    monthlyOnMonthly: 32.16,
    annualTotal: 270.16,
    annualDiscountPct: 30,
    players: "75–150 players",
    tagline: "Heavy modpacks and multi-world SMP",
    stock: 4,
  },
];

/**
 * Premium range. Dedicated cores, DDR5, larger NVMe arrays.
 */
export const premiumPlans: Plan[] = [
  {
    slug: "netherite",
    name: "Netherite",
    glyph: "netherite",
    tier: "premium",
    vcpu: 8,
    ramGb: 24,
    storageGb: 320,
    portGbps: 1,
    trafficTb: 5,
    monthlyOnAnnual: 28.4,
    monthlyOnMonthly: 40.57,
    annualTotal: 340.8,
    annualDiscountPct: 30,
    players: "100–200 players",
    tagline: "Dedicated cores, DDR5 memory",
    stock: null,
  },
  {
    slug: "draconium",
    name: "Draconium",
    glyph: "draconium",
    tier: "premium",
    vcpu: 12,
    ramGb: 48,
    storageGb: 480,
    portGbps: 2,
    trafficTb: 8,
    monthlyOnAnnual: 46.9,
    monthlyOnMonthly: 67.0,
    annualTotal: 562.8,
    annualDiscountPct: 30,
    players: "250+ players",
    tagline: "Kitchen-sink modpacks at full render",
    stock: null,
    popular: true,
    badge: "Most picked",
  },
  {
    slug: "bedrockium",
    name: "Bedrockium",
    glyph: "bedrockium",
    tier: "premium",
    vcpu: 16,
    ramGb: 64,
    storageGb: 640,
    portGbps: 2,
    trafficTb: 12,
    monthlyOnAnnual: 68.5,
    monthlyOnMonthly: 97.86,
    annualTotal: 822.0,
    annualDiscountPct: 30,
    players: "400+ players",
    tagline: "Proxy networks and hub shards",
    stock: null,
  },
  {
    slug: "neutronium",
    name: "Neutronium",
    glyph: "neutronium",
    tier: "premium",
    vcpu: 24,
    ramGb: 96,
    storageGb: 960,
    portGbps: 5,
    trafficTb: 20,
    monthlyOnAnnual: 99.9,
    monthlyOnMonthly: 142.71,
    annualTotal: 1198.8,
    annualDiscountPct: 30,
    players: "800+ players",
    tagline: "Event servers and large networks",
    stock: null,
  },
  {
    slug: "void",
    name: "Void",
    glyph: "void",
    tier: "premium",
    vcpu: 32,
    ramGb: 128,
    storageGb: 1600,
    portGbps: 10,
    trafficTb: 40,
    monthlyOnAnnual: 164.0,
    monthlyOnMonthly: 234.29,
    annualTotal: 1968.0,
    annualDiscountPct: 30,
    players: "Unmetered slots",
    tagline: "Whole node, nothing shared",
    stock: null,
    badge: "Full node",
  },
];

export const allPlans: Plan[] = [...standardPlans, ...premiumPlans];

export function findPlan(slug: string | undefined): Plan | undefined {
  if (!slug) return undefined;
  return allPlans.find((plan) => plan.slug === slug.toLowerCase());
}

/** Monthly price of the optional SSH / root shell add-on, in USD. */
export const SSH_ADDON_PRICE = 1;

/** Promo code that waives the SSH add-on fee. */
export const SSH_PROMO_CODE = "CREEPERAWMAN";

/** Typical time from a completed order to a joinable server. */
export const PROVISION_TIME = "2–3 minutes";

export function isSshPromo(code: string): boolean {
  return code.trim().toUpperCase() === SSH_PROMO_CODE;
}

export function formatUsd(value: number): string {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/** Lowest-latency region, used by the "auto-select" control. */
export function bestRegion(): Region {
  return regions.reduce((best, region) => (region.latencyMs < best.latencyMs ? region : best));
}
