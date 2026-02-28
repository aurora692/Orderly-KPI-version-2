import { Delta, Kpi } from "@/lib/types";

function DeltaBadge({ delta }: { delta: Delta }) {
  const cls = {
    up: "bg-emerald-100 text-emerald-800",
    down: "bg-rose-100 text-rose-800",
    flat: "bg-slate-100 text-slate-700"
  }[delta.direction];

  return (
    <span className={`rounded-full px-2 py-1 text-xs font-semibold ${cls}`}>
      {delta.value} {delta.label ?? ""}
    </span>
  );
}

export function KpiCard({ kpi }: { kpi: Kpi }) {
  return (
    <article className="rounded-xl bg-card p-4 shadow-panel">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted">{kpi.label}</h3>
        <span className="rounded border border-slate-200 px-2 py-0.5 text-xs uppercase text-slate-500">
          {kpi.source}
        </span>
      </div>
      <p className="text-2xl font-semibold text-ink">{kpi.value}</p>
      {kpi.delta ? (
        <div className="mt-3">
          <DeltaBadge delta={kpi.delta} />
        </div>
      ) : null}
    </article>
  );
}
