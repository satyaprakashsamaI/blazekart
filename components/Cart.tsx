import React, { useMemo, useState, useEffect } from 'react';
import { CartItem } from '../types';
import { WHATSAPP_NUMBER, REWARD_TIERS } from '../constants';
import { X, ShoppingBag, Minus, Plus, MessageCircle, Lock, Unlock, Clock } from 'lucide-react';
import { Button } from './Button';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
}

export const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onUpdateQuantity }) => {
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

  const total = useMemo(() => items.reduce((sum, item) => sum + (item.price * item.quantity), 0), [items]);

  // Reset timer when cart opens
  useEffect(() => {
    if (isOpen) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isOpen]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Progress Bar Logic
  const maxTier = REWARD_TIERS[REWARD_TIERS.length - 1].amount;
  const progressPercentage = Math.min((total / maxTier) * 100, 100);
  
  const nextUnlock = REWARD_TIERS.find(tier => total < tier.amount);
  const unlockedRewards = REWARD_TIERS.filter(tier => total >= tier.amount);

  const handleCheckout = () => {
    if (items.length === 0) return;

    const itemsList = items.map(item => `- ${item.quantity}x ${item.name} (₹${item.price * item.quantity})`).join('\n');
    
    let bonusText = "";
    if (unlockedRewards.length > 0) {
      bonusText = "\n\n🎁 UNLOCKED BONUSES:\n" + unlockedRewards.map(r => `✅ ${r.label}`).join('\n');
    }

    const message = `Yo Blazekart! 🔥 I want to cop these before the timer runs out:\n\n${itemsList}\n\nTotal Damage: ₹${total}${bonusText}\n\nHit me up for shipping!`;
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    window.open(url, '_blank');
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white z-50 shadow-2xl transform transition-transform duration-500 cubic-bezier(0.25, 1, 0.5, 1) ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white">
            <h2 className="font-display text-3xl font-bold uppercase italic tracking-wider">The Garage</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X size={24} />
            </button>
          </div>

          {/* Urgency Banner */}
          <div className="bg-primary text-white py-2 px-6 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest animate-pulse">
            <Clock size={14} />
            Cart reserved for {formatTime(timeLeft)}
          </div>

          {/* Progress Meter */}
          <div className="p-6 bg-gray-50 border-b border-gray-100">
            <div className="flex justify-between text-xs font-bold uppercase mb-2">
              <span className="text-gray-500">Progress to Max Hype</span>
              <span className="text-accent">{Math.round(progressPercentage)}%</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden mb-4 relative">
              <div 
                className="h-full bg-gradient-to-r from-orange-400 to-red-600 transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
              {/* Ticks */}
              {REWARD_TIERS.map((tier) => (
                <div 
                  key={tier.amount} 
                  className="absolute top-0 w-0.5 h-full bg-white opacity-50 z-10"
                  style={{ left: `${(tier.amount / maxTier) * 100}%` }}
                />
              ))}
            </div>
            
            <div className="text-center">
              {nextUnlock ? (
                <p className="text-sm font-medium">
                  Add <span className="text-accent font-bold font-mono">₹{nextUnlock.amount - total}</span> to unlock <span className="font-bold uppercase text-primary">{nextUnlock.label} {nextUnlock.emoji}</span>
                </p>
              ) : (
                <p className="text-sm font-bold text-green-600 uppercase flex items-center justify-center gap-1">
                  <Unlock size={14} /> All Rewards Unlocked! Maximum Heat 🔥
                </p>
              )}
            </div>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-offwhite">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                <ShoppingBag size={48} className="opacity-20" />
                <p className="font-display text-xl uppercase text-gray-300">Garage Empty</p>
                <Button variant="outline" onClick={onClose}>Go Shopping</Button>
              </div>
            ) : (
              items.map(item => (
                <div key={item.id} className="flex gap-4 bg-white p-3 rounded-lg shadow-sm border border-gray-100 relative overflow-hidden group">
                  <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-display font-semibold text-primary uppercase leading-none mb-1">{item.name}</h3>
                      <p className="text-xs text-gray-500 font-bold tracking-wider">{item.category}</p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-3 bg-gray-100 rounded px-2 py-1">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="w-5 h-5 flex items-center justify-center rounded bg-white shadow-sm hover:text-accent transition-colors disabled:opacity-50"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-sm font-bold w-4 text-center font-mono">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="w-5 h-5 flex items-center justify-center rounded bg-white shadow-sm hover:text-accent transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <p className="font-bold font-mono text-accent">₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
            
            {/* Unlocked Rewards Display */}
            {items.length > 0 && unlockedRewards.length > 0 && (
              <div className="space-y-2 pt-4 border-t border-gray-200 border-dashed">
                <h4 className="text-xs font-bold uppercase text-gray-400 tracking-wider mb-2">Unlocked Bonuses</h4>
                {unlockedRewards.map(tier => (
                  <div key={tier.amount} className="flex items-center gap-3 bg-green-50 p-2 rounded border border-green-100 text-green-800">
                    <span className="text-lg">{tier.emoji}</span>
                    <span className="text-sm font-bold uppercase">{tier.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-6 border-t border-gray-100 bg-white shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
              <div className="flex items-center justify-between mb-6">
                <span className="text-gray-500 font-medium uppercase tracking-wider text-sm">Total Value</span>
                <span className="font-display text-3xl font-bold text-primary">₹{total}</span>
              </div>
              <Button fullWidth onClick={handleCheckout} className="bg-[#25D366] hover:bg-[#128C7E] text-white shadow-none hover:shadow-lg">
                <MessageCircle size={20} />
                Checkout on WhatsApp
              </Button>
              <p className="text-center text-[10px] uppercase tracking-widest text-gray-400 mt-4">
                Secure orders via Official WhatsApp
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};