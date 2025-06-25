import { motion } from "framer-motion";
import { useState } from "react";
import Input from "../components/Input";
import { ArrowLeft, Loader, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedBackground from "../components/AnimatedBackground";
import useForgotPassword from "../hooks/useForgotPassword";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { isPending: isLoading, mutate: forgotPassword } = useForgotPassword();

  const handleSubmit = async (e) => {
    e.preventDefault();
    forgotPassword(email);
    setIsSubmitted(true);
  };

  return (
    <AnimatedBackground>
      <div className="p-8">
        <h2 className="mb-6 text-3xl font-bold text-center text-transparent bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text">
          Parolamı Unuttum
        </h2>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <p className="mb-6 text-center text-gray-600">
              E-posta adresinizi girin, şifrenizi sıfırlamanız için bir bağlantı
              gönderelim.
            </p>
            <Input
              icon={Mail}
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-4 py-3 font-bold text-white transition duration-200 rounded-lg shadow-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              type="submit"
            >
              {isLoading ? (
                <Loader className="mx-auto size-6 animate-spin" />
              ) : (
                "Send Reset Link"
              )}
            </motion.button>
          </form>
        ) : (
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-500 rounded-full"
            >
              <Mail className="w-8 h-8 text-white" />
            </motion.div>
            <p className="mb-6 text-gray-600">
              {email} için oluşturulmuş bir hesap varsa, kısa süre içinde bir
              şifre sıfırlama bağlantısı alacaksınız.
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-center px-8 py-4 bg-gray-400 bg-opacity-40">
        <Link
          to={"/login"}
          className="flex items-center text-sm font-semibold text-green-600 hover:underline"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Login
        </Link>
      </div>
    </AnimatedBackground>
  );
};
export default ForgotPasswordPage;
