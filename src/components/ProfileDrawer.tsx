import React, { useState } from 'react';
import { X, User, LogOut, Package, MapPin, Edit2, Truck, Search, Award, CheckCircle, PackageCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';

export default function ProfileDrawer() {
  const { user, isProfileOpen, setIsProfileOpen, login, logout, updateProfile } = useAuth();
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', phone: '', address: '' });
  
  const [showTracking, setShowTracking] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [trackingOrderId, setTrackingOrderId] = useState('');
  const [trackingResult, setTrackingResult] = useState<{ status: string; step: number } | null>(null);

  const mockOrders = [
    {
      id: 'ORD-8472',
      date: '12 May 2026',
      status: 'Delivered',
      total: 3499,
      items: [
        { name: 'Floral Print Kurti', quantity: 1, price: 1499 },
        { name: 'Cotton Palazzo Pants', quantity: 1, price: 2000 }
      ]
    },
    {
      id: 'ORD-9213',
      date: '25 May 2026',
      status: 'Processing',
      total: 4500,
      items: [
        { name: 'Embroidered Silk Saree', quantity: 1, price: 4500 }
      ]
    }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput && nameInput) {
      login(emailInput, nameInput, phoneInput);
      setEmailInput('');
      setNameInput('');
      setPhoneInput('');
    }
  };

  const startEdit = () => {
    if (user) {
      setEditForm({
        name: user.name,
        phone: user.phone || '',
        address: user.address || ''
      });
      setIsEditing(true);
      setShowTracking(false);
      setShowOrders(false);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(editForm);
    setIsEditing(false);
  };

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingOrderId.trim()) return;
    
    // Mock tracking status
    const statuses = [
      { status: 'Order Placed', step: 1 }, 
      { status: 'Packed', step: 2 }, 
      { status: 'In Transit', step: 3 }, 
      { status: 'Delivered', step: 4 }
    ];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    setTrackingResult(randomStatus);
  };

  const getLoyaltyTier = (points: number = 0) => {
    if (points >= 2000) return { name: 'Gold Tier', color: 'bg-yellow-100/50 text-yellow-700 border-yellow-200' };
    if (points >= 1000) return { name: 'Silver Tier', color: 'bg-slate-100 text-slate-600 border-slate-200' };
    return { name: 'Bronze Tier', color: 'bg-amber-100/50 text-amber-800 border-amber-200' };
  };

  const loyaltyTier = getLoyaltyTier(user?.loyaltyPoints);

  return (
    <AnimatePresence>
      {isProfileOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsProfileOpen(false)}
            className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[70] shadow-2xl flex flex-col"
          >
            <div className="px-6 py-5 flex items-center justify-between border-b border-gray-100">
              <h2 className="font-playfair font-bold text-xl text-zivara-black flex items-center gap-2">
                <User className="w-5 h-5" /> {user ? 'My Account' : 'Sign In'}
              </h2>
              <button 
                onClick={() => setIsProfileOpen(false)}
                className="p-2 text-gray-500 hover:text-zivara-black hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {!user ? (
                <div className="h-full flex flex-col justify-center max-w-sm mx-auto">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="font-playfair font-bold text-2xl text-zivara-black mb-2">Welcome to Zivara</h3>
                    <p className="font-poppins text-sm text-gray-500">Sign in or create an account to track your orders, save your wishlist, and checkout faster.</p>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-4 text-left">
                    <div>
                      <label htmlFor="name" className="block font-poppins text-xs font-semibold text-gray-700 mb-1">Full Name</label>
                      <input 
                        type="text" 
                        id="name"
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        className="w-full border border-gray-300 px-4 py-3 font-poppins text-sm focus:outline-none focus:border-zivara-black transition-colors"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block font-poppins text-xs font-semibold text-gray-700 mb-1">Email Address</label>
                      <input 
                        type="email" 
                        id="email"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        className="w-full border border-gray-300 px-4 py-3 font-poppins text-sm focus:outline-none focus:border-zivara-black transition-colors"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block font-poppins text-xs font-semibold text-gray-700 mb-1">Phone Number (Optional)</label>
                      <input 
                        type="tel" 
                        id="phone"
                        value={phoneInput}
                        onChange={(e) => setPhoneInput(e.target.value)}
                        className="w-full border border-gray-300 px-4 py-3 font-poppins text-sm focus:outline-none focus:border-zivara-black transition-colors"
                        placeholder="+91 99966 44006"
                      />
                    </div>
                    <button 
                      type="submit"
                      className="w-full bg-zivara-black text-white py-3 font-poppins font-medium hover:bg-zivara-black/80 transition-colors mt-2"
                    >
                      Login / Sign Up
                    </button>
                    <p className="font-poppins text-xs text-center text-gray-500 mt-4">
                      By proceeding, you agree to our Terms of Service & Privacy Policy.<br/>A confirmation email will be sent for new accounts.
                    </p>
                  </form>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Profile Header */}
                  <div className="text-center">
                    <div className="w-20 h-20 bg-zivara-beige rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-zivara-gold">
                      <span className="font-playfair font-bold text-2xl text-zivara-gold">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    {isEditing ? (
                      <form onSubmit={handleSaveProfile} className="space-y-4 text-left mt-6">
                         <div>
                          <label className="block font-poppins text-xs font-semibold text-gray-700 mb-1">Full Name</label>
                          <input 
                            type="text" 
                            value={editForm.name}
                            onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                            className="w-full border border-gray-300 px-3 py-2 font-poppins text-sm focus:outline-none focus:border-zivara-black"
                            required
                          />
                        </div>
                        <div>
                          <label className="block font-poppins text-xs font-semibold text-gray-700 mb-1">Phone Number</label>
                          <input 
                            type="tel" 
                            value={editForm.phone}
                            onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                            className="w-full border border-gray-300 px-3 py-2 font-poppins text-sm focus:outline-none focus:border-zivara-black"
                          />
                        </div>
                        <div>
                          <label className="block font-poppins text-xs font-semibold text-gray-700 mb-1">Primary Address</label>
                          <textarea 
                            value={editForm.address}
                            onChange={(e) => setEditForm({...editForm, address: e.target.value})}
                            rows={3}
                            className="w-full border border-gray-300 px-3 py-2 font-poppins text-sm focus:outline-none focus:border-zivara-black resize-none"
                          />
                        </div>
                        <div className="flex gap-3 pt-2">
                          <button 
                            type="submit"
                            className="flex-1 bg-zivara-black text-white py-2 font-poppins text-sm font-medium hover:bg-zivara-black/80 transition-colors"
                          >
                            Save Details
                          </button>
                          <button 
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="flex-1 border border-gray-300 text-zivara-black py-2 font-poppins text-sm font-medium hover:bg-gray-50 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      <>
                        <h3 className="font-playfair font-bold text-2xl text-zivara-black mb-1">{user.name}</h3>
                        <p className="font-poppins text-sm text-gray-500 mb-4">{user.email}</p>
                        <button 
                          onClick={startEdit}
                          className="flex items-center justify-center gap-2 mx-auto text-sm font-poppins text-zivara-gold hover:text-black transition-colors"
                        >
                          <Edit2 className="w-4 h-4" /> Edit Profile
                        </button>
                      </>
                    )}
                  </div>

                  {!isEditing && (
                    <>
                      <div className="bg-zivara-beige/30 border border-zivara-gold/20 p-5 rounded-lg text-center mb-6 relative overflow-hidden">
                        <div className={`absolute top-0 right-0 px-3 py-1 font-poppins text-[10px] font-bold uppercase tracking-widest border-b border-l rounded-bl-lg ${loyaltyTier.color}`}>
                          {loyaltyTier.name}
                        </div>
                        <div className="w-10 h-10 bg-zivara-gold/10 rounded-full flex items-center justify-center mx-auto mb-2 mt-2">
                          <Award className="w-5 h-5 text-zivara-gold" />
                        </div>
                        <h4 className="font-poppins text-sm text-gray-600 mb-1">Zivara Loyalty Points</h4>
                        <div className="font-playfair font-bold text-3xl text-zivara-black mb-2">
                          {user.loyaltyPoints || 0}
                        </div>
                        <p className="font-poppins text-xs text-gray-500 max-w-[250px] mx-auto">
                          Earn points on every purchase. Redeem them for discounts on your next order!
                        </p>
                      </div>

                      <div className="border-t border-gray-100 pt-6">
                        <strong className="block font-playfair font-bold text-lg mb-4 text-zivara-black">Account Details</strong>
                        <div className="space-y-4 font-poppins text-sm text-gray-600">
                          <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-gray-400 shrink-0" />
                            <div>
                              <span className="block font-medium text-zivara-black mb-1">Primary Address</span>
                              {user.address ? (
                                <p className="leading-relaxed">{user.address}</p>
                              ) : (
                                <div>
                                  <p className="text-gray-400 italic mb-1">No address provided</p>
                                  <button onClick={startEdit} className="text-zivara-gold font-medium hover:text-black transition-colors">Add Address</button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-100 pt-6">
                        <button 
                          onClick={() => { setShowOrders(!showOrders); setShowTracking(false); }}
                          className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors rounded-lg mb-4"
                        >
                          <div className="flex items-center gap-3">
                            <Package className="w-5 h-5 text-zivara-black" />
                            <span className="font-poppins font-medium text-zivara-black">My Orders</span>
                          </div>
                        </button>

                        <AnimatePresence>
                          {showOrders && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="space-y-4 mb-4">
                                {mockOrders.map((order) => (
                                  <div key={order.id} className="p-4 border border-gray-100 rounded-lg bg-white">
                                    <div className="flex justify-between items-start mb-3">
                                      <div>
                                        <p className="font-poppins font-semibold text-zivara-black text-sm">{order.id}</p>
                                        <p className="font-poppins text-xs text-gray-500">{order.date}</p>
                                      </div>
                                      <span className={`px-2 py-1 text-[10px] font-poppins font-medium rounded ${
                                        order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                                      }`}>
                                        {order.status}
                                      </span>
                                    </div>
                                    <div className="space-y-2 mb-3">
                                      {order.items.map((item, idx) => (
                                        <div key={idx} className="flex justify-between font-poppins text-xs">
                                          <span className="text-gray-600">{item.quantity}x {item.name}</span>
                                          <span className="text-zivara-black font-medium">₹{item.price}</span>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
                                      <span className="font-poppins text-sm font-medium text-gray-600">Total</span>
                                      <span className="font-poppins text-sm font-bold text-zivara-black">₹{order.total}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                        
                        <button 
                          onClick={() => { setShowTracking(!showTracking); setShowOrders(false); }}
                          className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors rounded-lg mb-4"
                        >
                          <div className="flex items-center gap-3">
                            <Truck className="w-5 h-5 text-zivara-black" />
                            <span className="font-poppins font-medium text-zivara-black">Track Order</span>
                          </div>
                        </button>

                        <AnimatePresence>
                          {showTracking && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="p-4 border border-gray-100 rounded-lg bg-white mb-4">
                                <form onSubmit={handleTrackOrder} className="flex gap-2">
                                  <input 
                                    type="text" 
                                    value={trackingOrderId}
                                    onChange={(e) => {
                                      setTrackingOrderId(e.target.value);
                                      setTrackingResult(null);
                                    }}
                                    placeholder="Enter Order ID"
                                    className="flex-1 border border-gray-300 px-3 py-2 font-poppins text-sm focus:outline-none focus:border-zivara-black"
                                    required
                                  />
                                  <button type="submit" className="bg-zivara-black text-white px-4 py-2 hover:bg-black/80 transition-colors">
                                    <Search className="w-4 h-4" />
                                  </button>
                                </form>

                                {trackingResult && (
                                  <div className="mt-6">
                                    <div className="flex justify-between text-xs font-poppins font-semibold uppercase text-gray-500 mb-2">
                                      <span>Order Status</span>
                                      <span className="text-zivara-gold">{trackingResult.status}</span>
                                    </div>
                                    <div className="flex justify-between items-center relative">
                                      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -z-10 -translate-y-1/2" />
                                      {[
                                        { s: 1, icon: CheckCircle }, 
                                        { s: 2, icon: PackageCheck }, 
                                        { s: 3, icon: Truck }, 
                                        { s: 4, icon: MapPin }
                                      ].map((stepObj) => {
                                        const IconComponent = stepObj.icon;
                                        return (
                                          <div 
                                            key={stepObj.s}
                                            className={`w-6 h-6 rounded-full flex items-center justify-center z-10 transition-colors duration-500 ${
                                              stepObj.s <= trackingResult.step ? 'bg-zivara-gold text-white' : 'bg-gray-200 text-gray-500'
                                            }`}
                                          >
                                            <IconComponent className="w-3.5 h-3.5" />
                                          </div>
                                        );
                                      })}
                                    </div>
                                    <div className="flex justify-between mt-2 text-[10px] font-poppins text-gray-500">
                                      <span className="text-center w-12 -ml-2">Placed</span>
                                      <span className="text-center w-12">Packed</span>
                                      <span className="text-center w-12">Transit</span>
                                      <span className="text-center w-12 -mr-2">Delivered</span>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <div className="pt-6">
                        <button 
                          onClick={logout}
                          className="w-full flex items-center justify-center gap-2 border border-red-200 text-red-600 py-3 font-poppins text-sm font-medium hover:bg-red-50 hover:border-red-300 transition-colors"
                        >
                          <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
