import React, { useState, useEffect } from 'react';
import { ShoppingBag, ArrowLeft, ArrowRight, ShieldCheck, MapPin, Truck, CreditCard, CheckCircle2, LocateFixed, Award } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const stateMapping: Record<string, string> = {
  "Andaman and Nicobar Islands": "AN",
  "Andhra Pradesh": "AP",
  "Arunachal Pradesh": "AR",
  "Assam": "AS",
  "Bihar": "BR",
  "Chandigarh": "CH",
  "Chhattisgarh": "CT",
  "Dadra and Nagar Haveli": "DN",
  "Daman and Diu": "DN",
  "Delhi": "DL",
  "Goa": "GA",
  "Gujarat": "GJ",
  "Haryana": "HR",
  "Himachal Pradesh": "HP",
  "Jammu and Kashmir": "JK",
  "Jharkhand": "JH",
  "Karnataka": "KA",
  "Kerala": "KL",
  "Ladakh": "LA",
  "Lakshadweep": "LD",
  "Madhya Pradesh": "MP",
  "Maharashtra": "MH",
  "Manipur": "MN",
  "Meghalaya": "ML",
  "Mizoram": "MZ",
  "Nagaland": "NL",
  "Odisha": "OR",
  "Puducherry": "PY",
  "Punjab": "PB",
  "Rajasthan": "RJ",
  "Sikkim": "SK",
  "Tamil Nadu": "TN",
  "Telangana": "TG",
  "Tripura": "TR",
  "Uttar Pradesh": "UP",
  "Uttarakhand": "UT",
  "West Bengal": "WB"
};

export default function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCart();
  const { user, updateProfile } = useAuth();
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [isLocating, setIsLocating] = useState(false);
  const [redeemPoints, setRedeemPoints] = useState(false);

  // Form states
  const [address, setAddress] = useState({
    name: '', mobile: '', email: '', pin: '', street: '', city: '', state: ''
  });
  
  useEffect(() => {
    if ('geolocation' in navigator && step === 1) {
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          if (res.ok) {
            const data = await res.json();
            if (data && data.address) {
              const city = data.address.city || data.address.town || data.address.village || data.address.state_district || '';
              const rawState = data.address.state || '';
              const stateCode = stateMapping[rawState] || '';
              const postcode = data.address.postcode || '';
              
              setAddress(prev => ({
                ...prev,
                city: prev.city || city,
                state: prev.state || stateCode,
                pin: prev.pin || postcode
              }));
            }
          }
        } catch (error) {
          console.error("Geolocation fetch error:", error);
        } finally {
          setIsLocating(false);
        }
      }, () => {
        setIsLocating(false);
      });
    }
  }, [step]);
  const [delivery, setDelivery] = useState('standard');
  const [payment, setPayment] = useState('upi');

  const shipping = delivery === 'express' ? 150 : delivery === 'sameday' ? 300 : 0;
  const gst = Math.round(cartTotal * 0.05); // 5% GST
  const pointsDiscount = (redeemPoints && user && user.loyaltyPoints) ? user.loyaltyPoints : 0;
  const finalTotal = Math.max(0, cartTotal + shipping + gst - pointsDiscount);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      return;
    }
    
    // Calculate new points: Add 10% of finalTotal, subtract redeemed points
    if (user) {
      const earnedPoints = Math.round(finalTotal * 0.1);
      const newBalance = Math.max(0, (user.loyaltyPoints || 0) - pointsDiscount + earnedPoints);
      updateProfile({ loyaltyPoints: newBalance });
    }

    // Simulate API call for real checkout
    setTimeout(() => {
      // Clear cart and redirect
      clearCart();
      navigate('/success', { state: { orderId: 'ORD-' + Math.floor(Math.random() * 1000000) } });
    }, 1500);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-50 px-4">
        <ShoppingBag className="w-16 h-16 text-gray-300 mb-6" />
        <h2 className="font-playfair text-2xl font-bold text-zivara-black mb-2">Checkout Unavailable</h2>
        <p className="font-poppins text-gray-500 mb-8">Your shopping bag is empty.</p>
        <Link to="/" className="bg-zivara-black text-white px-8 py-3 rounded-sm font-poppins font-medium hover:bg-zivara-black/80 transition-colors">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Progress Tracker */}
        <div className="mb-12 flex justify-center">
          <div className="flex items-center gap-4 text-sm font-poppins">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-zivara-black font-semibold' : 'text-gray-400'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 1 ? 'bg-zivara-black text-white' : 'bg-gray-200'}`}>1</span>
              Address
            </div>
            <div className={`w-12 h-px ${step >= 2 ? 'bg-zivara-black' : 'bg-gray-300'}`}></div>
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-zivara-black font-semibold' : 'text-gray-400'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 2 ? 'bg-zivara-black text-white' : 'bg-gray-200'}`}>2</span>
              Delivery
            </div>
            <div className={`w-12 h-px ${step >= 3 ? 'bg-zivara-black' : 'bg-gray-300'}`}></div>
            <div className={`flex items-center gap-2 ${step >= 3 ? 'text-zivara-black font-semibold' : 'text-gray-400'}`}>
               <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 3 ? 'bg-zivara-black text-white' : 'bg-gray-200'}`}>3</span>
              Payment
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main Checkout Form */}
          <div className="flex-1">
            <form id="checkout-form" onSubmit={handlePlaceOrder} className="bg-white p-8 border border-gray-100 rounded-2xl shadow-sm">
              
              {/* STEP 1: Address */}
              {step === 1 && (
                <div className="animate-in fade-in">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-zivara-black" />
                      <h2 className="font-playfair text-2xl font-bold text-zivara-black">Shipping Address</h2>
                    </div>
                    {isLocating && <span className="font-poppins text-xs text-gray-500 flex items-center gap-1"><LocateFixed className="w-3 h-3 animate-spin"/> Locating...</span>}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                    <div className="col-span-full">
                      <label className="block font-poppins text-sm text-gray-600 mb-1">Full Name</label>
                      <input required type="text" value={address.name} onChange={e => setAddress({...address, name: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-3 font-poppins focus:ring-2 focus:ring-zivara-black/20 focus:border-zivara-black outline-none transition-all" placeholder="Enter your full name" />
                    </div>
                    <div>
                      <label className="block font-poppins text-sm text-gray-600 mb-1">Mobile Number</label>
                      <input required type="tel" pattern="[0-9]{10}" title="10 digit mobile number" value={address.mobile} onChange={e => setAddress({...address, mobile: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-3 font-poppins focus:ring-2 focus:ring-zivara-black/20 focus:border-zivara-black outline-none transition-all" placeholder="10-digit mobile number" />
                    </div>
                    <div>
                      <label className="block font-poppins text-sm text-gray-600 mb-1">Email</label>
                      <input required type="email" value={address.email} onChange={e => setAddress({...address, email: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-3 font-poppins focus:ring-2 focus:ring-zivara-black/20 focus:border-zivara-black outline-none transition-all" placeholder="Email for order updates" />
                    </div>
                    <div className="col-span-full">
                      <label className="block font-poppins text-sm text-gray-600 mb-1">Flat, House no., Building, Company, Apartment</label>
                      <input required type="text" value={address.street} onChange={e => setAddress({...address, street: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-3 font-poppins focus:ring-2 focus:ring-zivara-black/20 focus:border-zivara-black outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block font-poppins text-sm text-gray-600 mb-1">PIN Code</label>
                      <input required type="text" pattern="[0-9]{6}" title="6 digit PIN code" value={address.pin} onChange={e => setAddress({...address, pin: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-3 font-poppins focus:ring-2 focus:ring-zivara-black/20 focus:border-zivara-black outline-none transition-all" placeholder="6-digit PIN code" />
                    </div>
                    <div>
                      <label className="block font-poppins text-sm text-gray-600 mb-1">Town/City</label>
                      <input required type="text" value={address.city} onChange={e => setAddress({...address, city: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-3 font-poppins focus:ring-2 focus:ring-zivara-black/20 focus:border-zivara-black outline-none transition-all" />
                    </div>
                    <div className="col-span-full">
                      <label className="block font-poppins text-sm text-gray-600 mb-1">State</label>
                      <select required value={address.state} onChange={e => setAddress({...address, state: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-3 font-poppins focus:ring-2 focus:ring-zivara-black/20 focus:border-zivara-black outline-none transition-all bg-white">
                        <option value="">Select State</option>
                        <option value="AN">Andaman and Nicobar Islands</option>
                        <option value="AP">Andhra Pradesh</option>
                        <option value="AR">Arunachal Pradesh</option>
                        <option value="AS">Assam</option>
                        <option value="BR">Bihar</option>
                        <option value="CH">Chandigarh</option>
                        <option value="CT">Chhattisgarh</option>
                        <option value="DN">Dadra and Nagar Haveli and Daman and Diu</option>
                        <option value="DL">Delhi</option>
                        <option value="GA">Goa</option>
                        <option value="GJ">Gujarat</option>
                        <option value="HR">Haryana</option>
                        <option value="HP">Himachal Pradesh</option>
                        <option value="JK">Jammu and Kashmir</option>
                        <option value="JH">Jharkhand</option>
                        <option value="KA">Karnataka</option>
                        <option value="KL">Kerala</option>
                        <option value="LA">Ladakh</option>
                        <option value="LD">Lakshadweep</option>
                        <option value="MP">Madhya Pradesh</option>
                        <option value="MH">Maharashtra</option>
                        <option value="MN">Manipur</option>
                        <option value="ML">Meghalaya</option>
                        <option value="MZ">Mizoram</option>
                        <option value="NL">Nagaland</option>
                        <option value="OR">Odisha</option>
                        <option value="PY">Puducherry</option>
                        <option value="PB">Punjab</option>
                        <option value="RJ">Rajasthan</option>
                        <option value="SK">Sikkim</option>
                        <option value="TN">Tamil Nadu</option>
                        <option value="TG">Telangana</option>
                        <option value="TR">Tripura</option>
                        <option value="UP">Uttar Pradesh</option>
                        <option value="UT">Uttarakhand</option>
                        <option value="WB">West Bengal</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Delivery */}
              {step === 2 && (
                <div className="animate-in fade-in">
                  <div className="flex items-center gap-3 mb-6">
                    <Truck className="w-5 h-5 text-zivara-black" />
                    <h2 className="font-playfair text-2xl font-bold text-zivara-black">Delivery Options</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <label className={`flex items-start gap-4 p-4 border rounded-xl cursor-pointer transition-all ${delivery === 'standard' ? 'border-zivara-black bg-gray-50' : 'border-gray-200 hover:border-gray-300'}`}>
                      <input type="radio" name="delivery" value="standard" checked={delivery === 'standard'} onChange={() => setDelivery('standard')} className="mt-1 w-4 h-4 text-zivara-black focus:ring-zivara-black" />
                      <div>
                        <span className="block font-poppins font-medium text-zivara-black mb-1">Standard Delivery (Free)</span>
                        <span className="block font-poppins text-sm text-gray-500">Delivered in 4-5 business days</span>
                      </div>
                    </label>

                    <label className={`flex items-start gap-4 p-4 border rounded-xl cursor-pointer transition-all ${delivery === 'express' ? 'border-zivara-black bg-gray-50' : 'border-gray-200 hover:border-gray-300'}`}>
                      <input type="radio" name="delivery" value="express" checked={delivery === 'express'} onChange={() => setDelivery('express')} className="mt-1 w-4 h-4 text-zivara-black focus:ring-zivara-black" />
                      <div className="flex-1 flex justify-between">
                        <div>
                          <span className="block font-poppins font-medium text-zivara-black mb-1">Express Delivery</span>
                          <span className="block font-poppins text-sm text-gray-500">Delivered in 1-2 business days</span>
                        </div>
                        <span className="font-poppins font-semibold text-zivara-black">₹150</span>
                      </div>
                    </label>

                    <label className={`flex items-start gap-4 p-4 border rounded-xl cursor-pointer transition-all ${delivery === 'sameday' ? 'border-zivara-black bg-gray-50' : 'border-gray-200 hover:border-gray-300'}`}>
                      <input type="radio" name="delivery" value="sameday" checked={delivery === 'sameday'} onChange={() => setDelivery('sameday')} className="mt-1 w-4 h-4 text-zivara-black focus:ring-zivara-black" />
                      <div className="flex-1 flex justify-between">
                        <div>
                          <span className="block font-poppins font-medium text-zivara-black mb-1">Same Day Delivery</span>
                          <span className="block font-poppins text-sm text-amber-600 bg-amber-50 px-2 py-0.5 rounded inline-block mt-1">Available in your PIN code</span>
                        </div>
                        <span className="font-poppins font-semibold text-zivara-black">₹300</span>
                      </div>
                    </label>
                  </div>
                </div>
              )}

              {/* STEP 3: Payment */}
              {step === 3 && (
                <div className="animate-in fade-in">
                  <div className="flex items-center gap-3 mb-6">
                    <CreditCard className="w-5 h-5 text-zivara-black" />
                    <h2 className="font-playfair text-2xl font-bold text-zivara-black">Payment Methods</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <label className={`flex items-start gap-4 p-4 border rounded-xl cursor-pointer transition-all ${payment === 'upi' ? 'border-zivara-black bg-gray-50' : 'border-gray-200 hover:border-gray-300'}`}>
                      <input type="radio" name="payment" value="upi" checked={payment === 'upi'} onChange={() => setPayment('upi')} className="mt-1 w-4 h-4 text-zivara-black focus:ring-zivara-black" />
                      <div className="flex-1">
                        <span className="block font-poppins font-medium text-zivara-black mb-1">UPI Payments</span>
                        <div className="flex gap-2 mb-3 mt-2">
                          <span className="text-[10px] bg-white border border-gray-200 px-2 py-1 rounded font-poppins text-gray-600 font-medium">GPay</span>
                          <span className="text-[10px] bg-white border border-gray-200 px-2 py-1 rounded font-poppins text-gray-600 font-medium">PhonePe</span>
                          <span className="text-[10px] bg-white border border-gray-200 px-2 py-1 rounded font-poppins text-gray-600 font-medium">Paytm</span>
                        </div>
                        {payment === 'upi' && (
                          <input type="text" placeholder="Enter UPI ID (e.g., name@okicici)" className="w-full border border-gray-300 rounded px-3 py-2 font-poppins text-sm mt-2 focus:ring-1 focus:ring-zivara-black outline-none" required />
                        )}
                      </div>
                    </label>

                    <label className={`flex items-start gap-4 p-4 border rounded-xl cursor-pointer transition-all ${payment === 'card' ? 'border-zivara-black bg-gray-50' : 'border-gray-200 hover:border-gray-300'}`}>
                      <input type="radio" name="payment" value="card" checked={payment === 'card'} onChange={() => setPayment('card')} className="mt-1 w-4 h-4 text-zivara-black focus:ring-zivara-black" />
                      <div className="flex-1">
                        <span className="block font-poppins font-medium text-zivara-black mb-2">Credit / Debit Card</span>
                        {payment === 'card' && (
                          <div className="space-y-3 mt-3">
                            <input type="text" placeholder="Card Number" className="w-full border border-gray-300 rounded px-3 py-2 font-poppins text-sm focus:ring-1 focus:ring-zivara-black outline-none" required />
                            <div className="flex gap-3">
                              <input type="text" placeholder="MM/YY" className="w-1/2 border border-gray-300 rounded px-3 py-2 font-poppins text-sm focus:ring-1 focus:ring-zivara-black outline-none" required />
                              <input type="password" placeholder="CVV" maxLength={3} className="w-1/2 border border-gray-300 rounded px-3 py-2 font-poppins text-sm focus:ring-1 focus:ring-zivara-black outline-none" required />
                            </div>
                            <input type="text" placeholder="Name on Card" className="w-full border border-gray-300 rounded px-3 py-2 font-poppins text-sm focus:ring-1 focus:ring-zivara-black outline-none" required />
                          </div>
                        )}
                      </div>
                    </label>

                    <label className={`flex items-start gap-4 p-4 border rounded-xl cursor-pointer transition-all ${payment === 'netbanking' ? 'border-zivara-black bg-gray-50' : 'border-gray-200 hover:border-gray-300'}`}>
                      <input type="radio" name="payment" value="netbanking" checked={payment === 'netbanking'} onChange={() => setPayment('netbanking')} className="mt-1 w-4 h-4 text-zivara-black focus:ring-zivara-black" />
                      <div className="flex-1">
                        <span className="block font-poppins font-medium text-zivara-black mb-1">Net Banking</span>
                        {payment === 'netbanking' && (
                          <select className="w-full border border-gray-300 rounded px-3 py-2 font-poppins text-sm mt-3 focus:ring-1 focus:ring-zivara-black outline-none bg-white font-medium text-gray-700" required>
                            <option value="">Select your Bank</option>
                            <option value="sbi">State Bank of India</option>
                            <option value="hdfc">HDFC Bank</option>
                            <option value="icici">ICICI Bank</option>
                            <option value="axis">Axis Bank</option>
                            <option value="kotak">Kotak Mahindra Bank</option>
                          </select>
                        )}
                      </div>
                    </label>

                    <label className={`flex items-start gap-4 p-4 border rounded-xl cursor-pointer transition-all flex border-green-500/30 bg-green-50/30 ${payment === 'cod' ? 'border-green-500 bg-green-50' : 'hover:border-green-400'}`}>
                      <input type="radio" name="payment" value="cod" checked={payment === 'cod'} onChange={() => setPayment('cod')} className="mt-1 w-4 h-4 text-green-600 focus:ring-green-600" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="block font-poppins font-medium text-zivara-black">Cash on Delivery (COD)</span>
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="block font-poppins text-xs text-green-700 font-medium">Available Pan India</span>
                        {payment === 'cod' && (
                          <div className="mt-3 text-sm font-poppins text-gray-600 bg-white p-3 rounded border border-green-100">
                            Pay with cash, UPI, or cards upon delivery. Extra ₹50 handling charge may apply.
                          </div>
                        )}
                      </div>
                    </label>

                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="mt-8 flex items-center justify-between pt-6 border-t border-gray-100">
                {step > 1 ? (
                  <button type="button" onClick={() => setStep(step - 1)} className="flex items-center gap-2 text-gray-500 hover:text-zivara-black font-poppins font-medium transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                ) : (
                  <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-zivara-black font-poppins font-medium transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Return to Cart
                  </Link>
                )}
                
                <button type="submit" className="bg-zivara-black text-white px-8 py-3.5 rounded-lg flex items-center gap-2 font-poppins font-medium hover:bg-zivara-black/90 transition-colors shadow-sm">
                  {step === 3 ? 'Pay & Complete Order' : 'Continue to Next Step'} <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="w-full lg:w-[400px]">
            <div className="bg-white p-6 border border-gray-100 rounded-2xl shadow-sm sticky top-24">
              <h3 className="font-playfair text-xl font-bold text-zivara-black mb-6">Order Summary</h3>
              
              <div className="flex flex-col gap-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 pb-2">
                {items.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <img src={item.imageUrl} alt={item.name} className="w-16 h-20 object-cover rounded bg-gray-100" />
                    <div className="flex-1">
                      <p className="font-poppins font-medium text-sm text-zivara-black line-clamp-2 leading-snug">{item.name}</p>
                      <p className="font-poppins text-xs text-gray-500 mt-1">Qty: {item.quantity} | Size: {item.size || 'Free Size'}</p>
                      <p className="font-poppins font-semibold text-sm text-zivara-black mt-1">₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-3 font-poppins text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-zivara-black">₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-medium text-zivara-black">{shipping > 0 ? `₹${shipping}` : 'Free'}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>GST (5%)</span>
                  <span className="font-medium text-zivara-black">₹{gst}</span>
                </div>
                
                {user && user.loyaltyPoints && user.loyaltyPoints > 0 ? (
                  <div className="flex items-center justify-between mt-3 p-3 bg-zivara-beige/30 rounded border border-zivara-gold/20">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-zivara-gold" />
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-zivara-black">Zivara Points</span>
                        <span className="text-[10px] text-gray-500">Available: {user.loyaltyPoints}</span>
                      </div>
                    </div>
                    <label className="flex flex-col items-end gap-1 cursor-pointer select-none">
                      <div className="flex text-xs font-semibold text-zivara-gold">
                        -₹{user.loyaltyPoints}
                        <input 
                          type="checkbox" 
                          checked={redeemPoints}
                          onChange={(e) => setRedeemPoints(e.target.checked)}
                          className="ml-2 w-3.5 h-3.5 accent-zivara-gold rounded cursor-pointer"
                        />
                      </div>
                    </label>
                  </div>
                ) : null}
                
                {redeemPoints && user?.loyaltyPoints ? (
                  <div className="flex justify-between text-green-600 mt-2">
                    <span>Points Redemed</span>
                    <span className="font-medium">-₹{user.loyaltyPoints}</span>
                  </div>
                ) : null}
              </div>

              <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between items-end">
                <div className="flex flex-col">
                  <span className="font-poppins font-bold text-gray-800">Total Payable</span>
                  {user && (
                    <span className="text-[10px] text-gray-500 font-poppins mt-1 text-zivara-gold">
                      +₹{Math.round(finalTotal * 0.1)} points earned
                    </span>
                  )}
                </div>
                <span className="font-playfair font-bold text-2xl text-zivara-black">₹{finalTotal}</span>
              </div>
              
              <div className="mt-8 bg-gray-50 p-4 rounded-xl flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-green-600 flex-shrink-0" />
                <p className="font-poppins text-xs text-gray-600">
                  Safe and secure payments. 100% Authentic products. 7-day easy returns policy.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
