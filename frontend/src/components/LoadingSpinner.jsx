import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-orange-200 via-green-200 to-blue-200 perspective">
      {/* Simple Loading Spinner */}

      <div className="absolute inset-0 bg-[url('/mert_aslan_logo.png')] bg-center bg-no-repeat bg-contain" />

      <motion.div
        className="w-16 h-16 border-4 border-t-4 border-green-200 rounded-full border-t-green-500"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export default LoadingSpinner;
