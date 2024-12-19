import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useAuthStore } from "../store/authStore";
import "../styles/Common.css";

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { register, isLoading, error, user } = useAuthStore();
  console.log(user);

  const registerUser = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password } = data;
    await register(firstName, lastName, email, password);
    navigate("/verify-email"); //redirect to verify email page

      //adding toast to showcase error getting error from authController file
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({ firstName: "", lastName: "", email: "", password: "" });
        toast.success("Registration successfull, Please Login!");
      }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 bg">
      <form
        onSubmit={registerUser}
        className="w-full max-w-md bg-white border border-white/60 backdrop-blur-lg shadow-lg rounded-lg p-8 text-gray-900">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create an Account
        </h2>
        <div className="flex space-x-4 mb-4 text-gray-900">
          <div className="w-1/2">
            <label className="block font-medium mb-2">First name</label>
            <input
              type="text"
              placeholder="Please enter first name"
              value={data.firstName}
              className="w-full border bg-transparent border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-[12px]"
              onChange={(e) => setData({ ...data, firstName: e.target.value })}
            />
          </div>
          <div className="w-1/2">
            <label className="block font-medium mb-2">Last name</label>
            <input
              type="text"
              placeholder="Please enter last name"
              value={data.lastName}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-blue-500  text-gray-900 placeholder:text-[12px]"
              onChange={(e) => setData({ ...data, lastName: e.target.value })}
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Email</label>
          <input
            type="email"
            placeholder="Please enter email"
            value={data.email}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900 placeholder:text-[13px]"
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </div>
        <div className="mb-6">
          <label className="block font-medium mb-2">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Please enter password"
            value={data.password}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-sm text-gray-900 placeholder:text-[13px]"
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <button
            type="button"
            className="absolute top-[67%] right-12 transform -translate-y-1/2 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
          </button>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Create an account"}
        </button>
        <p className="text-center mt-5 text-gray-500">
          Already have account then{" "}
          <Link to="/login" className="underline text-blue-400">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
