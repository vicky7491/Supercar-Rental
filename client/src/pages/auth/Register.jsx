import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Signup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // Role state
  const [aadharCard, setAadharCard] = useState(""); // Aadhar for Seller
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!firstname || !lastname || !email || !password || !role) {
      toast.error("Please fill all fields.", {
        position: "top-center",
        duration: 2000,
      });
      return;
    }
    try {
      await axios.post("http://localhost:3000/users/register", {
        fullname: { firstname, lastname },
        email,
        password,
        role,
        ...(role === "seller" && { aadharCard }), // Include aadharCard only if role is seller
      }, 
      { withCredentials: true });
      toast.success("Signup successful! Please login.", {
        position: "top-center",
        duration: 5000,
      });
      navigate("/login");
    } catch (error) {
      console.log(error.response);
      toast.error(error.response?.data?.message || "Signup failed", {
        position: "top-center",
        duration: 3000,
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="p-6 bg-white shadow-lg rounded-lg w-96 space-y-4">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        <Input
          label="First Name"
          type="text"
          placeholder="Enter first name"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <Input
          label="Last Name"
          type="text"
          placeholder="Enter last name"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
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
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Register as
          </label>
          <RadioGroup
            value={role}
            onValueChange={setRole}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="renter" id="renter" />
              <label
                htmlFor="renter"
                className="text-sm font-medium text-gray-700"
              >
                Renter
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="seller" id="seller" />
              <label
                htmlFor="seller"
                className="text-sm font-medium text-gray-700"
              >
                Seller
              </label>
            </div>
          </RadioGroup>
        </div>
        {role === "seller" && (
          <Input
            label="Aadhar"
            type="text"
            placeholder="Enter aadharCard"
            value={aadharCard}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
              if (value.length <= 12) {
                setAadharCard(value);
              }
            }}
            maxLength={12}
          />
        )}
        {/* <div className="flex items-center space-x-2">
          <input type="checkbox" id="terms" required />
          <label htmlFor="terms" className="text-sm text-gray-700">
            I agree to the terms and conditions
          </label>
        </div> */}
        <Button onClick={handleSignup} className="w-full">
          Sign Up
        </Button>
        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
