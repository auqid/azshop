import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
  usePayCodOrderMutation,
} from '../slices/ordersApiSlice';
import OrderLineItem from '../components/OrderLineItem';
import OrderSummary from '../components/OrderSummary';
import { formatDate } from '../utils/formatters';

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [payCodOrder, { isLoading: loadingPayCod }] = usePayCodOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const isPayPalOrder = order?.paymentMethod === 'PayPal';

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery(undefined, { skip: !isPayPalOrder });

  useEffect(() => {
    if (isPayPalOrder && !errorPayPal && !loadingPayPal && paypal?.clientId) {
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': paypal.clientId,
            currency: 'USD',
          },
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      };
      if (order && !order.isPaid && !window.paypal) {
        loadPaypalScript();
      }
    }
  }, [isPayPalOrder, errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success('Payment received');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    });
  }

  function onError(err) {
    toast.error(err.message);
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [{ amount: { value: order.totalPrice } }],
      })
      .then((orderID) => orderID);
  }

  const codPaidHandler = async () => {
    try {
      await payCodOrder(orderId).unwrap();
      refetch();
      toast.success('Order marked as paid');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const deliverHandler = async () => {
    try {
      await deliverOrder(orderId).unwrap();
      refetch();
      toast.success('Order marked as delivered');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return isLoading ? (
    <div className='container page'>
      <Loader />
    </div>
  ) : error ? (
    <div className='container page'>
      <Message variant='danger'>
        {error?.data?.message || error.error}
      </Message>
    </div>
  ) : (
    <div className='container page'>
      <Meta title={`Order ${order._id} — Nargis`} />
      <h1>
        Order <span className='mono-id'>{order._id}</span>
      </h1>

      <div className='checkout-grid'>
        <div className='panel'>
          <div className='panel__section'>
            <h2>Shipping</h2>
            <p style={{ margin: '0 0 0.35rem' }}>
              <strong>{order.user.name}</strong> ·{' '}
              <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
            </p>
            <p style={{ margin: 0 }}>
              {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
              {order.shippingAddress.postalCode},{' '}
              {order.shippingAddress.country}
            </p>
            {order.isDelivered ? (
              <Message variant='success'>
                Delivered on {formatDate(order.deliveredAt)}
              </Message>
            ) : (
              <Message>Not yet delivered</Message>
            )}
          </div>

          <div className='panel__section'>
            <h2>Payment</h2>
            <p style={{ margin: 0 }}>{order.paymentMethod}</p>
            {order.isPaid ? (
              <Message variant='success'>
                Paid on {formatDate(order.paidAt)}
              </Message>
            ) : (
              <Message>
                {order.paymentMethod === 'Cash on Delivery'
                  ? 'Payment will be collected when the order arrives.'
                  : 'Not yet paid'}
              </Message>
            )}
          </div>

          <div className='panel__section'>
            <h2>Items</h2>
            {order.orderItems.length === 0 ? (
              <Message>Order is empty</Message>
            ) : (
              order.orderItems.map((item) => (
                <OrderLineItem key={item.product} item={item} />
              ))
            )}
          </div>
        </div>

        <aside className='panel'>
          <div className='panel__section'>
            <h2 style={{ marginBottom: '0.5rem' }}>Order summary</h2>
            <OrderSummary
              itemsPrice={order.itemsPrice}
              shippingPrice={order.shippingPrice}
              taxPrice={order.taxPrice}
              totalPrice={order.totalPrice}
            />
          </div>

          {!order.isPaid && isPayPalOrder && (
            <div className='panel__section'>
              {loadingPay && <Loader small />}
              {isPending ? (
                <Loader small />
              ) : (
                <PayPalButtons
                  createOrder={createOrder}
                  onApprove={onApprove}
                  onError={onError}
                ></PayPalButtons>
              )}
            </div>
          )}

          {userInfo?.isAdmin &&
            (!order.isDelivered ||
              (!order.isPaid &&
                order.paymentMethod === 'Cash on Delivery')) && (
            <div className='panel__section'>
              {!order.isPaid &&
                order.paymentMethod === 'Cash on Delivery' && (
                  <button
                    type='button'
                    className='btn btn--dark btn--block'
                    onClick={codPaidHandler}
                    disabled={loadingPayCod}
                    style={{ marginBottom: '0.75rem' }}
                  >
                    Mark as paid (cash collected)
                  </button>
                )}
              {!order.isDelivered &&
                (order.isPaid ||
                  order.paymentMethod === 'Cash on Delivery') && (
                  <button
                    type='button'
                    className='btn btn--block'
                    onClick={deliverHandler}
                    disabled={loadingDeliver}
                  >
                    Mark as delivered
                  </button>
                )}
              {loadingDeliver && <Loader small />}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

export default OrderScreen;
