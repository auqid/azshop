import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className='container page'>
      <Meta title='Sign in — Nargis' />
      <FormContainer>
        <h1>Sign in</h1>

        <form onSubmit={submitHandler}>
          <div className='field'>
            <label className='field__label' htmlFor='email'>
              Email address
            </label>
            <input
              id='email'
              className='field__input'
              type='email'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className='field'>
            <label className='field__label' htmlFor='password'>
              Password
            </label>
            <input
              id='password'
              className='field__input'
              type='password'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type='submit'
            className='btn btn--block'
            disabled={isLoading}
          >
            Sign in
          </button>
          {isLoading && <Loader small />}
        </form>
      </FormContainer>

      <p className='form-page__footer'>
        New to Nargis?{' '}
        <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
          Create an account
        </Link>
      </p>
    </div>
  );
};

export default LoginScreen;
