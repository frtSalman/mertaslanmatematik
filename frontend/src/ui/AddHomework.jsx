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
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import tr from "date-fns/locale/tr";
import { useState } from "react";
import TimeSelect from "./TimeSelect.jsx";
import useFetchStudents from "../hooks/useFetchStudents";

registerLocale("tr", tr);

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
      className="flex flex-col w-full gap-4 px-3 py-4 mx-auto bg-white shadow-sm max-w-7xl rounded-xl md:flex-row md:items-center md:justify-between md:gap-3"
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

      {/* Öğrenci Seç */}
      <div className="flex-shrink-0">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            handleOpenModal();
          }}
          className="flex items-center justify-center w-10 h-10 text-white transition bg-green-500 rounded-full hover:bg-green-600"
          aria-label="Öğrenci Seç"
        >
          <FaMagnifyingGlassPlus size={20} />
        </button>
      </div>

      {/* Ödev Konusu */}
      <input
        type="text"
        id="title"
        placeholder="Konu"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-md min-w-32 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300"
      />

      {/* Sayfa Aralığı */}
      <input
        type="text"
        id="pageRanges"
        placeholder="Sayfalar"
        value={pageRanges}
        onChange={(e) => setPageRanges(e.target.value)}
        className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-md min-w-24 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300"
      />

      {/* Zaman Seçici */}
      <div className="flex-shrink-0">
        <TimeSelect
          selectedSchedule={selectedSchedule}
          setSelectedSchedule={setSelectedSchedule}
        />
      </div>

      {/* Tarih Seçici */}
      <div className="flex-shrink-0 w-[140px]">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          locale="tr"
          dateFormat="dd/MM/yyyy"
          className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg shadow-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          placeholderText="Teslim tarihi"
          calendarClassName="font-sans rounded-lg shadow-lg border border-gray-200"
          dayClassName={(date) =>
            date.getDate() === new Date().getDate() ? "!bg-blue-100" : undefined
          }
          renderCustomHeader={({ monthDate, decreaseMonth, increaseMonth }) => (
            <div className="flex items-center justify-between px-2 py-1">
              <button
                type="button"
                onClick={decreaseMonth}
                className="p-1 text-gray-500 rounded-full hover:bg-gray-100"
              >
                {"<"}
              </button>
              <span className="text-base font-semibold text-gray-700">
                {monthDate.toLocaleString("tr", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <button
                type="button"
                onClick={increaseMonth}
                className="p-1 text-gray-500 rounded-full hover:bg-gray-100"
              >
                {">"}
              </button>
            </div>
          )}
        />
      </div>

      {/* Submit */}
      <div className="flex-shrink-0">
        <button
          type="submit"
          className="flex items-center justify-center w-10 h-10 transition bg-orange-100 rounded-full hover:bg-orange-200"
          aria-label="Ödev Ekle"
        >
          {isPending ? (
            <GiSandsOfTime size={20} className="text-orange-500" />
          ) : (
            <FaPlusCircle size={20} className="text-orange-500" />
          )}
        </button>
      </div>
    </form>
  );
}

export default AddHomework;
