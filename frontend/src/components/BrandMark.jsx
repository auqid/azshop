// Chinar leaf mark used in the header and footer — upright, stem down.
const CHINAR_LEAF =
  'M0 -33 Q5 -20 12 -13 Q19 -19 25 -16 Q19 -6 17 -1 Q25 0 31 6 Q20 9 12 12 ' +
  'L5 16 L3 30 L-3 30 L-5 16 L-12 12 Q-20 9 -31 6 Q-25 0 -17 -1 Q-19 -6 -25 -16 ' +
  'Q-19 -19 -12 -13 Q-5 -20 0 -33 Z';

const BrandMark = ({ className = 'brand__mark' }) => (
  <svg viewBox='0 0 64 64' className={className} aria-hidden='true'>
    <rect width='64' height='64' rx='14' fill='var(--deodar-deep, #142b25)' />
    <g transform='translate(32 32) scale(0.65)'>
      <path d={CHINAR_LEAF} fill='#C96F1E' />
    </g>
  </svg>
);

export default BrandMark;
