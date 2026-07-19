export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

// Pricing rules (must stay in sync with backend/utils/calcPrices.js):
// - free shipping on orders over ₹2,000, otherwise flat ₹99
// - 5% GST on the items subtotal
export const FREE_SHIPPING_THRESHOLD = 2000;
export const SHIPPING_FLAT_RATE = 99;
export const GST_RATE = 0.05;

export const updateCart = (state) => {
  const itemsPrice = state.cartItems.reduce(
    (acc, item) => acc + (item.price * 100 * item.qty) / 100,
    0
  );
  state.itemsPrice = addDecimals(itemsPrice);

  state.shippingPrice = addDecimals(
    itemsPrice > FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT_RATE
  );

  state.taxPrice = addDecimals(Math.round(GST_RATE * itemsPrice * 100) / 100);

  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  localStorage.setItem('cart', JSON.stringify(state));
  return state;
};
