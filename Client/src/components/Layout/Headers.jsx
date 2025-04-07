import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { GiShoppingCart } from "react-icons/gi";
import { IoMdArrowDropdown } from "react-icons/io";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import { useCart } from "../../context/cart";

const Headers = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [auth, setAuth] = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [cart, setCart] = useCart([]);
  const navigate = useNavigate();

  // Load cart items from localStorage on page refresh
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart) {
      setCart(savedCart);
    }
  }, []);

  // Update localStorage whenever the cart changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      localStorage.removeItem("cart");
    }
  }, [cart]);

  const handleLogout = () => {
    setAuth({ user: null, token: "" });
    setCart([]); // Clear the cart on logout
    localStorage.removeItem("auth");
    localStorage.removeItem("cart"); // Remove cart from localStorage
    toast.success("Logout Successfully");
    navigate("/login");
  };

  return (
    <nav className="p-4 shadow-lg border-b-2 bg-white sticky top-0 z-50">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Logo and mobile menu button */}
        <div className="w-full md:w-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <GiShoppingCart className="text-2xl text-violet-700" />
            <Link 
              to="/" 
              className="text-black text-xl font-bold uppercase tracking-wide hover:text-violet-700 transition-colors"
            >
              Laptop Gadget
            </Link>
          </div>
          
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden text-black text-2xl focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? "✖" : "☰"}
          </button>
        </div>

        {/* Search bar - takes full width on mobile, auto on desktop */}
        <div className={`w-full md:w-auto ${isOpen ? 'block' : 'hidden'} md:block`}>
          <SearchInput />
        </div>

        {/* Navigation links */}
        <div className={`${isOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row items-center gap-4 w-full md:w-auto`}>
          <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
            <NavLink 
              to="/" 
              className="text-black hover:text-violet-700 hover:underline uppercase tracking-wide transition-colors w-full md:w-auto text-center"
              onClick={() => setIsOpen(false)}
            >
              Home
            </NavLink>
            <NavLink 
              to="/cart" 
              className="text-black hover:text-violet-700 hover:underline uppercase tracking-wide transition-colors w-full md:w-auto text-center"
              onClick={() => setIsOpen(false)}
            >
              Cart ({cart?.length || 0})
            </NavLink>

            {!auth?.user ? (
              <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                <NavLink 
                  to="/login" 
                  className="text-black hover:text-violet-700 transition-colors w-full md:w-auto text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </NavLink>
                <NavLink 
                  to="/register" 
                  className="text-black hover:text-violet-700 transition-colors w-full md:w-auto text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </NavLink>
              </div>
            ) : (
              <div className="relative w-full md:w-auto text-center">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="text-black uppercase tracking-wide flex items-center justify-center gap-1 w-full md:w-auto hover:text-violet-700 transition-colors"
                >
                  {auth?.user?.name}
                  <IoMdArrowDropdown className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow-lg z-50">
                    <ul className="py-2 text-sm text-gray-700">
                      <li>
                        <NavLink
                          to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                          className="block px-4 py-2 hover:bg-gray-100"
                          onClick={() => {
                            setDropdownOpen(false);
                            setIsOpen(false);
                          }}
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            handleLogout();
                            setDropdownOpen(false);
                            setIsOpen(false);
                          }}
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
        </div>
      </div>
    </nav>
  );
};

export default Headers;