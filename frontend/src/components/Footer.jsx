import { FaGithub } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='site-footer'>
      <div className='kani-strip' aria-hidden='true'></div>
      <div className='container site-footer__inner'>
        <div>
          <div className='site-footer__brand'>Nargis</div>
          <p style={{ margin: '0.25rem 0 0' }}>
            Pashmina, saffron, walnut and paper — from the valley, by hand.
          </p>
        </div>
        <div className='site-footer__meta'>
          <p style={{ margin: 0 }}>
            A portfolio project by{' '}
            <a
              href='https://github.com/auqid'
              target='_blank'
              rel='noreferrer'
            >
              <FaGithub aria-hidden='true' /> auqid
            </a>{' '}
            ·{' '}
            <a
              href='https://github.com/auqid/azshop'
              target='_blank'
              rel='noreferrer'
            >
              source code
            </a>
          </p>
          <p style={{ margin: '0.25rem 0 0' }}>
            © {currentYear} Nargis · Srinagar, Jammu &amp; Kashmir
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
