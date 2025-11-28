import React, { useMemo } from 'react';
import { Product } from '../types';
import { Plus, Zap, Eye, AlertCircle } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAdd }) => {
  // Generate fake scarcity metrics for "dark pattern" encouragement
  const viewers = useMemo(() => Math.floor(Math.random() * 20) + 5, []);
  const stockLeft = useMemo(() => Math.floor(Math.random() * 8) + 1, []);
  const isLowStock = stockLeft < 4;

  return (
    <div className="group relative bg-white rounded-none border border-gray-100 hover:border-accent transition-all duration-300">
      <div className="aspect-square overflow-hidden bg-gray-100 relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 filter saturate-[0.85] group-hover:saturate-100"
        />
        <div className="absolute top-2 left-2 bg-black text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest font-display z-10">
          {product.category}
        </div>

        {/* Scarcity Badge */}
        {isLowStock && (
          <div className="absolute top-2 right-2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest font-display z-10 animate-pulse flex items-center gap-1 shadow-md">
            <AlertCircle size={10} /> Only {stockLeft} Left
          </div>
        )}
      </div>
      
      <button 
        onClick={() => onAdd(product)}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-accent text-white rounded-full shadow-[0_0_20px_rgba(255,62,0,0.5)] opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 z-10 flex items-center justify-center"
        aria-label="Add to cart"
      >
        <Zap size={24} fill="currentColor" />
      </button>

      <div className="p-4 border-t border-gray-100 group-hover:bg-gray-50 transition-colors">
        {/* Social Proof Indicator */}
        <div className="flex items-center gap-1 mb-2 text-[10px] font-bold text-gray-400 uppercase tracking-wide">
          <Eye size={12} className="text-accent" />
          <span className="text-gray-600">{viewers} people</span> viewing this
        </div>

        <h3 className="font-display text-lg font-semibold text-primary uppercase leading-tight mb-1 truncate">{product.name}</h3>
        <p className="text-accent font-bold font-mono">₹{product.price}</p>
      </div>
    </div>
  );
};