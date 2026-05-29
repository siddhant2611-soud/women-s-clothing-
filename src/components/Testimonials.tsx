import { testimonials } from '../data';
import { Star } from 'lucide-react';
import { motion } from 'motion/react';

export default function Testimonials() {
  return (
    <section className="py-24 bg-zivara-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-4xl font-bold text-zivara-black mb-4">Loved by Women Across India</h2>
          <p className="font-poppins text-gray-600">Hear what our customers have to say about the Zivara experience.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: Math.min(idx * 0.1, 0.3) }}
              key={testimonial.id} 
              className="bg-white p-8 shadow-sm"
            >
              <div className="flex gap-1 mb-6 text-zivara-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="font-poppins text-gray-700 italic mb-8 leading-relaxed text-sm md:text-base">
                "{testimonial.review}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center font-playfair font-bold text-zivara-gold text-xl">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-poppins font-semibold text-zivara-black text-sm">{testimonial.name}</p>
                  <p className="font-poppins text-xs text-gray-500">Verified Buyer</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
