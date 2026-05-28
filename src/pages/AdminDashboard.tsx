import React, { useState } from 'react';
import { Package, Users, IndianRupee, MapPin, Grid, LogOut, CheckCircle, PackageOpen, LayoutDashboard, TrendingUp, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('analytics');

  const products = [
    { id: 'PROD-1', name: 'Floral Print Kurti', stock: 15, price: 1499, category: 'Kurtis' },
    { id: 'PROD-2', name: 'Cotton Palazzo Pants', stock: 4, price: 2000, category: 'Bottoms' },
    { id: 'PROD-3', name: 'Embroidered Silk Saree', stock: 0, price: 4500, category: 'Sarees' },
  ];

  const orders = [
    { id: 'ORD-8472', customer: 'Jane Doe', amount: 3499, status: 'Delivered', date: '12 May 2026' },
    { id: 'ORD-9213', customer: 'Rahul Kumar', amount: 4500, status: 'Processing', date: '25 May 2026' },
    { id: 'ORD-9214', customer: 'Sneha L', amount: 1500, status: 'Shipped', date: '26 May 2026' },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50 flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-zivara-black text-white p-6 flex flex-col">
        <div className="mb-10 flex items-center justify-between">
          <Link to="/" className="font-playfair text-2xl font-bold tracking-tight">
            Zivara<span className="text-zivara-gold">.</span> Admin
          </Link>
        </div>
        <nav className="flex-1 space-y-2">
          <button 
            onClick={() => setActiveTab('analytics')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === 'analytics' ? 'bg-white/10' : 'hover:bg-white/5'}`}
          >
            <TrendingUp className="w-5 h-5" />
            Analytics Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('inventory')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === 'inventory' ? 'bg-white/10' : 'hover:bg-white/5'}`}
          >
            <Package className="w-5 h-5" />
            Inventory & Products
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === 'orders' ? 'bg-white/10' : 'hover:bg-white/5'}`}
          >
            <PackageOpen className="w-5 h-5" />
            Orders & Payments
          </button>
          <button 
            onClick={() => setActiveTab('customers')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === 'customers' ? 'bg-white/10' : 'hover:bg-white/5'}`}
          >
            <Users className="w-5 h-5" />
            Customers
          </button>
        </nav>
        <div className="mt-auto">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white transition-colors">
            <LogOut className="w-5 h-5" />
            Exit Admin
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <h2 className="text-2xl font-playfair font-bold text-zivara-black mb-6">
          {activeTab === 'analytics' ? 'Analytics Dashboard' : activeTab === 'inventory' ? 'Inventory Management' : activeTab === 'orders' ? 'Orders & Payments' : 'Customers'}
        </h2>

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center"><IndianRupee className="w-6 h-6" /></div>
                  <div>
                    <h4 className="text-gray-500 font-poppins text-sm">Total Revenue</h4>
                    <p className="font-bold text-2xl font-poppins text-zivara-black">₹2,45,000</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center"><PackageOpen className="w-6 h-6" /></div>
                  <div>
                    <h4 className="text-gray-500 font-poppins text-sm">Total Orders</h4>
                    <p className="font-bold text-2xl font-poppins text-zivara-black">1,248</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center"><Users className="w-6 h-6" /></div>
                  <div>
                    <h4 className="text-gray-500 font-poppins text-sm">Active Customers</h4>
                    <p className="font-bold text-2xl font-poppins text-zivara-black">892</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center"><CreditCard className="w-6 h-6" /></div>
                  <div>
                    <h4 className="text-gray-500 font-poppins text-sm">Avg. Order Value</h4>
                    <p className="font-bold text-2xl font-poppins text-zivara-black">₹3,450</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-poppins font-medium text-lg mb-4 text-zivara-black">Top Selling Products</h3>
                <div className="space-y-4">
                  {[
                    {name: "Embroidered Silk Saree", sales: 124, revenue: "₹558,000"},
                    {name: "Floral Print Kurti", sales: 98, revenue: "₹146,902"},
                    {name: "Cotton Palazzo Pants", sales: 75, revenue: "₹150,000"}
                  ].map((p, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-gray-50 pb-2">
                       <div>
                         <p className="font-poppins text-sm font-medium text-zivara-black">{p.name}</p>
                         <p className="font-poppins text-xs text-gray-500">{p.sales} Sales</p>
                       </div>
                       <p className="font-poppins font-medium text-green-700">{p.revenue}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-poppins font-medium text-lg mb-4 text-zivara-black">Payment Methods Split</h3>
                <div className="space-y-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center text-sm font-poppins"><span className="text-zivara-black">UPI Payments</span><span className="font-medium text-gray-700">45%</span></div>
                    <div className="w-full bg-gray-100 rounded-full h-2"><div className="bg-blue-500 h-2 rounded-full" style={{width: '45%'}}></div></div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center text-sm font-poppins"><span className="text-zivara-black">Credit / Debit Cards</span><span className="font-medium text-gray-700">30%</span></div>
                    <div className="w-full bg-gray-100 rounded-full h-2"><div className="bg-purple-500 h-2 rounded-full" style={{width: '30%'}}></div></div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center text-sm font-poppins"><span className="text-zivara-black">Cash on Delivery (COD)</span><span className="font-medium text-gray-700">20%</span></div>
                    <div className="w-full bg-gray-100 rounded-full h-2"><div className="bg-orange-500 h-2 rounded-full" style={{width: '20%'}}></div></div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center text-sm font-poppins"><span className="text-zivara-black">Net Banking</span><span className="font-medium text-gray-700">5%</span></div>
                    <div className="w-full bg-gray-100 rounded-full h-2"><div className="bg-gray-500 h-2 rounded-full" style={{width: '5%'}}></div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-poppins font-medium text-lg">Product Stock Levels</h3>
              <button className="bg-zivara-black text-white px-4 py-2 text-sm rounded-lg hover:bg-zivara-black/80">Add New Product</button>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 text-gray-500 font-poppins text-sm">
                  <th className="pb-3 px-4">Product ID</th>
                  <th className="pb-3 px-4">Name</th>
                  <th className="pb-3 px-4">Category</th>
                  <th className="pb-3 px-4">Price</th>
                  <th className="pb-3 px-4 text-center">Stock</th>
                  <th className="pb-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id} className="border-b border-gray-50 flex-col md:table-row">
                    <td className="py-4 px-4 text-sm font-medium">{p.id}</td>
                    <td className="py-4 px-4 text-sm">{p.name}</td>
                    <td className="py-4 px-4 text-sm text-gray-500">{p.category}</td>
                    <td className="py-4 px-4 text-sm">₹{p.price}</td>
                    <td className="py-4 px-4 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${p.stock > 10 ? 'bg-green-100 text-green-700' : p.stock > 0 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                        {p.stock}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-poppins font-medium text-lg mb-6">Recent Orders</h3>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 text-gray-500 font-poppins text-sm">
                  <th className="pb-3 px-4">Order ID</th>
                  <th className="pb-3 px-4">Date</th>
                  <th className="pb-3 px-4">Customer</th>
                  <th className="pb-3 px-4">Amount</th>
                  <th className="pb-3 px-4">Status</th>
                  <th className="pb-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o.id} className="border-b border-gray-50">
                    <td className="py-4 px-4 text-sm font-medium">{o.id}</td>
                    <td className="py-4 px-4 text-sm text-gray-500">{o.date}</td>
                    <td className="py-4 px-4 text-sm">{o.customer}</td>
                    <td className="py-4 px-4 text-sm font-medium text-green-700">₹{o.amount}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${o.status === 'Delivered' ? 'bg-green-100 text-green-700' : o.status === 'Shipped' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>
                        {o.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">Manage</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'customers' && (
           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
           <h3 className="font-poppins font-medium text-lg mb-6">Customer Database</h3>
           <p className="text-gray-500 italic">No detailed customer records yet.</p>
         </div>
        )}
      </div>
    </div>
  );
}
