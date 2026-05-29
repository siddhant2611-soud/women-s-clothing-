import { Instagram as InstagramIcon } from 'lucide-react';
import { motion } from 'motion/react';

export default function Instagram() {
  const images = [
    '/images/pink_floral_kurti_1_1780032659171.png',
    '/images/wine_saree_1_1780040161390.png',
    '/images/black_anarkali_1_1780039960399.png',
    '/images/lavender_dress_1_1780040020061.png'
  ];

  return (
    <section className="py-24 bg-zivara-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6"
        >
          <div>
            <h2 className="font-playfair text-4xl font-bold text-zivara-black mb-4">Follow Us on Instagram</h2>
            <p className="font-poppins text-gray-600">Get daily styling tips, festive lookbooks, and behind-the-scenes.</p>
          </div>
          <a href="#" className="flex items-center gap-2 bg-zivara-black text-white px-6 py-3 font-poppins text-sm hover:bg-zivara-black/80 transition-colors">
            <InstagramIcon className="w-4 h-4" /> @zivarafashionstudio
          </a>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {images.map((img, i) => (
            <motion.a 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: Math.min(i * 0.1, 0.3) }}
              key={i} 
              href="#" 
              className="group relative aspect-square overflow-hidden bg-gray-100 block"
            >
              <img 
                src={img} 
                alt="Instagram post" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <InstagramIcon className="w-8 h-8 text-white" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
