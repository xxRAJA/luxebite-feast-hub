import React, { useState, useMemo } from 'react';
import { Filter, ChevronDown } from 'lucide-react';
import { FoodItem, CartItem } from '../types/food';
import { Order } from '../types/user';
import { foodItems, sortOptions, categoryFilters } from '../data/foodData';
import { useAuth } from '../hooks/useAuth';
import Header from '../components/Header';
import FoodCard from '../components/FoodCard';
import CartModal from '../components/CartModal';
import PaymentModal from '../components/PaymentModal';
import OrderConfirmation from '../components/OrderConfirmation';
import LocationModal from '../components/LocationModal';
import AboutSection from '../components/AboutSection';
import AuthModal from '../components/AuthModal';
import UserAccount from '../components/UserAccount';
import OrderHistory from '../components/OrderHistory';
import OrderTracking from '../components/OrderTracking';
import { useToast } from '../hooks/use-toast';
import "../App.css";

const deliveryOptions = [
  "Standard Delivery",
  "Express Delivery",
  "Pickup",
  "Schedule Delivery",
  "Contactless Delivery",
];

const menuOptions = [
  "Indian Cuisine",
  "International Cuisine",
  "Vegan Specials",
  "Desserts",
  "Beverages",
  "Combo Meals",
  "Chef's Specials",
];

const orderHistorySample = [
  { id: 1, item: "Paneer Tikka", date: "2025-09-15", status: "Delivered" },
  { id: 2, item: "Sushi Platter", date: "2025-09-14", status: "Delivered" },
  { id: 3, item: "Vegan Burger", date: "2025-09-13", status: "Cancelled" },
];

const trackingSample = {
  orderId: "LB20250917",
  status: "Out for Delivery",
  eta: "15 mins",
};

const Index = () => {
  const { user, isLoggedIn } = useAuth();
  
  // State management
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSort, setSelectedSort] = useState('nearest');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentLocation, setCurrentLocation] = useState('Mumbai, Maharashtra');
  
  // Modal states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isOrderConfirmOpen, setIsOrderConfirmOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = useState(false);
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState(false);
  const [selectedItemForOrder, setSelectedItemForOrder] = useState<FoodItem | null>(null);
  const [trackingOrder, setTrackingOrder] = useState<Order | null>(null);
  
  const { toast } = useToast();

  // Filter and sort food items
  const filteredAndSortedItems = useMemo(() => {
    let filtered = foodItems;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => {
        switch (selectedCategory) {
          case 'veg':
            return item.isVeg;
          case 'non-veg':
            return !item.isVeg;
          case 'fast-food':
            return item.type === 'fast-food';
          case 'normal':
            return item.type === 'normal';
          case 'dessert':
            return item.category === 'dessert';
          default:
            return true;
        }
      });
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (selectedSort) {
        case 'nearest':
          return a.distance - b.distance;
        case 'farthest':
          return b.distance - a.distance;
        case 'low-price':
          return a.price - b.price;
        case 'high-price':
          return b.price - a.price;
        case 'high-rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    return sorted;
  }, [searchQuery, selectedSort, selectedCategory]);

  // Cart management
  const addToCart = (item: FoodItem) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      updateQuantity(item.id, existingItem.quantity + 1);
    } else {
      setCartItems(prev => [...prev, { ...item, quantity: 1 }]);
      toast({
        title: "Added to Cart",
        description: `${item.name} has been added to your cart`,
      });
    }
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Removed from Cart",
      description: "Item has been removed from your cart",
    });
  };

  const handleOrderNow = (item: FoodItem) => {
    setSelectedItemForOrder(item);
    setIsPaymentOpen(true);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsPaymentOpen(true);
  };

  const handleOrderConfirm = (paymentMethod: string) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to place an order",
        variant: "destructive"
      });
      setIsAuthOpen(true);
      return;
    }

    const orderItems = selectedItemForOrder 
      ? [{ 
          id: selectedItemForOrder.id, 
          name: selectedItemForOrder.name, 
          quantity: 1, 
          price: selectedItemForOrder.price 
        }]
      : cartItems.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price
        }));

    const totalAmount = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const newOrder: Order = {
      id: `ORD${Date.now()}`,
      userId: user.id,
      items: orderItems,
      totalAmount,
      status: 'preparing',
      paymentMethod,
      deliveryAddress: user.address,
      orderDate: new Date(),
      estimatedDelivery: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes
    };

    // Save order to localStorage
    const existingOrders = JSON.parse(localStorage.getItem(`luxebite_orders_${user.id}`) || '[]');
    existingOrders.unshift(newOrder);
    localStorage.setItem(`luxebite_orders_${user.id}`, JSON.stringify(existingOrders));

    setIsPaymentOpen(false);
    setIsOrderConfirmOpen(true);
    
    // Clear cart after successful order
    if (!selectedItemForOrder) {
      setCartItems([]);
    }
    setSelectedItemForOrder(null);
    
    toast({
      title: "Order Placed Successfully!",
      description: `Payment method: ${paymentMethod}`,
    });
  };

  const handleAccountClick = () => {
    if (isLoggedIn) {
      setIsAccountOpen(true);
    } else {
      setIsAuthOpen(true);
    }
  };

  const handleTrackOrder = (order: Order) => {
    setTrackingOrder(order);
    setIsOrderHistoryOpen(false);
    setIsOrderTrackingOpen(true);
  };

  const handleOrderHistoryOpen = () => {
    setIsAccountOpen(false);
    setIsOrderHistoryOpen(true);
  };

  const handleOrderConfirmClose = () => {
    setIsOrderConfirmOpen(false);
  };

  const [selectedDelivery, setSelectedDelivery] = useState(deliveryOptions[0]);
  const [selectedMenu, setSelectedMenu] = useState(menuOptions[0]);
  const [orderHistory] = useState(orderHistorySample);
  const [tracking] = useState(trackingSample);

  return (
    <div className="min-h-screen bg-background">
        <Header
          cartItems={cartItems}
          onCartClick={() => setIsCartOpen(true)}
          onAccountClick={handleAccountClick}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          currentLocation={currentLocation}
          onLocationClick={() => setIsLocationOpen(true)}
        />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Welcome to{' '}
              <span className="luxe-text-gradient">LuxeBite</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Experience premium food delivery with exceptional taste and lightning-fast service
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="luxe-card px-6 py-3">
                <span className="text-2xl font-bold luxe-text-gradient">25min</span>
                <p className="text-sm text-muted-foreground">Avg Delivery</p>
              </div>
              <div className="luxe-card px-6 py-3">
                <span className="text-2xl font-bold luxe-text-gradient">4.9★</span>
                <p className="text-sm text-muted-foreground">Customer Rating</p>
              </div>
              <div className="luxe-card px-6 py-3">
                <span className="text-2xl font-bold luxe-text-gradient">Free</span>
                <p className="text-sm text-muted-foreground">Delivery &gt;₹299</p>
              </div>
            </div>
          </div>
        </section>

        {/* Filters and Sort */}
        <section className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-3">
              {/* Category Filter */}
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="luxe-input pr-8 appearance-none cursor-pointer"
                >
                  {categoryFilters.map(filter => (
                    <option key={filter.id} value={filter.value}>
                      {filter.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 pointer-events-none" />
              </div>

              {/* Sort Filter */}
              <div className="relative">
                <select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="luxe-input pr-8 appearance-none cursor-pointer"
                >
                  {sortOptions.map(option => (
                    <option key={option.id} value={option.value}>
                      {option.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Filter className="h-4 w-4" />
              <span>{filteredAndSortedItems.length} items found</span>
            </div>
          </div>
        </section>

        {/* Food Items Grid */}
        <section className="mb-16">
          {filteredAndSortedItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground mb-4">No items found</p>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAndSortedItems.map((item) => (
                <FoodCard
                  key={item.id}
                  item={item}
                  cartItems={cartItems}
                  onAddToCart={addToCart}
                  onUpdateQuantity={updateQuantity}
                  onOrderNow={handleOrderNow}
                />
              ))}
            </div>
          )}
        </section>

        {/* About Section */}
        <AboutSection />
      </main>

      {/* Modals */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
      />

      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        cartItems={cartItems}
        selectedItem={selectedItemForOrder ? { ...selectedItemForOrder, quantity: 1 } : undefined}
        onOrderConfirm={handleOrderConfirm}
      />

      <OrderConfirmation
        isOpen={isOrderConfirmOpen}
        onClose={handleOrderConfirmClose}
      />

      <LocationModal
        isOpen={isLocationOpen}
        onClose={() => setIsLocationOpen(false)}
        currentLocation={currentLocation}
        onLocationSelect={setCurrentLocation}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      <UserAccount
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        onOrderHistory={handleOrderHistoryOpen}
      />

      <OrderHistory
        isOpen={isOrderHistoryOpen}
        onClose={() => setIsOrderHistoryOpen(false)}
        onTrackOrder={handleTrackOrder}
      />

      <OrderTracking
        isOpen={isOrderTrackingOpen}
        onClose={() => setIsOrderTrackingOpen(false)}
        order={trackingOrder}
      />

      {/* Left Sidebar: Delivery Options */}
      <aside className="sidebar left">
        <h3>Delivery Options</h3>
        <ul>
          {deliveryOptions.map((opt) => (
            <li key={opt}>
              <button
                className={selectedDelivery === opt ? "active" : ""}
                onClick={() => setSelectedDelivery(opt)}
              >
                {opt}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main>
        <h1>LuxeBite Premium Food Delivery</h1>
        <nav>
          {menuOptions.map((opt) => (
            <button
              key={opt}
              className={selectedMenu === opt ? "active" : ""}
              onClick={() => setSelectedMenu(opt)}
            >
              {opt}
            </button>
          ))}
        </nav>
        <section>
          <h2>{selectedMenu}</h2>
          <p>Menu items for {selectedMenu} will appear here.</p>
          <button onClick={() => alert("Order placed!")}>Order Now</button>
          <button onClick={() => alert("More options coming soon!")}>More Options</button>
        </section>
      </main>

      {/* Right Sidebar: Tracking (top) & History (bottom) */}
      <aside className="sidebar right">
        <div className="tracking">
          <h3>Track Your Order</h3>
          <p>Order ID: {tracking.orderId}</p>
          <p>Status: {tracking.status}</p>
          <p>ETA: {tracking.eta}</p>
          <button onClick={() => alert("Tracking details refreshed!")}>Refresh</button>
        </div>
        <div className="history">
          <h3>Order History</h3>
          <ul>
            {orderHistory.map((order) => (
              <li key={order.id}>
                {order.item} - {order.date} ({order.status})
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Index;
