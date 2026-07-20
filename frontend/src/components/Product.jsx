import { Link } from 'react-router-dom';
import Rating from './Rating';
import { formatINR } from '../utils/formatters';

const Product = ({ product }) => {
  return (
    <article className='product-card'>
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
        <div className='product-card__price'>
          {formatINR(product.price)}
          {product.countInStock === 0 && (
            <span className='product-card__flag'> · Out of stock</span>
          )}
        </div>
      </div>
    </article>
  );
};

export default Product;
