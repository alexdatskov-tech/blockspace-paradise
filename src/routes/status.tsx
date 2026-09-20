import { createFileRoute, Link } from "@tanstack/react-router";
import { Activity, ArrowLeft, Check, Cloud, Gamepad2, Network, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FlagIcon } from "@/components/FlagIcon";
import { Reveal } from "@/components/Reveal";
import { Wallpaper } from "@/components/Wallpaper";
import { allRegions } from "@/lib/plans";

export const Route = createFileRoute("/status")({
  head: () => ({
    meta: [
      { title: "System status — BlockForge" },
      {
        name: "description",
        content:
          "Current operational status of BlockForge hosting, network, control panel and backups.",
      },
      { property: "og:title", content: "BlockForge system status" },
      {
        property: "og:description",
        content: "Current availability for BlockForge hosting services.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StatusPage,
});

const services = [
  {
    icon: Gamepad2,
    name: "Minecraft servers",
    detail: "Java and Bedrock instances",
    uptime: "99.99%",
  },
  { icon: Network, name: "Network", detail: "Routing and uplinks", uptime: "99.98%" },
  { icon: Activity, name: "Control panel", detail: "Panel and API", uptime: "100%" },
  { icon: Cloud, name: "Backups", detail: "Scheduled world snapshots", uptime: "100%" },
];

function StatusPage() {
  return (
    <main className="relative min-h-screen px-4 pb-16 pt-6 text-foreground">
      <Wallpaper veil={0.4} />

      <header className="panel mx-auto flex h-14 max-w-4xl items-center justify-between rounded-xl px-4 sm:px-5">
        <Link to="/" className="flex items-center gap-2.5 font-display font-bold">
          <span className="grid size-8 place-items-center rounded-lg border border-primary/35 bg-primary/12 text-primary">
            <Activity className="size-4" />
          </span>
          BlockForge Status
        </Link>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/">
            <ArrowLeft className="size-4" /> Back home
          </Link>
        </Button>
      </header>

      <div className="mx-auto max-w-4xl">
        <section className="animate-rise-soft py-16 sm:py-24">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1.5 text-[11px] font-semibold tracking-wide text-gold">
            Beta status page
          </span>
          <h1 className="mt-6 text-balance font-display text-4xl font-bold sm:text-5xl">
            Every block is online.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Live service reporting is still in beta. All BlockForge systems are operating normally
            right now.
          </p>
        </section>

        <Reveal>
          <div className="panel edge-light flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div className="flex items-center gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground">
                <Check className="size-5" />
              </span>
              <div>
                <h2 className="font-display text-lg font-semibold">All systems operational</h2>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  No active incidents or scheduled maintenance.
                </p>
              </div>
            </div>
            <span className="flex items-center gap-2 text-xs font-medium text-primary">
              <span className="animate-status size-1.5 rounded-full bg-primary" /> Updated moments
              ago
            </span>
          </div>
        </Reveal>

        <Reveal className="mt-3">
          <div className="panel overflow-hidden">
            {services.map(({ icon: Icon, name, detail, uptime }, index) => (
              <div
                key={name}
                className={`flex flex-wrap items-center justify-between gap-4 p-5 ${
                  index > 0 ? "border-t border-border" : ""
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-border bg-secondary/50 text-primary">
                    <Icon className="size-4" />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold">{name}</h3>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">{detail}</p>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <span className="font-mono text-xs text-muted-foreground">{uptime}</span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary">
                    <span className="size-1.5 rounded-full bg-primary" /> Operational
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-3">
          <div className="panel p-5">
            <h2 className="text-sm font-semibold">Regions</h2>
            <div className="mt-3.5 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
              {allRegions.map((region) => (
                <div
                  key={region.code}
                  className="flex items-center gap-2.5 rounded-lg border border-border bg-[oklch(0.2_0.014_168_/_45%)] p-3"
                >
                  <FlagIcon code={region.code} className="h-3.5 w-5" />
                  <div className="min-w-0">
                    <p className="truncate text-xs font-medium text-foreground">{region.city}</p>
                    <p className="flex items-center gap-1 text-[11px] text-primary">
                      <span className="size-1 rounded-full bg-primary" /> Operational
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-3">
          <div className="panel flex items-center gap-3 p-4 text-xs text-muted-foreground">
            <ShieldCheck className="size-4 shrink-0 text-primary" />
            Monitoring checks run continuously across hosting, network, panel and backup services.
          </div>
        </Reveal>
      </div>
    </main>
  );
}
