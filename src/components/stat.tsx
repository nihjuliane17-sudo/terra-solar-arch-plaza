import { cn } from "@/lib/utils";

export function Stat({
  label,
  value,
  hint,
  tone,
}: {
  label: string;
  value: string;
  hint?: string;
  tone?: "default" | "ok" | "bad" | "warn";
}) {
  return (
    <div className="rounded-lg bg-card p-4 shadow-card">
      <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </div>
      <div
        className={cn(
          "mt-1 font-display text-2xl tabular-nums tracking-tight",
          tone === "ok" && "text-ok",
          tone === "bad" && "text-destructive",
          tone === "warn" && "text-warn",
        )}
      >
        {value}
      </div>
      {hint ? (
        <div className="mt-1 text-xs text-muted-foreground">{hint}</div>
      ) : null}
    </div>
  );
}
