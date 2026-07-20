import { Link, useLocation } from 'react-router-dom';

const Paginate = ({
  pages,
  page,
  isAdmin = false,
  keyword = '',
  category = '',
  searchAll = false,
}) => {
  const { search } = useLocation();

  if (pages <= 1) return null;

  const pathFor = (p) =>
    isAdmin
      ? `/admin/productlist/${p}`
      : keyword
      ? `/search/${keyword}/page/${p}`
      : searchAll
      ? `/search/page/${p}`
      : category
      ? `/category/${encodeURIComponent(category)}/page/${p}`
      : `/page/${p}`;

  return (
    <nav className='pagination' aria-label='Pages'>
      {[...Array(pages).keys()].map((x) => (
        <Link
          key={x + 1}
          to={{ pathname: pathFor(x + 1), search }}
          className={
            x + 1 === page ? 'pagination__link is-active' : 'pagination__link'
          }
          aria-current={x + 1 === page ? 'page' : undefined}
        >
          {x + 1}
        </Link>
      ))}
    </nav>
  );
};

export default Paginate;
