import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import Meta from '../../components/Meta';
import { useGetOrdersQuery } from '../../slices/ordersApiSlice';
import { formatINR, formatDate } from '../../utils/formatters';

const STATUS_FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'unpaid', label: 'Awaiting payment' },
  { value: 'undelivered', label: 'To ship' },
  { value: 'delivered', label: 'Delivered' },
];

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();
  const [status, setStatus] = useState('all');
  const [query, setQuery] = useState('');

  const visible = useMemo(() => {
    let list = orders || [];
    if (status === 'unpaid') list = list.filter((o) => !o.isPaid);
    if (status === 'undelivered') list = list.filter((o) => !o.isDelivered);
    if (status === 'delivered') list = list.filter((o) => o.isDelivered);

    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (o) =>
          o._id.toLowerCase().includes(q) ||
          (o.user?.name || '').toLowerCase().includes(q)
      );
    }
    return list;
  }, [orders, status, query]);

  return (
    <div className='container page'>
      <Meta title='Orders — Nargis admin' />
      <div className='page-title-row'>
        <h1>Orders</h1>
        {orders && (
          <span className='result-count'>
            {visible.length} of {orders.length}
          </span>
        )}
      </div>

      <div className='admin-toolbar'>
        <div className='segmented'>
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.value}
              type='button'
              className={
                status === f.value
                  ? 'segmented__btn is-active'
                  : 'segmented__btn'
              }
              onClick={() => setStatus(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <input
          type='search'
          className='field__input admin-toolbar__search'
          placeholder='Search by order ID or customer…'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label='Search orders'
        />
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : visible.length === 0 ? (
        <Message>
          {orders.length === 0
            ? 'No orders yet.'
            : 'No orders match this filter.'}
        </Message>
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
              {visible.map((order) => (
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
                      <span className='cell-ok'>
                        {formatDate(order.paidAt)}
                      </span>
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
