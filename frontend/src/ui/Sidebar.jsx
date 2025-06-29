import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Logo from "./Logo";
import MainNav from "./MainNav";
import { setSelectStudent } from "../slices/timeTableHomeworkSlice";
import { motion } from "framer-motion";
import { ZoomIn } from "lucide-react";
import Modal from "./Modal";
import StudentList from "./StudentList";
import useFetchStudents from "../hooks/useFetchStudents";

function Sidebar() {
  const [isModalOn, setIsModalOn] = useState(false);
  const studentsData = useFetchStudents();
  const { selectStudent } = useSelector((state) => state.timeTableHomework);

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function handlePickStudent() {
    setIsModalOn(true);
  }

  function handleOffModal() {
    setIsModalOn(false);
  }

  const students = studentsData?.data?.slice();

  return (
    <aside className="flex flex-col gap-3 md:gap-6 background-color-white rounded-2xl padding-4 sm:padding-6 min-height-screen max-width-full sm:max-width-xs">
      <div className="flex justify-center">
        <Logo className="width-32 sm:width-40" />
      </div>
      {isModalOn && (
        <Modal type="studentList" manualOff={handleOffModal}>
          <StudentList
            rows={students}
            onRowSelectionChange={(newSelection) => {
              dispatch(
                setSelectStudent(
                  students.filter((s) => newSelection.includes(s.id))
                )
              );
              setIsModalOn(false);
            }}
          />
        </Modal>
      )}

      {user?.role === "teacher" && (
        <div className="flex flex-row items-center justify-center gap-3 p-4 transition-all duration-300 ease-in-out background-color-orange-50 rounded-2xl">
          <p className="text-base font-semibold tracking-wide text-center text-color-orange-800 sm:text-large text-transform-uppercase">
            {selectStudent.length === 0 && "🎓 Öğrenci seçiniz."}

            {selectStudent.length > 0 && `${selectStudent[0]?.name}`}
          </p>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) => {
              e.preventDefault();
              handlePickStudent();
            }}
            className="flex items-center self-center justify-center rounded-full shadow-md height-10 width-10 background-color-green-500 text-color-white hover:background-color-green-600 focus:outline-none focus:ring-2 focus:ring-color-green-300"
          >
            <ZoomIn />
          </motion.button>
        </div>
      )}

      <div className="flex flex-col items-center justify-center grow">
        <MainNav />
      </div>
    </aside>
  );
}

export default Sidebar;
