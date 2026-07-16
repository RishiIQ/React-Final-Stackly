import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import { Lock, ArrowRight } from 'lucide-react';

export default function LoginView() {
  const { setUser } = useApp();
  const navigate = useNavigate();
  const [nameInput, setNameInput] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!nameInput.trim()) return;

    setUser({ name: nameInput });
    navigate('/');
  };

  return (
    // Fluid responsive viewport container that adapts height and padding dynamically
    <div className="min-h-[80vh] sm:min-h-[70vh] flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      
      <motion.form 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        onSubmit={handleLoginSubmit}
        // Responsive width rules: 100% on small devices, locking to max-w-sm on tablets/desktops
        className="w-full max-w-sm sm:max-w-md bg-white border border-zinc-150 rounded-[2.5rem] p-6 sm:p-10 shadow-xl dark:bg-zinc-900 dark:border-zinc-800 space-y-6 sm:space-y-8 transition-all"
      >
        {/* Header Segment */}
        <div className="text-center space-y-3">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center mx-auto text-zinc-800 dark:text-zinc-200 shadow-inner">
            <Lock className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">
              Welcome to Marketly
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 dark:text-zinc-500 max-w-[280px] sm:max-w-none mx-auto leading-relaxed">
              Enter your moniker to initiate your premium session customization.
            </p>
          </div>
        </div>

        {/* Form Inputs Matrix */}
        <div className="space-y-2 text-xs font-semibold">
          <label className="text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block text-[10px] sm:text-xs">
            Your Identity Name
          </label>
          <div className="relative">
            <input 
              type="text" 
              placeholder="e.g., Rishi" 
              required
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              // Dynamic adjustments for interactive states and font rendering across screens
              className="w-full p-3.5 sm:p-4 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-transparent text-sm sm:text-base font-normal outline-none focus:border-black dark:focus:border-white focus:ring-2 focus:ring-black/5 dark:focus:ring-white/5 transition-all"
            />
          </div>
        </div>

        {/* Action Trigger Component */}
        <motion.button 
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          type="submit"
          className="w-full bg-black text-white dark:bg-white dark:text-black font-bold py-3.5 sm:py-4 rounded-full text-xs sm:text-sm uppercase tracking-wider cursor-pointer shadow-md hover:opacity-90 flex items-center justify-center space-x-2 transition-all"
        >
          <span>Establish Session</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </motion.form>
      
    </div>
  );
}