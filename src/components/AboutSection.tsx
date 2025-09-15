import React from 'react';
import { User, MapPin, Clock, Award } from 'lucide-react';
import ceoImage from '../assets/ceo-aryan.jpg';

const AboutSection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold luxe-text-gradient mb-4">About LuxeBite</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Premium food delivery experience founded with passion for exceptional cuisine
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* CEO Section */}
          <div className="text-center md:text-left">
            <div className="inline-block relative mb-6">
              <img
                src={ceoImage}
                alt="Aryan Thakur - CEO & Founder"
                className="w-64 h-64 object-cover rounded-2xl shadow-[var(--shadow-luxury)] mx-auto"
              />
              <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground rounded-xl p-3">
                <Award className="h-6 w-6" />
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-2xl font-bold">Aryan Thakur</h3>
              <p className="luxe-text-gradient font-semibold">CEO & Founder</p>
              <div className="flex items-center justify-center md:justify-start space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>Age 20</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>Founded 2025</span>
                </div>
              </div>
            </div>
          </div>

          {/* Company Info */}
          <div className="space-y-8">
            <div className="luxe-card p-6">
              <h4 className="text-xl font-bold mb-4 flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Our Mission</span>
              </h4>
              <p className="text-muted-foreground">
                At LuxeBite, we believe that exceptional food should be accessible to everyone. 
                Founded in 2025 by visionary entrepreneur Aryan Thakur, we're revolutionizing 
                the food delivery experience with premium quality, lightning-fast service, and 
                unmatched customer satisfaction.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="luxe-card p-4 text-center">
                <div className="luxe-text-gradient text-2xl font-bold mb-2">500+</div>
                <div className="text-sm text-muted-foreground">Happy Customers</div>
              </div>
              <div className="luxe-card p-4 text-center">
                <div className="luxe-text-gradient text-2xl font-bold mb-2">50+</div>
                <div className="text-sm text-muted-foreground">Menu Items</div>
              </div>
              <div className="luxe-card p-4 text-center">
                <div className="luxe-text-gradient text-2xl font-bold mb-2">4.9★</div>
                <div className="text-sm text-muted-foreground">Average Rating</div>
              </div>
              <div className="luxe-card p-4 text-center">
                <div className="luxe-text-gradient text-2xl font-bold mb-2">25min</div>
                <div className="text-sm text-muted-foreground">Avg Delivery</div>
              </div>
            </div>

            <div className="luxe-card p-6">
              <h4 className="text-xl font-bold mb-4 flex items-center space-x-2">
                <Award className="h-5 w-5 text-primary" />
                <span>Why Choose LuxeBite?</span>
              </h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span>Premium quality ingredients</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span>Lightning-fast delivery</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span>Multiple payment options</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span>24/7 customer support</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;