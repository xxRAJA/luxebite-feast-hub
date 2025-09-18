import React, { useState } from 'react';
import { X, User, Mail, Phone, MapPin, Edit, Save, Package, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/use-toast';

interface UserAccountProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderHistory: () => void;
}

const UserAccount: React.FC<UserAccountProps> = ({ isOpen, onClose, onOrderHistory }) => {
  const { user, logout, updateUser } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  const handleSave = async () => {
    const success = await updateUser(formData);
    if (success) {
      setIsEditing(false);
      toast({ title: "Profile updated!", description: "Your information has been saved successfully" });
    } else {
      toast({ 
        title: "Update failed", 
        description: "Unable to update profile. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleLogout = async () => {
    await logout();
    onClose();
    toast({ title: "Logged out", description: "You have been successfully logged out" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative luxe-card w-full max-w-md mx-4 animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-accent rounded-full transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-6">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-primary to-primary-glow rounded-full flex items-center justify-center mx-auto mb-3">
              <User className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold luxe-text-gradient">My Account</h2>
            <p className="text-muted-foreground">Manage your profile</p>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                className={`luxe-input pl-10 ${!isEditing ? 'bg-muted/50' : ''}`}
                readOnly={!isEditing}
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className={`luxe-input pl-10 ${!isEditing ? 'bg-muted/50' : ''}`}
                readOnly={!isEditing}
              />
            </div>

            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                className={`luxe-input pl-10 ${!isEditing ? 'bg-muted/50' : ''}`}
                readOnly={!isEditing}
              />
            </div>

            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <textarea
                name="address"
                placeholder="Delivery Address"
                value={formData.address}
                onChange={handleInputChange}
                className={`luxe-input pl-10 min-h-[80px] resize-none ${!isEditing ? 'bg-muted/50' : ''}`}
                readOnly={!isEditing}
              />
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {isEditing ? (
              <div className="flex space-x-3">
                <button
                  onClick={handleSave}
                  className="flex-1 luxe-button-primary flex items-center justify-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 luxe-button-secondary"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="w-full luxe-button-secondary flex items-center justify-center space-x-2"
              >
                <Edit className="h-4 w-4" />
                <span>Edit Profile</span>
              </button>
            )}

            <button
              onClick={onOrderHistory}
              className="w-full luxe-button-secondary flex items-center justify-center space-x-2"
            >
              <Package className="h-4 w-4" />
              <span>Order History</span>
            </button>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAccount;