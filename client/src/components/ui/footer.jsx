import React from 'react';
import { Facebook, Twitter, Instagram } from "lucide-react";
// Add this custom footer component in your Home component file:
const CustomFooter = () => (
  <footer className="bg-gray-100 mt-auto">
    <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">CarRental</h3>
        <p className="text-gray-600">Premium car rental service with 24/7 support.</p>
      </div>
      
      <div>
        <h4 className="font-semibold mb-4">Quick Links</h4>
        <ul className="space-y-2 text-gray-600">
          <li><a href="/about" className="hover:text-blue-600">About Us</a></li>
          <li><a href="/faq" className="hover:text-blue-600">FAQ</a></li>
          <li><a href="/terms" className="hover:text-blue-600">Terms of Service</a></li>
        </ul>
      </div>
      
      <div>
        <h4 className="font-semibold mb-4">Contact</h4>
        <ul className="space-y-2 text-gray-600">
          <li>+1 234 567 890</li>
          <li>contact@carrental.com</li>
          <li>New York, USA</li>
        </ul>
      </div>
      
      <div>
        <h4 className="font-semibold mb-4">Follow Us</h4>
        <div className="flex gap-4">
          <Facebook className="text-gray-600 hover:text-blue-600 cursor-pointer" />
          <Twitter className="text-gray-600 hover:text-blue-600 cursor-pointer" />
          <Instagram className="text-gray-600 hover:text-blue-600 cursor-pointer" />
        </div>
      </div>
    </div>
    
    <div className="border-t mt-8 pt-8 text-center text-gray-600">
      <p>© 2024 CarRental. All rights reserved.</p>
    </div>
  </footer>
);

export default CustomFooter;