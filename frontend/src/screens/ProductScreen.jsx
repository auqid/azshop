import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaHeart, FaRegHeart, FaTruck, FaMoneyBillWave } from 'react-icons/fa';
import { toast } from 'react-toastify';
import {
  useGetProductDetailsQuery,
  useGetProductsQuery,
  useCreateReviewMutation,
} from '../slices/productsApiSlice';
import Rating from '../components/Rating';
import RatingBreakdown from '../components/RatingBreakdown';
import Breadcrumbs from '../components/Breadcrumbs';
import ProductRail from '../components/ProductRail';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import { addToCart } from '../slices/cartSlice';
import { toggleWishlist } from '../slices/wishlistSlice';
import { getRecentlyViewed, recordProductView } from '../utils/recentlyViewed';
import { formatINR, formatDate } from '../utils/formatters';

const ProductScreen = () => {
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [reviewSort, setReviewSort] = useState('recent');

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);
  const saved = useSelector((state) =>
    state.wishlist.items.some((x) => x._id === productId)
  );

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  // Others in the same category, minus the product being viewed
  const { data: relatedData } = useGetProductsQuery(
    { category: product?.category },
    { skip: !product?.category }
  );

  const related = (relatedData?.products || [])
    .filter((p) => p._id !== productId)
    .slice(0, 6);

  const recentlyViewed = useMemo(
    () => getRecentlyViewed(productId),
    [productId]
  );

  useEffect(() => {
    if (product) recordProductView(product);
  }, [product]);

  // Reset the quantity picker when navigating straight from one product to
  // another (the component stays mounted, so this can't be initial state).
  const [qtyOwner, setQtyOwner] = useState(productId);
  if (qtyOwner !== productId) {
    setQtyOwner(productId);
    setQty(1);
  }

  const reviews = product?.reviews;
  const sortedReviews = useMemo(() => {
    if (!reviews) return [];
    const copy = [...reviews];
    if (reviewSort === 'high') return copy.sort((a, b) => b.rating - a.rating);
    if (reviewSort === 'low') return copy.sort((a, b) => a.rating - b.rating);
    return copy.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [reviews, reviewSort]);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    toast.success(`${product.name} added to cart`);
  };

  const buyNowHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({ productId, rating, comment }).unwrap();
      refetch();
      setRating('');
      setComment('');
      toast.success('Review added');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  if (isLoading) {
    return (
      <div className='container page'>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className='container page'>
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      </div>
    );
  }

  const outOfStock = product.countInStock === 0;

  return (
    <div className='container page'>
      <Meta title={product.name} description={product.description} />

      <Breadcrumbs
        trail={[
          { label: 'Crafts', to: '/' },
          {
            label: product.category,
            to: `/category/${encodeURIComponent(product.category)}`,
          },
          { label: product.name },
        ]}
      />

      <div className='product-detail'>
        <div className='product-detail__image'>
          <img
            src={product.image}
            alt={product.name}
            width='800'
            height='600'
          />
        </div>

        <div>
          <div className='eyebrow product-detail__brand'>{product.brand}</div>
          <h1>{product.name}</h1>

          <a href='#reviews' className='product-detail__ratinglink'>
            <Rating
              value={product.rating}
              text={`${product.numReviews} review${
                product.numReviews === 1 ? '' : 's'
              }`}
            />
          </a>

          <div className='product-detail__price'>
            {formatINR(product.price)}
          </div>
          <p className='product-detail__desc'>{product.description}</p>

          <div className='buy-box'>
            <div className='buy-box__row'>
              <span
                className={
                  outOfStock
                    ? 'stock-flag stock-flag--out'
                    : 'stock-flag stock-flag--in'
                }
              >
                {outOfStock
                  ? 'Out of stock'
                  : `In stock · ${product.countInStock} left`}
              </span>

              {!outOfStock && (
                <label>
                  <span className='field__label'>Quantity</span>
                  <select
                    className='field__input qty-select'
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </label>
              )}
            </div>

            <div className='buy-box__actions'>
              <button
                type='button'
                className='btn'
                disabled={outOfStock}
                onClick={addToCartHandler}
              >
                Add to cart
              </button>
              <button
                type='button'
                className='btn btn--dark'
                disabled={outOfStock}
                onClick={buyNowHandler}
              >
                Buy now
              </button>
              <button
                type='button'
                className={saved ? 'btn btn--ghost is-saved' : 'btn btn--ghost'}
                onClick={() => {
                  dispatch(toggleWishlist(product));
                  toast.info(saved ? 'Removed from saved' : 'Saved for later');
                }}
                aria-pressed={saved}
              >
                {saved ? <FaHeart /> : <FaRegHeart />}
                {saved ? 'Saved' : 'Save'}
              </button>
            </div>

            <ul className='buy-box__assurances'>
              <li>
                <FaTruck aria-hidden='true' /> Free shipping over ₹2,000
              </li>
              <li>
                <FaMoneyBillWave aria-hidden='true' /> Cash on Delivery
                available
              </li>
            </ul>
          </div>
        </div>
      </div>

      <section className='reviews' id='reviews'>
        <div className='section-head'>
          <h2>Reviews</h2>
        </div>

        <RatingBreakdown reviews={product.reviews} rating={product.rating} />

        {product.reviews.length === 0 && (
          <Message>No reviews yet. Be the first to write one.</Message>
        )}

        {product.reviews.length > 1 && (
          <label className='reviews__sort'>
            <span className='field__label'>Sort reviews</span>
            <select
              className='field__input'
              value={reviewSort}
              onChange={(e) => setReviewSort(e.target.value)}
            >
              <option value='recent'>Most recent</option>
              <option value='high'>Highest rated</option>
              <option value='low'>Lowest rated</option>
            </select>
          </label>
        )}

        {sortedReviews.map((review) => (
          <article key={review._id} className='review-card'>
            <div className='review-card__head'>
              <span className='review-card__avatar' aria-hidden='true'>
                {review.name.charAt(0)}
              </span>
              <span className='review-card__name'>{review.name}</span>
              <Rating value={review.rating} />
              <span className='review-card__date'>
                {formatDate(review.createdAt)}
              </span>
            </div>
            <p>{review.comment}</p>
          </article>
        ))}

        <div style={{ marginTop: '2rem' }}>
          <h3>Write a review</h3>

          {loadingProductReview && <Loader small />}

          {userInfo ? (
            <form onSubmit={submitHandler}>
              <div className='field'>
                <label className='field__label' htmlFor='rating'>
                  Rating
                </label>
                <select
                  id='rating'
                  className='field__input'
                  required
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                >
                  <option value=''>Choose a rating…</option>
                  <option value='1'>1 — Poor</option>
                  <option value='2'>2 — Fair</option>
                  <option value='3'>3 — Good</option>
                  <option value='4'>4 — Very good</option>
                  <option value='5'>5 — Excellent</option>
                </select>
              </div>
              <div className='field'>
                <label className='field__label' htmlFor='comment'>
                  Comment
                </label>
                <textarea
                  id='comment'
                  className='field__input'
                  rows='3'
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </div>
              <button
                type='submit'
                className='btn'
                disabled={loadingProductReview}
              >
                Post review
              </button>
            </form>
          ) : (
            <Message>
              <Link to='/login'>Sign in</Link> to write a review.
            </Message>
          )}
        </div>
      </section>

      <ProductRail title={`More in ${product.category}`} products={related} />
      <ProductRail title='Recently viewed' products={recentlyViewed} />

      {/* Mobile-only sticky bar so the price and action stay reachable */}
      <div className='buy-bar'>
        <div className='buy-bar__price'>{formatINR(product.price)}</div>
        <button
          type='button'
          className='btn'
          disabled={outOfStock}
          onClick={addToCartHandler}
        >
          {outOfStock ? 'Sold out' : 'Add to cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductScreen;
