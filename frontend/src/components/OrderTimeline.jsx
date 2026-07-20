import { FaCheck } from 'react-icons/fa';
import { formatDate } from '../utils/formatters';

// Visual progress of an order: placed -> paid -> delivered.
const OrderTimeline = ({ order }) => {
  const isCod = order.paymentMethod === 'Cash on Delivery';

  const steps = [
    {
      label: 'Order placed',
      detail: formatDate(order.createdAt),
      done: true,
    },
    {
      label: order.isPaid ? 'Payment received' : 'Payment pending',
      detail: order.isPaid
        ? formatDate(order.paidAt)
        : isCod
        ? 'Collected on delivery'
        : 'Awaiting payment',
      done: order.isPaid,
    },
    {
      label: order.isDelivered ? 'Delivered' : 'On its way',
      detail: order.isDelivered
        ? formatDate(order.deliveredAt)
        : 'Ships from Srinagar',
      done: order.isDelivered,
    },
  ];

  return (
    <ol className='timeline'>
      {steps.map((step) => (
        <li
          key={step.label}
          className={step.done ? 'timeline__step is-done' : 'timeline__step'}
        >
          <span className='timeline__dot' aria-hidden='true'>
            {step.done && <FaCheck size={10} />}
          </span>
          <span className='timeline__label'>{step.label}</span>
          <span className='timeline__detail'>{step.detail}</span>
        </li>
      ))}
    </ol>
  );
};

export default OrderTimeline;
