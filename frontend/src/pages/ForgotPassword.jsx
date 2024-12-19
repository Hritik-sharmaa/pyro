import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/authStore";
import "../styles/Common.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const forgotPassword = useAuthStore((state) => state.forgotPassword);

  const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
  
    try {
        const data = await forgotPassword(email);
      if (data?.success) {
        toast.success("Password reset link sent to your email.");
      } else {
        toast.error(data.error || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error submitting forgot password form:", error);
      toast.error("Error sending reset link.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-950 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-white/60 backdrop-blur-lg shadow-lg rounded-lg p-8 w-full max-w-sm text-gray-900">
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
        <div className="mb-4">
          <label className="block font-medium mb-2">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-pink-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition duration-200">
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
