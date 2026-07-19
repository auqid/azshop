import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/cartSlice';
import OrderLineItem from '../components/OrderLineItem';
import OrderSummary from '../components/OrderSummary';

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err?.data?.message || err.error || 'Could not place order');
    }
  };

  return (
    <div className='container page'>
      <Meta title='Review your order — Nargis' />
      <CheckoutSteps current={4} />

      <div className='checkout-grid'>
        <div className='panel'>
          <div className='panel__section'>
            <h2>Shipping</h2>
            <p style={{ margin: 0 }}>
              {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
              {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
            </p>
          </div>

          <div className='panel__section'>
            <h2>Payment</h2>
            <p style={{ margin: 0 }}>{cart.paymentMethod}</p>
          </div>

          <div className='panel__section'>
            <h2>Items</h2>
            {cart.cartItems.length === 0 ? (
              <Message>Your cart is empty.</Message>
            ) : (
              cart.cartItems.map((item) => (
                <OrderLineItem key={item._id} item={item} />
              ))
            )}
          </div>
        </div>

        <aside className='panel'>
          <div className='panel__section'>
            <h2 style={{ marginBottom: '0.5rem' }}>Order summary</h2>
            <OrderSummary
              itemsPrice={cart.itemsPrice}
              shippingPrice={cart.shippingPrice}
              taxPrice={cart.taxPrice}
              totalPrice={cart.totalPrice}
            />
          </div>

          <div className='panel__section'>
            {error && (
              <Message variant='danger'>
                {error?.data?.message || error.error}
              </Message>
            )}
            <button
              type='button'
              className='btn btn--block'
              disabled={cart.cartItems.length === 0 || isLoading}
              onClick={placeOrderHandler}
            >
              Place order
            </button>
            {isLoading && <Loader small />}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
