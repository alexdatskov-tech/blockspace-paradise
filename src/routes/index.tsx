import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Box,
  Check,
  ChevronDown,
  Cpu,
  Database,
  Gauge,
  HardDrive,
  Layers,
  Menu,
  Network,
  Save,
  ShieldCheck,
  Terminal,
  X,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlanGlyph } from "@/components/PlanGlyph";
import { LiveServerCard } from "@/components/LiveServerCard";
import { FlagIcon } from "@/components/FlagIcon";
import { Reveal } from "@/components/Reveal";
import { Wallpaper } from "@/components/Wallpaper";
import { VerticalTicker } from "@/components/VerticalTicker";
import {
  PROVISION_TIME,
  SSH_ADDON_PRICE,
  formatUsd,
  premiumPlans,
  regions,
  standardPlans,
  type Plan,
} from "@/lib/plans";

const features = [
  {
    icon: Cpu,
    title: "Dedicated cores, not oversold ones",
    text: "We cap how many instances share a node, so your tick loop keeps its CPU time when the server next door starts a chunk-gen run.",
  },
  {
    icon: HardDrive,
    title: "NVMe storage on every plan",
    text: "World saves, chunk loads and backups all come off NVMe. No spinning disks and no network-attached volumes in the hot path.",
  },
  {
    icon: Network,
    title: "1 Gbps+ on every node",
    text: "A 1 Gbps port minimum with several TB of included traffic, and multi-gigabit uplinks on the premium range.",
  },
  {
    icon: Terminal,
    title: "Root SSH, if you want it",
    text: `Most hosts never give you a shell. We will, for ${formatUsd(SSH_ADDON_PRICE)} a month — install what you like and tune your own JVM flags.`,
  },
  {
    icon: Layers,
    title: "One-click mods and plugins",
    text: "Modrinth, CurseForge, Paper, Purpur and Fabric are wired into the panel. Pick a pack, pick a version, restart.",
  },
  {
    icon: Save,
    title: "Off-site backups on a schedule",
    text: "Daily snapshots written to separate storage, restorable to a point in time without opening a ticket.",
  },
];

const faqs = [
  {
    q: "How long does setup actually take?",
    a: `Usually ${PROVISION_TIME} from the moment your order clears. That covers allocating the node, installing the server jar and bringing the panel up — we would rather quote you the real number than promise sixty seconds and miss it.`,
  },
  {
    q: "Which regions can I deploy in, and do they cost more?",
    a: "Amsterdam, Warsaw, Milan, Helsinki and Ashburn. Every region is the same price on every plan — there is no regional surcharge. If you are not sure which is closest, the region picker has an auto-select that measures for you.",
  },
  {
    q: "Do I get SSH access to the server?",
    a: `Yes. Full root SSH is an optional add-on at ${formatUsd(SSH_ADDON_PRICE)} per month, and it is waived entirely if you have a promo code. You get a real shell on the machine, not just the game panel.`,
  },
  {
    q: "What payment methods do you take?",
    a: "Cryptocurrency (Bitcoin, Ethereum, Litecoin, Monero and USDT), plus cards and PayPal. Crypto orders are released as soon as the payment confirms on-chain.",
  },
  {
    q: "Can I resize my server later?",
    a: "Yes. RAM, vCPU and storage can all be changed from the dashboard, and your world data and player progress carry across the resize.",
  },
  {
    q: "Java, Bedrock, or both?",
    a: "All of them. Every Java version we can fetch a jar for, Bedrock, and crossplay through Geyser and Floodgate if you want one address for both.",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BlockForge — Minecraft Server Hosting" },
      {
        name: "description",
        content:
          "Minecraft server hosting on NVMe nodes with a 1 Gbps+ network, five regions at one price, optional root SSH, and setup in 2–3 minutes.",
      },
      { property: "og:title", content: "BlockForge — Minecraft Server Hosting" },
      {
        property: "og:description",
        content:
          "NVMe nodes, a 1 Gbps+ network, five regions at one price, and optional root SSH access.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

function Brand() {
  return (
    <Link
      to="/"
      className="flex items-center gap-2.5 font-display text-[1.0625rem] font-bold tracking-tight text-foreground"
    >
      <span className="grid size-8 place-items-center rounded-lg border border-primary/35 bg-primary/12 text-primary">
        <Box className="size-4.5" strokeWidth={2.2} />
      </span>
      BlockForge
    </Link>
  );
}

const navLinks = [
  { href: "#plans", label: "Plans" },
  { href: "#performance", label: "Performance" },
  { href: "#faq", label: "FAQ" },
];

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <div className="panel-strong mx-auto flex h-14 max-w-6xl items-center justify-between rounded-xl px-4 md:px-5">
        <Brand />

        <nav
          className="hidden items-center gap-1 text-sm text-muted-foreground md:flex"
          aria-label="Main"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-1.5 font-medium transition-colors hover:bg-white/5 hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/status"
            className="flex items-center gap-1.5 rounded-md px-3 py-1.5 font-medium transition-colors hover:bg-white/5 hover:text-foreground"
          >
            <span className="animate-status size-1.5 rounded-full bg-primary" />
            Status
          </Link>
          <Link
            to="/about"
            className="rounded-md px-3 py-1.5 font-medium transition-colors hover:bg-white/5 hover:text-foreground"
          >
            About
          </Link>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/login">Log in</Link>
          </Button>
          <Button variant="hero" size="sm" asChild>
            <a href="#plans">Choose a server</a>
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>

      {open && (
        <div className="panel-strong mx-auto mt-2 grid max-w-6xl gap-1 rounded-xl p-2.5 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-white/5"
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/status"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-white/5"
          >
            <span className="size-1.5 rounded-full bg-primary" /> Status
          </Link>
          <Link
            to="/about"
            onClick={() => setOpen(false)}
            className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-white/5"
          >
            About
          </Link>
          <div className="mt-1 flex gap-2 border-t border-border pt-2.5">
            <Button variant="glass" size="sm" className="flex-1" asChild>
              <Link to="/login">Log in</Link>
            </Button>
            <Button variant="hero" size="sm" className="flex-1" asChild>
              <a href="#plans" onClick={() => setOpen(false)}>
                Choose a server
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

/** Flags of every region we deploy in, at one price. */
function RegionStrip({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 ${className}`}>
      {regions.map((region) => (
        <span key={region.code} className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <FlagIcon code={region.code} className="h-3 w-4.5" />
          {region.city}
        </span>
      ))}
    </div>
  );
}

function PlanCard({ plan, annual }: { plan: Plan; annual: boolean }) {
  const price = annual ? plan.monthlyOnAnnual : plan.monthlyOnMonthly;

  return (
    <article
      className={`panel lift relative flex flex-col p-5 ${
        plan.popular ? "border-primary/45 bg-[oklch(0.19_0.03_160_/_58%)]" : ""
      }`}
    >
      {plan.badge && (
        <span
          className={`absolute -top-2.5 left-5 rounded-full px-2.5 py-0.5 text-[10.5px] font-semibold tracking-wide ${
            plan.popular
              ? "bg-primary text-primary-foreground"
              : "border border-border-strong bg-[oklch(0.2_0.016_168_/_95%)] text-muted-foreground backdrop-blur-md"
          }`}
        >
          {plan.badge}
        </span>
      )}

      <header className="flex items-start gap-3">
        <PlanGlyph type={plan.glyph} />
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-lg font-bold leading-none text-foreground">
            {plan.name}
          </h3>
          <p className="mt-1.5 text-xs leading-snug text-muted-foreground">{plan.tagline}</p>
        </div>
      </header>

      <div className="mt-5 flex items-end justify-between gap-3">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="font-display text-[2rem] font-bold leading-none tracking-tight text-foreground">
              {formatUsd(price)}
            </span>
            <span className="text-xs text-muted-foreground">/mo</span>
          </div>
          <p className="mt-1.5 text-[11px] text-muted-foreground">
            {annual ? (
              <>
                {formatUsd(plan.annualTotal)} billed yearly ·{" "}
                <span className="text-primary">save {plan.annualDiscountPct}%</span>
              </>
            ) : (
              "Billed monthly · cancel any time"
            )}
          </p>
        </div>
        {plan.stock !== null && (
          <span className="shrink-0 rounded-md border border-gold/30 bg-gold/10 px-2 py-1 text-[10.5px] font-medium text-gold">
            {plan.stock} left
          </span>
        )}
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-x-3 gap-y-2.5 border-t border-border pt-4 text-xs">
        <SpecCell icon={Cpu} label="vCPU" value={`${plan.vcpu}`} />
        <SpecCell icon={Database} label="RAM" value={`${plan.ramGb} GB`} />
        <SpecCell icon={HardDrive} label="NVMe" value={`${plan.storageGb} GB`} />
        <SpecCell icon={Network} label="Port" value={`${plan.portGbps} Gbps`} />
      </dl>

      <div className="mt-4 flex items-center justify-between gap-2 border-t border-border pt-3.5">
        <span className="label-tiny">Regions</span>
        <span className="flex items-center gap-1.5">
          {regions.map((region) => (
            <FlagIcon key={region.code} code={region.code} className="h-3 w-4.5" />
          ))}
        </span>
      </div>

      <p className="mt-2.5 text-[11px] text-muted-foreground">
        {plan.players} · {plan.trafficTb} TB traffic
      </p>

      <Button variant={plan.popular ? "hero" : "extreme"} size="xl" className="mt-5 w-full" asChild>
        <Link
          to="/checkout"
          search={{ plan: plan.slug, cycle: annual ? "annual" : "monthly" }}
          className="group/cta"
        >
          Configure
          <ArrowRight className="size-4 transition-transform duration-300 group-hover/cta:translate-x-0.5" />
        </Link>
      </Button>
    </article>
  );
}

function SpecCell({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Cpu;
  label: string;
  value: string;
}) {
  return (
    <div>
      <dt className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
        <Icon className="size-3 text-primary/80" />
        {label}
      </dt>
      <dd className="mt-0.5 font-mono text-sm font-medium text-foreground">{value}</dd>
    </div>
  );
}

function HomePage() {
  const [tier, setTier] = useState<"standard" | "premium">("standard");
  const [annual, setAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const plans = tier === "standard" ? standardPlans : premiumPlans;

  return (
    <main className="relative min-h-screen text-foreground">
      <Wallpaper />
      <Header />

      {/* ------------------------------ Hero ------------------------------ */}
      <section className="px-4 pb-14 pt-28 sm:pt-32 md:pb-20 md:pt-36">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
          <div className="animate-rise-soft max-w-xl">
            <Link
              to="/status"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-[oklch(0.17_0.016_168_/_70%)] px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-xl transition-colors hover:border-border-strong hover:text-foreground"
            >
              <span className="animate-status size-1.5 rounded-full bg-primary" />
              All systems operational
            </Link>

            <h1 className="mt-6 text-balance font-display text-[2.75rem] font-bold leading-[1.02] sm:text-[3.5rem] lg:text-[4rem]">
              Your world.
              <br />
              <span className="text-primary">Unchained.</span>
            </h1>

            <p className="mt-5 max-w-lg text-pretty text-[0.9375rem] leading-relaxed text-muted-foreground sm:text-base">
              Minecraft servers on NVMe nodes with a 1&nbsp;Gbps+ network, five regions at one
              price, and an optional root shell. Live in {PROVISION_TIME}.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button size="extreme" variant="hero" asChild>
                <a href="#plans" className="group/cta">
                  Choose a server
                  <ArrowRight className="size-4.5 transition-transform duration-300 group-hover/cta:translate-x-1" />
                </a>
              </Button>
              <Button size="extreme" variant="glass" asChild>
                <a href="#performance">See the specs</a>
              </Button>
            </div>

            <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2.5 text-xs text-muted-foreground">
              {[
                `Live in ${PROVISION_TIME}`,
                "1 Gbps+ on every node",
                `Root SSH from ${formatUsd(SSH_ADDON_PRICE)}/mo`,
              ].map((item) => (
                <li key={item} className="flex items-center gap-1.5">
                  <Check className="size-3.5 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Live monitor with a vertical status ticker above it */}
          <div className="mx-auto w-full max-w-md lg:mx-0 lg:ml-auto">
            <div className="mb-3 px-1">
              <VerticalTicker
                rowHeight={20}
                interval={3000}
                items={[
                  <span key="node" className="flex items-center gap-2 text-xs">
                    <Terminal className="size-3.5 shrink-0 text-primary" />
                    <span className="text-muted-foreground">Active node</span>
                    <span className="font-mono text-foreground">eu-ams-04</span>
                  </span>,
                  <span key="build" className="flex items-center gap-2 text-xs">
                    <Layers className="size-3.5 shrink-0 text-primary" />
                    <span className="text-muted-foreground">Running</span>
                    <span className="font-mono text-foreground">Paper 1.21.4</span>
                  </span>,
                  <span key="tps" className="flex items-center gap-2 text-xs">
                    <Gauge className="size-3.5 shrink-0 text-primary" />
                    <span className="text-muted-foreground">Tick rate</span>
                    <span className="font-mono text-foreground">20.0 TPS</span>
                  </span>,
                  <span key="net" className="flex items-center gap-2 text-xs">
                    <Network className="size-3.5 shrink-0 text-primary" />
                    <span className="text-muted-foreground">Uplink</span>
                    <span className="font-mono text-foreground">1 Gbps · 0% loss</span>
                  </span>,
                ]}
              />
            </div>
            <LiveServerCard />
          </div>
        </div>

        {/* Region strip replaces the old datacenter marketing grid */}
        <div className="mx-auto mt-14 max-w-6xl">
          <div className="panel flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs font-medium text-foreground">
              Deploy in any region — same price everywhere
            </p>
            <RegionStrip />
          </div>
        </div>
      </section>

      {/* ------------------------------ Plans ----------------------------- */}
      <section id="plans" className="scroll-mt-24 px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <h2 className="text-balance font-display text-3xl font-bold sm:text-[2.5rem] sm:leading-[1.1]">
                High performance. Tailored to your scale.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Every plan includes NVMe storage, a 1&nbsp;Gbps+ port, a free subdomain and a MySQL
                database. Prices are final — no tax, no VAT, no checkout surcharges.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <div
                role="tablist"
                aria-label="Plan range"
                className="panel inline-flex rounded-lg p-1"
              >
                {(["standard", "premium"] as const).map((option) => (
                  <button
                    key={option}
                    role="tab"
                    aria-selected={tier === option}
                    type="button"
                    onClick={() => setTier(option)}
                    className={`rounded-md px-3.5 py-2 text-xs font-semibold transition-colors ${
                      tier === option
                        ? "bg-[oklch(0.24_0.02_168_/_92%)] text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {option === "standard" ? "Medium budget" : "Premium"}
                  </button>
                ))}
              </div>

              <div className="panel inline-flex rounded-lg p-1">
                {[
                  { value: true, label: "Yearly" },
                  { value: false, label: "Monthly" },
                ].map((option) => (
                  <button
                    key={option.label}
                    type="button"
                    onClick={() => setAnnual(option.value)}
                    aria-pressed={annual === option.value}
                    className={`rounded-md px-3.5 py-2 text-xs font-semibold transition-colors ${
                      annual === option.value
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {option.label}
                    {option.value && annual === option.value && (
                      <span className="ml-1.5 opacity-80">−30%</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <div
            className={`mt-8 grid gap-4 sm:grid-cols-2 ${
              tier === "premium" ? "lg:grid-cols-3" : "lg:grid-cols-4"
            }`}
          >
            {plans.map((plan, index) => (
              <Reveal key={plan.slug} delay={index * 60}>
                <PlanCard plan={plan} annual={annual} />
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-8">
            <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2.5 text-xs text-muted-foreground">
              {[
                "0% tax and 0% VAT — the price you see is the price you pay",
                `Live in ${PROVISION_TIME}`,
                "Free MySQL database",
                "Free .blockforge.gg subdomain",
              ].map((item) => (
                <li key={item} className="flex items-center gap-1.5">
                  <Check className="size-3.5 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* --------------------------- Performance -------------------------- */}
      <section id="performance" className="scroll-mt-24 px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal className="max-w-xl">
            <h2 className="text-balance font-display text-3xl font-bold sm:text-[2.5rem] sm:leading-[1.1]">
              What actually keeps the tick loop steady.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Most budget hosts lose TPS for one of three reasons: the node is oversold, the disk is
              slow, or the network is saturated. Here is how we handle each.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, text }, index) => (
              <Reveal key={title} delay={index * 55}>
                <div className="panel lift h-full p-5">
                  <span className="grid size-9 place-items-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
                    <Icon className="size-4.5" />
                  </span>
                  <h3 className="mt-4 text-[0.9375rem] font-semibold leading-snug text-foreground">
                    {title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Panel callout */}
          <Reveal className="mt-4">
            <div className="panel edge-light flex flex-col gap-4 p-5 sm:p-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
                  <Terminal className="size-5" />
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-semibold text-foreground">
                      Pterodactyl panel, Nebula theme
                    </h3>
                    <span className="rounded border border-border bg-secondary/60 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                      open source
                    </span>
                  </div>
                  <p className="mt-1.5 max-w-2xl text-xs leading-relaxed text-muted-foreground">
                    Live console, file editor, scheduled tasks, SFTP and one-click modpack installs
                    — running on Pterodactyl® with the Blueprint framework and the Nebula theme.
                  </p>
                </div>
              </div>
              <Button
                variant="glass"
                size="sm"
                className="shrink-0 self-start md:self-auto"
                asChild
              >
                <Link to="/about">How it is built</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------- FAQ ------------------------------ */}
      <section id="faq" className="scroll-mt-24 px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h2 className="text-center font-display text-3xl font-bold sm:text-[2.5rem]">
              Questions, answered plainly.
            </h2>
          </Reveal>

          <div className="mt-8 space-y-2.5">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <Reveal key={faq.q} delay={index * 40}>
                  <div className="panel overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 p-4 text-left text-sm font-medium text-foreground transition-colors hover:bg-white/[0.03]"
                    >
                      {faq.q}
                      <ChevronDown
                        className={`size-4 shrink-0 text-muted-foreground transition-transform duration-300 ${
                          isOpen ? "rotate-180 text-primary" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <p className="border-t border-border px-4 pb-4 pt-3 text-xs leading-relaxed text-muted-foreground">
                        {faq.a}
                      </p>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------- CTA ------------------------------ */}
      <section className="px-4 py-16">
        <Reveal className="mx-auto max-w-5xl">
          <div className="panel-strong edge-light px-6 py-12 text-center sm:px-12 sm:py-14">
            <h2 className="text-balance font-display text-3xl font-bold sm:text-[2.75rem] sm:leading-[1.08]">
              Start building your world today.
            </h2>
            <p className="mx-auto mt-3.5 max-w-md text-sm leading-relaxed text-muted-foreground">
              Pick a plan, pick a region, and you will be handing out the IP in {PROVISION_TIME}.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button size="extreme" variant="hero" asChild>
                <a href="#plans" className="group/cta">
                  Choose a server
                  <ArrowRight className="size-4.5 transition-transform duration-300 group-hover/cta:translate-x-1" />
                </a>
              </Button>
              <Button size="extreme" variant="glass" asChild>
                <Link to="/about">Read about the platform</Link>
              </Button>
            </div>
            <RegionStrip className="mt-9 justify-center" />
          </div>
        </Reveal>
      </section>

      {/* ------------------------------ Footer ---------------------------- */}
      <footer className="px-4 pb-8">
        <div className="panel mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 py-5 sm:flex-row sm:justify-between">
          <Brand />
          <nav className="flex flex-wrap justify-center gap-5 text-xs text-muted-foreground">
            <a href="#plans" className="transition-colors hover:text-foreground">
              Plans
            </a>
            <Link to="/about" className="transition-colors hover:text-foreground">
              About
            </Link>
            <Link to="/status" className="transition-colors hover:text-foreground">
              Status
            </Link>
            <Link to="/login" className="transition-colors hover:text-foreground">
              Log in
            </Link>
          </nav>
          <p className="text-center text-[11px] leading-relaxed text-muted-foreground sm:text-right">
            © 2026 BlockForge. Minecraft is a trademark of Mojang Synergies AB.
            <br className="hidden sm:block" /> Not affiliated with Mojang or Microsoft.
          </p>
        </div>
      </footer>
    </main>
  );
}
