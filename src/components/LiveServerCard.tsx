import React, { useEffect, useState } from "react";
import {
  Check,
  Copy,
  Cpu,
  Database,
  Radio,
  Users,
  Wifi,
  Sparkles,
  Terminal,
  Activity,
  Layers,
  Clock,
  ShieldCheck,
} from "lucide-react";

interface LiveServerCardProps {
  className?: string;
  compact?: boolean;
}

export function LiveServerCard({ className = "", compact = false }: LiveServerCardProps) {
  // Realistic server telemetry metrics
  const [tps, setTps] = useState(20.0);
  const [mspt, setMspt] = useState(13.8); // Milliseconds Per Tick (standard Paper/Purpur metric)
  const [cpu, setCpu] = useState(30);
  const [memory, setMemory] = useState(5.3);
  const [players, setPlayers] = useState(42);
  const [ping, setPing] = useState(12);
  const [copied, setCopied] = useState(false);
  const [logTick, setLogTick] = useState<string>("[Server] [Paper] 20.00 TPS - Tick time: 13.8ms");

  const serverAddress = "emberfall.blockforge.gg";

  // Simulate realistic Minecraft Paper server telemetry fluctuations with high frequency
  useEffect(() => {
    const timer = window.setInterval(() => {
      // Natural MSPT oscillation between 12.8ms and 15.2ms
      const newMspt = Number((13.2 + Math.random() * 1.6).toFixed(1));
      setMspt(newMspt);

      // TPS micro-variance around solid 20.00
      if (Math.random() > 0.8) {
        setTps(Number((19.98 + Math.random() * 0.02).toFixed(2)));
      } else {
        setTps(20.0);
      }

      // CPU load frequently oscillating tightly around 30% (28% - 32%)
      setCpu((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2; // -2 to +2
        const nextVal = prev + delta;
        return Math.max(27, Math.min(33, nextVal));
      });

      // RAM usage fluctuating frequently around 5.3 GB (5.2 - 5.4 GB, ~66% JVM Heap)
      setMemory((prev) => {
        const step = Math.random() * 0.08 - 0.04;
        const nextMem = Number((prev + step).toFixed(2));
        return Math.max(5.18, Math.min(5.42, nextMem));
      });

      // Ping micro-jitter (11-14ms to Montreal)
      setPing((prev) => Math.max(11, Math.min(15, prev + (Math.random() > 0.5 ? 1 : -1))));

      // Players count realistic join/leave
      if (Math.random() > 0.75) {
        setPlayers((prev) => Math.max(40, Math.min(46, prev + (Math.random() > 0.5 ? 1 : -1))));
      }

      // Live console line update
      const events = [
        `[Server thread/INFO] [Paper 1.21.4]: World auto-save completed in 12ms`,
        `[Server thread/INFO] [Paper 1.21.4]: Tick time avg: ${newMspt}ms · 0 skipped`,
        `[Server thread/INFO] [Paper 1.21.4]: Chunk cache healthy · 1,420 chunks loaded`,
        `[Server thread/INFO] [Paper 1.21.4]: GC cleared 190MB heap · 20.00 TPS`,
        `[Server thread/INFO] [Paper 1.21.4]: Montreal CA-01 node sync verified`,
      ];
      setLogTick(events[Math.floor(Math.random() * events.length)]);
    }, 850);

    return () => window.clearInterval(timer);
  }, []);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(serverAddress);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  return (
    <div className="relative group/card w-full">
      {/* Floating ambient ground shadow beneath the card */}
      <div className="pointer-events-none absolute -bottom-5 inset-x-8 h-8 rounded-full bg-emerald-500/20 blur-xl animate-float-shadow" />

      {/* Main Floating Card */}
      <div
        id="live-server-monitor"
        className={`glass-panel-strong relative w-full rounded-2xl border border-emerald-500/30 bg-card/95 p-4.5 sm:p-5.5 shadow-[0_20px_60px_rgba(0,0,0,0.55)] backdrop-blur-2xl transition-all duration-500 ease-out hover:border-emerald-400/50 hover:shadow-[0_24px_70px_rgba(74,222,128,0.15)] animate-float-smooth ${className}`}
      >
        {/* Top ambient glow highlight */}
        <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent" />

        {/* Header bar: Server Identity & Connection Status */}
        <div className="flex items-center justify-between border-b border-border/80 pb-3.5">
          <div className="flex items-center gap-3">
            <div className="relative flex size-3 items-center justify-center">
              <span className="animate-ping absolute inline-flex size-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                  Live Server
                </span>
                <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-mono font-bold text-emerald-400">
                  {tps.toFixed(2)} TPS
                </span>
                <span className="hidden sm:inline-flex rounded bg-secondary/80 px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
                  {mspt} ms/tick
                </span>
              </div>
              <div className="mt-0.5 flex items-center gap-2">
                <p className="font-mono text-sm font-semibold tracking-tight text-foreground sm:text-base">
                  {serverAddress}
                </p>
                <button
                  type="button"
                  onClick={handleCopy}
                  aria-label="Copy server IP"
                  title="Click to copy server IP"
                  className="inline-flex size-6.5 items-center justify-center rounded-md border border-border/60 bg-secondary/40 hover:bg-emerald-500/20 hover:border-emerald-500/40 text-muted-foreground hover:text-emerald-300 transition-all duration-400 ease-out cursor-pointer"
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

          {/* Latency & Region badge */}
          <div className="flex flex-col items-end">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-mono font-semibold text-emerald-400 shadow-[0_0_10px_rgba(74,222,128,0.15)]">
              <Wifi className="size-3.5" />
              {ping}ms
            </span>
            <span className="text-[10px] text-emerald-400/90 mt-1 font-medium">
              Montreal, QC · 0% Loss
            </span>
          </div>
        </div>

        {/* Real-time Telemetry Gauges (NO CPU model, strictly "RAM") */}
        <div className="grid grid-cols-2 gap-3 py-3.5">
          {/* CPU Box - No CPU model name, just clean realistic load */}
          <div className="rounded-xl border border-border/80 bg-background/60 p-3 transition-colors duration-400 hover:border-emerald-500/30">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="flex items-center gap-1.5 text-xs font-medium text-foreground">
                <Cpu className="size-3.5 text-primary" />
                CPU Load
              </span>
              <span className="font-mono text-xs font-bold text-primary">{cpu}%</span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-secondary/80">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-700 ease-out shadow-[0_0_8px_rgba(74,222,128,0.4)]"
                style={{ width: `${cpu}%` }}
              />
            </div>
            <div className="mt-2 flex items-center justify-between text-[10px] text-muted-foreground">
              <span>Dedicated Threads</span>
              <span className="font-mono text-emerald-400/90 font-medium">Optimal</span>
            </div>
          </div>

          {/* Memory Box - Strictly "RAM", no DDR5 tag */}
          <div className="rounded-xl border border-border/80 bg-background/60 p-3 transition-colors duration-400 hover:border-gold/30">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="flex items-center gap-1.5 text-xs font-medium text-foreground">
                <Database className="size-3.5 text-gold" />
                RAM
              </span>
              <span className="font-mono text-xs font-bold text-gold">
                {memory.toFixed(1)} / 8 GB
              </span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-secondary/80">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-400 to-gold transition-all duration-700 ease-out shadow-[0_0_8px_rgba(234,179,8,0.3)]"
                style={{ width: `${(memory / 8) * 100}%` }}
              />
            </div>
            <div className="mt-2 flex items-center justify-between text-[10px] text-muted-foreground">
              <span>JVM Heap</span>
              <span className="font-mono text-gold/90 font-medium">
                {Math.round((memory / 8) * 100)}% Used
              </span>
            </div>
          </div>
        </div>

        {/* Players & Chunks Status Strip */}
        <div className="flex items-center justify-between rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-3.5 py-2.5 text-xs">
          <div className="flex items-center gap-2">
            <Users className="size-4 text-primary" />
            <span className="font-medium text-foreground">Active Players</span>
          </div>
          <div className="flex items-center gap-2.5">
            <strong className="font-mono text-sm font-bold text-foreground">
              {players} <span className="text-muted-foreground font-normal text-xs">/ 100</span>
            </strong>
            <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(74,222,128,0.8)]" />
          </div>
        </div>

        {/* Real-time server live log line */}
        <div className="mt-3 flex items-center gap-2 rounded-lg border border-border/70 bg-black/40 px-2.5 py-1.5 font-mono text-[10.5px] text-muted-foreground overflow-hidden">
          <Terminal className="size-3 text-emerald-400 shrink-0" />
          <span className="truncate text-emerald-300/90">{logTick}</span>
        </div>

        {/* Footer info: Animated Moving Node & Paper details */}
        <div className="mt-2.5 flex items-center justify-between px-1 text-[10px] text-muted-foreground font-medium overflow-hidden">
          <div className="animate-ticker-slide flex items-center gap-2 whitespace-nowrap">
            <span className="flex items-center gap-1 text-emerald-400 font-mono">
              <Sparkles className="size-3 text-primary shrink-0" /> Paper 1.21.4 (Build #164)
            </span>
            <span className="text-muted-foreground/60">·</span>
            <span className="text-foreground/90 font-mono">Active Node: Montreal (CA-01)</span>
            <span className="text-muted-foreground/60">·</span>
            <span className="text-emerald-300 font-medium">All servers hosted in Montreal</span>
          </div>
          <span className="hidden sm:flex items-center gap-1.5 shrink-0 pl-2">
            <ShieldCheck className="size-3 text-emerald-400" /> Auto-backups
          </span>
        </div>
      </div>
    </div>
  );
}
