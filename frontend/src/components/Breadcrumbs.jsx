import { Link } from 'react-router-dom';

// trail: [{ label, to }] — the last entry renders as plain text (current page)
const Breadcrumbs = ({ trail }) => (
  <nav className='breadcrumbs' aria-label='Breadcrumb'>
    <ol>
      {trail.map((crumb, i) => {
        const isLast = i === trail.length - 1;
        return (
          <li key={crumb.label}>
            {isLast || !crumb.to ? (
              <span aria-current={isLast ? 'page' : undefined}>
                {crumb.label}
              </span>
            ) : (
              <Link to={crumb.to}>{crumb.label}</Link>
            )}
          </li>
        );
      })}
    </ol>
  </nav>
);

export default Breadcrumbs;
