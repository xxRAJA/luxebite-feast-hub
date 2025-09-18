import React from "react";
import { Toaster as ShadToaster } from "../components/ui/toaster";
import { Toaster as SonnerToaster } from "../components/ui/sonner";
import { TooltipProvider } from "../components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import "./App.css";

// Samples (remove later if not needed)
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

const queryClient = new QueryClient();

const App: React.FC = () => {
  // ⚡ If you want to use these states later, keep them
  // const [selectedDelivery, setSelectedDelivery] = React.useState(deliveryOptions[0]);
  // const [selectedMenu, setSelectedMenu] = React.useState(menuOptions[0]);
  // const [orderHistory, setOrderHistory] = React.useState(orderHistorySample);
  // const [tracking, setTracking] = React.useState(trackingSample);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* ShadCN toaster */}
        <ShadToaster />
        {/* Sonner toaster */}
        <SonnerToaster />

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* Custom routes can be added above */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
