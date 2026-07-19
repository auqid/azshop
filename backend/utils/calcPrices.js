function addDecimals(num) {
  return (Math.round(num * 100) / 100).toFixed(2);
}

// Pricing rules (must stay in sync with frontend/src/utils/cartUtils.js):
// - free shipping on orders over ₹2,000, otherwise flat ₹99
// - 5% GST on the items subtotal
export const FREE_SHIPPING_THRESHOLD = 2000;
export const SHIPPING_FLAT_RATE = 99;
export const GST_RATE = 0.05;

export function calcPrices(orderItems) {
  // Work in paise to avoid floating point drift
  const itemsPrice =
    orderItems.reduce((acc, item) => acc + item.price * 100 * item.qty, 0) /
    100;

  const shippingPrice =
    itemsPrice > FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT_RATE;

  const taxPrice = Math.round(GST_RATE * itemsPrice * 100) / 100;

  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  // return prices as strings fixed to 2 decimal places
  return {
    itemsPrice: addDecimals(itemsPrice),
    shippingPrice: addDecimals(shippingPrice),
    taxPrice: addDecimals(taxPrice),
    totalPrice: addDecimals(totalPrice),
  };
}
