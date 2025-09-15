import { FoodItem } from '../types/food';
import burgerImg from '../assets/burger-premium.jpg';
import pizzaImg from '../assets/pizza-deluxe.jpg';
import saladImg from '../assets/salad-fresh.jpg';
import pastaImg from '../assets/pasta-gourmet.jpg';
import chickenImg from '../assets/chicken-tikka.jpg';
import dessertImg from '../assets/dessert-luxury.jpg';

export const foodItems: FoodItem[] = [
  {
    id: '1',
    name: 'LuxeBite Premium Burger',
    description: 'Gourmet beef burger with premium ingredients',
    price: 299,
    image: burgerImg,
    category: 'non-veg',
    type: 'fast-food',
    rating: 4.8,
    distance: 0.5,
    isVeg: false,
  },
  {
    id: '2',
    name: 'Artisan Margherita Pizza',
    description: 'Fresh mozzarella, tomatoes, and basil',
    price: 399,
    image: pizzaImg,
    category: 'veg',
    type: 'normal',
    rating: 4.9,
    distance: 1.2,
    isVeg: true,
  },
  {
    id: '3',
    name: 'Garden Fresh Salad Bowl',
    description: 'Organic vegetables with quinoa and avocado',
    price: 249,
    image: saladImg,
    category: 'veg',
    type: 'normal',
    rating: 4.6,
    distance: 0.8,
    isVeg: true,
  },
  {
    id: '4',
    name: 'Creamy Alfredo Pasta',
    description: 'Rich creamy pasta with herbs and parmesan',
    price: 329,
    image: pastaImg,
    category: 'veg',
    type: 'normal',
    rating: 4.7,
    distance: 1.5,
    isVeg: true,
  },
  {
    id: '5',
    name: 'Spicy Chicken Tikka',
    description: 'Authentic Indian chicken with basmati rice',
    price: 349,
    image: chickenImg,
    category: 'non-veg',
    type: 'normal',
    rating: 4.9,
    distance: 2.1,
    isVeg: false,
  },
  {
    id: '6',
    name: 'Luxury Chocolate Delight',
    description: 'Premium chocolate dessert with berries',
    price: 179,
    image: dessertImg,
    category: 'dessert',
    type: 'normal',
    rating: 4.8,
    distance: 0.7,
    isVeg: true,
  },
  {
    id: '7',
    name: 'Crispy Chicken Wings',
    description: 'Spicy wings with special sauce',
    price: 259,
    image: chickenImg,
    category: 'non-veg',
    type: 'fast-food',
    rating: 4.5,
    distance: 1.0,
    isVeg: false,
  },
  {
    id: '8',
    name: 'Veggie Supreme Pizza',
    description: 'Loaded with fresh vegetables and cheese',
    price: 359,
    image: pizzaImg,
    category: 'veg',
    type: 'normal',
    rating: 4.7,
    distance: 1.2,
    isVeg: true,
  },
];

export const paymentMethods = [
  { id: 'online', name: 'Online Payment', icon: '💳' },
  { id: 'cod', name: 'Cash on Delivery', icon: '💵' },
  { id: 'upi', name: 'UPI Payment', icon: '📱' },
  { id: 'card', name: 'Card Payment', icon: '💳' },
];

export const sortOptions = [
  { id: 'nearest', name: 'Nearest First', value: 'nearest' as const },
  { id: 'farthest', name: 'Farthest First', value: 'farthest' as const },
  { id: 'low-price', name: 'Price: Low to High', value: 'low-price' as const },
  { id: 'high-price', name: 'Price: High to Low', value: 'high-price' as const },
  { id: 'high-rating', name: 'Highest Rated', value: 'high-rating' as const },
];

export const categoryFilters = [
  { id: 'all', name: 'All Items', value: 'all' as const },
  { id: 'veg', name: 'Vegetarian', value: 'veg' as const },
  { id: 'non-veg', name: 'Non-Vegetarian', value: 'non-veg' as const },
  { id: 'fast-food', name: 'Fast Food', value: 'fast-food' as const },
  { id: 'normal', name: 'Regular Food', value: 'normal' as const },
  { id: 'dessert', name: 'Desserts', value: 'dessert' as const },
];