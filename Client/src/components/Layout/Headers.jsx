import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "@fontsource/poppins";
import { GiShoppingCart } from "react-icons/gi";
import { IoMdArrowDropdown } from "react-icons/io";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";

const Headers = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartValue, setCartValue] = useState(0);
  const [auth, setAuth] = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const links = ["Home", "Category", "Cart"];

  const handleLogout = () => {
    setAuth({ user: null, token: "" });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
    navigate("/login");
  };

  return (
    <nav className="p-4 shadow-lg border-b-2 bg-white">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo / Title */}
        <div className="flex gap-3">
          <GiShoppingCart className="text-2xl" />
          <h1 className="text-black text-xl font-bold font-[Poppins] uppercase tracking-wide">
            Ecommerce App
          </h1>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-6">
          {links.map((item) => (
            <NavLink
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="text-black hover:text-violet-700 hover:underline font-[Poppins] uppercase tracking-wide leading-[26px] cursor-pointer"
            >
              {item === "Cart" ? <span>Cart ({cartValue})</span> : item}
            </NavLink>
          ))}

          {!auth.user ? (
            <>
              <NavLink
                to="/login"
                className="text-black hover:text-violet-700 hover:underline font-[Poppins] uppercase tracking-wide leading-[26px] cursor-pointer"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="text-black hover:text-violet-700 hover:underline font-[Poppins] uppercase tracking-wide leading-[26px] cursor-pointer"
              >
                Register
              </NavLink>
            </>
          ) : (
            <div className="relative">
              {/* User Profile Button */}
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="text-black font-[Poppins] uppercase tracking-wide leading-[26px] cursor-pointer flex items-center gap-1"
              >
                {auth?.user?.name}
                <IoMdArrowDropdown  className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow-lg ">
                  <ul className="py-2 text-black font-[Poppins] uppercase tracking-wide">
                    <li>
                      <NavLink
                        to={`/dashboard/${auth?.user?.role===1 ? 'admin':'user'}`}
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          handleLogout();
                          setDropdownOpen(false);
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

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-black focus:outline-none"
        >
          {isOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-700 p-4 flex flex-col space-y-2 shadow-md">
          {links.map((item) => (
            <NavLink
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="text-white hover:text-violet-300 font-[Poppins] uppercase tracking-wide leading-[26px] cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              {item === "Cart" ? <span>Cart ({cartValue})</span> : item}
            </NavLink>
          ))}

          {/* Authentication Options for Mobile */}
          {!auth.user ? (
            <>
              <NavLink
                to="/login"
                className="text-white hover:text-violet-300 font-[Poppins] uppercase tracking-wide leading-[26px] cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="text-white hover:text-violet-300 font-[Poppins] uppercase tracking-wide leading-[26px] cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                Register
              </NavLink>
            </>
          ) : (
            <div className="relative">
              {/* User Profile Button */}
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="text-white font-[Poppins] uppercase tracking-wide leading-[26px] cursor-pointer flex items-center gap-1"
              >
                {auth?.user?.name}
                <IoMdArrowDropdown className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute left-0 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow-lg">
                  <ul className="py-2 text-sm text-gray-700">
                    <li>
                      <NavLink
                          to={`/dashboard/${auth?.user?.role===1 ? 'admin':'user'}`}
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
      )}
    </nav>
  );
};

export default Headers;
