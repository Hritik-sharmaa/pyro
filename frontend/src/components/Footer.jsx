import React from "react";
import { FaGithub, FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
import "../styles/Common.css"; // You can add custom styles here if needed.

const Footer = () => {
  return (
    <div className="bg-[#0f1115] text-white py-16">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <h1 className="text-4xl font-bold text-[#FF4438] mb-4">Pyro</h1>
        <p className="text-center text-lg mb-6">
          Created and maintained by Adarsh and Hritik
        </p>
        <div className="flex gap-6 mb-6">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <FaGithub size={30} className="text-white hover:text-[#FF4438] transition-all duration-300" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={30} className="text-white hover:text-[#FF4438] transition-all duration-300" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook size={30} className="text-white hover:text-[#FF4438] transition-all duration-300" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter size={30} className="text-white hover:text-[#FF4438] transition-all duration-300" />
          </a>
        </div>
        <p className="text-center text-sm text-gray-400">
          © 2025 Pyro. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
