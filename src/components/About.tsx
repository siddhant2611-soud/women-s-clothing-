import { CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function About() {
  const values = [
    'Premium Quality Fabrics',
    'Affordable Pricing',
    'Fast Delivery Across India',
    'Easy Returns',
    'Trendy Designs Updated Weekly',
    'Comfortable Fits for All Body Types'
  ];

  return (
    <section id="about" className="py-24 bg-zivara-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-16">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex-1 relative"
          >
            <div className="aspect-[4/5] w-full max-w-md mx-auto">
              <img 
                src="/images/about_section_img_1780041255374.png" 
                alt="Zivara Collection Quality Detail" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-zivara-beige -z-10 rounded-full" />
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-zivara-pink/20 -z-10 rounded-full blur-2xl" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1"
          >
            <p className="font-poppins text-sm font-semibold tracking-widest text-zivara-gold uppercase mb-2">About Us</p>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-zivara-black mb-6">
              Modern Fashion with <br /> Traditional Roots
            </h2>
            <p className="font-poppins text-gray-600 mb-6 leading-relaxed">
              At <strong className="text-zivara-black">Zivara Fashion Studio</strong>, we believe fashion should be stylish, comfortable, and affordable. Our collections are inspired by modern Indian women who love traditional elegance with contemporary trends.
            </p>
            <p className="font-poppins text-gray-600 mb-10 leading-relaxed">
              We carefully select fabrics, colors, and designs that make every woman feel confident and beautiful, whether it's for daily office wear, college styling, or grand family functions.
            </p>

            <h3 className="font-playfair text-2xl font-bold text-zivara-black mb-6">Why Choose Us?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {values.map((value, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-zivara-gold shrink-0 mt-0.5" />
                  <span className="font-poppins text-gray-700 text-sm">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
