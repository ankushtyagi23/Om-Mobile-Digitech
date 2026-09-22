export interface ProductSpecs {
  display?: string;
  processor?: string;
  ramStorage?: string;
  camera?: string;
  battery?: string;
  os?: string;
  connectivity?: string;
  warranty?: string;
  colorOptions?: string[];
}

export interface StoreAvailability {
  storeName: string;
  aisle: string;
  unitsAvailable: number;
  shelfLocation: string;
}

export interface Product {
  id: string;
  name: string;
  brand: 'Apple' | 'Samsung' | 'OnePlus' | 'Google' | 'Xiaomi' | 'Nothing' | 'Vivo' | 'Realme' | 'Sony' | 'Anker';
  category: 'smartphones' | 'flagships' | 'accessories' | 'audio' | 'tablets' | 'wearables' | 'power-chargers';
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewsCount: number;
  stockCount: number;
  minStockAlert: number;
  isTrending?: boolean;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  doorstepEligible?: boolean;
  deliverySpeed: '2-Hour Express Doorstep' | 'Same-Day Doorstep' | 'Standard Doorstep (24h)';
  storeAvailability: StoreAvailability;
  image: string;
  gallery: string[];
  specs: ProductSpecs;
  description: string;
  highlights: string[];
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedStorage?: string;
}

export type DeliveryMethod = 'doorstep_express' | 'doorstep_standard' | 'store_pickup';
export type PaymentMethod = 'upi' | 'card' | 'cod' | 'netbanking' | 'emi';
export type OrderStatus = 'pending' | 'processing' | 'out_for_delivery' | 'delivered' | 'cancelled';
export type PaymentStatus = 'paid' | 'pending_cod' | 'processing';

export interface Order {
  id: string;
  orderDate: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryMethod: DeliveryMethod;
  deliverySlot?: string;
  address: {
    street: string;
    city: string;
    pincode: string;
    landmark?: string;
  };
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  items: CartItem[];
  subtotal: number;
  deliveryCharge: number;
  discountAmount: number;
  totalAmount: number;
  trackingNumber: string;
  estimatedDelivery: string;
  notes?: string;
}

export interface CustomerQuery {
  id: string;
  customerName: string;
  customerContact: string;
  productId?: string;
  productName?: string;
  subject: string;
  message: string;
  timestamp: string;
  status: 'open' | 'replied' | 'resolved';
  adminReply?: string;
  replyTimestamp?: string;
  category: 'stock_inquiry' | 'price_match' | 'doorstep_delivery' | 'warranty_support' | 'exchange' | 'digital_services';
}

export type UserRole = 'customer' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  address?: {
    street: string;
    city: string;
    pincode: string;
    landmark?: string;
  };
  createdAt: string;
  ordersCount?: number;
  totalSpent?: number;
}

export interface FilterState {
  searchQuery: string;
  category: string;
  brand: string;
  priceRange: [number, number];
  inStockOnly: boolean;
  expressDeliveryOnly: boolean;
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating' | 'stock';
}
