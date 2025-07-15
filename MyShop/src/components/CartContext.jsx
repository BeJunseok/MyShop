import React, { createContext, useState, useContext } from "react";

// Context 생성
const CartContext = createContext();

// Provider 컴포넌트
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // 상품 추가
  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
        );
      }

      return [...prevItems, { ...product, quantity }];
    });
  };

  // 상품 제거
  const removeFromCart = (product) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== product.id));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// 커스텀 훅으로 Context 사용
export const useCart = () => useContext(CartContext);
