import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Product from '../components/Product';
import Meta from '../components/Meta';
import { addToCart } from '../slices/cartSlice';
import { clearWishlist } from '../slices/wishlistSlice';

const WishlistScreen = () => {
  const { items } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const inStock = items.filter((item) => item.countInStock > 0);

  const addAllHandler = () => {
    inStock.forEach((item) => dispatch(addToCart({ ...item, qty: 1 })));
    toast.success(
      `${inStock.length} item${inStock.length === 1 ? '' : 's'} added to cart`
    );
  };

  return (
    <div className='container page'>
      <Meta title='Saved items — Nargis' />

      <div className='page-title-row'>
        <h1>Saved items</h1>
        {items.length > 0 && (
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            {inStock.length > 0 && (
              <button type='button' className='btn' onClick={addAllHandler}>
                Add {inStock.length} to cart
              </button>
            )}
            <button
              type='button'
              className='btn btn--ghost'
              onClick={() => dispatch(clearWishlist())}
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {items.length === 0 ? (
        <div className='empty-state'>
          <p className='empty-state__title'>Nothing saved yet</p>
          <p className='empty-state__copy'>
            Tap the heart on any craft to keep it here while you decide.
          </p>
          <Link to='/' className='btn'>
            Browse the crafts
          </Link>
        </div>
      ) : (
        <div className='product-grid'>
          {items.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistScreen;
