import { Link } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import Meta from '../../components/Meta';
import { useGetOrderSummaryQuery } from '../../slices/ordersApiSlice';
import { formatINR, formatDate } from '../../utils/formatters';

const DashboardScreen = () => {
  const { data: summary, isLoading, error } = useGetOrderSummaryQuery();

  return (
    <div className='container page'>
      <Meta title='Dashboard — Nargis admin' />
      <h1>Dashboard</h1>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <div className='stat-grid'>
            <div className='stat-card'>
              <div className='stat-card__label'>Collected revenue</div>
              <div className='stat-card__value'>
                {formatINR(summary.paidRevenue)}
              </div>
              <p className='stat-card__hint'>Paid orders only</p>
            </div>
            <div className='stat-card'>
              <div className='stat-card__label'>Orders</div>
              <div className='stat-card__value'>{summary.ordersCount}</div>
              <p className='stat-card__hint'>
                {summary.undelivered} awaiting delivery
              </p>
            </div>
            <div
              className={
                summary.unpaidCod > 0
                  ? 'stat-card stat-card--warn'
                  : 'stat-card'
              }
            >
              <div className='stat-card__label'>COD to collect</div>
              <div className='stat-card__value'>{summary.unpaidCod}</div>
              <p className='stat-card__hint'>Cash on Delivery, not yet paid</p>
            </div>
            <div
              className={
                summary.outOfStock > 0
                  ? 'stat-card stat-card--warn'
                  : 'stat-card'
              }
            >
              <div className='stat-card__label'>Products</div>
              <div className='stat-card__value'>{summary.productsCount}</div>
              <p className='stat-card__hint'>
                {summary.outOfStock} out of stock
              </p>
            </div>
            <div className='stat-card'>
              <div className='stat-card__label'>Customers</div>
              <div className='stat-card__value'>{summary.usersCount}</div>
              <p className='stat-card__hint'>Registered accounts</p>
            </div>
          </div>

          <div className='section-head'>
            <h2>Recent orders</h2>
          </div>

          {summary.recentOrders.length === 0 ? (
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
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {summary.recentOrders.map((order) => (
                    <tr key={order._id}>
                      <td className='cell-mono'>{order._id.slice(-8)}</td>
                      <td>{order.user && order.user.name}</td>
                      <td>{formatDate(order.createdAt)}</td>
                      <td>{formatINR(order.totalPrice)}</td>
                      <td>
                        {order.isDelivered ? (
                          <span className='badge badge--ok'>Delivered</span>
                        ) : order.isPaid ? (
                          <span className='badge badge--ok'>Paid</span>
                        ) : order.paymentMethod === 'Cash on Delivery' ? (
                          <span className='badge badge--warn'>COD pending</span>
                        ) : (
                          <span className='badge badge--no'>Unpaid</span>
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
        </>
      )}
    </div>
  );
};

export default DashboardScreen;
