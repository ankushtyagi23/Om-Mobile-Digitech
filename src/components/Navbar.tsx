import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Menu, 
  X,
  Lock,
  ChevronRight,
  Home,
  Info,
  PhoneCall,
  Layers,
  User,
  Bell
} from 'lucide-react';
import { CartItem, UserProfile } from '../types';
import { OmShopLogo } from './OmShopLogo';

interface NavbarProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
  onOpenAdmin: () => void;
  isAdminOpen: boolean;
  onNavigateSection?: (sectionId: string) => void;
  currentUser?: UserProfile | null;
  onOpenAuth?: (role?: 'customer' | 'admin') => void;
  onLogout?: () => void;
  unreadNotificationsCount?: number;
  onOpenNotifications?: () => void;
  // Optional backward-compatible props
  compareList?: any[];
  onOpenCompare?: () => void;
  onSelectCategory?: (cat: string) => void;
  activeCategory?: string;
  onSearchChange?: (q: string) => void;
  searchQuery?: string;
  onOpenDoorstepModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItems,
  onOpenCart,
  onOpenAdmin,
  isAdminOpen,
  onNavigateSection,
  currentUser,
  onOpenAuth,
  unreadNotificationsCount = 0,
  onOpenNotifications,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('home');
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Removed 'products' and 'location' from navbar as requested
  const navLinks = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'services', label: 'Services', icon: Layers },
    { id: 'about', label: 'About', icon: Info },
    { id: 'contact', label: 'Contact', icon: PhoneCall },
  ];

  const handleNavClick = (sectionId: string) => {
    setActiveNav(sectionId);
    setMobileMenuOpen(false);

    if (onNavigateSection) {
      onNavigateSection(sectionId);
      return;
    }

    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b-2 border-black bg-white/95 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-1 sm:gap-3 md:gap-4">
          
          {/* Brand Logo & Name - Fully responsive & never hidden on mobile or tablet */}
          <div className="flex items-center min-w-0 flex-1 sm:flex-initial">
            <button 
              id="navbar-logo-btn"
              onClick={() => handleNavClick('home')} 
              className="flex items-center gap-1.5 xs:gap-2 sm:gap-2.5 text-left group transition-transform active:scale-95 cursor-pointer min-w-0"
              title="Om Mobile & Digitech - Home"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-xl bg-white border-1.5 border-black flex items-center justify-center p-0.5 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] group-hover:scale-105 transition-transform overflow-hidden shrink-0">
                <OmShopLogo className="w-full h-full" />
              </div>
              <div className="min-w-0 flex flex-col justify-center">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl font-black text-black tracking-tight uppercase whitespace-nowrap">
                    Om Mobile <span className="text-[#06b6d4]">&amp;</span> Digitech
                  </span>
                  <span className="hidden xl:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-300 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    STORE LIVE
                  </span>
                </div>
                {/* Mobile / Tablet verified badge subtitle */}
                <span className="text-[9px] xs:text-[10px] font-bold text-zinc-500 tracking-tight sm:hidden whitespace-nowrap">
                  Counter &amp; Doorstep Umargam
                </span>
              </div>
            </button>
          </div>

          {/* Clean Desktop Navigation: Home, Services, About, Contact (Only on large screens so tablet preserves brand name) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((item) => {
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 lg:px-3.5 xl:px-4 py-2 rounded-full text-xs font-black transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
                      : 'text-zinc-700 hover:text-black hover:bg-zinc-100'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & Controls: Notifications, User, Cart, Admin, Mobile Toggle */}
          <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-2 shrink-0">
            
            {/* Notification Symbol: Alerts when admin replies */}
            {onOpenNotifications && (
              <button
                id="navbar-notification-btn"
                onClick={onOpenNotifications}
                className="relative w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-white hover:bg-zinc-100 text-black border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center transition-all active:scale-95 cursor-pointer shrink-0"
                title={
                  unreadNotificationsCount > 0 
                    ? `${unreadNotificationsCount} new reply/alert from store admin` 
                    : 'Store Notifications & Admin Replies'
                }
                aria-label="Store Notifications & Admin Replies"
              >
                <Bell className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[17px] h-[17px] px-1 rounded-full bg-rose-500 text-white font-black text-[9px] sm:text-[10px] flex items-center justify-center border border-black shadow-xs animate-pulse">
                    {unreadNotificationsCount > 9 ? '9+' : unreadNotificationsCount}
                  </span>
                )}
              </button>
            )}

            {/* User Login / Profile Button */}
            {onOpenAuth && (
              <button
                id="navbar-user-btn"
                onClick={() => onOpenAuth('customer')}
                className={`flex items-center justify-center gap-1 h-8 sm:h-9 md:h-10 px-2 sm:px-2.5 md:px-3.5 rounded-full font-black text-xs transition-all border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:scale-95 cursor-pointer shrink-0 ${
                  currentUser
                    ? 'bg-zinc-100 hover:bg-zinc-200 text-black'
                    : 'bg-white hover:bg-zinc-100 text-black'
                }`}
                title={currentUser ? `Logged in as ${currentUser.name}` : 'Login / Register'}
              >
                <User className="w-3.5 h-3.5 text-black shrink-0" />
                <span className="hidden md:inline max-w-[80px] lg:max-w-[100px] truncate text-[11px] sm:text-xs">
                  {currentUser ? currentUser.name.split(' ')[0] : 'Sign In'}
                </span>
                {currentUser?.role === 'admin' && (
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-500 shrink-0" />
                )}
              </button>
            )}

            {/* Shopping Cart Button */}
            <button
              id="navbar-cart-btn"
              onClick={onOpenCart}
              className="flex items-center justify-center gap-1 sm:gap-1.5 h-8 sm:h-9 md:h-10 px-2 sm:px-2.5 md:px-3.5 rounded-full bg-[#FEE500] hover:bg-[#ebd300] text-black font-black text-xs transition-all border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:scale-95 cursor-pointer shrink-0"
              title={`Shopping Cart (${totalCartCount} items)`}
            >
              <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
              <span className="hidden lg:inline text-xs font-black">Cart</span>
              <span className="min-w-[17px] h-[17px] sm:w-5 sm:h-5 px-1 rounded-full bg-black text-white text-[10px] sm:text-[11px] font-black flex items-center justify-center">
                {totalCartCount}
              </span>
            </button>

            {/* Admin / Portal Pill Button (visible on tablet & desktop) */}
            <button
              id="navbar-admin-btn"
              onClick={onOpenAdmin}
              className={`hidden md:flex items-center gap-1.5 h-8 sm:h-9 md:h-10 px-2.5 sm:px-3 md:px-3.5 rounded-full font-black text-xs transition-all border border-black active:scale-95 cursor-pointer shrink-0 ${
                isAdminOpen 
                  ? 'bg-[#FEE500] text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
                  : 'bg-black hover:bg-zinc-800 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
              }`}
              title="Admin Management Panel"
            >
              <Lock className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">{isAdminOpen ? 'Store View' : 'Admin Panel'}</span>
              <span className="xl:hidden">{isAdminOpen ? 'Store' : 'Admin'}</span>
            </button>

            {/* Hamburger Menu Toggle (visible on mobile and tablet < lg) */}
            <button
              id="navbar-mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-xl text-black bg-white hover:bg-zinc-100 transition-colors border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] shrink-0 active:scale-95"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile & Tablet Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t-2 border-black bg-white px-3.5 pt-3.5 pb-6 space-y-3.5 shadow-xl animate-in slide-in-from-top-2">
          
          {/* Drawer Store Header */}
          <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-zinc-50 border-2 border-black">
            <div className="w-9 h-9 rounded-xl bg-white border border-black flex items-center justify-center p-0.5 shrink-0 shadow-xs">
              <OmShopLogo className="w-full h-full" />
            </div>
            <div className="min-w-0">
              <h4 className="text-sm font-black text-black uppercase tracking-tight truncate">
                Om Mobile <span className="text-[#06b6d4]">&amp;</span> Digitech
              </h4>
              <p className="text-[11px] text-zinc-500 font-bold truncate">
                Official Retail Counter • Umargam
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-black tracking-wider text-zinc-400 px-2.5">
              Menu
            </span>
            {navLinks.map((item) => {
              const IconComp = item.icon;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-colors ${
                    isActive 
                      ? 'bg-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
                      : 'text-zinc-900 hover:bg-zinc-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <IconComp className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </button>
              );
            })}
          </div>

          {/* Action Hub in Mobile Menu */}
          <div className="pt-2.5 border-t border-zinc-200 flex flex-col gap-2">
            
            {/* Notifications Button in Drawer */}
            {onOpenNotifications && (
              <button
                onClick={() => {
                  onOpenNotifications();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-zinc-50 hover:bg-zinc-100 text-black font-black text-xs sm:text-sm border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                <div className="flex items-center gap-2.5">
                  <Bell className="w-4 h-4 text-black" />
                  <span>Admin Replies &amp; Alerts</span>
                </div>
                {unreadNotificationsCount > 0 ? (
                  <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white font-black text-[10px]">
                    {unreadNotificationsCount} New
                  </span>
                ) : (
                  <span className="text-zinc-400 text-xs font-medium">None unread</span>
                )}
              </button>
            )}

            {/* Auth / Profile in Drawer */}
            {onOpenAuth && (
              <button
                onClick={() => {
                  onOpenAuth('customer');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-zinc-100 text-black font-black text-xs sm:text-sm border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                <div className="flex items-center gap-2.5">
                  <User className="w-4 h-4 text-black" />
                  <span className="truncate max-w-[200px]">
                    {currentUser ? `Account: ${currentUser.name}` : 'Customer Sign In / Register'}
                  </span>
                </div>
                {currentUser ? (
                  <span className="px-2 py-0.5 rounded-full bg-black text-[#FEE500] text-[9px] font-black uppercase">
                    {currentUser.role}
                  </span>
                ) : (
                  <span className="text-[11px] font-bold text-zinc-500">Access</span>
                )}
              </button>
            )}

            {/* Cart in Drawer */}
            <button
              onClick={() => {
                onOpenCart();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#FEE500] text-black font-black text-xs sm:text-sm border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
                <span>View Shopping Cart</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-black text-white text-xs font-black">
                {totalCartCount} items
              </span>
            </button>

            {/* Admin Panel Toggle in Drawer */}
            <button
              onClick={() => {
                onOpenAdmin();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-black text-white font-black text-xs sm:text-sm border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              <Lock className="w-4 h-4 text-[#FEE500]" />
              <span>{isAdminOpen ? 'Switch to Store Catalog' : 'Open Admin Panel'}</span>
            </button>
          </div>

        </div>
      )}
    </header>
  );
};
