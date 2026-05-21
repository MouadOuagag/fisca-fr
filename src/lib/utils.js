export const fmt = (n) =>
  (n ?? 0).toLocaleString('fr-FR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }) + ' €'

export const pct = (n) => ((n ?? 0) * 100).toFixed(1) + ' %'
