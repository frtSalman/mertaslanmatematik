import { useEffect } from "react";
import * as d3 from "d3";

export function useStudentChart(svgRef, tooltipRef, data) {
  useEffect(() => {
    d3.select(svgRef.current).selectAll("*").remove();

    if (data?.length === 0) {
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
    const chartData = data?.map((d) => ({
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
  }, [data, svgRef, tooltipRef]);
}
