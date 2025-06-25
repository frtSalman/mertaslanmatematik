import { motion } from "framer-motion";
import Input from "../components/Input";
import { Loader, Lock, Mail, User, XCircle } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import AnimatedBackground from "../components/AnimatedBackground";
import useStudentSignup from "../hooks/useStudentSignup";

const SignUpPage = () => {
  const { token } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [grade, setGrade] = useState("");

  const {
    mutate: studentSignup,
    isPending: isLoading,
    error,
  } = useStudentSignup();

  const handleSignUp = async (e) => {
    e.preventDefault();
    studentSignup({ email, password, name, grade, token });
  };

  return (
    <AnimatedBackground>
      <div className="p-8">
        <h2 className="mb-6 text-3xl font-bold text-center text-transparent bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text">
          Öğrenci Hesabı Oluştur
        </h2>

        <form onSubmit={handleSignUp}>
          <Input
            icon={User}
            type="text"
            placeholder="İsim Soyisim"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            icon={User}
            type="text"
            placeholder="Sınıf"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          />
          <Input
            icon={Mail}
            type="email"
            placeholder="Email Adresi"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            icon={Lock}
            type="password"
            placeholder="Parola"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <div className="flex items-center p-3 mb-6 border border-red-200 rounded-lg bg-red-50">
              <XCircle className="w-5 h-5 mr-2 text-red-500" />
              <span className="font-medium text-red-700">{error.message}</span>
            </div>
          )}
          <PasswordStrengthMeter password={password} />

          <motion.button
            className="w-full px-4 py-3 mt-5 font-bold text-white transition duration-200 rounded-lg shadow-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className="mx-auto animate-spin" size={24} />
            ) : (
              "Kayıt ol"
            )}
          </motion.button>
        </form>
      </div>
      <div className="flex justify-center px-8 py-4 bg-gray-400 bg-opacity-40">
        <p className="text-sm font-semibold text-gray-600">
          Zaten bir hesabın var mı?{" "}
          <Link to={"/login"} className="text-green-600 hover:underline">
            Giriş yap
          </Link>
        </p>
      </div>
    </AnimatedBackground>
  );
};
export default SignUpPage;
