import React from 'react';
import { Star, Plus, Minus } from 'lucide-react';
import { FoodItem, CartItem } from '../types/food';

interface FoodCardProps {
  item: FoodItem;
  cartItems: CartItem[];
  onAddToCart: (item: FoodItem) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onOrderNow: (item: FoodItem) => void;
}

const FoodCard: React.FC<FoodCardProps> = ({
  item,
  cartItems,
  onAddToCart,
  onUpdateQuantity,
  onOrderNow,
}) => {
  const cartItem = cartItems.find(cartItem => cartItem.id === item.id);
  const quantity = cartItem?.quantity || 0;

  const getCategoryBadge = (category: string, isVeg: boolean) => {
    if (category === 'dessert') return 'fast-food-badge';
    if (isVeg) return 'veg-badge';
    return 'non-veg-badge';
  };

  const getCategoryLabel = (category: string, isVeg: boolean) => {
    if (category === 'dessert') return 'Dessert';
    if (isVeg) return 'Veg';
    return 'Non-Veg';
  };

  return (
    <div className="food-card animate-fade-in">
      <div className="relative overflow-hidden rounded-lg mb-4">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute top-2 left-2">
          <span className={getCategoryBadge(item.category, item.isVeg)}>
            {getCategoryLabel(item.category, item.isVeg)}
          </span>
        </div>
        <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
          <Star className="h-3 w-3 text-yellow-400 fill-current" />
          <span className="text-white text-xs font-medium">{item.rating}</span>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <h3 className="font-bold text-lg text-foreground">{item.name}</h3>
          <p className="text-muted-foreground text-sm">{item.description}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="price-tag">₹{item.price}</span>
            <span className="text-xs text-muted-foreground">• {item.distance}km away</span>
          </div>
        </div>

        <div className="flex items-center justify-between space-x-2">
          {quantity > 0 ? (
            <div className="flex items-center space-x-2 bg-secondary rounded-lg p-1">
              <button
                onClick={() => onUpdateQuantity(item.id, quantity - 1)}
                className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-110 transition-transform"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="font-bold text-lg w-8 text-center">{quantity}</span>
              <button
                onClick={() => onUpdateQuantity(item.id, quantity + 1)}
                className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-110 transition-transform"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => onAddToCart(item)}
              className="luxe-button-secondary flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add to Cart</span>
            </button>
          )}

          <button
            onClick={() => onOrderNow(item)}
            className="luxe-button-primary flex-1"
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;