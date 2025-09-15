import React, { useState } from 'react';
import { X, MapPin, Navigation, Search } from 'lucide-react';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocation: string;
  onLocationSelect: (location: string) => void;
}

const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  currentLocation,
  onLocationSelect,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const popularLocations = [
    'Mumbai, Maharashtra',
    'Delhi, Delhi',
    'Bangalore, Karnataka',
    'Pune, Maharashtra',
    'Chennai, Tamil Nadu',
    'Hyderabad, Telangana',
    'Kolkata, West Bengal',
    'Ahmedabad, Gujarat',
  ];

  const filteredLocations = popularLocations.filter(location =>
    location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you'd reverse geocode these coordinates
          onLocationSelect('Current Location');
          onClose();
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your current location. Please select manually.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleLocationSelect = (location: string) => {
    onLocationSelect(location);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative luxe-card max-w-md w-full mx-4 animate-scale-in">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold luxe-text-gradient">Select Location</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-secondary rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Current Location Button */}
          <button
            onClick={handleCurrentLocation}
            className="w-full luxe-button-primary mb-4 flex items-center justify-center space-x-2"
          >
            <Navigation className="h-4 w-4" />
            <span>Use Current Location</span>
          </button>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              placeholder="Search city or area..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="luxe-input w-full pl-10"
            />
          </div>

          {/* Popular Locations */}
          <div className="space-y-2">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
              Popular Locations
            </h3>
            <div className="max-h-60 overflow-y-auto space-y-1">
              {filteredLocations.map((location) => (
                <button
                  key={location}
                  onClick={() => handleLocationSelect(location)}
                  className={`w-full text-left p-3 rounded-lg transition-colors flex items-center space-x-3 ${
                    location === currentLocation
                      ? 'bg-primary/20 border border-primary'
                      : 'hover:bg-secondary'
                  }`}
                >
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>{location}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;