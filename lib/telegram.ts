import { DashboardData } from "@/lib/types";

function kpi(data: DashboardData, section: keyof DashboardData["sections"], id: string): string {
  const metric = data.sections[section].kpis.find((item) => item.id === id);
  if (!metric) return "n/a";
  const deltaText = metric.delta ? ` (${metric.delta.value} WoW)` : "";
  return `${metric.value}${deltaText}`;
}

export function buildWeeklySummaryMessage(data: DashboardData): string {
  const top3 = data.sections.defi.leaderboard.map((item) => item.name).join(", ");

  return [
    "📊 <b>Orderly Weekly KPI Report</b>",
    `Week of ${new Date(data.asOf).toUTCString().slice(5, 16)}`,
    "",
    "🌐 <b>DeFi Market</b>",
    `Weekly Perp Vol: ${kpi(data, "defi", "weekly-perp-volume")}`,
    `Orderly Rank: ${kpi(data, "defi", "orderly-rank")}`,
    `Top 3: ${top3}`,
    "",
    "💰 <b>$ORDER Token</b>",
    `Price: ${kpi(data, "token", "order-price")}`,
    `CMC Rank: ${kpi(data, "token", "cmc-rank")}`,
    "",
    "📈 <b>Business Metrics</b>",
    `Market Share: ${kpi(data, "business", "market-share")}`,
    `Avg Daily Vol: ${kpi(data, "business", "avg-daily-volume")}`,
    `Revenue / Day: ${kpi(data, "business", "revenue-day")}`,
    `New Users: ${kpi(data, "business", "new-users")}`,
    `Active Users: ${kpi(data, "business", "active-users")}`,
    `Stake Users: ${kpi(data, "business", "stake-users")}`,
    `Staked/Circ: ${kpi(data, "business", "staked-vs-supply")}`,
    `Omnivault TVL: ${kpi(data, "business", "omnivault-tvl")}`,
    "",
    "🏗️ <b>Orderly One Ecosystem</b>",
    `Total DEXs: ${kpi(data, "ecosystem", "total-dexs")}`,
    `Graduated: ${kpi(data, "ecosystem", "graduated-dexs")}`
  ].join("\n");
}
