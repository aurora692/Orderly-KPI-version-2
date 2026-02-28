export type DeltaDirection = "up" | "down" | "flat";

export type Delta = {
  value: string;
  direction: DeltaDirection;
  label?: string;
};

export type Kpi = {
  id: string;
  label: string;
  value: string;
  delta?: Delta;
  source: "auto" | "manual";
};

export type SeriesPoint = {
  label: string;
  value: number;
  valueB?: number;
  valueC?: number;
};

export type LeaderboardRow = {
  name: string;
  volume: string;
};

export type DashboardSection = {
  id: string;
  title: string;
  description: string;
  lastUpdated: string;
  kpis: Kpi[];
};

export type DashboardData = {
  asOf: string;
  sections: {
    defi: DashboardSection & {
      trend6w: SeriesPoint[];
      leaderboard: LeaderboardRow[];
      rankTrend6w: SeriesPoint[];
    };
    token: DashboardSection & {
      rankTrend6w: SeriesPoint[];
    };
    business: DashboardSection & {
      marketShareTrend: SeriesPoint[];
      volumeTrend: SeriesPoint[];
      revenueTrend: SeriesPoint[];
      userNewTrend: SeriesPoint[];
      userActiveTrend: SeriesPoint[];
      stakeUsersTrend: SeriesPoint[];
      stakedVsSupplyTrend: SeriesPoint[];
      omnivaultTrend: SeriesPoint[];
      segmentBreakdown: SeriesPoint[];
    };
    ecosystem: DashboardSection & {
      onboardingTrend: SeriesPoint[];
    };
  };
};

export type AdminEntryInput = {
  date: string;
  total_perp_volume_7d: number;
  orderly_rank_30d: number;
  orderly_volume_30d: number;
  top3_name_1: string;
  top3_vol_1: number;
  top3_name_2: string;
  top3_vol_2: number;
  top3_name_3: string;
  top3_vol_3: number;
  order_price: number;
  order_cmc_rank: number;
  total_dexs: number;
  graduated_dexs: number;
  market_share_current?: number;
  market_share_delta?: number;
  market_share_trend?: number[];
  source: "auto" | "manual";
};
