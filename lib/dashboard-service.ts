import { unstable_cache } from "next/cache";
import { mockDashboardData } from "@/lib/mock-data";
import { DashboardData } from "@/lib/types";
import { readManualFallback } from "@/lib/manual-fallback-store";

const DAY_SECONDS = 60 * 60 * 24;

async function getDashboardDataUncached(): Promise<DashboardData> {
  const data: DashboardData = JSON.parse(JSON.stringify(mockDashboardData));
  const fallback = await readManualFallback();

  if (fallback.marketShare) {
    const kpi = data.sections.business.kpis.find((item) => item.id === "market-share");
    if (kpi) {
      const deltaValue = fallback.marketShare.delta;
      kpi.value = `${fallback.marketShare.current.toFixed(2)}%`;
      kpi.delta = {
        value: `${deltaValue > 0 ? "+" : ""}${deltaValue.toFixed(2)}%`,
        direction: deltaValue > 0 ? "up" : deltaValue < 0 ? "down" : "flat",
        label: "WoW"
      };
      kpi.source = "manual";
    }

    if (fallback.marketShare.trend.length > 0) {
      const size = fallback.marketShare.trend.length;
      data.sections.business.marketShareTrend = fallback.marketShare.trend.map((value, index) => ({
        label: index === size - 1 ? "Now" : `W-${size - 1 - index}`,
        value
      }));
    }

    if (fallback.updatedAt) {
      data.sections.business.lastUpdated = fallback.updatedAt;
      data.asOf = fallback.updatedAt;
    }
  }

  return data;
}

export const getDashboardData = unstable_cache(getDashboardDataUncached, ["dashboard-data"], {
  revalidate: DAY_SECONDS,
  tags: ["dashboard-data"]
});
