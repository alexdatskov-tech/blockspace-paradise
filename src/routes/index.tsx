import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Box,
  Check,
  CircleGauge,
  Clock3,
  Cpu,
  Database,
  Globe2,
  HardDrive,
  Menu,
  ShieldCheck,
  Sparkles,
  LockKeyhole,
  Network,
  Zap,
  Radio,
  Server,
  Terminal,
  HelpCircle,
  ExternalLink,
  ChevronDown,
  Layers,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlanGlyph } from "@/components/PlanGlyph";
import { LiveServerCard } from "@/components/LiveServerCard";
import heroAsset from "@/assets/blockforge-world.jpg";
import servaricaAsset from "@/assets/servarica-logo.png.asset.json";
import trustpilotAsset from "@/assets/trustpilot-logo.svg.asset.json";

// Exactly 6 tiers matching Minecraft materials: 2 rows of 3 (3-in-a-row layout)
const plans = [
  {
    name: "Sprout",
    glyph: "sprout",
    ram: 2,
    cpu: 2,
    storage: 60,
    monthly: 6,
    originalMonthly: 9,
    yearly: 58,
    discount: 33,
    players: "1–5 players",
    tagline: "Vanilla SMP & friends",
  },
  {
    name: "Copper",
    glyph: "copper",
    ram: 4,
    cpu: 4,
    storage: 120,
    monthly: 14,
    yearly: 134,
    popular: true,
    players: "10–25 players",
    tagline: "Paper, Spigot & plugins",
  },
  {
    name: "Iron",
    glyph: "iron",
    ram: 8,
    cpu: 6,
    storage: 240,
    monthly: 24,
    yearly: 244,
    players: "30–60 players",
    tagline: "Forge & light modpacks",
  },
  {
    name: "Gold",
    glyph: "gold",
    ram: 12,
    cpu: 8,
    storage: 360,
    monthly: 34,
    yearly: 354,
    players: "75–120 players",
    tagline: "Heavy modpacks & Cobblemon",
  },
  {
    name: "Diamond",
    glyph: "diamond",
    ram: 16,
    cpu: 12,
    storage: 480,
    monthly: 44,
    yearly: 464,
    players: "150+ players",
    tagline: "Multi-world SMP & minigames",
  },
  {
    name: "Netherite",
    glyph: "netherite",
    ram: 24,
    cpu: 16,
    storage: 720,
    monthly: 64,
    yearly: 684,
    players: "Unlimited",
    tagline: "BungeeCord networks & enterprise",
  },
];

const reviews = [
  {
    name: "Maya R.",
    server: "Cinder SMP",
    score: 5.0,
    text: "Moved 70 active players over with zero downtime. Chunk generation at 20 TPS is remarkable.",
  },
  {
    name: "Noah K.",
    server: "Skybound Network",
    score: 5.0,
    text: "Even during elytra flight events with 40 people loading separate chunks, the tick rate didn't budge.",
  },
  {
    name: "Eli T.",
    server: "Redstone Labs",
    score: 4.8,
    text: "Massive automated farms used to choke our old host. On BlockForge's 7950X3D nodes, it's buttery smooth.",
  },
  {
    name: "Sofia M.",
    server: "Mossrealm SMP",
    score: 5.0,
    text: "Panel is ultra clean. Installing Fabric and Simple Voice Chat took literally two clicks.",
  },
  {
    name: "Jay D.",
    server: "Voidcraft",
    score: 5.0,
    text: "Best Minecraft server hosting experience I've had in 10 years of running public servers.",
  },
];

const features = [
  {
    icon: Cpu,
    title: "Ryzen 9 7950X3D Hardware",
    text: "Blazing 5.7 GHz single-core clocks give your server maximum tick speed and eliminate chunk lag.",
  },
  {
    icon: Zap,
    title: "Instant 60s Deployment",
    text: "Your server provisions instantly. Java or Bedrock, pre-configured and ready to connect immediately.",
  },
  {
    icon: ShieldCheck,
    title: "10+ Gbps DDoS Shield",
    text: "Specialized Layer 7 gaming DDoS protection mitigates attacks silently with zero latency jitter.",
  },
  {
    icon: HardDrive,
    title: "PCIe 4.0 NVMe Storage",
    text: "Read/write speeds up to 7,000 MB/s for ultra-fast world saves, backups, and player teleportation.",
  },
  {
    icon: Layers,
    title: "1-Click Modpacks & Plugins",
    text: "Full access to Modrinth, CurseForge, PaperMC, and Fabric. Install popular modpacks in seconds.",
  },
  {
    icon: Radio,
    title: "Automated Off-site Backups",
    text: "Daily automated snapshots saved to independent cloud storage with instant 1-click restore.",
  },
];

const locations = [
  { region: "US East", city: "Ashburn, VA", ping: "12ms", active: true },
  { region: "US West", city: "Los Angeles, CA", ping: "28ms", active: false },
  { region: "Europe", city: "Frankfurt, DE", ping: "22ms", active: false },
  { region: "Asia-Pacific", city: "Singapore", ping: "38ms", active: false },
];

const faqs = [
  {
    q: "Can I upgrade or downgrade my RAM anytime?",
    a: "Yes! You can instantly scale your RAM, CPU, or storage directly from the dashboard without losing any world data or player progress.",
  },
  {
    q: "Do you support both Minecraft Java and Bedrock editions?",
    a: "Absolutely. We support all Java versions, Bedrock editions, as well as crossplay via GeyserMC and Floodgate plugins.",
  },
  {
    q: "How fast is server activation?",
    a: "Your server is deployed automatically within 60 seconds of checkout with your selected version pre-installed.",
  },
  {
    q: "Do I get full SFTP and console access?",
    a: "Yes, you have complete root file access via SFTP, live interactive web console, custom subdomains, and database access.",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BlockForge — High-Performance Minecraft Server Hosting" },
      {
        name: "description",
        content:
          "Fast Minecraft server hosting with instant setup, Ryzen 9 hardware, NVMe storage, and 10 Gbps DDoS protection.",
      },
      { property: "og:title", content: "BlockForge — Minecraft Server Hosting" },
      {
        property: "og:description",
        content:
          "High-performance Minecraft server hosting with 20.0 guaranteed TPS and instant deployment.",
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
      className="flex items-center gap-2.5 font-display text-lg font-bold text-foreground"
    >
      <span className="grid size-8 place-items-center rounded-lg border border-primary/30 bg-primary/15 text-primary shadow-[0_0_12px_rgba(74,222,128,0.2)]">
        <Box className="size-4.5" strokeWidth={2.4} />
      </span>
      <span>BlockForge</span>
    </Link>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <div className="glass-panel mx-auto flex h-14 max-w-7xl items-center justify-between rounded-xl px-4 backdrop-blur-xl md:px-6">
        <Brand />
        <nav
          className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex"
          aria-label="Main navigation"
        >
          <a href="#plans" className="transition-colors hover:text-foreground">
            Plans
          </a>
          <a href="#features" className="transition-colors hover:text-foreground">
            Performance
          </a>
          <a href="#locations" className="transition-colors hover:text-foreground">
            Network
          </a>
          <a href="#reviews" className="transition-colors hover:text-foreground">
            Reviews
          </a>
          <Link
            to="/status"
            className="flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            <span className="size-1.5 rounded-full bg-emerald-400" />
            Status
          </Link>
          <Link to="/about" className="transition-colors hover:text-foreground">
            About
          </Link>
        </nav>
        <div className="hidden items-center gap-3 md:flex">
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
          aria-label="Toggle menu"
        >
          <Menu className="size-5" />
        </Button>
      </div>
      {open && (
        <div className="glass-panel-strong mx-auto mt-2 grid max-w-7xl gap-2 rounded-xl p-3 backdrop-blur-2xl md:hidden">
          <a
            href="#plans"
            className="rounded-lg px-3 py-2 text-sm text-foreground hover:bg-white/5"
            onClick={() => setOpen(false)}
          >
            Plans
          </a>
          <a
            href="#features"
            className="rounded-lg px-3 py-2 text-sm text-foreground hover:bg-white/5"
            onClick={() => setOpen(false)}
          >
            Performance
          </a>
          <a
            href="#locations"
            className="rounded-lg px-3 py-2 text-sm text-foreground hover:bg-white/5"
            onClick={() => setOpen(false)}
          >
            Network
          </a>
          <a
            href="#reviews"
            className="rounded-lg px-3 py-2 text-sm text-foreground hover:bg-white/5"
            onClick={() => setOpen(false)}
          >
            Reviews
          </a>
          <Link
            to="/status"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-white/5"
            onClick={() => setOpen(false)}
          >
            <span className="size-2 rounded-full bg-emerald-400" />
            Status
          </Link>
          <Link
            to="/about"
            className="rounded-lg px-3 py-2 text-sm text-foreground hover:bg-white/5"
            onClick={() => setOpen(false)}
          >
            About
          </Link>
          <div className="pt-2 border-t border-border/60 flex gap-2">
            <Button variant="ghost" size="sm" className="w-full" asChild>
              <Link to="/login">Log in</Link>
            </Button>
            <Button variant="hero" size="sm" className="w-full" asChild>
              <a href="#plans" onClick={() => setOpen(false)}>
                Get Server
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

function HomePage() {
  const [annual, setAnnual] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="relative min-h-screen text-foreground">
      <Header />

      {/* Hero Section */}
      <section id="hero" className="relative px-4 pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16">
        {/* Background Image preserved from asset */}
        <img
          src={heroAsset}
          width={1920}
          height={1080}
          alt="Voxel forest and block-built village beneath an emerald aurora"
          className="absolute inset-0 size-full object-cover object-center opacity-60"
        />
        {/* Gradient overlays to create depth and readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/40 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/60 to-transparent" />

        <div className="relative mx-auto max-w-7xl">
          {/* Main Hero Grid: Always renders LiveServerCard cleanly without disappearing on vertical shrink */}
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
            {/* Left Hero Content */}
            <div className="max-w-2xl animate-rise-soft">
              <Link
                to="/status"
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-md transition-all hover:border-primary/60 hover:bg-primary/20"
              >
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>All Systems Operational</span>
                <span className="text-primary/60">· 20.0 TPS</span>
              </Link>

              <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-[4.25rem] leading-[1.05]">
                Your world. <br />
                <span className="text-primary bg-gradient-to-r from-emerald-400 via-primary to-teal-300 bg-clip-text text-transparent">
                  Unchained.
                </span>
              </h1>

              <p className="mt-4 max-w-xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
                High-performance Minecraft hosting built on AMD Ryzen 9 7950X3D nodes. Instant
                setup, zero stutter, and rock-solid 20.0 TPS.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Button size="xl" variant="hero" asChild>
                  <a href="#plans" className="gap-2">
                    Forge your server <ArrowRight className="size-4" />
                  </a>
                </Button>
                <Button size="xl" variant="glass" asChild>
                  <a href="#features">See performance specs</a>
                </Button>
              </div>

              {/* Instant Trust Badges */}
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Check className="size-3.5 text-primary" /> Ready in 60 seconds
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="size-3.5 text-primary" /> 10+ Gbps DDoS Shield
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="size-3.5 text-primary" /> Cancel anytime
                </span>
              </div>
            </div>

            {/* Right: Live Server Monitor Card (ALWAYS visible, responsive, adapts cleanly to height) */}
            <div className="w-full max-w-md mx-auto lg:ml-auto">
              <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground px-1">
                <span className="flex items-center gap-1.5 font-medium text-primary">
                  <Terminal className="size-3.5" /> Real-time Node Telemetry
                </span>
                <span>Port 25565 · Java & Bedrock</span>
              </div>
              <LiveServerCard />
            </div>
          </div>

          {/* Infrastructure Highlights Bar */}
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border/60 pt-5 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Server className="size-3.5 text-primary" /> AMD Ryzen 9 7950X3D
            </span>
            <span className="flex items-center gap-1.5">
              <HardDrive className="size-3.5 text-primary" /> Gen4 NVMe 7,000 MB/s
            </span>
            <span className="flex items-center gap-1.5">
              <Globe2 className="size-3.5 text-primary" /> 10 Gbps Anycast Network
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="size-3.5 text-primary" /> Mod & Plugin Auto-installer
            </span>
          </div>
        </div>
      </section>

      {/* PLANS SECTION: 3 in a row & much smaller */}
      <section id="plans" className="px-4 py-16 sm:py-20 relative">
        <div className="mx-auto max-w-7xl">
          {/* Section Header with Billing Switch */}
          <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-primary">
                Choose Your Tier
              </p>
              <h2 className="text-balance text-3xl font-bold sm:text-4xl">
                3-in-a-row server plans.
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                All plans include dedicated NVMe, Ryzen 9 compute, DDoS filtering, and automatic
                backups.
              </p>
            </div>

            {/* Monthly / Yearly Billing Toggle */}
            <div className="inline-flex items-center rounded-lg border border-border/80 bg-secondary/50 p-1">
              <button
                type="button"
                onClick={() => setAnnual(false)}
                className={`rounded-md px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                  !annual
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setAnnual(true)}
                className={`flex items-center gap-1.5 rounded-md px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                  annual
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Yearly
                <span className="rounded bg-emerald-500/20 px-1.5 py-0.2 text-[10px] font-bold text-emerald-400">
                  Save 20%
                </span>
              </button>
            </div>
          </div>

          {/* 3-IN-A-ROW GRID (3 columns on desktop, 2 on tablet, 1 on mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {plans.map((plan) => {
              const displayPrice = annual ? Math.round(plan.yearly / 12) : plan.monthly;

              return (
                <article
                  key={plan.name}
                  className={`group relative flex flex-col rounded-xl border p-4 transition-all duration-300 ${
                    plan.popular
                      ? "border-primary/60 bg-primary/10 shadow-[0_8px_30px_rgba(74,222,128,0.12)] hover:border-primary"
                      : "border-border/80 bg-card/80 hover:border-primary/40 hover:bg-card"
                  }`}
                >
                  {/* Popular pill */}
                  {plan.popular && (
                    <span className="absolute -top-2.5 right-4 rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary-foreground shadow-sm">
                      Most Popular
                    </span>
                  )}

                  {/* Card Header: 32x32 Glyph + Title + Discount */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* 32x32 Resolution Pixel Block Icon */}
                      <div className="transition-transform duration-300 group-hover:scale-110">
                        <PlanGlyph type={plan.glyph} />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-base text-foreground leading-tight">
                          {plan.name}
                        </h3>
                        <p className="text-[11px] text-muted-foreground leading-tight">
                          {plan.tagline}
                        </p>
                      </div>
                    </div>

                    {plan.discount && !annual && (
                      <span className="rounded border border-amber-400/30 bg-amber-400/10 px-1.5 py-0.5 text-[10px] font-bold text-amber-400">
                        -{plan.discount}%
                      </span>
                    )}
                  </div>

                  {/* Price Row: Compact & clean */}
                  <div className="mt-4 flex items-baseline gap-1.5 border-t border-border/60 pt-3">
                    {!annual && plan.originalMonthly && (
                      <span className="text-xs text-muted-foreground line-through">
                        ${plan.originalMonthly}
                      </span>
                    )}
                    <span className="text-2xl font-bold font-display text-foreground">
                      ${displayPrice}
                    </span>
                    <span className="text-xs text-muted-foreground">/month</span>

                    {annual && (
                      <span className="ml-auto text-[11px] font-medium text-emerald-400">
                        ${plan.yearly}/yr
                      </span>
                    )}
                  </div>

                  {/* Compact Specs Strip */}
                  <div className="my-3.5 grid grid-cols-2 gap-2 text-xs text-muted-foreground bg-background/40 rounded-lg p-2.5 border border-border/40">
                    <div className="flex items-center gap-1.5">
                      <Database className="size-3.5 text-primary shrink-0" />
                      <span className="font-medium text-foreground">{plan.ram} GB</span> RAM
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Cpu className="size-3.5 text-primary shrink-0" />
                      <span className="font-medium text-foreground">{plan.cpu} vCPUs</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <HardDrive className="size-3.5 text-primary shrink-0" />
                      <span className="font-medium text-foreground">{plan.storage} GB</span> NVMe
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Zap className="size-3.5 text-primary shrink-0" />
                      <span className="font-medium text-foreground">{plan.players}</span>
                    </div>
                  </div>

                  {/* Action button */}
                  <Button
                    variant={plan.popular ? "hero" : "glass"}
                    size="sm"
                    className="mt-auto w-full h-8.5 text-xs font-semibold cursor-pointer"
                    asChild
                  >
                    <Link to="/login">
                      Deploy {plan.name} <ArrowRight className="size-3.5 ml-1" />
                    </Link>
                  </Button>
                </article>
              );
            })}
          </div>

          {/* Plan reassurance */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Clock3 className="size-3.5 text-primary" /> 60-second instant setup
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="size-3.5 text-primary" /> Free MySQL database included
            </span>
            <span className="flex items-center gap-1.5">
              <Globe2 className="size-3.5 text-primary" /> Free custom subdomain (.blockforge.gg)
            </span>
          </div>
        </div>
      </section>

      {/* PERFORMANCE & FEATURES */}
      <section
        id="features"
        className="px-4 py-16 sm:py-20 bg-background/50 border-t border-border/40"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-2xl">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-primary">
              Enterprise Infrastructure
            </p>
            <h2 className="text-balance text-3xl font-bold sm:text-4xl">
              Engineered for seamless 20.0 TPS.
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Most hosts cram dozens of servers onto cheap shared nodes. We use dedicated Ryzen 9
              processors with high single-core IPC.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="group rounded-xl border border-border/80 bg-card/60 p-5 transition-all duration-300 hover:border-primary/50 hover:bg-card/90"
              >
                <div className="mb-4 grid size-10 place-items-center rounded-lg border border-primary/30 bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                  <Icon className="size-5" />
                </div>
                <h3 className="text-base font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>

          {/* Partner Callout */}
          <div className="mt-10 glass-panel mx-auto flex max-w-3xl flex-col items-center justify-between gap-4 rounded-xl p-4 sm:flex-row sm:px-6">
            <div className="flex items-center gap-3">
              <img
                src={servaricaAsset.url}
                alt="Servarica logo"
                className="size-9 rounded-lg bg-foreground/95 p-1"
              />
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Official Datacenter Partner
                </p>
                <p className="font-display text-sm font-bold text-foreground">Servarica Networks</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="size-4 text-primary" /> Tier-3 Canadian & Global Datacenters ·
              99.99% Guaranteed SLA
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE SERVER LOCATIONS / PING TEST */}
      <section id="locations" className="px-4 py-16 sm:py-20 border-t border-border/40">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center max-w-2xl mx-auto">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-primary">
              Global Anycast
            </p>
            <h2 className="text-3xl font-bold sm:text-4xl">Low latency worldwide.</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Choose your datacenter region during deployment. Every location features redundant 10
              Gbps uplinks.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
            {locations.map((loc, idx) => (
              <button
                key={loc.region}
                type="button"
                onClick={() => setSelectedLocation(idx)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedLocation === idx
                    ? "border-primary bg-primary/10 shadow-[0_0_20px_rgba(74,222,128,0.15)]"
                    : "border-border/70 bg-card/60 hover:border-primary/40 hover:bg-card"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-foreground">{loc.region}</span>
                  <span className="size-2 rounded-full bg-emerald-400" />
                </div>
                <p className="text-[11px] text-muted-foreground">{loc.city}</p>
                <div className="mt-3 flex items-center gap-1.5 text-xs font-mono font-bold text-primary">
                  <Wifi className="size-3" />
                  {loc.ping} avg
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS & TRUSTPILOT */}
      <section
        id="reviews"
        className="overflow-hidden py-16 sm:py-20 bg-background/50 border-t border-border/40"
      >
        <div className="mx-auto mb-8 max-w-7xl px-4 text-center">
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-primary">
            Player Verified
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl">Built for servers that last.</h2>
          <a
            href="https://www.trustpilot.com/"
            target="_blank"
            rel="noreferrer"
            className="mx-auto mt-4 inline-flex items-center gap-2.5 rounded-lg border border-border/80 bg-secondary/40 px-3.5 py-1.5 text-xs text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors"
          >
            <img src={trustpilotAsset.url} alt="Trustpilot" className="h-4 w-auto" />
            <span>4.9 / 5 on Trustpilot · Read 450+ reviews</span>
          </a>
        </div>

        {/* Marquee Reviews */}
        <div className="group flex w-max animate-marquee gap-4 px-2 hover:[animation-play-state:paused]">
          {[...reviews, ...reviews].map((review, index) => (
            <article
              key={`${review.name}-${index}`}
              className="glass-panel w-[300px] shrink-0 rounded-xl p-4 sm:w-[340px]"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="flex text-amber-400 text-xs">{"★".repeat(5)}</div>
                <span className="text-xs font-mono font-bold text-foreground">
                  {review.score.toFixed(1)}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-foreground/90 min-h-12">“{review.text}”</p>
              <div className="mt-3 border-t border-border/60 pt-2.5 flex items-center justify-between text-xs">
                <span className="font-bold text-foreground">{review.name}</span>
                <span className="text-[11px] text-muted-foreground">{review.server}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="px-4 py-16 sm:py-20 border-t border-border/40">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-primary">
              Got Questions?
            </p>
            <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.q}
                  className="rounded-xl border border-border/70 bg-card/60 transition-colors hover:border-primary/40"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between p-4 text-left font-medium text-sm text-foreground cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`size-4 text-muted-foreground transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-primary" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="border-t border-border/40 px-4 pb-4 pt-2 text-xs leading-relaxed text-muted-foreground">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="px-4 py-16">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-b from-primary/15 via-primary/5 to-transparent px-6 py-12 text-center sm:px-12 sm:py-16">
          <Sparkles className="mx-auto mb-4 size-8 text-primary" />
          <h2 className="text-balance text-3xl font-bold sm:text-5xl">
            Start building your world today.
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
            Deploy in under 60 seconds. Choose from our 3-in-a-row server plans with guaranteed
            Ryzen 9 power.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Button size="xl" variant="hero" asChild>
              <a href="#plans">
                Choose Plan <ArrowRight className="size-4 ml-1" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border/60 px-4 py-8 bg-background/80">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 sm:flex-row">
          <Brand />
          <p className="text-xs text-muted-foreground text-center">
            © 2026 BlockForge. Minecraft is a trademark of Mojang Synergies AB. Not affiliated with
            Mojang or Microsoft.
          </p>
          <div className="flex gap-5 text-xs text-muted-foreground">
            <a href="#plans" className="hover:text-foreground">
              Plans
            </a>
            <Link to="/about" className="hover:text-foreground">
              About
            </Link>
            <Link to="/status" className="hover:text-foreground">
              Status
            </Link>
            <Link to="/login" className="hover:text-foreground">
              Log in
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
