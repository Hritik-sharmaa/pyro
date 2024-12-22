import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/authStore";
import "../styles/Common.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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

    setIsLoading(true);

    try {
      const data = await forgotPassword(email);
      if (data.message) {
        toast.success(data.message);
      } else if (data.error) {
        toast.error(data.error || "Something went wrong.");
      } else {
        toast.error("Something went wrong.");
      }
    } catch (error) {
      console.error("Error submitting forgot password form:", error);
      toast.error("Error sending reset link.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg text-white font-mono">
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
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white py-2 px-4 rounded-full hover:bg-zinc-950 transition duration-200"
          disabled={isLoading}>
          {isLoading ? "Loading..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
