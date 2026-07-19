import { formatINR } from '../utils/formatters';

// Items / shipping / GST / total block shared by the review and order screens.
const OrderSummary = ({ itemsPrice, shippingPrice, taxPrice, totalPrice }) => (
  <dl style={{ margin: 0 }}>
    <div className='summary-row'>
      <dt>Items</dt>
      <dd>{formatINR(itemsPrice)}</dd>
    </div>
    <div className='summary-row'>
      <dt>Shipping</dt>
      <dd>{Number(shippingPrice) === 0 ? 'Free' : formatINR(shippingPrice)}</dd>
    </div>
    <div className='summary-row'>
      <dt>GST (5%)</dt>
      <dd>{formatINR(taxPrice)}</dd>
    </div>
    <div className='summary-row summary-row--total'>
      <dt>Total</dt>
      <dd>{formatINR(totalPrice)}</dd>
    </div>
  </dl>
);

export default OrderSummary;
