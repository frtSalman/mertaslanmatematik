import { useQuery } from "@tanstack/react-query";
import { getStats } from "../services/apiStats";
import { useSelector } from "react-redux";
import StudentPerformanceChart from "../ui/StudentPerformanceChart";

function DashBoard() {
  const { selectStudent } = useSelector((state) => state.timeTableHomework);
  const { user } = useSelector((state) => state.auth);
  const studentId = user.role === "teacher" ? selectStudent[0]?.id : user.id;

  const {
    data: statsData,
    error,
    isPending: isGetting,
  } = useQuery({
    queryKey: ["stats", studentId],
    queryFn: async () => {
      const res = await getStats(studentId);
      return res;
    },
  });

  // Toplam istatistikleri hesapla
  const totalAttempted =
    statsData?.stats.reduce((sum, d) => sum + parseInt(d.attempted), 0) || 0;
  const totalCorrect =
    statsData?.stats.reduce((sum, d) => sum + parseInt(d.correct), 0) || 0;
  const totalSuccessRate =
    totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;

  return (
    <div className="max-w-6xl min-h-screen mx-auto">
      <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
        <div className="p-6 border border-blue-100 bg-blue-50 rounded-xl">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-blue-800">
                Çözülen Soru
              </h3>
              <p className="mt-1 text-2xl font-bold text-gray-900">
                {totalAttempted}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 border border-green-100 bg-green-50 rounded-xl">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-green-800">
                Doğru Cevap
              </h3>
              <p className="mt-1 text-2xl font-bold text-gray-900">
                {totalCorrect}
              </p>
            </div>
          </div>
        </div>

        <div
          className={`rounded-xl p-6 border ${
            totalSuccessRate > 70
              ? "bg-green-50 border-green-100"
              : totalSuccessRate > 50
              ? "bg-yellow-50 border-yellow-100"
              : "bg-red-50 border-red-100"
          }`}
        >
          <div className="flex items-center">
            <div
              className={`p-3 rounded-lg ${
                totalSuccessRate > 70
                  ? "bg-green-100"
                  : totalSuccessRate > 50
                  ? "bg-yellow-100"
                  : "bg-red-100"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 ${
                  totalSuccessRate > 70
                    ? "text-green-600"
                    : totalSuccessRate > 50
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19.3v-6.8m0 0l3 3m-3-3l-3 3m12-10v6.8m0 0l-3-3m3 3l3-3"
                />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-700">
                Başarı Oranı
              </h3>
              <p
                className={`text-2xl font-bold mt-1 ${
                  totalSuccessRate > 70
                    ? "text-green-600"
                    : totalSuccessRate > 50
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {totalSuccessRate}%
              </p>
            </div>
          </div>
        </div>
      </div>
      <main>
        <StudentPerformanceChart data={statsData} />
      </main>
    </div>
  );
}

export default DashBoard;
