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
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import heroAsset from "@/assets/blockforge-world.jpg";
import servaricaAsset from "@/assets/servarica-logo.png.asset.json";
import trustpilotAsset from "@/assets/trustpilot-logo.svg.asset.json";

const plans = [
  { ram: 2, cpu: 2, storage: 60, monthly: 9, yearly: 79, discount: 23 },
  { ram: 4, cpu: 4, storage: 120, monthly: 14, yearly: 134, popular: true },
  { ram: 6, cpu: 6, storage: 180, monthly: 19, yearly: 189 },
  { ram: 8, cpu: 8, storage: 240, monthly: 24, yearly: 244 },
  { ram: 12, cpu: 12, storage: 360, monthly: 34, yearly: 354 },
  { ram: 16, cpu: 16, storage: 480, monthly: 44, yearly: 464 },
  { ram: 24, cpu: 24, storage: 720, monthly: 64, yearly: 684 },
];

const reviews = [
  { name: "Maya R.", server: "Cinder SMP", score: 4.8, text: "We moved 70 players over in one night. Not a single hitch." },
  { name: "Noah K.", server: "Skybound", score: 5, text: "The world loads fast, even when everyone flies in different directions." },
  { name: "Eli T.", server: "Redstone Labs", score: 4.5, text: "Modpack setup was painless and the panel feels incredibly sharp." },
  { name: "Sofia M.", server: "Mossrealm", score: 4.3, text: "Stable performance through every event weekend so far." },
  { name: "Jay D.", server: "Voidcraft", score: 5, text: "Finally, hosting that disappears so we can just play." },
];

const features = [
  { icon: Zap, title: "Instant worlds", text: "Launch your server in seconds with optimized defaults." },
  { icon: ShieldCheck, title: "Always protected", text: "DDoS protection and automatic backups included." },
  { icon: CircleGauge, title: "No lag excuses", text: "High-clock CPUs and fast NVMe storage on every plan." },
];

const tierNames = ["Sprout", "Copper", "Iron", "Gold", "Diamond", "Emerald", "Netherite"];

function PlanGlyph({ index }: { index: number }) {
  const cells = Array.from({ length: Math.min(index + 1, 7) });
  return (
    <svg viewBox="0 0 44 44" role="img" aria-label={`${tierNames[index]} tier emblem`} className="size-11 overflow-visible">
      <path d="M22 2 40 12v20L22 42 4 32V12Z" className="fill-primary/10 stroke-primary/55" strokeWidth="1.5" />
      <path d="m22 7 13 7v14l-13 7-13-7V14Z" className="fill-background/60 stroke-border" />
      {cells.map((_, cell) => {
        const angle = (cell / Math.max(cells.length, 1)) * Math.PI * 2 - Math.PI / 2;
        const radius = cells.length === 1 ? 0 : 7;
        return <rect key={cell} x={19 + Math.cos(angle) * radius} y={19 + Math.sin(angle) * radius} width="6" height="6" rx="1" className="fill-primary" />;
      })}
    </svg>
  );
}

function LiveServerCard() {
  const [cpu, setCpu] = useState(28);
  const [memory, setMemory] = useState(5.2);
  useEffect(() => {
    const timer = window.setInterval(() => {
      setCpu((value) => Math.max(18, Math.min(68, value + Math.round(Math.random() * 14 - 7))));
      setMemory((value) => Math.max(4.6, Math.min(6.9, Number((value + (Math.random() * 0.34 - 0.17)).toFixed(1)))));
    }, 1800);
    return () => window.clearInterval(timer);
  }, []);
  return (
    <div className="glass-panel ml-auto w-full max-w-sm rounded-xl p-5">
      <div className="flex items-center justify-between border-b border-border pb-4"><div><p className="text-xs text-muted-foreground">Your server</p><p className="mt-1 font-display font-semibold">emberfall.blockforge.gg</p></div><span className="flex items-center gap-2 text-xs font-semibold text-primary"><span className="animate-status size-2 rounded-full bg-primary" /> Live</span></div>
      <div className="grid grid-cols-2 gap-3 py-4">
        <div className="rounded-md border border-border bg-background/35 p-3"><Cpu className="mb-4 size-4 text-primary" /><p className="font-display text-2xl font-bold tabular-nums transition-all duration-700">{cpu}%</p><p className="text-xs text-muted-foreground">CPU load</p><div className="mt-2 h-1 overflow-hidden rounded-full bg-secondary"><div className="h-full rounded-full bg-primary transition-all duration-1000" style={{ width: `${cpu}%` }} /></div></div>
        <div className="rounded-md border border-border bg-background/35 p-3"><Database className="mb-4 size-4 text-gold" /><p className="font-display text-2xl font-bold tabular-nums transition-all duration-700">{memory.toFixed(1)} GB</p><p className="text-xs text-muted-foreground">Memory</p><div className="mt-2 h-1 overflow-hidden rounded-full bg-secondary"><div className="h-full rounded-full bg-gold transition-all duration-1000" style={{ width: `${(memory / 8) * 100}%` }} /></div></div>
      </div>
      <div className="flex items-center justify-between rounded-md bg-primary/10 px-3 py-3 text-sm"><span className="text-muted-foreground">Players online</span><strong className="text-primary">42 / 100</strong></div>
    </div>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BlockForge — Minecraft Server Hosting Built for Big Worlds" },
      { name: "description", content: "Fast Minecraft server hosting with instant setup, NVMe storage, and 10 Gbps connectivity." },
      { property: "og:title", content: "BlockForge — Build bigger worlds" },
      { property: "og:description", content: "Premium Minecraft server hosting with serious performance and simple controls." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

function Brand() {
  return (
    <Link to="/" className="flex items-center gap-2.5 font-display text-lg font-bold text-foreground">
      <span className="grid size-8 place-items-center rounded-md border border-primary/30 bg-primary/15 text-primary">
        <Box className="size-5" strokeWidth={2.4} />
      </span>
      BlockForge
    </Link>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <div className="glass-panel mx-auto flex h-16 max-w-7xl items-center justify-between rounded-lg px-4 md:px-6">
        <Brand />
        <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex" aria-label="Main navigation">
          <a href="#plans" className="transition-colors hover:text-foreground">Plans</a>
          <a href="#features" className="transition-colors hover:text-foreground">Performance</a>
          <a href="#reviews" className="transition-colors hover:text-foreground">Reviews</a>
          <Link to="/about" className="transition-colors hover:text-foreground">About</Link>
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" asChild><Link to="/login">Log in</Link></Button>
          <Button variant="hero" asChild><a href="#plans">Choose a server</a></Button>
        </div>
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu">
          <Menu />
        </Button>
      </div>
      {open && (
        <div className="glass-panel-strong mx-auto mt-2 grid max-w-7xl gap-2 rounded-lg p-3 md:hidden">
          <a href="#plans" className="rounded-md px-3 py-2 text-sm" onClick={() => setOpen(false)}>Plans</a>
          <a href="#features" className="rounded-md px-3 py-2 text-sm" onClick={() => setOpen(false)}>Performance</a>
          <a href="#reviews" className="rounded-md px-3 py-2 text-sm" onClick={() => setOpen(false)}>Reviews</a>
          <Link to="/about" className="rounded-md px-3 py-2 text-sm" onClick={() => setOpen(false)}>About</Link>
          <Button variant="hero" asChild><Link to="/login">Log in</Link></Button>
        </div>
      )}
    </header>
  );
}

function HomePage() {
  const [annual, setAnnual] = useState(false);
  return (
    <main>
      <Header />

      <section className="relative min-h-[92svh] overflow-hidden px-4 pb-16 pt-32 md:pt-40">
        <img src={heroAsset} width={1920} height={1080} alt="Voxel forest and block-built village beneath an emerald aurora" className="absolute inset-0 size-full object-cover object-center opacity-65" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--background)_0%,transparent_22%,transparent_52%,var(--background)_96%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--background)_0%,transparent_68%)] opacity-90" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_.9fr]">
          <div className="max-w-3xl animate-rise-soft">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary backdrop-blur-md">
              <span className="animate-status size-1.5 rounded-full bg-primary" />
              All systems operational
            </div>
            <h1 className="text-balance text-5xl font-bold leading-[1.02] sm:text-6xl md:text-7xl lg:text-[5.4rem]">
              Your world.<br /><span className="text-primary">Unchained.</span>
            </h1>
            <p className="mt-6 max-w-xl text-balance text-base leading-7 text-muted-foreground md:text-lg">
              Minecraft hosting built for ambitious worlds. Serious power, instant setup, and zero server drama.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="xl" variant="hero" asChild><a href="#plans">Forge your server <ArrowRight /></a></Button>
              <Button size="xl" variant="glass" asChild><a href="#features">See the performance</a></Button>
            </div>
            <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-xs font-medium text-muted-foreground">
              <span className="flex items-center gap-2"><Check className="size-4 text-primary" /> Ready in 60 seconds</span>
              <span className="flex items-center gap-2"><Check className="size-4 text-primary" /> 24/7 protection</span>
              <span className="flex items-center gap-2"><Check className="size-4 text-primary" /> Cancel anytime</span>
            </div>
          </div>

          <div className="animate-float hidden lg:block"><LiveServerCard /></div>
        </div>
        <div className="relative mx-auto mt-20 flex max-w-7xl flex-wrap items-center justify-between gap-4 border-t border-border pt-5 text-xs text-muted-foreground">
          <span>Built for Java & Bedrock</span><span>10 Gbps network</span><span>Global-ready infrastructure</span><span>Full mod & plugin support</span>
        </div>
      </section>

      <section id="features" className="px-4 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-2xl"><p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">Performance by design</p><h2 className="text-balance text-3xl font-bold sm:text-5xl">Built to keep up with your imagination.</h2></div>
          <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-3">
            {features.map(({ icon: Icon, title, text }) => (
              <article key={title} className="bg-surface p-7 transition-colors hover:bg-secondary/70 md:p-9">
                <div className="mb-8 grid size-11 place-items-center rounded-md border border-primary/20 bg-primary/10 text-primary"><Icon /></div>
                <h3 className="text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div className="glass-panel smooth-lift rounded-lg p-5"><LockKeyhole className="mb-4 size-5 text-primary" /><h3 className="font-semibold">Encrypted control</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">The Minecraft panel uses AES-256-GCM encryption for protected account data.</p></div>
            <div className="glass-panel smooth-lift rounded-lg p-5"><Network className="mb-4 size-5 text-primary" /><h3 className="font-semibold">Secure tunnels</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Minecraft server traffic runs over secure, isolated network tunnels.</p></div>
            <div className="glass-panel smooth-lift rounded-lg p-5"><Sparkles className="mb-4 size-5 text-primary" /><h3 className="font-semibold">Hangar-ready</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Plugin discovery is powered by <a href="https://hangar.papermc.io/" target="_blank" rel="noreferrer" className="text-primary hover:underline">Hangar by PaperMC</a>.</p></div>
          </div>
        </div>
      </section>

      <section id="plans" className="px-4 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl"><p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">Pick your power</p><h2 className="text-balance text-3xl font-bold sm:text-5xl">No mystery. Just more world.</h2><p className="mt-4 text-muted-foreground">Every plan includes NVMe storage, protection, backups, and our full control panel.</p></div>
            <div className="inline-flex w-fit rounded-md border border-border bg-secondary/60 p-1">
              <Button size="sm" variant={!annual ? "default" : "ghost"} onClick={() => setAnnual(false)}>Monthly</Button>
              <Button size="sm" variant={annual ? "default" : "ghost"} onClick={() => setAnnual(true)}>Yearly <span className="ml-1 opacity-75">Save 20%</span></Button>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {plans.map((plan, index) => (
              <article key={plan.ram} className={`group relative flex min-h-[350px] flex-col overflow-hidden rounded-lg border p-5 smooth-lift ${plan.popular ? "border-primary/55 bg-primary/10 shadow-[0_20px_60px_color-mix(in_oklab,var(--primary)_10%,transparent)]" : "border-border bg-card hover:border-primary/30"}`}>
                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/2 -translate-x-[160%] skew-x-[-18deg] bg-primary/5 group-hover:animate-shimmer" />
                {plan.popular && <span className="absolute -top-3 left-4 rounded bg-primary px-2.5 py-1 text-[10px] font-bold uppercase text-primary-foreground">Most popular</span>}
                {plan.discount && <span className="absolute right-3 top-3 rounded-md border border-gold/30 bg-gold/10 px-2 py-1 text-[10px] font-bold text-gold">−{plan.discount}%</span>}
                <div className="flex items-center justify-between"><div className="transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110"><PlanGlyph index={index} /></div><span className="text-xs text-muted-foreground">{tierNames[index]}</span></div>
                <div className="mt-6"><span className="text-4xl font-bold">${annual ? Math.round(plan.yearly / 12) : plan.monthly}</span><span className="text-sm text-muted-foreground"> /mo</span></div>
                {annual && <p className="mt-1 text-xs text-primary">${plan.yearly} billed yearly</p>}
                <ul className="my-6 grid gap-3 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2"><Database className="size-4 text-primary" /><strong className="text-foreground">{plan.ram} GB</strong> RAM</li>
                  <li className="flex items-center gap-2"><Cpu className="size-4 text-primary" /><strong className="text-foreground">{plan.cpu}</strong> CPU cores</li>
                  <li className="flex items-center gap-2"><HardDrive className="size-4 text-primary" /><strong className="text-foreground">{plan.storage} GB</strong> NVMe</li>
                </ul>
                <Button variant={plan.popular ? "hero" : "glass"} className="mt-auto w-full">Choose plan <ArrowRight /></Button>
              </article>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground"><span className="flex items-center gap-1.5"><Globe2 className="size-3.5" /> 10 Gbps network</span><span className="flex items-center gap-1.5"><ShieldCheck className="size-3.5" /> DDoS protection</span><span className="flex items-center gap-1.5"><Clock3 className="size-3.5" /> Instant activation</span></div>
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="glass-panel mx-auto flex max-w-2xl flex-col items-center justify-between gap-4 rounded-2xl px-5 py-4 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-3"><img src={servaricaAsset.url} alt="Servarica logo" className="size-9 rounded-lg bg-foreground/95 p-1" /><div><p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Powered by our partner</p><p className="font-display text-base font-bold">Servarica</p></div></div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground"><ShieldCheck className="size-4 text-primary" /> Reliable infrastructure. Forged for play.</div>
        </div>
      </section>

      <section id="reviews" className="overflow-hidden py-24">
        <div className="mx-auto mb-10 max-w-7xl px-4 text-center"><p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">Player approved</p><h2 className="text-3xl font-bold sm:text-5xl">Worlds worth staying for.</h2><a href="https://www.trustpilot.com/" target="_blank" rel="noreferrer" className="mx-auto mt-6 inline-flex items-center gap-3 rounded-md border border-border bg-secondary/55 px-4 py-2 transition-colors hover:border-primary/30"><img src={trustpilotAsset.url} alt="Trustpilot" className="h-5 w-auto" /><span className="text-xs text-muted-foreground">Community rating · View reviews</span></a></div>
        <div className="group flex w-max animate-marquee gap-4 px-2 hover:[animation-play-state:paused]">
          {[...reviews, ...reviews].map((review, index) => (
            <article key={`${review.name}-${index}`} className="glass-panel smooth-lift w-[320px] shrink-0 rounded-lg p-6 sm:w-[390px]">
              <div className="mb-5 flex items-center justify-between"><div className="flex gap-1">{Array.from({ length: 5 }).map((_, i) => <span key={i} className={`grid size-6 place-items-center rounded-sm ${i < Math.ceil(review.score) ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>★</span>)}</div><strong className="text-sm">{review.score.toFixed(1)}</strong></div>
              <p className="min-h-14 text-sm leading-6">“{review.text}”</p><div className="mt-5 border-t border-border pt-4"><p className="text-sm font-bold">{review.name}</p><p className="text-xs text-muted-foreground">{review.server}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 py-24">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-lg border border-primary/20 bg-primary/10 px-6 py-16 text-center md:px-12 md:py-24">
          <Sparkles className="mx-auto mb-6 size-8 text-primary" />
          <h2 className="text-balance text-4xl font-bold sm:text-6xl">Your best world starts here.</h2>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">Pick your power, invite your crew, and make something unforgettable.</p>
          <Button size="xl" variant="hero" className="mt-8" asChild><a href="#plans">Start building <ArrowRight /></a></Button>
        </div>
      </section>

      <footer className="border-t border-border px-4 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 sm:flex-row"><Brand /><p className="text-xs text-muted-foreground">© 2026 BlockForge. Not affiliated with Mojang or Microsoft.</p><div className="flex gap-5 text-xs text-muted-foreground"><a href="#plans">Plans</a><Link to="/about">About</Link><Link to="/login">Log in</Link></div></div>
      </footer>
    </main>
  );
}