import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginUser = async () => {
    if (!email || !password) {
      toast.error("Please fill in all fields.", {
        position: "top-center",
        duration: 2000,
      });
      return;
    }
   
    try {
      const response = await axios.post("http://localhost:3000/users/login", {
        email,
        password,
      }, 
      { withCredentials: true });
      
      toast.success("Login successful!", {
        position: "top-center",
        duration: 2000,
      });
      navigate("/home");
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Login failed", {
        position: "top-center",
        duration: 3000,
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="p-6 bg-white shadow-lg rounded-lg w-96 space-y-4">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        
        <Input
          label="Email"
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button onClick={loginUser} className="w-full">
          Login
        </Button>

        <p className="text-sm text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;