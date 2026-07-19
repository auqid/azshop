import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from '../slices/productsApiSlice';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import { addToCart } from '../slices/cartSlice';
import { formatINR, formatDate } from '../utils/formatters';

const ProductScreen = () => {
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const addToCartHandler = () => {
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

  return (
    <div className='container page'>
      <Link to='/' className='back-link'>
        <FaArrowLeft /> Back to all crafts
      </Link>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta title={product.name} description={product.description} />

          <div className='product-detail'>
            <div className='product-detail__image'>
              <img src={product.image} alt={product.name} />
            </div>

            <div>
              <div className='eyebrow product-detail__brand'>
                {product.brand} ·{' '}
                <Link
                  to={`/category/${encodeURIComponent(product.category)}`}
                  style={{ color: 'inherit' }}
                >
                  {product.category}
                </Link>
              </div>
              <h1>{product.name}</h1>
              <Rating
                value={product.rating}
                text={`${product.numReviews} review${
                  product.numReviews === 1 ? '' : 's'
                }`}
              />
              <div className='product-detail__price'>
                {formatINR(product.price)}
              </div>
              <p className='product-detail__desc'>{product.description}</p>

              <div className='buy-box'>
                <div className='buy-box__row'>
                  <span
                    className={
                      product.countInStock > 0
                        ? 'stock-flag stock-flag--in'
                        : 'stock-flag stock-flag--out'
                    }
                  >
                    {product.countInStock > 0
                      ? `In stock · ${product.countInStock} left`
                      : 'Out of stock'}
                  </span>

                  {product.countInStock > 0 && (
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

                <button
                  type='button'
                  className='btn btn--block'
                  disabled={product.countInStock === 0}
                  onClick={addToCartHandler}
                >
                  Add to cart
                </button>
                <p
                  style={{
                    margin: '0.75rem 0 0',
                    fontSize: '0.85rem',
                    color: 'var(--reed)',
                  }}
                >
                  Free shipping on orders over ₹2,000 · Cash on Delivery
                  available
                </p>
              </div>
            </div>
          </div>

          <section className='reviews'>
            <div className='section-head'>
              <h2>Reviews</h2>
            </div>

            {product.reviews.length === 0 && (
              <Message>No reviews yet. Be the first to write one.</Message>
            )}

            {product.reviews.map((review) => (
              <article key={review._id} className='review-card'>
                <div className='review-card__head'>
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
        </>
      )}
    </div>
  );
};

export default ProductScreen;
