import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { GiShoppingCart } from "react-icons/gi";
import { IoMdArrowDropdown } from "react-icons/io";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import { useCart } from "../../context/cart";

const Headers = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useCart([]); // Ensure you destructure setCart from useCart
  const [auth, setAuth] = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({ user: null, token: "" });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
    navigate("/login");
  };

  // Function to add an item to the cart
  const addToCart = (product) => {
    setCart([...cart, product]); // Add the product to the cart array
    toast.success("Item Added to Cart");
  };

  return (
    <nav className="p-4 shadow-lg border-b-2 bg-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex gap-3">
          <GiShoppingCart className="text-2xl" />
          <Link to="/" className="text-black text-xl font-bold uppercase tracking-wide">
            Ecommerce App
          </Link>
        </div>

        <SearchInput />

        <div className="hidden md:flex space-x-6">
          <NavLink to="/" className="text-black hover:text-violet-700 hover:underline uppercase tracking-wide">
            Home
          </NavLink>
          <NavLink to="/cart" className="text-black hover:text-violet-700 hover:underline uppercase tracking-wide">
            Cart ({cart?.length})
          </NavLink>

          {!auth?.user ? (
            <>
              <NavLink to="/login" className="text-black hover:text-violet-700">Login</NavLink>
              <NavLink to="/register" className="text-black hover:text-violet-700">Register</NavLink>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="text-black uppercase tracking-wide flex items-center gap-1"
              >
                {auth?.user?.name}
                <IoMdArrowDropdown className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow-lg">
                  <ul className="py-2 text-sm text-gray-700">
                    <li>
                      <NavLink
                        to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-black hover:text-red-600"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-black">
          {isOpen ? "✖" : "☰"}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-blue-700 p-4 flex flex-col space-y-2 shadow-md">
          <NavLink to="/" className="text-white">Home</NavLink>
          <NavLink to="/cart" className="text-white">Cart ({cart?.length})</NavLink>
          {!auth?.user ? (
            <>
              <NavLink to="/login" className="text-white">Login</NavLink>
              <NavLink to="/register" className="text-white">Register</NavLink>
            </>
          ) : (
            <>
              <NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} className="text-white">
                Dashboard
              </NavLink>
              <button onClick={handleLogout} className="text-white">Logout</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Headers;
