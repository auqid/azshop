import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// Every way of browsing the catalog: all crafts, a category, a search, and the
// paginated variants of each.
const CATALOG_PATH =
  /^\/(page\/\d+|category\/[^/]+(\/page\/\d+)?|search(\/[^/]+)?(\/page\/\d+)?)?$/;

// React Router keeps the scroll position across navigations, which lands you
// mid-page after following a link. Reset on path change — except when moving
// around inside the catalog (next page, another category), where being thrown
// back up to the hero loses your place. There we only scroll far enough to put
// the top of the results under the header, and only if you were below it.
const ScrollToTop = () => {
  const { pathname } = useLocation();
  const previousPath = useRef(pathname);

  useEffect(() => {
    const from = previousPath.current;
    previousPath.current = pathname;

    if (from === pathname) return;

    const withinCatalog =
      CATALOG_PATH.test(from) && CATALOG_PATH.test(pathname);

    if (withinCatalog) {
      const catalog = document.getElementById('crafts');
      if (catalog) {
        const header = document.querySelector('.site-header');
        const offset = (header?.offsetHeight || 0) + 12;
        const resultsTop =
          catalog.getBoundingClientRect().top + window.scrollY - offset;

        // Only pull up if they're already past the start of the results;
        // if the hero is still on screen, leave the page where it is.
        if (window.scrollY > resultsTop) {
          window.scrollTo({ top: resultsTop, left: 0, behavior: 'instant' });
        }
        return;
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
