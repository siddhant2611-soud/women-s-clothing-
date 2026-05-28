import { categories, newArrivalsCategories } from '../data';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function Categories() {
  return (
    <section id="new-arrivals" className="py-20 bg-zivara-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* New Arrivals Left Panel */}
          <div className="w-full lg:w-1/3 flex flex-col justify-center">
            <h2 className="font-playfair text-4xl font-bold text-zivara-black mb-6">This Week's<br/>Trending Styles</h2>
            <div className="flex flex-col gap-4 mb-8">
              {newArrivalsCategories.map((cat, idx) => (
                <div 
                  key={idx} 
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent('zivara:category', { detail: 'Trending Styles' }));
                    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex items-center gap-3 group cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4 text-zivara-gold group-hover:translate-x-2 transition-transform" />
                  <span className="font-poppins text-lg text-gray-700 group-hover:text-zivara-black font-medium transition-colors">{cat}</span>
                </div>
              ))}
            </div>
            <div>
              <button 
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('zivara:category', { detail: 'Trending Styles' }));
                  document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="border-b-2 border-zivara-black text-zivara-black font-poppins font-semibold pb-1 hover:text-zivara-gold hover:border-zivara-gold transition-colors"
              >
                View All Arrivals
              </button>
            </div>
          </div>

          {/* Categories Grid */}
          <div className="w-full lg:w-2/3">
            <div className="mb-6 flex justify-between items-end">
              <h3 className="font-playfair font-bold text-2xl text-zivara-black">Shop by Category</h3>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {categories.map((cat, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent('zivara:category', { detail: cat }));
                    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-white px-6 py-4 rounded-sm shadow-sm cursor-pointer border border-transparent hover:border-zivara-gold transition-colors flex-grow text-center"
                >
                  <span className="font-poppins font-medium text-zivara-black">{cat}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
