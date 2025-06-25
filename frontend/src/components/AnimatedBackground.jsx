import { motion, useMotionValue, useTransform } from "framer-motion";

const AnimatedBackground = ({ children }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [0, window.innerHeight], [10, -10]);
  const rotateY = useTransform(mouseX, [0, window.innerWidth], [-25, 25]);

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    const { left, top } = event.currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <div
      className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-orange-200 via-green-200 to-blue-200 perspective"
      onMouseMove={handleMouseMove}
    >
      {/* Animated Background Image */}
      <motion.div
        style={{
          rotateX,
          rotateY,
        }}
        className="absolute inset-0 z-0 transition-all duration-200 opacity-75 preserve-3d"
      >
        <div className="absolute inset-0 bg-[url('/mert_aslan_logo.png')] bg-center bg-no-repeat bg-contain mix-blend-soft-light" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md overflow-hidden bg-gray-800 shadow-xl bg-opacity-10 backdrop-filter backdrop-blur-xl rounded-2xl"
      >
        {children}
      </motion.div>
    </div>
  );
};
export default AnimatedBackground;
