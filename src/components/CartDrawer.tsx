import React from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  // Reset form state when cart is closed
  const closeCart = () => {
    setIsCartOpen(false);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[500px] bg-white z-[70] shadow-2xl flex flex-col"
          >
            <div className="px-6 py-5 flex items-center justify-between border-b border-gray-100">
              <div className="flex items-center gap-3">
                <h2 className="font-playfair font-bold text-xl text-zivara-black flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5" /> Shopping Bag
                </h2>
              </div>
              <button 
                onClick={closeCart}
                className="p-2 text-gray-500 hover:text-zivara-black hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-500">
                  <ShoppingBag className="w-16 h-16 mb-4 text-gray-300" />
                  <p className="font-poppins text-lg font-medium text-zivara-black mb-1">Your bag is empty</p>
                  <p className="font-poppins text-sm text-center">Looks like you haven't added <br/> anything to your cart yet.</p>
                  <button 
                    onClick={closeCart}
                    className="mt-6 bg-zivara-black text-white px-6 py-3 font-poppins text-sm font-medium hover:bg-zivara-black/80 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-24 h-32 bg-gray-100 overflow-hidden flex-shrink-0 relative">
                        <img 
                          src={item.imageUrl} 
                          alt={item.name} 
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-playfair font-bold text-zivara-black text-lg leading-tight line-clamp-2 pr-4">{item.name}</h3>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-1 -mr-1"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        {item.size && (
                          <p className="font-poppins text-xs text-gray-500 mb-2">Size: <span className="uppercase">{item.size}</span></p>
                        )}
                        
                        <div className="mt-auto flex items-end justify-between">
                          <div className="flex items-center border border-gray-200">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:text-zivara-black transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 font-poppins text-sm text-center font-medium">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:text-zivara-black transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <p className="font-poppins font-semibold text-zivara-black">₹{item.price * item.quantity}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-gray-100 p-6 bg-gray-50 mt-auto">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-poppins text-gray-600">Total</span>
                  <span className="font-poppins font-bold text-xl text-zivara-black">₹{cartTotal}</span>
                </div>
                <p className="font-poppins text-xs text-center text-gray-500 mb-6">
                  Shipping & taxes calculated at checkout
                </p>
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-zivara-black text-white py-4 font-poppins font-medium hover:bg-zivara-black/80 transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" /> Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
