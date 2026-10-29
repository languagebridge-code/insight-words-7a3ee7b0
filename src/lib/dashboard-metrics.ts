// Missing measurements are not zero. Preserve that distinction in every widget.
export function formatDashboardMetric(value: number | null | undefined, currency = false): string {
  if (typeof value !== 'number' || !Number.isFinite(value)) return 'Not available';
  return currency ? `$${value.toFixed(2)}` : value.toLocaleString();
}

export function seatUsagePercent(used: number | null | undefined, purchased: number | null | undefined): number | null {
  if (typeof used !== 'number' || !Number.isFinite(used) || typeof purchased !== 'number' || !Number.isFinite(purchased) || purchased <= 0) return null;
  return Math.round((used / purchased) * 100);
}