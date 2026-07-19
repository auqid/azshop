import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import Meta from '../../components/Meta';
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from '../../slices/usersApiSlice';

const UserEditScreen = () => {
  const { id: userId } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useGetUserDetailsQuery(userId);

  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ userId, name, email, isAdmin });
      toast.success('User updated');
      refetch();
      navigate('/admin/userlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className='container page'>
      <Meta title='Edit user — Nargis admin' />
      <Link to='/admin/userlist' className='back-link'>
        <FaArrowLeft /> Back to users
      </Link>

      <FormContainer>
        <h1>Edit user</h1>
        {loadingUpdate && <Loader small />}

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>
            {error?.data?.message || error.error}
          </Message>
        ) : (
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
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontWeight: 600,
                }}
              >
                <input
                  type='checkbox'
                  checked={isAdmin}
                  style={{ accentColor: 'var(--saffron)' }}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                />
                Administrator
              </label>
            </div>

            <button type='submit' className='btn btn--block'>
              Save changes
            </button>
          </form>
        )}
      </FormContainer>
    </div>
  );
};

export default UserEditScreen;
