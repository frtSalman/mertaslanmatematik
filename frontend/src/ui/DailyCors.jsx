import { FaMagnifyingGlass } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import {
  openModal,
  openShowSchedule,
  setScheduleData,
} from "../slices/timeTableHomeworkSlice.js";
import ProgramStatusBadge from "./ProgramStatusBadge.jsx";
import { differenceInCalendarDays } from "date-fns";

const periodStyles = {
  sabah: {
    container: "bg-yellow-50 border-yellow-200 text-yellow-800",
    viewBtn: "bg-yellow-200 text-yellow-800 hover:bg-yellow-400",
    ıcon: "/sunrise.svg",
  },
  ogle: {
    container: "bg-teal-50  border-teal-200  text-teal-800",
    viewBtn: "bg-teal-100  text-teal-800  hover:bg-teal-200",
    ıcon: "/sun.svg",
  },
  aksam: {
    container: "bg-blue-50  border-blue-200  text-blue-800",
    viewBtn: "bg-blue-100  text-blue-800  hover:bg-blue-200",
    ıcon: "/night.svg",
  },
};

function DailyCors({ data }) {
  const dispatch = useDispatch();

  function handleOpenModal() {
    dispatch(openModal());
    dispatch(openShowSchedule());
    dispatch(setScheduleData(data));
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
  };

  // Button tap variants
  const btnTap = { scale: 0.95 };

  const styles = periodStyles[data.period] || periodStyles.ogle;

  const now = new Date();
  const deadline = new Date(data.deadline);

  const daysLeft = differenceInCalendarDays(deadline, now);

  return (
    <AnimatePresence>
      {/* Wrap each card in motion.div */}
      <motion.div
        key={data.id}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.3 }}
        className={`
          flex flex-col justify-between
          w-full max-w-sm p-5 mb-2
          border shadow-lg rounded-2xl
          ${styles.container}
        `}
      >
        {/* Program Title */}
        <div className="flex flex-row items-start justify-between">
          <h3
            className={`mb-2 text-lg font-semibold ${styles.container.replace(
              /bg-[^ ]+|border-[^ ]+/g,
              "text-$&"
            )}`}
          >
            {data.title}
          </h3>
          <img className="w-6 h-auto" src={styles.ıcon} alt="icon" />
        </div>

        <div className="flex justify-start w-full mb-3">
          <ProgramStatusBadge
            program_deadline={deadline}
            homeworkStatus={data.hStatus}
          />
        </div>

        {/* Action Buttons */}

        <div className="flex justify-end space-x-3">
          {daysLeft >= 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={btnTap}
              onClick={handleOpenModal}
              className={`
              p-2 rounded-lg transition-colors
              ${styles.viewBtn}
            `}
              title="Detayları Gör"
            >
              <FaMagnifyingGlass className="w-5 h-5" />
            </motion.button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default DailyCors;
