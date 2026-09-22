import React, { useState, useEffect, useMemo } from 'react';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_ORDERS, 
  INITIAL_QUERIES,
  INITIAL_USERS 
} from './data/mockData';
import { 
  Product, 
  CartItem, 
  Order, 
  CustomerQuery, 
  FilterState, 
  OrderStatus,
  UserProfile,
  UserRole
} from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TrendingSection } from './components/TrendingSection';
import { SearchAndFilterBar } from './components/SearchAndFilterBar';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CompareModal } from './components/CompareModal';
import { CartAndCheckoutModal } from './components/CartAndCheckoutModal';
import { AdminDashboard } from './components/AdminDashboard';
import { DoorstepModal } from './components/DoorstepModal';
import { AskQueryModal } from './components/AskQueryModal';
import { AuthModal } from './components/AuthModal';
import { NotificationsModal } from './components/NotificationsModal';
import { AdminAlertBanner, AdminAlertNotification } from './components/AdminAlertBanner';
import { AboutSection } from './components/AboutSection';
import { StoreServicesSection } from './components/StoreServicesSection';
import { LocationSection } from './components/LocationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { 
  Layers, 
  MessageSquare, 
  Truck, 
  Sparkles, 
  CheckCircle2, 
  SlidersHorizontal,
  Tag,
  LayoutGrid,
  ArrowRight,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';

const STORAGE_KEYS = {
  PRODUCTS: 'om_mobile_products_v1',
  ORDERS: 'om_mobile_orders_v1',
  QUERIES: 'om_mobile_queries_v1',
  CART: 'om_mobile_cart_v1',
  USERS: 'om_mobile_registered_users_v1',
  CURRENT_USER: 'om_mobile_current_user_v1',
  READ_REPLIES: 'om_mobile_read_replies_v1',
};

const BRAND_METADATA: Record<string, { tag: string; description: string; badge: string }> = {
  Apple: {
    tag: 'Official Authorized Reseller',
    description: 'Genuine Apple iPhones, AirPods, and MagSafe accessories with 1-Year Apple India Warranty.',
    badge: 'Apple Authorized',
  },
  Samsung: {
    tag: 'Official Galaxy Partner',
    description: 'Galaxy S-Series flagships, FE editions, and official Super Fast charging power gear.',
    badge: 'Samsung Partner',
  },
  OnePlus: {
    tag: 'Official Experience Desk',
    description: 'Fast flagship performance, Hasselblad camera tuning, and SUPERVOOC high-wattage charging.',
    badge: 'OnePlus Direct',
  },
  Google: {
    tag: 'Authorized Pixel Showcase',
    description: 'Pure Google Android with Tensor chips, Gemini AI integration, and top-tier computational cameras.',
    badge: 'Google Pixel',
  },
  Xiaomi: {
    tag: 'Authorized Leica Partner',
    description: 'Pro Leica camera sensor hardware, 120Hz displays, and HyperCharge fast adapters.',
    badge: 'Xiaomi Authorized',
  },
  Nothing: {
    tag: 'Authorized Design Desk',
    description: 'Innovative Glyph LED interface, transparent industrial design, and bloatware-free Nothing OS.',
    badge: 'Nothing Partner',
  },
  boAt: {
    tag: 'Official Audio Partner',
    description: 'High-bass TWS earbuds, long battery playback, and IPX water resistance.',
    badge: 'boAt Official',
  },
  Anker: {
    tag: 'Official Charging Partner',
    description: 'GaNPrime multi-port high wattage wall adapters and magnetic Qi2 power banks.',
    badge: 'Anker Power',
  },
  Spigen: {
    tag: 'Authorized Protection Partner',
    description: 'Military-grade shock protection cases and precision tempered glass guards.',
    badge: 'Spigen Shield',
  },
};

export default function App() {
  // 1. Persistent Products State
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0]?.id && parsed[0]?.price) {
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    return INITIAL_PRODUCTS;
  });

  // 2. Persistent Orders State
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // fallback
    }
    return INITIAL_ORDERS;
  });

  // 3. Persistent Queries State
  const [queries, setQueries] = useState<CustomerQuery[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.QUERIES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // fallback
    }
    return INITIAL_QUERIES;
  });

  // 4. Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // fallback
    }
    return [];
  });

  // 5. Compare List State
  const [compareList, setCompareList] = useState<Product[]>([]);

  // 6. Registered Users State
  const [users, setUsers] = useState<UserProfile[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USERS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return INITIAL_USERS;
  });

  // 7. Active / Logged-in User State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return null;
  });

  // 8. Search & Filter State
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    category: 'all',
    brand: 'all',
    priceRange: [1000, 160000],
    inStockOnly: false,
    expressDeliveryOnly: false,
    sortBy: 'featured',
  });

  // 9. Modals and Views State
  const [activeDetailProduct, setActiveDetailProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCompareOpen, setIsCompareOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isDoorstepModalOpen, setIsDoorstepModalOpen] = useState<boolean>(false);
  const [queryModalProduct, setQueryModalProduct] = useState<Product | null>(null);
  const [isQueryModalOpen, setIsQueryModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authInitialRole, setAuthInitialRole] = useState<UserRole>('customer');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [activeAdminAlert, setActiveAdminAlert] = useState<AdminAlertNotification | null>(null);

  // Track read notification IDs
  const [readReplyIds, setReadReplyIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.READ_REPLIES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // fallback
    }
    return [];
  });

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch {
      // ignore
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.QUERIES, JSON.stringify(queries));
    } catch {
      // ignore
    }
  }, [queries]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    } catch {
      // ignore
    }
  }, [users]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
      }
    } catch {
      // ignore
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.READ_REPLIES, JSON.stringify(readReplyIds));
    } catch {
      // ignore
    }
  }, [readReplyIds]);

  // All queries with store staff reply
  const repliedQueries = useMemo(() => {
    return queries.filter((q) => q.status === 'replied' && q.adminReply);
  }, [queries]);

  // Unread notifications count
  const unreadNotificationsCount = useMemo(() => {
    return repliedQueries.filter((q) => !readReplyIds.includes(q.id)).length;
  }, [repliedQueries, readReplyIds]);

  const handleMarkAsRead = (queryId: string) => {
    setReadReplyIds((prev) => {
      if (prev.includes(queryId)) return prev;
      return [...prev, queryId];
    });
  };

  const handleMarkAllAsRead = () => {
    const allIds = repliedQueries.map((q) => q.id);
    setReadReplyIds(allIds);
    showToast('All notifications marked as read.');
  };

  // Unique Brands list
  const availableBrands = useMemo(() => {
    const brandsSet = new Set(products.map((p) => p.brand));
    return Array.from(brandsSet);
  }, [products]);

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search query
        if (filters.searchQuery.trim()) {
          const q = filters.searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchBrand = p.brand.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchSpec =
            p.specs.processor?.toLowerCase().includes(q) ||
            p.specs.camera?.toLowerCase().includes(q) ||
            p.specs.display?.toLowerCase().includes(q);
          if (!matchName && !matchBrand && !matchDesc && !matchSpec) {
            return false;
          }
        }

        // Category filter
        if (filters.category !== 'all') {
          if (filters.category === 'accessories') {
            if (p.category !== 'accessories' && p.category !== 'power-chargers') {
              return false;
            }
          } else if (p.category !== filters.category) {
            return false;
          }
        }

        // Brand filter
        if (filters.brand !== 'all' && p.brand !== filters.brand) {
          return false;
        }

        // Price range
        if (p.price > filters.priceRange[1]) {
          return false;
        }

        // In-stock only
        if (filters.inStockOnly && p.stockCount === 0) {
          return false;
        }

        // Express delivery only
        if (filters.expressDeliveryOnly && !p.deliverySpeed.includes('2-Hour')) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'price-low') return a.price - b.price;
        if (filters.sortBy === 'price-high') return b.price - a.price;
        if (filters.sortBy === 'rating') return b.rating - a.rating;
        if (filters.sortBy === 'stock') return b.stockCount - a.stockCount;
        // Default 'featured'
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [products, filters]);

  // Catalog View Mode: 'byBrand' (categorized by brand) or 'grid' (single flat grid)
  const [catalogViewMode, setCatalogViewMode] = useState<'byBrand' | 'grid'>('byBrand');

  // Group filtered products by brand name for structured categorization
  const productsByBrand = useMemo(() => {
    const groups: { [brand: string]: Product[] } = {};
    for (const product of filteredProducts) {
      if (!groups[product.brand]) {
        groups[product.brand] = [];
      }
      groups[product.brand].push(product);
    }
    return groups;
  }, [filteredProducts]);

  const brandGroupsList = useMemo(() => {
    return Object.entries(productsByBrand);
  }, [productsByBrand]);

  // Cart operations
  const handleAddToCart = (product: Product, selectedColor?: string) => {
    if (product.stockCount <= 0) {
      showToast(`Sorry, ${product.name} is currently out of stock.`);
      return;
    }

    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === selectedColor
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = Math.min(product.stockCount, updated[existingIndex].quantity + 1);
        updated[existingIndex].quantity = newQty;
        return updated;
      }
      return [...prev, { product, quantity: 1, selectedColor }];
    });

    showToast(`Added ${product.name} to your cart!`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from cart.');
  };

  const handleClearCart = () => {
    setCartItems([]);
    showToast('Cart cleared.');
  };

  // Direct Buy Now action from modal
  const handleBuyNow = (product: Product, selectedColor?: string) => {
    handleAddToCart(product, selectedColor);
    setActiveDetailProduct(null);
    setIsCartOpen(true);
  };

  // Compare operations
  const handleToggleCompare = (product: Product) => {
    setCompareList((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast(`Removed ${product.name} from comparison.`);
        return prev.filter((p) => p.id !== product.id);
      }
      if (prev.length >= 4) {
        showToast('You can compare up to 4 devices at a time.');
        return prev;
      }
      showToast(`Added ${product.name} to comparison.`);
      return [...prev, product];
    });
  };

  const handleRemoveFromCompare = (productId: string) => {
    setCompareList((prev) => prev.filter((p) => p.id !== productId));
  };

  const handleClearCompare = () => {
    setCompareList([]);
  };

  // Order Placement (drives live stock deduction in real-time!)
  const handlePlaceOrder = (newOrder: Order) => {
    // 1. Add order to list
    setOrders((prev) => [newOrder, ...prev]);

    // 2. Real-time Stock Deduction
    setProducts((prev) =>
      prev.map((p) => {
        const orderedItem = newOrder.items.find((item) => item.product.id === p.id);
        if (orderedItem) {
          const updatedStock = Math.max(0, p.stockCount - orderedItem.quantity);
          return {
            ...p,
            stockCount: updatedStock,
            storeAvailability: {
              ...p.storeAvailability,
              unitsAvailable: updatedStock,
            },
          };
        }
        return p;
      })
    );

    // 3. Clear cart
    setCartItems([]);
    showToast(`Order ${newOrder.id} placed! Real-time stock updated.`);
  };

  // Admin Actions
  const handleUpdateProductStock = (productId: string, newStock: number) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId
          ? {
              ...p,
              stockCount: newStock,
              storeAvailability: {
                ...p.storeAvailability,
                unitsAvailable: newStock,
              },
            }
          : p
      )
    );
    showToast('In-store real-time stock updated.');
  };

  const handleUpdateProductPrice = (productId: string, newPrice: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, price: newPrice } : p))
    );
    showToast('Selling price updated in real-time.');
  };

  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`Published ${newProduct.name} to store catalog!`);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    showToast('Product removed from catalog.');
  };

  const handleUpdateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, orderStatus: status } : o))
    );
    showToast(`Order ${orderId} updated to ${status.replace(/_/g, ' ')}`);
  };

  const handleReplyQuery = (queryId: string, replyText: string) => {
    let targetQuery: CustomerQuery | undefined;

    setQueries((prev) =>
      prev.map((q) => {
        if (q.id === queryId) {
          targetQuery = {
            ...q,
            status: 'replied',
            adminReply: replyText,
            replyTimestamp: new Date().toISOString(),
          };
          return targetQuery;
        }
        return q;
      })
    );

    // Make sure it's unread so notification badge increments
    setReadReplyIds((prev) => prev.filter((id) => id !== queryId));

    // Trigger floating alert notification
    setActiveAdminAlert({
      id: `alert-${Date.now()}`,
      queryId,
      subject: targetQuery?.subject || 'Store Inquiry',
      adminReply: replyText,
      customerName: targetQuery?.customerName,
      timestamp: new Date().toISOString(),
    });

    showToast('Store reply recorded and alert notification sent!');
  };

  // Simulate an Admin Reply to test notifications
  const handleSimulateAdminReply = () => {
    const openQ = queries.find((q) => q.status === 'open');
    if (openQ) {
      const demoReplies = [
        'Yes! We have sealed units in stock right now at our Umargam counter. We can also dispatch for 45-min doorstep delivery!',
        'Confirmed with our shop inventory! Special festive store discount applied: ₹1,500 off if you pick up today.',
        'Hello! Your inquiry is confirmed. We have reserved the device under your name for the next 2 hours.',
      ];
      const randomReply = demoReplies[Math.floor(Math.random() * demoReplies.length)];
      handleReplyQuery(openQ.id, randomReply);
    } else {
      const newQueryId = `QRY-${Math.floor(200 + Math.random() * 800)}`;
      const replyText = 'Store Manager: Yes! We have 3 units ready at counter. Doorstep delivery agent can reach you within 45 mins in Umargam.';
      const newQ: CustomerQuery = {
        id: newQueryId,
        customerName: currentUser?.name || 'Customer',
        customerContact: currentUser?.phone || '+91 92743 05279',
        subject: 'Real-time stock & price check for iPhone 16 Pro Max',
        message: 'Is the phone available for fast pickup or doorstep delivery today?',
        timestamp: new Date().toISOString(),
        status: 'replied',
        category: 'stock_inquiry',
        adminReply: replyText,
        replyTimestamp: new Date().toISOString(),
      };
      setQueries((prev) => [newQ, ...prev]);
      setReadReplyIds((prev) => prev.filter((id) => id !== newQueryId));
      setActiveAdminAlert({
        id: `alert-${Date.now()}`,
        queryId: newQueryId,
        subject: newQ.subject,
        adminReply: replyText,
        customerName: newQ.customerName,
        timestamp: new Date().toISOString(),
      });
      showToast('New message from Store Admin received!');
    }
  };

  // User Query Submission
  const handleSubmitQuery = (
    queryData: Omit<CustomerQuery, 'id' | 'timestamp' | 'status'>
  ) => {
    const newQuery: CustomerQuery = {
      ...queryData,
      id: `QRY-${Math.floor(100 + Math.random() * 900)}`,
      timestamp: new Date().toISOString(),
      status: 'open',
    };
    setQueries((prev) => [newQuery, ...prev]);
    showToast('Your query has been sent directly to store staff.');
  };

  // User and Auth Handlers
  const handleLogin = (user: UserProfile) => {
    setCurrentUser(user);
    setUsers((prev) => {
      const exists = prev.some((u) => u.id === user.id || u.email.toLowerCase() === user.email.toLowerCase());
      if (exists) {
        return prev.map((u) => (u.id === user.id || u.email.toLowerCase() === user.email.toLowerCase() ? user : u));
      }
      return [user, ...prev];
    });

    if (user.role === 'admin') {
      showToast(`Welcome Admin ${user.name}! Accessing management panel.`);
      setIsAdminOpen(true);
    } else {
      showToast(`Welcome back, ${user.name}!`);
    }
  };

  const handleLogout = () => {
    const prevName = currentUser?.name;
    setCurrentUser(null);
    setIsAdminOpen(false);
    showToast(`Logged out successfully.`);
  };

  const handleOpenAuth = (role: UserRole = 'customer') => {
    setAuthInitialRole(role);
    setIsAuthModalOpen(true);
  };

  const handleOpenAdminTrigger = () => {
    if (currentUser?.role === 'admin') {
      setIsAdminOpen(!isAdminOpen);
    } else {
      handleOpenAuth('admin');
    }
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('products') || document.getElementById('catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSection = (sectionId: string) => {
    setIsAdminOpen(false);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = 
      document.getElementById(sectionId) || 
      (sectionId === 'products' ? document.getElementById('catalog-section') : null);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 selection:bg-[#FEE500] selection:text-black">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-black text-white text-xs font-bold shadow-2xl border-2 border-black animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-[#FEE500]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header / Navigation */}
      <Navbar
        cartItems={cartItems}
        compareList={compareList}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenCompare={() => setIsCompareOpen(true)}
        onOpenAdmin={handleOpenAdminTrigger}
        isAdminOpen={isAdminOpen}
        onNavigateSection={scrollToSection}
        onSelectCategory={(cat) => {
          setFilters((prev) => ({ ...prev, category: cat }));
          scrollToCatalog();
        }}
        activeCategory={filters.category}
        onSearchChange={(q) => setFilters((prev) => ({ ...prev, searchQuery: q }))}
        searchQuery={filters.searchQuery}
        onOpenDoorstepModal={() => setIsDoorstepModalOpen(true)}
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        unreadNotificationsCount={unreadNotificationsCount}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
      />

      {/* Main Container */}
      <main id="home">
        {/* Hero Section directly matching the uploaded reference style with floating wire */}
        <HeroSection
          products={products.length > 0 ? products : INITIAL_PRODUCTS}
          featuredProduct={products[0] || INITIAL_PRODUCTS[0]}
          onExplore={scrollToCatalog}
          onCompare={() => setIsCompareOpen(true)}
          onQuickView={(prod) => setActiveDetailProduct(prod)}
          onNavigateToServices={() => scrollToSection('services')}
        />

        {/* Hot Trending This Week */}
        <TrendingSection
          products={products.length > 0 ? products : INITIAL_PRODUCTS}
          onAddToCart={handleAddToCart}
          onQuickView={(prod) => setActiveDetailProduct(prod)}
          onSeeAll={scrollToCatalog}
        />

        {/* Products Catalog Section with Search, Filter & Live Stock Grid */}
        <section id="products" data-section="catalog-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 scroll-mt-24">
          
          <div className="space-y-1 mb-2">
            <span className="text-xs font-black text-black uppercase tracking-widest bg-[#FEE500] px-2 py-0.5 rounded border border-black inline-block">
              Live Store Inventory
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-black tracking-tight uppercase">
              Browse Phones, Audio &amp; Digitech Gear
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 font-medium">
              Filter by model category, authorized brand, or price range. Check real-time shelf counts before ordering.
            </p>
          </div>

          {/* Search Bar & Filters */}
          <SearchAndFilterBar
            filters={filters}
            onFilterChange={setFilters}
            availableBrands={availableBrands}
            totalResults={filteredProducts.length}
          />

          {/* Products Control & Brand Navigation Header */}
          {filteredProducts.length > 0 && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 pb-2 border-b border-zinc-200">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-black uppercase tracking-wider text-zinc-500">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'} Found
                </span>
                <span className="text-zinc-300">•</span>
                <span className="text-xs font-bold text-zinc-700">
                  {brandGroupsList.length} {brandGroupsList.length === 1 ? 'Brand Collection' : 'Brand Collections'}
                </span>

                {/* Quick Brand Anchor Links if multiple brands are present */}
                {brandGroupsList.length > 1 && catalogViewMode === 'byBrand' && (
                  <div className="hidden lg:flex items-center gap-1.5 ml-2 pl-2 border-l border-zinc-200">
                    <span className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">
                      Jump:
                    </span>
                    {brandGroupsList.map(([bName, bItems]) => (
                      <a
                        key={bName}
                        href={`#brand-${bName.toLowerCase().replace(/\s+/g, '-')}`}
                        className="px-2 py-0.5 rounded text-[11px] font-bold bg-zinc-100 hover:bg-[#FEE500] hover:text-black text-zinc-700 transition-colors border border-zinc-200"
                      >
                        {bName} ({bItems.length})
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* View Layout Toggle */}
              <div className="flex items-center gap-1.5 self-start sm:self-center bg-zinc-100 p-1 rounded-xl border border-zinc-200">
                <button
                  onClick={() => setCatalogViewMode('byBrand')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                    catalogViewMode === 'byBrand'
                      ? 'bg-black text-white shadow-xs'
                      : 'text-zinc-600 hover:text-black'
                  }`}
                >
                  <Tag className="w-3.5 h-3.5" />
                  <span>By Brand</span>
                </button>
                <button
                  onClick={() => setCatalogViewMode('grid')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                    catalogViewMode === 'grid'
                      ? 'bg-black text-white shadow-xs'
                      : 'text-zinc-600 hover:text-black'
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>Single Grid</span>
                </button>
              </div>
            </div>
          )}

          {/* Products Display */}
          {filteredProducts.length === 0 ? (
            <div className="py-16 text-center space-y-4 bg-zinc-50 rounded-3xl p-8 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mt-4">
              <div className="w-16 h-16 rounded-full bg-zinc-200 border border-zinc-300 flex items-center justify-center mx-auto text-zinc-500">
                <SlidersHorizontal className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-black text-black">No products found matching your filters</h3>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto font-medium">
                Try loosening your price slider, checking a different brand, or resetting active filters.
              </p>
              <button
                onClick={() =>
                  setFilters({
                    searchQuery: '',
                    category: 'all',
                    brand: 'all',
                    priceRange: [1000, 160000],
                    inStockOnly: false,
                    expressDeliveryOnly: false,
                    sortBy: 'featured',
                  })
                }
                className="px-6 py-2.5 rounded-full bg-[#FEE500] hover:bg-[#ebd300] text-black text-xs font-black border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : catalogViewMode === 'byBrand' ? (
            /* Categorized By Brand Name */
            <div className="space-y-12 mt-6">
              {brandGroupsList.map(([brandName, brandProducts]) => (
                <div 
                  key={brandName} 
                  id={`brand-${brandName.toLowerCase().replace(/\s+/g, '-')}`}
                  className="space-y-5 scroll-mt-24"
                >
                  {/* Brand Category Showcase Card */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-zinc-50 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-black text-white font-black flex items-center justify-center text-sm border-2 border-black shadow-xs shrink-0">
                        {brandName.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-xl sm:text-2xl font-black text-black tracking-tight uppercase">
                            {brandName}
                          </h3>
                          <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-[#FEE500] text-black border border-black shadow-xs">
                            {brandProducts.length} {brandProducts.length === 1 ? 'Device' : 'Devices'}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3 text-emerald-700" />
                            <span>{BRAND_METADATA[brandName]?.badge || 'Authorized Partner'}</span>
                          </span>
                        </div>
                        <p className="text-xs text-zinc-600 font-medium mt-1 max-w-2xl">
                          {BRAND_METADATA[brandName]?.description || `Official authentic ${brandName} gear with direct store warranty & instant shelf availability.`}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                      {filters.brand !== brandName ? (
                        <button
                          onClick={() => {
                            setFilters((prev) => ({ ...prev, brand: brandName }));
                            const el = document.getElementById('products');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="px-3.5 py-2 rounded-xl bg-white hover:bg-zinc-100 text-black text-xs font-black border border-black shadow-xs flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                        >
                          <span>Filter Only {brandName}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <button
                          onClick={() => setFilters((prev) => ({ ...prev, brand: 'all' }))}
                          className="px-3.5 py-2 rounded-xl bg-[#FEE500] hover:bg-[#ebd300] text-black text-xs font-black border border-black shadow-xs flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                        >
                          <span>Show All Brands</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Brand Products Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {brandProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={handleAddToCart}
                        onQuickView={(prod) => setActiveDetailProduct(prod)}
                        onToggleCompare={handleToggleCompare}
                        isCompared={compareList.some((p) => p.id === product.id)}
                        onAskQuery={(prod) => {
                          setQueryModalProduct(prod);
                          setIsQueryModalOpen(true);
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Single Flat Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onQuickView={(prod) => setActiveDetailProduct(prod)}
                  onToggleCompare={handleToggleCompare}
                  isCompared={compareList.some((p) => p.id === product.id)}
                  onAskQuery={(prod) => {
                    setQueryModalProduct(prod);
                    setIsQueryModalOpen(true);
                  }}
                />
              ))}
            </div>
          )}

        </section>

        {/* About Section */}
        <AboutSection
          onExploreCatalog={scrollToCatalog}
          onContactClick={() => scrollToSection('contact')}
        />

        {/* In-Store Citizen & Digital Services Section (PAN, Xerox/Print, Recharge/Bills) */}
        <StoreServicesSection
          onSubmitQuery={handleSubmitQuery}
          onRequestService={(service) => {
            setQueryModalProduct(null);
            setIsQueryModalOpen(true);
          }}
        />

        {/* Location Section */}
        <LocationSection
          onOpenDoorstepModal={() => setIsDoorstepModalOpen(true)}
          onCallStore={() => window.open('tel:+919820012345')}
        />

        {/* Contact Section */}
        <ContactSection
          onSubmitQuery={handleSubmitQuery}
        />
      </main>

      {/* Floating Compare Banner when items are selected */}
      {compareList.length > 0 && !isCompareOpen && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 animate-in fade-in slide-in-from-bottom-3">
          <div className="rounded-full p-2 pr-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-3 bg-white">
            <div className="flex -space-x-2 overflow-hidden pl-1">
              {compareList.map((cp) => (
                <img
                  key={cp.id}
                  src={cp.image}
                  alt={cp.name}
                  className="w-8 h-8 rounded-full border-2 border-black object-contain bg-zinc-50 p-0.5"
                />
              ))}
            </div>
            <span className="text-xs font-black text-black">
              {compareList.length} device{compareList.length > 1 ? 's' : ''} in comparison
            </span>
            <button
              onClick={() => setIsCompareOpen(true)}
              className="px-4 py-1.5 rounded-full bg-[#FEE500] hover:bg-[#ebd300] text-black text-xs font-black border border-black shadow-xs cursor-pointer"
            >
              View Comparison →
            </button>
          </div>
        </div>
      )}

      {/* Floating Ask Store Inquiry Button */}
      <button
        onClick={() => {
          setQueryModalProduct(null);
          setIsQueryModalOpen(true);
        }}
        className="fixed bottom-6 left-6 z-30 hidden sm:flex items-center gap-2 px-4 py-3 rounded-full bg-white hover:bg-zinc-100 border-2 border-black text-xs font-black text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
        title="Ask store questions"
      >
        <MessageSquare className="w-4 h-4" />
        <span>Ask Store Staff</span>
      </button>

      {/* Footer */}
      <Footer
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenDoorstep={() => setIsDoorstepModalOpen(true)}
        onSelectCategory={(cat) => {
          setFilters((prev) => ({ ...prev, category: cat }));
          scrollToCatalog();
        }}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={activeDetailProduct}
        onClose={() => setActiveDetailProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        onToggleCompare={handleToggleCompare}
        isCompared={activeDetailProduct ? compareList.some((p) => p.id === activeDetailProduct.id) : false}
        onAskQuery={(prod) => {
          setQueryModalProduct(prod);
          setIsQueryModalOpen(true);
        }}
      />

      {/* Compare Modal */}
      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        products={compareList}
        onRemove={handleRemoveFromCompare}
        onClear={handleClearCompare}
        onAddToCart={handleAddToCart}
      />

      {/* Cart & Secure Checkout Modal */}
      <CartAndCheckoutModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onPlaceOrder={handlePlaceOrder}
        currentUser={currentUser}
        onOpenAuth={() => handleOpenAuth('customer')}
      />

      {/* Admin Dashboard */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        orders={orders}
        queries={queries}
        users={users}
        onUpdateProductStock={handleUpdateProductStock}
        onUpdateProductPrice={handleUpdateProductPrice}
        onAddProduct={handleAddProduct}
        onDeleteProduct={handleDeleteProduct}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        onReplyQuery={handleReplyQuery}
      />

      {/* Auth Modal (Customer & Admin Login / Register) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        onLogin={handleLogin}
        onLogout={handleLogout}
        initialRole={authInitialRole}
      />

      {/* Doorstep Delivery & Store Hub Checker */}
      <DoorstepModal
        isOpen={isDoorstepModalOpen}
        onClose={() => setIsDoorstepModalOpen(false)}
      />

      {/* Ask Store Query Modal */}
      <AskQueryModal
        isOpen={isQueryModalOpen}
        onClose={() => setIsQueryModalOpen(false)}
        product={queryModalProduct}
        onSubmitQuery={handleSubmitQuery}
      />

      {/* Live Admin Alert Notification Banner */}
      <AdminAlertBanner
        alert={activeAdminAlert}
        onDismiss={() => setActiveAdminAlert(null)}
        onOpenNotifications={() => {
          setActiveAdminAlert(null);
          setIsNotificationsOpen(true);
        }}
      />

      {/* Notifications and Admin Replies Center */}
      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        queries={queries}
        readReplyIds={readReplyIds}
        onMarkAsRead={handleMarkAsRead}
        onMarkAllAsRead={handleMarkAllAsRead}
        currentUser={currentUser}
        onOpenAskModal={() => {
          setQueryModalProduct(null);
          setIsQueryModalOpen(true);
        }}
        onSimulateReply={handleSimulateAdminReply}
      />

    </div>
  );
}
