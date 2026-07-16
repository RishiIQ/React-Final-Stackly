import React, { useState, useMemo, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ProductDetailView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, setCart } = useApp();
  
  const [selectedSize, setSelectedSize] = useState('M');
  const [flyingItems, setFlyingItems] = useState([]); 
  const buttonRef = useRef(null);
  
  // GUARDIAN REF: Prevents keyframe double-firing bugs
  const processedFlights = useRef(new Set());

  const product = useMemo(() => products.find(p => p.id === id), [products, id]);

  if (!product) {
    return (
      <div className="text-center py-24">
        <p className="text-zinc-450 text-sm">Product missing from manifest.</p>
        <button onClick={() => navigate('/')} className="mt-4 bg-black text-white px-6 py-2 rounded-full text-xs font-bold cursor-pointer">
          Return Home
        </button>
      </div>
    );
  }

  const handleAddToCartClick = () => {
    const sourceElement = buttonRef.current;
    const targetElement = document.getElementById('navbar-cart-btn');

    if (sourceElement && targetElement) {
      const sourceRect = sourceElement.getBoundingClientRect();
      const targetRect = targetElement.getBoundingClientRect();
      const uniqueId = Date.now() + Math.random(); // High precision unique token identifier
      
      setFlyingItems(prev => [...prev, {
        id: uniqueId,
        startX: sourceRect.left + (sourceRect.width / 2) - 20, 
        startY: sourceRect.top + (sourceRect.height / 2) - 20,
        endX: targetRect.left + (targetRect.width / 2) - 20,
        endY: targetRect.top + (targetRect.height / 2) - 20,
        sizeSnapshot: selectedSize 
      }]);
    }
  };

  const handleFlightArrival = (item) => {
    // If this unique animation token has already registered an impact, exit immediately
    if (processedFlights.current.has(item.id)) return;
    processedFlights.current.add(item.id);

    // 1. Commit item data securely to global state context array (1 time only)
    setCart((prevCart) => {
      const existing = prevCart.find(i => i.id === product.id && i.size === item.sizeSnapshot);
      if (existing) {
        return prevCart.map(i => (i.id === product.id && i.size === item.sizeSnapshot) ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prevCart, { ...product, quantity: 1, size: item.sizeSnapshot }];
    });

    // 2. Clear out the completed item token from rendering memory
    setFlyingItems(prev => prev.filter(f => f.id !== item.id));

    // 3. Garbage collection cleanup for the guardian ref set
    setTimeout(() => {
      processedFlights.current.delete(item.id);
    }, 1000);
  };

  return (
    <motion.div 
      layoutId={`card-container-${product.id}`}
      className="max-w-4xl mx-auto bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white rounded-3xl p-6 md:p-8 shadow-xl border border-zinc-100 dark:border-zinc-800 w-full relative"
    >
      {/* Flight Canvas Overlay Viewport */}
      <AnimatePresence>
        {flyingItems.map((item) => (
          <motion.div
            key={item.id}
            initial={{ 
              x: item.startX, 
              y: item.startY, 
              scale: 1, 
              opacity: 1,
              rotate: 0 
            }}
            animate={{ 
              x: item.endX,
              y: [item.startY, item.startY - 180, item.endY], 
              scale: [1, 0.8, 0.15], 
              opacity: [1, 0.9, 0.2],
              rotate: 360 
            }}
            exit={{ opacity: 0 }}
            onAnimationComplete={() => handleFlightArrival(item)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              zIndex: 9999,
              pointerEvents: 'none',
              width: '40px',
              height: '40px',
            }}
            transition={{ 
              duration: 0.9,
              ease: "easeInOut"
            }}
            className="rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-xl p-1 flex items-center justify-center overflow-hidden"
          >
            <img src={product.image} alt="" className="w-full h-full object-contain" />
          </motion.div>
        ))}
      </AnimatePresence>

      <button onClick={() => navigate('/')} className="flex items-center space-x-2 text-sm font-medium text-zinc-400 hover:text-zinc-800 dark:hover:text-white mb-6 cursor-pointer group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span>Back to browse</span>
      </button>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="rounded-2xl bg-zinc-50 dark:bg-zinc-950 p-8 flex items-center justify-center aspect-square w-full">
          <img src={product.image} alt={product.name} className="max-h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
        </div>

        <div className="space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">{product.category}</span>
            <div className="flex items-start justify-between gap-4 mt-1">
              <h1 className="text-2xl font-bold tracking-tight">{product.name}</h1>
              <Heart className="w-5 h-5 text-zinc-400 hover:text-red-500 cursor-pointer shrink-0 transition-colors" />
            </div>
            <p className="text-xl font-extrabold text-zinc-500 dark:text-zinc-400 mt-2">
              ${(product.priceCents / 100).toFixed(2)}
            </p>
          </div>

          <div>
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Select Size</span>
            <div className="flex gap-2 mt-2">
              {['S', 'M', 'L', 'XL'].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-10 h-10 text-xs font-bold rounded-full border transition-all cursor-pointer relative ${
                    selectedSize === size
                      ? 'bg-black text-white dark:bg-white dark:text-black border-transparent shadow-sm'
                      : 'border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  {selectedSize === size && (
                    <motion.div layoutId="detailActiveSize" className="absolute inset-0 rounded-full border-2 border-zinc-900 dark:border-white scale-110" />
                  )}
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Description</span>
            <p className="text-sm text-zinc-650 dark:text-zinc-300 leading-relaxed mt-1">{product.description}</p>
          </div>

          <motion.button 
            ref={buttonRef}
            whileHover={{ scale: 1.015 }} 
            whileTap={{ scale: 0.985 }} 
            onClick={handleAddToCartClick} 
            className="w-full bg-black text-white dark:bg-white dark:text-black font-semibold py-3 rounded-full text-sm shadow-md cursor-pointer relative overflow-hidden"
          >
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}