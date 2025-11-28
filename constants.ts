import { Product } from './types';

export const WHATSAPP_NUMBER = "919981187267";

export const REWARD_TIERS = [
  { amount: 1500, label: 'Free Shipping', emoji: '🚚' },
  { amount: 3000, label: 'Mystery Decal Pack', emoji: '🎁' },
  { amount: 5000, label: 'Acrylic Protector Case', emoji: '🛡️' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'hw1',
    name: 'Nissan Skyline GT-R (R34)',
    price: 1299,
    category: 'JDM Legends',
    image: 'https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?auto=format&fit=crop&q=80&w=800',
    description: 'The Godzilla of the streets. Premium die-cast finish with authentic Nismo detailing.'
  },
  {
    id: 'hw2',
    name: 'Porsche 911 GT3 RS',
    price: 999,
    category: 'Euro Speed',
    image: 'https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&q=80&w=800',
    description: 'Track focused precision. Vibrant Lava Orange paint job with adjustable aero wing.'
  },
  {
    id: 'hw3',
    name: 'Bone Shaker™',
    price: 499,
    category: 'Originals',
    image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&q=80&w=800',
    description: 'The ultimate bad-to-the-bone hot rod. Open roof and skull grille for maximum attitude.'
  },
  {
    id: 'hw4',
    name: "'69 Ford Mustang Boss",
    price: 899,
    category: 'Muscle',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800',
    description: 'American muscle heritage. Matte black hood stripe and shaker scoop.'
  },
  {
    id: 'hw5',
    name: 'McLaren Solus GT',
    price: 1499,
    category: 'Hypercars',
    image: 'https://images.unsplash.com/photo-1621689823860-2624dfdf4149?auto=format&fit=crop&q=80&w=800',
    description: 'Future of speed. Vision Gran Turismo concept brought to life in 1:64 scale.'
  },
  {
    id: 'hw6',
    name: 'Cyberpunk Hauler',
    price: 799,
    category: 'Trucks',
    image: 'https://images.unsplash.com/photo-1605218427306-022ba655331e?auto=format&fit=crop&q=80&w=800',
    description: 'Heavy duty transport with a neon dystopian twist. Ready for the night city.'
  },
  {
    id: 'hw7',
    name: 'Twin Mill™ III',
    price: 549,
    category: 'Originals',
    image: 'https://images.unsplash.com/photo-1532906619279-a787609a6745?auto=format&fit=crop&q=80&w=800',
    description: 'Dual engine beast. The iconic silhouette that started it all, re-engineered.'
  },
  {
    id: 'hw8',
    name: 'Liberty Walk GTR',
    price: 1699,
    category: 'Customs',
    image: 'https://images.unsplash.com/photo-1594071844243-7313009a2731?auto=format&fit=crop&q=80&w=800',
    description: 'Widebody perfection. LBWK signature flares and deep dish rims.'
  }
];