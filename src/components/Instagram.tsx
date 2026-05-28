import { Instagram as InstagramIcon } from 'lucide-react';

export default function Instagram() {
  const images = [
    'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1610444317135-24fd53f2c5eb?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1620359850117-0245237887ac?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1589465885855-408990c6ca7e?q=80&w=600&auto=format&fit=crop'
  ];

  return (
    <section className="py-24 bg-zivara-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="font-playfair text-4xl font-bold text-zivara-black mb-4">Follow Us on Instagram</h2>
            <p className="font-poppins text-gray-600">Get daily styling tips, festive lookbooks, and behind-the-scenes.</p>
          </div>
          <a href="#" className="flex items-center gap-2 bg-zivara-black text-white px-6 py-3 font-poppins text-sm hover:bg-zivara-black/80 transition-colors">
            <InstagramIcon className="w-4 h-4" /> @zivarafashionstudio
          </a>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {images.map((img, i) => (
            <a key={i} href="#" className="group relative aspect-square overflow-hidden bg-gray-100 block">
              <img 
                src={img} 
                alt="Instagram post" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <InstagramIcon className="w-8 h-8 text-white" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
