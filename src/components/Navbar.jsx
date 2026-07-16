import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ShoppingCart, Sun, Moon, Menu, X, User, LogOut } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Navbar() {
  const { isDarkMode, setIsDarkMode, cart, setIsCartOpen, user, setUser } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-40 backdrop-blur-md border-b bg-white/80 border-zinc-200 dark:bg-zinc-900/80 dark:border-zinc-800/50 transition-colors duration-300">
      {/* Main Structural Container */}
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between sm:px-6 md:px-8">
        
        {/* Left Side: Brand Identity & Desktop Welcome Banner */}
        <div className="flex items-center space-x-3 md:space-x-6">
          <Link to="/" className="flex items-center space-x-2 font-bold text-lg sm:text-xl tracking-tight shrink-0">
            <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-900 dark:text-white" />
            <span className="text-zinc-900 dark:text-white">Rishi E-Com</span>
          </Link>
          
          {/* Desktop Greeting (Hidden on mobile grid viewports) */}
          {user?.name && (
            <span className="hidden md:inline-block text-[11px] font-bold tracking-wide bg-zinc-100 dark:bg-zinc-800 text-zinc-650 dark:text-zinc-300 px-3 py-1 rounded-full border border-zinc-200/50 dark:border-zinc-700/30">
              👋 Welcome back, {user.name}
            </span>
          )}
        </div>
        
        {/* Right Side: Desktop Controls Terminal */}
        <div className="hidden sm:flex items-center space-x-3 md:space-x-4">
          {!user ? (
            <Link to="/login" className="text-xs font-bold text-zinc-400 hover:text-black dark:hover:text-white uppercase tracking-wider transition-colors mr-2">
              Sign In
            </Link>
          ) : (
            <button 
              onClick={() => setUser(null)}
              className="text-xs font-bold text-zinc-400 hover:text-red-500 uppercase tracking-wider transition-colors mr-2 flex items-center space-x-1 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Sign Out</span>
            </button>
          )}

          {/* Theme Toggle Button */}
          <motion.button 
            whileTap={{ scale: 0.85, rotate: 30 }}
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </motion.button>

          {/* Cart Pill Layout */}
          <motion.button 
            id="navbar-cart-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsCartOpen(true)}
            className="flex items-center space-x-2 bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded-full font-medium shadow-md text-sm cursor-pointer hover:opacity-90"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden md:inline">Cart</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-white dark:bg-zinc-200 dark:text-black font-bold ml-1">
              {totalItems}
            </span>
          </motion.button>
        </div>

        {/* Mobile-Only Action Sockets Panel */}
        <div className="flex sm:hidden items-center space-x-2">
          {/* Miniature Floating Shopping Counter */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="p-2 rounded-full bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 relative"
          >
            <ShoppingCart className="w-4 h-4" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white dark:bg-white dark:text-black w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          {/* Hamburger Menu Toggle Grid */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-zinc-800 dark:text-zinc-200 cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ----------------------------------------------------------------------
          MOBILE MENU SLIDEOUT OVERLAY
          ---------------------------------------------------------------------- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden border-t border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden w-full px-4 py-4 space-y-4 shadow-xl"
          >
            {user?.name && (
              <div className="flex items-center space-x-2 text-xs font-bold text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-950 p-2.5 rounded-xl border border-zinc-150 dark:border-zinc-850">
                <User className="w-4 h-4" />
                <span>Active Profile: {user.name}</span>
              </div>
            )}

            <div className="flex flex-col space-y-2 text-sm font-semibold">
              <Link 
                to="/" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg transition-colors"
              >
                Browse Storefront
              </Link>
              
              {!user ? (
                <Link 
                  to="/login" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                >
                  Sign In / Register
                </Link>
              ) : (
                <button 
                  onClick={() => { setUser(null); setIsMobileMenuOpen(false); }}
                  className="p-2 text-left text-red-500 hover:bg-red-50/50 dark:hover:bg-red-950/20 rounded-lg transition-colors cursor-pointer"
                >
                  Terminate Session (Sign Out)
                </button>
              )}
            </div>

            {/* Quick Utility Switch Row */}
            <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800 text-xs text-zinc-400">
              <span>Switch visual spectrum</span>
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="flex items-center space-x-2 bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-full font-bold text-zinc-800 dark:text-zinc-200 cursor-pointer"
              >
                {isDarkMode ? <><Sun className="w-3.5 h-3.5" /> <span>Light</span></> : <><Moon className="w-3.5 h-3.5" /> <span>Dark</span></>}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}