import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const Star = ({ value, threshold }) =>
  value >= threshold ? (
    <FaStar />
  ) : value >= threshold - 0.5 ? (
    <FaStarHalfAlt />
  ) : (
    <FaRegStar />
  );

const Rating = ({ value, text }) => {
  return (
    <div className='rating' aria-label={`Rated ${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((threshold) => (
        <Star key={threshold} value={value} threshold={threshold} />
      ))}
      {text && <span className='rating__text'>{text}</span>}
    </div>
  );
};

export default Rating;
