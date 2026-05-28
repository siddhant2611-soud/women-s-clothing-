import React from 'react';
import { CheckCircle, Package, ArrowRight, Download } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function OrderSuccessPage() {
  const location = useLocation();
  const orderId = location.state?.orderId || 'ORD-847291';

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-xl w-full bg-white p-8 md:p-12 text-center rounded-2xl shadow-xl shadow-gray-200/50">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600 mb-6 mx-auto">
          <CheckCircle className="w-10 h-10" />
        </div>
        
        <h1 className="font-playfair text-3xl font-bold text-zivara-black mb-4">Payment Successful!</h1>
        <p className="font-poppins text-gray-500 mb-8">
          Thank you for your purchase. We have received your order and are getting it ready to be shipped. A confirmation email has been sent to your registered email.
        </p>
        
        <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left flex flex-col md:flex-row justify-between items-center gap-6 border border-gray-100">
          <div>
            <p className="font-poppins text-xs text-gray-500 uppercase tracking-wider mb-1">Order Details</p>
            <p className="font-poppins font-bold text-zivara-black text-lg">{orderId}</p>
            <p className="font-poppins text-sm text-gray-600 mt-1">Expected Delivery: Standard 4-5 Days</p>
          </div>
          <Link to="/track" className="bg-white border border-gray-200 text-zivara-black px-4 py-2 font-poppins text-sm rounded shadow-sm flex items-center gap-2 hover:bg-gray-50 transition-colors">
            <Package className="w-4 h-4" /> Track Order
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="flex items-center justify-center gap-2 font-poppins text-sm border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors">
             <Download className="w-4 h-4" /> Download Invoice
          </button>
          <Link to="/" className="flex items-center justify-center gap-2 font-poppins text-sm bg-zivara-black text-white px-6 py-3 rounded-lg hover:bg-zivara-black/90 transition-colors shadow-md">
            Continue Shopping <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
