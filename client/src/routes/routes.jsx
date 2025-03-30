import { Routes, Route } from "react-router-dom";
import Login from "@/pages/auth/Login";
import Signup from "../pages/auth/Register";
import Home from "../pages/home-view/Home";




const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
     
    </Routes>
  );
};

export default AppRoutes;
