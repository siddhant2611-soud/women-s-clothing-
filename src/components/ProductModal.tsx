import { X, ShoppingBag, Check, Heart, ZoomIn, ZoomOut, Share2, Star, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import SizeGuideModal from './SizeGuideModal';

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
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [reviewName, setReviewName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [notifyEmail, setNotifyEmail] = useState('');
  const [isNotified, setIsNotified] = useState(false);
  const [isMagnifying, setIsMagnifying] = useState(false);
  const [magnifyPos, setMagnifyPos] = useState({ x: 50, y: 50 });
  const [localReviews, setLocalReviews] = useState<{name: string, text: string, date: string}[]>([
    { name: 'Priya M.', text: 'Absolutely loved the quality and fit!', date: '2 days ago' }
  ]);
  const { addToCart, showToast } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    if (isOpen) {
      setSelectedSize(null);
      setErrorLine(null);
      setAddedItems(false);
      setZoomLevel(1);
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

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (notifyEmail) {
      setIsNotified(true);
      setNotifyEmail('');
      setTimeout(() => {
        setIsNotified(false);
      }, 3000);
    }
  };

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.5, 3));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.5, 1));

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewText.trim()) return;
    
    setLocalReviews([{
      name: reviewName,
      text: reviewText,
      date: 'Just now'
    }, ...localReviews]);
    setReviewName('');
    setReviewText('');
    setIsWritingReview(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMagnifyPos({ x, y });
  };

  const handleShare = async () => {
    if (!product) return;
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Zivara - ${product.name}`,
          text: `Check out ${product.name} on Zivara!`,
          url: url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        showToast('Link copied to clipboard!');
      }
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        showToast('Failed to share');
      }
    }
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
            <div className="w-full md:w-1/2 relative bg-gray-100 min-h-[50vh] md:min-h-[500px] flex flex-col group">
              <div 
                className="flex-1 relative overflow-hidden"
                onMouseEnter={() => setIsMagnifying(true)}
                onMouseLeave={() => setIsMagnifying(false)}
                onMouseMove={handleMouseMove}
              >
                <motion.img
                  animate={{ scale: isMagnifying ? 2.5 : zoomLevel }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  style={{ 
                    transformOrigin: isMagnifying ? `${magnifyPos.x}% ${magnifyPos.y}%` : '50% 0%' 
                  }}
                  src={activeImage || product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover object-top absolute inset-0 md:relative pointer-events-none"
                />
                
                {/* Zoom Controls */}
                <div className="absolute top-4 left-4 flex flex-col gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={handleZoomIn} className="p-2 bg-white/80 rounded-full text-zivara-black hover:bg-white shadow-sm transition-colors">
                    <ZoomIn className="w-5 h-5" />
                  </button>
                  <button onClick={handleZoomOut} disabled={zoomLevel === 1} className="p-2 bg-white/80 rounded-full text-zivara-black hover:bg-white shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    <ZoomOut className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              {/* Thumbnails */}
              {product.gallery && product.gallery.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 p-2 bg-white/80 backdrop-blur-md rounded-xl shadow-sm z-10 md:relative md:bottom-auto md:left-auto md:translate-x-0 md:bg-white md:p-4 md:rounded-none md:shadow-none md:flex-row md:overflow-x-auto">
                  {product.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setActiveImage(img);
                        setZoomLevel(1);
                      }}
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
                <div className="flex gap-2 shrink-0 -mt-2 -mr-2">
                  <button 
                    onClick={handleShare}
                    className="p-2 text-gray-400 hover:text-black transition-colors"
                  >
                    <Share2 className="w-6 h-6" />
                  </button>
                  <button 
                    onClick={() => toggleWishlist(product.id)}
                    className="p-2 text-gray-400 hover:text-zivara-pink transition-colors"
                  >
                    <Heart className={`w-6 h-6 ${isInWishlist(product.id) ? 'fill-zivara-pink text-zivara-pink' : ''}`} />
                  </button>
                </div>
              </div>
              <div className="flex items-end gap-3 mb-6">
                <p className="font-poppins text-2xl font-semibold text-zivara-black">₹{product.price}</p>
                {product.originalPrice && (
                  <p className="font-poppins text-lg text-gray-500 line-through mb-0.5">₹{product.originalPrice}</p>
                )}
              </div>
              
              <div className="font-poppins text-sm text-gray-600 mb-8 leading-relaxed">
                {product.description}
              </div>

              {/* Star Rating and Reviews Summary */}
              <div className="mb-6 pb-6 border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1 text-zivara-gold">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="font-poppins text-sm font-semibold text-zivara-black">4.8 / 5</span>
                    <span className="font-poppins text-sm text-gray-500 hover:text-zivara-black cursor-pointer underline underline-offset-2 transition-colors">({123 + localReviews.length} Reviews)</span>
                  </div>
                  <button 
                    onClick={() => setIsWritingReview(!isWritingReview)}
                    className="font-poppins text-xs font-semibold text-zivara-black underline underline-offset-2"
                  >
                    {isWritingReview ? 'Cancel Review' : 'Write a Review'}
                  </button>
                </div>

                {isWritingReview && (
                  <form onSubmit={handleReviewSubmit} className="mb-4 bg-gray-50 p-4 rounded-lg flex flex-col gap-3">
                    <input 
                      type="text" 
                      placeholder="Your Name" 
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                      required
                      className="w-full bg-white border border-gray-200 rounded-md font-poppins text-sm px-3 py-2 text-zivara-black focus:outline-none focus:border-zivara-black"
                    />
                    <textarea 
                      placeholder="Write your review here..."
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      required
                      rows={3}
                      className="w-full bg-white border border-gray-200 rounded-md font-poppins text-sm px-3 py-2 text-zivara-black focus:outline-none focus:border-zivara-black resize-none"
                    />
                    <button type="submit" className="bg-zivara-black text-white font-poppins text-sm font-medium py-2 rounded-md hover:bg-zivara-black/80 transition-colors">
                      Submit Review
                    </button>
                  </form>
                )}

                <div className="space-y-3">
                  {localReviews.map((review, idx) => (
                    <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-poppins font-medium text-sm text-zivara-black overflow-hidden text-ellipsis whitespace-nowrap mr-2">"{review.text}"</span>
                        <span className="font-poppins text-xs text-gray-500 shrink-0">{review.date}</span>
                      </div>
                      <p className="font-poppins text-xs text-gray-600">- {review.name}</p>
                    </div>
                  ))}
                </div>
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
                    <button 
                      onClick={() => setIsSizeGuideOpen(true)}
                      className="font-poppins text-sm text-gray-500 hover:text-zivara-black underline underline-offset-2 transition-colors"
                    >
                      Size Guide
                    </button>
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
                {product.inStock === false ? (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                    <p className="font-poppins text-sm font-medium text-red-500 mb-3 flex items-center gap-2">
                       This item is currently out of stock.
                    </p>
                    {isNotified ? (
                      <p className="text-sm font-poppins text-green-600 font-medium flex items-center gap-2">
                        <Check className="w-5 h-5" /> We will notify you!
                      </p>
                    ) : (
                      <form onSubmit={handleNotifySubmit} className="flex flex-col gap-3">
                        <p className="text-xs font-poppins text-gray-500">
                          Enter your email to receive a notification when it's back.
                        </p>
                        <div className="flex gap-2">
                          <input 
                            type="email"
                            required
                            placeholder="Email address"
                            className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm font-poppins focus:outline-none focus:border-zivara-black"
                            value={notifyEmail}
                            onChange={(e) => setNotifyEmail(e.target.value)}
                          />
                          <button 
                            type="submit"
                            className="bg-zivara-black text-white px-4 py-2 rounded-md hover:bg-black/80 transition-colors flex items-center gap-2"
                          >
                            <Bell className="w-4 h-4" /> Notify Me
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                ) : (
                  <>
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
                  </>
                )}
              </div>
            </div>
          </motion.div>
          <SizeGuideModal isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />
        </>
      )}
    </AnimatePresence>
  );
}
