import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { useAuth } from '../context/auth';
import axios from 'axios';

const HomePage = () => {
  const [auth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // Get products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/product/get-product`,
      );
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto mt-5 flex flex-col md:flex-row">
        {/* Sidebar: Category Filter */}
        <div className="md:w-1/4 w-full p-4 border-r">
          <h2 className="text-center font-semibold text-lg">Filter by Category</h2>
        </div>

        {/* Main Content: Products */}
        <div className="md:w-3/4 w-full p-4">
          <h1 className="text-start text-xl font-bold">All Products</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-5">
            {products.length > 0 ? (
              products.map((p) => (
                <div
                  key={p._id}
                  className="max-w-sm rounded overflow-hidden shadow-lg border p-4 bg-white hover:shadow-xl transition"
                >
                  <img
                    className="w-full h-48 object-cover"
                    src={`${import.meta.env.VITE_API_URL}/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                  />
                  <div className="px-4 py-2">
                    <h2 className="font-bold text-lg">{p.name}</h2>
                    <p className="text-gray-700 text-sm">{p.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center col-span-full">No products available.</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
