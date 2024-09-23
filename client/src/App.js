
import './App.css';
import Header from './components/header';
import Products from './components/productsPage/products';
import ProductDetail from './components/productDetail/productDetail';
import Cart from './components/cartPage/cart';
import SignUp from './components/login-signup/signUp';
import Login from './components/login-signup/login';
import CreateOrder from './components/createOrder.js/createOrder';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';




function App() {
  return (
    <div className='app'>

      <Router>
        <Header className="Header" />
        <Routes>
          <Route path="/createOrder" element={<CreateOrder />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="/" element={<Login />} />
          <Route path="/Products" element={<Products />} />
          <Route path='/ProductDetail/:productId' element={<ProductDetail />} />
          <Route path="/Cart" element={<Cart />} />
        </Routes>
      </Router>


    </div>
  );
}

export default App;
