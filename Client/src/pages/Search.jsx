import React from 'react';
import Layout from '../components/Layout/Layout';
import { useSearch } from '../context/search';
import { useCart } from '../context/cart';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Search = () => {
  const [values] = useSearch();
  const [cart, setCart] = useCart();
  const navigate = useNavigate(); // useNavigate hook for navigation

  const handleAddToCart = (product) => {
    // Add the product to the cart
    setCart((prevCart) => {
      const updatedCart = [...prevCart, product];
      localStorage.setItem('cart', JSON.stringify(updatedCart)); // Store in localStorage
      toast.success("Item added to cart!");
      return updatedCart;
    });
  };

  const handleMoreDetails = (slug) => {
    // Navigate to the product details page
    navigate(`/product/${slug}`);
  };

  return (
    <Layout title={'Search results'}>
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold my-4">Search Results</h1>
          <h2 className="text-xl mb-6">
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length} Products`}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5">
            {values?.results.length > 0 ? (
              values.results.map((p) => (
                <div
                  key={p._id}
                  className="max-w-sm rounded overflow-hidden shadow-lg border p-4 bg-white hover:shadow-xl transition"
                >
                  <img
                    className="w-full h-48 object-cover"
                    src={`${
                      import.meta.env.VITE_API_URL
                    }/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                  />
                  <div className="px-4 py-2">
                    <h2 className="font-bold text-lg">{p.name}</h2>
                    <h2 className="font-bold text-lg">৳ {p.price}</h2>
                    <p className="text-gray-700 text-sm">
                      {p.description.substring(0, 30)}...
                    </p>
                  </div>
                  <div className="flex gap-4 mt-4">
                    {/* More Details button */}
                    <button
                      className="px-4 py-2 border bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                      onClick={() => handleMoreDetails(p.slug)} // Navigate to product details
                    >
                      More Details
                    </button>
                    <button
                      className="px-4 py-2 border bg-slate-500 text-white rounded-lg hover:bg-slate-600 transition"
                      onClick={() => handleAddToCart(p)} // Add to cart functionality
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center col-span-full text-gray-600">
                No products available.
              </p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
