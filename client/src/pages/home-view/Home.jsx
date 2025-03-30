// app/page.tsx
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CustomFooter from "@/components/ui/footer";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, Search, Globe, Star, Facebook, Twitter, Instagram } from "lucide-react";

export default function Home() {
  const cars = [
    {
      id: 1,
      name: "Toyota Camry 2023",
      price: 89,
      seats: 4,
      transmission: "Automatic",
      fuel: "4.8 L/100km",
      rating: 4.5,
      image: "/camry.jpg",
    },
    {
      id: 2,
      name: "BMW X5 2023",
      price: 129,
      seats: 5,
      transmission: "Automatic",
      fuel: "6.2 L/100km",
      rating: 4.8,
      image: "/x5.jpg",
    },
    {
      id: 3,
      name: "Mercedes C-Class",
      price: 109,
      seats: 4,
      transmission: "Automatic",
      fuel: "5.1 L/100km",
      rating: 4.6,
      image: "/c-class.jpg",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 bg-white shadow-sm z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold text-blue-600">CarRental</h1>
            
            <NavigationMenu className="hidden md:block">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink href="/" className="px-4 py-2 text-gray-600 hover:text-blue-600">
                    Home
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="/cars" className="px-4 py-2 text-gray-600 hover:text-blue-600">
                    Cars
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="/about" className="px-4 py-2 text-gray-600 hover:text-blue-600">
                    About
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="/contact" className="px-4 py-2 text-gray-600 hover:text-blue-600">
                    Contact
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden md:flex">
              <Globe className="w-4 h-4 mr-2" />
              EN
            </Button>
            <Avatar>
              <AvatarImage src="/user.jpg" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <Menu className="md:hidden" />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative h-[600px] bg-gray-900">
        <div className="absolute inset-0 bg-black/60">
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl text-white">
              <h1 className="text-5xl font-bold mb-6">Find Your Perfect Rental Car</h1>
              <p className="text-xl mb-8">Choose from premium vehicles for your journey</p>
              
              <div className="bg-white rounded-lg p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label className="text-gray-600">Pickup Location</Label>
                  <Input placeholder="Enter location" />
                </div>
                <div>
                  <Label className="text-gray-600">Pickup Date</Label>
                  <Input type="date" />
                </div>
                <div>
                  <Label className="text-gray-600">Return Date</Label>
                  <Input type="date" />
                </div>
                <Button className="h-12 mt-auto">
                  <Search className="mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Cars */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Featured Cars</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cars.map((car) => (
            <Card key={car.id} className="hover:shadow-xl transition-shadow">
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold">{car.name}</h3>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                    <span>{car.rating}</span>
                  </div>
                </div>
                
                <div className="space-y-2 text-gray-600 mb-6">
                  <div className="flex justify-between">
                    <span>Seats</span>
                    <span>{car.seats}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Transmission</span>
                    <span>{car.transmission}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fuel Efficiency</span>
                    <span>{car.fuel}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">From</p>
                    <p className="text-2xl font-bold">${car.price}<span className="text-sm font-normal">/day</span></p>
                  </div>
                  <Button>Book Now</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
    <CustomFooter />
    </div>
  );
}