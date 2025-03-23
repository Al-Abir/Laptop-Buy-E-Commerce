import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <div className="text-center">
      <ul className="divide-y divide-gray-200 border border-gray-200 rounded-lg w-full max-w-md mx-auto">
        <h4 className="p-3 text-lg font-semibold bg-gray-100">User Panel</h4>
        <li>
          <NavLink
            to="/dashboard/user/profile"
            className="block p-3 hover:bg-gray-100 transition"
          >
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/user/orders"
            className="block p-3 hover:bg-gray-100 transition"
          >
            Orders
          </NavLink>
        </li>
        
      </ul>
    </div>
  );
};

export default UserMenu;
