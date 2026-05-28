/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
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
import AdminDashboard from './pages/AdminDashboard';
import TrackOrderPage from './pages/TrackOrderPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';

function MainLayout() {
  return (
    <>
      <Navbar />
      <CartDrawer />
      <WishlistDrawer />
      <ProfileDrawer />
      <WhatsAppFAB />
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

