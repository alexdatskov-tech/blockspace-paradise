import { createFileRoute, Link } from "@tanstack/react-router";
import { Activity, ArrowLeft, Check, Clock3, Cloud, Gamepad2, Network, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/status")({
  head: () => ({
    meta: [
      { title: "System Status — BlockForge" },
      { name: "description", content: "View the current operational status of BlockForge hosting, networking, control panel, and backups." },
      { property: "og:title", content: "BlockForge System Status" },
      { property: "og:description", content: "Current availability for BlockForge hosting services and infrastructure." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StatusPage,
});

const services = [
  { icon: Gamepad2, name: "Minecraft servers", detail: "Java & Bedrock instances", uptime: "99.99%" },
  { icon: Network, name: "Global network", detail: "Secure tunnels and routing", uptime: "99.98%" },
  { icon: Activity, name: "Control panel", detail: "Server management services", uptime: "100%" },
  { icon: Cloud, name: "Backups", detail: "Automated world protection", uptime: "100%" },
];

function StatusPage() {
  return (
    <main className="min-h-screen bg-background px-4 pb-16 pt-6 text-foreground">
      <header className="glass-panel mx-auto flex h-16 max-w-5xl items-center justify-between rounded-lg px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 font-display font-bold"><span className="grid size-8 place-items-center rounded-md border border-primary/30 bg-primary/15 text-primary"><Activity className="size-4" /></span>BlockForge Status</Link>
        <Button variant="ghost" asChild><Link to="/"><ArrowLeft /> Back home</Link></Button>
      </header>

      <section className="mx-auto max-w-5xl pt-20 sm:pt-28">
        <div className="mb-12 max-w-3xl animate-rise-soft">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1.5 text-xs font-bold uppercase text-gold">Beta status page</span>
          <h1 className="mt-6 text-balance text-4xl font-bold sm:text-6xl">Every block is online.</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">Live service reporting is currently in beta. All BlockForge systems are operating normally.</p>
        </div>

        <div className="mb-6 flex flex-col gap-4 rounded-xl border border-primary/40 bg-primary/10 p-6 shadow-[0_0_40px_color-mix(in_oklab,var(--primary)_12%,transparent)] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4"><span className="grid size-11 place-items-center rounded-lg bg-primary text-primary-foreground"><Check className="size-6" /></span><div><h2 className="text-lg font-bold">Systems operational</h2><p className="text-sm text-muted-foreground">No active incidents or scheduled maintenance.</p></div></div>
          <span className="flex items-center gap-2 text-xs font-semibold text-primary"><span className="animate-status size-2 rounded-full bg-primary" /> Updated moments ago</span>
        </div>

        <div className="overflow-hidden rounded-xl border border-border bg-card">
          {services.map(({ icon: Icon, name, detail, uptime }) => (
            <div key={name} className="grid gap-4 border-b border-border p-5 last:border-b-0 sm:grid-cols-[1fr_auto] sm:items-center sm:px-6">
              <div className="flex items-center gap-4"><span className="grid size-10 shrink-0 place-items-center rounded-lg border border-border bg-secondary/60 text-primary"><Icon className="size-5" /></span><div><h3 className="font-semibold">{name}</h3><p className="mt-1 text-xs text-muted-foreground">{detail}</p></div></div>
              <div className="flex items-center justify-between gap-6 pl-14 sm:justify-end sm:pl-0"><span className="text-xs text-muted-foreground">{uptime} uptime</span><span className="inline-flex items-center gap-2 text-xs font-semibold text-primary"><span className="size-1.5 rounded-full bg-primary" /> Operational</span></div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-3 rounded-lg border border-border bg-secondary/35 p-4 text-xs text-muted-foreground"><ShieldCheck className="size-4 shrink-0 text-primary" /><span>Monitoring checks run continuously across hosting, network, panel, and backup services.</span><Clock3 className="ml-auto hidden size-4 shrink-0 sm:block" /></div>
      </section>
    </main>
  );
}