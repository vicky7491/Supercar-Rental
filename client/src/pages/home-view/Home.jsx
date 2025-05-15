
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CustomFooter from "@/components/ui/footer";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, Search, Globe, Star, Heart, Shield, Bike, MapPin, Clock, BadgeCheck } from "lucide-react";
import Header from "../../pages/home-view/Header";
import FeatureCar from "../../pages/home-view/FeatureCar";



export default function Home() {
  
  const features = [
    { icon: Shield, title: "Premium Insurance", description: "Full coverage included" },
    { icon: BadgeCheck, title: "Quality Guaranteed", description: "Verified vehicles only" },
    { icon: Clock, title: "24/7 Support", description: "Always here to help" },
    { icon: MapPin, title: "Multiple Locations", description: "Convenient pickup points" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <div className="relative h-[700px] bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500">
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white z-10">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Experience Luxury, 
              <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
                Book Your Premium Ride
              </span>
            </h1>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 grid grid-cols-1 lg:grid-cols-4 gap-4 shadow-xl">
              <div className="space-y-2">
                <Label className="text-gray-200">Pickup Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input className="pl-10" placeholder="Enter location" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-gray-200">Pickup Date</Label>
                <Input type="date" className="bg-white/5 border-white/20" />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-200">Return Date</Label>
                <Input type="date" className="bg-white/5 border-white/20" />
              </div>
              <Button className="h-12 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
                <Search className="mr-2" />
                Search Cars
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <feature.icon className="h-8 w-8 text-blue-600 mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-1">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Cars Section */}
      <FeatureCar />

      {/* Brands Section */}
      {/* <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-gray-500 text-center mb-8">Trusted by leading brands</h3>
          <div className="grid grid-cols-6 gap-8 opacity-50"> */}
            {/* Add brand logos here */}
          {/* </div>
        </div>
      </section> */}

      <CustomFooter />
    </div>
  );
}