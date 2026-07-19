const Loader = ({ small = false }) => (
  <div
    className={small ? 'loader loader--inline' : 'loader'}
    role='status'
    aria-label='Loading'
  ></div>
);

export default Loader;
