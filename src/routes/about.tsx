import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Box,
  Cpu,
  Database,
  ExternalLink,
  Globe2,
  HardDrive,
  LockKeyhole,
  Network,
  Puzzle,
  Server,
  ShieldCheck,
  Sparkles,
  Terminal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FlagIcon } from "@/components/FlagIcon";
import { Reveal } from "@/components/Reveal";
import { Wallpaper } from "@/components/Wallpaper";
import { PROVISION_TIME, SSH_ADDON_PRICE, formatUsd, regions } from "@/lib/plans";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About the platform — BlockForge" },
      {
        name: "description",
        content:
          "How BlockForge is built: our own NVMe nodes across five regions, a 1 Gbps+ network, and the open-source tooling behind the panel.",
      },
      { property: "og:title", content: "About the platform — BlockForge" },
      {
        property: "og:description",
        content: "The hardware, network and open-source tools behind BlockForge.",
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
    text: "The open-source game server management panel our control panel is built on, written in PHP, React and Go.",
    href: "https://pterodactyl.io/",
  },
  {
    icon: Sparkles,
    title: "Nebula",
    text: "The panel theme we ship, tuned for a focused, readable server management experience.",
    href: "https://nebula.style/",
  },
  {
    icon: Box,
    title: "Blueprint",
    text: "The community extension framework that lets us add panel features without forking Pterodactyl.",
    href: "https://blueprint.zip/",
  },
  {
    icon: Puzzle,
    title: "Hangar by PaperMC",
    text: "PaperMC's plugin repository, wired into the panel for fast and trustworthy plugin installs.",
    href: "https://hangar.papermc.io/",
  },
];

const stack = [
  {
    icon: Cpu,
    label: "Compute",
    value: "AMD EPYC 7000 & 9000 series",
    detail:
      "The standard range runs on EPYC 7000-series nodes; the premium range on 4th Gen EPYC 9000-series cores. Nodes are capacity-planned rather than packed, so a neighbour's chunk-gen run doesn't eat your tick budget. The exact model within a series varies by node.",
  },
  {
    icon: Database,
    label: "Memory",
    value: "DDR4 ECC and DDR5 ECC",
    detail:
      "The premium range runs DDR5 ECC throughout; the standard range runs registered DDR4 ECC.",
  },
  {
    icon: HardDrive,
    label: "Storage",
    value: "NVMe, RAID-backed",
    detail:
      "Every plan sits on NVMe. Nothing in the world-save path touches a spinning disk or a network volume.",
  },
  {
    icon: Network,
    label: "Network",
    value: "1 Gbps+ per node",
    detail:
      "A 1 Gbps port minimum with several TB of included traffic, rising to multi-gigabit on the premium range.",
  },
];

function AboutPage() {
  return (
    <main className="relative min-h-screen text-foreground">
      <Wallpaper />

      <div className="mx-auto max-w-5xl px-4 py-6">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" /> Back to BlockForge
          </Link>
          <Button variant="hero" size="sm" asChild>
            <Link to="/login">Log in</Link>
          </Button>
        </div>

        {/* Intro */}
        <section className="animate-rise-soft py-20 sm:py-28">
          <h1 className="max-w-3xl text-balance font-display text-[2.75rem] font-bold leading-[1.03] sm:text-6xl">
            We run the servers.
            <br />
            <span className="text-primary">You run the world.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            BlockForge owns the whole path between your players and your world: the nodes, the
            network, the panel and the support queue. No hand-offs, no finger-pointing at a third
            party when something needs fixing.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="xl" variant="hero" asChild>
              <Link to="/" hash="plans" className="group/cta">
                See the plans
                <ArrowRight className="size-4 transition-transform duration-300 group-hover/cta:translate-x-0.5" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Hardware */}
        <Reveal as="section" className="pb-16">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">What we build on</h2>
          <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Every BlockForge server runs on hardware we operate, in datacentres we deploy into
            directly. Here is what that means in practice.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {stack.map(({ icon: Icon, label, value, detail }) => (
              <div key={label} className="panel p-5">
                <div className="flex items-center gap-2.5">
                  <span className="grid size-8 place-items-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
                    <Icon className="size-4" />
                  </span>
                  <span className="label-tiny">{label}</span>
                </div>
                <p className="mt-3 font-display text-base font-semibold text-foreground">{value}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{detail}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Regions */}
        <Reveal as="section" className="pb-16">
          <div className="panel p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
                <Globe2 className="size-4.5" />
              </span>
              <div>
                <h2 className="font-display text-lg font-semibold">Five regions, one price</h2>
                <p className="mt-1.5 max-w-2xl text-xs leading-relaxed text-muted-foreground">
                  Pick whichever region is closest to your players. None of them carry a surcharge,
                  and you can let the region picker choose for you at checkout.
                </p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
              {regions.map((region) => (
                <div
                  key={region.code}
                  className="flex items-center gap-2.5 rounded-lg border border-border bg-[oklch(0.2_0.014_168_/_45%)] p-3"
                >
                  <FlagIcon code={region.code} className="h-3.5 w-5" />
                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold text-foreground">{region.city}</p>
                    <p className="truncate text-[11px] text-muted-foreground">{region.country}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* SSH + provisioning */}
        <Reveal as="section" className="pb-16">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="panel p-5 sm:p-6">
              <span className="grid size-9 place-items-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
                <Terminal className="size-4.5" />
              </span>
              <h2 className="mt-4 font-display text-lg font-semibold">Root SSH access</h2>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Most Minecraft hosts hand you a web panel and nothing else. We will give you a real
                shell on the machine for {formatUsd(SSH_ADDON_PRICE)} per month — free with a promo
                code — so you can install your own tooling, script your own restarts and tune JVM
                flags yourself.
              </p>
            </div>

            <div className="panel p-5 sm:p-6">
              <span className="grid size-9 place-items-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
                <ShieldCheck className="size-4.5" />
              </span>
              <h2 className="mt-4 font-display text-lg font-semibold">
                Honest setup times and pricing
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Provisioning takes {PROVISION_TIME} and we say so rather than advertising sixty
                seconds and missing it. The price on the plan is the price on the invoice: no tax,
                no VAT, no gateway surcharge bolted on at checkout.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Open source */}
        <Reveal as="section" className="pb-16">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">Open-source foundations</h2>
          <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            The control panel is not something we invented from scratch. It stands on projects the
            Minecraft hosting community has hardened for years, and we would rather name them than
            pretend otherwise.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {technologies.map(({ icon: Icon, title, text, href }) => (
              <a
                key={title}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="panel lift group block p-5"
              >
                <div className="flex items-start justify-between">
                  <span className="grid size-9 place-items-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
                    <Icon className="size-4.5" />
                  </span>
                  <ExternalLink className="size-3.5 text-muted-foreground transition-colors group-hover:text-primary" />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold">{title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{text}</p>
              </a>
            ))}
          </div>
        </Reveal>

        {/* Security */}
        <Reveal as="section" className="pb-16">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="panel p-5 sm:p-6">
              <LockKeyhole className="size-5 text-primary" />
              <h2 className="mt-4 font-display text-lg font-semibold">Encrypted panel data</h2>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Sensitive panel data is stored with AES-256-GCM authenticated encryption.
              </p>
            </div>
            <div className="panel p-5 sm:p-6">
              <Network className="size-5 text-primary" />
              <h2 className="mt-4 font-display text-lg font-semibold">
                Isolated management traffic
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Panel-to-node communication runs over isolated tunnels, separate from the ports your
                players connect to.
              </p>
            </div>
          </div>

          <p className="mt-8 text-[11px] leading-relaxed text-muted-foreground">
            Pterodactyl® is a registered trademark of its respective owner. BlockForge is an
            independent project and is not endorsed by Pterodactyl, PaperMC, Mojang or Microsoft.
          </p>
        </Reveal>
      </div>
    </main>
  );
}
