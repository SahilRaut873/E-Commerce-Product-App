import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductListing from "./pages/ProductListing";
import ProductDetails from "./pages/ProductDetails";

import { ToastContainer } from "react-toastify";
import FilterSidebar from "./components/FilterSidebar";
import Navbar from "./components/Navbar";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";

const App = () => {
  return (
    <Router>
      <ToastContainer autoClose={2000} /> {/* Auto close after 2 seconds */}
      <Navbar/>
      <div className="flex">
        <FilterSidebar />
        <div className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<ProductListing />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
