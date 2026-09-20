import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Box,
  ExternalLink,
  LockKeyhole,
  Network,
  Puzzle,
  Server,
  Sparkles,
  Cpu,
  HardDrive,
  Globe2,
  Check,
  Zap,
  ShieldCheck,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ServaricaLogo } from "@/components/ServaricaLogo";
import heroAsset from "@/assets/blockforge-world.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About the Platform & Infrastructure Partners — BlockForge" },
      {
        name: "description",
        content:
          "Learn about our infrastructure partners (Servarica Networks & HOSTKEY), bare-metal compute, and open-source tools behind BlockForge.",
      },
      { property: "og:title", content: "About the Platform — BlockForge" },
      {
        property: "og:description",
        content: "The tools, hardware partners, and open-source projects behind BlockForge.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const technologies = [
  {
    icon: Server,
    title: "Pterodactyl®",
    text: "A free, open-source game server management panel built with PHP, React, and Go.",
    href: "https://pterodactyl.io/",
  },
  {
    icon: Sparkles,
    title: "Nebula",
    text: "The refined panel theme used for a focused, modern server management experience.",
    href: "https://nebula.style/",
  },
  {
    icon: Box,
    title: "Blueprint Framework",
    text: "The community-driven, open-source extension framework that supports the Nebula experience.",
    href: "https://blueprint.zip/",
  },
  {
    icon: Puzzle,
    title: "Hangar by PaperMC",
    text: "PaperMC's plugin repository powers fast, trusted plugin discovery and support.",
    href: "https://hangar.papermc.io/",
  },
];

function AboutPage() {
  return (
    <main className="min-h-screen overflow-hidden">
      <section className="relative px-4 pb-20 pt-8">
        <img
          src={heroAsset}
          width={1920}
          height={1080}
          alt="Voxel landscape beneath an emerald aurora"
          className="absolute inset-0 h-[680px] w-full object-cover opacity-35"
        />
        <div className="absolute inset-x-0 top-0 h-[680px] bg-[linear-gradient(to_bottom,var(--background)_0%,transparent_34%,var(--background)_100%)]" />
        <div className="relative mx-auto max-w-6xl">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="size-4" /> Back to BlockForge
            </Link>
            <Button variant="hero" asChild>
              <Link to="/login">Log in</Link>
            </Button>
          </div>
          <div className="animate-rise-soft max-w-3xl pb-28 pt-32">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Under the hood
              </p>
              <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-400">
                0% Tax · 0% VAT Covered On Us
              </span>
            </div>
            <h1 className="text-balance text-5xl font-bold sm:text-7xl">
              Open tools.
              <br />
              <span className="text-primary">Serious craft.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              BlockForge brings dependable bare-metal infrastructure together with respected
              open-source tools to create a calmer, uncompromising way to run Minecraft servers.
            </p>
          </div>
        </div>
      </section>

      {/* INFRASTRUCTURE PARTNERS SECTION */}
      <section className="px-4 pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-2xl">
            <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 font-mono text-xs text-emerald-400 font-semibold">
              Datacenter & Bare-Metal Partners
            </span>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Enterprise Partners Powering BlockForge
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              We partner directly with tier-1 bare-metal infrastructure providers to deliver
              flawless tick rates, unmetered network pipelines, and transparent pricing.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* PARTNER 1: Servarica Networks */}
            <div className="group relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-card/85 p-6 backdrop-blur-xl transition-all hover:border-emerald-400/60 hover:shadow-[0_12px_40px_rgba(52,211,153,0.12)]">
              <div className="flex items-start justify-between gap-4 border-b border-border/70 pb-4">
                <div className="flex items-center gap-3.5">
                  <div className="relative size-12 shrink-0 overflow-hidden rounded-xl border border-emerald-500/40 bg-zinc-950 p-1.5 shadow-[0_0_15px_rgba(52,211,153,0.25)] flex items-center justify-center">
                    <ServaricaLogo className="size-full" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-foreground">Servarica Networks</h3>
                      <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                        Primary Host
                      </span>
                    </div>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                      <MapPin className="size-3 text-emerald-400" />
                      Montreal, Quebec, Canada
                    </p>
                  </div>
                </div>

                <a
                  href="https://servarica.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-lg border border-border/80 bg-zinc-900/80 px-2.5 py-1 text-xs font-medium text-muted-foreground hover:text-emerald-400 transition-colors"
                >
                  <span>servarica.com</span>
                  <ExternalLink className="size-3" />
                </a>
              </div>

              <div className="my-4 rounded-xl border border-emerald-500/25 bg-emerald-500/10 p-3 text-xs text-emerald-300">
                <strong>Montreal Hosting Guarantee:</strong> All standard BlockForge servers are
                hosted directly in Montreal, QC datacenters with low-latency transatlantic and North
                American fiber routing.
              </div>

              <div className="space-y-2.5 text-xs text-muted-foreground">
                <div className="flex items-center justify-between border-b border-border/40 pb-2">
                  <span className="flex items-center gap-1.5 text-foreground font-medium">
                    <Cpu className="size-3.5 text-emerald-400" /> Compute Architecture
                  </span>
                  <span className="font-mono text-foreground font-semibold">AMD EPYC™ 7663</span>
                </div>
                <div className="flex items-center justify-between border-b border-border/40 pb-2">
                  <span className="flex items-center gap-1.5 text-foreground font-medium">
                    <HardDrive className="size-3.5 text-emerald-400" /> Storage Type
                  </span>
                  <span className="font-mono text-foreground font-semibold">
                    Direct NVMe RAID Array
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-foreground font-medium">
                    <Network className="size-3.5 text-emerald-400" /> Network Pipeline
                  </span>
                  <span className="font-mono text-foreground font-semibold">
                    Unmetered Redundant Uplinks
                  </span>
                </div>
              </div>
            </div>

            {/* PARTNER 2: HOSTKEY Infrastructure */}
            <div className="group relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-card/85 p-6 backdrop-blur-xl transition-all hover:border-emerald-400/60 hover:shadow-[0_12px_40px_rgba(52,211,153,0.12)]">
              <div className="flex items-start justify-between gap-4 border-b border-border/70 pb-4">
                <div className="flex items-center gap-3.5">
                  <div className="grid size-12 shrink-0 place-items-center rounded-xl border border-emerald-500/40 bg-zinc-950 text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.25)]">
                    <Server className="size-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-foreground">HOSTKEY Enterprise</h3>
                      <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                        Multi-Region
                      </span>
                    </div>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                      <Globe2 className="size-3 text-emerald-400" />
                      Global Edge Network & Datacenters
                    </p>
                  </div>
                </div>

                <a
                  href="https://hostkey.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-lg border border-border/80 bg-zinc-900/80 px-2.5 py-1 text-xs font-medium text-muted-foreground hover:text-emerald-400 transition-colors"
                >
                  <span>hostkey.com</span>
                  <ExternalLink className="size-3" />
                </a>
              </div>

              <div className="my-4 rounded-xl border border-emerald-500/25 bg-emerald-500/10 p-3 text-xs text-emerald-300">
                <strong>Next-Gen DDR5 Performance:</strong> Powers our Premium AMD EPYC 9000 tiers
                with 3.25 GHz base clocks, dedicated IPv4 addresses, and multi-region deployment.
              </div>

              <div className="space-y-2.5 text-xs text-muted-foreground">
                <div className="flex items-center justify-between border-b border-border/40 pb-2">
                  <span className="flex items-center gap-1.5 text-foreground font-medium">
                    <Cpu className="size-3.5 text-emerald-400" /> Compute Architecture
                  </span>
                  <span className="font-mono text-foreground font-semibold">
                    4th Gen AMD EPYC™ 9354
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-border/40 pb-2">
                  <span className="flex items-center gap-1.5 text-foreground font-medium">
                    <Zap className="size-3.5 text-emerald-400" /> Memory Bus
                  </span>
                  <span className="font-mono text-emerald-400 font-semibold">High-Speed DDR5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-foreground font-medium">
                    <Globe2 className="size-3.5 text-emerald-400" /> Global Locations
                  </span>
                  <span className="font-mono text-foreground font-semibold">
                    12 Global Low-Latency Regions
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 0% Tax / 0% VAT Policy Banner */}
          <div className="mt-8 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="grid size-9 place-items-center rounded-lg bg-emerald-500/20 text-emerald-400 shrink-0">
                <ShieldCheck className="size-5" />
              </div>
              <div>
                <h4 className="font-bold text-foreground text-sm">
                  0% Tax & 0% VAT — All Covered on Us
                </h4>
                <p className="text-xs text-muted-foreground mt-0.5">
                  The pricing you see on BlockForge is the exact final price billed. Zero unexpected
                  sales tax, VAT, or gateway surcharges added at checkout.
                </p>
              </div>
            </div>
            <span className="rounded-lg bg-emerald-400 text-black px-3 py-1 text-xs font-bold shrink-0">
              Guaranteed Transparent Billing
            </span>
          </div>
        </div>
      </section>

      {/* OPEN-SOURCE TECHNOLOGIES */}
      <section className="px-4 pb-24 border-t border-border/40 pt-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-2xl">
            <span className="rounded-full bg-primary/10 border border-primary/30 px-3 py-1 font-mono text-xs text-primary font-semibold">
              Open-Source Foundations
            </span>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Software Stack</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Engineered with community-proven open-source foundations.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {technologies.map(({ icon: Icon, title, text, href }) => (
              <a
                key={title}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="glass-panel smooth-lift group rounded-lg p-7"
              >
                <div className="flex items-start justify-between">
                  <div className="grid size-11 place-items-center rounded-md bg-primary/10 text-primary">
                    <Icon />
                  </div>
                  <ExternalLink className="size-4 text-muted-foreground transition-colors group-hover:text-primary" />
                </div>
                <h2 className="mt-7 text-xl font-semibold">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p>
              </a>
            ))}
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-surface p-7">
              <LockKeyhole className="mb-5 size-6 text-primary" />
              <h2 className="text-2xl font-bold">Encrypted panel data</h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                Sensitive panel data is protected with AES-256-GCM authenticated encryption.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-surface p-7">
              <Network className="mb-5 size-6 text-primary" />
              <h2 className="text-2xl font-bold">Secure server tunnels</h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                Minecraft servers communicate across isolated secure tunnels designed to protect
                management traffic.
              </p>
            </div>
          </div>
          <p className="mt-10 text-xs leading-5 text-muted-foreground">
            Pterodactyl® is a registered trademark of its respective owner. BlockForge is an
            independent project and is not endorsed by Pterodactyl, PaperMC, Mojang, or Microsoft.
          </p>
        </div>
      </section>
    </main>
  );
}
