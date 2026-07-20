import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Product from '../components/Product';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductGridSkeleton from '../components/ProductGridSkeleton';
import CategoryNav from '../components/CategoryNav';
import FilterBar from '../components/FilterBar';
import Hero from '../components/Hero';
import PoemBand from '../components/PoemBand';
import Meta from '../components/Meta';

const HomeScreen = () => {
  const { pageNumber, keyword, category } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // /search with no keyword lists the whole catalogue in results form
  const isSearch = pathname.startsWith('/search');

  const filters = {
    sort: searchParams.get('sort') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    minRating: searchParams.get('minRating') || '',
  };

  // `data` keeps the previous results while a new page/category/filter loads,
  // so the grid never collapses between requests.
  const { data, isLoading, isFetching, error } = useGetProductsQuery({
    keyword,
    pageNumber,
    category,
    ...filters,
  });

  // Changing a filter starts back at page 1 of the current view.
  const applyFilters = (patch) => {
    const next = { ...filters, ...patch };
    const params = new URLSearchParams();
    Object.entries(next).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    const base = keyword
      ? `/search/${keyword}`
      : isSearch
      ? '/search'
      : category
      ? `/category/${encodeURIComponent(category)}`
      : '/';
    navigate({ pathname: base, search: params.toString() }, { replace: true });
  };

  const heading = keyword
    ? `Results for “${keyword}”`
    : category
    ? category
    : isSearch
    ? 'Everything we make'
    : 'The crafts';

  return (
    <>
      <Meta title={category ? `${category} — Nargis` : undefined} />
      {!isSearch && <Hero />}

      <div className='container page' id='crafts'>
        {isSearch && (
          <Link to='/' className='back-link'>
            <FaArrowLeft /> Back to all crafts
          </Link>
        )}

        <CategoryNav active={category} />
        <FilterBar {...filters} onChange={applyFilters} />

        <div className='catalog'>
          {isLoading ? (
            <>
              <div className='section-head'>
                <h2>{heading}</h2>
              </div>
              <ProductGridSkeleton />
            </>
          ) : error ? (
            <Message variant='danger'>
              {error?.data?.message || error.error}
            </Message>
          ) : (
            <>
              <div className='section-head'>
                <h2>{heading}</h2>
              </div>

              {data.products.length === 0 ? (
                <Message>
                  Nothing matches these filters.{' '}
                  <Link to='/'>Browse all crafts instead.</Link>
                </Message>
              ) : (
                <div
                  className={
                    isFetching ? 'product-grid is-refreshing' : 'product-grid'
                  }
                >
                  {data.products.map((product) => (
                    <Product key={product._id} product={product} />
                  ))}
                </div>
              )}

              <Paginate
                pages={data.pages}
                page={data.page}
                keyword={keyword ? keyword : ''}
                category={category ? category : ''}
                searchAll={isSearch && !keyword}
              />
            </>
          )}
        </div>
      </div>

      {!isSearch && !category && <PoemBand />}
    </>
  );
};

export default HomeScreen;
