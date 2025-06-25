import { FaMagnifyingGlassPlus } from "react-icons/fa6";
import { FaPlusCircle } from "react-icons/fa";
import { GiSandsOfTime } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";
import {
  openModal,
  openStudentList,
  setSelectStudentsForProgram,
} from "../slices/timeTableHomeworkSlice.js";
import StudentList from "./StudentList";
import useAddHomework from "../hooks/useAddHomework";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import TimeSelect from "./TimeSelect.jsx";
import useFetchStudents from "../hooks/useFetchStudents";

function AddHomework({ teacherId }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSchedule, setSelectedSchedule] = useState({
    sabah: [],
    ogle: [],
    aksam: [],
  });
  const [title, setTitle] = useState("");
  const [pageRanges, setPageRanges] = useState("");

  const { isModalOn, selectStudentsForProgram, isShowStudentList } =
    useSelector((state) => state.timeTableHomework);

  const { mutate: addHomework, isPending } = useAddHomework();

  const studentsData = useFetchStudents();

  const dispatch = useDispatch();

  function handleOpenModal() {
    dispatch(openModal());
    dispatch(openStudentList());
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (selectStudentsForProgram.length === 0) {
      toast.error("Lütfen en az bir öğrenci seçin");
      return;
    }

    const timeSlots = [
      ...selectedSchedule.sabah.map((day) => ({
        day,
        period: "sabah",
      })),
      ...selectedSchedule.ogle.map((day) => ({ day, period: "ogle" })),
      ...selectedSchedule.aksam.map((day) => ({
        day,
        period: "aksam",
      })),
    ];

    setSelectedSchedule({
      sabah: [],
      ogle: [],
      aksam: [],
    });

    const programData = {};

    // Update each day with period information
    timeSlots.forEach(({ day, period }) => {
      programData[day] = [
        {
          title,
          pageRanges,
          period, // Store period with each entry
        },
      ];
    });

    const hContent = {
      title,
      pageRanges,
    };

    let dayNum = 0;
    let hPeriod;

    Object.keys(selectedSchedule).forEach((period) => {
      const periodArray = selectedSchedule[period] || [];
      dayNum += periodArray.length;
      if (periodArray.length !== 0) hPeriod = period;
    });

    const hData = {
      homeworkContent: hContent,
      period: hPeriod,
      program: programData,
      homeworkDayNum: dayNum,
      homeworkDeadline: selectedDate,
      homeworkStatus: false,
      homeworkFilePath: null,
      studentId: selectStudentsForProgram,
      teacherId,
    };

    if (
      hData.homeworkContent.title === null &&
      hData.homeworkContent.pageRanges === null
    ) {
      toast.error("Lütfen ödev içeriğini giriniz");
      return;
    }

    addHomework(hData, {
      onSuccess: () => {
        dispatch(setSelectStudentsForProgram([]));
      },
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-[35px_1fr_auto_auto_35px] gap-3 p-3 bg-white rounded-2xl shadow-lg w-fit relative"
    >
      {isModalOn && isShowStudentList && (
        <Modal type="studentList">
          <StudentList
            rows={studentsData?.data}
            selectedRows={selectStudentsForProgram}
            onRowSelectionChange={(newSelection) => {
              dispatch(setSelectStudentsForProgram(newSelection));
            }}
          />
        </Modal>
      )}

      {/* Student Selector */}
      <div className="flex items-start justify-center pt-1">
        <div className="relative group">
          <button
            onClick={(e) => {
              e.preventDefault();
              handleOpenModal();
            }}
            className="flex items-center justify-center w-10 h-10 p-2 text-white transition bg-green-500 rounded-lg hover:bg-green-600 focus:ring-2 focus:ring-green-300"
          >
            <FaMagnifyingGlassPlus size={30} color="white" className="" />
          </button>
          <span className="absolute z-50 px-2 py-1 text-green-500 transition-opacity duration-200 bg-green-200 rounded opacity-0 pointer-events-none text-m top-full left-full whitespace-nowrap group-hover:opacity-100">
            Öğrenci seç.🕵️
          </span>
        </div>
      </div>

      {/* Homework Content */}
      <div className="flex flex-row items-center justify-center gap-3">
        <input
          type="text"
          id="title"
          placeholder="Ödev Konusu..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 transition border border-gray-200 rounded-lg shadow-sm bg-gray-50 focus:ring-2 focus:ring-gray-300"
        />
        <input
          type="text"
          id="pageRanges"
          placeholder="Sayfa aralığı..."
          value={pageRanges}
          onChange={(e) => setPageRanges(e.target.value)}
          className="w-full px-3 py-2 transition border border-gray-200 rounded-lg shadow-sm bg-gray-50 focus:ring-2 focus:ring-gray-300"
        />
        <TimeSelect
          selectedSchedule={selectedSchedule}
          setSelectedSchedule={setSelectedSchedule}
        />
      </div>

      {/* Document Upload */}
      {/* <div className="relative flex items-start justify-center pt-1 group">
        <div className="flex flex-col items-start">
          <input type="file" name="homeworkDoc" id="homeworkDoc" hidden />
          <label
            htmlFor="homeworkDoc"
            className="flex items-center justify-center w-10 h-10 p-1 transition bg-blue-100 rounded-lg cursor-pointer hover:bg-blue-200 "
          >
            <FaFileCirclePlus size={22} className="text-blue-600" />
          </label>
          <span className="absolute z-50 px-2 py-1 text-blue-600 transition-opacity duration-200 bg-blue-200 rounded opacity-0 pointer-events-none text-m top-full left-full whitespace-nowrap group-hover:opacity-100">
            Doküman ekle.📑
          </span>
        </div>
      </div> */}

      {/* Deadline */}
      <div className="relative flex flex-col group">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          className="w-[100px] px-3 py-2 transition bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholderText="Teslim tarihi seçin...⏳⏳"
        />
      </div>

      {/* Submit */}
      <div className="relative group">
        <button
          type="submit"
          className="flex items-center justify-center m-auto transition bg-orange-100 rounded-full w-15 h-15 hover:bg-orange-200"
        >
          {isPending ? (
            <GiSandsOfTime size={30} className="text-orange-500" />
          ) : (
            <FaPlusCircle size={30} className="text-orange-500" />
          )}
        </button>
        <span className="absolute z-50 px-2 py-1 text-orange-500 transition-opacity duration-200 bg-orange-200 rounded opacity-0 pointer-events-none text-m top-full left-full whitespace-nowrap group-hover:opacity-100">
          Ödev ekle.🚀
        </span>
      </div>
    </form>
  );
}

export default AddHomework;
