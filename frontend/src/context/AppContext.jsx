import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('vibeUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    const savedCart = localStorage.getItem('vibeCart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem('vibeUser', JSON.stringify(userData));
    localStorage.setItem('vibeToken', token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('vibeUser');
    localStorage.removeItem('vibeToken');
  };

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i._id === item._id);
      let newCart;
      if (existing) {
        newCart = prev.map(i => i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i);
      } else {
        newCart = [...prev, { ...item, quantity: 1 }];
      }
      localStorage.setItem('vibeCart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prev => {
      const newCart = prev.filter(i => i._id !== itemId);
      localStorage.setItem('vibeCart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('vibeCart');
  };

  return (
    <AppContext.Provider value={{ user, login, logout, cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </AppContext.Provider>
  );
};
