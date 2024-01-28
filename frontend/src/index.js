import React from 'react';
import ReactDOM from 'react-dom/client';
import {
createBrowserRouter,
createRoutesFromElements,
Route,
RouterProvider
} from 'react-router-dom'
//import 'bootstrap/dist/css/bootstrap.min.css' //default bootstrap file
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import {Provider} from 'react-redux';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/shippingScreen';
import PrivateRoute from './components/PrivateRoute';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import store from './store';


const router = createBrowserRouter( //create a browser router instance
  createRoutesFromElements( //create routes from React elements createRoutesFromElements is a helper that creates route objects from <Route> elements. It's useful if you prefer to create your routes as JSX instead of objects.
    <Route path='/' element={<App  />}> {/*main route of application*/}
      <Route index={true} path='/' element={<HomeScreen/>} /> {/*Nested Route which is default/indexed route*/}
      <Route  path='/product/:id' element={<ProductScreen/>} /> {/*id placeholder for path*/}
      <Route path='/cart' element={<CartScreen/>}/>
      <Route path='/login' element={<LoginScreen/>}/>
      <Route path='/register' element={<RegisterScreen/>}/>
     

      <Route path='' element={<PrivateRoute/>}>
      <Route path='/shipping' element={<ShippingScreen/>}/>
      <Route path='/payment' element={<PaymentScreen/>}/>
      <Route path='/placeorder' element={<PlaceOrderScreen/>}/>
      </Route>

    </Route>
  )
)
const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
    
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
