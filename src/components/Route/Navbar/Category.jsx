import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { serverTwo } from "../../../server";
import ProductCard from "../ProductCard/ProductCard";

const Category = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [childCategories, setChildCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Fetch child categories
    axios
      .get(`${serverTwo}/category/${categoryId}/children`)
      .then((res) => {
        setChildCategories(res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching child categories:", err);
        setChildCategories([]); // Ensure it's an empty array on error
      });

    // Fetch category products
    axios
      .get(`${serverTwo}/category/products/${categoryId}`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          setError("No products found for this category.");
        } else {
          setError("An error occurred while fetching products.");
        }
        setProducts([]); // Ensure it's an empty array on error
      })
      .finally(() => {
        setLoading(false);
      });
  }, [categoryId]);

  return (
    // <div className="p-4">
    //   <h2 className="text-xl font-bold mb-4">Categories</h2>
    //   <div className="flex gap-3 overflow-x-auto">
    //     {childCategories.map((cat) => (
    //       <div
    //         key={cat._id}
    //         className="cursor-pointer flex flex-col items-center"
    //         onClick={() => navigate(`/category/${cat._id}`)}
    //       >
    //         <img src={cat.image?.url} alt={cat.name} className="bg-gradient-to-b w-16 h-16 from-[#e0f7ff] to-white rounded-md flex items-center justify-center  " />
    //         <p className="text-gray-500 text-xs">{cat.name}</p>
    //       </div>
    //     ))}
    //   </div>

    //   <h2 className="text-xl font-bold mt-6 mb-4">Products</h2>

    //   {loading ? (
    //     <p className="text-center text-gray-500">Loading...</p>
    //   ) : error ? (
    //     <p className="text-center text-red-500">{error}</p>
    //   ) : (
    //     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    //       {products.length > 0 ? (
    //         products.map((product) => <ProductCard key={product._id} data={product} />)
    //       ) : (
    //         <p className="text-gray-500 text-center col-span-4">No products available.</p>
    //       )}
    //     </div>
    //   )}
    // </div>


    <div className="p-4">
      {/* Categories Header */}
      <h2 className="text-xl font-bold mb-4">Shop by Category</h2>

      {/* Category List */}
      <div className="flex gap-4 overflow-x-auto scrollbar-hide py-2 px-1">
        {childCategories.map((cat) => (
          <div
            key={cat._id}
            className="cursor-pointer flex flex-col items-center transition-all duration-300 hover:scale-105 active:scale-95"
            onClick={() => navigate(`/category/${cat._id}`)}
          >
            <div className="w-20 h-20 rounded-full shadow-lg bg-gradient-to-b from-[#e0f7ff] to-white flex items-center justify-center p-2 border border-gray-200">
              <img src={cat.image?.url} alt={cat.name} className="w-12 h-12 object-contain mix-blend-multiply" />
            </div>
            <p className="text-gray-600 text-sm font-medium mt-2">{cat.name}</p>
          </div>
        ))}
      </div>

      {/* Products Section */}
      <h2 className="text-xl font-bold mt-6 mb-4">Featured Products</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.length > 0 ? (
            products.map((product) => <ProductCard key={product._id} data={product} />)
          ) : (
            <p className="text-gray-500 text-center col-span-4">No products available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Category;
