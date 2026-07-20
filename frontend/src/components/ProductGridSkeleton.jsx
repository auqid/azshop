// Placeholder cards shown while the first page of products loads. Matching the
// real card's shape keeps the layout from jumping when data arrives.
const ProductGridSkeleton = ({ count = 8 }) => (
  <div className='product-grid' aria-hidden='true'>
    {Array.from({ length: count }, (_, i) => (
      <article key={i} className='product-card skeleton-card'>
        <div className='skeleton skeleton__media'></div>
        <div className='product-card__body'>
          <div className='skeleton skeleton__line skeleton__line--short'></div>
          <div className='skeleton skeleton__line'></div>
          <div className='skeleton skeleton__line skeleton__line--mid'></div>
          <div className='skeleton skeleton__line skeleton__line--short'></div>
        </div>
      </article>
    ))}
  </div>
);

export default ProductGridSkeleton;
