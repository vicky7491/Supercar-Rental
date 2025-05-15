import React from 'react';
import { Button } from "@/components/ui/button";
import { CheckCircle } from 'lucide-react';

const BookingConfirmation = () => {
  return (
    <div className="container mx-auto p-6 text-center">
      <div className="max-w-2xl mx-auto">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-4">Booking Confirmed!</h1>
        <p className="text-lg mb-6">
          Your booking has been successfully confirmed. A confirmation email 
          has been sent to your registered email address.
        </p>
        <Button 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => window.location.href = '/bookings'}
        >
          View My Bookings
        </Button>
      </div>
    </div>
  );
};

export default BookingConfirmation;