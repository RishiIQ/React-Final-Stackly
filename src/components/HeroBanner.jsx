import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';

export default function HeroBanner() {
  return (
    <div className="rounded-3xl p-8 md:p-12 mb-8 flex flex-col md:flex-row items-center justify-between bg-zinc-100 dark:bg-zinc-900 transition-colors">
      <div className="max-w-md space-y-4 text-center md:text-left">
        <span className="inline-block text-xs font-bold tracking-widest uppercase bg-zinc-200 dark:bg-zinc-800 px-3 py-1 rounded-full">30% Sale</span>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">Elevate Your Daily Style Essentials</h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">Discover premium comfort and modern minimal cuts seamlessly engineered for your daily routine.</p>
        <button className="bg-black text-white dark:bg-white dark:text-black px-6 py-2.5 rounded-full font-medium text-sm shadow-md cursor-pointer">
          Shop Now
        </button>
      </div>
      <div className="w-full md:w-1/3 mt-6 md:mt-0 flex justify-center select-none">
        <motion.div 
          animate={{ rotate: [12, 8, 12], y: [0, -6, 0] }} 
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }} 
          className="w-40 h-40 rounded-3xl bg-gradient-to-tr from-zinc-300 to-zinc-400 dark:from-zinc-700 dark:to-zinc-800 flex items-center justify-center shadow-md opacity-80"
        >
          <ShoppingBag className="w-14 h-14 text-white/40" />
        </motion.div>
      </div>
    </div>
  );
}