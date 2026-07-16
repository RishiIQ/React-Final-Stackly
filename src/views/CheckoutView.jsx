import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { CreditCard, Truck, ShieldCheck, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CheckoutView() {
  const { cart, setCart } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Shipping, 2: Complete

  const subtotal = cart.reduce((acc, item) => acc + ((item.priceCents / 100) * item.quantity), 0);
  const total = subtotal > 0 ? subtotal + 10 : 0;

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page reload
    
    // HTML5 `required` checks will validate automatically before hitting this point
    setStep(2);
    setCart([]); // Clear the context cart upon successful confirmation
  };

  if (cart.length === 0 && step === 1) {
    return (
      <div className="text-center py-24 space-y-4">
        <p className="text-zinc-450 text-sm">Your checkout manifest is empty.</p>
        <button onClick={() => navigate('/')} className="bg-black text-white px-6 py-2.5 rounded-full text-xs font-bold cursor-pointer">Return Home</button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto min-h-[60vh] pt-4">
      {step === 1 ? (
        // Changed outer container division to a submission tracking form element
        <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-8">
          
          {/* Form Matrix */}
          <div className="md:col-span-2 bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-100 dark:border-zinc-800 space-y-6">
            <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
              <Truck className="w-5 h-5" /> Shipping Details
            </h2>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <input type="text" placeholder="First Name" required className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-transparent outline-none focus:border-black dark:focus:border-white transition-colors" />
              <input type="text" placeholder="Last Name" required className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-transparent outline-none focus:border-black dark:focus:border-white transition-colors" />
              <input type="email" placeholder="Email Address" required className="col-span-2 p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-transparent outline-none focus:border-black dark:focus:border-white transition-colors" />
              <input type="text" placeholder="Street Address" required className="col-span-2 p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-transparent outline-none focus:border-black dark:focus:border-white transition-colors" />
              <input type="text" placeholder="City" required className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-transparent outline-none focus:border-black dark:focus:border-white transition-colors" />
              <input type="text" placeholder="Postal Code" required className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-transparent outline-none focus:border-black dark:focus:border-white transition-colors" />
            </div>

            <h2 className="text-xl font-bold tracking-tight flex items-center gap-2 pt-4 border-t dark:border-zinc-800">
              <CreditCard className="w-5 h-5" /> Payment Method
            </h2>
            <div className="space-y-3 text-xs">
              <input type="text" placeholder="Cardholder Name" required className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-transparent outline-none focus:border-black dark:focus:border-white transition-colors" />
              <div className="grid grid-cols-3 gap-3">
                <input type="text" placeholder="Card Number" required className="col-span-2 p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-transparent outline-none focus:border-black dark:focus:border-white transition-colors" />
                <input type="text" placeholder="CVV" maxLength="4" required className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-transparent outline-none focus:border-black dark:focus:border-white transition-colors" />
              </div>
            </div>

            {/* Changed to type="submit" so input browser constraint hooks validate before execution */}
            <button 
              type="submit"
              className="w-full bg-black text-white dark:bg-white dark:text-black font-bold py-3.5 rounded-full text-xs uppercase tracking-wider mt-4 cursor-pointer hover:opacity-90 transition-opacity active:scale-[0.99] transform"
            >
              Authorize Secure Payment
            </button>
          </div>

          {/* Cart Breakdown Column */}
          <div className="bg-zinc-50 dark:bg-zinc-900/40 rounded-3xl p-6 border border-zinc-150/40 h-fit space-y-4">
            <h3 className="font-bold text-sm tracking-tight border-b pb-2 dark:border-zinc-800">Order Digest</h3>
            <div className="max-h-48 overflow-y-auto space-y-3 pr-2 scrollbar-none">
              {cart.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs">
                  <span className="truncate w-32 font-medium">{item.name} <b className="text-zinc-400">x{item.quantity}</b></span>
                  <span className="font-bold text-zinc-600 dark:text-zinc-300">${((item.priceCents / 100) * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="pt-3 border-t dark:border-zinc-800 text-xs space-y-2 text-zinc-400">
              <div className="flex justify-between"><span>Subtotal</span><span className="font-semibold text-zinc-800 dark:text-white">${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span className="font-semibold text-zinc-800 dark:text-white">$10.00</span></div>
              <div className="flex justify-between text-sm font-bold text-black dark:text-white pt-2 border-t dark:border-zinc-800">
                <span>Total Due</span><span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </form>
      ) : (
        /* Order Confirmation Success State */
        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-md mx-auto text-center py-16 space-y-6 bg-white dark:bg-zinc-900 p-8 rounded-3xl border dark:border-zinc-800 shadow-sm">
          <CheckCircle className="w-16 h-16 text-zinc-900 dark:text-white mx-auto stroke-1" />
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">Order Provisioned!</h2>
            <p className="text-xs text-zinc-450 leading-relaxed">
              Your security transaction cleared successfully. An architecture manifest containing tracking tokens has been deployed to your inbox.
            </p>
          </div>
          <button onClick={() => navigate('/')} className="w-full bg-black text-white dark:bg-white dark:text-black py-3 rounded-full text-xs font-bold cursor-pointer">
            Continue Journey
          </button>
        </motion.div>
      )}
    </div>
  );
}