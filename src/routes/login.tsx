import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Box, Eye, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import heroAsset from "@/assets/voxel-mountain.jpg.asset.json";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in — BlockForge" },
      { name: "description", content: "Access your BlockForge Minecraft server control panel." },
      { property: "og:title", content: "Log in — BlockForge" },
      { property: "og:description", content: "Access your BlockForge Minecraft server control panel." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [submitted, setSubmitted] = useState(false);
  const submit = (event: FormEvent) => { event.preventDefault(); setSubmitted(true); };
  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden px-4 py-10">
      <img src={heroAsset.url} alt="Rocky mountain landscape" className="absolute inset-0 size-full object-cover opacity-35" />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,var(--background)_15%,transparent_70%,var(--background))]" />
      <Link to="/" className="absolute left-5 top-5 z-10 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"><ArrowLeft className="size-4" /> Back to BlockForge</Link>
      <section className="glass-panel-strong relative z-10 w-full max-w-md rounded-lg p-6 sm:p-8">
        <div className="mb-8 flex items-center gap-2.5 font-display text-xl font-bold"><span className="grid size-9 place-items-center rounded-md bg-primary/15 text-primary"><Box className="size-5" /></span>BlockForge</div>
        <h1 className="text-3xl font-bold">Welcome back.</h1><p className="mt-2 text-sm text-muted-foreground">Your worlds are right where you left them.</p>
        <form onSubmit={submit} className="mt-8 grid gap-5">
          <div className="grid gap-2"><Label htmlFor="email">Email address</Label><div className="relative"><Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input id="email" type="email" required placeholder="you@example.com" className="h-11 bg-background/35 pl-10" /></div></div>
          <div className="grid gap-2"><div className="flex items-center justify-between"><Label htmlFor="password">Password</Label><a href="#" className="text-xs font-semibold text-primary">Forgot password?</a></div><div className="relative"><LockKeyhole className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input id="password" type="password" required placeholder="Enter your password" className="h-11 bg-background/35 px-10" /><Eye className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /></div></div>
          <Button type="submit" variant="hero" size="xl" className="w-full">Enter control panel</Button>
          {submitted && <p role="status" className="rounded-md border border-primary/20 bg-primary/10 p-3 text-center text-xs text-primary">Your account access is being prepared.</p>}
        </form>
        <div className="mt-7 flex items-center justify-center gap-2 text-xs text-muted-foreground"><ShieldCheck className="size-4 text-primary" /> Secure account access</div>
      </section>
    </main>
  );
}