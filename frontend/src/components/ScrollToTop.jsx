import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// React Router keeps the scroll position across navigations, which lands you
// mid-page after following a link. Reset on path change, but leave query-only
// changes (filters, sorting) alone so the grid doesn't jump under you.
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
