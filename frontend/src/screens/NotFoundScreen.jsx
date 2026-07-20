import { Link } from 'react-router-dom';
import Meta from '../components/Meta';

const NotFoundScreen = () => (
  <div className='container page not-found'>
    <Meta title='Page not found — Nargis' />
    <p className='eyebrow'>Error 404</p>
    <h1>This page has wandered off.</h1>
    <p className='not-found__copy'>
      The link may be old, or the craft may have sold out and been retired.
    </p>
    <Link to='/' className='btn'>
      Back to the crafts
    </Link>
  </div>
);

export default NotFoundScreen;
