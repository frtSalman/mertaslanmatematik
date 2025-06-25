import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import QuestionForm from "./QuestionForm";
import HomeworkInfo from "./HomeworkInfo";
import { useQuery } from "@tanstack/react-query";
import { getStats } from "../services/apiStats";

const periodStyles = {
  sabah: {
    container: "bg-yellow-50 border-yellow-200 text-yellow-800",
    icon: "/sunrise.svg",
    badge: "bg-yellow-100 text-yellow-800",
  },
  ogle: {
    container: "bg-teal-50 border-teal-200 text-teal-800",
    icon: "/sun.svg",
    badge: "bg-teal-100 text-teal-800",
  },
  aksam: {
    container: "bg-blue-50 border-blue-200 text-blue-800",
    icon: "/night.svg",
    badge: "bg-blue-100 text-blue-800",
  },
};

export default function ShowSchedule() {
  const { scheduleData } = useSelector((state) => state.timeTableHomework);
  const styles = periodStyles[scheduleData.period] || periodStyles.ogle;

  const {
    data: statsData,
    error,
    isPending: isGetting,
  } = useQuery({
    queryKey: ["stats", scheduleData?.hId, scheduleData?.user.id],
    queryFn: async () => {
      const res = await getStats(scheduleData?.user.id, scheduleData?.hId);
      return res;
    },
  });

  const stats = statsData?.stats.slice();
  const statOfDay = stats?.find((s) => s.day === scheduleData.day);

  const updateTime = `${new Date(statOfDay?.updatedAt).toLocaleDateString(
    "tr-TR"
  )} ${new Date(statOfDay?.updatedAt).toLocaleTimeString(["tr-TR"], {
    hour: "2-digit",
    minute: "2-digit",
  })}`;

  return (
    <div className="w-full">
      <div
        className={`p-6 shadow-lg border ${styles.container}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Günlük Ödev</h2>
          <img src={styles.icon} alt="period icon" className="w-6 h-6" />
        </div>

        {/* Info List */}
        <ul className="mb-6 space-y-3">
          <li className="flex justify-between">
            <span className="font-medium">Gün</span>
            <span>{scheduleData.day}</span>
          </li>
          <li className="flex justify-between">
            <span className="font-medium">Başlık</span>
            <span>{scheduleData.title}</span>
          </li>
          <li className="flex justify-between">
            <span className="font-medium">Açıklama</span>
            <span>{scheduleData.content}</span>
          </li>
          <li className="flex justify-between">
            <span className="font-medium">Son Teslim Tarihi</span>
            <span>{new Date(scheduleData?.deadline).toLocaleDateString()}</span>
          </li>
          <li className="flex justify-between">
            <span className="font-medium">Son Güncellenme Tarihi</span>
            <span>{statOfDay?.updatedAt ? updateTime : "Güncellenmedi."}</span>
          </li>
        </ul>

        {/* Question Form */}
        {scheduleData.user.role === "student" && (
          <QuestionForm scheduleData={scheduleData} statsData={statsData} />
        )}

        {scheduleData.user.role !== "student" && (
          <HomeworkInfo scheduleData={scheduleData} statsData={statsData} />
        )}
      </div>
    </div>
  );
}
