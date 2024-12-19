import React, { forwardRef } from "react";

const InputOTPSlot = forwardRef(({ value = "", onChange, onKeyDown }, ref) => {
  return (
    <input
      type="text"
      maxLength={1}
      ref={ref}
      value={value} // Ensure it displays the value from props
      onChange={(e) => {
        onChange(e.target.value.slice(0, 1)); // Pass the first character only
      }}
      onKeyDown={onKeyDown} // Handle Backspace
      className="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
});

export default InputOTPSlot;
