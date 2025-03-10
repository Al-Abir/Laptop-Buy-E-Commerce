import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "@fontsource/poppins"; 
import { GiShoppingCart } from "react-icons/gi";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";

const Headers = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartValue, setCartValue] = useState(0);
  const [auth, setAuth] = useAuth(); // ✅ Use authentication context

  const links = ["Home", "Category", "Cart"];

  const handleLogout = () => {
    setAuth({ user: null, token: "" }); // Clear authentication state
    localStorage.removeItem("auth"); // Clear auth from storage
    toast.success("Logout Successfully")
  };

  return (
    <nav className="p-4 shadow-lg border-b-2">
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
              {item === "Cart" ? (
                <span>
                  Cart ({cartValue})
                </span>
              ) : (
                item
              )}
            </NavLink>
          ))}

          {/* Show Login/Register if not authenticated, otherwise show Logout */}
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
            <button
              onClick={handleLogout}
              className="text-black hover:text-red-600 font-[Poppins] uppercase tracking-wide leading-[26px] cursor-pointer"
            >
              Logout
            </button>
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
              className="text-black hover:text-violet-700 hover:underline font-[Poppins] uppercase tracking-wide leading-[26px] cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              {item === "Cart" ? (
                <span>
                  Cart ({cartValue})
                </span>
              ) : (
                item
              )}
            </NavLink>
          ))}

          {/* Show Login/Register if not authenticated, otherwise show Logout */}
          {!auth.user ? (
            <>
              <NavLink
                to="/login"
                className="text-black hover:text-violet-700 hover:underline font-[Poppins] uppercase tracking-wide leading-[26px] cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="text-black hover:text-violet-700 hover:underline font-[Poppins] uppercase tracking-wide leading-[26px] cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                Register
              </NavLink>
            </>
          ) : (
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="text-black hover:text-red-600 font-[Poppins] uppercase tracking-wide leading-[26px] cursor-pointer"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Headers;
