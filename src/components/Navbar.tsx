import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Search, User, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { cartCount, setIsCartOpen } = useCart();
  const { wishlist, setIsWishlistOpen } = useWishlist();
  const { user, setIsProfileOpen } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.dispatchEvent(new CustomEvent('zivara:search', { detail: searchQuery }));
      document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-zivara-white shadow-md py-3' : 'bg-zivara-beige/90 py-5 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center relative">
        {/* Mobile menu button */}
        <button 
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden text-zivara-black"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Logo */}
        <div className="flex flex-col items-center flex-1 md:flex-none">
          <h1 className="font-playfair font-bold text-2xl tracking-wide text-zivara-black uppercase">
            Zivara
          </h1>
          <p className="font-poppins text-[10px] tracking-[0.2em] text-zivara-gold uppercase hidden sm:block">
            Fashion Studio
          </p>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center font-poppins text-sm font-medium text-zivara-black">
          <a href="/#" className="hover:text-zivara-gold transition-colors">Home</a>
          <a href="/#shop" className="hover:text-zivara-gold transition-colors">Shop</a>
          <a href="/#new-arrivals" className="hover:text-zivara-gold transition-colors">Our Collection</a>
          <a href="/track" className="hover:text-zivara-gold transition-colors">Track Order</a>
          <a href="/#about" className="hover:text-zivara-gold transition-colors">About Us</a>
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-4 text-zivara-black">
          <button 
            onClick={() => setSearchOpen(true)}
            className="hover:text-zivara-gold transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setIsProfileOpen(true)}
            className="hover:text-zivara-gold transition-colors hidden sm:block relative"
          >
            {user ? (
              <div className="w-6 h-6 bg-zivara-beige rounded-full flex items-center justify-center border border-zivara-gold text-zivara-gold font-playfair font-bold text-xs">
                {user.name.charAt(0).toUpperCase()}
              </div>
            ) : (
              <User className="w-5 h-5" />
            )}
          </button>
          <button 
            onClick={() => setIsWishlistOpen(true)}
            className="hover:text-zivara-gold transition-colors relative"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-zivara-pink text-white text-[10px] font-bold w-4 h-4 flex flex-col justify-center items-center rounded-full">
                {wishlist.length}
              </span>
            )}
          </button>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="hover:text-zivara-gold transition-colors relative"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-zivara-pink text-white text-[10px] font-bold w-4 h-4 flex flex-col justify-center items-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Search Overlay */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute inset-0 bg-zivara-white z-50 flex items-center justify-between px-4 sm:px-0"
            >
              <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto flex items-center gap-4 border-b border-zivara-black pb-2">
                <Search className="w-5 h-5 text-gray-400" />
                <input 
                  type="text" 
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products, categories..."
                  className="w-full bg-transparent outline-none font-poppins text-lg"
                />
                <button type="button" onClick={() => setSearchOpen(false)} className="text-gray-400 hover:text-zivara-black">
                  <X className="w-6 h-6" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-[280px] bg-zivara-beige z-50 p-6 flex flex-col shadow-2xl"
            >
              <div className="flex justify-between items-center mb-10">
                <h1 className="font-playfair font-bold text-xl uppercase">Zivara</h1>
                <button onClick={() => setMobileMenuOpen(false)}><X className="w-6 h-6" /></button>
              </div>
              <nav className="flex flex-col gap-6 font-poppins text-lg text-zivara-black font-medium">
                <a href="/#" className="hover:text-zivara-gold" onClick={() => setMobileMenuOpen(false)}>Home</a>
                <a href="/#shop" className="hover:text-zivara-gold" onClick={() => setMobileMenuOpen(false)}>Shop</a>
                <a href="/#new-arrivals" className="hover:text-zivara-gold" onClick={() => setMobileMenuOpen(false)}>Our Collection</a>
                <a href="/track" className="hover:text-zivara-gold" onClick={() => setMobileMenuOpen(false)}>Track Order</a>
                <a href="/#about" className="hover:text-zivara-gold" onClick={() => setMobileMenuOpen(false)}>About Us</a>
                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsProfileOpen(true);
                  }}
                  className="flex items-center gap-2 hover:text-zivara-gold text-left mt-4 border-t border-zivara-gold/20 pt-6"
                >
                  <User className="w-5 h-5" />
                  {user ? 'My Profile' : 'Sign In / Register'}
                </button>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
