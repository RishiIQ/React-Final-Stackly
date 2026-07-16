import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const AppContext = createContext();
export const useApp = () => useContext(AppContext);

export function AppProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // ADDED: Global Auth Session State
  const [user, setUser] = useState(null); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/products.json');
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error("Data ingestion failure:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p.category).filter(Boolean));
    return ['All', ...Array.from(cats)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All') return products;
    return products.filter(p => p.category === activeCategory);
  }, [products, activeCategory]);

  const value = {
    products, filteredProducts, categories, activeCategory, setActiveCategory,
    cart, setCart, isDarkMode, setIsDarkMode, isCartOpen, setIsCartOpen, isLoading,
    user, setUser // Exposed state parameters
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}