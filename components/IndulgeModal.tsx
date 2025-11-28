import React, { useEffect, useState } from 'react';
import { Product } from '../types';
import { getIndulgenceCopy } from '../services/geminiService';
import { Button } from './Button';
import { Flame, X, Sparkles } from 'lucide-react';

interface IndulgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  triggerProduct: Product | null;
  recommendedProduct: Product | null;
  onAddRecommendation: (product: Product) => void;
}

export const IndulgeModal: React.FC<IndulgeModalProps> = ({
  isOpen,
  onClose,
  triggerProduct,
  recommendedProduct,
  onAddRecommendation
}) => {
  const [copy, setCopy] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && triggerProduct && recommendedProduct) {
      setLoading(true);
      getIndulgenceCopy(triggerProduct.name, recommendedProduct.name)
        .then(text => {
          setCopy(text);
          setLoading(false);
        })
        .catch(() => {
          setCopy(`This ${recommendedProduct.name} is a must-have for the collection.`);
          setLoading(false);
        });
    }
  }, [isOpen, triggerProduct, recommendedProduct]);

  if (!isOpen || !recommendedProduct) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-sm rounded-none shadow-2xl overflow-hidden transform transition-all duration-300 animate-slide-up border-2 border-accent">
        
        {/* Header Image */}
        <div className="relative h-56">
          <img src={recommendedProduct.image} alt={recommendedProduct.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
          <div className="absolute bottom-0 left-0 w-full p-6">
            <div className="inline-flex items-center gap-1 bg-accent text-white px-3 py-1 text-xs font-bold uppercase tracking-widest mb-2">
              <Flame size={12} fill="currentColor" />
              Rare Find
            </div>
            <h3 className="text-white font-display text-3xl font-bold italic leading-none uppercase">Don't Miss Out</h3>
          </div>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full backdrop-blur-md transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 bg-white">
          <div className="mb-6">
             {loading ? (
                <div className="h-4 bg-gray-100 rounded w-3/4 animate-pulse mb-2"></div>
              ) : (
                <p className="text-primary font-medium text-lg italic leading-tight border-l-4 border-accent pl-3">
                  "{copy}"
                </p>
              )}
          </div>

          <div className="flex items-center gap-4 bg-gray-50 p-3 border border-gray-100 mb-6">
            <div className="h-16 w-16 bg-white border border-gray-200 shrink-0">
               <img src={recommendedProduct.image} alt="" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="font-display font-bold text-primary uppercase text-sm leading-tight">{recommendedProduct.name}</p>
              <p className="text-accent font-mono font-bold mt-1">₹{recommendedProduct.price}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="border-gray-200 text-gray-500 hover:text-primary hover:border-primary text-sm uppercase tracking-wide"
            >
              Skip It
            </Button>
            <Button 
              variant="primary"
              onClick={() => {
                onAddRecommendation(recommendedProduct);
                onClose();
              }}
              className="bg-primary hover:bg-accent text-white text-sm uppercase tracking-wide border-none"
            >
              Add to Garage
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};