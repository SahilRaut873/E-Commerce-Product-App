import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success("Added Successfully...!");
  };

  return (
    <div className="border shadow-lg rounded-lg bg-white p-6 w-full flex flex-col md:flex-row items-center gap-6">
      {/* Product Image */}
      <div className="w-40 h-40 flex-shrink-0">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-grow text-center md:text-left">
        <h3 className="text-xl font-semibold text-gray-900">{product.title}</h3>
        <p className="text-gray-500 text-sm capitalize mt-1">{product.category}</p>
        <p className="text-gray-700 font-medium text-lg mt-1">₹{product.price}</p>
        <p className="text-red-500 text-sm font-medium mt-1">
          Discount: {product.discountPercentage}%
        </p>
        <p className="text-yellow-500 font-semibold mt-1">{product.rating} ★</p>
      </div>

      {/* Buttons - Displayed Below on Small Screens & Right on Large Screens */}
      <div className="flex flex-col items-center md:items-end gap-2">
        <button
          onClick={() => navigate(`/product/${product.id}`)}
          className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 w-36"
        >
          View
        </button>
        <button
          onClick={handleAddToCart}
          className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 w-36"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
