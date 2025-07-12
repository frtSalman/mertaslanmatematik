import { useState, useRef, useMemo } from "react";
import { useStudentChart } from "../hooks/useStudentChart";

const StudentPerformanceChart = ({ data }) => {
  const svgRef = useRef();
  const tooltipRef = useRef();
  const [selectedSubject, setSelectedSubject] = useState("");

  const subjects = useMemo(
    () => [...new Set(data?.stats.map((s) => s.subject))],
    [data]
  );

  const filtered = useMemo(
    () => data?.stats.filter((s) => s.subject === selectedSubject) || [],
    [data, selectedSubject]
  );

  const totals = useMemo(() => {
    const att = filtered.reduce((sum, d) => sum + +d.attempted, 0);
    const cor = filtered.reduce((sum, d) => sum + +d.correct, 0);
    return {
      totalAttempted: att,
      totalCorrect: cor,
      totalSuccess: att ? Math.round((cor / att) * 100) : 0,
    };
  }, [filtered]);

  useStudentChart(svgRef, tooltipRef, filtered);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="overflow-hidden bg-white shadow-xl rounded-2xl">
        {/* Kontroller */}
        <div className="p-6">
          <div className="flex flex-row flex-wrap items-center justify-between gap-2">
            <div className="mb-8">
              <div className="relative">
                <select
                  className="min-w-[250px] px-4 py-3 border border-gray-300 rounded-lg appearance-none bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                >
                  <option value="">Konu Seçin</option>
                  {subjects.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
                  <svg
                    className="w-4 h-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* İstatistik Kartları */}
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
                      {totals.totalAttempted}
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
                      {totals.totalCorrect}
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`rounded-xl p-6 border ${
                  totals.totalSuccess > 70
                    ? "bg-green-50 border-green-100"
                    : totals.totalSuccess > 50
                    ? "bg-yellow-50 border-yellow-100"
                    : "bg-red-50 border-red-100"
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`p-3 rounded-lg ${
                      totals.totalSuccess > 70
                        ? "bg-green-100"
                        : totals.totalSuccess > 50
                        ? "bg-yellow-100"
                        : "bg-red-100"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-6 w-6 ${
                        totals.totalSuccess > 70
                          ? "text-green-600"
                          : totals.totalSuccess > 50
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
                        totals.totalSuccess > 70
                          ? "text-green-600"
                          : totals.totalSuccess > 50
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {totals.totalSuccess}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Grafik Alanı */}
          <div className="p-4 overflow-x-auto border border-gray-200 bg-gray-50 rounded-xl">
            <div style={{ minWidth: "300px" }}>
              <svg ref={svgRef} className="w-full"></svg>
            </div>
          </div>
        </div>

        {/* Bilgi Kutusu */}
        <div className="px-6 py-4 border-t border-blue-100 bg-blue-50">
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-blue-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                <strong>İpucu:</strong> Çubukların üzerine gelerek detaylı bilgi
                görüntüleyebilirsiniz. Ders seçerek farklı analizler
                yapabilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tooltip */}
      <div
        ref={tooltipRef}
        className="fixed z-50 max-w-xs transition-opacity duration-200 opacity-0 pointer-events-none"
      ></div>
    </div>
  );
};

export default StudentPerformanceChart;
