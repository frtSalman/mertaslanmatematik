import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../slices/timeTableHomeworkSlice";
import { motion, AnimatePresence } from "framer-motion";

const modalSizes = {
  normal: "w-full max-w-2xl bg-teal-50 text-teal-800",
  updateHomework: "w-full max-w-3xl bg-white",
  schedule: "w-full max-w-md bg-white",
  studentList: "w-full max-w-3xl bg-white",
  sort: "w-full max-w-[400px] bg-white",
};

export default function Modal({ children, type = "normal" }) {
  const dispatch = useDispatch();

  function handleClose() {
    dispatch(closeModal());
  }

  // Framer Motion variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.75, y: -50 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.75, y: 50 },
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className={`${modalSizes[type]}  rounded-2xl shadow-2xl overflow-visible m-4 relative z-20`}
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-2 border-b dark:border-gray-700">
            <button
              onClick={handleClose}
              className="p-2 text-gray-500 transition-colors rounded-full hover:text-red-500 hover:bg-red-100 focus:outline-none"
              aria-label="Close modal"
            >
              <IoMdClose size={20} />
            </button>
          </div>

          {/* Body */}
          <div>{children}</div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
