import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { XCircle } from "lucide-react";
import toast from "react-hot-toast";
import AnimatedBackground from "../components/AnimatedBackground";
import useEmailVerify from "../hooks/useEmailVerify.js";

const EmailVerificationPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const { mutate: verifyEmail, isPending: isLoading, error } = useEmailVerify();

  const handleChange = (index, value) => {
    const newCode = [...code];

    // Handle pasted content
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);

      // Focus on the last non-empty input or the first empty one
      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);
      // Move focus to the next input field if value is entered
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");

    verifyEmail(
      { code: verificationCode },
      {
        onSuccess: () => toast.success("Email verified successfully"),
        onError: (err) => toast.error(err.message),
      }
    );
  };

  return (
    <AnimatedBackground>
      <div className="p-8">
        <h2 className="mb-6 text-3xl font-bold text-center text-transparent bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text">
          Verify Your Email
        </h2>
        <p className="mb-6 text-center text-gray-700">
          Enter the 6-digit code sent to your email address.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-2xl font-bold text-center text-white bg-gray-500 border-2 border-gray-700 rounded-lg opacity-50 focus:border-green-500 focus:outline-none"
              />
            ))}
          </div>
          {error && (
            <div className="flex items-center p-3 mb-6 border border-red-200 rounded-lg bg-red-50">
              <XCircle className="w-5 h-5 mr-2 text-red-500" />
              <span className="font-medium text-red-700">{error.message}</span>
            </div>
          )}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isLoading || code.some((digit) => !digit)}
            className="w-full px-4 py-3 font-bold text-white rounded-lg shadow-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50"
          >
            {isLoading ? "Verifying..." : "Verify Email"}
          </motion.button>
        </form>
      </div>
    </AnimatedBackground>
  );
};

export default EmailVerificationPage;
