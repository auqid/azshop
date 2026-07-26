import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetTopProductsQuery } from '../slices/productsApiSlice';
import { formatINR } from '../utils/formatters';

const ROTATE_MS = 5000;

const Hero = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!products || products.length < 2) return;
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % products.length),
      ROTATE_MS
    );
    return () => clearInterval(timer);
  }, [products]);

  const featured = products && products.length > 0 ? products[index] : null;

  return (
    <section className='hero'>
      <div className='container hero__inner'>
        <div>
          <p className='eyebrow'>Handmade in the Kashmir Valley</p>
          <h1 className='hero__title'>
            From the valley, <em>by hand.</em>
          </h1>
          <p className='hero__copy'>
            Pashmina from Kanihama looms, saffron from the Pampore karewas,
            walnut wood from Anantnag workshops. Every piece is made by a named
            craft house and shipped across India.
          </p>
          <div className='hero__actions'>
            <a href='#crafts' className='btn'>
              Shop the crafts
            </a>
            <Link to='/search/pashmina' className='btn btn--ghost-light'>
              Explore pashmina
            </Link>
          </div>
        </div>

        {!isLoading && !error && featured && (
          <div className='featured'>
            <span className='featured__label'>Loved by customers</span>
            <Link
              key={featured._id}
              to={`/product/${featured._id}`}
              className='featured__slide featured__slide-enter'
            >
              <div className='featured__image-wrap'>
                <img src={featured.image} alt={featured.name} />
              </div>
              <div className='featured__meta'>
                <span className='featured__name'>{featured.name}</span>
                <span className='featured__price'>
                  {formatINR(featured.price)}
                </span>
              </div>
            </Link>
            {products.length > 1 && (
              <div className='featured__dots'>
                {products.map((p, i) => (
                  <button
                    key={p._id}
                    type='button'
                    className={
                      i === index ? 'featured__dot is-active' : 'featured__dot'
                    }
                    aria-label={`Show ${p.name}`}
                    onClick={() => setIndex(i)}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <div className='kani-strip' aria-hidden='true'></div>
    </section>
  );
};

export default Hero;
