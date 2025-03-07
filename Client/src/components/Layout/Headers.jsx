import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "@fontsource/poppins"; 
import { GiShoppingCart } from "react-icons/gi";
const Headers = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartValue, setCartValue] = useState(0); // State for cart value
  const links = ["Home", "Category", "Register", "Login", "Cart"];

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
                  Cart ({cartValue}) {/* Display cart value */}
                </span>
              ) : (
                item
              )}
            </NavLink>
          ))}
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
              onClick={() => setIsOpen(false)} // Close menu on click
            >
              {item === "Cart" ? (
                <span>
                  Cart ({cartValue}) {/* Display cart value */}
                </span>
              ) : (
                item
              )}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Headers;
