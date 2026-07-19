// Format a number as Indian Rupees, e.g. 14950 -> ₹14,950 and 548.55 -> ₹548.55
export const formatINR = (value) => {
  const n = Number(value);
  if (Number.isNaN(n)) return '₹—';
  const hasPaise = Math.round(n * 100) % 100 !== 0;
  return (
    '₹' +
    n.toLocaleString('en-IN', {
      minimumFractionDigits: hasPaise ? 2 : 0,
      maximumFractionDigits: 2,
    })
  );
};

export const formatDate = (isoString) =>
  new Date(isoString).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
