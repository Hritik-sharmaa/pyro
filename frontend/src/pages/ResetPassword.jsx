import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/authStore";
import { useParams } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import "../styles/Common.css";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);  // Separate state for confirm password visibility
  const { token } = useParams();

  const { resetPassword, message } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    toast.success("Password reset successful");
    await resetPassword(token, password);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-950 text-white bg">
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-white/60 backdrop-blur-lg shadow-lg rounded-lg p-8 w-full max-w-sm text-gray-900">
        <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
        <div className="mb-4">
          <label className="block font-medium mb-4">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-black mb-2"
            />
            <button
              type="button"
              className="absolute top-[47.5%] right-4 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>

          <label className="block font-medium mb-2">Confirm Password</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-black"
            />
            <button
              type="button"
              className="absolute top-[53%] right-4 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>
          {message && <p className="text-sm text-green-500">{message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-zinc-900 transition duration-200">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
