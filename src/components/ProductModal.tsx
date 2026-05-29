import { X, ShoppingBag, Check, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [addedItems, setAddedItems] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [errorLine, setErrorLine] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState<string>('');
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    if (isOpen) {
      setSelectedSize(null);
      setErrorLine(null);
      setAddedItems(false);
      if (product) {
        setActiveImage(product.imageUrl);
      }
    }
  }, [isOpen, product]);

  if (!product) return null;

  const handleBuyNow = () => {
    if (product.sizes && !selectedSize) {
      setErrorLine('Please select a size before adding to bag.');
      return;
    }

    addToCart(product, selectedSize || undefined);
    setAddedItems(true);
    setTimeout(() => {
      setAddedItems(false);
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-full md:w-[800px] h-full md:h-auto max-h-[100vh] md:max-h-[85vh] bg-zivara-white z-[60] overflow-y-auto flex flex-col md:flex-row shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 rounded-full text-zivara-black hover:bg-zivara-beige transition-colors shadow-sm"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image Section */}
            <div className="w-full md:w-1/2 relative bg-gray-100 min-h-[50vh] md:min-h-[500px] flex flex-col">
              <div className="flex-1 relative">
                <img
                  src={activeImage || product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover object-top absolute inset-0 md:relative"
                />
              </div>
              
              {/* Thumbnails */}
              {product.gallery && product.gallery.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 p-2 bg-white/80 backdrop-blur-md rounded-xl shadow-sm z-10 md:relative md:bottom-auto md:left-auto md:translate-x-0 md:bg-white md:p-4 md:rounded-none md:shadow-none md:flex-row md:overflow-x-auto">
                  {product.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`w-14 h-14 md:w-20 md:h-20 shrink-0 border-2 transition-all overflow-hidden rounded-md ${
                        activeImage === img ? 'border-zivara-black scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover object-top" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details Section */}
            <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col">
              <div className="mb-2">
                <span className="font-poppins text-xs font-semibold tracking-widest text-zivara-gold uppercase">
                  {product.category}
                </span>
              </div>
              <div className="flex justify-between items-start mb-3 gap-4">
                <h2 className="font-playfair text-3xl font-bold text-zivara-black">{product.name}</h2>
                <button 
                  onClick={() => toggleWishlist(product.id)}
                  className="p-2 -mt-2 -mr-2 text-gray-400 hover:text-zivara-pink transition-colors shrink-0"
                >
                  <Heart className={`w-6 h-6 ${isInWishlist(product.id) ? 'fill-zivara-pink text-zivara-pink' : ''}`} />
                </button>
              </div>
              <p className="font-poppins text-2xl font-semibold text-zivara-black mb-6">₹{product.price}</p>
              
              <div className="font-poppins text-sm text-gray-600 mb-8 leading-relaxed">
                {product.description}
              </div>

              {product.color && (
                <div className="mb-4">
                  <p className="font-poppins text-sm font-semibold text-zivara-black mb-1">Color</p>
                  <p className="font-poppins text-sm text-gray-600">{product.color}</p>
                </div>
              )}

              <div className="mb-6">
                 <p className="font-poppins text-sm font-semibold text-zivara-black mb-1">Fabric</p>
                 <p className="font-poppins text-sm text-gray-600">{product.fabric}</p>
              </div>

              {product.sizes && (
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-3">
                    <p className="font-poppins text-sm font-semibold text-zivara-black">Select Size</p>
                  </div>
                  <div className="flex gap-3 mb-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => {
                          setSelectedSize(size);
                          setErrorLine(null);
                        }}
                        className={`w-12 h-12 flex items-center justify-center font-poppins text-sm border transition-colors ${
                          selectedSize === size
                            ? 'border-zivara-black bg-zivara-black text-white'
                            : 'border-gray-200 text-gray-600 hover:border-zivara-black'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  {errorLine && (
                    <p className="font-poppins text-xs text-red-500">{errorLine}</p>
                  )}
                </div>
              )}

              <div className="mt-auto pt-6 flex flex-col gap-3">
                <button
                  onClick={handleBuyNow}
                  className={`w-full py-4 font-poppins font-medium flex items-center justify-center gap-2 transition-all ${
                    addedItems
                      ? 'bg-zivara-gold text-white'
                      : 'bg-zivara-black text-white hover:bg-zivara-black/80'
                  }`}
                >
                  {addedItems ? (
                    <>
                      <Check className="w-5 h-5" /> Added to Bag
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5" /> Buy Now
                    </>
                  )}
                </button>
                <p className="text-center font-poppins text-xs text-gray-500 mt-2">
                  Free shipping on orders above ₹1,999
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
