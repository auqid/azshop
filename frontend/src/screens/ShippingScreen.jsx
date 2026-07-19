import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import Meta from '../components/Meta';
import { saveShippingAddress } from '../slices/cartSlice';

const ShippingScreen = () => {
  const { shippingAddress } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingAddress?.address || '');
  const [city, setCity] = useState(shippingAddress?.city || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ''
  );
  const [country, setCountry] = useState(shippingAddress?.country || 'India');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate('/payment');
  };

  return (
    <div className='container page'>
      <Meta title='Shipping — Nargis' />
      <CheckoutSteps current={2} />

      <FormContainer>
        <h1>Shipping address</h1>

        <form onSubmit={submitHandler}>
          <div className='field'>
            <label className='field__label' htmlFor='address'>
              Address
            </label>
            <input
              id='address'
              className='field__input'
              type='text'
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className='field'>
            <label className='field__label' htmlFor='city'>
              City
            </label>
            <input
              id='city'
              className='field__input'
              type='text'
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div className='field'>
            <label className='field__label' htmlFor='postalCode'>
              PIN code
            </label>
            <input
              id='postalCode'
              className='field__input'
              type='text'
              inputMode='numeric'
              required
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>

          <div className='field'>
            <label className='field__label' htmlFor='country'>
              Country
            </label>
            <input
              id='country'
              className='field__input'
              type='text'
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>

          <button type='submit' className='btn btn--block'>
            Continue to payment
          </button>
        </form>
      </FormContainer>
    </div>
  );
};

export default ShippingScreen;
