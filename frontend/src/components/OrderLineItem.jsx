import { Link } from 'react-router-dom';
import { formatINR } from '../utils/formatters';

// One product row inside an order or the order review — image, name, qty × price.
const OrderLineItem = ({ item }) => {
  const productId = item.product || item._id;

  return (
    <div className='line-item'>
      <img
        src={item.image}
        alt={item.name}
        className='line-item__thumb'
        loading='lazy'
        decoding='async'
      />
      <div>
        <Link to={`/product/${productId}`} className='line-item__name'>
          {item.name}
        </Link>
        <div className='line-item__sub'>
          {item.qty} × {formatINR(item.price)}
        </div>
      </div>
      <div className='line-item__end'>{formatINR(item.qty * item.price)}</div>
    </div>
  );
};

export default OrderLineItem;
