import { describe, it, expect } from 'vitest';
import { formatINR, formatDate } from './formatters';

describe('formatINR', () => {
  it('groups digits the Indian way (lakh, not thousand)', () => {
    expect(formatINR(1450000)).toBe('₹14,50,000');
  });

  it('omits paise when the amount is whole', () => {
    expect(formatINR(14950)).toBe('₹14,950');
  });

  it('keeps paise when the amount has them', () => {
    expect(formatINR(548.55)).toBe('₹548.55');
  });

  it('accepts the numeric strings the API returns', () => {
    expect(formatINR('2549.00')).toBe('₹2,549');
  });

  it('degrades gracefully on junk input', () => {
    expect(formatINR(undefined)).toBe('₹—');
  });
});

describe('formatDate', () => {
  it('renders an ISO date in day-month-year order', () => {
    expect(formatDate('2026-07-19T10:00:00.000Z')).toBe('19 Jul 2026');
  });
});
