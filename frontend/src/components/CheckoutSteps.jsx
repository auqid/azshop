import { Link } from 'react-router-dom';

const STEPS = [
  { label: 'Sign in', to: '/login' },
  { label: 'Shipping', to: '/shipping' },
  { label: 'Payment', to: '/payment' },
  { label: 'Place order', to: '/placeorder' },
];

// `current` is the 1-based index of the step the user is on.
const CheckoutSteps = ({ current }) => {
  return (
    <ol className='steps'>
      {STEPS.map((step, i) => {
        const stepNumber = i + 1;
        const state =
          stepNumber < current
            ? 'step step--done'
            : stepNumber === current
              ? 'step step--current'
              : 'step';

        return (
          <li key={step.to} className={state}>
            {stepNumber < current ? (
              <Link to={step.to} className='step__label'>
                <span>{step.label}</span>
              </Link>
            ) : (
              <span className='step__label'>
                <span>{step.label}</span>
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
};

export default CheckoutSteps;
