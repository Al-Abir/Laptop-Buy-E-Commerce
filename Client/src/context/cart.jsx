import { useState, useContext, createContext } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // Initialize cart as an empty array

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for accessing cart context
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };