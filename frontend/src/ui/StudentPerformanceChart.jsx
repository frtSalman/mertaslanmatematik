import { useState, useRef, useMemo } from "react";
import * as d3 from "d3";

const StudentPerformanceChart = ({ data }) => {
  const svgRef = useRef();
  const tooltipRef = useRef();
  const [selectedSubject, setSelectedSubject] = useState("");
  const [totalAttempted, setTotalAttempted] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [totalSuccessRate, setTotalSuccessRate] = useState(0);

  const subjects = [];

  data?.stats.forEach((d) => {
    if (!subjects.includes(d.subject)) subjects.push(d.subject);
  });

  const drawChart = (filteredData) => {
    // Eski SVG içeriğini temizle

    if (filteredData?.length === 0) {
      d3.select(svgRef.current)
        .append("text")
        .attr("x", "50%")
        .attr("y", "50%")
        .attr("text-anchor", "middle")
        .attr("font-size", "18px")
        .attr("fill", "#6b7280")
        .text("Bu ders için veri bulunamadı");
      return;
    }

    const margin = { top: 50, right: 50, bottom: 70, left: 60 };

    const containerWidth = svgRef.current.parentElement.offsetWidth;
    const width = Math.max(containerWidth, 300) - margin.left - margin.right;

    const height = 400 - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Veri yapısını hazırla
    const chartData = filteredData?.map((d) => ({
      date: d.createdAt.split(" ")[0],
      attempted: parseInt(d.attempted),
      correct: parseInt(d.correct),
      day: d.day,
      pages: d.pages,
    }));

    // Ölçekler
    const xScale = d3
      .scaleBand()
      .domain(chartData?.map((d) => d.date))
      .range([0, width])
      .padding(0.2);

    const maxValue = d3.max(chartData, (d) => Math.max(d.attempted, d.correct));
    const yScale = d3
      .scaleLinear()
      .domain([0, Math.max(maxValue + 5, 10)])
      .range([height, 0])
      .nice();

    // Eksenler
    const xAxis = d3.axisBottom(xScale).tickFormat((d) => {
      const date = new Date(d);
      return date.toLocaleDateString("tr-TR", {
        month: "short",
        day: "numeric",
      });
    });

    const yAxis = d3.axisLeft(yScale);

    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis)
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .attr("text-anchor", "end")
      .attr("dx", "-0.8em")
      .attr("dy", "0.15em");

    svg.append("g").attr("class", "y-axis").call(yAxis);

    // X ekseni etiketi
    svg
      .append("text")
      .attr(
        "transform",
        `translate(${width / 2}, ${height + margin.bottom - 10})`
      )
      .attr("text-anchor", "middle")
      .attr("fill", "#4b5563")
      .text("Tarih");

    // Y ekseni etiketi
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left + 15)
      .attr("x", -height / 2)
      .attr("text-anchor", "middle")
      .attr("fill", "#4b5563")
      .text("Soru Sayısı");

    // Tooltip oluşturma
    const tooltip = d3.select(tooltipRef.current);

    // Çubuklar
    const barWidth = xScale.bandwidth() / 2;

    // Tooltip konumunu ayarlayan yardımcı fonksiyon
    const updateTooltipPosition = (event) => {
      const tooltipWidth = tooltipRef.current.offsetWidth;
      const tooltipHeight = tooltipRef.current.offsetHeight;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      let left = event.pageX + 10;
      let top = event.pageY + 10;

      // Sağa taşmayı önle
      if (left + tooltipWidth > windowWidth) {
        left = event.pageX - tooltipWidth - 10;
      }

      // Alta taşmayı önle
      if (top + tooltipHeight > windowHeight) {
        top = event.pageY - tooltipHeight - 10;
      }

      tooltip.style("left", `${left}px`).style("top", `${top}px`);
    };

    // Çözülen sorular (attempted)
    svg
      .selectAll(".bar-attempted")
      .data(chartData)
      .enter()
      .append("rect")
      .attr("class", "bar-attempted")
      .attr("x", (d) => xScale(d.date))
      .attr("y", (d) => yScale(d.attempted))
      .attr("width", barWidth)
      .attr("height", (d) => height - yScale(d.attempted))
      .attr("fill", "#3b82f6")
      .attr("rx", 4)
      .attr("ry", 4)
      .on("mouseover", function (event, d) {
        tooltip.style("opacity", 1).html(
          `
            <div class="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
              <h3 class="font-bold text-lg text-gray-800">${new Date(
                d.date
              ).toLocaleDateString("tr-TR")}</h3>
              <div class="mt-2 space-y-1">
                <p class="flex justify-between"><span class="font-medium text-gray-700">Gün:</span> <span class="text-gray-900">${
                  d.day
                }</span></p>
                <p class="flex justify-between"><span class="font-medium text-gray-700">Sayfalar:</span> <span class="text-gray-900">${
                  d.pages
                }</span></p>
                <p class="flex justify-between"><span class="font-medium text-gray-700">Çözülen:</span> <span class="text-blue-600 font-medium">${
                  d.attempted
                } soru</span></p>
                <p class="flex justify-between"><span class="font-medium text-gray-700">Doğru:</span> <span class="text-green-600 font-medium">${
                  d.correct
                } soru</span></p>
                <p class="flex justify-between"><span class="font-medium text-gray-700">Başarı Oranı:</span> <span class="font-bold ${
                  d.attempted > 0 && d.correct / d.attempted > 0.7
                    ? "text-green-600"
                    : "text-red-600"
                }">${
            d.attempted > 0 ? Math.round((d.correct / d.attempted) * 100) : 0
          }%</span></p>
              </div>
            </div>
          `
        );

        updateTooltipPosition(event);
      })
      .on("mousemove", function (event) {
        updateTooltipPosition(event);
      })
      .on("mouseout", function () {
        tooltip.style("opacity", 0);
      });

    // Doğru cevaplar (correct)
    svg
      .selectAll(".bar-correct")
      .data(chartData)
      .enter()
      .append("rect")
      .attr("class", "bar-correct")
      .attr("x", (d) => xScale(d.date) + barWidth)
      .attr("y", (d) => yScale(d.correct))
      .attr("width", barWidth)
      .attr("height", (d) => height - yScale(d.correct))
      .attr("fill", "#10b981")
      .attr("rx", 4)
      .attr("ry", 4)
      .on("mouseover", function (event, d) {
        tooltip.style("opacity", 1).html(
          `
            <div class="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
              <h3 class="font-bold text-lg text-gray-800">${new Date(
                d.date
              ).toLocaleDateString("tr-TR")}</h3>
              <div class="mt-2 space-y-1">
                <p class="flex justify-between"><span class="font-medium text-gray-700">Gün:</span> <span class="text-gray-900">${
                  d.day
                }</span></p>
                <p class="flex justify-between"><span class="font-medium text-gray-700">Sayfalar:</span> <span class="text-gray-900">${
                  d.pages
                }</span></p>
                <p class="flex justify-between"><span class="font-medium text-gray-700">Çözülen:</span> <span class="text-blue-600 font-medium">${
                  d.attempted
                } soru</span></p>
                <p class="flex justify-between"><span class="font-medium text-gray-700">Doğru:</span> <span class="text-green-600 font-medium">${
                  d.correct
                } soru</span></p>
                <p class="flex justify-between"><span class="font-medium text-gray-700">Başarı Oranı:</span> <span class="font-bold ${
                  d.attempted > 0 && d.correct / d.attempted > 0.7
                    ? "text-green-600"
                    : "text-red-600"
                }">${
            d.attempted > 0 ? Math.round((d.correct / d.attempted) * 100) : 0
          }%</span></p>
              </div>
            </div>
          `
        );

        updateTooltipPosition(event);
      })
      .on("mousemove", function (event) {
        updateTooltipPosition(event);
      })
      .on("mouseout", function () {
        tooltip.style("opacity", 0);
      });
  };

  // Grafik güncelleme
  useMemo(() => {
    if (data?.stats.length === 0 || !selectedSubject) return;

    console.log(data);

    const filteredSubject = data?.stats.filter(
      (s) => s.subject === selectedSubject
    );

    // Toplam istatistikleri hesapla
    const totalAttempted =
      filteredSubject?.reduce((sum, d) => sum + parseInt(d.attempted), 0) || 0;
    const totalCorrect =
      filteredSubject?.reduce((sum, d) => sum + parseInt(d.correct), 0) || 0;
    const totalSuccessRate =
      totalAttempted > 0
        ? Math.round((totalCorrect / totalAttempted) * 100)
        : 0;

    setTotalAttempted(totalAttempted);
    setTotalCorrect(totalCorrect);
    setTotalSuccessRate(totalSuccessRate);

    d3.select(svgRef.current).selectAll("*").remove();

    // Grafik çizim fonksiyonu
    if (filteredSubject) drawChart(filteredSubject);
  }, [selectedSubject, data]);

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
                  <option value="">Ders Seçin</option>
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
