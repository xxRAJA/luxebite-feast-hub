export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: Date;
}

export interface Order {
  id: string;
  userId: string;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  status: 'preparing' | 'on-way' | 'delivered' | 'cancelled';
  paymentMethod: string;
  deliveryAddress: string;
  orderDate: Date;
  estimatedDelivery: Date;
  trackingLocation?: {
    lat: number;
    lng: number;
    address: string;
  };
}

export interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
}