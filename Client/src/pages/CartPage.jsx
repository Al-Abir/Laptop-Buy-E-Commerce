import React from "react";
import Layout from "../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart] = useCart();
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-semibold bg-gray-100 p-4 rounded-md shadow-md">
            {`Hello ${auth?.token && auth?.user?.name}`}
          </h1>
          <h4 className="text-lg text-gray-700 mt-4">
            {cart?.length > 0
              ? `You have ${cart.length} item(s) in your cart ${
                  auth?.token ? "" : ", please login to checkout"
                }`
              : "Your cart is empty"}
          </h4>
        </div>
        <div className="flex flex-wrap">
  {/* Cart Items */}
  <div className="w-full md:w-2/3 p-4">
    {cart?.map((p) => (
      <div key={p._id} className="flex items-center bg-white shadow-md rounded-lg p-4 mb-4">
        {/* Product Image */}
        <div className="w-1/3">
          <img
            src={`${
                import.meta.env.VITE_API_URL
              }/api/v1/product/product-photo/${p._id}`}
            className="w-24 h-24 object-cover rounded"
            alt={p.name}
          />
        </div>
        {/* Product Details */}
        <div className="w-2/3 pl-4">
          <p className="text-lg font-semibold">{p.name}</p>
          <p className="text-gray-600 text-sm">{p.description.substring(0, 30)}...</p>
          <p className="text-gray-800 font-medium">Price: ৳{p.price}</p>
          <button className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Remove
          </button>
        </div>
      </div>
    ))}
    </div>

  {/* Checkout Section */}
  <div className="w-full md:w-1/3 p-4 bg-gray-100 shadow-md rounded-lg">
    <h2 className="text-xl font-semibold text-center mb-4">Checkout | Payment</h2>
    {/* Add checkout details or buttons here */}
  </div>
</div>

      </div>
    </Layout>
  );
};

export default CartPage;
