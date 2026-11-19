export function formatNumber(num) {
  if (num === undefined || num === null) return '0';
  return new Intl.NumberFormat('en-US').format(num);
}

export function formatCompactNumber(num) {
  if (num === undefined || num === null) return '0';
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 1,
  }).format(num);
}

export function formatPercent(num, decimals = 1) {
  if (num === undefined || num === null) return '0%';
  return `${Number(num).toFixed(decimals)}%`;
}

