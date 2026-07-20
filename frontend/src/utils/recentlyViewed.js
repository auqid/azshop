const STORAGE_KEY = 'recentlyViewed';
const MAX_ITEMS = 8;

const read = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const getRecentlyViewed = (excludeId) =>
  read().filter((item) => item._id !== excludeId);

// Most recent first, de-duplicated, capped so the rail stays short.
export const recordProductView = (product) => {
  if (!product?._id) return;

  const entry = {
    _id: product._id,
    name: product.name,
    image: product.image,
    price: product.price,
    rating: product.rating,
  };

  const next = [entry, ...read().filter((x) => x._id !== product._id)].slice(
    0,
    MAX_ITEMS
  );

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // storage full or unavailable — the rail is a nicety, not worth failing over
  }
};
