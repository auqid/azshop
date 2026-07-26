import { useState } from 'react';
import { FaSlidersH, FaChevronDown } from 'react-icons/fa';

const SORT_OPTIONS = [
  { value: '', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price_asc', label: 'Price: low to high' },
  { value: 'price_desc', label: 'Price: high to low' },
  { value: 'rating', label: 'Top rated' },
];

// Reads its values from the parent (URL params) and reports changes back
// through onChange({ sort, minPrice, maxPrice, minRating }).
const FilterBar = ({ sort, minPrice, maxPrice, minRating, onChange }) => {
  const [min, setMin] = useState(minPrice);
  const [max, setMax] = useState(maxPrice);
  // mobile-only disclosure; the panel is always visible on wider screens
  const [open, setOpen] = useState(false);

  // The price boxes are typed into locally but owned by the URL. When the URL
  // changes (Clear, back button), re-sync during render — the React-recommended
  // alternative to syncing props into state from an effect.
  const [syncedPrices, setSyncedPrices] = useState({ minPrice, maxPrice });
  if (
    syncedPrices.minPrice !== minPrice ||
    syncedPrices.maxPrice !== maxPrice
  ) {
    setSyncedPrices({ minPrice, maxPrice });
    setMin(minPrice);
    setMax(maxPrice);
  }

  const submitPrices = (e) => {
    e.preventDefault();
    onChange({ minPrice: min, maxPrice: max });
  };

  const hasFilters = Boolean(sort || minPrice || maxPrice || minRating);
  const activeCount = [sort, minPrice, maxPrice, minRating].filter(
    Boolean
  ).length;

  return (
    <form
      className={open ? 'filter-bar is-open' : 'filter-bar'}
      onSubmit={submitPrices}
    >
      <button
        type='button'
        className='filter-bar__toggle'
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <FaSlidersH />
        Filters &amp; sort
        {activeCount > 0 && <span className='cart-badge'>{activeCount}</span>}
        <FaChevronDown className='filter-bar__chevron' />
      </button>

      <div className='filter-bar__panel'>
        <label className='filter-bar__field'>
          <span className='filter-bar__label'>Sort by</span>
          <select
            className='field__input'
            value={sort}
            onChange={(e) => onChange({ sort: e.target.value })}
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className='filter-bar__field'>
          <span className='filter-bar__label'>Min ₹</span>
          <input
            type='number'
            className='field__input filter-bar__price'
            min='0'
            placeholder='0'
            value={min}
            onChange={(e) => setMin(e.target.value)}
            onBlur={() => onChange({ minPrice: min, maxPrice: max })}
          />
        </label>

        <label className='filter-bar__field'>
          <span className='filter-bar__label'>Max ₹</span>
          <input
            type='number'
            className='field__input filter-bar__price'
            min='0'
            placeholder='Any'
            value={max}
            onChange={(e) => setMax(e.target.value)}
            onBlur={() => onChange({ minPrice: min, maxPrice: max })}
          />
        </label>

        <label className='filter-bar__field filter-bar__field--slider'>
          <span className='filter-bar__label'>
            Rating: {minRating ? `${minRating}★ & up` : 'any'}
          </span>
          <input
            type='range'
            min='0'
            max='5'
            step='0.5'
            value={minRating || 0}
            aria-label='Minimum rating'
            onChange={(e) =>
              onChange({
                minRating: Number(e.target.value) === 0 ? '' : e.target.value,
              })
            }
          />
        </label>

        {/* keeps Enter-to-apply working for the price inputs */}
        <button type='submit' hidden aria-hidden='true'></button>

        {hasFilters && (
          <button
            type='button'
            className='btn btn--ghost btn--sm'
            onClick={() =>
              onChange({ sort: '', minPrice: '', maxPrice: '', minRating: '' })
            }
          >
            Clear
          </button>
        )}
      </div>
    </form>
  );
};

export default FilterBar;
