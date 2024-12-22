import React, { useState, useRef  } from "react";
import InputOTP from "../components/InputOTP";
import InputOTPGroup from "../components/InputOTPGroup";
import InputOTPSlot from "../components/InputOTPSlot";
import { Button } from "../components/Button";
import { useAuthStore } from "../store/authStore"; 
import { toast } from "react-hot-toast"; 
import "../styles/Common.css"
import { useNavigate } from "react-router-dom";

const VerificationEmail = () => {
    const [value, setValue] = useState(Array(6).fill(""));
    const inputsRef = useRef([]);
  const { verifyEmail, isLoading, error, user } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const otpCode = value.join("");
    await verifyEmail(otpCode);
    if (!error && !isLoading) {
      toast.success("Your email has been verified successfully");
      navigate("/login");
    }
  };

  const handleChange = (index, char) => {
    if (isNaN(char)) return; 
    const newValue = [...value];
    newValue[index] = char;
    setValue(newValue);

    // Automatically move focus to the next input if the current one is filled
    if (char && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace") {
      const newValue = [...value];
      newValue[index] = ""; 

      setValue(newValue);

      if (index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg p-4 font-mono">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-4">Verify Email</h2>
        <p className="text-gray-600 text-center mb-6">
          Enter the 6-digit code sent to your email.
        </p>
        <InputOTP>
          <InputOTPGroup className="mx-auto">
          {value.map((digit, index) => (
              <InputOTPSlot
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                value={digit}
                onChange={(char) => handleChange(index, char)}
                onKeyDown={(e) => handleKeyDown(index, e)}
              />
            ))}
          </InputOTPGroup>
        </InputOTP>
        <div className="text-center text-sm mt-4">
          {value.join("").trim() === "" ? (
            <>Enter your verification email code.</>
          ) : (
            <>You entered: {value.join("")}</>
          )}
        </div>
        <div className="mt-6 text-center">
          <Button onClick={handleSubmit} className="w-full">
            {isLoading ? "Verifying..." : "Verify Email Now"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerificationEmail;
