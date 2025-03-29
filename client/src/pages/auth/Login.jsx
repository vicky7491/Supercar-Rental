import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false); // Checkbox state
  const navigate = useNavigate();

  const loginUser = async () => {
    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }
    if (!isChecked) {
      alert("You must agree to the terms and conditions.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/users/login", {
        email,
        password,
      });
      
      navigate("/dashboard"); // Redirect after login
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
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

        {/* Checkbox for Terms & Conditions */}
        {/* <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="terms"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          />
          <label htmlFor="terms" className="text-sm text-gray-700">
            I agree to the terms and conditions
          </label>
        </div> */}

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
