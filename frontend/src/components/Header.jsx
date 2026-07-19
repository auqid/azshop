import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  FaShoppingBasket,
  FaUserCircle,
  FaChevronDown,
  FaSlidersH,
} from 'react-icons/fa';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import SearchBox from './SearchBox';
import BrandMark from './BrandMark';

// Small dropdown built on <details>. The shared `name` makes the browser
// close one menu when another opens; the listeners below close on outside
// click and Escape, and after choosing an item.
const Menu = ({ label, children }) => {
  const ref = useRef(null);
  const close = () => ref.current?.removeAttribute('open');

  useEffect(() => {
    const onPointerDown = (e) => {
      if (ref.current?.open && !ref.current.contains(e.target)) close();
    };
    const onKeyDown = (e) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return (
    <details className='menu' ref={ref} name='header-menu'>
      <summary className='nav-link' style={{ listStyle: 'none' }}>
        {label} <FaChevronDown size={11} />
      </summary>
      <ul className='menu__list' onClick={close}>
        {children}
      </ul>
    </details>
  );
};

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  const cartCount = cartItems.reduce((a, c) => a + c.qty, 0);

  return (
    <header className='site-header'>
      <div className='container site-header__inner'>
        <Link to='/' className='brand'>
          <BrandMark />
          <span className='brand__name'>
            Nargis
            <span className='brand__tag'>Handcrafted in Kashmir</span>
          </span>
        </Link>

        <SearchBox />

        <nav className='site-nav'>
          <Link to='/cart' className='nav-link' aria-label='Cart'>
            <FaShoppingBasket />
            <span className='nav-text'>Cart</span>
            {cartCount > 0 && <span className='cart-badge'>{cartCount}</span>}
          </Link>

          {userInfo ? (
            <Menu
              label={
                <>
                  <FaUserCircle />
                  <span className='nav-text'>{userInfo.name.split(' ')[0]}</span>
                </>
              }
            >
              <li>
                <Link to='/profile' className='menu__item'>
                  Profile & orders
                </Link>
              </li>
              <li>
                <button
                  type='button'
                  className='menu__item'
                  onClick={logoutHandler}
                >
                  Log out
                </button>
              </li>
            </Menu>
          ) : (
            <Link to='/login' className='nav-link' aria-label='Sign in'>
              <FaUserCircle /> <span className='nav-text'>Sign in</span>
            </Link>
          )}

          {userInfo && userInfo.isAdmin && (
            <Menu
              label={
                <>
                  <FaSlidersH />
                  <span className='nav-text'>Manage</span>
                </>
              }
            >
              <li>
                <Link to='/admin/dashboard' className='menu__item'>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to='/admin/productlist' className='menu__item'>
                  Products
                </Link>
              </li>
              <li>
                <Link to='/admin/orderlist' className='menu__item'>
                  Orders
                </Link>
              </li>
              <li>
                <Link to='/admin/userlist' className='menu__item'>
                  Users
                </Link>
              </li>
            </Menu>
          )}
        </nav>
      </div>
      <div className='kani-strip' aria-hidden='true'></div>
    </header>
  );
};

export default Header;
