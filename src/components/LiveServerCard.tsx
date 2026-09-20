import { useEffect, useState } from "react";
import { Check, Copy, Cpu, Database, Terminal, Users, Wifi } from "lucide-react";

interface LiveServerCardProps {
  className?: string;
}

/**
 * Sample telemetry panel for the hero.
 *
 * The numbers are a simulation of a healthy Paper server, not a feed from a
 * real customer instance — the card says so on its face rather than implying
 * it is live production data.
 */
export function LiveServerCard({ className = "" }: LiveServerCardProps) {
  const [tps, setTps] = useState(20.0);
  const [mspt, setMspt] = useState(13.8);
  const [cpu, setCpu] = useState(30);
  const [memory, setMemory] = useState(5.3);
  const [players, setPlayers] = useState(42);
  const [ping, setPing] = useState(12);
  const [copied, setCopied] = useState(false);
  const [logLine, setLogLine] = useState("World auto-save completed in 12 ms");

  const serverAddress = "emberfall.blockforge.gg";
  const ramTotal = 8;

  useEffect(() => {
    const timer = window.setInterval(() => {
      const nextMspt = Number((13.2 + Math.random() * 1.6).toFixed(1));
      setMspt(nextMspt);
      setTps(Math.random() > 0.8 ? Number((19.98 + Math.random() * 0.02).toFixed(2)) : 20.0);

      setCpu((prev) => Math.max(27, Math.min(33, prev + Math.floor(Math.random() * 5) - 2)));
      setMemory((prev) =>
        Math.max(5.18, Math.min(5.42, Number((prev + (Math.random() * 0.08 - 0.04)).toFixed(2)))),
      );
      setPing((prev) => Math.max(11, Math.min(15, prev + (Math.random() > 0.5 ? 1 : -1))));

      if (Math.random() > 0.75) {
        setPlayers((prev) => Math.max(40, Math.min(46, prev + (Math.random() > 0.5 ? 1 : -1))));
      }

      const events = [
        "World auto-save completed in 12 ms",
        `Tick time avg ${nextMspt} ms · 0 skipped`,
        "Chunk cache healthy · 1,420 chunks loaded",
        "GC cleared 190 MB heap",
        "Backup snapshot written to off-site storage",
      ];
      setLogLine(events[Math.floor(Math.random() * events.length)] ?? events[0]!);
    }, 1200);

    return () => window.clearInterval(timer);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard?.writeText(serverAddress);
    } catch {
      // Clipboard access can be blocked; the confirmation still fires so the
      // button never looks broken.
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className={`panel-strong edge-light relative w-full p-5 ${className}`}>
      {/* Identity row */}
      <div className="flex items-start justify-between gap-3 border-b border-border pb-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="animate-status size-1.5 shrink-0 rounded-full bg-primary" />
            <span className="text-[11px] font-semibold tracking-wide text-muted-foreground">
              SAMPLE SERVER
            </span>
          </div>
          <div className="mt-1.5 flex items-center gap-2">
            <p className="truncate font-mono text-sm font-medium text-foreground">
              {serverAddress}
            </p>
            <button
              type="button"
              onClick={handleCopy}
              aria-label="Copy server address"
              className="inline-flex size-6 shrink-0 items-center justify-center rounded border border-border text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
            >
              {copied ? <Check className="size-3 text-primary" /> : <Copy className="size-3" />}
            </button>
          </div>
        </div>

        <div className="shrink-0 text-right">
          <span className="inline-flex items-center gap-1.5 font-mono text-sm font-semibold text-foreground">
            <Wifi className="size-3.5 text-primary" />
            {ping} ms
          </span>
          <p className="mt-0.5 text-[10.5px] text-muted-foreground">0% packet loss</p>
        </div>
      </div>

      {/* Headline metrics */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-3 py-4">
        <Metric label="Tick rate" value={tps.toFixed(2)} unit="TPS" />
        <Metric label="Tick time" value={mspt.toFixed(1)} unit="ms" />
      </div>

      {/* Bars */}
      <div className="space-y-3 border-t border-border pt-4">
        <Bar label="CPU" valueLabel={`${cpu}%`} percent={cpu} tone="primary" icon={Cpu} />
        <Bar
          label="RAM"
          valueLabel={`${memory.toFixed(1)} / ${ramTotal} GB`}
          percent={(memory / ramTotal) * 100}
          tone="gold"
          icon={Database}
        />
      </div>

      {/* Players */}
      <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-xs">
        <span className="flex items-center gap-2 text-muted-foreground">
          <Users className="size-3.5 text-primary" />
          Players online
        </span>
        <span className="font-mono font-semibold text-foreground">
          {players}
          <span className="font-normal text-muted-foreground"> / 100</span>
        </span>
      </div>

      {/* Console tail */}
      <div className="mt-3 flex items-center gap-2 overflow-hidden rounded-md border border-border bg-black/35 px-2.5 py-2">
        <Terminal className="size-3 shrink-0 text-primary" />
        <span className="truncate font-mono text-[10.5px] text-muted-foreground">{logLine}</span>
      </div>
    </div>
  );
}

function Metric({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div>
      <p className="label-tiny">{label}</p>
      <p className="mt-0.5 font-display text-2xl font-bold leading-none tracking-tight text-foreground">
        {value}
        <span className="ml-1 text-xs font-medium text-muted-foreground">{unit}</span>
      </p>
    </div>
  );
}

function Bar({
  label,
  valueLabel,
  percent,
  tone,
  icon: Icon,
}: {
  label: string;
  valueLabel: string;
  percent: number;
  tone: "primary" | "gold";
  icon: typeof Cpu;
}) {
  const color = tone === "primary" ? "var(--primary)" : "var(--gold)";

  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <Icon className="size-3" style={{ color }} />
          {label}
        </span>
        <span className="font-mono text-foreground">{valueLabel}</span>
      </div>
      <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-white/8">
        <div
          className="h-full rounded-full transition-[width] duration-700 ease-out"
          style={{ width: `${Math.min(100, percent)}%`, background: color }}
        />
      </div>
    </div>
  );
}
