import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash, FaArrowLeft } from 'react-icons/fa';
import Message from '../components/Message';
import Meta from '../components/Meta';
import { addToCart, removeFromCart } from '../slices/cartSlice';
import { formatINR } from '../utils/formatters';
import { FREE_SHIPPING_THRESHOLD } from '../utils/cartUtils';

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  const itemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );

  const checkOutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <div className='container page'>
      <Meta title='Your cart — Nargis' />
      <h1>Your cart</h1>

      {cartItems.length === 0 ? (
        <Message>
          Your cart is empty. <Link to='/'>Browse the crafts.</Link>
        </Message>
      ) : (
        <div className='checkout-grid'>
          <div className='panel'>
            <div className='panel__section'>
              {cartItems.map((item) => (
                <div key={item._id} className='line-item'>
                  <img
                    src={item.image}
                    alt={item.name}
                    className='line-item__thumb'
                  />
                  <div>
                    <Link
                      to={`/product/${item._id}`}
                      className='line-item__name'
                    >
                      {item.name}
                    </Link>
                    <div className='line-item__sub'>
                      {formatINR(item.price)} each
                    </div>
                  </div>
                  <div className='line-item__end'>
                    <select
                      className='field__input qty-select'
                      value={item.qty}
                      aria-label={`Quantity of ${item.name}`}
                      onChange={(e) =>
                        dispatch(
                          addToCart({ ...item, qty: Number(e.target.value) })
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                    <button
                      type='button'
                      className='btn btn--ghost btn--icon'
                      aria-label={`Remove ${item.name} from cart`}
                      onClick={() => dispatch(removeFromCart(item._id))}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className='panel__section'>
              <Link to='/' className='back-link' style={{ marginBottom: 0 }}>
                <FaArrowLeft /> Continue shopping
              </Link>
            </div>
          </div>

          <aside className='panel'>
            <div className='panel__section'>
              <h2 style={{ marginBottom: '0.5rem' }}>Summary</h2>
              <dl style={{ margin: 0 }}>
                <div className='summary-row'>
                  <dt>
                    Subtotal ({itemCount} item{itemCount === 1 ? '' : 's'})
                  </dt>
                  <dd>{formatINR(subtotal)}</dd>
                </div>
              </dl>
              <p style={{ fontSize: '0.85rem', color: 'var(--reed)' }}>
                {subtotal > FREE_SHIPPING_THRESHOLD
                  ? 'This order ships free.'
                  : `Add ${formatINR(
                      FREE_SHIPPING_THRESHOLD + 1 - subtotal
                    )} more for free shipping.`}{' '}
                GST and shipping are calculated at checkout.
              </p>
            </div>
            <div className='panel__section'>
              <button
                type='button'
                className='btn btn--block'
                disabled={cartItems.length === 0}
                onClick={checkOutHandler}
              >
                Proceed to checkout
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};

export default CartScreen;
