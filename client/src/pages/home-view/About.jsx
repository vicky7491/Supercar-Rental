import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import CustomFooter from "@/components/ui/footer";
import Header from "../../pages/home-view/Header";
import { Medal, ShieldCheck, Users, Car, MapPin, Star, BadgeCheck } from "lucide-react";

export default function About() {
  const stats = [
    { value: "500+", label: "Premium Vehicles" },
    { value: "10K+", label: "Satisfied Clients" },
    { value: "50+", label: "Global Locations" },
    { value: "24/7", label: "Customer Support" },
  ];

  const team = [
    { 
      name: "Nitish Kumar", 
      role: "Founder", 
      bio: "Car enthusiast with 5+ years in luxury automotive industry",
      image: "/user.jpg"
    },
    { 
      name: "Raushan Raj Singh", 
      role: "CEO", 
      bio: "Ensures seamless rental experiences across all locations",
      image: "/CEO.png"
    },
    { 
      name: "Shivam Kumar Sharma", 
      role: "Managing Director", 
      bio: "Curates and maintains our exceptional vehicle collection",
      image: "/MD.jpg"
    },
    { 
      name: "Amarnath Kumar", 
      role: "Customer Experience", 
      bio: "Dedicated to making every rental memorable",
      image: "/amarnath.jpg"
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <div className="relative h-[500px] bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl text-white z-10">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Redefining Luxury Mobility
            </h1>
            <p className="text-xl mb-8">
              At Super Car Rental, we don't just rent vehicles - we deliver unforgettable experiences. 
              Our passion for excellence drives every aspect of our service.
            </p>
            <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
              Explore Our Fleet
            </Button>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <p className="text-lg text-gray-600 mb-8">
            Founded in 2025, Super Car Rental began with a simple vision: to provide discerning clients 
            with access to the world's most extraordinary vehicles. What started as a boutique service 
            with three premium cars has grown into an internationally recognized luxury rental brand.
          </p>
          <div className="flex justify-center">
            <Medal className="h-12 w-12 text-yellow-500" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Why Choose Us</h3>
            <p className="text-gray-600 mb-6">
              We meticulously curate our fleet to include only the most exceptional vehicles, each 
              maintained to showroom condition. Our concierge-level service ensures every rental 
              experience exceeds expectations.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <BadgeCheck className="h-6 w-6 text-green-500 mr-3 mt-1" />
                <span className="text-gray-700">Hand-picked luxury and exotic vehicles</span>
              </li>
              <li className="flex items-start">
                <ShieldCheck className="h-6 w-6 text-blue-500 mr-3 mt-1" />
                <span className="text-gray-700">Comprehensive insurance coverage</span>
              </li>
              <li className="flex items-start">
                <Star className="h-6 w-6 text-yellow-500 mr-3 mt-1" />
                <span className="text-gray-700">VIP treatment for all clients</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-6 w-6 text-red-500 mr-3 mt-1" />
                <span className="text-gray-700">Convenient locations worldwide</span>
              </li>
            </ul>
          </div>
          <div className="rounded-xl overflow-hidden shadow-xl">
            <img 
              src="/contact/supercar-bg.jpg" 
              alt="Luxury car showroom"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our passionate team of automotive experts is dedicated to delivering exceptional service 
            and creating memorable experiences with every rental.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow group">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:border-yellow-400 transition-colors">
                <img 
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
              <p className="text-blue-600 mb-3">{member.role}</p>
              <p className="text-gray-600">{member.bio}</p>
            </Card>
          ))}
        </div>
      </section>

      <CustomFooter />
    </div>
  );
}
