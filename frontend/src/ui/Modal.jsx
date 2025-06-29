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

export default function Modal({ children, type = "normal", manualOff = null }) {
  const dispatch = useDispatch();

  function handleClose() {
    dispatch(closeModal());
    manualOff();
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
        className="fixed inset-0 z-50 flex items-center justify-center px-2 py-6 overflow-y-auto bg-black/40 sm:px-4"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        transition={{ duration: 0.2 }}
        role="dialog"
        aria-modal="true"
        aria-label="Modal Window"
      >
        <motion.div
          className={`
        ${modalSizes[type]} 
         max-w-screen-sm  
        rounded-2xl shadow-2xl relative z-20
        flex flex-col
      `}
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <span className="text-base font-semibold text-gray-800 dark:text-white">
              {/* Optional Title: You can pass it as prop if needed */}
            </span>
            <button
              onClick={handleClose}
              className="p-2 text-gray-500 rounded-full hover:text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-300"
              aria-label="Kapat"
            >
              <IoMdClose size={22} />
            </button>
          </div>

          {/* Body */}
          <div className=" overflow-y-auto max-h-[80vh]">{children}</div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
