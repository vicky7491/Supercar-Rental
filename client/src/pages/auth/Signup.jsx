import { useState } from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/signup", { name, email, password });
      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-lg rounded-lg w-96 space-y-4">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        <Input label="Full Name" type="text" placeholder="Enter full name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input label="Email" type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input label="Password" type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button onClick={handleSignup} className="w-full">
          Sign Up
        </Button>
        <p className="text-sm text-center">
          Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
