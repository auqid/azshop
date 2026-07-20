import { describe, it, expect, beforeEach, vi } from 'vitest';
import reducer, {
  toggleWishlist,
  removeFromWishlist,
  clearWishlist,
} from './wishlistSlice';

beforeEach(() => {
  vi.stubGlobal('localStorage', {
    setItem: vi.fn(),
    getItem: vi.fn(() => null),
  });
});

const product = {
  _id: 'p1',
  name: 'Kani Pashmina Shawl',
  image: '/images/kani-shawl.jpg',
  price: 14950,
  brand: 'Kanihama Loomworks',
  category: 'Shawls & Stoles',
  rating: 4.7,
  numReviews: 3,
  countInStock: 4,
};

describe('wishlistSlice', () => {
  it('adds a product that is not saved yet', () => {
    const state = reducer({ items: [] }, toggleWishlist(product));
    expect(state.items).toHaveLength(1);
    expect(state.items[0]._id).toBe('p1');
  });

  it('toggles the same product back off', () => {
    const added = reducer({ items: [] }, toggleWishlist(product));
    const removed = reducer(added, toggleWishlist(product));
    expect(removed.items).toHaveLength(0);
  });

  it('stores only the fields a card needs to render', () => {
    const state = reducer(
      { items: [] },
      toggleWishlist({ ...product, reviews: [1, 2, 3], description: 'long…' })
    );
    expect(state.items[0]).not.toHaveProperty('reviews');
    expect(state.items[0]).not.toHaveProperty('description');
    expect(state.items[0].price).toBe(14950);
  });

  it('removes by id', () => {
    const added = reducer({ items: [] }, toggleWishlist(product));
    const state = reducer(added, removeFromWishlist('p1'));
    expect(state.items).toHaveLength(0);
  });

  it('clears everything', () => {
    let state = reducer({ items: [] }, toggleWishlist(product));
    state = reducer(state, toggleWishlist({ ...product, _id: 'p2' }));
    expect(reducer(state, clearWishlist()).items).toHaveLength(0);
  });

  it('persists to localStorage on every change', () => {
    reducer({ items: [] }, toggleWishlist(product));
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'wishlist',
      expect.stringContaining('p1')
    );
  });
});
