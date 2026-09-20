import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Bitcoin,
  Check,
  CreditCard,
  Cpu,
  Database,
  Eye,
  EyeOff,
  HardDrive,
  Network,
  Server,
  Terminal,
  TriangleAlert,
} from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FlagIcon } from "@/components/FlagIcon";
import { RegionPicker } from "@/components/RegionPicker";
import { Wallpaper } from "@/components/Wallpaper";
import { PrototypeNotice } from "@/components/PrototypeNotice";
import { PlanGlyph } from "@/components/PlanGlyph";
import {
  PROVISION_TIME,
  SSH_ADDON_PRICE,
  allPlans,
  findPlan,
  formatUsd,
  isSshPromo,
  platformFor,
  regionByCode,
  regionsFor,
  standardPlans,
  tierRegions,
  type RegionCode,
} from "@/lib/plans";

type Cycle = "monthly" | "annual";

export const Route = createFileRoute("/checkout")({
  validateSearch: (search: Record<string, unknown>) => ({
    plan: typeof search["plan"] === "string" ? (search["plan"] as string) : undefined,
    cycle: (search["cycle"] === "monthly" ? "monthly" : "annual") as Cycle,
  }),
  head: () => ({
    meta: [
      { title: "Checkout — BlockForge" },
      {
        name: "description",
        content: "Configure your server, pick a region, and pay by card or cryptocurrency.",
      },
      { property: "og:title", content: "Checkout — BlockForge" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: CheckoutPage,
});

const SERVER_NAME_PATTERN = /^[a-z0-9][a-z0-9-]{1,30}[a-z0-9]$/;
const USERNAME_PATTERN = /^[a-z_][a-z0-9_-]{2,31}$/;

function CheckoutPage() {
  const { plan: planSlug, cycle: initialCycle } = Route.useSearch();

  const [cycle, setCycle] = useState<Cycle>(initialCycle);
  const [selectedSlug, setSelectedSlug] = useState(findPlan(planSlug)?.slug ?? "iron");
  const [pickedRegion, setPickedRegion] = useState<RegionCode>("NL");

  const [serverName, setServerName] = useState("");
  const [username, setUsername] = useState("root");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [wantsSsh, setWantsSsh] = useState(true);
  const [promo, setPromo] = useState("");

  const [placed, setPlaced] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const plan = findPlan(selectedSlug) ?? standardPlans[1]!;
  const promoValid = isSshPromo(promo);

  // The two ranges live in different datacentres, so switching range can strand
  // the selection on a region the new plan does not offer. Fall back to that
  // range's first region rather than rendering an impossible order.
  const available = tierRegions[plan.tier];
  const region: RegionCode = available.includes(pickedRegion) ? pickedRegion : available[0]!;

  const totals = useMemo(() => {
    const months = cycle === "annual" ? 12 : 1;
    const base = cycle === "annual" ? plan.annualTotal : plan.monthlyOnMonthly;
    const sshUnit = wantsSsh && !promoValid ? SSH_ADDON_PRICE : 0;
    const ssh = sshUnit * months;
    return { base, ssh, months, total: base + ssh };
  }, [cycle, plan, wantsSsh, promoValid]);

  const activeRegion = regionByCode(region);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const found: string[] = [];

    if (!SERVER_NAME_PATTERN.test(serverName)) {
      found.push(
        "Server name must be 3–32 characters: lowercase letters, numbers and hyphens, not starting or ending with a hyphen.",
      );
    }
    if (!USERNAME_PATTERN.test(username)) {
      found.push(
        "Username must be 3–32 characters: lowercase letters, numbers, underscore or hyphen, starting with a letter or underscore.",
      );
    }
    if (password.length < 12) {
      found.push("Root password must be at least 12 characters.");
    }

    setErrors(found);
    if (found.length === 0) setPlaced(true);
  };

  if (placed) {
    return (
      <OrderPlaced
        planName={plan.name}
        serverName={serverName}
        region={region}
        cycle={cycle}
        total={totals.total}
        sshIncluded={wantsSsh}
        sshFree={promoValid}
      />
    );
  }

  return (
    <main className="relative min-h-screen px-4 pb-28 pt-6 text-foreground">
      <Wallpaper veil={0.46} />
      <PrototypeNotice />
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" /> Back to plans
          </Link>
          <span className="font-display text-sm font-semibold">BlockForge</span>
        </div>

        <header className="mt-8 border-b border-border pb-6">
          <h1 className="text-2xl font-bold sm:text-3xl">Configure your server</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Three fields and a region. Your server is usually joinable {PROVISION_TIME} after the
            order clears.
          </p>
        </header>

        <form onSubmit={submit} className="mt-8 grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-10">
          {/* ---- Left column: configuration ---- */}
          <div className="space-y-8">
            {/* Plan */}
            <section>
              <h2 className="mb-3 text-sm font-semibold">Plan</h2>
              <div className="grid gap-2 sm:grid-cols-2">
                {allPlans.map((option) => {
                  const selected = option.slug === plan.slug;
                  const price =
                    cycle === "annual" ? option.monthlyOnAnnual : option.monthlyOnMonthly;
                  return (
                    <button
                      key={option.slug}
                      type="button"
                      onClick={() => setSelectedSlug(option.slug)}
                      aria-pressed={selected}
                      className={`flex items-center gap-3 rounded-lg border p-3 text-left transition-colors ${
                        selected
                          ? "border-primary/70 bg-primary/10"
                          : "border-border bg-[oklch(0.18_0.014_168_/_45%)] hover:border-[var(--border-strong)] hover:bg-[oklch(0.22_0.016_168_/_55%)]"
                      }`}
                    >
                      <PlanGlyph type={option.glyph} />
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold">{option.name}</span>
                        <span className="block text-[11px] text-muted-foreground">
                          {option.vcpu} vCPU · {option.ramGb} GB RAM · {option.storageGb} GB NVMe
                        </span>
                      </span>
                      <span className="shrink-0 text-right">
                        <span className="block font-mono text-sm font-semibold">
                          {formatUsd(price)}
                        </span>
                        <span className="block text-[10px] text-muted-foreground">/mo</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Region */}
            <section>
              <RegionPicker tier={plan.tier} value={region} onChange={setPickedRegion} />
            </section>

            {/* Credentials */}
            <section>
              <h2 className="text-sm font-semibold">Server details</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                These become your server hostname and its root login.
              </p>

              <div className="mt-4 grid gap-4">
                <div className="grid gap-1.5">
                  <Label htmlFor="server-name">Server name</Label>
                  <Input
                    id="server-name"
                    value={serverName}
                    onChange={(event) => setServerName(event.target.value.toLowerCase())}
                    placeholder="emberfall"
                    autoComplete="off"
                    spellCheck={false}
                    className="h-11 font-mono"
                  />
                  <p className="text-[11px] text-muted-foreground">
                    Becomes{" "}
                    <span className="font-mono text-foreground">
                      {serverName || "your-server"}.blockforge.gg
                    </span>
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-1.5">
                    <Label htmlFor="root-username">Root username</Label>
                    <Input
                      id="root-username"
                      value={username}
                      onChange={(event) => setUsername(event.target.value.toLowerCase())}
                      placeholder="root"
                      autoComplete="off"
                      spellCheck={false}
                      className="h-11 font-mono"
                    />
                  </div>

                  <div className="grid gap-1.5">
                    <Label htmlFor="root-password">Root password</Label>
                    <div className="relative">
                      <Input
                        id="root-password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="At least 12 characters"
                        autoComplete="new-password"
                        className="h-11 pr-10 font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1.5 text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SSH add-on */}
            <section className="panel p-4">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-md border border-border bg-secondary/60 text-primary">
                  <Terminal className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-sm font-semibold">Full SSH root access</h2>
                    <span className="rounded border border-border bg-secondary/60 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                      {promoValid ? "free with promo" : `+${formatUsd(SSH_ADDON_PRICE)}/mo`}
                    </span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    A real shell on the box, not just the game panel — install what you like, run
                    your own scripts, tune the JVM flags yourself. {formatUsd(SSH_ADDON_PRICE)} per
                    month, or free if you have a promo code.
                  </p>

                  <label className="mt-3 flex cursor-pointer items-center gap-2.5 text-xs font-medium">
                    <input
                      type="checkbox"
                      checked={wantsSsh}
                      onChange={(event) => setWantsSsh(event.target.checked)}
                      className="size-4 cursor-pointer accent-[var(--primary)]"
                    />
                    Add SSH access to this order
                  </label>

                  {wantsSsh && (
                    <div className="mt-3">
                      <Label htmlFor="promo" className="text-xs">
                        Promo code (optional)
                      </Label>
                      <Input
                        id="promo"
                        value={promo}
                        onChange={(event) => setPromo(event.target.value)}
                        placeholder="Enter a code to waive the fee"
                        autoComplete="off"
                        spellCheck={false}
                        className="mt-1.5 h-10 max-w-xs font-mono uppercase"
                      />
                      {promo.trim().length > 0 && (
                        <p
                          role="status"
                          className={`mt-1.5 text-[11px] ${
                            promoValid ? "text-primary" : "text-muted-foreground"
                          }`}
                        >
                          {promoValid
                            ? "Code accepted — SSH access added at no charge."
                            : "That code isn't recognised."}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>

          {/* ---- Right column: order summary ---- */}
          <aside className="lg:sticky lg:top-6 lg:self-start">
            <div className="panel edge-light p-5">
              <h2 className="text-sm font-semibold">Order summary</h2>

              <div className="mt-4 flex items-center gap-3 border-b border-border pb-4">
                <PlanGlyph type={plan.glyph} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">{plan.name}</p>
                  <p className="text-[11px] text-muted-foreground">{plan.tagline}</p>
                </div>
              </div>

              <dl className="mt-4 space-y-2 text-xs">
                <SummaryRow icon={Cpu} label="vCPU" value={`${plan.vcpu}`} />

                <SummaryRow
                  icon={Server}
                  label="Platform"
                  value={platformFor(plan).cpu.replace("AMD EPYC ", "EPYC ")}
                />
                <SummaryRow
                  icon={Database}
                  label="RAM"
                  value={`${plan.ramGb} GB ${platformFor(plan).memory.replace(" ECC", "")}`}
                />
                <SummaryRow icon={HardDrive} label="Storage" value={`${plan.storageGb} GB NVMe`} />
                <SummaryRow
                  icon={Network}
                  label="Network"
                  value={`${plan.portGbps} Gbps · ${plan.trafficTb} TB`}
                />
                <div className="flex items-center justify-between gap-2">
                  <dt className="flex items-center gap-2 text-muted-foreground">
                    <Server className="size-3.5" /> Region
                  </dt>
                  <dd className="flex items-center gap-1.5 font-mono text-foreground">
                    <FlagIcon code={region} className="h-3 w-4.5" />
                    {activeRegion?.city}
                  </dd>
                </div>
              </dl>

              {/* Billing cycle */}
              <div className="mt-5 inline-flex w-full rounded-md border border-border bg-secondary/40 p-1">
                {(["annual", "monthly"] as Cycle[]).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setCycle(option)}
                    className={`flex-1 rounded px-3 py-1.5 text-xs font-medium transition-colors ${
                      cycle === option
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {option === "annual" ? `Yearly · −${plan.annualDiscountPct}%` : "Monthly"}
                  </button>
                ))}
              </div>

              {/* Line items */}
              <div className="mt-4 space-y-2 border-t border-border pt-4 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {plan.name} · {cycle === "annual" ? "12 months" : "1 month"}
                  </span>
                  <span className="font-mono">{formatUsd(totals.base)}</span>
                </div>
                {wantsSsh && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      SSH access
                      {promoValid && <span className="ml-1 text-primary">(promo)</span>}
                    </span>
                    <span className="font-mono">
                      {promoValid ? formatUsd(0) : formatUsd(totals.ssh)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-muted-foreground">
                  <span>VAT & sales tax (0%)</span>
                  <span className="font-mono">{formatUsd(0)}</span>
                </div>
              </div>

              <div className="mt-4 flex items-baseline justify-between border-t border-border pt-4">
                <span className="text-sm font-semibold">Total due now</span>
                <span className="font-mono text-xl font-bold">{formatUsd(totals.total)}</span>
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground">
                {cycle === "annual"
                  ? `Renews yearly. Works out to ${formatUsd(totals.total / 12)}/month.`
                  : "Renews monthly. Cancel any time."}
              </p>

              {errors.length > 0 && (
                <div
                  role="alert"
                  className="mt-4 rounded-md border border-destructive/40 bg-destructive/10 p-3 text-[11px] text-destructive-foreground"
                >
                  <p className="mb-1.5 flex items-center gap-1.5 font-semibold">
                    <TriangleAlert className="size-3.5" /> Check these fields
                  </p>
                  <ul className="list-disc space-y-1 pl-4">
                    {errors.map((message) => (
                      <li key={message}>{message}</li>
                    ))}
                  </ul>
                </div>
              )}

              <Button type="submit" size="xl" className="mt-4 w-full">
                Place order · {formatUsd(totals.total)}
              </Button>

              {/* Payment methods */}
              <div className="mt-4 border-t border-border pt-4">
                <p className="text-[11px] font-semibold text-foreground">We accept</p>
                <div className="mt-2 flex flex-wrap gap-1.5 text-[11px]">
                  <span className="inline-flex items-center gap-1.5 rounded border border-primary/30 bg-primary/10 px-2 py-1 font-medium text-primary">
                    <Bitcoin className="size-3.5" /> Crypto
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded border border-border bg-secondary/50 px-2 py-1 text-muted-foreground">
                    <CreditCard className="size-3.5" /> Card
                  </span>
                  <span className="inline-flex items-center rounded border border-border bg-secondary/50 px-2 py-1 text-muted-foreground">
                    PayPal
                  </span>
                </div>
                <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
                  Bitcoin, Ethereum, Litecoin, Monero and USDT are all accepted — crypto orders are
                  released as soon as the payment confirms on-chain.
                </p>
              </div>
            </div>
          </aside>
        </form>
      </div>
    </main>
  );
}

function SummaryRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Cpu;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <dt className="flex items-center gap-2 text-muted-foreground">
        <Icon className="size-3.5" /> {label}
      </dt>
      <dd className="font-mono text-foreground">{value}</dd>
    </div>
  );
}

function OrderPlaced({
  planName,
  serverName,
  region,
  cycle,
  total,
  sshIncluded,
  sshFree,
}: {
  planName: string;
  serverName: string;
  region: RegionCode;
  cycle: Cycle;
  total: number;
  sshIncluded: boolean;
  sshFree: boolean;
}) {
  const activeRegion = regionByCode(region);

  return (
    <main className="relative grid min-h-screen place-items-center px-4 pb-28 pt-10 text-foreground">
      <Wallpaper veil={0.46} />
      <div className="panel-strong edge-light w-full max-w-lg p-6 sm:p-8">
        <span className="grid size-11 place-items-center rounded-md border border-primary/40 bg-primary/10 text-primary">
          <Check className="size-6" />
        </span>
        <h1 className="mt-5 text-2xl font-bold">Order received</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          <span className="font-mono text-foreground">{serverName}.blockforge.gg</span> is being
          built on a {planName} node in {activeRegion?.city}. It is usually joinable within{" "}
          {PROVISION_TIME} — we'll email the connection details and panel login the moment it is
          ready.
        </p>

        <dl className="mt-6 space-y-2.5 border-t border-border pt-5 text-xs">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Plan</dt>
            <dd className="font-medium">{planName}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Region</dt>
            <dd className="flex items-center gap-1.5 font-medium">
              <FlagIcon code={region} className="h-3 w-4.5" />
              {activeRegion?.city}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Billing</dt>
            <dd className="font-medium">{cycle === "annual" ? "Yearly" : "Monthly"}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">SSH access</dt>
            <dd className="font-medium">
              {sshIncluded ? (sshFree ? "Included (promo)" : "Included") : "Not added"}
            </dd>
          </div>
          <div className="flex justify-between border-t border-border pt-2.5 text-sm">
            <dt className="font-semibold">Total</dt>
            <dd className="font-mono font-bold">{formatUsd(total)}</dd>
          </div>
        </dl>

        <div className="mt-6 flex flex-wrap gap-2">
          <Button asChild size="xl">
            <Link to="/login">Go to the panel</Link>
          </Button>
          <Button asChild variant="outline" size="xl">
            <Link to="/">Back to home</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
