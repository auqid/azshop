import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [isExistingUser, setIsExistingUser] = useState(false);

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
    setFormError('');
    setIsExistingUser(false);

    if (password !== confirmPassword) {
      const msg = 'Passwords do not match';
      setFormError(msg);
      toast.error(msg);
      return;
    }

    if (password.length < 8) {
      const msg = 'Password must be at least 8 characters long';
      setFormError(msg);
      toast.error(msg);
      return;
    }

    try {
      const res = await register({ name, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      const errorMsg =
        err?.data?.message ||
        err.error ||
        'An error occurred during registration';
      setFormError(errorMsg);
      if (
        errorMsg.toLowerCase().includes('already exists') ||
        err?.status === 400
      ) {
        setIsExistingUser(true);
      }
      toast.error(errorMsg);
    }
  };

  const loginLink = redirect ? `/login?redirect=${redirect}` : '/login';

  return (
    <div className='container page'>
      <Meta title='Create an account — Nargis' />
      <FormContainer>
        <h1>Create an account</h1>

        {formError && (
          <Message variant='danger'>
            {formError}{' '}
            {isExistingUser && (
              <span>
                Would you like to <Link to={loginLink}>Sign in instead?</Link>
              </span>
            )}
          </Message>
        )}

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
              onChange={(e) => {
                setName(e.target.value);
                if (formError) setFormError('');
              }}
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
              onChange={(e) => {
                setEmail(e.target.value);
                if (formError) setFormError('');
              }}
            />
          </div>

          <div className='field'>
            <label className='field__label' htmlFor='password'>
              Password (min 8 characters)
            </label>
            <input
              id='password'
              className='field__input'
              type='password'
              required
              minLength={8}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (formError) setFormError('');
              }}
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
              minLength={8}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (formError) setFormError('');
              }}
            />
          </div>

          <button type='submit' className='btn btn--block' disabled={isLoading}>
            Create account
          </button>
          {isLoading && <Loader small />}
        </form>
      </FormContainer>

      <p className='form-page__footer'>
        Already have an account? <Link to={loginLink}>Sign in</Link>
      </p>
    </div>
  );
};

export default RegisterScreen;
