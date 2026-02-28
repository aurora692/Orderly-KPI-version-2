export function SectionHeader({
  title,
  description,
  lastUpdated
}: {
  title: string;
  description: string;
  lastUpdated: string;
}) {
  return (
    <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 className="text-xl font-semibold text-ink">{title}</h2>
        <p className="mt-1 text-sm text-muted">{description}</p>
      </div>
      <p className="text-xs text-muted">Last updated: {new Date(lastUpdated).toLocaleString()}</p>
    </div>
  );
}
