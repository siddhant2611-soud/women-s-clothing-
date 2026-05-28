import React, { useState } from 'react';
import { Package, Search, Truck, MapPin, CheckCircle, PackageCheck } from 'lucide-react';

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  
  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if(orderId) setIsTracking(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-20 px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zivara-pink/10 text-zivara-pink mb-4">
            <Package className="w-8 h-8" />
          </div>
          <h1 className="font-playfair text-3xl font-bold text-zivara-black mb-2">Track Your Order</h1>
          <p className="font-poppins text-gray-500">Enter your order ID below to get real-time shipping updates.</p>
        </div>

        <form onSubmit={handleTrack} className="flex gap-3 mb-10">
          <input 
            type="text" 
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="e.g., ORD-8472" 
            required
            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 font-poppins focus:outline-none focus:border-zivara-black focus:ring-1 focus:ring-zivara-black"
          />
          <button type="submit" className="bg-zivara-black text-white px-6 py-3 rounded-lg font-poppins font-medium flex items-center gap-2 hover:bg-zivara-black/80 transition-colors">
            <Search className="w-5 h-5" /> Track
          </button>
        </form>

        {isTracking && (
          <div className="border-t border-gray-100 pt-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-poppins font-semibold text-lg text-zivara-black">Order #{orderId}</h3>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Shipped</span>
            </div>

            <div className="relative border-l-2 border-gray-200 ml-4 space-y-8 pb-4">
              <div className="relative pl-8">
                <span className="absolute -left-[11px] top-1 bg-green-500 text-white w-5 h-5 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-3 h-3" />
                </span>
                <p className="font-poppins font-medium text-zivara-black">Order Placed</p>
                <p className="font-poppins text-xs text-gray-500 mt-1">May 25, 2026 - 10:30 AM</p>
              </div>

              <div className="relative pl-8">
                <span className="absolute -left-[11px] top-1 bg-green-500 text-white w-5 h-5 rounded-full flex items-center justify-center">
                  <PackageCheck className="w-3 h-3" />
                </span>
                <p className="font-poppins font-medium text-zivara-black">Order Processed & Packed</p>
                <p className="font-poppins text-xs text-gray-500 mt-1">May 26, 2026 - 02:15 PM</p>
              </div>

              <div className="relative pl-8">
                <span className="absolute -left-[11px] top-1 bg-zivara-gold text-white w-5 h-5 rounded-full shadow-[0_0_0_4px_white] flex items-center justify-center">
                  <Truck className="w-3 h-3" />
                </span>
                <p className="font-poppins font-medium text-zivara-black">In Transit - Expected Delivery Tomorrow</p>
                <p className="font-poppins text-xs text-gray-500 mt-1">May 27, 2026 - 08:45 AM • Mumbai Hub</p>
              </div>

              <div className="relative pl-8 opacity-40">
                <span className="absolute -left-[11px] top-1 bg-gray-300 text-white w-5 h-5 rounded-full flex items-center justify-center">
                  <MapPin className="w-3 h-3" />
                </span>
                <p className="font-poppins font-medium text-gray-600">Delivered</p>
                <p className="font-poppins text-xs text-gray-500 mt-1">Pending</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
