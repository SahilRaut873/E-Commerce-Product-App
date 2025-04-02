import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productSlice";
import ProductCard from "../components/ProductCard";

const ProductListing = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.products);
  const { search, category, brand, rating, price, sort } = useSelector((state) => state.filters);

  const [page, setPage] = useState(1);
  const productsPerPage = 5;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Reset pagination to page 1 when search query or filters change
  useEffect(() => {
    setPage(1);
  }, [search, category, brand, rating, price, sort]);

  // Filtering logic
  const filteredProducts = items
    .filter(p => p.title.toLowerCase().includes(search.toLowerCase())) // Search filter
    .filter(p => (category ? p.category === category : true)) // Category filter
    .filter(p => (brand ? p.brand.toLowerCase().includes(brand.toLowerCase()) : true)) // Brand filter
    .filter(p => (rating > 0 ? p.rating >= rating : true)) // Rating filter
    .filter(p => p.price >= price.min && p.price <= price.max); // Price range filter

  // Sorting logic
  const sortedProducts = [...filteredProducts];

if (sort === "price-low") {
  sortedProducts.sort((a, b) => a.price - b.price);
} else if (sort === "price-high") {
  sortedProducts.sort((a, b) => b.price - a.price);
} else if (sort === "rating-high") {
  sortedProducts.sort((a, b) => b.rating - a.rating);
} else if (sort === "rating-low") {
  sortedProducts.sort((a, b) => a.rating - b.rating);
}


  // Pagination logic
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const currentProducts = sortedProducts.slice((page - 1) * productsPerPage, page * productsPerPage);

  return (
    <div className="p-4">
      {status === "loading" ? (
        <p className="text-center text-lg">Loading...</p>
      ) : (
        <>
          {/* Product List */}
          <div className="grid grid-cols-1 gap-4">
            {currentProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="mt-4 flex justify-center gap-2">
            <button
              onClick={() => setPage(p => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span className="px-4 py-2 bg-gray-200 rounded">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage(p => (p < totalPages ? p + 1 : p))}
              disabled={page === totalPages}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductListing;
