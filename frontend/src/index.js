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


const router = createBrowserRouter( //create a browser router instance
  createRoutesFromElements( //create routes from React elements
    <Route path='/' element={<App/>}> {/*main route of application*/}
      <Route index={true} path='/' element={<HomeScreen/>} /> {/*Nested Route which is default/indexed route*/}
      <Route  path='/product/:id' element={<ProductScreen/>} /> {/*id placeholder for path*/}

    </Route>
  )
)
const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
