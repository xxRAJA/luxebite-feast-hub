import React, { useState, useEffect } from 'react';
import { X, Package, Clock, MapPin, Eye } from 'lucide-react';
import { Order } from '../types/user';
import { useAuth } from '../hooks/useAuth';

interface OrderHistoryProps {
  isOpen: boolean;
  onClose: () => void;
  onTrackOrder: (order: Order) => void;
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ isOpen, onClose, onTrackOrder }) => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (user) {
      // Load orders from localStorage
      const storedOrders = localStorage.getItem(`luxebite_orders_${user.id}`);
      if (storedOrders) {
        setOrders(JSON.parse(storedOrders));
      } else {
        // Generate mock orders for demo
        const mockOrders: Order[] = [
          {
            id: `ORD${Date.now()}1`,
            userId: user.id,
            items: [
              { id: '1', name: 'Premium Burger Deluxe', quantity: 2, price: 899 },
              { id: '2', name: 'Gourmet Pizza Supreme', quantity: 1, price: 1299 }
            ],
            totalAmount: 3097,
            status: 'delivered',
            paymentMethod: 'Online Payment',
            deliveryAddress: user.address,
            orderDate: new Date(Date.now() - 86400000), // 1 day ago
            estimatedDelivery: new Date(Date.now() - 83400000),
          },
          {
            id: `ORD${Date.now()}2`,
            userId: user.id,
            items: [
              { id: '3', name: 'Fresh Garden Salad', quantity: 1, price: 549 },
              { id: '4', name: 'Luxury Dessert Platter', quantity: 1, price: 799 }
            ],
            totalAmount: 1348,
            status: 'on-way',
            paymentMethod: 'Cash on Delivery',
            deliveryAddress: user.address,
            orderDate: new Date(Date.now() - 1800000), // 30 min ago
            estimatedDelivery: new Date(Date.now() + 1200000), // 20 min from now
          }
        ];
        setOrders(mockOrders);
        localStorage.setItem(`luxebite_orders_${user.id}`, JSON.stringify(mockOrders));
      }
    }
  }, [user]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-600';
      case 'on-way': return 'text-blue-600';
      case 'preparing': return 'text-yellow-600';
      case 'cancelled': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered': return 'Delivered';
      case 'on-way': return 'On the Way';
      case 'preparing': return 'Preparing';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative luxe-card w-full max-w-2xl mx-4 animate-scale-in max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-accent rounded-full transition-colors z-10"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold luxe-text-gradient mb-2">Order History</h2>
            <p className="text-muted-foreground">Track your previous orders</p>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Orders Yet</h3>
              <p className="text-muted-foreground">Start ordering delicious food from LuxeBite!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="luxe-card-inner p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold">Order #{order.id.slice(-8)}</h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.orderDate).toLocaleDateString()} at{' '}
                        {new Date(order.orderDate).toLocaleTimeString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </p>
                      <p className="text-lg font-bold">₹{order.totalAmount}</p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm font-medium mb-1">Items:</p>
                    <div className="text-sm text-muted-foreground">
                      {order.items.map((item, index) => (
                        <span key={index}>
                          {item.quantity}x {item.name}
                          {index < order.items.length - 1 && ', '}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{order.paymentMethod}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>Delivered to home</span>
                      </div>
                    </div>
                    
                    {(order.status === 'preparing' || order.status === 'on-way') && (
                      <button
                        onClick={() => onTrackOrder(order)}
                        className="luxe-button-primary text-sm flex items-center space-x-1"
                      >
                        <Eye className="h-4 w-4" />
                        <span>Track</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;