/**
 * Single source of truth for the plan catalogue and deployment regions.
 * Both the pricing grid on the home page and the checkout flow read from here,
 * so a price only ever needs changing in one place.
 *
 * PROVENANCE — what is sourced and what is ours:
 *
 *   Sourced from the supplier's rate card (specs, cost, region codes):
 *     vcpu, ramGb, storageGb, portGbps, trafficTb, costPerMonth, stock,
 *     tierRegions. These mirror the v2 and v3 lines one-for-one.
 *
 *   Ours, invented for this storefront (no upstream source):
 *     name, glyph, tagline, players. They are retail names for supplier SKUs.
 *
 *   Ours, and NOT measured: Region.latencyMs. These are rough estimates used
 *     to order the region list and drive "auto-select". Replace them with real
 *     probe data before presenting them to customers as fact.
 */

export type RegionCode = "NL" | "FI" | "IT" | "US" | "PL" | "GB" | "ES";

export interface Region {
  code: RegionCode;
  country: string;
  city: string;
  /** ESTIMATE, not measured. See the provenance note above. */
  latencyMs: number;
}

const REGION_TABLE: Record<RegionCode, Region> = {
  NL: { code: "NL", country: "Netherlands", city: "Amsterdam", latencyMs: 12 },
  GB: { code: "GB", country: "United Kingdom", city: "London", latencyMs: 18 },
  PL: { code: "PL", country: "Poland", city: "Warsaw", latencyMs: 24 },
  IT: { code: "IT", country: "Italy", city: "Milan", latencyMs: 29 },
  ES: { code: "ES", country: "Spain", city: "Madrid", latencyMs: 32 },
  FI: { code: "FI", country: "Finland", city: "Helsinki", latencyMs: 34 },
  US: { code: "US", country: "United States", city: "Ashburn, VA", latencyMs: 88 },
};

export type PlanTier = "mid" | "high";

/**
 * The two ranges sit on different platforms in different datacentres, so they
 * do not offer the same regions. Every region within a range costs the same.
 *
 * The supplier lists further locations beyond these five per range; only the
 * named ones are offered here.
 */
export const tierRegions: Record<PlanTier, RegionCode[]> = {
  mid: ["NL", "FI", "IT", "US", "PL"],
  high: ["NL", "FI", "GB", "ES", "IT"],
};

export function regionsFor(tier: PlanTier): Region[] {
  return tierRegions[tier].map((code) => REGION_TABLE[code]);
}

/** Every region we deploy in, across both ranges. */
export const allRegions: Region[] = Object.values(REGION_TABLE);

export function regionByCode(code: RegionCode): Region {
  return REGION_TABLE[code];
}

/**
 * Platform per range.
 *
 * The exact CPU model is deliberately not advertised: a virtual server is not
 * pinned to one SKU, so the honest claim is the processor series and memory
 * generation the range runs on.
 */
export const platforms: Record<PlanTier, { cpu: string; memory: string; note: string }> = {
  mid: {
    cpu: "AMD EPYC 7000 series",
    memory: "DDR4 ECC",
    note: "Shared vCPU on AMD EPYC 7000-series nodes with registered ECC DDR4 and NVMe storage.",
  },
  high: {
    cpu: "AMD EPYC 9000 series",
    memory: "DDR5 ECC",
    note: "4th Gen AMD EPYC 9000-series cores with DDR5 ECC memory and enterprise NVMe arrays.",
  },
};

export const tierLabels: Record<PlanTier, string> = {
  mid: "Mid budget",
  high: "High performance",
};

/* ------------------------------------------------------------------ *
 * Pricing
 *
 * `costPerMonth` is what the supplier charges us per month on their annual
 * rate, in USD, exactly as it appears on their rate card. Retail is derived
 * from it, so a rate change means editing one number per plan.
 * ------------------------------------------------------------------ */

/**
 * Reseller margin over supplier cost, applied to the YEARLY rate.
 * 1.35 = 35% gross on our cheapest price.
 *
 * The yearly rate is the floor deliberately. Deriving it by discounting a
 * marked-up monthly price sells below cost as soon as the discount exceeds the
 * margin — a 35% markup less a 30% discount is 0.945x, a loss on every annual
 * order.
 */
export const MARKUP = 1.35;

/**
 * What paying month to month costs over the yearly rate. This is where the
 * advertised annual saving comes from, so the discount can never outrun the
 * margin.
 */
export const MONTHLY_PREMIUM = 1.3;

/** Advertised yearly saving, derived so it always matches the real prices. */
export const ANNUAL_DISCOUNT_PCT = Math.round((1 - 1 / MONTHLY_PREMIUM) * 100);

/**
 * We advertise and charge 0% VAT — the price shown is the price billed. The
 * supplier's VAT is absorbed into MARKUP rather than added at checkout.
 */
export const VAT_RATE = 0;

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

export interface Plan {
  /** URL-safe id used by the checkout route. */
  slug: string;
  /** Our retail name for the SKU. Not a supplier name. */
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
  /** Supplier cost per month on their annual rate, USD. */
  costPerMonth: number;
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

/** Everything about a plan except the prices derived from `costPerMonth`. */
type PlanSpec = Omit<
  Plan,
  "monthlyOnAnnual" | "monthlyOnMonthly" | "annualTotal" | "annualDiscountPct" | "portGbps"
> & {
  portGbps?: number;
  /**
   * Deliberate price point for the yearly rate, overriding `MARKUP`. Use it to
   * sharpen a plan that has to win on price; everything else still derives
   * from cost. Must stay above `costPerMonth` — buildPlan throws otherwise.
   */
  priceOnAnnual?: number;
};

function buildPlan(spec: PlanSpec): Plan {
  const onAnnual = round2(spec.priceOnAnnual ?? spec.costPerMonth * MARKUP);

  // A price override is hand-set, so guard it: shipping a plan that sells
  // below what we pay for it is the one pricing mistake worth crashing over.
  if (onAnnual <= spec.costPerMonth) {
    throw new Error(
      `Plan "${spec.slug}" prices at $${onAnnual}/mo against a cost of ` +
        `$${spec.costPerMonth}/mo — that loses money on every order.`,
    );
  }

  const monthly = round2(onAnnual * MONTHLY_PREMIUM);

  return {
    ...spec,
    // Every plan in both ranges ships a 1 Gbps port with 3 TB included.
    portGbps: spec.portGbps ?? 1,
    monthlyOnMonthly: monthly,
    monthlyOnAnnual: onAnnual,
    annualTotal: round2(onAnnual * 12),
    annualDiscountPct: ANNUAL_DISCOUNT_PCT,
  };
}

/** Gross margin on a plan at a given billing cycle, as a percentage. */
export function marginPct(plan: Plan, cycle: "monthly" | "annual"): number {
  const price = cycle === "annual" ? plan.monthlyOnAnnual : plan.monthlyOnMonthly;
  return Math.round(((price - plan.costPerMonth) / price) * 100);
}

/**
 * Mid budget — AMD EPYC 7000 series, DDR4 ECC.
 * Vanilla-block names, ascending.
 */
export const midPlans: Plan[] = [
  buildPlan({
    slug: "iron",
    name: "Iron",
    glyph: "iron",
    tier: "mid",
    vcpu: 4,
    ramGb: 8,
    storageGb: 120,
    trafficTb: 3,
    costPerMonth: 5.28,
    players: "10–25 players",
    tagline: "Paper or Spigot with a plugin stack",
    stock: 3,
    popular: true,
    badge: "Most picked",
  }),
  buildPlan({
    slug: "gold",
    name: "Gold",
    glyph: "gold",
    tier: "mid",
    vcpu: 8,
    ramGb: 16,
    storageGb: 160,
    trafficTb: 3,
    costPerMonth: 11.26,
    players: "30–60 players",
    tagline: "Forge and mid-weight modpacks",
    stock: 3,
  }),
  buildPlan({
    slug: "diamond",
    name: "Diamond",
    glyph: "diamond",
    tier: "mid",
    vcpu: 8,
    ramGb: 32,
    storageGb: 240,
    trafficTb: 3,
    costPerMonth: 22.51,
    // Priced under the usual markup on purpose. Diamond is the cheapest route
    // to 32 GB, and at the standard 1.35 it sat close enough to Void that the
    // DDR5 plan looked like the obvious buy. ~20% still clears cost well.
    priceOnAnnual: 27.99,
    players: "75–150 players",
    tagline: "Heavy modpacks and multi-world SMP",
    stock: 2,
    badge: "Best value",
  }),
];

/**
 * High performance — 4th Gen AMD EPYC 9000 series, DDR5 ECC.
 * Netherite, an overpowered modded block, then Void at the top.
 */
export const highPlans: Plan[] = [
  buildPlan({
    slug: "netherite",
    name: "Netherite",
    glyph: "netherite",
    tier: "high",
    vcpu: 4,
    ramGb: 8,
    storageGb: 120,
    trafficTb: 3,
    costPerMonth: 9.76,
    players: "15–40 players",
    tagline: "Paper networks on DDR5",
    stock: null,
  }),
  buildPlan({
    slug: "draconium",
    name: "Draconium",
    glyph: "draconium",
    tier: "high",
    vcpu: 8,
    ramGb: 16,
    storageGb: 160,
    trafficTb: 3,
    costPerMonth: 12.86,
    players: "40–100 players",
    tagline: "Kitchen-sink modpacks at full render",
    stock: null,
    popular: true,
    badge: "Most picked",
  }),
  buildPlan({
    slug: "void",
    name: "Void",
    glyph: "void",
    tier: "high",
    vcpu: 8,
    ramGb: 32,
    storageGb: 240,
    trafficTb: 3,
    costPerMonth: 29.29,
    players: "100+ players",
    tagline: "Proxy networks, events and hub shards",
    stock: null,
    badge: "Top spec",
  }),
];

export const allPlans: Plan[] = [...midPlans, ...highPlans];

export function plansFor(tier: PlanTier): Plan[] {
  return tier === "mid" ? midPlans : highPlans;
}

export function findPlan(slug: string | undefined): Plan | undefined {
  if (!slug) return undefined;
  return allPlans.find((plan) => plan.slug === slug.toLowerCase());
}

/** Platform (CPU + memory) a plan runs on. */
export function platformFor(plan: Plan) {
  return platforms[plan.tier];
}

/** Regions a plan can be deployed in. */
export function regionsForPlan(plan: Plan): Region[] {
  return regionsFor(plan.tier);
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

/** Lowest-latency region available to a range, used by "auto-select". */
export function bestRegionFor(tier: PlanTier): Region {
  return regionsFor(tier).reduce((best, region) =>
    region.latencyMs < best.latencyMs ? region : best,
  );
}
