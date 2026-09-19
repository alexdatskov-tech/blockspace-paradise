import React, { useEffect, useState } from "react";
import { Check, Copy, Cpu, Database, Radio, Users, Wifi, Sparkles, Terminal } from "lucide-react";

interface LiveServerCardProps {
  className?: string;
  compact?: boolean;
}

export function LiveServerCard({ className = "", compact = false }: LiveServerCardProps) {
  const [cpu, setCpu] = useState(24);
  const [memory, setMemory] = useState(5.2);
  const [copied, setCopied] = useState(false);
  const [players, setPlayers] = useState(42);
  const serverAddress = "emberfall.blockforge.gg";

  // Simulate realistic live fluctuations
  useEffect(() => {
    const timer = window.setInterval(() => {
      setCpu((prev) => {
        const delta = Math.round(Math.random() * 8 - 4);
        return Math.max(16, Math.min(54, prev + delta));
      });
      setMemory((prev) => {
        const delta = Number((Math.random() * 0.2 - 0.1).toFixed(2));
        return Math.max(4.8, Math.min(6.6, Number((prev + delta).toFixed(1))));
      });
      if (Math.random() > 0.6) {
        setPlayers((prev) => Math.max(38, Math.min(52, prev + (Math.random() > 0.5 ? 1 : -1))));
      }
    }, 2200);
    return () => window.clearInterval(timer);
  }, []);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(serverAddress);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      id="live-server-monitor"
      className={`glass-panel relative w-full rounded-xl border border-emerald-500/25 bg-card/90 p-4 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-all duration-300 sm:p-5 ${className}`}
    >
      {/* Top ambient glow highlight */}
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-border/80 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="relative flex size-2.5 items-center justify-center">
            <span className="animate-ping absolute inline-flex size-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                Live Server
              </span>
              <span className="rounded bg-primary/15 px-1.5 py-0.5 text-[10px] font-bold text-primary">
                20.0 TPS
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <p className="font-mono text-sm font-semibold text-foreground sm:text-base">
                {serverAddress}
              </p>
              <button
                type="button"
                onClick={handleCopy}
                aria-label="Copy server address"
                title="Click to copy IP"
                className="inline-flex size-6 items-center justify-center rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                {copied ? (
                  <Check className="size-3.5 text-emerald-400" />
                ) : (
                  <Copy className="size-3.5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Latency badge */}
        <div className="flex flex-col items-end">
          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-400">
            <Wifi className="size-3" />
            12ms
          </span>
          <span className="text-[10px] text-muted-foreground mt-0.5">US East (VA)</span>
        </div>
      </div>

      {/* Real-time gauges */}
      <div className="grid grid-cols-2 gap-2.5 py-3 sm:gap-3">
        {/* CPU Box */}
        <div className="rounded-lg border border-border/70 bg-background/50 p-2.5 sm:p-3">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="flex items-center gap-1.5 text-xs font-medium">
              <Cpu className="size-3.5 text-primary" />
              CPU Load
            </span>
            <span className="font-mono text-xs font-semibold text-primary">{cpu}%</span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary/80">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary/80 to-primary transition-all duration-700 ease-out"
              style={{ width: `${cpu}%` }}
            />
          </div>
          <p className="mt-1.5 text-[10px] text-muted-foreground">AMD Ryzen 9 7950X3D</p>
        </div>

        {/* Memory Box */}
        <div className="rounded-lg border border-border/70 bg-background/50 p-2.5 sm:p-3">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="flex items-center gap-1.5 text-xs font-medium">
              <Database className="size-3.5 text-gold" />
              DDR5 RAM
            </span>
            <span className="font-mono text-xs font-semibold text-gold">
              {memory.toFixed(1)} / 8 GB
            </span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary/80">
            <div
              className="h-full rounded-full bg-gradient-to-r from-gold/80 to-gold transition-all duration-700 ease-out"
              style={{ width: `${(memory / 8) * 100}%` }}
            />
          </div>
          <p className="mt-1.5 text-[10px] text-muted-foreground">Low Latency DDR5</p>
        </div>
      </div>

      {/* Players online strip */}
      <div className="flex items-center justify-between rounded-lg border border-primary/20 bg-primary/10 px-3 py-2.5 text-xs">
        <div className="flex items-center gap-2">
          <Users className="size-4 text-primary" />
          <span className="text-muted-foreground">Active Players</span>
        </div>
        <div className="flex items-center gap-2">
          <strong className="font-mono font-bold text-foreground">
            {players} <span className="text-muted-foreground font-normal">/ 100</span>
          </strong>
          <span className="size-2 rounded-full bg-emerald-400" />
        </div>
      </div>

      {/* Subtle footer info */}
      <div className="mt-2.5 flex items-center justify-between px-1 text-[10px] text-muted-foreground">
        <span className="flex items-center gap-1">
          <Sparkles className="size-3 text-primary" /> PaperMC 1.21.4
        </span>
        <span className="flex items-center gap-1">
          <Terminal className="size-3" /> Auto-backups active
        </span>
      </div>
    </div>
  );
}
