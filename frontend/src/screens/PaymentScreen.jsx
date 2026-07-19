import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import Meta from '../components/Meta';
import { savePaymentMethod } from '../slices/cartSlice';

const PaymentScreen = () => {
  const { shippingAddress, paymentMethod: savedMethod } = useSelector(
    (state) => state.cart
  );
  const [paymentMethod, setPaymentMethod] = useState(
    savedMethod || 'Cash on Delivery'
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!shippingAddress?.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <div className='container page'>
      <Meta title='Payment — Nargis' />
      <CheckoutSteps current={3} />

      <FormContainer>
        <h1>How would you like to pay?</h1>

        <form onSubmit={submitHandler}>
          <label className='choice'>
            <input
              type='radio'
              name='paymentMethod'
              value='Cash on Delivery'
              checked={paymentMethod === 'Cash on Delivery'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span>
              <span className='choice__title'>Cash on Delivery</span>
              <p className='choice__hint'>
                Pay by cash or UPI when your order arrives.
              </p>
            </span>
          </label>

          <label className='choice'>
            <input
              type='radio'
              name='paymentMethod'
              value='PayPal'
              checked={paymentMethod === 'PayPal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span>
              <span className='choice__title'>PayPal</span>
              <p className='choice__hint'>
                Pay online with a PayPal account or card.
              </p>
            </span>
          </label>

          <button type='submit' className='btn btn--block'>
            Continue
          </button>
        </form>
      </FormContainer>
    </div>
  );
};

export default PaymentScreen;
