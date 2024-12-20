import React from "react";

export const Button = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-black text-white py-2 px-4 rounded hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 transition duration-200 ${className}`}>
      {children}
    </button>
  );
};
