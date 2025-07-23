import React, { createContext, useState, useContext, useEffect } from "react";
import { fetchAddToCart, fetchCart, fetchRemoveCartItem } from "../apis/carts";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";

// Context 생성
const CartContext = createContext();

// Provider 컴포넌트
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { isLoggedIn } = useAuth();

  // 장바구니 로딩
  useEffect(() => {
    const loadCart = async () => {
      if (!isLoggedIn) return;
      try {
        const data = await fetchCart();
        setCartItems(data.cartItems);
      } catch (err) {
        toast(err.message, { duration: 3000, icon: "🚨" });
      }
    };

    loadCart();
  }, [isLoggedIn]);

  // 상품 추가
  const addToCart = async (product, quantity = 1) => {
    try {
      await fetchAddToCart({ productId: product.id, quantity });
      const data = await fetchCart();
      setCartItems(data.cartItems);
    } catch (err) {
      toast(err.message, { duration: 3000, icon: "🚨" });
    }
  };

  // 상품 제거
  const removeFromCart = async (product) => {
    try {
      await fetchRemoveCartItem(product.id);
      const data = await fetchCart();
      setCartItems(data.cartItems);
    } catch (err) {
      toast(err.message, { duration: 3000, icon: "🚨" });
    }
  };

  // 상품 여러개 제거
  const removeMulFromCart = async (ids) => {
    try {
      await Promise.all(ids.map((id) => fetchRemoveCartItem(id)));

      const data = await fetchCart();
      setCartItems(data.cartItems);
    } catch (err) {
      toast(err.message, { duration: 3000, icon: "🚨" });
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, removeMulFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// 커스텀 훅으로 Context 사용
export const useCart = () => useContext(CartContext);
