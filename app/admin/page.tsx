"use client";

import { useMemo, useState } from "react";

type FormState = {
  date: string;
  total_perp_volume_7d: string;
  orderly_rank_30d: string;
  orderly_volume_30d: string;
  top3_name_1: string;
  top3_vol_1: string;
  top3_name_2: string;
  top3_vol_2: string;
  top3_name_3: string;
  top3_vol_3: string;
  order_price: string;
  order_cmc_rank: string;
  total_dexs: string;
  graduated_dexs: string;
  market_share_current: string;
  market_share_delta: string;
  market_share_trend: string;
  source: "auto" | "manual";
};

const initialState: FormState = {
  date: new Date().toISOString().slice(0, 10),
  total_perp_volume_7d: "301000000000",
  orderly_rank_30d: "39",
  orderly_volume_30d: "550050000",
  top3_name_1: "Hyperliquid",
  top3_vol_1: "204500000000",
  top3_name_2: "Astar",
  top3_vol_2: "141800000000",
  top3_name_3: "Lighter",
  top3_vol_3: "112900000000",
  order_price: "0.187",
  order_cmc_rank: "650",
  total_dexs: "2170",
  graduated_dexs: "146",
  market_share_current: "0.22",
  market_share_delta: "0.03",
  market_share_trend: "0.12,0.14,0.16,0.19,0.20,0.21,0.19,0.22",
  source: "manual"
};

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  const fields = useMemo(
    () => [
      ["date", "Date", "date"],
      ["total_perp_volume_7d", "Total Perp Volume 7D", "number"],
      ["orderly_rank_30d", "Orderly Rank 30D", "number"],
      ["orderly_volume_30d", "Orderly Volume 30D", "number"],
      ["top3_name_1", "Top 1 Name", "text"],
      ["top3_vol_1", "Top 1 Volume", "number"],
      ["top3_name_2", "Top 2 Name", "text"],
      ["top3_vol_2", "Top 2 Volume", "number"],
      ["top3_name_3", "Top 3 Name", "text"],
      ["top3_vol_3", "Top 3 Volume", "number"],
      ["order_price", "ORDER Price", "number"],
      ["order_cmc_rank", "CMC Rank", "number"],
      ["total_dexs", "Total DEXs", "number"],
      ["graduated_dexs", "Graduated DEXs", "number"],
      ["market_share_current", "Market Share Current (%)", "number"],
      ["market_share_delta", "Market Share WoW Delta (%)", "number"],
      ["market_share_trend", "Market Share Trend (%) CSV", "text"]
    ] as const,
    []
  );

  async function scrapeNow() {
    setStatus("Running scrape...");
    const res = await fetch("/api/admin/scrape", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-password": password
      }
    });
    const json = await res.json();
    if (!res.ok) {
      setStatus(`Scrape failed: ${json.error ?? "Unknown error"}`);
      return;
    }

    setForm((prev) => ({ ...prev, ...json.prefill }));
    setStatus("Scrape complete. Form pre-filled with latest data.");
  }

  async function submit() {
    setSubmitting(true);
    setStatus("Submitting...");

    const parseOptionalNumber = (value: string): number | undefined => {
      const normalized = value.trim();
      if (!normalized) return undefined;
      const numeric = Number(normalized);
      return Number.isNaN(numeric) ? undefined : numeric;
    };

    const marketShareTrend = form.market_share_trend
      .split(",")
      .map((item) => Number(item.trim()))
      .filter((item) => !Number.isNaN(item));

    const payload = {
      ...form,
      total_perp_volume_7d: Number(form.total_perp_volume_7d),
      orderly_rank_30d: Number(form.orderly_rank_30d),
      orderly_volume_30d: Number(form.orderly_volume_30d),
      top3_vol_1: Number(form.top3_vol_1),
      top3_vol_2: Number(form.top3_vol_2),
      top3_vol_3: Number(form.top3_vol_3),
      order_price: Number(form.order_price),
      order_cmc_rank: Number(form.order_cmc_rank),
      total_dexs: Number(form.total_dexs),
      graduated_dexs: Number(form.graduated_dexs),
      market_share_current: parseOptionalNumber(form.market_share_current),
      market_share_delta: parseOptionalNumber(form.market_share_delta),
      market_share_trend: marketShareTrend.length > 0 ? marketShareTrend : undefined
    };

    const res = await fetch("/api/admin/entries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-password": password
      },
      body: JSON.stringify(payload)
    });

    const json = await res.json();
    setSubmitting(false);

    if (!res.ok) {
      setStatus(`Submit failed: ${json.error ?? "Unknown error"}`);
      return;
    }

    setStatus("Entry saved and dashboard cache invalidated.");
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 md:px-8">
      <h1 className="text-2xl font-bold text-ink">Admin Panel</h1>
      <p className="mt-1 text-sm text-muted">Manual fallback entry for dashboard KPIs and scrape retry.</p>

      <div className="mt-6 rounded-xl bg-card p-4 shadow-panel">
        <label className="mb-1 block text-sm text-muted">Admin Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="w-full rounded-lg border border-slate-300 px-3 py-2"
          placeholder="Enter ADMIN_PASSWORD"
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={scrapeNow}
          className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white"
        >
          Scrape Now
        </button>
        <button
          type="button"
          onClick={submit}
          disabled={submitting}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-ink disabled:opacity-60"
        >
          {submitting ? "Saving..." : "Save Entry"}
        </button>
      </div>

      <p className="mt-3 text-sm text-muted">{status}</p>
      <p className="mt-1 text-xs text-muted">
        Market Share Trend format example: <code>0.12,0.14,0.16,0.19,0.20,0.21,0.19,0.22</code>
      </p>

      <section className="mt-6 grid gap-3 rounded-xl bg-card p-4 shadow-panel md:grid-cols-2">
        {fields.map(([key, label, type]) => (
          <label key={key} className="block text-sm">
            <span className="mb-1 block text-muted">{label}</span>
            <input
              type={type}
              value={form[key]}
              onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))}
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </label>
        ))}

        <label className="block text-sm">
          <span className="mb-1 block text-muted">Source</span>
          <select
            value={form.source}
            onChange={(e) => setForm((prev) => ({ ...prev, source: e.target.value as "auto" | "manual" }))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          >
            <option value="manual">manual</option>
            <option value="auto">auto</option>
          </select>
        </label>
      </section>
    </main>
  );
}
