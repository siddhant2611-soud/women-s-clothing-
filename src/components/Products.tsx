import { useState, useEffect } from 'react';
import { products, categories } from '../data';
import { Eye, Heart, X, Star, ArrowLeftRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ProductModal from './ProductModal';
import { Product } from '../types';
import { useWishlist } from '../context/WishlistContext';

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('default');
  const [selectedFabric, setSelectedFabric] = useState<string>('All');
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [isCompareDrawerOpen, setIsCompareDrawerOpen] = useState(false);
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Extract unique fabrics dynamically from products
  const uniqueFabrics = Array.from(new Set(products.map(p => p.fabric))).sort();

  const toggleCompare = (product: Product) => {
    if (compareList.find(p => p.id === product.id)) {
      setCompareList(prev => prev.filter(p => p.id !== product.id));
    } else {
      if (compareList.length < 3) {
        setCompareList(prev => [...prev, product]);
      } else {
        // optionally replace last one or alert
        alert("You can only compare up to 3 products at a time.");
      }
    }
  };

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
      return (p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
             p.category.toLowerCase().includes(searchQuery.toLowerCase())) &&
             (selectedFabric === 'All' || p.fabric === selectedFabric);
    }
    // Fabric check
    if (selectedFabric !== 'All' && p.fabric !== selectedFabric) return false;
    
    // Category check
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Trending Styles') return p.badge === 'Trending';
    if (activeCategory === 'New Arrivals') return p.badge === 'New Arrival';
    if (activeCategory === 'Festive Collection') return p.category === 'Ethnic Sets' || p.category === 'Sarees';
    return p.category === activeCategory;
  }).sort((a, b) => {
    if (sortOrder === 'price-low') return a.price - b.price;
    if (sortOrder === 'price-high') return b.price - a.price;
    return 0;
  });

  return (
    <section id="shop" className="py-24 bg-zivara-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
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
        </motion.div>

        <div className="flex flex-col sm:flex-row justify-end items-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <label htmlFor="fabric-filter" className="font-poppins text-sm text-gray-600">Fabric:</label>
            <select
              id="fabric-filter"
              value={selectedFabric}
              onChange={(e) => setSelectedFabric(e.target.value)}
              className="font-poppins text-sm text-zivara-black border border-gray-200 rounded-md py-1.5 px-3 focus:outline-none focus:ring-1 focus:ring-zivara-black bg-white"
            >
              <option value="All">All Fabrics</option>
              {uniqueFabrics.map(fabric => (
                <option key={fabric} value={fabric}>{fabric}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <label htmlFor="price-sort" className="font-poppins text-sm text-gray-600">Sort by:</label>
            <select
              id="price-sort"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="font-poppins text-sm text-zivara-black border border-gray-200 rounded-md py-1.5 px-3 focus:outline-none focus:ring-1 focus:ring-zivara-black bg-white"
            >
              <option value="default">Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProducts.map((product, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: Math.min(idx * 0.1, 0.3) }}
              key={product.id} 
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] mb-6 overflow-hidden bg-gray-100">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                
                {product.inStock === false ? (
                  <div className="absolute top-4 left-4 text-xs font-poppins font-medium uppercase tracking-wider py-1 px-3 bg-red-500 text-white">
                    Out of Stock
                  </div>
                ) : product.badge && (
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
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCompare(product);
                  }}
                  className="absolute top-[88px] right-4 z-10 w-9 h-9 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-zivara-black hover:text-zivara-gold transition-colors opacity-0 group-hover:opacity-100"
                  title={compareList.find(p => p.id === product.id) ? "Remove from Compare" : "Compare"}
                >
                  <ArrowLeftRight className={`w-4 h-4 ${compareList.find(p => p.id === product.id) ? 'text-zivara-gold' : ''}`} />
                </button>
                
                <button 
                  onClick={() => setSelectedProduct(product)}
                  className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur text-zivara-black py-3 font-poppins font-medium flex justify-center items-center gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  {product.inStock === false ? (
                    'Out of Stock - Notify Me'
                  ) : (
                    <><Eye className="w-4 h-4" /> Quick View</>
                  )}
                </button>
              </div>
              
              <div>
                <p className="font-poppins text-xs text-gray-500 mb-1">{product.category}</p>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-playfair font-bold text-lg text-zivara-black group-hover:text-zivara-gold transition-colors">{product.name}</h3>
                  <span className="font-poppins font-semibold text-zivara-black text-lg">₹{product.price}</span>
                </div>
                <div className="flex items-center gap-1 text-zivara-gold mb-2">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="font-poppins text-xs font-medium text-zivara-black">4.8</span>
                  <span className="font-poppins text-xs text-gray-500">(124 Reviews)</span>
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
            </motion.div>
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

      <AnimatePresence>
        {compareList.length > 0 && !isCompareDrawerOpen && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-4 flex justify-between items-center"
          >
            <div className="max-w-7xl mx-auto w-full flex justify-between items-center px-4">
              <div className="flex items-center gap-4">
                <p className="font-poppins text-sm md:text-base font-medium text-zivara-black hidden sm:block">
                  {compareList.length} {compareList.length === 1 ? 'product' : 'products'} selected
                </p>
                <div className="flex gap-2">
                  {compareList.map(p => (
                    <div key={p.id} className="relative">
                      <img src={p.imageUrl} alt={p.name} className="w-10 h-10 object-cover rounded shadow-sm border border-gray-200" />
                      <button 
                        onClick={() => toggleCompare(p)}
                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <button 
                  onClick={() => setCompareList([])}
                  className="hidden sm:block text-sm font-poppins text-gray-500 hover:text-red-500 transition-colors"
                >
                  Clear All
                </button>
                <button 
                  onClick={() => setIsCompareDrawerOpen(true)}
                  disabled={compareList.length < 2 && compareList.length > 0}
                  className={`font-poppins text-xs md:text-sm font-medium px-4 md:px-6 py-2 rounded-md transition-colors ${compareList.length > 1 ? 'bg-zivara-black text-white hover:bg-black/80' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                >
                  {compareList.length < 2 ? 'Add 1 more' : 'Compare Now'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCompareDrawerOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCompareDrawerOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-xl shadow-2xl flex flex-col"
            >
              <div className="flex justify-between items-center p-4 border-b border-gray-100 shrink-0">
                <h3 className="font-playfair text-xl md:text-2xl font-bold text-zivara-black">Product Comparison</h3>
                <button 
                  onClick={() => setIsCompareDrawerOpen(false)}
                  className="p-2 text-gray-500 hover:text-black transition-colors rounded-full hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto w-full">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {compareList.map(p => (
                    <div key={p.id} className="flex flex-col gap-4">
                      <div className="relative aspect-[3/4] w-full rounded-md overflow-hidden bg-gray-100">
                        <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover object-top" />
                        <button 
                          onClick={() => {
                            toggleCompare(p);
                            if (compareList.length <= 2) setIsCompareDrawerOpen(false);
                          }}
                          className="absolute top-2 right-2 bg-white/80 p-1.5 rounded-full text-gray-600 hover:text-red-500 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div>
                        <p className="font-poppins text-xs text-gray-500 mb-1">{p.category}</p>
                        <h4 className="font-playfair font-bold text-lg text-zivara-black">{p.name}</h4>
                        <p className="font-poppins font-semibold text-lg text-zivara-black my-1">₹{p.price}</p>
                      </div>
                      
                      <div className="border-t border-gray-100 pt-3 flex flex-col gap-2">
                        <div>
                          <span className="font-poppins text-xs font-semibold text-gray-700 block mb-1">Fabric</span>
                          <span className="font-poppins text-sm text-zivara-black">{p.fabric}</span>
                        </div>
                        {p.sizes && (
                          <div>
                            <span className="font-poppins text-xs font-semibold text-gray-700 block mb-1">Sizes available</span>
                            <div className="flex gap-1 flex-wrap">
                              {p.sizes.map(size => (
                                <span key={size} className="text-xs border border-gray-200 px-1.5 py-0.5 rounded text-gray-600 uppercase">{size}</span>
                              ))}
                            </div>
                          </div>
                        )}
                        {p.color && (
                          <div>
                            <span className="font-poppins text-xs font-semibold text-gray-700 block mb-1">Color</span>
                            <span className="font-poppins text-sm text-zivara-black">{p.color}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
