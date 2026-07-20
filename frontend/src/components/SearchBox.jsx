import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();
  const [keyword, setKeyword] = useState(urlKeyword || '');

  const submitHandler = (e) => {
    e.preventDefault();
    // An empty search still opens the results page, listing everything —
    // more useful than silently doing nothing.
    navigate(keyword.trim() ? `/search/${keyword.trim()}` : '/search');
  };

  return (
    <form onSubmit={submitHandler} className='search' role='search'>
      <input
        type='search'
        className='search__input'
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search pashmina, saffron, walnut…'
        aria-label='Search products'
      />
      <button type='submit' className='search__button' aria-label='Search'>
        <FaSearch />
      </button>
    </form>
  );
};

export default SearchBox;
