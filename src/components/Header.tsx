import React, { useState } from 'react';
import { MapPin, ShoppingCart, Search, User } from 'lucide-react';
import { CartItem } from '../types/food';
import { useAuth } from '../hooks/useAuth';
import luxeBiteLogo from '../assets/luxebite-logo.jpg';

interface HeaderProps {
  cartItems: CartItem[];
  onCartClick: () => void;
  onAccountClick: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  currentLocation: string;
  onLocationClick: () => void;
}

const Header: React.FC<HeaderProps> = ({
  cartItems,
  onCartClick,
  onAccountClick,
  searchQuery,
  onSearchChange,
  currentLocation,
  onLocationClick,
}) => {
  const { user, isLoggedIn } = useAuth();
  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 luxe-card border-b backdrop-blur-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src={luxeBiteLogo} 
              alt="LuxeBite Logo" 
              className="h-12 w-auto rounded-lg shadow-lg"
            />
            <div>
              <h1 className="text-2xl font-bold luxe-text-gradient">LuxeBite</h1>
              <p className="text-xs text-muted-foreground">Premium Food Delivery</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="Search delicious food..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="luxe-input w-full pl-10 pr-4"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Location */}
            <button
              onClick={onLocationClick}
              className="flex items-center space-x-2 text-sm hover:text-primary transition-colors"
            >
              <MapPin className="h-4 w-4" />
              <span className="hidden md:block">{currentLocation}</span>
            </button>

            {/* Account */}
            <button
              onClick={onAccountClick}
              className="flex items-center space-x-2 text-sm hover:text-primary transition-colors"
            >
              <User className="h-5 w-5" />
              <span className="hidden md:block">
                {isLoggedIn ? user?.name?.split(' ')[0] : 'Account'}
              </span>
            </button>

            {/* Cart */}
            <button
              onClick={onCartClick}
              className="relative luxe-button-primary flex items-center space-x-2"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="hidden md:block">Cart</span>
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold animate-bounce-in">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;