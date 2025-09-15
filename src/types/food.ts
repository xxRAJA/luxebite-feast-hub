export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'veg' | 'non-veg' | 'fast-food' | 'dessert';
  type: 'normal' | 'fast-food';
  rating: number;
  distance: number; // in km
  isVeg: boolean;
}

export interface CartItem extends FoodItem {
  quantity: number;
}

export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
}

export interface SortOption {
  id: string;
  name: string;
  value: 'nearest' | 'farthest' | 'low-price' | 'high-price' | 'high-rating';
}

export interface CategoryFilter {
  id: string;
  name: string;
  value: 'all' | 'veg' | 'non-veg' | 'fast-food' | 'normal' | 'dessert';
}