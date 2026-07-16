import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';

// High-end spring physics configuration
const cardSpring = { type: "spring", stiffness: 260, damping: 25 };

export default function ProductGrid() {
  const { filteredProducts } = useApp();
  const navigate = useNavigate();

  return (
    <motion.div 
      layout
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-2"
    >
      {filteredProducts.map((product, idx) => (
        <motion.div
          key={product.id}
          layoutId={`card-container-${product.id}`}
          onClick={() => navigate(`/product/${product.id}`)}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: Math.min(idx * 0.04, 0.3), ...cardSpring }}
          className="group cursor-pointer flex flex-col justify-between rounded-3xl p-4 bg-white border border-zinc-100 dark:bg-zinc-900 dark:border-zinc-800/80 transition-shadow hover:shadow-xl relative overflow-hidden"
          whileHover={{ y: -6 }}
        >
          {/* Subtle overlay flash effect on hover */}
          <motion.div 
            className="absolute inset-0 bg-zinc-900/[0.02] dark:bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" 
          />

          <div className="relative rounded-2xl overflow-hidden bg-zinc-50 dark:bg-zinc-950 aspect-square flex items-center justify-center p-4 w-full">
            {/* The LayoutId morphs this image directly across views */}
            <motion.img 
              layoutId={`img-target-${product.id}`}
              src={product.image} 
              alt={product.name} 
              className="max-h-full max-w-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform duration-500 ease-out" 
            />
          </div>
          
          <div className="mt-4 space-y-1 w-full z-10">
            <h3 className="font-semibold text-sm line-clamp-1 text-zinc-800 dark:text-zinc-200 group-hover:underline">
              {product.name}
            </h3>
            <div className="flex items-center justify-between pt-1">
              <span className="font-bold text-base text-zinc-900 dark:text-white">
                ${(product.priceCents / 100).toFixed(2)}
              </span>
              <motion.div 
                whileTap={{ scale: 0.75 }}
                className="p-1 rounded-full hover:bg-zinc-150 dark:hover:bg-zinc-800 transition-colors"
                onClick={(e) => e.stopPropagation()} // Prevents navigation click triggers
              >
                <Heart className="w-4 h-4 text-zinc-400 hover:text-red-500 transition-colors" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}