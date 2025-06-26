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
    <div className="flex-col items-center justify-center m-3">
      <Logo />
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
        <div className="flex flex-row items-center justify-center gap-3 p-2 mx-auto mt-5 mb-4 border-l-4 border-orange-500 shadow-md w-fit bg-orange-50 rounded-2xl">
          <p className="font-semibold tracking-wide text-orange-800 uppercase text-md">
            {selectStudent.length === 0 && "🎓 Lütfen bir öğrenci seçiniz..."}

            {selectStudent.length > 0 && `${selectStudent[0]?.name}`}
          </p>
          <div className="flex items-center justify-center pt-1">
            <div className="relative group">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => {
                  e.preventDefault();
                  handlePickStudent();
                }}
                className="flex items-center justify-center w-8 h-8 text-white transition bg-green-500 rounded-lg hover:bg-green-600 focus:ring-2 focus:ring-green-300"
              >
                <ZoomIn />
              </motion.button>
            </div>
          </div>
        </div>
      )}

      <MainNav />
    </div>
  );
}

export default Sidebar;
