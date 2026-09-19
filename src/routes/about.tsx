import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Box, ExternalLink, LockKeyhole, Network, Puzzle, Server, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroAsset from "@/assets/blockforge-world.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About the Platform — BlockForge" },
      { name: "description", content: "Learn about the open-source tools and security foundations behind the BlockForge Minecraft hosting experience." },
      { property: "og:title", content: "About the Platform — BlockForge" },
      { property: "og:description", content: "The tools, security, and open-source projects behind BlockForge." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const technologies = [
  { icon: Server, title: "Pterodactyl®", text: "A free, open-source game server management panel built with PHP, React, and Go.", href: "https://pterodactyl.io/" },
  { icon: Sparkles, title: "Nebula", text: "The refined panel theme used for a focused, modern server management experience.", href: "https://nebula.style/" },
  { icon: Box, title: "Blueprint Framework", text: "The community-driven, open-source extension framework that supports the Nebula experience.", href: "https://blueprint.zip/" },
  { icon: Puzzle, title: "Hangar by PaperMC", text: "PaperMC's plugin repository powers fast, trusted plugin discovery and support.", href: "https://hangar.papermc.io/" },
];

function AboutPage() {
  return (
    <main className="min-h-screen overflow-hidden">
      <section className="relative px-4 pb-20 pt-8">
        <img src={heroAsset} width={1920} height={1080} alt="Voxel landscape beneath an emerald aurora" className="absolute inset-0 h-[680px] w-full object-cover opacity-35" />
        <div className="absolute inset-x-0 top-0 h-[680px] bg-[linear-gradient(to_bottom,var(--background)_0%,transparent_34%,var(--background)_100%)]" />
        <div className="relative mx-auto max-w-6xl">
          <div className="flex items-center justify-between"><Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" /> Back to BlockForge</Link><Button variant="hero" asChild><Link to="/login">Log in</Link></Button></div>
          <div className="animate-rise-soft max-w-3xl pb-28 pt-32"><p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-primary">Under the hood</p><h1 className="text-balance text-5xl font-bold sm:text-7xl">Open tools.<br /><span className="text-primary">Serious craft.</span></h1><p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">BlockForge brings dependable infrastructure together with respected open-source tools to create a calmer way to run Minecraft servers.</p></div>
        </div>
      </section>

      <section className="px-4 pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-4 md:grid-cols-2">
            {technologies.map(({ icon: Icon, title, text, href }) => (
              <a key={title} href={href} target="_blank" rel="noreferrer" className="glass-panel smooth-lift group rounded-lg p-7">
                <div className="flex items-start justify-between"><div className="grid size-11 place-items-center rounded-md bg-primary/10 text-primary"><Icon /></div><ExternalLink className="size-4 text-muted-foreground transition-colors group-hover:text-primary" /></div>
                <h2 className="mt-7 text-xl font-semibold">{title}</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p>
              </a>
            ))}
          </div>
          <div className="mt-16 grid gap-5 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-surface p-7"><LockKeyhole className="mb-5 size-6 text-primary" /><h2 className="text-2xl font-bold">Encrypted panel data</h2><p className="mt-3 leading-7 text-muted-foreground">Sensitive panel data is protected with AES-256-GCM authenticated encryption.</p></div>
            <div className="rounded-lg border border-border bg-surface p-7"><Network className="mb-5 size-6 text-primary" /><h2 className="text-2xl font-bold">Secure server tunnels</h2><p className="mt-3 leading-7 text-muted-foreground">Minecraft servers communicate across isolated secure tunnels designed to protect management traffic.</p></div>
          </div>
          <p className="mt-10 text-xs leading-5 text-muted-foreground">Pterodactyl® is a registered trademark of its respective owner. BlockForge is an independent project and is not endorsed by Pterodactyl, PaperMC, Mojang, or Microsoft.</p>
        </div>
      </section>
    </main>
  );
}