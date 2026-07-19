import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

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
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      const res = await register({ name, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className='container page'>
      <Meta title='Create an account — Nargis' />
      <FormContainer>
        <h1>Create an account</h1>

        <form onSubmit={submitHandler}>
          <div className='field'>
            <label className='field__label' htmlFor='name'>
              Name
            </label>
            <input
              id='name'
              className='field__input'
              type='text'
              required
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

          <div className='field'>
            <label className='field__label' htmlFor='confirmPassword'>
              Confirm password
            </label>
            <input
              id='confirmPassword'
              className='field__input'
              type='password'
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            type='submit'
            className='btn btn--block'
            disabled={isLoading}
          >
            Create account
          </button>
          {isLoading && <Loader small />}
        </form>
      </FormContainer>

      <p className='form-page__footer'>
        Already have an account?{' '}
        <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default RegisterScreen;
