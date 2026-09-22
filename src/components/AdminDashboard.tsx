import React, { useState } from 'react';
import { 
  X, 
  Package, 
  ShoppingBag, 
  MessageSquare, 
  BarChart3, 
  Plus, 
  Edit3, 
  Trash2, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  Truck, 
  Clock, 
  Save, 
  Filter,
  Check,
  Send,
  Sparkles,
  Users,
  User,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import { Product, Order, CustomerQuery, OrderStatus, UserProfile } from '../types';
import { formatPrice, formatShortDate } from '../utils/formatters';
import { OmShopLogo } from './OmShopLogo';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  orders: Order[];
  queries: CustomerQuery[];
  users?: UserProfile[];
  onUpdateProductStock: (productId: string, newStock: number) => void;
  onUpdateProductPrice: (productId: string, newPrice: number) => void;
  onAddProduct: (newProduct: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onUpdateOrderStatus: (orderId: string, status: OrderStatus) => void;
  onReplyQuery: (queryId: string, replyText: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  products,
  orders,
  queries,
  users = [],
  onUpdateProductStock,
  onUpdateProductPrice,
  onAddProduct,
  onDeleteProduct,
  onUpdateOrderStatus,
  onReplyQuery,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'inventory' | 'orders' | 'users' | 'queries' | 'analytics'>('inventory');
  
  // Inventory state
  const [inventorySearch, setInventorySearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Users tab search
  const [userSearch, setUserSearch] = useState('');

  // New Product Form State
  const [newProductName, setNewProductName] = useState('');
  const [newProductBrand, setNewProductBrand] = useState<'Apple' | 'Samsung' | 'OnePlus' | 'Google' | 'Xiaomi' | 'Nothing' | 'Vivo' | 'Realme' | 'Sony' | 'Anker'>('Samsung');
  const [newProductCategory, setNewProductCategory] = useState<Product['category']>('smartphones');
  const [newProductPrice, setNewProductPrice] = useState('49999');
  const [newProductOriginalPrice, setNewProductOriginalPrice] = useState('54999');
  const [newProductStock, setNewProductStock] = useState('10');
  const [newProductProcessor, setNewProductProcessor] = useState('Snapdragon 8 Gen 3');
  const [newProductDisplay, setNewProductDisplay] = useState('6.7" AMOLED 120Hz');
  const [newProductCamera, setNewProductCamera] = useState('50MP OIS + 12MP Ultra-Wide');
  const [newProductBattery, setNewProductBattery] = useState('5000mAh, 67W Fast Charging');
  const [newProductImage, setNewProductImage] = useState('https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80');
  const [newProductShelf, setNewProductShelf] = useState('Shelf 02 - Central Showcase');

  // Orders Filter State
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [orderSearch, setOrderSearch] = useState('');

  // Queries Filter & Reply State
  const [selectedQuery, setSelectedQuery] = useState<CustomerQuery | null>(null);
  const [replyMessage, setReplyMessage] = useState('');

  // Calculations for analytics
  const totalRevenue = orders.reduce((acc, o) => acc + (o.paymentStatus === 'paid' ? o.totalAmount : 0), 0);
  const totalUnitsInStock = products.reduce((acc, p) => acc + p.stockCount, 0);
  const lowStockItems = products.filter((p) => p.stockCount <= p.minStockAlert);
  const pendingOrders = orders.filter((o) => o.orderStatus === 'pending' || o.orderStatus === 'processing');
  const openQueries = queries.filter((q) => q.status === 'open');

  const filteredProducts = products.filter((p) => {
    return (
      p.name.toLowerCase().includes(inventorySearch.toLowerCase()) ||
      p.brand.toLowerCase().includes(inventorySearch.toLowerCase()) ||
      p.category.toLowerCase().includes(inventorySearch.toLowerCase())
    );
  });

  const filteredOrders = orders.filter((o) => {
    const matchesFilter = orderStatusFilter === 'all' || o.orderStatus === orderStatusFilter;
    const matchesSearch =
      o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customerName.toLowerCase().includes(orderSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filteredUsers = users.filter((u) => {
    const q = userSearch.toLowerCase();
    return (
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      (u.phone && u.phone.toLowerCase().includes(q)) ||
      (u.address?.city && u.address.city.toLowerCase().includes(q))
    );
  });

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const priceNum = parseInt(newProductPrice, 10) || 10000;
    const origPriceNum = parseInt(newProductOriginalPrice, 10) || priceNum;
    const stockNum = parseInt(newProductStock, 10) || 5;

    const discount = origPriceNum > priceNum ? Math.round(((origPriceNum - priceNum) / origPriceNum) * 100) : 0;

    const product: Product = {
      id: `om-custom-${Date.now()}`,
      name: newProductName,
      brand: newProductBrand,
      category: newProductCategory,
      price: priceNum,
      originalPrice: origPriceNum,
      discountPercent: discount,
      rating: 4.8,
      reviewsCount: 12,
      stockCount: stockNum,
      minStockAlert: 3,
      isTrending: false,
      isFeatured: true,
      doorstepEligible: true,
      deliverySpeed: '2-Hour Express Doorstep',
      storeAvailability: {
        storeName: 'Om Mobile & Digitech Main Hub',
        aisle: 'Aisle B - Flagship Displays',
        shelfLocation: newProductShelf,
        unitsAvailable: stockNum,
      },
      image: newProductImage,
      gallery: [newProductImage],
      specs: {
        display: newProductDisplay,
        processor: newProductProcessor,
        camera: newProductCamera,
        battery: newProductBattery,
        ramStorage: '12GB RAM | 256GB Storage',
        warranty: '1 Year Brand Warranty',
      },
      description: `Authentic ${newProductBrand} device backed by Om Mobile & Digitech warranty guarantee. Inspected and verified in-store.`,
      highlights: ['100% Brand Sealed', 'Doorstep Ready', 'GST Invoice Included'],
      tags: [newProductBrand, newProductCategory, 'Fresh Stock'],
    };

    onAddProduct(product);
    setShowAddModal(false);
    setNewProductName('');
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedQuery && replyMessage.trim()) {
      onReplyQuery(selectedQuery.id, replyMessage.trim());
      setReplyMessage('');
      setSelectedQuery(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in">
      <div 
        className="relative w-full max-w-6xl max-h-[94vh] overflow-y-auto rounded-3xl bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-5 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 pb-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white border-2 border-black flex items-center justify-center p-0.5 shadow-xs overflow-hidden shrink-0">
              <OmShopLogo className="w-full h-full" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <h2 className="text-xl sm:text-2xl font-black text-black uppercase tracking-tight">
                  Om Mobile Admin Control Center
                </h2>
              </div>
              <p className="text-xs text-zinc-600 font-medium mt-0.5">
                Live In-Store Inventory Management • Doorstep Delivery Dispatch • Customer Inquiries
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="self-end sm:self-auto p-2 rounded-full border-2 border-black bg-zinc-100 hover:bg-zinc-200 text-black transition-all cursor-pointer"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black border-2 transition-all cursor-pointer ${
              activeTab === 'inventory'
                ? 'bg-[#FEE500] border-black text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                : 'bg-zinc-100 border-zinc-300 text-zinc-700 hover:bg-zinc-200'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Store Inventory ({products.length})</span>
            {lowStockItems.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-amber-500" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black border-2 transition-all cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-[#FEE500] border-black text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                : 'bg-zinc-100 border-zinc-300 text-zinc-700 hover:bg-zinc-200'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Doorstep Orders ({orders.length})</span>
            {pendingOrders.length > 0 && (
              <span className="px-1.5 py-0.2 rounded bg-black text-white text-[10px]">
                {pendingOrders.length} new
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black border-2 transition-all cursor-pointer ${
              activeTab === 'users'
                ? 'bg-[#FEE500] border-black text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                : 'bg-zinc-100 border-zinc-300 text-zinc-700 hover:bg-zinc-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Registered Users &amp; Profiles ({users.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('queries')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black border-2 transition-all cursor-pointer ${
              activeTab === 'queries'
                ? 'bg-[#FEE500] border-black text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                : 'bg-zinc-100 border-zinc-300 text-zinc-700 hover:bg-zinc-200'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Customer Queries ({queries.length})</span>
            {openQueries.length > 0 && (
              <span className="px-1.5 py-0.2 rounded bg-rose-500 text-white text-[10px]">
                {openQueries.length} open
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black border-2 transition-all cursor-pointer ${
              activeTab === 'analytics'
                ? 'bg-[#FEE500] border-black text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                : 'bg-zinc-100 border-zinc-300 text-zinc-700 hover:bg-zinc-200'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Store Analytics</span>
          </button>
        </div>

        {/* TAB 1: INVENTORY MANAGEMENT */}
        {activeTab === 'inventory' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative flex-1 w-full max-w-md">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search inventory by model, brand, or shelf location..."
                  value={inventorySearch}
                  onChange={(e) => setInventorySearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-zinc-50 border border-zinc-300 text-xs font-bold text-black focus:outline-none focus:border-black"
                />
              </div>

              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FEE500] hover:bg-[#ebd300] text-black font-black text-xs border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Device to Catalog</span>
              </button>
            </div>

            {/* Inventory Table */}
            <div className="overflow-x-auto border-2 border-black rounded-2xl">
              <table className="w-full text-xs text-left">
                <thead className="bg-zinc-100 border-b border-zinc-200 font-black text-zinc-700 uppercase tracking-wider">
                  <tr>
                    <th className="p-3">Product / Brand</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Live Stock</th>
                    <th className="p-3">Shelf Placement</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 font-medium text-zinc-900 bg-white">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-zinc-50">
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-10 h-10 object-contain rounded-lg bg-zinc-50 border border-zinc-200 p-0.5"
                          />
                          <div>
                            <span className="text-[10px] uppercase font-bold text-zinc-500 block">
                              {product.brand} • {product.category}
                            </span>
                            <span className="font-black text-black line-clamp-1">{product.name}</span>
                          </div>
                        </div>
                      </td>

                      {/* Price Quick Edit */}
                      <td className="p-3 font-bold">
                        <div className="flex items-center gap-1.5">
                          <span>{formatPrice(product.price)}</span>
                        </div>
                      </td>

                      {/* Stock Stepper */}
                      <td className="p-3">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => onUpdateProductStock(product.id, Math.max(0, product.stockCount - 1))}
                            className="w-6 h-6 rounded bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 flex items-center justify-center font-black cursor-pointer"
                          >
                            -
                          </button>
                          <span className={`px-2 py-0.5 rounded text-xs font-black min-w-[40px] text-center ${
                            product.stockCount === 0 
                              ? 'bg-rose-100 text-rose-800' 
                              : product.stockCount <= 3 
                                ? 'bg-amber-100 text-amber-900' 
                                : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {product.stockCount}
                          </span>
                          <button
                            onClick={() => onUpdateProductStock(product.id, product.stockCount + 1)}
                            className="w-6 h-6 rounded bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 flex items-center justify-center font-black cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </td>

                      <td className="p-3 text-zinc-600">
                        <span className="font-bold text-black">{product.storeAvailability.shelfLocation}</span>
                      </td>

                      <td className="p-3 text-right">
                        <button
                          onClick={() => onDeleteProduct(product.id)}
                          className="p-1.5 text-zinc-400 hover:text-rose-600 transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-zinc-500">Filter Status:</span>
                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-zinc-50 border border-zinc-300 text-xs font-bold text-black focus:outline-none"
                >
                  <option value="all">All Orders ({orders.length})</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="dispatched">Dispatched (Rider En Route)</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>

              <div className="text-xs text-zinc-500 font-bold">
                Total Orders Logged: <strong className="text-black">{filteredOrders.length}</strong>
              </div>
            </div>

            {filteredOrders.length === 0 ? (
              <div className="py-12 text-center text-zinc-500 text-xs font-medium">
                No orders match the selected filter.
              </div>
            ) : (
              <div className="space-y-3">
                {filteredOrders.map((order) => (
                  <div key={order.id} className="p-4 rounded-2xl bg-zinc-50 border-2 border-black space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-black text-sm">{order.id}</span>
                        <span className="text-xs text-zinc-500">• {formatShortDate(order.orderDate)}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                          order.deliveryMethod === 'doorstep_express' 
                            ? 'bg-[#FEE500] text-black border border-black' 
                            : 'bg-zinc-200 text-zinc-800'
                        }`}>
                          {order.deliveryMethod === 'doorstep_express' ? '⚡ 45m Doorstep' : 'Standard Delivery'}
                        </span>
                      </div>

                      {/* Status Selector */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-zinc-600">Status:</span>
                        <select
                          value={order.orderStatus}
                          onChange={(e) => onUpdateOrderStatus(order.id, e.target.value as OrderStatus)}
                          className={`px-3 py-1 rounded-lg text-xs font-black border cursor-pointer ${
                            order.orderStatus === 'delivered'
                              ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                              : order.orderStatus === 'out_for_delivery'
                                ? 'bg-cyan-100 text-cyan-800 border-cyan-300'
                                : 'bg-amber-100 text-amber-800 border-amber-300'
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="out_for_delivery">Out for Delivery (Rider En Route)</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div>
                        <span className="text-zinc-500 font-bold block">Customer:</span>
                        <span className="font-black text-black">{order.customerName}</span>
                        <div className="text-zinc-600">{order.customerPhone}</div>
                      </div>

                      <div>
                        <span className="text-zinc-500 font-bold block">Address:</span>
                        <span className="text-zinc-800 font-medium">
                          {order.address?.street ? `${order.address.street}, ${order.address.city} - ${order.address.pincode}` : 'Store Pickup'}
                        </span>
                      </div>

                      <div>
                        <span className="text-zinc-500 font-bold block">Payment &amp; Items:</span>
                        <span className="font-black text-black">{formatPrice(order.totalAmount)}</span>
                        <span className="text-[10px] font-bold uppercase ml-1 px-1.5 py-0.5 rounded bg-zinc-200 text-zinc-700">
                          {order.paymentMethod} • {order.paymentStatus}
                        </span>
                        <div className="text-[11px] text-zinc-500 mt-1">
                          {order.items.map(i => `${i.quantity}x ${i.product.name}`).join(', ')}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: REGISTERED USERS & PROFILES */}
        {activeTab === 'users' && (
          <div className="space-y-4">
            {/* Search and stats bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-zinc-50 p-3.5 rounded-2xl border border-zinc-200">
              <div className="relative flex-1 min-w-[220px]">
                <input
                  type="text"
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  placeholder="Search user by name, email, phone, or city..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-zinc-300 text-xs font-bold text-black focus:outline-none focus:border-black"
                />
                <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-zinc-600">
                <span>Showing: <strong className="text-black font-black">{filteredUsers.length}</strong> accounts</span>
              </div>
            </div>

            {filteredUsers.length === 0 ? (
              <div className="p-8 text-center bg-zinc-50 rounded-2xl border-2 border-dashed border-zinc-300">
                <Users className="w-8 h-8 text-zinc-400 mx-auto mb-2" />
                <p className="font-bold text-zinc-600 text-sm">No registered user profiles found</p>
                <p className="text-xs text-zinc-400 mt-1">Users will appear here once they create an account or sign in to purchase devices.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredUsers.map((user) => {
                  const userOrders = orders.filter(o => 
                    o.customerEmail.toLowerCase() === user.email.toLowerCase() || 
                    (user.phone && o.customerPhone === user.phone)
                  );
                  const userSpend = userOrders.reduce((sum, o) => sum + (o.paymentStatus === 'paid' ? o.totalAmount : 0), 0);

                  return (
                    <div key={user.id} className="p-4 rounded-2xl bg-zinc-50 border-2 border-black space-y-3 shadow-xs">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-full bg-black text-[#FEE500] font-black text-xs flex items-center justify-center border border-black shrink-0">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h4 className="font-black text-black text-sm">{user.name}</h4>
                            <span className="text-[11px] text-zinc-500 font-medium">{user.id}</span>
                          </div>
                        </div>

                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                          user.role === 'admin'
                            ? 'bg-[#FEE500] text-black border-black shadow-xs'
                            : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        }`}>
                          {user.role}
                        </span>
                      </div>

                      {/* Contact details */}
                      <div className="space-y-1 text-xs text-zinc-700 pt-1 border-t border-zinc-200">
                        <div className="flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                          <span className="truncate">{user.email}</span>
                        </div>
                        {user.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                            <span>{user.phone}</span>
                          </div>
                        )}
                        {user.address && (
                          <div className="flex items-start gap-2">
                            <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                            <span className="text-zinc-600 font-medium">
                              {user.address.street}, {user.address.city} - {user.address.pincode}
                              {user.address.landmark && ` (Near ${user.address.landmark})`}
                            </span>
                          </div>
                        )}
                        {user.createdAt && (
                          <div className="flex items-center gap-2 text-zinc-400 text-[11px]">
                            <Calendar className="w-3 h-3 text-zinc-400 shrink-0" />
                            <span>Joined {formatShortDate(user.createdAt)}</span>
                          </div>
                        )}
                      </div>

                      {/* Purchasing Activity / Order Stats */}
                      <div className="pt-2 border-t border-zinc-200 grid grid-cols-2 gap-2 bg-white p-2.5 rounded-xl border border-zinc-200 text-center">
                        <div>
                          <span className="text-[10px] font-bold text-zinc-500 uppercase block">Orders Placed</span>
                          <span className="text-xs font-black text-black">{userOrders.length}</span>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-zinc-500 uppercase block">Total Spend</span>
                          <span className="text-xs font-black text-emerald-700">{formatPrice(userSpend)}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: CUSTOMER QUERIES */}
        {activeTab === 'queries' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Queries List */}
              <div className="md:col-span-5 space-y-2 max-h-[500px] overflow-y-auto pr-1">
                {queries.map((q) => (
                  <div
                    key={q.id}
                    onClick={() => { setSelectedQuery(q); setReplyMessage(q.adminReply || ''); }}
                    className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer ${
                      selectedQuery?.id === q.id
                        ? 'bg-[#FEE500]/30 border-black shadow-xs'
                        : 'bg-zinc-50 border-zinc-200 hover:border-zinc-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-black text-black text-xs">{q.customerName}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        q.status === 'replied' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {q.status === 'replied' ? 'Replied' : 'Awaiting Reply'}
                      </span>
                    </div>
                    <div className="text-xs text-zinc-700 font-medium line-clamp-2">
                      "{q.message}"
                    </div>
                    <div className="text-[10px] text-zinc-400 mt-1">
                      Target: {q.productName || 'General Store Question'}
                    </div>
                  </div>
                ))}
              </div>

              {/* Reply Box */}
              <div className="md:col-span-7 bg-zinc-50 border-2 border-black rounded-2xl p-4 sm:p-5">
                {selectedQuery ? (
                  <div className="space-y-4">
                    <div className="border-b border-zinc-200 pb-3">
                      <div className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Inquiry from:</div>
                      <h4 className="text-base font-black text-black">{selectedQuery.customerName}</h4>
                      <div className="text-xs text-zinc-600 font-medium">{selectedQuery.customerContact}</div>
                      <div className="mt-2 p-3 rounded-xl bg-white border border-zinc-200 text-xs font-medium text-black">
                        "{selectedQuery.message}"
                      </div>
                    </div>

                    <form onSubmit={handleSendReply} className="space-y-3">
                      <label className="block text-xs font-black text-zinc-700 uppercase tracking-wider">
                        Send Response to Customer:
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={replyMessage}
                        onChange={(e) => setReplyMessage(e.target.value)}
                        placeholder="Write your advice, in-store stock confirmation, or doorstep ETA..."
                        className="w-full p-3 rounded-xl bg-white border border-zinc-300 text-xs font-medium text-black focus:outline-none focus:border-black"
                      />
                      <button
                        type="submit"
                        className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FEE500] hover:bg-[#ebd300] text-black font-black text-xs border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Dispatch Answer to Customer</span>
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className="py-16 text-center text-zinc-400 text-xs font-medium">
                    Select an inquiry from the left to view details and send an answer.
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* TAB 4: STORE ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-zinc-50 border-2 border-black">
                <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block">Total Sales Revenue</span>
                <span className="text-2xl font-black text-black mt-1 block">{formatPrice(totalRevenue)}</span>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-50 border-2 border-black">
                <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block">Units on Physical Shelves</span>
                <span className="text-2xl font-black text-black mt-1 block">{totalUnitsInStock} Units</span>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-50 border-2 border-black">
                <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block">Active Doorstep Orders</span>
                <span className="text-2xl font-black text-black mt-1 block">{pendingOrders.length}</span>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-50 border-2 border-black">
                <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block">Open Inquiries</span>
                <span className="text-2xl font-black text-rose-600 mt-1 block">{openQueries.length}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200">
              <h4 className="text-xs font-black text-black uppercase tracking-wider mb-2">
                Store Performance Overview
              </h4>
              <p className="text-xs text-zinc-600 leading-relaxed font-medium">
                Om Mobile &amp; Digitech maintains direct authorized retail contracts with Apple, Samsung, OnePlus, Google, and Xiaomi. All orders placed through the website trigger instant inventory reservations, preventing accidental overselling and guaranteeing doorstep delivery within promised windows.
              </p>
            </div>
          </div>
        )}

        {/* ADD PRODUCT MODAL */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white border-2 border-black rounded-3xl p-6 max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
                <h3 className="text-base font-black text-black uppercase">Add New Device to Catalog</h3>
                <button onClick={() => setShowAddModal(false)} className="p-1 text-zinc-500 hover:text-black">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Device Model Name *</label>
                  <input
                    type="text"
                    required
                    value={newProductName}
                    onChange={(e) => setNewProductName(e.target.value)}
                    placeholder="e.g. Google Pixel 9 Pro 5G"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-300 font-bold text-black focus:border-black focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-zinc-700 mb-1">Brand</label>
                    <select
                      value={newProductBrand}
                      onChange={(e) => setNewProductBrand(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-300 font-bold text-black"
                    >
                      <option value="Apple">Apple</option>
                      <option value="Samsung">Samsung</option>
                      <option value="OnePlus">OnePlus</option>
                      <option value="Google">Google</option>
                      <option value="Xiaomi">Xiaomi</option>
                      <option value="Realme">Realme</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-zinc-700 mb-1">Category</label>
                    <select
                      value={newProductCategory}
                      onChange={(e) => setNewProductCategory(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-300 font-bold text-black"
                    >
                      <option value="smartphones">Smartphones</option>
                      <option value="audio">Audio / Earbuds</option>
                      <option value="power-chargers">Power Chargers</option>
                      <option value="accessories">Accessories</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block font-bold text-zinc-700 mb-1">Offer Price (₹)</label>
                    <input
                      type="number"
                      required
                      value={newProductPrice}
                      onChange={(e) => setNewProductPrice(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-300 font-bold text-black"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-zinc-700 mb-1">MRP Price (₹)</label>
                    <input
                      type="number"
                      required
                      value={newProductOriginalPrice}
                      onChange={(e) => setNewProductOriginalPrice(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-300 font-bold text-black"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-zinc-700 mb-1">Initial Stock</label>
                    <input
                      type="number"
                      required
                      value={newProductStock}
                      onChange={(e) => setNewProductStock(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-300 font-bold text-black"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 mb-1">In-Store Shelf Location</label>
                  <input
                    type="text"
                    value={newProductShelf}
                    onChange={(e) => setNewProductShelf(e.target.value)}
                    placeholder="Shelf 04 - Android Counter"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-300 font-bold text-black"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-xl border border-zinc-300 font-bold text-zinc-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-[#FEE500] border border-black text-black font-black shadow-xs"
                  >
                    Save &amp; Publish
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
