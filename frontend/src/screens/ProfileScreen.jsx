import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaTimes, FaCheck } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import { useProfileMutation } from '../slices/usersApiSlice';
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { formatINR, formatDate } from '../utils/formatters';

const ProfileScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);

  // userInfo is already in the store, so seed the form directly rather than
  // rendering empty inputs and filling them in an effect.
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (password && password.length < 8) {
      toast.error('New password must be at least 8 characters long');
      return;
    }
    try {
      const res = await updateProfile({ name, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success('Profile updated');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className='container page'>
      <Meta title='Your account — Nargis' />
      <h1>Your account</h1>

      <div className='profile-grid'>
        <div className='form-card'>
          <h2>Details</h2>

          <form onSubmit={submitHandler}>
            <div className='field'>
              <label className='field__label' htmlFor='name'>
                Name
              </label>
              <input
                id='name'
                className='field__input'
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className='field'>
              <label className='field__label' htmlFor='email'>
                Email address
              </label>
              <input
                id='email'
                className='field__input'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className='field'>
              <label className='field__label' htmlFor='password'>
                New password
              </label>
              <input
                id='password'
                className='field__input'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className='field'>
              <label className='field__label' htmlFor='confirmPassword'>
                Confirm new password
              </label>
              <input
                id='confirmPassword'
                className='field__input'
                type='password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              type='submit'
              className='btn btn--block'
              disabled={loadingUpdateProfile}
            >
              Save changes
            </button>
            {loadingUpdateProfile && <Loader small />}
          </form>
        </div>

        <div>
          <h2>Your orders</h2>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>
              {error?.data?.message || error.error}
            </Message>
          ) : orders.length === 0 ? (
            <Message>
              No orders yet. <Link to='/'>Browse the crafts.</Link>
            </Message>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className='table-wrap profile-orders__desktop'>
                <table className='table'>
                  <thead>
                    <tr>
                      <th>Order</th>
                      <th>Date</th>
                      <th>Total</th>
                      <th>Paid</th>
                      <th>Delivered</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td className='cell-mono'>{order._id}</td>
                        <td>{formatDate(order.createdAt)}</td>
                        <td>{formatINR(order.totalPrice)}</td>
                        <td>
                          {order.isPaid ? (
                            <span className='cell-ok'>
                              {formatDate(order.paidAt)}
                            </span>
                          ) : (
                            <FaTimes
                              className='cell-no'
                              aria-label='Not paid'
                            />
                          )}
                        </td>
                        <td>
                          {order.isDelivered ? (
                            <span className='cell-ok'>
                              {formatDate(order.deliveredAt)}
                            </span>
                          ) : (
                            <FaTimes
                              className='cell-no'
                              aria-label='Not delivered'
                            />
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

              {/* Mobile Order Cards View */}
              <div className='profile-orders__mobile'>
                {orders.map((order) => (
                  <div key={order._id} className='order-card-mobile'>
                    <div className='order-card-mobile__header'>
                      <span className='cell-mono'>
                        ID: #{order._id.slice(-8)}
                      </span>
                      <span className='order-card-mobile__date'>
                        {formatDate(order.createdAt)}
                      </span>
                    </div>
                    <div className='order-card-mobile__body'>
                      <div className='order-card-mobile__total'>
                        {formatINR(order.totalPrice)}
                      </div>
                      <div className='order-card-mobile__badges'>
                        {order.isPaid ? (
                          <span
                            className='badge badge--ok'
                            title={`Paid on ${formatDate(order.paidAt)}`}
                          >
                            <FaCheck size={10} /> Paid
                          </span>
                        ) : (
                          <span className='badge badge--warn'>Unpaid</span>
                        )}
                        {order.isDelivered ? (
                          <span
                            className='badge badge--ok'
                            title={`Delivered on ${formatDate(order.deliveredAt)}`}
                          >
                            <FaCheck size={10} /> Delivered
                          </span>
                        ) : (
                          <span className='badge badge--no'>Pending</span>
                        )}
                      </div>
                    </div>
                    <Link
                      to={`/order/${order._id}`}
                      className='btn btn--ghost btn--sm btn--block'
                    >
                      View details
                    </Link>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
