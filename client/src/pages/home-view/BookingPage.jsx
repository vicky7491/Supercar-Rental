import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";



const BookingPage = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
 const [car, setCar] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState('');
  const cars = [
    { id: 1, name: "2023 Tesla Model S", price: 1499, seats: 5, transmission: "Automatic", fuel: "Electric", rating: 4.9, image: "/tesla-model-s.jpg" },
    { id: 2, name: "BMW X5 2023", price: 1299, seats: 5, transmission: "Automatic", fuel: "6.2 L/100km", rating: 4.8, image: "/bmw-x5.jpg" },
    { id: 3, name: "Mercedes C-Class", price: 1099, seats: 4, transmission: "Automatic", fuel: "5.1 L/100km", rating: 4.6, image: "/mercedes-c.jpg" },
    { id: 4, name: "Audi A4 2023", price: 999, seats: 5, transmission: "Automatic", fuel: "5.3 L/100km", rating: 4.7, image: "/audi-a4.jpg" },
    { id: 5, name: "Porsche 911 Carrera", price: 2999, seats: 2, transmission: "Automatic", fuel: "9.4 L/100km", rating: 4.9, image: "/porsche-911.jpg" },
    { id: 6, name: "Jeep Wrangler", price: 8999, seats: 5, transmission: "Manual", fuel: "10.2 L/100km", rating: 4.5, image: "/jeep-wrangler.png" },
    { id: 7, name: "Ford Mustang GT", price: 1199, seats: 4, transmission: "Automatic", fuel: "8.7 L/100km", rating: 4.7, image: "/ford-mustang.png" },
    { id: 8, name: "Lamborghini Huracan", price: 4999, seats: 2, transmission: "Automatic", fuel: "13.8 L/100km", rating: 5.0, image: "/lamborghini-huracan.png" },
    { id: 9, name: "Ferrari F8 Tributo", price: 5199, seats: 2, transmission: "Automatic", fuel: "12.3 L/100km", rating: 5.0, image: "/ferrari-f8.jpg" },
    { id: 10, name: "Rolls Royce Ghost", price: 5999, seats: 5, transmission: "Automatic", fuel: "15.0 L/100km", rating: 4.9, image: "/rolls-royce-ghost.jpg" },
    { id: 11, name: "Range Rover Velar", price: 1599, seats: 5, transmission: "Automatic", fuel: "7.1 L/100km", rating: 4.8, image: "/range-rover-velar.png" },
    { id: 12, name: "Toyota Supra", price: 1399, seats: 2, transmission: "Automatic", fuel: "7.5 L/100km", rating: 4.6, image: "/toyota-supra.jpg" },
    { id: 13, name: "Chevrolet Camaro ZL1", price: 1299, seats: 4, transmission: "Manual", fuel: "8.9 L/100km", rating: 4.7, image: "/chevrolet-camaro.png" },
    { id: 14, name: "Nissan GT-R", price: 1499, seats: 4, transmission: "Automatic", fuel: "9.1 L/100km", rating: 4.8, image: "/nissan-gtr.jpg" },
    { id: 15, name: "Bentley Continental GT", price: 5499, seats: 4, transmission: "Automatic", fuel: "14.1 L/100km", rating: 4.9, image: "/bentley-continental.jpg" }
  ];

  // Fetch car details
   useEffect(() => {
    const selectedCar = cars.find(car => car.id === Number(carId));
    if (selectedCar) {
      setCar(selectedCar);
    } else {
      navigate('/');
    }
  }, [carId, navigate]);

  // Calculate price
   useEffect(() => {
    if (startDate && endDate && car?.price) {
      const diffTime = Math.abs(endDate - startDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setTotalPrice(diffDays * car.price);
    } else {
      setTotalPrice(0);
    }
  }, [startDate, endDate, car]);

const handleBooking = async () => {
  if (!startDate || !endDate) {
    setError('Please select both start and end dates');
    return;
  }

    // Simulate successful booking
  navigate('/booking-confirmation', {
    state: {
      booking: {
        vehicleId: carId,
        startTime: startDate.toISOString(),
        endTime: endDate.toISOString(),
        totalPrice,
      },
      carDetails: car,
    },
  });
};

//   try {
//     // 1. Convert dates to ISO strings
//     const bookingData = {
//       vehicleId: carId,
//       startTime: startDate.toISOString(),
//       endTime: endDate.toISOString(),
//       totalPrice
//     };


//       console.log("Booking Data:", bookingData); 
//     // 2. Use correct backend URL (typically port 5000 for Node.js)
//     const response = await axios.post('http://localhost:3000/api/bookings', bookingData, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('token')}`,
//         'Content-Type': 'application/json'
        
//       }
      
      
//     });
//     console.log("Token:", localStorage.getItem('token'));


//     // 3. Check for successful response
//     if (response.status === 201) {
//       // 4. Pass booking data to confirmation page
//       navigate('/booking-confirmation', {
//         state: {
//           booking: response.data,
//           carDetails: car
//         }
//       });
//     }
//   } catch (err) {
//     // 5. Enhanced error handling
//     let errorMessage = 'Booking failed. Please try again.';
    
//     if (err.response) {
//       // Server responded with error status
//       console.error('Booking error:', err.response.data);
//       errorMessage = err.response.data.message || errorMessage;
      
//       // Handle authentication errors
//       if (err.response.status === 401) {
//         navigate('/login');
//         return;
//       }
//     } else if (err.request) {
//       // Request was made but no response received
//       errorMessage = 'Server is not responding. Please try again later.';
//       console.error('No response from server:', err.request);
//     }

//     setError(errorMessage);
//     console.error('Booking error:', err);
//   }
// };

  if (!car) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Book {car?.name}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img
              src={`${window.location.origin}${car.image}`}
              alt={car?.name}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Booking Details</h2>
              <div className="flex justify-between">
                <span>Daily Rate:</span>
                <span className="font-bold">₹{car?.price}/day</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block mb-2">Pick-up Date & Time</label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  showTimeSelect
                  dateFormat="MMMM d, yyyy h:mm aa"
                  minDate={new Date()}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block mb-2">Return Date & Time</label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  showTimeSelect
                  dateFormat="MMMM d, yyyy h:mm aa"
                  minDate={startDate}
                  className="w-full p-2 border rounded"
                />
              </div>

              {error && <p className="text-red-500">{error}</p>}

              <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Total:</span>
                  <span className="text-2xl font-bold">₹{totalPrice}</span>
                </div>
                
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 py-4 text-lg"
                  onClick={handleBooking}
                
                >
                  Confirm Booking
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BookingPage;