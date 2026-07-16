import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Make sure BrowserRouter is imported here
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './views/HomeView';
import ProductDetailView from './views/ProductDetailView';
import CheckoutView from './views/CheckoutView';
import CartDrawer from './components/CartDrawer';
import { AnimatePresence } from 'framer-motion';
import LoginView from './views/LoginView';

import { useLocation } from 'react-router-dom'; // Add useLocation to your imports

function StorefrontLayout() {
  const { isDarkMode, isCartOpen } = useApp();
  const location = useLocation(); // Keeps track of unique page states for animations
  
  return (
    <div className={`min-h-screen flex flex-col justify-between transition-colors duration-500 ${isDarkMode ? 'dark bg-[#121212] text-white' : 'bg-[#f7f7f7] text-[#121212]'}`}>
      <div>
        <Navbar />
        
        {/* Core Content Container */}
        <main className="max-w-7xl mx-auto px-4 py-6 md:px-8 relative">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<HomeView />} />
              <Route path="/product/:id" element={<ProductDetailView />} />
              <Route path="/checkout" element={<CheckoutView />} />
              <Route path="/login" element={<LoginView />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>

      <Footer />

      <AnimatePresence>
        {isCartOpen && <CartDrawer />}
      </AnimatePresence>
    </div>
  );
}

// Wrapping BrowserRouter at the true root entry level
export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <StorefrontLayout />
      </AppProvider>
    </BrowserRouter>
  );
}