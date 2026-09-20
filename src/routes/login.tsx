import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Box, Eye, EyeOff, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wallpaper } from "@/components/Wallpaper";
import cavernAsset from "@/assets/blockforge-cavern.jpg";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in — BlockForge" },
      { name: "description", content: "Access your BlockForge server control panel." },
      { property: "og:title", content: "Log in — BlockForge" },
      {
        property: "og:description",
        content: "Access your BlockForge server control panel.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="relative grid min-h-screen place-items-center px-4 py-10">
      <Wallpaper src={cavernAsset} parallax={0} veil={0.42} />

      <Link
        to="/"
        className="absolute left-5 top-5 z-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> Back to BlockForge
      </Link>

      <section className="panel-strong edge-light animate-rise-soft relative z-10 w-full max-w-md p-6 sm:p-8">
        <div className="flex items-center gap-2.5 font-display text-lg font-bold">
          <span className="grid size-8 place-items-center rounded-lg border border-primary/35 bg-primary/12 text-primary">
            <Box className="size-4.5" strokeWidth={2.2} />
          </span>
          BlockForge
        </div>

        <h1 className="mt-7 font-display text-3xl font-bold">Welcome back.</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Your worlds are right where you left them.
        </p>

        <form onSubmit={submit} className="mt-7 grid gap-5">
          <div className="grid gap-1.5">
            <Label htmlFor="email">Email address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="h-11 pl-10"
              />
            </div>
          </div>

          <div className="grid gap-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <a href="#" className="text-xs font-semibold text-primary hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <LockKeyhole className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                placeholder="Enter your password"
                className="h-11 px-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1.5 text-muted-foreground transition-colors hover:text-foreground"
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          <Button type="submit" variant="hero" size="xl" className="w-full">
            Enter control panel
          </Button>

          {submitted && (
            <p
              role="status"
              className="rounded-lg border border-primary/25 bg-primary/10 p-3 text-center text-xs text-primary"
            >
              Your account access is being prepared.
            </p>
          )}
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          No account yet?{" "}
          <Link to="/" hash="plans" className="font-semibold text-primary hover:underline">
            Choose a server
          </Link>
        </p>

        <div className="mt-6 flex items-center justify-center gap-2 border-t border-border pt-5 text-xs text-muted-foreground">
          <ShieldCheck className="size-4 text-primary" /> Secure account access
        </div>
      </section>
    </main>
  );
}
