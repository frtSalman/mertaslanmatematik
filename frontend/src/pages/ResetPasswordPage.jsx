import { useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import Input from "../components/Input";
import { Lock, XCircle } from "lucide-react";
import toast from "react-hot-toast";
import AnimatedBackground from "../components/AnimatedBackground";
import useResetPassword from "../hooks/useResetPassword";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const {
    mutate: resetPassword,
    isPending: isLoading,
    error,
  } = useResetPassword();

  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      console.log(token);
      resetPassword({ token, password });
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Error resetting password");
    }
  };

  return (
    <AnimatedBackground>
      <div className="p-8">
        <h2 className="mb-6 text-3xl font-bold text-center text-transparent bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text">
          Parolanı Güncelle
        </h2>
        {error && (
          <div className="flex items-center p-3 mb-6 border border-red-200 rounded-lg bg-red-50">
            <XCircle className="w-5 h-5 mr-2 text-red-500" />
            <span className="font-medium text-red-700">{error.message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <Input
            icon={Lock}
            type="password"
            placeholder="Yeni Parola"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Input
            icon={Lock}
            type="password"
            placeholder="Parolanı Tekrar Gir"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-4 py-3 font-bold text-white transition duration-200 rounded-lg shadow-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Güncelleniyor..." : "Güncelle"}
          </motion.button>
        </form>
      </div>
    </AnimatedBackground>
  );
};
export default ResetPasswordPage;
