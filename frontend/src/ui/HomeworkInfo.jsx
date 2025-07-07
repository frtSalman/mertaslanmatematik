import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getHomeworkStats } from "../services/apiStats";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const periodStyles = {
  sabah: {
    container: "bg-yellow-50 border-yellow-200 text-yellow-800",
    input: "border-yellow-300 focus:ring-yellow-200",
    button: "bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-300",
    icon: "/sunrise.svg",
  },
  ogle: {
    container: "bg-teal-50 border-teal-200 text-teal-800",
    input: "border-teal-300 focus:ring-teal-200",
    button: "bg-teal-500 hover:bg-teal-600 focus:ring-teal-300",
    icon: "/sun.svg",
  },
  aksam: {
    container: "bg-blue-50 border-blue-200 text-blue-800",
    input: "border-blue-300 focus:ring-blue-200",
    button: "bg-blue-500 hover:bg-blue-600 focus:ring-blue-300",
    icon: "/night.svg",
  },
};

const pullZoneURL = "https://cdn.mertaslanmatematik.com/";

export default function HomeworkInfo({ scheduleData }) {
  const {
    data: statsData,
    error,
    isPending: isGetting,
  } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const res = await getHomeworkStats(scheduleData.hId);
      return res;
    },
  });

  const stats = statsData?.stats.slice();

  console.log(scheduleData);

  const statOfDay = stats?.find((s) => s.day === scheduleData.day);

  const styles = periodStyles[scheduleData.period] || periodStyles.ogle;

  return (
    <div className={`rounded-2xl ${styles.container} w-full mx-auto`}>
      <div className="space-y-4">
        {/* Header */}

        <h3 className="text-lg font-semibold">Çalışma Raporu</h3>

        {/* Inputs Grid */}
        <div className="flex flex-row flex-wrap gap-2 justify-evenly md:gap-4">
          <div className="flex flex-row items-center gap-3">
            <label className="block text-sm font-[400]">Sayfa Aralığı:</label>
            <p>{statOfDay?.pages}</p>
          </div>

          <div className="flex flex-row items-center gap-3">
            <label className="block text-sm font-[400]">Soru Sayısı:</label>
            <p>{statOfDay?.attempted}</p>
          </div>

          <div className="flex flex-row items-center gap-3">
            <label className="block text-sm font-[400]">Doğru Sayısı:</label>
            <p>{statOfDay?.correct}</p>
          </div>
        </div>

        {/* Modern Slider for Uploaded Images */}
        {statOfDay?.unsolvedQPaths.length > 0 && (
          <div className="pt-1">
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              spaceBetween={20}
              slidesPerView={1}
              className="max-w-md mx-auto overflow-hidden shadow-md rounded-xl"
            >
              {statOfDay.unsolvedQPaths.map((p, i) => (
                <SwiperSlide key={i}>
                  <img
                    src={pullZoneURL + p}
                    alt={`Yanlış ${i + 1}`}
                    className="w-full h-auto object-contain max-h-[200px] mx-auto rounded"
                    loading="lazy"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </div>
  );
}
