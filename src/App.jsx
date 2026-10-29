import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import Login from "./components/Login";
import Register from "./components/Register";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import About from "./components/About";
import Contact from "./components/Contact";
import Catering from "./components/Catering";
import { CartProvider } from "./context/CartContext";
import "./index.css";

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Products />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/catering" element={<Catering />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </CartProvider>
    </Router>
  );
}

export default App;
