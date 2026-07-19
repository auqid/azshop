import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className='app-shell'>
      <Header />
      <main className='site-main'>
        <Outlet />
      </main>
      <Footer />
      <ToastContainer position='bottom-right' theme='colored' />
    </div>
  );
};

export default App;
