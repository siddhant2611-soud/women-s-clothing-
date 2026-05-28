import { X, Heart, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export default function WishlistDrawer() {
  const { wishlistItems, isWishlistOpen, setIsWishlistOpen, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsWishlistOpen(false)}
            className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[70] shadow-2xl flex flex-col"
          >
            <div className="px-6 py-5 flex items-center justify-between border-b border-gray-100">
              <h2 className="font-playfair font-bold text-xl text-zivara-black flex items-center gap-2">
                <Heart className="w-5 h-5" /> Wishlist
              </h2>
              <button 
                onClick={() => setIsWishlistOpen(false)}
                className="p-2 text-gray-500 hover:text-zivara-black hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {wishlistItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-500">
                  <Heart className="w-16 h-16 mb-4 text-gray-300" />
                  <p className="font-poppins text-lg font-medium text-zivara-black mb-1">Your wishlist is empty</p>
                  <p className="font-poppins text-sm text-center">Save items you love to <br/> buy them later.</p>
                  <button 
                    onClick={() => setIsWishlistOpen(false)}
                    className="mt-6 border border-zivara-black text-zivara-black px-6 py-3 font-poppins text-sm font-medium hover:bg-zivara-black hover:text-white transition-colors"
                  >
                    Explore Products
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {wishlistItems.map((item) => (
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
                            onClick={() => toggleWishlist(item.id)}
                            className="text-red-500 hover:text-red-600 transition-colors p-1 -mr-1"
                          >
                            <Heart className="w-4 h-4 fill-current" />
                          </button>
                        </div>
                        <p className="font-poppins font-semibold text-zivara-black mb-2">₹{item.price}</p>
                        
                        <div className="mt-auto">
                          <button 
                            onClick={() => {
                              addToCart(item);
                              toggleWishlist(item.id);
                            }}
                            className="w-full py-2 flex justify-center items-center gap-2 border border-zivara-black text-zivara-black font-poppins text-xs font-medium hover:bg-zivara-black hover:text-white transition-colors"
                          >
                            <ShoppingBag className="w-3 h-3" /> Move to Bag
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
