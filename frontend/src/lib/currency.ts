// Utility function to format Rwandan Francs
export const formatRWF = (amount: number): string => {
  return new Intl.NumberFormat('en-RW', {
    style: 'currency',
    currency: 'RWF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount).replace('RWF', 'RWF ');
};

// Alternative formatting without currency symbol
export const formatRWFSimple = (amount: number): string => {
  return `${amount.toLocaleString('en-RW')} RWF`;
};

// Convert USD-like prices to RWF (approximate conversion rate: 1 USD = 1000 RWF)
export const usdToRwf = (usdAmount: number): number => {
  return Math.round(usdAmount * 1000);
};
