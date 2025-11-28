import React, { useState } from 'react';
import { PRODUCTS } from './constants';
import { Product, CartItem } from './types';
import { ProductCard } from './components/ProductCard';
import { Cart } from './components/Cart';
import { IndulgeModal } from './components/IndulgeModal';
import { ShoppingBag, Search, Menu, Zap, Instagram, Twitter } from 'lucide-react';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Upsell Logic State
  const [showUpsell, setShowUpsell] = useState(false);
  const [lastAddedProduct, setLastAddedProduct] = useState<Product | null>(null);
  const [recommendedProduct, setRecommendedProduct] = useState<Product | null>(null);

  const addToCart = (product: Product, isUpsell: boolean = false) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    if (!isUpsell && Math.random() > 0.4) { 
      const potentialRecommendations = PRODUCTS.filter(p => p.id !== product.id);
      const randomRec = potentialRecommendations[Math.floor(Math.random() * potentialRecommendations.length)];
      
      setLastAddedProduct(product);
      setRecommendedProduct(randomRec);
      setShowUpsell(true);
    }
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean) as CartItem[];
    });
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-30 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded md:hidden">
                <Menu size={24} />
              </button>
              <div className="flex items-center gap-1 group cursor-pointer">
                <Zap className="text-accent fill-accent" size={28} />
                <h1 className="font-display text-3xl font-black tracking-tighter italic text-primary uppercase group-hover:text-accent transition-colors">Blazekart<span className="text-accent">.</span></h1>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-gray-500">
              <a href="#" className="hover:text-accent transition-colors">Drops</a>
              <a href="#" className="hover:text-accent transition-colors">Premium</a>
              <a href="#" className="text-primary border-b-2 border-accent">Showroom</a>
              <a href="#" className="hover:text-accent transition-colors">Community</a>
            </div>

            <div className="flex items-center gap-1">
              <button className="p-3 hover:bg-gray-100 rounded-full text-primary transition-colors">
                <Search size={22} strokeWidth={2.5} />
              </button>
              <button 
                className="p-3 hover:bg-gray-100 rounded-full text-primary transition-colors relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingBag size={22} strokeWidth={2.5} />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 h-5 w-5 flex items-center justify-center bg-accent text-white text-[10px] font-bold rounded-full border-2 border-white">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-20">
        <div className="relative h-[85vh] w-full bg-black overflow-hidden flex items-center">
          <img 
            src="https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=1920" 
            alt="Hero Background" 
            className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-[2s]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30" />
          
          <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
            <div className="max-w-3xl">
              <div className="inline-block bg-accent text-white px-4 py-1 text-sm font-bold uppercase tracking-widest mb-6 skew-x-[-12deg]">
                <span className="skew-x-[12deg] inline-block">New Drop Alerts</span>
              </div>
              <h2 className="text-white font-display text-6xl md:text-8xl font-black uppercase italic leading-[0.9] mb-8 tracking-tighter">
                Fuel Your <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Obsession</span>
              </h2>
              <p className="text-gray-300 text-lg md:text-xl max-w-lg mb-10 font-medium border-l-4 border-accent pl-6">
                The premier destination for JDM legends, American muscle, and exotic hypercars. 1:64 scale. 100% Authentic.
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-accent text-white px-10 py-4 font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_30px_rgba(255,62,0,0.3)] clip-path-slant"
                >
                  Start Hunting
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Product Grid */}
      <main id="shop" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-offwhite">
        <div className="flex items-end justify-between mb-16 border-b-2 border-primary pb-4">
          <div>
            <span className="text-accent font-bold uppercase tracking-widest text-sm">Latest Arrivals</span>
            <h3 className="font-display text-5xl font-black text-primary uppercase italic tracking-tighter">The Showroom</h3>
          </div>
          <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">{PRODUCTS.length} Models Loaded</div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {PRODUCTS.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAdd={addToCart} 
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white pt-24 pb-12 border-t-4 border-accent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            <div className="md:col-span-5">
              <div className="flex items-center gap-2 mb-6">
                <Zap className="text-accent fill-accent" size={32} />
                <h4 className="font-display text-4xl font-black italic tracking-tighter uppercase">Blazekart.</h4>
              </div>
              <p className="text-gray-400 font-medium max-w-sm mb-8">
                We don't just sell cars; we sell the culture. Dedicated to the hunters, the customizers, and the keepers of the flame.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-secondary flex items-center justify-center hover:bg-accent transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="w-10 h-10 bg-secondary flex items-center justify-center hover:bg-accent transition-colors">
                  <Twitter size={20} />
                </a>
              </div>
            </div>
            
            <div className="md:col-span-3">
              <h5 className="font-bold mb-6 uppercase tracking-widest text-sm text-accent">Support</h5>
              <ul className="space-y-4 text-gray-400 font-medium text-sm">
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-accent rounded-full"></span>Track Order</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-accent rounded-full"></span>Shipping Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-accent rounded-full"></span>Authenticity Guarantee</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-accent rounded-full"></span>Returns</a></li>
              </ul>
            </div>

            <div className="md:col-span-4">
              <h5 className="font-bold mb-6 uppercase tracking-widest text-sm text-accent">Join The Club</h5>
              <p className="text-gray-400 text-sm font-medium mb-4">Get early access to RLC exclusives and restock alerts.</p>
              <div className="flex">
                <input type="email" placeholder="EMAIL ADDRESS" className="bg-secondary px-4 py-3 w-full outline-none text-white placeholder-gray-600 font-bold uppercase text-sm" />
                <button className="bg-accent px-6 text-white font-bold uppercase hover:bg-white hover:text-accent transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 font-bold uppercase tracking-widest">
            <p>&copy; 2024 Blazekart India. All rights reserved.</p>
            <p className="mt-2 md:mt-0">Built for speed.</p>
          </div>
        </div>
      </footer>

      {/* Cart Sidebar */}
      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart} 
        onUpdateQuantity={updateQuantity}
      />

      {/* AI Indulge Modal */}
      <IndulgeModal 
        isOpen={showUpsell}
        onClose={() => setShowUpsell(false)}
        triggerProduct={lastAddedProduct}
        recommendedProduct={recommendedProduct}
        onAddRecommendation={(p) => addToCart(p, true)}
      />
    </div>
  );
};

export default App;