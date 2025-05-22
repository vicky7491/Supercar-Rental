// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Button } from "../../components/ui/button";
// import { Card } from "../../components/ui/card";
// import { Input } from "../../components/ui/input";
// import { Textarea } from "../../components/ui/textarea";
// import { Label } from "../../components/ui/label";
// import { CustomFooter } from "../../components/ui/footer";

// import Header from '../../pages/home-view/Header';

// import { 
//   Phone, 
//   Mail, 
//   MapPin, 
//   MessageCircle, 
//   ChevronRight 
// } from 'lucide-react';

// // Animation Variants
// const fadeInUp = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
// };

// const staggerContainer = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.2,
//     },
//   },
// };

// export default function Contact() {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     request: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const contactMethods = [
//     {
//       icon: Phone,
//       title: "24/7 VIP Concierge",
//       description: "Immediate assistance for elite clients",
//       details: "+1 (888) LUX-RENT",
//       action: "Call Now"
//     },
//     {
//       icon: Mail,
//       title: "Executive Support",
//       description: "For corporate & high-net-worth inquiries",
//       details: "concierge@supercarrental.com",
//       action: "Email Us"
//     },
//     {
//       icon: MapPin,
//       title: "Global Headquarters",
//       description: "Visit our flagship showroom",
//       details: "1 Premium Drive, Beverly Hills, CA 90210",
//       action: "Get Directions"
//     },
//   ];

//   const globalOffices = [
//     { city: "Dubai", phone: "+971 4 LUXURY", image: "/locations/dubai.jpg" },
//     { city: "Monaco", phone: "+377 9 8888 8888", image: "/locations/monaco.jpg" },
//     { city: "Miami", phone: "+1 (305) ELITE-CAR", image: "/locations/miami.jpg" },
//     { city: "Tokyo", phone: "+81 3 8888 8888", image: "/locations/tokyo.jpg" },
//   ];

//   return (
//     <div className="min-h-screen flex flex-col bg-white">
//       <Header />
      
//       {/* Hero Section */}
//       <motion.div 
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 1 }}
//         className="relative h-[600px] bg-black overflow-hidden"
//       >
//         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10"></div>
//         <div 
//           className="absolute inset-0 bg-cover bg-center opacity-70"
//           style={{ backgroundImage: "url('/contact/supercar-bg.jpg')" }}
//         ></div>

//         <div className="container mx-auto px-4 h-full flex items-end pb-20 relative z-20">
//           <motion.div
//             initial="hidden"
//             animate="visible"
//             variants={staggerContainer}
//             className="max-w-4xl"
//           >
//             <motion.h1 variants={fadeInUp} className="text-6xl font-bold text-white mb-6 leading-tight">
//               <span className="block">World-Class</span>
//               <span className="block bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
//                 Supercar Concierge
//               </span>
//             </motion.h1>
//             <motion.p variants={fadeInUp} className="text-xl text-gray-300 mb-8">
//               Connect with our elite team for bespoke supercar rentals, exclusive memberships, and global VIP services.
//             </motion.p>
//             <motion.div variants={fadeInUp}>
//               <Button 
//                 size="lg" 
//                 className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 px-8 py-6 text-lg"
//               >
//                 Request a Callback <ChevronRight className="ml-2" />
//               </Button>
//             </motion.div>
//           </motion.div>
//         </div>
//       </motion.div>

//       {/* Contact Methods */}
//       <motion.section 
//         initial="hidden"
//         whileInView="visible"
//         variants={staggerContainer}
//         viewport={{ once: true }}
//         className="container mx-auto px-4 py-20 -mt-20 relative z-30"
//       >
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {contactMethods.map((method, index) => (
//             <motion.div key={index} variants={fadeInUp}>
//               <Card className="p-8 bg-white/90 backdrop-blur-sm border-gray-200 hover:shadow-xl transition-all hover:-translate-y-2">
//                 <div className="flex items-center mb-6">
//                   <div className="p-3 rounded-full bg-blue-100 mr-4">
//                     <method.icon className="h-6 w-6 text-blue-600" />
//                   </div>
//                   <h3 className="text-xl font-semibold">{method.title}</h3>
//                 </div>
//                 <p className="text-gray-600 mb-4">{method.description}</p>
//                 <p className="font-medium mb-6 text-gray-900">{method.details}</p>
//                 <Button variant="outline" className="w-full border-gray-300 hover:bg-gray-50">
//                   {method.action}
//                 </Button>
//               </Card>
//             </motion.div>
//           ))}
//         </div>
//       </motion.section>

//       {/* Global Offices */}
//       <motion.section 
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         transition={{ duration: 1 }}
//         viewport={{ once: true }}
//         className="bg-gray-50 py-20"
//       >
//         <div className="container mx-auto px-4">
//           <motion.div
//             initial="hidden"
//             whileInView="visible"
//             variants={staggerContainer}
//             viewport={{ once: true }}
//             className="text-center mb-16"
//           >
//             <motion.h2 variants={fadeInUp} className="text-4xl font-bold mb-4">Our Global Presence</motion.h2>
//             <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Serving elite clients in the world's most exclusive destinations.
//             </motion.p>
//           </motion.div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {globalOffices.map((office, index) => (
//               <motion.div 
//                 key={index}
//                 variants={fadeInUp}
//                 whileHover={{ y: -10 }}
//                 className="group"
//               >
//                 <Card className="overflow-hidden border-0 shadow-sm group-hover:shadow-lg transition-all">
//                   <div 
//                     className="h-48 relative overflow-hidden bg-cover bg-center"
//                     // style={{ backgroundImage: url(${office.image}) }}
//                   >
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
//                     <div className="absolute bottom-4 left-4 text-white">
//                       <h3 className="text-2xl font-bold">{office.city}</h3>
//                       <p className="text-blue-300">{office.phone}</p>
//                     </div>
//                   </div>
//                 </Card>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </motion.section>

//       {/* VIP Contact Form */}
//       <motion.section 
//         initial={{ opacity: 0, y: 50 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         viewport={{ once: true }}
//         className="container mx-auto px-4 py-20"
//       >
//         <div className="max-w-4xl mx-auto bg-gradient-to-br from-gray-900 to-blue-900 rounded-2xl p-0.5">
//           <div className="bg-white rounded-2xl p-12">
//             <h2 className="text-3xl font-bold mb-2">VIP Inquiry Form</h2>
//             <p className="text-gray-600 mb-8">Complete this form for priority assistance</p>
            
//             <form className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <motion.div whileHover={{ scale: 1.02 }}>
//                   <Label htmlFor="firstName" className="block mb-2">First Name *</Label>
//                   <Input 
//                     id="firstName" 
//                     name="firstName"
//                     value={formData.firstName}
//                     onChange={handleChange}
//                     className="bg-gray-50 border-gray-300" 
//                   />
//                 </motion.div>
//                 <motion.div whileHover={{ scale: 1.02 }}>
//                   <Label htmlFor="lastName" className="block mb-2">Last Name *</Label>
//                   <Input 
//                     id="lastName" 
//                     name="lastName"
//                     value={formData.lastName}
//                     onChange={handleChange}
//                     className="bg-gray-50 border-gray-300" 
//                   />
//                 </motion.div>
//               </div>
              
//               <motion.div whileHover={{ scale: 1.02 }}>
//                 <Label htmlFor="email" className="block mb-2">Email *</Label>
//                 <Input 
//                   id="email" 
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="bg-gray-50 border-gray-300" 
//                 />
//               </motion.div>
              
//               <motion.div whileHover={{ scale: 1.02 }}>
//                 <Label htmlFor="phone" className="block mb-2">Phone *</Label>
//                 <Input 
//                   id="phone" 
//                   type="tel"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   className="bg-gray-50 border-gray-300" 
//                 />
//               </motion.div>
              
//               <motion.div whileHover={{ scale: 1.02 }}>
//                 <Label htmlFor="request" className="block mb-2">Special Request</Label>
//                 <Textarea 
//                   id="request" 
//                   rows={4}
//                   name="request"
//                   value={formData.request}
//                   onChange={handleChange}
//                   className="bg-gray-50 border-gray-300" 
//                 />
//               </motion.div>
              
//               <motion.div 
//                 whileHover={{ scale: 1.01 }}
//                 whileTap={{ scale: 0.99 }}
//               >
//                 <Button 
//                   type="submit" 
//                   className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 py-6 text-lg"
//                 >
//                   Submit VIP Request
//                 </Button>
//               </motion.div>
//             </form>
//           </div>
//         </div>
//       </motion.section>

//       {/* Floating Chat Button */}
//       <motion.div 
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         transition={{ delay: 0.3 }}
//         viewport={{ once: true }}
//         className="fixed bottom-8 right-8 z-50"
//       >
//         <motion.div
//           animate={{ 
//             y: [0, -10, 0],
//             boxShadow: ["0 4px 14px rgba(0, 0, 0, 0.1)", "0 8px 24px rgba(234, 179, 8, 0.3)", "0 4px 14px rgba(0, 0, 0, 0.1)"]
//           }}
//           transition={{ 
//             repeat: Infinity, 
//             duration: 2,
//             ease: "easeInOut"
//           }}
//           className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full p-4 shadow-xl cursor-pointer"
//         >
//           <MessageCircle className="h-8 w-8" />
//         </motion.div>
//       </motion.div>

//       <CustomFooter />
//     </div>
//   );
// }