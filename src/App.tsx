/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Check } from 'lucide-react';
import { useCart } from './context/CartContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import Products from './components/Products';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Instagram from './components/Instagram';
import Faqs from './components/Faqs';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import ProfileDrawer from './components/ProfileDrawer';
import WhatsAppFAB from './components/WhatsAppFAB';
import ScrollToTopFAB from './components/ScrollToTopFAB';
import AdminDashboard from './pages/AdminDashboard';
import TrackOrderPage from './pages/TrackOrderPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';

function GlobalToast() {
  const { toastMessage } = useCart();
  
  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          className="fixed top-10 left-1/2 -translate-x-1/2 z-[100] bg-zivara-black text-white px-6 py-3 rounded-full flex items-center gap-3 shadow-xl font-poppins font-medium text-sm border border-white/20"
        >
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shrink-0">
            <Check className="w-4 h-4 text-white" />
          </div>
          {toastMessage}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MainLayout() {
  return (
    <>
      <Navbar />
      <CartDrawer />
      <WishlistDrawer />
      <ProfileDrawer />
      <WhatsAppFAB />
      <ScrollToTopFAB />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

function Home() {
  return (
    <>
      <Hero />
      <Products />
      <Categories />
      <About />
      <Testimonials />
      <Instagram />
      <Faqs />
    </>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-zivara-beige selection:bg-zivara-pink selection:text-white">
      <GlobalToast />
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/success" element={<OrderSuccessPage />} />
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/track" element={<TrackOrderPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

