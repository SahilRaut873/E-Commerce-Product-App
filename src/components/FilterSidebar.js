import { useDispatch, useSelector } from "react-redux";
import { 
  setSearch, setCategory, setBrand, setRating, setPrice, setSort, 
  removeFilter, clearFilters 
} from "../redux/filterSlice";

const FilterSidebar = () => {
  const dispatch = useDispatch();
  const { search, category, brand, rating, price, sort, filters } = useSelector((state) => state.filters);

  const hasFilters = search || category || brand || rating > 0 || price.max < 10000 || sort || filters.length > 0;

  return (
    <div className="w-72 p-4 bg-gray-100 shadow-lg rounded-lg">
      <h2 className="text-lg font-semibold mb-3">Filters</h2>

      {/* Selected Filters Display */}
      {hasFilters && (
        <div className="p-3 bg-white rounded shadow-sm border">
          <h3 className="font-medium mb-2">Selected Filters</h3>
          <div className="flex flex-wrap gap-2">
            {category && <FilterTag label={category} onRemove={() => dispatch(setCategory(""))} />}
            {rating > 0 && <FilterTag label={`${rating}★ & above`} onRemove={() => dispatch(setRating(0))} />}
            {(price.min > 0 || price.max < 10000) && <FilterTag label={`₹${price.min} - ₹${price.max}`} onRemove={() => dispatch(setPrice({ min: 0, max: 10000 }))} />}
            {sort && <FilterTag label={sort.replace("-", " ")} onRemove={() => dispatch(setSort(""))} />}
            {filters.map((filter, index) => <FilterTag key={index} label={filter} onRemove={() => dispatch(removeFilter(filter))} />)}
          </div>
          <button 
            onClick={() => dispatch(clearFilters())} 
            className="mt-3 px-4 py-2 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600 transition"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Category Filter */}
      <div className="mt-4">
        <h3 className="font-medium mb-1">Category</h3>
        <select
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={category}
          onChange={(e) => dispatch(setCategory(e.target.value))}
        >
          <option value="">All</option>
          <option value="beauty">Beauty</option>
          <option value="furniture">Furniture</option>
          <option value="fragrances">Fragrances</option>
          <option value="groceries">Groceries</option>
        </select>
      </div>

      {/* Rating Filter */}
      <div className="mt-4">
        <h3 className="font-medium mb-1">Rating</h3>
        <select
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={rating}
          onChange={(e) => dispatch(setRating(Number(e.target.value)))}
        >
          <option value="0">All</option>
          <option value="4">4★ & above</option>
          <option value="3">3★ & above</option>
        </select>
      </div>

      {/* Price Filter */}
      <div className="mt-4">
        <h3 className="font-medium mb-1">Price Range</h3>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="0"
            max="10000"
            value={price.min}
            className="w-full p-2 border rounded focus:outline-none"
            onChange={(e) => dispatch(setPrice({ ...price, min: Number(e.target.value) }))}
          />
          <span>-</span>
          <input
            type="number"
            min="0"
            max="10000"
            value={price.max}
            className="w-full p-2 border rounded focus:outline-none"
            onChange={(e) => dispatch(setPrice({ ...price, max: Number(e.target.value) }))}
          />
        </div>
        <input
          type="range"
          min="0"
          max="10000"
          value={price.max}
          className="w-full mt-2"
          onChange={(e) => dispatch(setPrice({ ...price, max: Number(e.target.value) }))}
        />
        <p>Up to ₹{price.max}</p>
      </div>

      {/* Sort Filter */}
      <div className="mt-4">
        <h3 className="font-medium mb-1">Sort By</h3>
        <select
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={sort}
          onChange={(e) => dispatch(setSort(e.target.value))}
        >
          <option value="">None</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating-high">Rating: High to Low</option>
          <option value="rating-low">Rating: Low to High</option>
        </select>
      </div>
    </div>
  );
};

// Component for Individual Selected Filters
const FilterTag = ({ label, onRemove }) => (
  <span className="bg-gray-300 px-2 py-1 rounded flex items-center">
    {label} <button onClick={onRemove} className="ml-2 text-red-500">✖</button>
  </span>
);

export default FilterSidebar;
