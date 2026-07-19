// Chinar leaf mark used in the header and footer
const BrandMark = ({ className = 'brand__mark' }) => (
  <svg viewBox='0 0 64 64' className={className} aria-hidden='true'>
    <rect width='64' height='64' rx='14' fill='var(--deodar-deep, #142b25)' />
    <g transform='translate(32 33)'>
      <path
        d='M0-21C4-14 12-16 16-10 12-8 10-8 7-9c3 4 9 4 12 10-5 2-9 0-12-2 2 4 6 5 7 11-5-1-8-4-10-8L2 14h-4l2-12c-2 4-5 7-10 8 1-6 5-7 7-11-3 2-7 4-12 2 3-6 9-6 12-10-3 1-5 1-9-1 4-6 12-4 16-11z'
        fill='#C96F1E'
      />
    </g>
  </svg>
);

export default BrandMark;
