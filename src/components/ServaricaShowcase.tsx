import React from "react";
import {
  Server,
  ShieldCheck,
  Zap,
  Globe2,
  Cpu,
  HardDrive,
  Database,
  ExternalLink,
  Layers,
  Terminal,
  MapPin,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ServaricaLogo } from "@/components/ServaricaLogo";

export function ServaricaShowcase() {
  return (
    <div className="mt-12 space-y-8">
      {/* SECTION TITLE: Verified Datacenter Partnerships */}
      <div className="text-center max-w-2xl mx-auto">
        <Badge
          variant="outline"
          className="border-emerald-500/40 bg-emerald-500/10 text-emerald-400 font-mono text-xs mb-2.5 px-3 py-1"
        >
          Verified Infrastructure Partners
        </Badge>
        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Bare-Metal Compute & Global Network Backbones
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
          All standard server clusters are hosted directly in Montreal, with global multi-region
          expansions powered by HOSTKEY enterprise nodes.
        </p>
      </div>

      {/* PARTNERSHIP DUAL GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* PARTNER 1: Servarica Networks (Montreal, Canada) */}
        <div className="group relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-card/90 p-5 sm:p-6 backdrop-blur-xl transition-all duration-400 ease-out hover:border-emerald-400/60 hover:shadow-[0_12px_40px_rgba(52,211,153,0.12)] hover:-translate-y-0.5">
          <div className="flex items-start justify-between gap-4 border-b border-border/70 pb-4">
            <div className="flex items-center gap-3.5">
              {/* Hardcoded Servarica Logo from uploaded asset */}
              <div className="relative size-12 shrink-0 overflow-hidden rounded-xl border border-emerald-500/40 bg-zinc-950 p-1.5 shadow-[0_0_15px_rgba(52,211,153,0.25)] flex items-center justify-center">
                <ServaricaLogo className="size-full" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-display text-base font-bold text-foreground">
                    Servarica Networks
                  </h4>
                  <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                    Primary Host
                  </span>
                </div>
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                  <MapPin className="size-3 text-emerald-400" />
                  <span className="text-foreground/90 font-medium">Montreal, Quebec, Canada</span>
                </p>
              </div>
            </div>

            <a
              href="https://servarica.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-lg border border-border/80 bg-zinc-900/80 px-2.5 py-1 text-[11px] font-medium text-muted-foreground hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
            >
              <span>servarica.com</span>
              <ExternalLink className="size-3" />
            </a>
          </div>

          {/* Montreal Hosting Guarantee Callout */}
          <div className="my-3.5 rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-3.5 py-2 text-xs text-emerald-300">
            <strong>Montreal Hosting Guarantee:</strong> All standard BlockForge servers are hosted
            directly in Montreal, QC datacenters with low-latency North American & transatlantic
            routes.
          </div>

          {/* Genuine Real Specs (No Hydro Claims) */}
          <div className="grid grid-cols-2 gap-2.5 text-xs">
            <div className="rounded-xl border border-border/80 bg-background/60 p-3">
              <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                <Cpu className="size-3.5 text-emerald-400" />
                <span className="text-[11px] font-medium">Compute Architecture</span>
              </div>
              <p className="font-semibold text-foreground">AMD EPYC™ 7663</p>
              <p className="text-[10.5px] text-muted-foreground">Zen 3 enterprise server cores</p>
            </div>

            <div className="rounded-xl border border-border/80 bg-background/60 p-3">
              <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                <HardDrive className="size-3.5 text-emerald-400" />
                <span className="text-[11px] font-medium">Storage Array</span>
              </div>
              <p className="font-semibold text-foreground">NVMe / Enterprise SSD</p>
              <p className="text-[10.5px] text-muted-foreground">Hardware RAID-10 redundancy</p>
            </div>

            <div className="rounded-xl border border-border/80 bg-background/60 p-3">
              <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                <Globe2 className="size-3.5 text-emerald-400" />
                <span className="text-[11px] font-medium">Network Uplinks</span>
              </div>
              <p className="font-semibold text-foreground">1 Gbps Unmetered / 10 Gbps</p>
              <p className="text-[10.5px] text-muted-foreground">Multi-homed carrier mesh</p>
            </div>

            <div className="rounded-xl border border-border/80 bg-background/60 p-3">
              <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                <ShieldCheck className="size-3.5 text-emerald-400" />
                <span className="text-[11px] font-medium">Reliability SLA</span>
              </div>
              <p className="font-semibold text-foreground">99.9% Hardware SLA</p>
              <p className="text-[10.5px] text-muted-foreground">24/7 Montreal NOC monitoring</p>
            </div>
          </div>
        </div>

        {/* PARTNER 2: HOSTKEY (Global Multi-Region V3 Nodes) */}
        <div className="group relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-card/90 p-5 sm:p-6 backdrop-blur-xl transition-all duration-400 ease-out hover:border-emerald-400/60 hover:shadow-[0_12px_40px_rgba(52,211,153,0.12)] hover:-translate-y-0.5">
          <div className="flex items-start justify-between gap-4 border-b border-border/70 pb-4">
            <div className="flex items-center gap-3.5">
              <div className="grid size-12 shrink-0 place-items-center rounded-xl border border-emerald-500/40 bg-zinc-950 p-2 text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.25)]">
                <Server className="size-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-display text-base font-bold text-foreground">
                    HOSTKEY Global Nodes
                  </h4>
                  <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                    Multi-Region V3
                  </span>
                </div>
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                  <Globe2 className="size-3 text-emerald-400" />
                  <span className="text-foreground/90 font-medium">
                    NL · FI · UK · ES · IT · DE · US + 5 More
                  </span>
                </p>
              </div>
            </div>

            <a
              href="https://hostkey.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-lg border border-border/80 bg-zinc-900/80 px-2.5 py-1 text-[11px] font-medium text-muted-foreground hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
            >
              <span>hostkey.com</span>
              <ExternalLink className="size-3" />
            </a>
          </div>

          {/* Gemini Architecture Specs Callout */}
          <div className="my-3.5 rounded-xl border border-border/70 bg-zinc-950/80 p-3 text-xs leading-relaxed text-muted-foreground">
            <span className="font-semibold text-emerald-400">
              4th Gen AMD EPYC™ 9354 Architecture:
            </span>{" "}
            Base clock speed of <strong>3.25 GHz</strong> paired with next-generation{" "}
            <strong>DDR5 RAM</strong>, eliminating memory data bottlenecks with enterprise-grade
            NVMe SSD storage arrays.
          </div>

          {/* Genuine HOSTKEY V3 Hardware Specs */}
          <div className="grid grid-cols-2 gap-2.5 text-xs">
            <div className="rounded-xl border border-border/80 bg-background/60 p-3">
              <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                <Cpu className="size-3.5 text-emerald-400" />
                <span className="text-[11px] font-medium">Processor Family</span>
              </div>
              <p className="font-semibold text-foreground">AMD EPYC™ 9354</p>
              <p className="text-[10.5px] text-muted-foreground">3.25 GHz Base Clock</p>
            </div>

            <div className="rounded-xl border border-border/80 bg-background/60 p-3">
              <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                <Database className="size-3.5 text-emerald-400" />
                <span className="text-[11px] font-medium">Memory Standard</span>
              </div>
              <p className="font-semibold text-foreground">Next-Gen DDR5 RAM</p>
              <p className="text-[10.5px] text-muted-foreground">Zero memory throughput lag</p>
            </div>

            <div className="rounded-xl border border-border/80 bg-background/60 p-3">
              <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                <HardDrive className="size-3.5 text-emerald-400" />
                <span className="text-[11px] font-medium">Storage Speed</span>
              </div>
              <p className="font-semibold text-foreground">Enterprise NVMe SSD</p>
              <p className="text-[10.5px] text-muted-foreground">Simultaneous player chunk I/O</p>
            </div>

            <div className="rounded-xl border border-border/80 bg-background/60 p-3">
              <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                <Zap className="size-3.5 text-emerald-400" />
                <span className="text-[11px] font-medium">Network & Traffic</span>
              </div>
              <p className="font-semibold text-foreground">1 Gbit/s Port · 3 TB Inc.</p>
              <p className="text-[10.5px] text-muted-foreground">Dedicated IPv4 on all tiers</p>
            </div>
          </div>
        </div>
      </div>

      {/* PANEL ARCHITECTURE CALLOUT: Blueprint Framework Nebula Theme on Pterodactyl */}
      <div className="overflow-hidden rounded-2xl border border-emerald-500/40 bg-gradient-to-r from-zinc-950 via-zinc-900 to-black p-5 sm:p-6 shadow-[0_0_35px_rgba(52,211,153,0.1)]">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="grid size-11 place-items-center rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 shrink-0">
              <Terminal className="size-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="text-base font-bold text-foreground">Custom Game Panel Interface</h4>
                <span className="rounded-md bg-emerald-500/20 px-2 py-0.5 text-[10px] font-mono font-semibold text-emerald-400">
                  Nebula Theme
                </span>
                <span className="rounded-md bg-secondary/80 px-2 py-0.5 text-[10px] font-mono text-muted-foreground">
                  Open-Source Pterodactyl®
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                Powered by the <strong className="text-foreground">Blueprint framework</strong> with
                the <strong className="text-emerald-400">Nebula theme</strong>, running directly on
                battle-tested open-source <strong className="text-foreground">Pterodactyl®</strong>.
                Instant console, file editor, automatic backup scheduler, and one-click modding.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
              <ShieldCheck className="size-3.5" /> Pterodactyl Core Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
