import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();
  const params = useParams();

  // Fetch product details
  useEffect(() => {
    if (params.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product?._id, data?.product?.category?._id);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch similar products
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle add to cart
  const handleAddToCart = () => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart, product];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      toast.success("Item Added to Cart successfully");
      return updatedCart;
    });
  };

  return (
    <Layout>
      <div className="container mx-auto mt-2">
        <div className="flex flex-col md:flex-row w-full bg-white shadow-lg rounded-xl overflow-hidden p-6">
          {/* Image Section */}
          <div className="w-full md:w-1/2 p-4">
            <div className="relative">
              <img
                className="w-full h-80 object-cover rounded-xl shadow-md"
                src={`${import.meta.env.VITE_API_URL}/api/v1/product/product-photo/${product._id}`}
                alt={product.name}
              />
              <div className="absolute top-2 left-2 bg-blue-500 text-white px-3 py-1 text-sm rounded-md">
                New Arrival
              </div>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="w-full md:w-1/2 p-6 space-y-4">
            <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">Product Details</h1>

            <div className="space-y-2">
              <h4 className="text-lg font-semibold text-gray-700">
                <span className="text-blue-500">Name:</span> {product.name}
              </h4>
              <h6 className="text-gray-600">
                <span className="text-blue-500">Description:</span> {product.description}
              </h6>
              <h6 className="text-gray-600">
                <span className="text-blue-500">Price:</span> ৳{product.price}
              </h6>
              <h2 className="text-lg font-medium text-gray-700">
                <span className="text-blue-500">Category:</span> {product?.category?.name}
              </h2>
            </div>

            <button
              className="w-full px-4 py-2 mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium text-lg rounded-lg shadow-md transition-transform transform hover:scale-105"
              onClick={handleAddToCart}
            >
              ADD TO CART
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold my-4">Similar Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedProducts.length > 0 ? (
              relatedProducts.map((product) => (
                <div key={product._id} className="border p-4 rounded-lg shadow-sm">
                  <img
                    src={`${import.meta.env.VITE_API_URL}/api/v1/product/product-photo/${product._id}`}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-md"
                  />
                  <h3 className="text-lg font-medium mt-2">{product.name}</h3>
                  <p className="text-gray-600">৳{product.price}</p>
                  <button
                    className="w-full mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                    onClick={() => {
                      setCart((prevCart) => {
                        const updatedCart = [...prevCart, product];
                        localStorage.setItem("cart", JSON.stringify(updatedCart));
                        toast.success("Item Added to Cart successfully");
                        return updatedCart;
                      });
                    }}
                  >
                    ADD TO CART
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No related products found.</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
