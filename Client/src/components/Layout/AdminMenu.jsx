import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div className="text-center containr mx-auto p-4">
      <ul className="divide-y divide-gray-200 border border-gray-200 rounded-lg w-full max-w-md mx-auto">
        <h4 className="p-3 text-lg font-semibold bg-gray-100">Admin Panel</h4>
        <li>
          <NavLink
            to="/dashboard/admin/create-category"
            className="block p-3 hover:bg-gray-100 transition"
          >
            Create Category
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/admin/create-product"
            className="block p-3 hover:bg-gray-100 transition"
          >
            Create Product
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/admin/products"
            className="block p-3 hover:bg-gray-100 transition"
          >
            Products
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/admin/orders"
            className="block p-3 hover:bg-gray-100 transition"
          >
            Orders
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/admin/users"
            className="block p-3 hover:bg-gray-100 transition"
          >
            Users
          </NavLink>
        </li>

        
      </ul>
    </div>
  );
};

export default AdminMenu;
