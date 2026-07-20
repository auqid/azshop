import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaHeart, FaRegHeart, FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Rating from './Rating';
import { addToCart } from '../slices/cartSlice';
import { toggleWishlist } from '../slices/wishlistSlice';
import { formatINR } from '../utils/formatters';

const LOW_STOCK_AT = 5;

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const saved = useSelector((state) =>
    state.wishlist.items.some((x) => x._id === product._id)
  );

  const outOfStock = product.countInStock === 0;

  const addHandler = () => {
    dispatch(addToCart({ ...product, qty: 1 }));
    toast.success(`${product.name} added to cart`);
  };

  const wishlistHandler = () => {
    dispatch(toggleWishlist(product));
    toast.info(saved ? 'Removed from saved items' : 'Saved for later');
  };

  return (
    <article className='product-card'>
      <div className='product-card__media'>
        <Link to={`/product/${product._id}`} className='product-card__image'>
          <img
            src={product.image}
            alt={product.name}
            loading='lazy'
            decoding='async'
            width='800'
            height='600'
          />
        </Link>

        {outOfStock ? (
          <span className='tag tag--out'>Sold out</span>
        ) : product.countInStock <= LOW_STOCK_AT ? (
          <span className='tag tag--low'>Only {product.countInStock} left</span>
        ) : product.rating >= 4.7 && product.numReviews >= 3 ? (
          <span className='tag tag--top'>Top rated</span>
        ) : null}

        <button
          type='button'
          className={saved ? 'save-btn is-saved' : 'save-btn'}
          onClick={wishlistHandler}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${product.name} from saved` : `Save ${product.name}`}
          title={saved ? 'Remove from saved' : 'Save for later'}
        >
          {saved ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>

      <div className='product-card__body'>
        <div className='product-card__brand'>{product.brand}</div>
        <Link to={`/product/${product._id}`} className='product-card__name'>
          {product.name}
        </Link>
        <Rating
          value={product.rating}
          text={`${product.numReviews} review${
            product.numReviews === 1 ? '' : 's'
          }`}
        />

        <div className='product-card__foot'>
          <span className='product-card__price'>
            {formatINR(product.price)}
          </span>
          <button
            type='button'
            className='btn btn--sm quick-add'
            onClick={addHandler}
            disabled={outOfStock}
            aria-label={`Add ${product.name} to cart`}
          >
            <FaPlus size={11} /> Add
          </button>
        </div>
      </div>
    </article>
  );
};

export default Product;
