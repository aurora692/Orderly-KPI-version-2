"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { SeriesPoint } from "@/lib/types";

export function LineTrend({
  title,
  data,
  suffix = "",
  invert = false
}: {
  title: string;
  data: SeriesPoint[];
  suffix?: string;
  invert?: boolean;
}) {
  return (
    <section className="rounded-xl bg-card p-4 shadow-panel">
      <h3 className="mb-2 text-sm font-semibold text-ink">{title}</h3>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="label" fontSize={12} stroke="#64748b" />
            <YAxis reversed={invert} fontSize={12} stroke="#64748b" />
            <Tooltip formatter={(value: number) => `${value}${suffix}`} />
            <Line type="monotone" dataKey="value" stroke="#0f766e" strokeWidth={2.5} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
