import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import Meta from '../../components/Meta';
import { useGetOrdersQuery } from '../../slices/ordersApiSlice';
import { formatINR, formatDate } from '../../utils/formatters';

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <div className='container page'>
      <Meta title='Orders — Nargis admin' />
      <h1>Orders</h1>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : orders.length === 0 ? (
        <Message>No orders yet.</Message>
      ) : (
        <div className='table-wrap'>
          <table className='table'>
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Paid</th>
                <th>Delivered</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className='cell-mono'>{order._id.slice(-8)}</td>
                  <td>{order.user && order.user.name}</td>
                  <td>{formatDate(order.createdAt)}</td>
                  <td>{formatINR(order.totalPrice)}</td>
                  <td>
                    {order.paymentMethod === 'Cash on Delivery' ? (
                      <span className='badge badge--warn'>COD</span>
                    ) : (
                      order.paymentMethod
                    )}
                  </td>
                  <td>
                    {order.isPaid ? (
                      <span className='cell-ok'>{formatDate(order.paidAt)}</span>
                    ) : (
                      <FaTimes className='cell-no' aria-label='Not paid' />
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      <span className='cell-ok'>
                        {formatDate(order.deliveredAt)}
                      </span>
                    ) : (
                      <FaTimes className='cell-no' aria-label='Not delivered' />
                    )}
                  </td>
                  <td>
                    <Link
                      to={`/order/${order._id}`}
                      className='btn btn--ghost btn--sm'
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderListScreen;
