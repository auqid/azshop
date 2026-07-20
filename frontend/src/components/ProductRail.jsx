import { Link } from 'react-router-dom';
import Rating from './Rating';
import { formatINR } from '../utils/formatters';

// Compact horizontal strip of products — used for related and recently viewed.
const ProductRail = ({ title, products, emptyHint }) => {
  if (!products || products.length === 0) return emptyHint || null;

  return (
    <section className='rail'>
      <div className='section-head'>
        <h2>{title}</h2>
      </div>
      <ul className='rail__track'>
        {products.map((product) => (
          <li key={product._id} className='rail__item'>
            <Link to={`/product/${product._id}`} className='rail__card'>
              <img
                src={product.image}
                alt={product.name}
                loading='lazy'
                decoding='async'
              />
              <span className='rail__name'>{product.name}</span>
              <Rating value={product.rating} />
              <span className='rail__price'>{formatINR(product.price)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ProductRail;
