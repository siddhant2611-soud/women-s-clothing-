import { useState, useEffect } from 'react';
import { products, categories } from '../data';
import { Eye, Heart, X } from 'lucide-react';
import ProductModal from './ProductModal';
import { Product } from '../types';
import { useWishlist } from '../context/WishlistContext';

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const handleCategorySelect = (e: CustomEvent) => {
      setActiveCategory(e.detail);
      setSearchQuery('');
    };
    
    const handleSearch = (e: CustomEvent) => {
      setSearchQuery(e.detail);
      setActiveCategory('All');
    };

    window.addEventListener('zivara:category', handleCategorySelect as EventListener);
    window.addEventListener('zivara:search', handleSearch as EventListener);

    return () => {
      window.removeEventListener('zivara:category', handleCategorySelect as EventListener);
      window.removeEventListener('zivara:search', handleSearch as EventListener);
    };
  }, []);

  const filteredProducts = products.filter(p => {
    // Search check
    if (searchQuery) {
      return p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
             p.category.toLowerCase().includes(searchQuery.toLowerCase());
    }
    // Category check
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Trending Styles') return p.badge === 'Trending';
    if (activeCategory === 'New Arrivals') return p.badge === 'New Arrival';
    if (activeCategory === 'Festive Collection') return p.category === 'Ethnic Sets' || p.category === 'Sarees';
    return p.category === activeCategory;
  });

  return (
    <section id="shop" className="py-24 bg-zivara-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="font-poppins text-sm font-semibold tracking-widest text-zivara-gold uppercase mb-2">Our Collection</p>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-zivara-black mb-8">
            {searchQuery ? 'Search Results' : 'Shop by Category'}
          </h2>
          
          {searchQuery ? (
            <div className="flex justify-center items-center gap-4 mb-8">
              <span className="font-poppins text-gray-600 bg-gray-100 px-4 py-2 rounded-full">
                Searching for: <strong>{searchQuery}</strong>
              </span>
              <button 
                onClick={() => setSearchQuery('')}
                className="text-gray-400 hover:text-zivara-black transition-colors"
                title="Clear Search"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
              <button
                onClick={() => setActiveCategory('All')}
                className={`px-6 py-2 rounded-full font-poppins text-sm font-medium transition-colors ${
                  activeCategory === 'All' 
                    ? 'bg-zivara-black text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveCategory('Trending Styles')}
                className={`px-6 py-2 rounded-full font-poppins text-sm font-medium transition-colors ${
                  activeCategory === 'Trending Styles' 
                    ? 'bg-zivara-black text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Trending Styles
              </button>
              <button
                onClick={() => setActiveCategory('New Arrivals')}
                className={`px-6 py-2 rounded-full font-poppins text-sm font-medium transition-colors ${
                  activeCategory === 'New Arrivals' 
                    ? 'bg-zivara-black text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                New Arrivals
              </button>
              <button
                onClick={() => setActiveCategory('Festive Collection')}
                className={`px-6 py-2 rounded-full font-poppins text-sm font-medium transition-colors ${
                  activeCategory === 'Festive Collection' 
                    ? 'bg-zivara-black text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Festive Collection
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 rounded-full font-poppins text-sm font-medium transition-colors ${
                    activeCategory === cat 
                      ? 'bg-zivara-black text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              <div className="relative aspect-[4/5] mb-6 overflow-hidden bg-gray-100">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                
                {product.badge && (
                  <div className={`absolute top-4 left-4 text-xs font-poppins font-medium uppercase tracking-wider py-1 px-3 ${product.badge === 'Bestseller' ? 'bg-zivara-black text-white' : 'bg-zivara-pink text-white'}`}>
                    {product.badge}
                  </div>
                )}
                <div className="absolute top-4 right-4 z-10 opacity-100 transition-opacity duration-300">
                  <span className="bg-black/60 backdrop-blur-md text-white text-[9px] uppercase tracking-wider px-2 py-1 rounded-sm font-medium shadow-sm flex items-center gap-1">
                    <span className="w-1 h-1 bg-green-400 rounded-full"></span> COD Available
                  </span>
                </div>
                

                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product.id);
                  }}
                  className="absolute top-12 right-4 z-10 w-9 h-9 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-zivara-black hover:text-zivara-pink transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-zivara-pink text-zivara-pink' : ''}`} />
                </button>
                
                <button 
                  onClick={() => setSelectedProduct(product)}
                  className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur text-zivara-black py-3 font-poppins font-medium flex justify-center items-center gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <Eye className="w-4 h-4" /> Quick View
                </button>
              </div>
              
              <div>
                <p className="font-poppins text-xs text-gray-500 mb-1">{product.category}</p>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-playfair font-bold text-lg text-zivara-black group-hover:text-zivara-gold transition-colors">{product.name}</h3>
                  <span className="font-poppins font-semibold text-zivara-black text-lg">₹{product.price}</span>
                </div>
                <div className="flex items-center gap-4 text-sm font-poppins text-gray-500">
                  <span>{product.fabric}</span>
                  {product.sizes && (
                    <span className="flex gap-1.5">
                      {product.sizes.map(size => (
                        <span key={size} className="uppercase">{size}</span>
                      ))}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
          {filteredProducts.length === 0 && (
            <div className="col-span-full py-20 text-center text-gray-500 font-poppins">
              No products found matching your criteria.
            </div>
          )}
        </div>
      </div>

      <ProductModal 
        product={selectedProduct}
        isOpen={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
}
