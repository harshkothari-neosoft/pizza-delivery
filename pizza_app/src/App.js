import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Menu from './components/Menu';
import Registration from './components/Registration';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderPlaced from './components/OrderPlaced';
import Profile from './components/Profile';

function App() {
  return (
    <div>
        <Router>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/registration" element={<Registration/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/menu" element={<Menu/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/checkout" element={<Checkout/>}/>
            <Route path="/orderplaced" element={<OrderPlaced/>}/>
            <Route path="*" element={<img width="100%" height="657px" src="./images/notfound.gif" alt="not found"/>}/>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
