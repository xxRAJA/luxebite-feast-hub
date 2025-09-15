import React, { useState } from 'react';
import { X, CreditCard, Smartphone, Banknote, Check } from 'lucide-react';
import { CartItem } from '../types/food';
import { paymentMethods } from '../data/foodData';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  selectedItem?: CartItem;
  onOrderConfirm: (paymentMethod: string) => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  selectedItem,
  onOrderConfirm,
}) => {
  const [selectedPayment, setSelectedPayment] = useState<string>('');
  
  const items = selectedItem ? [selectedItem] : cartItems;
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = total > 299 ? 0 : 40;
  const finalTotal = total + deliveryFee;

  const getPaymentIcon = (methodId: string) => {
    switch (methodId) {
      case 'online':
      case 'card':
        return <CreditCard className="h-5 w-5" />;
      case 'upi':
        return <Smartphone className="h-5 w-5" />;
      case 'cod':
        return <Banknote className="h-5 w-5" />;
      default:
        return <CreditCard className="h-5 w-5" />;
    }
  };

  const handleConfirmOrder = () => {
    if (selectedPayment) {
      onOrderConfirm(selectedPayment);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative luxe-card max-w-md w-full mx-4 animate-scale-in">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold luxe-text-gradient">Choose Payment</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-secondary rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Order Summary */}
          <div className="bg-secondary/50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold mb-2">Order Summary</h3>
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.name} x {item.quantity}</span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
            <div className="border-t mt-2 pt-2 space-y-1">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span>₹{total}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Delivery:</span>
                <span>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span className="luxe-text-gradient">₹{finalTotal}</span>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="space-y-3 mb-6">
            <h3 className="font-semibold">Payment Method</h3>
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedPayment(method.id)}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                  selectedPayment === method.id
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getPaymentIcon(method.id)}
                    <span className="font-medium">{method.name}</span>
                  </div>
                  {selectedPayment === method.id && (
                    <Check className="h-5 w-5 text-primary" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Confirm Button */}
          <button
            onClick={handleConfirmOrder}
            disabled={!selectedPayment}
            className={`w-full ${
              selectedPayment === 'cod' ? 'luxe-button-primary' : 'luxe-button-primary'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {selectedPayment === 'cod' ? 'Confirm Order' : 'Pay Now'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;