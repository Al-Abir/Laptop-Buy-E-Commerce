import { useState, useContext, createContext,useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // Initialize cart as an empty array

   useEffect(()=>{
           let existingCartItem = localStorage.getItem("cart")
           if(existingCartItem) setCart(JSON.parse(existingCartItem))
   },[])

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for accessing cart context
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };