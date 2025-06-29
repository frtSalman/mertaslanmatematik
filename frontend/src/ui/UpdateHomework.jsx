import useUpdateHomework from "../hooks/useUpdateHomework.js";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import TimeSelect from "./TimeSelect.jsx";
import { motion } from "framer-motion";

function UpdateHomework({ data }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSchedule, setSelectedSchedule] = useState({
    sabah: [],
    ogle: [],
    aksam: [],
  });
  const [title, setTitle] = useState("");
  const [pageRanges, setPageRanges] = useState("");

  const { mutate: updateHomework, isPending } = useUpdateHomework();

  function handleSubmit(e) {
    e.preventDefault();

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

    if (timeSlots.length === 0) {
      Object.keys(data.program).forEach((day) => {
        data.program[`${day}`].forEach((program) => {
          programData[day] = [
            {
              title: title === "" ? program.title : title,
              pageRanges: pageRanges === "" ? program.pageRanges : pageRanges,
              period: program.period, // Store period with each entry
            },
          ];
        });
      });
    } else {
      timeSlots.forEach(({ day, period }) => {
        programData[day] = [
          {
            title: title === "" ? data.homeworkContent.title : title,
            pageRanges:
              pageRanges === "" ? data.homeworkContent.pageRanges : pageRanges,
            period, // Store period with each entry
          },
        ];
      });
    }

    const hContent = {
      title: title !== "" ? title : data.homeworkContent.title,
      pageRanges:
        pageRanges !== "" ? pageRanges : data.homeworkContent.pageRanges,
    };

    let dayNum = 0;
    let hPeriod;

    Object.keys(selectedSchedule).forEach((period) => {
      const periodArray = selectedSchedule[period] || [];
      dayNum += periodArray.length;
      if (periodArray.length !== 0) hPeriod = period;
    });

    console.log(data);

    const hData = {
      homeworkId: data.id,
      homeworkContent: hContent,
      period: timeSlots.length === 0 ? data.period : hPeriod,
      program: programData,
      homeworkDayNum: timeSlots.length === 0 ? data.homeworkDayNum : dayNum,
      homeworkDeadline: selectedDate || data.homeworkDeadline,
      homeworkStatus: false,
      homeworkFilePath: null,
      teacherId: data.teacherId,
    };

    if (
      hData.homeworkContent.title === null &&
      hData.homeworkContent.pageRanges === null
    ) {
      toast.error("Lütfen ödev içeriğini giriniz");
      return;
    }

    updateHomework(hData);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative grid grid-cols-1 gap-4 p-4 bg-white border rounded-t-none md:grid-cols-3 rounded-b-2xl"
    >
      {/* 1. Satır: Başlık */}
      <div className="md:col-span-3">
        <input
          type="text"
          placeholder="Ödev Konusu..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg"
        />
      </div>

      {/* 2. Satır: Sayfa Aralığı */}
      <div className="md:col-span-3">
        <input
          type="text"
          placeholder="Sayfa aralığı..."
          value={pageRanges}
          onChange={(e) => setPageRanges(e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg"
        />
      </div>

      {/* 3. Satır: TimeSelect */}
      <div className="overflow-visible md:col-span-3">
        <TimeSelect
          selectedSchedule={selectedSchedule}
          setSelectedSchedule={setSelectedSchedule}
        />
      </div>

      {/* 4. Satır: DatePicker */}
      <div className="md:col-span-2">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          placeholderText="Teslim tarihi seçin..."
          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg"
          popperPlacement="bottom-start"
          popperModifiers={[
            {
              name: "preventOverflow",
              options: {
                rootBoundary: "viewport",
              },
            },
          ]}
        />
      </div>

      {/* 5. Satır: Güncelle Butonu */}
      <div className="flex items-center md:col-span-1">
        <motion.button
          disabled={isPending}
          className={`w-full p-2 rounded-lg text-white ${
            isPending
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-orange-400 hover:bg-orange-600"
          }`}
        >
          {isPending ? "Güncelleniyor..." : "Güncelle"}
        </motion.button>
      </div>
    </form>
  );
}

export default UpdateHomework;
