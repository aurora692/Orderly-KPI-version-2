import { LeaderboardRow } from "@/lib/types";

export function Leaderboard({ rows }: { rows: LeaderboardRow[] }) {
  return (
    <div className="rounded-xl bg-card p-4 shadow-panel">
      <h3 className="mb-3 text-sm font-semibold text-ink">Top 3 Protocols by 30D Volume</h3>
      <ul className="space-y-2">
        {rows.map((row, index) => (
          <li key={row.name} className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2">
            <span className="text-sm text-ink">
              {index + 1}. {row.name}
            </span>
            <span className="text-sm font-medium text-slate-600">{row.volume}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
