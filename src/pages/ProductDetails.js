import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../redux/cartSlice";
import { fetchProducts } from "../redux/productSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products.items);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (allProducts.length === 0) {
      dispatch(fetchProducts());
      console.log("Calll api")
    }
  }, [dispatch, allProducts.length]);

  useEffect(() => {
    const existingProduct = allProducts.find((p) => p.id === Number(id));
    if (existingProduct) {
      setProduct(existingProduct);
      console.log("Not call api")
    }
  }, [id, allProducts]);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
     toast.success("Addesd Successsfully...!");
  };

  if (!product) return <p className="text-center text-lg font-semibold">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{product.title}</h2>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-80 object-cover rounded-lg shadow"
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-3">
          <p className="text-gray-700 text-lg">Category: <span className="font-semibold capitalize">{product.category}</span></p>
          <p className="text-gray-700 text-lg">Brand: <span className="font-semibold">{product.brand}</span></p>
          <p className="text-gray-700 text-lg">Price: <span className="text-xl font-bold text-green-600">₹{product.price}</span></p>
          <p className="text-red-500 text-lg">Discount: {product.discountPercentage}%</p>
          <p className="text-yellow-500 font-semibold text-lg">Rating: {product.rating} ★</p>
          <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>

          <div className="mt-4 flex gap-4">
            <button 
              onClick={handleAddToCart}
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Customer Reviews</h3>
        {product.reviews?.length > 0 ? (
          <div className="space-y-4">
            {product.reviews.map((review, index) => (
              <div key={index} className="p-4 bg-gray-100 rounded-md shadow">
                <p className="text-gray-800 font-semibold">{review.reviewerName}</p>
                <p className="text-yellow-500 font-semibold">{review.rating} ★</p>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
