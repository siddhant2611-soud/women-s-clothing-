import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SizeGuideModal({ isOpen, onClose }: SizeGuideModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-xl shadow-2xl flex flex-col"
          >
            <div className="flex justify-between items-center p-4 border-b border-gray-100 shrink-0">
              <h3 className="font-playfair text-xl md:text-2xl font-bold text-zivara-black">Size Guide</h3>
              <button 
                onClick={onClose}
                className="p-2 text-gray-500 hover:text-black transition-colors rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto w-full font-poppins">
              <p className="text-sm text-gray-600 mb-6 font-poppins">Use the chart below to determine your size. If you're on the borderline between two sizes, order the smaller size for a tighter fit or the larger size for a looser fit.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th scope="col" className="px-4 py-3 font-semibold">Size</th>
                      <th scope="col" className="px-4 py-3 font-semibold">Bust (inches)</th>
                      <th scope="col" className="px-4 py-3 font-semibold">Waist (inches)</th>
                      <th scope="col" className="px-4 py-3 font-semibold">Hip (inches)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white border-b border-gray-100">
                      <td className="px-4 py-3 font-medium text-gray-900">XS</td>
                      <td className="px-4 py-3">32"</td>
                      <td className="px-4 py-3">24"</td>
                      <td className="px-4 py-3">34"</td>
                    </tr>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <td className="px-4 py-3 font-medium text-gray-900">S</td>
                      <td className="px-4 py-3">34"</td>
                      <td className="px-4 py-3">26"</td>
                      <td className="px-4 py-3">36"</td>
                    </tr>
                    <tr className="bg-white border-b border-gray-100">
                      <td className="px-4 py-3 font-medium text-gray-900">M</td>
                      <td className="px-4 py-3">36"</td>
                      <td className="px-4 py-3">28"</td>
                      <td className="px-4 py-3">38"</td>
                    </tr>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <td className="px-4 py-3 font-medium text-gray-900">L</td>
                      <td className="px-4 py-3">38"</td>
                      <td className="px-4 py-3">30"</td>
                      <td className="px-4 py-3">40"</td>
                    </tr>
                    <tr className="bg-white border-b border-gray-100">
                      <td className="px-4 py-3 font-medium text-gray-900">XL</td>
                      <td className="px-4 py-3">40"</td>
                      <td className="px-4 py-3">32"</td>
                      <td className="px-4 py-3">42"</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">XXL</td>
                      <td className="px-4 py-3">42"</td>
                      <td className="px-4 py-3">34"</td>
                      <td className="px-4 py-3">44"</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
