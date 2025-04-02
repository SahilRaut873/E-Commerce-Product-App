import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ShoppingCart, Search } from "@mui/icons-material"; // Material-UI Icons
import { setSearch } from "../redux/filterSlice"; // Import Redux action

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items || []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    dispatch(setSearch(query));
  };

  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center text-white shadow-md">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold">ShopMart</Link>

      {/* Search Bar */}
      <div className="flex items-center bg-white px-3 py-2 rounded-md">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearch}
          className="p-2 rounded-md text-black outline-none w-64"
        />
        <Search fontSize="medium" className="text-blue-600" />
      </div>

      {/* Cart Icon with Badge */}
      <Link to="/cart" className="relative flex items-center">
        <ShoppingCart fontSize="large" />
        {cartItems.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {cartItems.length}
          </span>
        )}
      </Link>
    </nav>
  );
};

export default Navbar;
