import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/product/get-product`,
        {
          headers: {
            Authorization: `${JSON.parse(localStorage.getItem("auth")).token}`,
          },
        }
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="flex gap-5">
          {/* Sidebar */}
          <div className="w-1/4">
            <AdminMenu />
          </div>

          {/* Product List */}
          <div className="w-3/4">
            <h1 className="text-center text-4xl mb-6">All Product List</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {products?.map((p) => (
                <Link key={p._id} to={`/dashboard/admin/update-product/${p.slug}`}>
                <div className="max-w-sm rounded overflow-hidden shadow-lg border p-4 bg-white hover:shadow-xl transition">
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
              </Link>
              
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
