import React, { useEffect } from 'react';
import { Check, Home } from 'lucide-react';

interface OrderConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      // Play doorbell sound
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+j8t2sIGjmJ0+PNdyUFLYPM7d2LMwkUYbeq25VIGgYrhNPx2YZBFgYqd8H55qJOFgUxhsnyxnUpBSKS2+y2iC4MHn7N7NqANAkcEpx7nGU3g2KRdJgMg18xf5OJhYaLhV1ee3OUqqaIhHnGZp2NeXOZeHiVf4ePjHufhHOGYpuPlnWZcoiCfYiLjXSjfH+JaJ6JgXaBZHOMjXiGhYGPkn+Ihol8lId9jHKihn6HZJ2MgXWBZXKMkHWFhYGRk3+IhYh6kol+iXKkh32EZZyLgXiCZ3OLkXeEgHqOk3yHhIl7lYh+jHKkhHyFZZyMhHaAZnOJkXeGf3qNlH2GgIV7lId+jnOjhnyDZp2Mg3iCaHGJkXWFgXuLk3yJhYV5lYd+jHKkhHyEZZ2Mg3aBZnKJkXeGgH2NknyEgYZ8lYh9jXOjhXyEZp2LhHaCZ3KJkXWEhXuLknyJhYV5lod+jHKjhXyEZZ2LhHaDZ3GJkXWGg32Mk32GgYV8lYh+jXKihXyDZ52LhHiCZ3GIkXWGhXuKk3yJhYV5lod9jXKjhXyEZZ2LhHaDZ3GJkXWGg32Mk32GgYV8lYh+jXKjhXyDZ52LhHiCZ3GIkXWGhHuLk3yJhYV6lod9jHKjhXyEZZ2LhHaDZ3GJkXWGg32Mk32GgYV8lYh+jXKjhXyDZ52LhHiCZ3GJkXWGhHuLk3yJhYV6lod9jHKjhXyEZZ2LhHaDZ3GJkXWGg32Mk32GgYV8lYh+jXKjhXyDZ52LhHiCZ3GJkXWGhHuLk3yJhYV6lod9jHKjhXyEZZ2LhHaDZ3GJkXWGg3yNk32GgYV8lYh+jXOihXyDZp2LhHiCaHGJkXWGhHuLknyJhYV6lod9jHKjhXyEZZ2LhHaDZ3GJkXWGg3yNk32GgYV8lYh+jXOihXyDZ52LhHiCaHGJkXWGhHuLknyJhYV6lod9jHKjhXyEZZ2LhHaDZ3GJkXWGg3yNk32GgYV8lYh+jXOihXyDZ52LhHiCaHGJkXWGhHuLknyJhYV6lod9jHKjhXyEZZ2LhHaDZ3GJkXWGg3yNk32GgYV8lYh+jXOihXyDZ52LhHiCaHGJkXWGhHuLknyJhYV6lod9jHKjhXyEZZ2LhHaDZ3GJkXWGg3yNk32GgYV8lYh+jXOihXyDZ52LhHiCaHGJkXWGhHuLknyJhYV6lod9jHKjhXyEZZ2LhHaDZ3GJkXWGg3yNk32GgYV8lYh+jXOihXyDZ52LhHiCaHGJkXWGhHuLknyJhYV6lod9jHKjhXyEZZ2LhHaDZ3GJkXWGg3yNk32GgYV8lYh+jXOihXyDZ52LhHiCaHGJkXWGhHuLknyJhYV6lod9jHKjhXyEZZ2LhHaDZ3GJkXWGg3yNk32GgYV8lYh+jXOihXyDZ52LhHiCaHGJkXWGhHuLknyJhYV6lod9jHKjhXyEZZ2LhHaDZ3GJkXWGg3yNk32GgYV8lYh+jXOihXyDZ52LhHiCaHGJkXWGhHuLknyJhYV6lod9jHKjhXyEZZ2LhHaDZ3GJkXWGg3yNk32GgYTjEP4=');
      audio.play().catch(() => {}); // Ignore errors if audio fails to play
      
      // Auto close after 3-4 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 3500);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="relative luxe-card max-w-md w-full mx-4 text-center animate-bounce-in">
        <div className="p-8 space-y-6">
          {/* Success Icon */}
          <div className="mx-auto w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center animate-cart-bounce">
            <Check className="h-10 w-10 text-white" />
          </div>

          {/* Success Message */}
          <div className="space-y-2">
            <h2 className="text-3xl font-bold luxe-text-gradient">Order Confirmed!</h2>
            <p className="text-muted-foreground">
              Thank you for ordering from LuxeBite
            </p>
          </div>

          {/* Additional Info */}
          <div className="bg-secondary/50 rounded-lg p-4 space-y-2">
            <p className="text-sm text-muted-foreground">
              Your delicious meal is being prepared
            </p>
            <p className="text-sm font-medium">
              Estimated delivery: 25-30 minutes
            </p>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="luxe-button-primary w-full flex items-center justify-center space-x-2"
          >
            <Home className="h-4 w-4" />
            <span>Continue Shopping</span>
          </button>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/20 rounded-full animate-ping" />
        <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-primary-glow/20 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
      </div>
    </div>
  );
};

export default OrderConfirmation;