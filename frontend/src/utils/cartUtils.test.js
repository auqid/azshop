import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  updateCart,
  FREE_SHIPPING_THRESHOLD,
  SHIPPING_FLAT_RATE,
} from './cartUtils';

// updateCart persists to localStorage, which doesn't exist in the test env
beforeEach(() => {
  vi.stubGlobal('localStorage', { setItem: vi.fn(), getItem: vi.fn() });
});

const cartWith = (...cartItems) => ({
  cartItems,
  shippingAddress: {},
  paymentMethod: 'Cash on Delivery',
});

describe('updateCart', () => {
  it('totals quantities against unit prices', () => {
    const state = updateCart(cartWith({ price: 1250, qty: 2 }));
    expect(state.itemsPrice).toBe('2500.00');
  });

  it('mirrors the backend free-shipping rule', () => {
    const under = updateCart(cartWith({ price: FREE_SHIPPING_THRESHOLD, qty: 1 }));
    const over = updateCart(
      cartWith({ price: FREE_SHIPPING_THRESHOLD + 1, qty: 1 })
    );
    expect(under.shippingPrice).toBe(SHIPPING_FLAT_RATE.toFixed(2));
    expect(over.shippingPrice).toBe('0.00');
  });

  it('adds up to the total it displays', () => {
    const state = updateCart(cartWith({ price: 549, qty: 3 }));
    const sum = (
      Number(state.itemsPrice) +
      Number(state.shippingPrice) +
      Number(state.taxPrice)
    ).toFixed(2);
    expect(state.totalPrice).toBe(sum);
  });

  it('zeroes out an empty cart', () => {
    const state = updateCart(cartWith());
    expect(state.itemsPrice).toBe('0.00');
    expect(state.taxPrice).toBe('0.00');
  });
});
