import { DeltaDirection } from "@/lib/types";

export function getDeltaDirection(value: number): DeltaDirection {
  if (value > 0) return "up";
  if (value < 0) return "down";
  return "flat";
}

export function formatMoney(value: number, digits = 1): string {
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(digits)}B`;
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(digits)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(digits)}K`;
  return `$${value.toFixed(digits)}`;
}

export function formatPct(value: number, digits = 2): string {
  return `${value.toFixed(digits)}%`;
}

export function formatSigned(value: number, digits = 1, suffix = "%"): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(digits)}${suffix}`;
}
