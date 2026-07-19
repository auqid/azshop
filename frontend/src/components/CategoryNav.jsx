import { Link } from 'react-router-dom';
import { useGetCategoriesQuery } from '../slices/productsApiSlice';

// Chip row for browsing by category. `active` is the currently open category.
const CategoryNav = ({ active }) => {
  const { data: categories, isLoading, error } = useGetCategoriesQuery();

  if (isLoading || error || !categories?.length) return null;

  return (
    <nav className='category-nav' aria-label='Categories'>
      <Link to='/' className={!active ? 'chip is-active' : 'chip'}>
        All crafts
      </Link>
      {categories.map((category) => (
        <Link
          key={category}
          to={`/category/${encodeURIComponent(category)}`}
          className={category === active ? 'chip is-active' : 'chip'}
          aria-current={category === active ? 'page' : undefined}
        >
          {category}
        </Link>
      ))}
    </nav>
  );
};

export default CategoryNav;
