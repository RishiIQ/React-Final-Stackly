import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import HeroBanner from '../components/HeroBanner';
import CategoryTabs from '../components/CategoryTabs';
import ProductGrid from '../components/ProductGrid';

export default function HomeView() {
  const { isLoading } = useApp();

  if (isLoading) {
    return (
      <div className="h-96 flex flex-col items-center justify-center space-y-4">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }} 
          className="w-8 h-8 border-4 border-black dark:border-white border-t-transparent rounded-full" 
        />
        <p className="text-xs font-medium text-zinc-400 tracking-wider uppercase">Loading Curation...</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <HeroBanner />
      <CategoryTabs />
      <ProductGrid />
    </motion.div>
  );
}