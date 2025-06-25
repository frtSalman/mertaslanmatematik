import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import AnimatedBackground from "../components/AnimatedBackground.jsx";
import useLogin from "../hooks/useLogin.js";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: login, isPending: isLoading, error } = useLogin();

  const handleLogin = async (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <AnimatedBackground>
      <div className="p-8">
        <h2 className="mb-6 text-4xl font-bold text-center text-transparent bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text">
          Hoş Geldiniz
        </h2>

        <form onSubmit={handleLogin}>
          <Input
            icon={Mail}
            type="email"
            placeholder="Email Adresiniz"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            icon={Lock}
            type="password"
            placeholder="Parolanız"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex items-center mb-6">
            <Link
              to="/forgot-password"
              className="text-sm font-semibold text-transparent bg-gradient-to-r from-orange-700 to-emerald-700 bg-clip-text hover:underline"
            >
              Parolamı unuttum?
            </Link>
          </div>
          {error && (
            <div className="flex items-center p-3 mb-6 border border-red-200 rounded-lg bg-red-50">
              <XCircle className="w-5 h-5 mr-2 text-red-500" />
              <span className="font-medium text-red-700">{error.message}</span>
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-4 py-3 font-bold text-white transition duration-200 rounded-lg shadow-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className="w-6 h-6 mx-auto animate-spin" />
            ) : (
              "Giriş"
            )}
          </motion.button>
        </form>
      </div>
      <div className="flex justify-center px-8 py-4 bg-gray-400 bg-opacity-40">
        <p className="text-sm font-semibold text-gray-600">
          Henüz bir hesabınız yok mu?{" "}
          <Link to="/signup" className="text-green-600 hover:underline">
            Kayıt ol
          </Link>
        </p>
      </div>
    </AnimatedBackground>
  );
};
export default LoginPage;
