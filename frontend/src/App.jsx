import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

const App = () => {
  return (
    <div className='app-shell'>
      <ScrollToTop />
      <a href='#main-content' className='skip-link'>
        Skip to content
      </a>
      <Header />
      <main className='site-main' id='main-content' tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <ToastContainer position='bottom-right' theme='colored' />
    </div>
  );
};

export default App;
