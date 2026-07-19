import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import CategoryNav from '../components/CategoryNav';
import FilterBar from '../components/FilterBar';
import Hero from '../components/Hero';
import PoemBand from '../components/PoemBand';
import Meta from '../components/Meta';

const HomeScreen = () => {
  const { pageNumber, keyword, category } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

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
      : category
      ? `/category/${encodeURIComponent(category)}`
      : '/';
    navigate({ pathname: base, search: params.toString() }, { replace: true });
  };

  const heading = keyword
    ? `Results for “${keyword}”`
    : category
    ? category
    : 'The crafts';

  return (
    <>
      <Meta title={category ? `${category} — Nargis` : undefined} />
      {!keyword && <Hero />}

      <div className='container page' id='crafts'>
        {keyword && (
          <Link to='/' className='back-link'>
            <FaArrowLeft /> Back to all crafts
          </Link>
        )}

        <CategoryNav active={category} />
        <FilterBar {...filters} onChange={applyFilters} />

        <div className='catalog'>
          {isLoading ? (
            <Loader />
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
              />
            </>
          )}
        </div>
      </div>

      {!keyword && !category && <PoemBand />}
    </>
  );
};

export default HomeScreen;
