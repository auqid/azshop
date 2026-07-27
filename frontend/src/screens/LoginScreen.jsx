import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');

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
    setFormError('');

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      const errorMsg =
        err?.data?.message || err.error || 'Invalid email or password';
      setFormError(errorMsg);
      toast.error(errorMsg);
    }
  };

  const registerLink = redirect
    ? `/register?redirect=${redirect}`
    : '/register';

  return (
    <div className='container page'>
      <Meta title='Sign in — Nargis' />
      <FormContainer>
        <h1>Sign in</h1>

        {formError && (
          <Message variant='danger'>
            {formError}. Don&apos;t have an account yet?{' '}
            <Link to={registerLink}>Create one here.</Link>
          </Message>
        )}

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
              onChange={(e) => {
                setEmail(e.target.value);
                if (formError) setFormError('');
              }}
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
              onChange={(e) => {
                setPassword(e.target.value);
                if (formError) setFormError('');
              }}
            />
          </div>

          <button type='submit' className='btn btn--block' disabled={isLoading}>
            Sign in
          </button>
          {isLoading && <Loader small />}
        </form>
      </FormContainer>

      <p className='form-page__footer'>
        New to Nargis? <Link to={registerLink}>Create an account</Link>
      </p>
    </div>
  );
};

export default LoginScreen;
