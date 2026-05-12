'use client';

import { useEffect, useState } from 'react';
import { ShopContext } from '@/lib/shop-context';

export default function ShopProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showLogin, setShowLogin] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartOriginalTotal = cart.reduce(
    (sum, item) => sum + (item.originalPrice || item.price) * item.quantity,
    0
  );
  const cartDiscount = cartOriginalTotal - cartTotal;
  const shippingFee = cartTotal >= 300000 ? 0 : 15000;
  const finalTotal = cartTotal + shippingFee;
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const placeOrder = (orderInfo) => {
    const order = {
      id: Date.now(),
      items: [...cart],
      total: finalTotal,
      status: 'processing',
      date: new Date().toISOString(),
      ...orderInfo,
    };
    setOrders((prev) => [...prev, order]);
    setCart([]);
    return order;
  };

  return (
    <ShopContext.Provider
      value={{
        darkMode, setDarkMode,
        cart, addToCart, removeFromCart, updateQuantity,
        wishlist, toggleWishlist, isInWishlist,
        searchQuery, setSearchQuery,
        selectedCategory, setSelectedCategory,
        showLogin, setShowLogin,
        isLogin, setIsLogin,
        userInfo, setUserInfo,
        cartTotal, cartOriginalTotal, cartDiscount, shippingFee, finalTotal, cartCount,
        placeOrder, orders,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}
