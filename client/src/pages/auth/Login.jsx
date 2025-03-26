import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import router from "../../server/routes/authRoutes";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-lg rounded-lg w-96 space-y-4">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <Input label="Email" type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input label="Password" type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button text="Login" onClick={loginUser} className="w-full"> Login </Button>
        <p className="text-sm text-center">
          Don't have an account? <Link to="/signup" className="text-blue-500">Sign Up</Link>
        </p>
      </div>
    </div>
  );


export default Login;
