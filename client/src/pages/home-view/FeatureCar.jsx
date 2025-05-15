import React from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bike, Globe, Heart, Star } from "lucide-react"
import { Link } from 'react-router-dom';

const FeatureCar = () => {
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


  return (
    <div>
        {/* Featured Cars */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Premium Selection</h2>
          <div className="flex gap-4">
            <Button variant="outline">Sports Cars</Button>
            <Button variant="outline">SUVs</Button>
            <Button variant="outline">Luxury</Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {cars.map((car) => (
            <Card key={car.id} className="group hover:shadow-xl transition-all duration-300">
              <div className="relative">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-56 object-cover rounded-t-lg"
                />
                <Button variant="ghost" size="icon" className="absolute top-2 right-2 bg-white/90 hover:bg-white">
                  <Heart className="h-5 w-5 text-red-500" />
                </Button>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold">{car.name}</h3>
                  <div className="flex items-center bg-blue-100 px-2 py-1 rounded">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                    <span className="font-medium">{car.rating}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-6">
                  <div className="flex items-center">
                    <Bike className="w-5 h-5 mr-2 text-blue-600" />
                    <span>{car.seats} Seats</span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="w-5 h-5 mr-2 text-blue-600" />
                    <span>{car.transmission}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Daily rate from</p>
                    <p className="text-2xl font-bold text-blue-600">₹{car.price}<span className="text-sm font-normal text-gray-500">/day</span></p>
                  </div>
                  <Link to={`/bookings/${car.id}`}>
                    <Button className="bg-blue-600 hover:bg-blue-700">Book Now</Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button variant="outline" className="px-8 py-6 text-lg">
            Load More Cars
          </Button>
        </div>
      </section>
      </div>
  )
}

export default FeatureCar