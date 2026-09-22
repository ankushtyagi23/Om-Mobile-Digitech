import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  Truck, 
  Building2, 
  CreditCard, 
  QrCode, 
  Banknote, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  Clock,
  Sparkles,
  ReceiptText
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, DeliveryMethod, PaymentMethod, Order, UserProfile } from '../types';
import { formatPrice } from '../utils/formatters';
import { OmShopLogo } from './OmShopLogo';

interface CartAndCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onPlaceOrder: (order: Order) => void;
  currentUser?: UserProfile | null;
  onOpenAuth?: () => void;
}

export const CartAndCheckoutModal: React.FC<CartAndCheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onPlaceOrder,
  currentUser,
  onOpenAuth,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'cart' | 'shipping' | 'payment' | 'confirmed'>('cart');
  
  // Checkout Form State
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('doorstep_express');
  const [customerName, setCustomerName] = useState(currentUser?.name || '');
  const [customerEmail, setCustomerEmail] = useState(currentUser?.email || '');
  const [customerPhone, setCustomerPhone] = useState(currentUser?.phone || '');
  const [streetAddress, setStreetAddress] = useState(currentUser?.address?.street || '');
  const [city, setCity] = useState(currentUser?.address?.city || 'Umargam');
  const [pincode, setPincode] = useState(currentUser?.address?.pincode || '396170');
  const [landmark, setLandmark] = useState(currentUser?.address?.landmark || '');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [upiId, setUpiId] = useState('user@okaxis');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculations
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const deliveryCharge = 
    deliveryMethod === 'store_pickup' 
      ? 0 
      : deliveryMethod === 'doorstep_express' 
        ? subtotal > 50000 ? 0 : 199 
        : subtotal > 2000 ? 0 : 99;

  const discountAmount = subtotal > 100000 ? 1500 : subtotal > 30000 ? 500 : 0;
  const totalAmount = Math.max(0, subtotal + deliveryCharge - discountAmount);

  const handleNextToShipping = () => {
    if (cartItems.length > 0) {
      setStep('shipping');
    }
  };

  const handleNextToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) {
      alert('Please fill in your name and phone number for delivery updates.');
      return;
    }
    if (deliveryMethod !== 'store_pickup' && !streetAddress.trim()) {
      alert('Please fill in your street address for doorstep delivery.');
      return;
    }
    setStep('payment');
  };

  const handleConfirmOrder = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const newOrder: Order = {
        id: `OM-${Date.now().toString().slice(-6)}`,
        items: [...cartItems],
        totalAmount,
        subtotal,
        deliveryCharge,
        discountAmount,
        deliveryMethod,
        customerName,
        customerEmail: customerEmail || `${customerPhone}@omcustomer.in`,
        customerPhone,
        address: {
          street: deliveryMethod === 'store_pickup' ? 'Store Counter Pickup' : streetAddress,
          city,
          pincode,
          landmark,
        },
        paymentMethod,
        paymentStatus: paymentMethod === 'cod' ? 'pending_cod' : 'paid',
        orderStatus: 'pending',
        orderDate: new Date().toISOString(),
        trackingNumber: `OM-TRK-${Math.floor(100000 + Math.random() * 900000)}`,
        estimatedDelivery: deliveryMethod === 'doorstep_express' 
          ? 'Today within 45-60 Minutes (Express Rider)' 
          : deliveryMethod === 'doorstep_standard' 
            ? 'Tomorrow by 2:00 PM' 
            : 'Ready for store pickup in 15 Minutes',
      };

      onPlaceOrder(newOrder);
      setPlacedOrder(newOrder);
      setIsSubmitting(false);
      setStep('confirmed');

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 xs:p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in">
      <div 
        className="relative w-full max-w-3xl max-h-[92vh] sm:max-h-[90vh] overflow-y-auto rounded-2xl sm:rounded-3xl bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-3.5 xs:p-4 sm:p-8 space-y-4 sm:space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header with Steps */}
        <div className="flex items-start sm:items-center justify-between border-b border-zinc-200 pb-3 sm:pb-4 gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <div className="w-8 h-8 xs:w-9 xs:h-9 sm:w-11 sm:h-11 rounded-xl bg-white border-1.5 sm:border-2 border-black flex items-center justify-center p-0.5 shadow-xs overflow-hidden shrink-0">
              <OmShopLogo className="w-full h-full" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-sm xs:text-base sm:text-xl font-black text-black uppercase tracking-tight truncate">
                {step === 'cart' && 'Your Shopping Cart'}
                {step === 'shipping' && 'Delivery Details'}
                {step === 'payment' && 'Secure Payment'}
                {step === 'confirmed' && 'Order Placed!'}
              </h2>
              <div className="flex items-center gap-1 xs:gap-1.5 text-[10px] xs:text-xs font-bold text-zinc-500 mt-0.5 flex-wrap">
                <span className={step === 'cart' ? 'text-black font-black bg-amber-100 px-1.5 py-0.5 rounded border border-amber-300' : ''}>1. Cart</span>
                <span className="text-zinc-300">→</span>
                <span className={step === 'shipping' ? 'text-black font-black bg-amber-100 px-1.5 py-0.5 rounded border border-amber-300' : ''}>2. Delivery</span>
                <span className="text-zinc-300">→</span>
                <span className={step === 'payment' ? 'text-black font-black bg-amber-100 px-1.5 py-0.5 rounded border border-amber-300' : ''}>3. Pay</span>
                <span className="text-zinc-300">→</span>
                <span className={step === 'confirmed' ? 'text-emerald-700 font-black bg-emerald-100 px-1.5 py-0.5 rounded border border-emerald-300' : ''}>4. Done</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 xs:w-8 xs:h-8 sm:w-9 sm:h-9 rounded-xl border-1.5 sm:border-2 border-black bg-zinc-100 hover:bg-zinc-200 text-black flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-xs active:scale-95"
            aria-label="Close shopping cart"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* STEP 1: CART ITEMS */}
        {step === 'cart' && (
          <div className="space-y-4 sm:space-y-6">
            {cartItems.length === 0 ? (
              <div className="py-8 sm:py-14 text-center space-y-3 sm:space-y-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-zinc-100 border border-zinc-300 flex items-center justify-center mx-auto text-zinc-400">
                  <ShoppingBag className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <h3 className="text-sm sm:text-base font-black text-black">Your cart is currently empty</h3>
                <p className="text-[11px] sm:text-xs text-zinc-500 max-w-sm mx-auto font-medium px-4">
                  Explore phones, chargers, audio gear, and accessories to add items to your cart.
                </p>
                <button
                  onClick={onClose}
                  className="px-5 sm:px-6 py-2 sm:py-2.5 rounded-full bg-[#FEE500] hover:bg-[#ebd300] text-black font-black text-xs border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer active:scale-95"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                <div className="divide-y divide-zinc-200">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="py-2.5 sm:py-3.5 flex items-center gap-2 sm:gap-4">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 sm:w-16 sm:h-16 object-contain bg-zinc-50 rounded-xl p-1 border border-zinc-200 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-[9px] sm:text-[10px] uppercase font-bold text-zinc-500">{item.product.brand}</div>
                        <h4 className="text-xs sm:text-sm font-black text-black truncate">{item.product.name}</h4>
                        <div className="text-xs font-black text-black mt-0.5">
                          {formatPrice(item.product.price)}
                        </div>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-1 border border-zinc-300 rounded-lg p-0.5 sm:p-1 bg-zinc-50 shrink-0">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 text-zinc-700 hover:text-black hover:bg-zinc-200 rounded cursor-pointer"
                        >
                          <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        </button>
                        <span className="w-4 sm:w-6 text-center text-xs font-black text-black">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 text-zinc-700 hover:text-black hover:bg-zinc-200 rounded cursor-pointer"
                        >
                          <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="p-1.5 sm:p-2 text-zinc-400 hover:text-rose-600 transition-colors cursor-pointer shrink-0"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Subtotal & Delivery Summary */}
                <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2 text-xs">
                  <div className="flex justify-between font-bold text-zinc-600">
                    <span>Subtotal</span>
                    <span className="text-black font-black">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-zinc-600">
                    <span>Estimated Delivery</span>
                    <span className="text-emerald-700 font-bold">
                      {subtotal > 2000 ? 'FREE Doorstep Delivery' : 'Calculated at Next Step'}
                    </span>
                  </div>
                  <div className="border-t border-zinc-200 pt-2 flex justify-between text-sm font-black text-black">
                    <span>Total</span>
                    <span className="text-lg">{formatPrice(subtotal)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={onClearCart}
                    className="text-xs font-bold text-zinc-500 hover:text-rose-600 transition-colors cursor-pointer"
                  >
                    Clear Cart
                  </button>

                  <button
                    onClick={handleNextToShipping}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#FEE500] hover:bg-[#ebd300] text-black font-black text-xs sm:text-sm border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
                  >
                    <span>Proceed to Delivery</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 2: SHIPPING & DOORSTEP DETAILS */}
        {step === 'shipping' && (
          <form onSubmit={handleNextToPayment} className="space-y-5">
            {/* Delivery Method Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-black text-zinc-700 uppercase tracking-wider">
                Choose Delivery Option
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setDeliveryMethod('doorstep_express')}
                  className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                    deliveryMethod === 'doorstep_express'
                      ? 'bg-[#FEE500] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                      : 'bg-white border-zinc-200 hover:border-zinc-300'
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs font-black text-black">
                    <Truck className="w-4 h-4 text-emerald-700" />
                    <span>Express 45-Min</span>
                  </div>
                  <p className="text-[11px] text-zinc-700 font-medium mt-1">
                    Direct doorstep dispatch by dedicated store rider.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryMethod('doorstep_standard')}
                  className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                    deliveryMethod === 'doorstep_standard'
                      ? 'bg-[#FEE500] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                      : 'bg-white border-zinc-200 hover:border-zinc-300'
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs font-black text-black">
                    <Clock className="w-4 h-4 text-cyan-700" />
                    <span>Same-Day Standard</span>
                  </div>
                  <p className="text-[11px] text-zinc-700 font-medium mt-1">
                    Delivery by evening 7:00 PM.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryMethod('store_pickup')}
                  className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                    deliveryMethod === 'store_pickup'
                      ? 'bg-[#FEE500] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                      : 'bg-white border-zinc-200 hover:border-zinc-300'
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs font-black text-black">
                    <Building2 className="w-4 h-4 text-black" />
                    <span>In-Store Pickup</span>
                  </div>
                  <p className="text-[11px] text-zinc-700 font-medium mt-1">
                    Collect in 15 mins at Om Mobile counter.
                  </p>
                </button>
              </div>
            </div>

            {/* Customer Status Banner */}
            {currentUser ? (
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-300 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center">
                    ✓
                  </div>
                  <div>
                    <span className="text-xs font-black text-emerald-900 block">
                      Buying as {currentUser.name}
                    </span>
                    <span className="text-[11px] text-emerald-700 font-medium">
                      {currentUser.email} • Verified Account
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider bg-white px-2 py-0.5 rounded-full border border-emerald-300 text-emerald-800">
                  Instant Checkout
                </span>
              </div>
            ) : onOpenAuth ? (
              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-300 flex items-center justify-between">
                <div>
                  <span className="text-xs font-black text-amber-900 block">
                    Have an Om Mobile account?
                  </span>
                  <span className="text-[11px] text-amber-700 font-medium">
                    Log in to auto-fill address and track your doorstep delivery.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={onOpenAuth}
                  className="px-3 py-1.5 rounded-xl bg-black text-[#FEE500] font-black text-xs hover:bg-zinc-800 cursor-pointer shrink-0"
                >
                  Log In
                </button>
              </div>
            ) : null}

            {/* Address Fields */}
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Ramesh Sharma"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-300 text-xs font-bold text-black focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">Mobile Phone *</label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-300 text-xs font-bold text-black focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              {deliveryMethod !== 'store_pickup' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">Street Address / Flat / Floor *</label>
                    <input
                      type="text"
                      required
                      value={streetAddress}
                      onChange={(e) => setStreetAddress(e.target.value)}
                      placeholder="e.g. Flat 402, Sai Residency, Station Road"
                      className="w-full px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-300 text-xs font-bold text-black focus:outline-none focus:border-black"
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-zinc-700 mb-1">City</label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-300 text-xs font-bold text-black focus:outline-none focus:border-black"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-700 mb-1">Pincode *</label>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-300 text-xs font-bold text-black focus:outline-none focus:border-black"
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-xs font-bold text-zinc-700 mb-1">Landmark (Optional)</label>
                      <input
                        type="text"
                        value={landmark}
                        onChange={(e) => setLandmark(e.target.value)}
                        placeholder="Near Metro Station"
                        className="w-full px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-300 text-xs font-bold text-black focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-between pt-3 border-t border-zinc-200">
              <button
                type="button"
                onClick={() => setStep('cart')}
                className="text-xs font-bold text-zinc-600 hover:text-black cursor-pointer"
              >
                ← Back to Cart
              </button>

              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#FEE500] hover:bg-[#ebd300] text-black font-black text-xs sm:text-sm border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: PAYMENT METHOD */}
        {step === 'payment' && (
          <div className="space-y-5">
            <div className="space-y-3">
              <label className="block text-xs font-black text-zinc-700 uppercase tracking-wider">
                Select Payment Option
              </label>

              <div className="space-y-2">
                {/* UPI Option */}
                <label className={`flex items-start gap-3 p-3.5 rounded-2xl border-2 transition-all cursor-pointer ${
                  paymentMethod === 'upi' ? 'bg-[#FEE500]/30 border-black' : 'bg-white border-zinc-200'
                }`}>
                  <input
                    type="radio"
                    name="payment_choice"
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                    className="mt-1 accent-black"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-black">Instant UPI / QR Code</span>
                      <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">Fastest</span>
                    </div>
                    <p className="text-[11px] text-zinc-600 mt-0.5">
                      Pay via Google Pay, PhonePe, Paytm, or BHIM UPI handle.
                    </p>
                    {paymentMethod === 'upi' && (
                      <div className="mt-2 pt-2 border-t border-zinc-200">
                        <input
                          type="text"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="yourname@okaxis"
                          className="w-full max-w-xs px-3 py-1.5 rounded-lg bg-white border border-zinc-300 text-xs font-bold text-black"
                        />
                      </div>
                    )}
                  </div>
                </label>

                {/* Card Option */}
                <label className={`flex items-start gap-3 p-3.5 rounded-2xl border-2 transition-all cursor-pointer ${
                  paymentMethod === 'card' ? 'bg-[#FEE500]/30 border-black' : 'bg-white border-zinc-200'
                }`}>
                  <input
                    type="radio"
                    name="payment_choice"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="mt-1 accent-black"
                  />
                  <div className="flex-1">
                    <span className="text-xs font-black text-black">Credit / Debit Card (Visa, Mastercard, RuPay)</span>
                    <p className="text-[11px] text-zinc-600 mt-0.5">
                      Secured 256-bit payment gateway.
                    </p>
                  </div>
                </label>

                {/* COD Option */}
                <label className={`flex items-start gap-3 p-3.5 rounded-2xl border-2 transition-all cursor-pointer ${
                  paymentMethod === 'cod' ? 'bg-[#FEE500]/30 border-black' : 'bg-white border-zinc-200'
                }`}>
                  <input
                    type="radio"
                    name="payment_choice"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="mt-1 accent-black"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-black">Cash or Card on Doorstep Delivery</span>
                      <span className="text-[10px] font-bold bg-zinc-200 text-zinc-800 px-2 py-0.5 rounded">Verified</span>
                    </div>
                    <p className="text-[11px] text-zinc-600 mt-0.5">
                      Pay our rider after physical inspection of the sealed box at your doorstep.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Bill Summary */}
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-300 space-y-2 text-xs">
              <div className="flex justify-between font-bold text-zinc-600">
                <span>Items Subtotal</span>
                <span className="text-black font-black">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between font-bold text-zinc-600">
                <span>Delivery Charge</span>
                <span className="text-black font-black">
                  {deliveryCharge === 0 ? 'FREE' : formatPrice(deliveryCharge)}
                </span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between font-bold text-emerald-700">
                  <span>Store Discount</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="border-t border-zinc-200 pt-2 flex justify-between text-sm font-black text-black">
                <span>Total Amount Due</span>
                <span className="text-xl font-black text-black">{formatPrice(totalAmount)}</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-between pt-2 border-t border-zinc-200">
              <button
                type="button"
                onClick={() => setStep('shipping')}
                className="text-xs font-bold text-zinc-600 hover:text-black cursor-pointer"
              >
                ← Back to Address
              </button>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleConfirmOrder}
                className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#FEE500] hover:bg-[#ebd300] text-black font-black text-xs sm:text-sm border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Securing Order...</span>
                ) : (
                  <>
                    <span>Confirm &amp; Place Order ({formatPrice(totalAmount)})</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: CONFIRMATION RECEIPT */}
        {step === 'confirmed' && placedOrder && (
          <div className="space-y-5 text-center py-2">
            <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-500 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
            </div>

            <div>
              <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                Order Confirmed &amp; Dispatched
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-black mt-2">
                Thank You, {placedOrder.customerName}!
              </h3>
              <p className="text-xs text-zinc-600 font-medium max-w-md mx-auto mt-1">
                Your order ID is <strong className="text-black">{placedOrder.id}</strong>. 
                Our store executive has allocated the units from inventory.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50 border-2 border-black text-left space-y-3 text-xs shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg overflow-hidden border border-black shrink-0">
                    <OmShopLogo className="w-full h-full" />
                  </div>
                  <div>
                    <span className="font-black text-black text-xs block">Om Mobile &amp; Digitech</span>
                    <span className="text-[10px] text-zinc-500 font-bold block">Tax Invoice &amp; Dispatch Pass</span>
                  </div>
                </div>
                <span className="text-[11px] font-mono font-black text-zinc-600 bg-zinc-200 px-2 py-0.5 rounded">
                  {placedOrder.id}
                </span>
              </div>
              <div className="flex justify-between border-b border-zinc-200 pb-2">
                <span className="text-zinc-500 font-bold">Estimated ETA:</span>
                <span className="font-black text-emerald-800">{placedOrder.estimatedDelivery}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-200 pb-2">
                <span className="text-zinc-500 font-bold">Delivery Destination:</span>
                <span className="font-bold text-black text-right max-w-xs truncate">
                  {placedOrder.address.street}, {placedOrder.address.city} - {placedOrder.address.pincode}
                </span>
              </div>
              <div className="flex justify-between border-b border-zinc-200 pb-2">
                <span className="text-zinc-500 font-bold">Payment Method:</span>
                <span className="font-black text-black uppercase">{placedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between pt-1 font-black text-sm text-black">
                <span>Total Paid / Due:</span>
                <span className="text-base">{formatPrice(placedOrder.totalAmount)}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={onClose}
                className="px-8 py-3 rounded-full bg-black text-white hover:bg-zinc-800 font-black text-xs cursor-pointer shadow-md"
              >
                Continue Browsing Catalog
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
