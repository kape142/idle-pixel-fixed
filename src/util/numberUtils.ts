export const formatNumber = (amount: number): string =>
  amount < 1_000
    ? `${amount}`
    : amount < 1_000_000
    ? `${(amount / 1_000).toFixed(5 - Math.floor(Math.log10(amount)))}k`
    : `${(amount / 1_000_000).toFixed(8 - Math.floor(Math.log10(amount)))}m`;
