import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, MessageSquare, Globe, Shield, Truck, RefreshCw } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-20 border-t bg-white border-zinc-200 dark:bg-zinc-950 dark:border-zinc-900 transition-colors">
      {/* Value Props Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 border-b border-zinc-100 dark:border-zinc-900 md:px-8">
        {[
          { icon: Truck, title: "Free Express Shipping", desc: "On all global orders above $150" },
          { icon: RefreshCw, title: "30-Day Returns", desc: "Hassle-free dynamic exchanges" },
          { icon: Shield, title: "Secure Checkout", desc: "Encrypted 256-bit SSL protocols" },
          { icon: Globe, title: "Sustainability Driven", desc: "100% certified organic packages" }
        ].map((prop, i) => (
          <div key={i} className="flex items-start space-x-3">
            <prop.icon className="w-5 h-5 text-zinc-400 mt-0.5 shrink-0" />
            <div>
              <h4 className="text-xs font-bold tracking-tight">{prop.title}</h4>
              <p className="text-xs text-zinc-400 mt-0.5">{prop.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Corporate Links Area */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-5 gap-8 md:px-8">
        <div className="col-span-2 space-y-4">
          <Link to="/" className="flex items-center space-x-2 font-bold text-lg tracking-tight">
            <ShoppingBag className="w-5 h-5" />
            <span>Rishi E-Com Inc.</span>
          </Link>
          <p className="text-xs text-zinc-455 max-w-sm leading-relaxed">
            Engineered minimal essentials designed to merge active performance standards with premium timeless aesthetics.
          </p>
          <div className="flex space-x-3 pt-2">
            {/* Swapped to safe, generic social placeholder icons */}
            {[MessageSquare, Globe].map((Icon, idx) => (
              <a key={idx} href="#" className="p-2 bg-zinc-50 dark:bg-zinc-900 rounded-full hover:opacity-70 transition-opacity">
                <Icon className="w-4 h-4 text-zinc-500" />
              </a>
            ))}
          </div>
        </div>

        {[
          { title: "Collection", links: ["New Arrivals", "Best Sellers", "Minimalist Cuts", "Fragrances"] },
          { title: "Support", links: ["Order Tracking", "Sizing Matrix", "Custom Queries", "Return Portal"] },
          { title: "Company", links: ["Our Heritage", "Eco Manifesto", "Careers", "Pressroom"] }
        ].map((col, i) => (
          <div key={i} className="space-y-3">
            <h5 className="text-xs font-bold tracking-widest text-zinc-400 uppercase">{col.title}</h5>
            <ul className="space-y-2 text-xs text-zinc-500 dark:text-zinc-400">
              {col.links.map((link, k) => (
                <li key={k} className="hover:text-black dark:hover:text-white transition-colors cursor-pointer">{link}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Legals Banner */}
      <div className="max-w-7xl mx-auto px-4 py-6 border-t border-zinc-100 dark:border-zinc-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-zinc-400 md:px-8">
        <span>&copy; {new Date().getFullYear()} Rishi E-Com Inc. All rights reserved.</span>
        <div className="flex space-x-4">
          <span className="hover:underline cursor-pointer">Privacy Matrix</span>
          <span className="hover:underline cursor-pointer">Terms of Operation</span>
        </div>
      </div>
    </footer>
  );
}