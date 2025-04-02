import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CheckoutPage = () => {
  const cart = useSelector((state) => state.cart.items);
  const totalBill = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handlePayment = () => {
    alert("🎉 Payment Successful! Thank you for your purchase. Visit again.!");
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">🧾 Order Receipt</h2>

        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 border">Product</th>
              <th className="p-3 border">Price</th>
              <th className="p-3 border">Quantity</th>
              <th className="p-3 border">Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((e) => (
              <tr key={e.id} className="text-center">
                <td className="p-3 border">{e.title}</td>
                <td className="p-3 border">₹{e.price}</td>
                <td className="p-3 border">{e.quantity}</td>
                <td className="p-3 border font-bold">₹{e.price * e.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-xl font-bold text-gray-900 mt-6 flex justify-between">
          <span>Total Amount:</span>
          <span className="text-green-600">₹{totalBill.toFixed(2)}</span>
        </div>

        {/* Buttons Section */}
        <div className="flex justify-between mt-6">
          <Link
            to="/"
            className="w-1/2 text-center bg-gray-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-gray-600 transition"
          >
            🔙 Back to Shopping
          </Link>

          <button
            onClick={handlePayment}
            className="w-1/2 ml-4 bg-green-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
          >
            💳 Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
