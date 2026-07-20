import Rating from './Rating';

// Histogram of how many reviews gave each star count.
const RatingBreakdown = ({ reviews, rating }) => {
  if (!reviews || reviews.length === 0) return null;

  const counts = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: reviews.filter((r) => Math.round(r.rating) === stars).length,
  }));

  return (
    <div className='rating-breakdown'>
      <div className='rating-breakdown__score'>
        <span className='rating-breakdown__number'>{rating.toFixed(1)}</span>
        <Rating value={rating} />
        <span className='rating-breakdown__count'>
          {reviews.length} review{reviews.length === 1 ? '' : 's'}
        </span>
      </div>

      <ul className='rating-breakdown__bars'>
        {counts.map(({ stars, count }) => {
          const pct = Math.round((count / reviews.length) * 100);
          return (
            <li key={stars}>
              <span className='rating-breakdown__label'>{stars}★</span>
              <span className='rating-breakdown__track'>
                <span
                  className='rating-breakdown__fill'
                  style={{ width: `${pct}%` }}
                ></span>
              </span>
              <span className='rating-breakdown__pct'>{count}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RatingBreakdown;
