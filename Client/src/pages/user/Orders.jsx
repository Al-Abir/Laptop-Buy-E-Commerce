import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
import moment from "moment";

const Orders = () => {
  const [order, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/orders`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${auth?.token}`,
          },
        }
      );
      if (data?.success) {
        setOrders(data.orders);
      } else {
        console.error("Error fetching orders:", data.message);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="flex gap-4">
          {/* Sidebar */}
          <div className="w-1/4 mt-3 p-4">
            <UserMenu />
          </div>

          {/* Orders Section */}
          <div className="w-3/4 mt-3">
            <h2 className="text-xl font-semibold mb-4">All Orders</h2>

            {order?.map((o, i) => (
              <div
                className="border rounded-lg shadow-sm p-4 my-4 bg-white"
                key={o._id}
              >
                {/* Order Table */}
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100 text-gray-700">
                      <th className="py-2 px-4 text-left">#</th>
                      <th className="py-2 px-4 text-left">Status</th>
                      <th className="py-2 px-4 text-left">Buyer</th>
                      <th className="py-2 px-4 text-left">Date</th>
                      <th className="py-2 px-4 text-left">Paid Status</th>
                      <th className="py-2 px-4 text-left">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="py-2 px-4">{i + 1}</td>
                      <td className="py-2 px-4">{o?.status}</td>
                      <td className="py-2 px-4">{o?.buyer?.name}</td>
                      <td className="py-2 px-4">
                        {moment(o?.createdAt).fromNow()}
                      </td>
                      <td
                        className={`py-2 px-4 font-semibold ${
                          o?.paidStatus ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {o?.paidStatus ? "Success" : "Failed"}
                      </td>
                      <td className="py-2 px-4">{o?.products?.length || 0}</td>
                    </tr>
                  </tbody>
                </table>

                {/* Product List (inside the order loop) */}
              
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
