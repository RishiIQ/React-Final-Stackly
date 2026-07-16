import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';

const springTransition = { type: "spring", stiffness: 400, damping: 30 };

export default function CartDrawer() {
  const { cart, setCart, setIsCartOpen } = useApp();
  const navigate = useNavigate();

  const updateQty = (id, size, change) => {
    setCart(prevCart => prevCart.map(item => {
      if (item.id === id && item.size === size) {
        const nextQty = item.quantity + change;
        return nextQty > 0 ? { ...item, quantity: nextQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  // 1. Math Calculators
  const subtotal = cart.reduce((acc, item) => acc + ((item.priceCents / 100) * item.quantity), 0);
  const shippingCost = subtotal > 0 ? 10.00 : 0.00;
  const totalAmount = subtotal > 0 ? subtotal + shippingCost : 0.00;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={() => setIsCartOpen(false)} />
      
      <motion.div 
        initial={{ x: '100%' }} 
        animate={{ x: 0 }} 
        exit={{ x: '100%' }} 
        transition={{ type: 'spring', stiffness: 350, damping: 35 }} 
        className="relative w-full max-w-md h-full shadow-2xl flex flex-col justify-between bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white"
      >
        <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center space-x-2 font-bold text-lg">
            <ShoppingCart className="w-5 h-5" />
            <span>Your Cart</span>
          </div>
          <button onClick={() => setIsCartOpen(false)} className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          <AnimatePresence initial={false}>
            {cart.length === 0 ? (
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="h-full flex flex-col items-center justify-center text-zinc-400 space-y-2">
                <ShoppingBag className="w-12 h-12 stroke-1" />
                <p className="text-sm">Your cart feels light.</p>
              </motion.div>
            ) : (
              cart.map((item, idx) => (
                <motion.div layout initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: 50 }} transition={springTransition} key={`${item.id}-${item.size}-${idx}`} className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-16 h-16 bg-zinc-50 dark:bg-zinc-950 rounded-2xl p-2 flex items-center justify-center">
                      {/* Dark mode blending image enhancements */}
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="max-h-full object-contain mix-blend-multiply dark:mix-blend-normal dark:brightness-95 dark:contrast-105" 
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm line-clamp-1 w-40">{item.name}</h4>
                      <p className="text-xs text-zinc-400 mt-0.5">Size: {item.size}</p>
                      <p className="text-sm font-bold mt-1">${((item.priceCents / 100) * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-full">
                    <button onClick={() => updateQty(item.id, item.size, -1)} className="hover:opacity-60 cursor-pointer"><Minus className="w-3.5 h-3.5" /></button>
                    <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                    <button onClick={() => updateQty(item.id, item.size, 1)} className="hover:opacity-60 cursor-pointer"><Plus className="w-3.5 h-3.5" /></button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Updated Summary Section with dynamic values */}
        <div className="p-6 border-t border-zinc-100 dark:border-zinc-800 space-y-4">
          <div className="space-y-1.5 text-sm text-zinc-500 dark:text-zinc-400">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-zinc-900 dark:text-white">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Shipping</span>
              <span className="font-semibold text-zinc-900 dark:text-white">${shippingCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-zinc-900 dark:text-white pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <span>Total Amount</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
          </div>
          
          <button 
            disabled={cart.length === 0}
            onClick={() => {
              setIsCartOpen(false);
              navigate('/checkout');
            }}
            className="w-full bg-black text-white dark:bg-white dark:text-black font-semibold py-3 rounded-full text-sm shadow-md cursor-pointer disabled:opacity-45 transition-transform active:scale-[0.99]"
          >
            Process to checkout
          </button>
        </div>
      </motion.div>
    </div>
  );
}