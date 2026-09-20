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
  Wifi,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PlanGlyph } from "@/components/PlanGlyph";
import { LiveServerCard } from "@/components/LiveServerCard";
import { ServaricaShowcase } from "@/components/ServaricaShowcase";
import heroAsset from "@/assets/blockforge-world.jpg";
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

// HOSTKEY V3 Enterprise Plans (4th Gen AMD EPYC 9354, DDR5 RAM, Enterprise NVMe)
// +$1 USD added on top for extra profit as requested
const hostkeyV3Plans = [
  {
    name: "v3-mini",
    cpu: "4 vCPU",
    ram: "8 GB",
    ramType: "Next-Gen DDR5",
    storage: "120 GB NVMe",
    ip: "Dedicated IPv4",
    traffic: "1 Gbit/s, 3 TB",
    regions: ["US", "UK", "NL", "FI", "FR", "DE", "ES", "IT", "+ 4"],
    monthlyPrice: "$9.50",
    yearlyTotal: "$113.98 /year",
    discount: "-30%",
    tagline: "4th Gen AMD EPYC 9354 · 3.25 GHz",
    popular: false,
    badge: null,
  },
  {
    name: "v3-medium",
    cpu: "8 vCPU",
    ram: "16 GB",
    ramType: "Next-Gen DDR5",
    storage: "160 GB NVMe",
    ip: "Dedicated IPv4",
    traffic: "1 Gbit/s, 3 TB",
    regions: ["US", "UK", "NL", "FI", "FR", "DE", "ES", "IT", "+ 4"],
    monthlyPrice: "$12.20",
    yearlyTotal: "$146.40 /year",
    discount: "-30%",
    tagline: "4th Gen AMD EPYC 9354 · 3.25 GHz",
    popular: true,
    badge: "Top Choice",
  },
  {
    name: "v3-heavy",
    cpu: "8 vCPU",
    ram: "32 GB",
    ramType: "Next-Gen DDR5",
    storage: "240 GB NVMe",
    ip: "Dedicated IPv4",
    traffic: "1 Gbit/s, 3 TB",
    regions: ["US", "UK", "NL", "FI", "FR", "DE", "ES", "IT", "+ 4"],
    monthlyPrice: "$26.50",
    yearlyTotal: "$318.01 /year",
    discount: "-40%",
    tagline: "4th Gen AMD EPYC 9354 · 3.25 GHz",
    popular: false,
    badge: "-40% Deal",
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
    text: "Massive automated farms used to choke our old host. On BlockForge's Servarica AMD EPYC 7663 nodes, it's buttery smooth.",
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
    title: "AMD EPYC™ 7663 Enterprise Nodes",
    text: "Enterprise 64-core Zen 3 architecture with massive L3 cache ensures sustained 20.0 TPS with heavy entity loads and zero chunk lag.",
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
    icon: Terminal,
    title: "Blueprint Nebula Panel on Pterodactyl®",
    text: "Game panel powered by the Blueprint framework with the custom Nebula theme, running on open-source Pterodactyl®. Instant web console, scheduled backups, SFTP, and one-click modding.",
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
  { region: "USA", city: "North America East", ping: "24 ms", active: true },
  { region: "United Kingdom", city: "London", ping: "83 ms", active: false },
  { region: "France", city: "Paris", ping: "87 ms", active: false },
  { region: "Netherlands", city: "Amsterdam", ping: "98 ms", active: false },
  { region: "Spain", city: "Madrid", ping: "99 ms", active: false },
  { region: "Germany", city: "Frankfurt", ping: "103 ms", active: false },
  { region: "Italy", city: "Milan", ping: "106 ms", active: false },
  { region: "Switzerland", city: "Zurich", ping: "107 ms", active: false },
  { region: "Finland", city: "Helsinki", ping: "118 ms", active: false },
  { region: "Poland", city: "Warsaw", ping: "118 ms", active: false },
  { region: "Iceland", city: "Reykjavik", ping: "131 ms", active: false },
  { region: "Turkey", city: "Istanbul", ping: "144 ms", active: false },
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
          "Fast Minecraft server hosting powered by Servarica AMD EPYC 7663 enterprise nodes, NVMe storage, and 10 Gbps DDoS protection.",
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
  const [planCategory, setPlanCategory] = useState<"standard" | "premium">("standard");
  const [annual, setAnnual] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="relative min-h-screen text-foreground">
      <Header />

      {/* Global Fixed Minecraft Background (stays in position, moves subtly down as you scroll) */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <img
          src={heroAsset}
          width={1920}
          height={1080}
          alt="Voxel Minecraft block terrain"
          style={{
            transform: `translate3d(0, ${Math.min(scrollY * 0.12, 240)}px, 0) scale(1.05)`,
          }}
          className="size-full object-cover object-center opacity-35 transition-transform duration-75 ease-out will-change-transform"
        />
        {/* Subtle dark gradient overlay ensuring readability everywhere */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/85 to-background/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,var(--color-background)_100%)] opacity-85" />
      </div>

      {/* Hero Section */}
      <section id="hero" className="relative px-4 pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16">
        <div className="relative mx-auto max-w-7xl">
          {/* Main Hero Grid: Always renders LiveServerCard cleanly */}
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
            {/* Left Hero Content */}
            <div className="max-w-2xl animate-rise-soft">
              <Link
                to="/status"
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 backdrop-blur-md transition-all hover:border-emerald-500/60 hover:bg-emerald-500/20"
              >
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Montreal Node CA-01 Operational</span>
                <span className="text-emerald-400/60">· 20.0 TPS</span>
              </Link>

              <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-[4.25rem] leading-[1.05]">
                Your world. <br />
                <span className="text-primary bg-gradient-to-r from-emerald-400 via-primary to-teal-300 bg-clip-text text-transparent">
                  Unchained.
                </span>
              </h1>

              <p className="mt-4 max-w-xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
                Enterprise-grade Minecraft server hosting. All standard server nodes are hosted
                directly in <strong className="text-foreground font-semibold">Montreal, QC</strong>{" "}
                on Servarica AMD EPYC™ 7663 bare-metal, with multi-region 4th Gen AMD EPYC 9354
                options. Zero tick lag, 20.0 guaranteed TPS.
              </p>

              {/* Black button with neon green highlight & NO white dot */}
              <div className="mt-7 flex flex-wrap items-center gap-3.5">
                <Button
                  size="extreme"
                  variant="extreme"
                  asChild
                  className="extreme-glow-btn group/btn cursor-pointer"
                >
                  <a href="#plans" className="flex items-center gap-2.5">
                    <span className="tracking-wide">Start Your Server</span>
                    <ArrowRight className="size-5 transition-transform duration-400 ease-out group-hover/btn:translate-x-1.5" />
                  </a>
                </Button>
                <Button
                  size="xl"
                  variant="glass"
                  asChild
                  className="rounded-full px-6 transition-all duration-400 ease-out hover:border-primary/40"
                >
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
                  <Check className="size-3.5 text-primary" /> Hosted in Montreal (CA)
                </span>
              </div>
            </div>

            {/* Right: Live Server Monitor Card with moving Paper 1.21.4 and active node ticker */}
            <div className="w-full max-w-md mx-auto lg:ml-auto">
              <div className="mb-2.5 flex items-center justify-between text-xs text-muted-foreground px-1 overflow-hidden">
                <div className="animate-ticker-slide flex items-center gap-2 font-medium whitespace-nowrap">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <Terminal className="size-3.5 shrink-0" />
                    <span>Active Node: Montreal (CA-01)</span>
                  </span>
                  <span className="text-muted-foreground/60">·</span>
                  <span className="font-mono text-[11px] text-emerald-300">
                    Paper 1.21.4 (20.0 TPS)
                  </span>
                  <span className="text-muted-foreground/60">·</span>
                  <span className="text-muted-foreground text-[10.5px]">
                    All servers hosted in Montreal
                  </span>
                </div>
              </div>
              <LiveServerCard />
            </div>
          </div>

          {/* Infrastructure Highlights Bar */}
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border/60 pt-5 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Server className="size-3.5 text-primary" /> All Servers Hosted in Montreal, QC
            </span>
            <span className="flex items-center gap-1.5">
              <Cpu className="size-3.5 text-primary" /> AMD EPYC™ 7663 & EPYC 9354
            </span>
            <span className="flex items-center gap-1.5">
              <HardDrive className="size-3.5 text-primary" /> Gen4 NVMe 7,000 MB/s
            </span>
            <span className="flex items-center gap-1.5">
              <Terminal className="size-3.5 text-primary" /> Blueprint Nebula Panel on Pterodactyl®
            </span>
          </div>
        </div>
      </section>

      {/* PLANS SECTION: Dual Tabbed Tiers (Medium Budget vs Premium AMD EPYC 9000) */}
      <section id="plans" className="px-4 py-16 sm:py-20 relative">
        <div className="mx-auto max-w-7xl">
          {/* Section Header with Tier Switcher & Billing Switch */}
          <div className="mb-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Choose Your Architecture Tier
                </p>
                <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 text-[10.5px] font-semibold text-emerald-400">
                  0% Tax · All Covered on Us · 0% VAT
                </span>
              </div>
              <h2 className="text-balance text-3xl font-bold sm:text-4xl">
                Bare-metal performance. Tailored to your scale.
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                All standard servers hosted in Montreal, QC with unmetered speed, plus multi-region
                4th Gen AMD EPYC 9354 instances.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Architecture Tier Tabs */}
              <div className="inline-flex items-center rounded-xl border border-emerald-500/30 bg-black/60 p-1 backdrop-blur-md">
                <button
                  type="button"
                  onClick={() => setPlanCategory("standard")}
                  className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-all cursor-pointer ${
                    planCategory === "standard"
                      ? "bg-zinc-900 text-emerald-400 border border-emerald-500/50 shadow-[0_0_12px_rgba(52,211,153,0.3)]"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Medium Budget & High Speed
                </button>
                <button
                  type="button"
                  onClick={() => setPlanCategory("premium")}
                  className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold transition-all cursor-pointer ${
                    planCategory === "premium"
                      ? "bg-zinc-900 text-emerald-400 border border-emerald-500/50 shadow-[0_0_12px_rgba(52,211,153,0.3)]"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span>Premium AMD EPYC 9000</span>
                  <span className="rounded bg-emerald-500/20 px-1.5 py-0.2 text-[9.5px] font-mono text-emerald-300">
                    DDR5
                  </span>
                </button>
              </div>

              {/* Monthly / Yearly Billing Toggle for standard tiers */}
              {planCategory === "standard" && (
                <div className="inline-flex items-center rounded-xl border border-border/80 bg-secondary/50 p-1">
                  <button
                    type="button"
                    onClick={() => setAnnual(false)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
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
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
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
              )}
            </div>
          </div>

          {/* TAB 1: Medium Budget & High Speed (Servarica · Montreal Nodes) */}
          {planCategory === "standard" && (
            <div>
              <div className="mb-4 flex items-center justify-between rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-emerald-400" />
                  <span>
                    <strong className="text-foreground">Montreal Datacenter:</strong> AMD EPYC™ 7663
                    bare-metal, unmetered network, 20.0 TPS SLA.
                  </span>
                </span>
                <span className="hidden sm:inline text-emerald-400/90 font-mono">
                  All nodes in Montreal, CA
                </span>
              </div>

              {/* 3-IN-A-ROW GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {plans.map((plan) => {
                  const displayPrice = annual ? Math.round(plan.yearly / 12) : plan.monthly;

                  return (
                    <article
                      key={plan.name}
                      className={`group relative flex flex-col rounded-xl border p-4 transition-all duration-400 ease-out hover:-translate-y-1 ${
                        plan.popular
                          ? "border-emerald-500/60 bg-emerald-500/10 shadow-[0_8px_30px_rgba(52,211,153,0.15)] hover:border-emerald-400"
                          : "border-border/80 bg-card/80 hover:border-emerald-500/40 hover:bg-card"
                      }`}
                    >
                      {plan.popular && (
                        <span className="absolute -top-2.5 right-4 rounded-full bg-black border border-emerald-400 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.4)]">
                          Most Popular
                        </span>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="transition-transform duration-400 ease-out group-hover:scale-105">
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

                      <div className="mt-4 border-t border-border/60 pt-3">
                        <div className="flex items-baseline gap-1.5">
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
                        <p className="text-[10.5px] font-medium text-emerald-400 mt-0.5">
                          0% tax · all covered on us · 0% VAT
                        </p>
                      </div>

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
                          <span className="font-medium text-foreground">
                            {plan.storage} GB
                          </span>{" "}
                          NVMe
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Zap className="size-3.5 text-primary shrink-0" />
                          <span className="font-medium text-foreground">{plan.players}</span>
                        </div>
                      </div>

                      <Button
                        variant="extreme"
                        size="sm"
                        className="mt-auto w-full h-9 rounded-full text-xs font-bold cursor-pointer transition-all duration-400 ease-out"
                        asChild
                      >
                        <Link to="/login" className="flex items-center justify-center gap-1.5">
                          <span>Start Your Server</span>
                          <ArrowRight className="size-3.5" />
                        </Link>
                      </Button>
                    </article>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: Premium 4th Gen AMD EPYC 9000 Series (HOSTKEY · Multi-Region) */}
          {planCategory === "premium" && (
            <div className="space-y-6">
              {/* Gemini Architecture Specs Showcase Banner */}
              <div className="rounded-2xl border border-emerald-500/40 bg-zinc-950/90 p-5 sm:p-6 backdrop-blur-xl shadow-[0_0_30px_rgba(52,211,153,0.12)]">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="rounded-lg bg-emerald-500/20 border border-emerald-500/40 px-2.5 py-0.5 text-xs font-mono font-bold text-emerald-300">
                        4th Gen AMD EPYC™ 9354
                      </span>
                      <span className="rounded-lg bg-secondary/80 px-2.5 py-0.5 text-xs font-mono text-muted-foreground">
                        3.25 GHz Base Clock Speed
                      </span>
                      <span className="rounded-lg bg-emerald-500/15 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
                        HOSTKEY Tier-4 Infrastructure
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground max-w-4xl leading-relaxed">
                      <strong className="text-foreground">Hardware Architecture Highlights:</strong>{" "}
                      The exact processor architecture powering these V3 configurations is the 4th
                      Gen AMD EPYC 9354. Paired with next-generation{" "}
                      <strong className="text-emerald-400">DDR5 RAM</strong>, this configuration
                      completely eliminates classic memory data bottlenecks. Enterprise-grade NVMe
                      SSD storage arrays deliver stellar read/write speeds for simultaneous player
                      chunk processing.
                    </p>
                  </div>

                  <div className="rounded-xl border border-border/80 bg-zinc-900/90 p-3 text-xs text-muted-foreground shrink-0">
                    <p className="font-semibold text-foreground flex items-center gap-1.5 mb-1">
                      <Globe2 className="size-3.5 text-emerald-400" /> Supported Regions:
                    </p>
                    <p className="font-mono text-emerald-300">
                      NL · FI · UK · ES · IT + 5 Global PoPs
                    </p>
                  </div>
                </div>
              </div>

              {/* 3-IN-A-ROW HOSTKEY V3 TIERS */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {hostkeyV3Plans.map((tier) => (
                  <article
                    key={tier.name}
                    className={`group relative flex flex-col rounded-2xl border p-5 transition-all duration-400 ease-out hover:-translate-y-1 ${
                      tier.popular
                        ? "border-emerald-500/60 bg-zinc-950/95 shadow-[0_12px_40px_rgba(52,211,153,0.18)]"
                        : "border-border/80 bg-zinc-950/80 hover:border-emerald-500/40"
                    }`}
                  >
                    {/* Badge */}
                    {tier.badge && (
                      <span className="absolute -top-3 right-5 rounded-full bg-black border border-emerald-400 px-3 py-0.5 text-[10.5px] font-bold text-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.4)]">
                        {tier.badge}
                      </span>
                    )}

                    {/* Tier Name & Architecture */}
                    <div className="flex items-start justify-between border-b border-border/70 pb-3.5">
                      <div>
                        <h3 className="font-mono text-xl font-bold text-foreground lowercase">
                          {tier.name}
                        </h3>
                        <p className="text-[11px] font-medium text-emerald-400/90 mt-0.5">
                          {tier.tagline}
                        </p>
                      </div>
                      <span className="rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-xs font-bold text-emerald-400">
                        {tier.discount}
                      </span>
                    </div>

                    {/* Pricing */}
                    <div className="my-3.5 flex items-baseline justify-between">
                      <div>
                        <div className="flex items-baseline">
                          <span className="text-3xl font-extrabold font-display text-foreground">
                            {tier.monthlyPrice}
                          </span>
                          <span className="text-xs text-muted-foreground ml-1">/ month</span>
                        </div>
                        <p className="text-[10.5px] font-medium text-emerald-400 mt-0.5">
                          0% tax · all covered on us · 0% VAT
                        </p>
                      </div>
                      <span className="text-xs font-mono font-medium text-emerald-400">
                        {tier.yearlyTotal}
                      </span>
                    </div>

                    {/* Detailed Hardware Specs */}
                    <div className="my-3 space-y-2 rounded-xl border border-border/70 bg-zinc-900/60 p-3 text-xs text-muted-foreground">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-foreground font-medium">
                          <Cpu className="size-3.5 text-emerald-400" /> Processor
                        </span>
                        <span className="font-mono text-foreground font-bold">{tier.cpu}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-foreground font-medium">
                          <Database className="size-3.5 text-emerald-400" /> RAM
                        </span>
                        <span className="font-mono text-foreground font-bold">
                          {tier.ram} <span className="text-emerald-400 font-normal">DDR5</span>
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-foreground font-medium">
                          <HardDrive className="size-3.5 text-emerald-400" /> Storage
                        </span>
                        <span className="font-mono text-foreground font-bold">{tier.storage}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-foreground font-medium">
                          <Network className="size-3.5 text-emerald-400" /> IPv4 & Traffic
                        </span>
                        <span className="font-mono text-foreground font-bold">{tier.traffic}</span>
                      </div>
                      <div className="flex items-center justify-between pt-1 border-t border-border/50">
                        <span className="text-[11px] text-muted-foreground">Regions</span>
                        <span className="font-mono text-[11px] text-emerald-300 font-semibold">
                          {tier.regions.join(" ")}
                        </span>
                      </div>
                    </div>

                    {/* Buy now button with black & neon green highlight */}
                    <Button
                      variant="extreme"
                      size="sm"
                      className="mt-auto w-full h-10 rounded-full text-xs font-bold tracking-wide cursor-pointer"
                      asChild
                    >
                      <Link to="/login" className="flex items-center justify-center gap-2">
                        <span>Buy now</span>
                        <ArrowRight className="size-4" />
                      </Link>
                    </Button>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* Plan reassurance */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <Check className="size-3.5 text-emerald-400" /> 0% Tax & 0% VAT (all covered on us)
            </span>
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
              Most hosts cram dozens of servers onto cheap consumer nodes. We provision
              high-throughput AMD EPYC™ 7663 enterprise nodes hosted directly with Servarica
              Networks for rock-solid 20.0 TPS and massive memory bandwidth.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="group rounded-xl border border-border/80 bg-card/60 p-5 transition-all duration-400 ease-out hover:border-primary/50 hover:bg-card/90 hover:-translate-y-1"
              >
                <div className="mb-4 grid size-10 place-items-center rounded-lg border border-primary/30 bg-primary/10 text-primary transition-colors duration-400 group-hover:bg-primary/20">
                  <Icon className="size-5" />
                </div>
                <h3 className="text-base font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>

          {/* Servarica Direct Datacenter Showcase & Iframe */}
          <ServaricaShowcase />
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

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-w-5xl mx-auto">
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
                      className={`size-4 text-muted-foreground transition-transform duration-400 ease-out ${
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
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-emerald-500/40 bg-gradient-to-b from-primary/20 via-primary/5 to-transparent px-6 py-12 text-center sm:px-12 sm:py-16 shadow-[0_0_60px_rgba(74,222,128,0.15)]">
          <Sparkles className="mx-auto mb-4 size-9 text-primary animate-pulse" />
          <h2 className="text-balance text-3xl font-bold sm:text-5xl tracking-tight">
            Start building your world today.
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm sm:text-base text-muted-foreground">
            Deploy in under 60 seconds. Choose from our 3-in-a-row server plans with guaranteed
            Servarica AMD EPYC™ 7663 enterprise performance.
          </p>
          <div className="mt-8 flex justify-center">
            <Button
              size="extreme"
              variant="extreme"
              asChild
              className="extreme-glow-btn group/btn cursor-pointer"
            >
              <a href="#plans" className="flex items-center gap-2.5">
                <span className="tracking-wide">Start Your Server</span>
                <ArrowRight className="size-5 transition-transform duration-400 ease-out group-hover/btn:translate-x-1.5" />
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
