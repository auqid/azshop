import { createSlice } from '@reduxjs/toolkit';

const STORAGE_KEY = 'wishlist';

const readStored = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { items: [] };
  } catch {
    return { items: [] };
  }
};

const persist = (state) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  return state;
};

// Saved items live in localStorage rather than the database — a shopper can
// build a wishlist before deciding to create an account.
const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: readStored(),
  reducers: {
    toggleWishlist: (state, action) => {
      const product = action.payload;
      const exists = state.items.find((x) => x._id === product._id);
      state.items = exists
        ? state.items.filter((x) => x._id !== product._id)
        : [
            ...state.items,
            {
              _id: product._id,
              name: product.name,
              image: product.image,
              price: product.price,
              brand: product.brand,
              category: product.category,
              rating: product.rating,
              numReviews: product.numReviews,
              countInStock: product.countInStock,
            },
          ];
      return persist(state);
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter((x) => x._id !== action.payload);
      return persist(state);
    },
    clearWishlist: (state) => {
      state.items = [];
      return persist(state);
    },
  },
});

export const { toggleWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;

export const selectIsWishlisted = (productId) => (state) =>
  state.wishlist.items.some((x) => x._id === productId);

export default wishlistSlice.reducer;
