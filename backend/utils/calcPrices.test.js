import { describe, it, expect } from 'vitest';
import {
  calcPrices,
  FREE_SHIPPING_THRESHOLD,
  SHIPPING_FLAT_RATE,
  GST_RATE,
} from './calcPrices.js';

const item = (price, qty = 1) => ({ price, qty });

describe('calcPrices', () => {
  it('sums line items into the items price', () => {
    const { itemsPrice } = calcPrices([item(1000, 2), item(549)]);
    expect(itemsPrice).toBe('2549.00');
  });

  it('charges flat shipping at or below the free-shipping threshold', () => {
    const { shippingPrice } = calcPrices([item(FREE_SHIPPING_THRESHOLD)]);
    expect(shippingPrice).toBe(SHIPPING_FLAT_RATE.toFixed(2));
  });

  it('ships free above the threshold', () => {
    const { shippingPrice } = calcPrices([item(FREE_SHIPPING_THRESHOLD + 1)]);
    expect(shippingPrice).toBe('0.00');
  });

  it('applies GST to the items subtotal only, not shipping', () => {
    const { itemsPrice, taxPrice } = calcPrices([item(1000)]);
    expect(taxPrice).toBe((Number(itemsPrice) * GST_RATE).toFixed(2));
  });

  it('totals items + shipping + tax', () => {
    const { itemsPrice, shippingPrice, taxPrice, totalPrice } = calcPrices([
      item(899, 2),
    ]);
    const expected = (
      Number(itemsPrice) +
      Number(shippingPrice) +
      Number(taxPrice)
    ).toFixed(2);
    expect(totalPrice).toBe(expected);
  });

  it('does not drift on prices that are awkward in floating point', () => {
    // 0.1 + 0.2 style drift would surface here as 1090.0000000000002
    const { itemsPrice } = calcPrices([item(1090.1), item(0.2)]);
    expect(itemsPrice).toBe('1090.30');
  });

  it('handles an empty cart without producing NaN', () => {
    const prices = calcPrices([]);
    expect(prices.itemsPrice).toBe('0.00');
    expect(prices.totalPrice).toBe(SHIPPING_FLAT_RATE.toFixed(2));
  });

  it('returns every price as a 2-decimal string', () => {
    const prices = calcPrices([item(14950)]);
    Object.values(prices).forEach((value) => {
      expect(value).toMatch(/^\d+\.\d{2}$/);
    });
  });
});
