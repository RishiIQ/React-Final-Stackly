import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';

export default function CategoryTabs() {
  const { categories, activeCategory, setActiveCategory } = useApp();
  
  return (
    <div className="flex items-center space-x-2 overflow-x-auto pb-4 scrollbar-none mb-4">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setActiveCategory(cat)}
          className={`px-5 py-2 rounded-full text-xs font-semibold whitespace-nowrap tracking-wide cursor-pointer transition-colors relative ${
            activeCategory === cat ? 'text-white dark:text-black font-bold z-10' : 'text-zinc-650 bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-400'
          }`}
        >
          {activeCategory === cat && (
            <motion.div 
              layoutId="activeTabIndicator" 
              className="absolute inset-0 bg-black dark:bg-white rounded-full -z-10 shadow-sm" 
              transition={{ type: "spring", stiffness: 300, damping: 28 }} 
            />
          )}
          {cat}
        </button>
      ))}
    </div>
  );
}