import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/FilterSidebar";

const Home = () => {
  const products = useSelector((state) => state.products.data);
  return (
    <div className="flex">
      <FilterSidebar />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;