import { Facebook, Instagram as InstagramIcon, Phone, Mail, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-zivara-black text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Col */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-playfair font-bold text-2xl uppercase tracking-wide mb-6">Zivara</h2>
            <p className="font-poppins text-gray-400 text-sm mb-6 leading-relaxed">
              Elegant Indian Wear for Modern Women. Style that feels like you, blending comfort and high fashion seamlessly.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/10 flex items-center justify-center hover:bg-zivara-gold transition-colors">
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 flex items-center justify-center hover:bg-zivara-gold transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="font-playfair font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-4 font-poppins text-sm text-gray-400">
              <li><a href="#" className="hover:text-zivara-gold transition-colors">Home</a></li>
              <li><a href="#shop" className="hover:text-zivara-gold transition-colors">Shop Collection</a></li>
              <li><a href="#new-arrivals" className="hover:text-zivara-gold transition-colors">New Arrivals</a></li>
              <li><a href="#about" className="hover:text-zivara-gold transition-colors">About Us</a></li>
              <li><a href="#contact" className="hover:text-zivara-gold transition-colors">Contact</a></li>
            </ul>
          </motion.div>

          {/* Policies & Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-playfair font-bold text-lg mb-6">Support & Info</h3>
            <ul className="space-y-4 font-poppins text-sm text-gray-400 mb-8">
              <li><a href="#" className="hover:text-zivara-gold transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-zivara-gold transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-zivara-gold transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-zivara-gold transition-colors">Return & Refund Policy</a></li>
            </ul>
          </motion.div>

          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="font-playfair font-bold text-lg mb-6">Get in Touch</h3>
            <ul className="space-y-4 font-poppins text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-zivara-gold shrink-0" />
                <span>Model Town, Karnal, Haryana, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-zivara-gold shrink-0" />
                <span>+91 99966 44006</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-zivara-gold shrink-0" />
                <a href="mailto:support@zivarafashionstudio.com" className="hover:text-zivara-gold">
                  support@zivarafashionstudio.com
                </a>
              </li>
              <li className="mt-4 text-xs text-gray-500">
                Business Hours:<br/>
                Mon – Sat: 10:00 AM – 7:00 PM
              </li>
            </ul>
          </motion.div>

        </div>

        {/* Newsletter */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="border-t border-white/10 pt-12 pb-12 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="text-center md:text-left text-sm font-poppins">
            <h4 className="text-lg font-playfair font-bold mb-2">Subscribe to our Newsletter</h4>
            <p className="text-gray-400">Get updates on new collections and exclusive offers.</p>
          </div>
          <form className="flex w-full md:w-auto max-w-md">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="bg-white/5 border border-white/10 px-4 py-3 font-poppins text-sm w-full md:w-64 focus:outline-none focus:border-zivara-gold"
              required
            />
            <button className="bg-zivara-gold text-zivara-black font-poppins font-medium px-6 py-3 hover:bg-white transition-colors">
              Subscribe
            </button>
          </form>
        </motion.div>

        <div className="border-t border-white/10 pt-8 text-center font-poppins text-xs text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} Zivara Fashion Studio. All rights reserved.</p>
          <p>Created elegantly for modern Indian women.</p>
        </div>
      </div>
    </footer>
  );
}
