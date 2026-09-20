/**
 * Single source of truth for the plan catalogue and deployment regions.
 * Both the pricing grid on the home page and the checkout flow read from here,
 * so a price only ever needs changing in one place.
 */

export type RegionCode = "NL" | "FI" | "IT" | "US" | "PL" | "GB" | "ES";

export interface Region {
  code: RegionCode;
  country: string;
  city: string;
  /** Indicative round-trip time from Western Europe, used by "auto-select". */
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

export type PlanTier = "standard" | "premium";

/**
 * The two ranges sit on different platforms in different datacentres, so they
 * do not offer the same regions. Every region within a range costs the same —
 * there is no regional surcharge anywhere.
 */
export const tierRegions: Record<PlanTier, RegionCode[]> = {
  standard: ["NL", "PL", "IT", "FI", "US"],
  premium: ["NL", "GB", "ES", "IT", "FI"],
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
  standard: {
    cpu: "AMD EPYC 7000 series",
    memory: "DDR4 ECC",
    note: "Shared vCPU on AMD EPYC 7000-series nodes with registered ECC DDR4 and NVMe storage.",
  },
  premium: {
    cpu: "AMD EPYC 9000 series",
    memory: "DDR5 ECC",
    note: "4th Gen AMD EPYC 9000-series cores with DDR5 ECC memory and enterprise NVMe arrays.",
  },
};

/* ------------------------------------------------------------------ *
 * Pricing
 *
 * Upstream quotes a monthly rate in EUR with VAT excluded. Retail price is
 * derived from that cost so there is exactly one number to update per plan
 * when the supplier's rate changes.
 * ------------------------------------------------------------------ */

/** EUR -> USD. Update alongside the supplier's rate card. */
export const EUR_TO_USD = 1.08;

/**
 * Reseller margin over supplier cost, applied to the YEARLY rate. 1.35 = 35%
 * gross on our cheapest price.
 *
 * The yearly rate is the floor deliberately. Deriving it by discounting a
 * marked-up monthly price sells below cost as soon as the discount exceeds the
 * margin — a 35% markup less a 30% discount is 0.945x, i.e. a loss on every
 * annual order.
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

/** Supplier monthly cost in EUR -> our per-month price on a yearly plan, USD. */
function yearlyRateMonthly(costEur: number): number {
  return round2(costEur * EUR_TO_USD * MARKUP);
}

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
  /** Supplier cost per month, in EUR, VAT excluded. */
  costEur: number;
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

/** Everything about a plan except the prices derived from `costEur`. */
type PlanSpec = Omit<
  Plan,
  "monthlyOnAnnual" | "monthlyOnMonthly" | "annualTotal" | "annualDiscountPct" | "portGbps"
> & { portGbps?: number };

function buildPlan(spec: PlanSpec): Plan {
  const onAnnual = yearlyRateMonthly(spec.costEur);
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
  const cost = plan.costEur * EUR_TO_USD;
  const price = cycle === "annual" ? plan.monthlyOnAnnual : plan.monthlyOnMonthly;
  return Math.round(((price - cost) / price) * 100);
}

/**
 * Standard range — AMD EPYC 7000 series, DDR4 ECC.
 * Vanilla-block names, ascending.
 */
export const standardPlans: Plan[] = [
  buildPlan({
    slug: "stone",
    name: "Stone",
    glyph: "stone",
    tier: "standard",
    vcpu: 1,
    ramGb: 1,
    storageGb: 40,
    trafficTb: 3,
    costEur: 4.57,
    players: "1–3 players",
    tagline: "A small world for a couple of friends",
    stock: null,
  }),
  buildPlan({
    slug: "copper",
    name: "Copper",
    glyph: "copper",
    tier: "standard",
    vcpu: 2,
    ramGb: 4,
    storageGb: 60,
    trafficTb: 3,
    costEur: 5.43,
    players: "1–8 players",
    tagline: "Vanilla SMP with friends",
    stock: 3,
  }),
  buildPlan({
    slug: "iron",
    name: "Iron",
    glyph: "iron",
    tier: "standard",
    vcpu: 4,
    ramGb: 8,
    storageGb: 120,
    trafficTb: 3,
    costEur: 6.57,
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
    tier: "standard",
    vcpu: 8,
    ramGb: 16,
    storageGb: 160,
    trafficTb: 3,
    costEur: 14,
    players: "30–60 players",
    tagline: "Forge and mid-weight modpacks",
    stock: 4,
  }),
  buildPlan({
    slug: "diamond",
    name: "Diamond",
    glyph: "diamond",
    tier: "standard",
    vcpu: 8,
    ramGb: 32,
    storageGb: 240,
    trafficTb: 3,
    costEur: 28,
    players: "75–150 players",
    tagline: "Heavy modpacks and multi-world SMP",
    stock: 4,
  }),
];

/**
 * Premium range — 4th Gen AMD EPYC 9000 series, DDR5 ECC.
 * Netherite, then overpowered modded blocks, topped by Void.
 */
export const premiumPlans: Plan[] = [
  buildPlan({
    slug: "netherite",
    name: "Netherite",
    glyph: "netherite",
    tier: "premium",
    vcpu: 1,
    ramGb: 2,
    storageGb: 40,
    trafficTb: 3,
    costEur: 8,
    players: "1–5 players",
    tagline: "The cheapest way onto DDR5",
    stock: null,
  }),
  buildPlan({
    slug: "draconium",
    name: "Draconium",
    glyph: "draconium",
    tier: "premium",
    vcpu: 2,
    ramGb: 4,
    storageGb: 60,
    trafficTb: 3,
    costEur: 8.71,
    players: "5–15 players",
    tagline: "Vanilla and light plugins, quicker ticks",
    stock: null,
  }),
  buildPlan({
    slug: "bedrockium",
    name: "Bedrockium",
    glyph: "bedrockium",
    tier: "premium",
    vcpu: 4,
    ramGb: 8,
    storageGb: 120,
    trafficTb: 3,
    costEur: 12.14,
    players: "15–40 players",
    tagline: "Paper networks and plugin-heavy SMP",
    stock: null,
    popular: true,
    badge: "Most picked",
  }),
  buildPlan({
    slug: "neutronium",
    name: "Neutronium",
    glyph: "neutronium",
    tier: "premium",
    vcpu: 8,
    ramGb: 16,
    storageGb: 160,
    trafficTb: 3,
    costEur: 16,
    players: "40–100 players",
    tagline: "Kitchen-sink modpacks at full render",
    stock: null,
  }),
  buildPlan({
    slug: "void",
    name: "Void",
    glyph: "void",
    tier: "premium",
    vcpu: 8,
    ramGb: 32,
    storageGb: 240,
    trafficTb: 3,
    costEur: 36.43,
    players: "100+ players",
    tagline: "Proxy networks, events and hub shards",
    stock: null,
    badge: "Top spec",
  }),
];

export const allPlans: Plan[] = [...standardPlans, ...premiumPlans];

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

/** Lowest-latency region available to a plan, used by "auto-select". */
export function bestRegionFor(tier: PlanTier): Region {
  return regionsFor(tier).reduce((best, region) =>
    region.latencyMs < best.latencyMs ? region : best,
  );
}
