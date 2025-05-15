import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Register";
import Home from "../pages/home-view/Home";
// import CarDetailPage from "../pages/home-view/CarDetailPage";
import NotFound from "../pages/not-found/NotFound";
import BookingPage from "../pages/home-view/Bookingpage";
import BookingConfirmation from "../pages/home-view/BokingConfirmation";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/bookings/:carId" element={<BookingPage />} />
      <Route path="/booking-confirmation" element={<BookingConfirmation />} />
      {/* <Route path="/cars/:id" element={<CarDetailPage />} /> */}
      <Route path="/not-found" element={<NotFound />} />
       
     
    </Routes>
  );
};

export default AppRoutes;
