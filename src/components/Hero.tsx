import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-screen bg-zivara-beige flex items-center pt-16 overflow-hidden">
      {/* Decorative element background */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] bg-zivara-gold/10 rounded-full blur-3xl" />
      <div className="absolute top-0 -left-10 w-[400px] h-[400px] bg-zivara-pink/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row items-center gap-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 text-center md:text-left"
        >
          <span className="font-poppins text-xs sm:text-sm font-semibold tracking-widest text-zivara-gold uppercase mb-4 block">
            Festive Elegance Starts Here
          </span>
          <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold text-zivara-black leading-tight mb-6">
            Style That <br /> Feels Like You
          </h1>
          <p className="font-poppins text-gray-700 text-lg md:text-xl mb-10 max-w-lg mx-auto md:mx-0">
            Discover elegant kurtis, co-ord sets, sarees, dresses, and festive collections designed for modern Indian women.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button 
              onClick={() => {
                window.dispatchEvent(new CustomEvent('zivara:category', { detail: 'All' }));
                document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-zivara-black text-zivara-white font-poppins font-medium px-8 py-3.5 flex items-center justify-center gap-2 hover:bg-zivara-black/80 transition-colors group"
            >
              Shop Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => {
                window.dispatchEvent(new CustomEvent('zivara:category', { detail: 'New Arrivals' }));
                document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-transparent border border-zivara-black text-zivara-black font-poppins font-medium px-8 py-3.5 hover:bg-zivara-black hover:text-zivara-white transition-colors"
            >
              New Arrivals
            </button>
            <button 
              onClick={() => {
                window.dispatchEvent(new CustomEvent('zivara:category', { detail: 'Festive Collection' }));
                document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-transparent border border-zivara-gold text-zivara-gold font-poppins font-medium px-8 py-3.5 hover:bg-zivara-gold hover:text-zivara-white transition-colors"
            >
              Festive Collection
            </button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex-1 w-full max-w-md md:max-w-none relative hidden md:block"
        >
          <div className="relative aspect-[3/4] rounded-t-full overflow-hidden border-8 border-white shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1583391733958-6c5826ea1694?q=80&w=1000&auto=format&fit=crop" 
              alt="Elegant Indian Woman in beautiful attire" 
              className="w-full h-full object-cover object-top"
            />
          </div>
          {/* Accent decoration */}
          <div className="absolute -bottom-6 -left-6 bg-zivara-white p-6 shadow-xl rounded-lg">
            <p className="font-playfair text-3xl font-bold text-zivara-gold">100%</p>
            <p className="font-poppins text-xs font-semibold uppercase tracking-wider">Premium Fabric</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
