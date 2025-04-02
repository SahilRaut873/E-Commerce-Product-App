import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { removeFromCart, updateQuantity } from "../redux/cartSlice";

const CartPage = () => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigation

  // Calculate total price
  const totalBill = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gray-100 min-h-screen flex flex-col lg:flex-row gap-8">
      {/* Left Side - Cart Items */}
      <div className="bg-white p-6 shadow-lg rounded-lg flex-1">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">🛒 Your Shopping Cart</h2>

        {cart.length === 0 ? (
          <p className="text-gray-500 text-lg text-center">Your cart is empty. Start adding products!</p>
        ) : (
          <div className="space-y-6">
            {cart.map((e) => (
              <div key={e.id} className="flex justify-between items-center border-b pb-4 last:border-none">
                {/* Product Image & Details */}
                <div className="flex items-center gap-5 w-1/2">
                  <img src={e.thumbnail} alt={e.title} className="w-24 h-24 object-cover rounded-lg shadow-md" />
                  <div>
                    <p className="text-lg font-semibold text-gray-800">{e.title}</p>
                    <p className="text-gray-600">
                      ₹{e.price} x {e.quantity} ={" "}
                      <span className="font-bold text-green-600">₹{e.price * e.quantity}</span>
                    </p>
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-4 border p-2 rounded-lg bg-gray-50 shadow">
                  <button
                    onClick={() => dispatch(updateQuantity({ id: e.id, quantity: e.quantity - 1 }))}
                    className="bg-gray-200 px-4 py-2 rounded-full text-lg font-bold hover:bg-gray-300 transition"
                    disabled={e.quantity === 1}
                  >
                    ➖
                  </button>
                  <span className="px-4 text-lg font-semibold">{e.quantity}</span>
                  <button
                    onClick={() => dispatch(updateQuantity({ id: e.id, quantity: e.quantity + 1 }))}
                    className="bg-gray-200 px-4 py-2 rounded-full text-lg font-bold hover:bg-gray-300 transition"
                  >
                    ➕
                  </button>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => dispatch(removeFromCart(e.id))}
                  className="text-red-600 font-semibold hover:text-red-800 transition"
                >
                  ❌ Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Side - Total Price & Checkout */}
      {cart.length > 0 && (
        <div className="bg-white p-6 shadow-lg rounded-lg w-full lg:w-1/3 h-fit">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Order Summary</h3>

          <div className="border-b pb-4">
            <div className="flex justify-between text-lg font-medium text-gray-800">
              <span>Subtotal:</span>
              <span>₹{totalBill.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-medium text-gray-800 mt-2">
              <span>Delivery Fee:</span>
              <span className="text-green-600">FREE</span>
            </div>
          </div>

          <div className="flex justify-between text-xl font-bold text-gray-900 mt-4">
            <span>Total:</span>
            <span className="text-green-600">₹{totalBill.toFixed(2)}</span>
          </div>

          <button
            onClick={() => navigate("/checkout")} // Navigate to checkout page
            className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition-all transform hover:scale-105"
          >
            🛍️ Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
