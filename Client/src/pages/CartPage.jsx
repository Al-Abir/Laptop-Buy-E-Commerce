import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import axios from "axios";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [checkoutData, setCheckoutData] = useState({
    name: auth?.user?.name || "",
    address: auth?.user?.address || "",
    phone: "",
  });

  const totalPrice = () => {
    try {
      const total = cart && cart.length > 0 ? cart.reduce((sum, item) => sum + item.price, 0) : 0;
      return total.toLocaleString("bn-BD", {
        style: "currency",
        currency: "BDT",
      });
    } catch (error) {
      console.log(error);
      return "৳0";
    }
  };

  const removeItem = (pid) => {
    try {
      setCart((prevCart) => {
        const updatedCart = prevCart.filter((item) => item._id !== pid);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart;
      });
    } catch (error) {
      console.log(error);
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!auth?.token) {
      navigate("/login", { state: "/cart" });
      return;
    }
  
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/payment/init`,
        {
          name: checkoutData.name,
          address: checkoutData.address,
          phone: checkoutData.phone,
          amount: cart.reduce((sum, item) => sum + item.price, 0),
          cart,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
  
      if (data?.redirectUrl) {
        window.location.href = data.redirectUrl;
      }
    } catch (error) {
      console.error("Payment initiation error:", error);
    }
  };
  

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
                <div className="w-1/3">
                  <img
                    src={`${import.meta.env.VITE_API_URL}/api/v1/product/product-photo/${p._id}`}
                    className="w-24 h-24 object-cover rounded"
                    alt={p.name}
                  />
                </div>
                <div className="w-2/3 pl-4">
                  <p className="text-lg font-semibold">{p.name}</p>
                  <p className="text-gray-600 text-sm">{p.description.substring(0, 30)}...</p>
                  <p className="text-gray-800 font-medium">Price: ৳{p.price}</p>
                  <button
                    className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={() => removeItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Section */}
          <div className="w-full md:w-1/3 p-4 bg-gray-100 shadow-md rounded-lg text-center">
            <h2 className="text-xl font-semibold">Cart Summary</h2>
            <hr className="my-2" />
            <h4>Total: {totalPrice()}</h4>

            {auth?.token ? (
              <form onSubmit={handleSubmit} className="mt-4">
                <input
                  type="text"
                  className="w-full p-2 border rounded mb-2"
                  placeholder="Name"
                  value={checkoutData.name}
                  onChange={(e) => setCheckoutData({ ...checkoutData, name: e.target.value })}
                  required
                />
                <input
                  type="text"
                  className="w-full p-2 border rounded mb-2"
                  placeholder="Address"
                  value={checkoutData.address}
                  onChange={(e) => setCheckoutData({ ...checkoutData, address: e.target.value })}
                  required
                />
                <input
                  type="text"
                  className="w-full p-2 border rounded mb-2"
                  placeholder="Phone"
                  value={checkoutData.phone}
                  onChange={(e) => setCheckoutData({ ...checkoutData, phone: e.target.value })}
                  required
                />
                <button type="submit" className="w-full px-4 py-2 bg-green-500 text-white rounded-lg mt-4">
                  Place Order
                </button>
              </form>
            ) : (
              <button
                className="px-4 py-2 bg-blue-400 text-white rounded-lg mt-4"
                onClick={() => navigate("/login", { state: "/cart" })}
              >
                Please login to Checkout
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
