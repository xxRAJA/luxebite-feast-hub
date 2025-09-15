import React, { useState, useEffect } from 'react';
import { X, MapPin, Clock, CheckCircle, Truck, Package, Phone } from 'lucide-react';
import { Order } from '../types/user';

interface OrderTrackingProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
}

const OrderTracking: React.FC<OrderTrackingProps> = ({ isOpen, onClose, order }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [trackingLocation, setTrackingLocation] = useState({
    lat: 19.0760,
    lng: 72.8777,
    address: "LuxeBite Kitchen, Mumbai"
  });

  const trackingSteps = [
    { icon: Package, label: 'Order Confirmed', time: '2 min ago' },
    { icon: CheckCircle, label: 'Preparing', time: '15 min ago' },
    { icon: Truck, label: 'On the way', time: 'Estimated 20 min' },
    { icon: MapPin, label: 'Delivered', time: 'Pending' }
  ];

  // Simulate order progress
  useEffect(() => {
    if (!isOpen || !order) return;

    const interval = setInterval(() => {
      setCurrentStep(prev => {
        const next = Math.min(prev + 1, trackingSteps.length - 1);
        
        // Simulate location updates when on the way
        if (next === 2) {
          const locations = [
            { lat: 19.0760, lng: 72.8777, address: "LuxeBite Kitchen, Mumbai" },
            { lat: 19.0720, lng: 72.8740, address: "Near Bandra Station" },
            { lat: 19.0680, lng: 72.8700, address: "Linking Road Junction" },
            { lat: 19.0640, lng: 72.8660, address: "Carter Road" }
          ];
          
          const locationIndex = Math.floor(Math.random() * locations.length);
          setTrackingLocation(locations[locationIndex]);
        }
        
        return next;
      });
    }, 10000); // Update every 10 seconds for demo

    return () => clearInterval(interval);
  }, [isOpen, order]);

  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative luxe-card w-full max-w-md mx-4 animate-scale-in max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-accent rounded-full transition-colors z-10"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold luxe-text-gradient mb-2">Track Order</h2>
            <p className="text-muted-foreground">Order #{order.id.slice(-8)}</p>
          </div>

          {/* Order Details */}
          <div className="luxe-card-inner mb-6 p-4">
            <h3 className="font-semibold mb-2">Order Details</h3>
            <div className="space-y-1 text-sm">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span>{item.quantity}x {item.name}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
              <div className="border-t pt-2 font-semibold flex justify-between">
                <span>Total</span>
                <span>₹{order.totalAmount}</span>
              </div>
            </div>
          </div>

          {/* Live Location */}
          {currentStep === 2 && (
            <div className="luxe-card-inner mb-6 p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                <h3 className="font-semibold">Live Location</h3>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Delivery Partner</p>
                  <p className="text-sm text-muted-foreground">{trackingLocation.address}</p>
                </div>
              </div>
              <button className="w-full mt-3 luxe-button-secondary flex items-center justify-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>Call Delivery Partner</span>
              </button>
            </div>
          )}

          {/* Tracking Steps */}
          <div className="space-y-4">
            <h3 className="font-semibold">Order Progress</h3>
            {trackingSteps.map((step, index) => {
              const IconComponent = step.icon;
              const isActive = index <= currentStep;
              const isCurrent = index === currentStep;
              
              return (
                <div key={index} className="flex items-center space-x-4">
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center
                    ${isActive ? 'luxe-gradient text-white' : 'bg-muted text-muted-foreground'}
                    ${isCurrent ? 'animate-pulse' : ''}
                  `}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  
                  <div className="flex-1">
                    <p className={`font-medium ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                      {step.label}
                    </p>
                    <p className="text-sm text-muted-foreground">{step.time}</p>
                  </div>
                  
                  {isCurrent && (
                    <div className="text-primary font-medium text-sm">Current</div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Delivery Info */}
          <div className="luxe-card-inner mt-6 p-4">
            <div className="flex items-center space-x-3 mb-2">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Estimated Delivery</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(order.estimatedDelivery).toLocaleTimeString()}
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Delivery Address</p>
                <p className="text-sm text-muted-foreground">{order.deliveryAddress}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;