import { useState, useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import useAddStats from "../hooks/useAddStats";
import toast from "react-hot-toast";
import { differenceInCalendarDays } from "date-fns";
import useUpdateStats from "../hooks/useUpdateStats";
import useUpdateHomeworkStatus from "../hooks/useUpdateHomeworkStatus";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import imageCompression from "browser-image-compression";
import ImageUploader from "./ImageUploader";
import LightboxQF from "./LightboxQF";
import axios from "axios";

const periodStyles = {
  sabah: {
    container: "bg-yellow-50 border-yellow-200 text-yellow-800",
    input: "border-yellow-300 focus:ring-yellow-200",
    button: "bg-green-500 hover:bg-green-600 focus:ring-green-300",
    icon: "/sunrise.svg",
  },
  ogle: {
    container: "bg-teal-50 border-teal-200 text-teal-800",
    input: "border-teal-300 focus:ring-teal-200",
    button: "bg-green-500 hover:bg-green-600 focus:ring-green-300",
    icon: "/sun.svg",
  },
  aksam: {
    container: "bg-blue-50 border-blue-200 text-blue-800",
    input: "border-blue-300 focus:ring-blue-200",
    button: "bg-green-500 hover:bg-green-600 focus:ring-green-300",
    icon: "/night.svg",
  },
};

const pullZoneURL = "https://cdn.mertaslanmatematik.com/";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/uploads"
    : "https://api.mertaslanmatematik.com/api/uploads";

export default function QuestionForm({ scheduleData, statsData }) {
  const [isPhotoUploading, setIsPhotoUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isImagesUploaded, setIsImagesUploaded] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const { mutate: addStats, isPending: isAdding } = useAddStats();

  const { mutate: updateStats, isPending: isUpdating } = useUpdateStats();

  const { mutate: updateHomeworkStatus, isPending: isUpdatingStatus } =
    useUpdateHomeworkStatus();

  const stats = statsData?.stats.slice();

  const now = new Date();
  const deadline = new Date(scheduleData.deadline);
  const daysLeft = differenceInCalendarDays(deadline, now);

  const statOfDay = stats?.find((s) => s.day === scheduleData.day);

  const qN = watch("qN") || 0;
  const cN = watch("cN") || 0;

  const requiredPhotos = Math.max(qN - cN, 0);

  useEffect(() => {
    if (
      scheduleData.hStatus === false &&
      stats?.length === scheduleData.hDayNum
    ) {
      updateHomeworkStatus(scheduleData.hId);
    }
  }, [
    stats?.length,
    scheduleData.hId,
    updateHomeworkStatus,
    scheduleData.hDayNum,
    scheduleData.hStatus,
  ]);

  const uploadToBunny = async (file, pages) => {
    try {
      const res = await axios.post(
        `${API_URL}/add-unsolved-question-path`,
        {
          filename: file.name,
          homeworkId: scheduleData.hId,
          studentId: scheduleData.user.id,
          studentName: scheduleData.user.name,
          teacherId: scheduleData.user.teacherId,
          subject: scheduleData.title,
          pages,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const { uploadUrl, filePath, key } = res.data;

      console.time("uploding photo");
      await fetch(uploadUrl, {
        method: "PUT",
        headers: {
          AccessKey: key,
          "Content-Type": file.type,
        },
        body: file,
      });
      console.timeEnd("uploding photo");
      return filePath; // to store or display later
    } catch (error) {
      console.trace(error);
    }
  };

  const handleImageUpload = async (imageFile, pages) => {
    const options = {
      maxSizeMB: 0.8, // Target 800KB
      maxWidthOrHeight: 1600, // Resize large images
      useWebWorker: true,
      fileType: "image/webp", // Convert to WebP
      webpQuality: 0.8,
    };
    try {
      console.time("compress");
      const compressedFile = await imageCompression(imageFile, options);
      console.timeEnd("compress");

      return await uploadToBunny(compressedFile, pages);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilesSelected = (files) => {
    setSelectedFiles(files.map((file) => file.rawFile || file));
  };

  const onSubmit = async (data) => {
    if (
      !statOfDay &&
      requiredPhotos > 0 &&
      selectedFiles.length < requiredPhotos
    ) {
      toast.error(
        `Lütfen ${requiredPhotos} adet çözemediğiniz sorunun fotoğrafını yükleyiniz.`
      );
      return;
    }

    const pages = data.pages;

    const filePaths = [];

    setIsPhotoUploading(true);

    if (selectedFiles.length !== 0) {
      console.time("foto");
      for (const file of selectedFiles) {
        const path = await handleImageUpload(file, pages);
        filePaths.push(path);
      }
      console.timeEnd("foto");
    }

    setIsPhotoUploading(false);

    const homeworkStatsData = {
      studentId: scheduleData.user.id,
      teacherId: scheduleData.user.teacherId,
      homeworkId: scheduleData.hId,
      subject: scheduleData.title,
      day: scheduleData.day,
      attempted: data.qN,
      correct: data.cN,
      pages,
      unsolvedQPaths: filePaths,
    };

    if (statOfDay) {
      const updatedStats = {
        attempted: data.qN,
        correct: data.cN,
        pages,
        id: statOfDay.id,
        unsolvedQPaths: [...statOfDay.unsolvedQPaths, ...filePaths],
      };
      updateStats(updatedStats, {
        onSuccess: (data) => {
          setIsImagesUploaded(data.success);
          toast.success(
            `${scheduleData.title} konulu ${scheduleData.day} gününe ait ödevinizi güncellediniz. 🚀`
          );
          reset();
        },
      });
    } else {
      addStats(homeworkStatsData, {
        onSuccess: ({ data }) => {
          setIsImagesUploaded(data.success);
          toast.success(
            `Tebrikler! ${scheduleData.title} konulu ${scheduleData.day} gününe ait ödevinizi tamamladınız. 🚀`
          );
          reset();
        },
      });
    }
  };

  useEffect(() => {
    return () => {
      // Clean up object URLs
      selectedFiles.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [selectedFiles]);

  const styles = periodStyles[scheduleData.period] || periodStyles.ogle;

  function handleHomeworkUpdateStatus() {
    if (scheduleData.hStatus === false) {
      updateHomeworkStatus(scheduleData.hId);
    }
  }

  return (
    <div className={`rounded-2xl ${styles.container} w-full mx-auto`}>
      {lightboxOpen && (
        <LightboxQF
          props={{
            lightboxOpen,
            setLightboxOpen,
            statOfDay,
            pullZoneURL,
            currentImageIndex,
            setCurrentImageIndex,
          }}
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Header */}

        <h3 className="text-lg font-semibold">Çalışma Raporu</h3>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Sayfa Aralığı */}
          <div className="flex flex-col">
            <label className="block text-sm font-medium">Sayfa Aralığı</label>
            <input
              type="text"
              placeholder={statOfDay?.pages || "Sayfa aralığı..."}
              className={`mt-1 w-full rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 transition ${styles.input}`}
              {...register("pages", {
                required: "Lütfen sayfa aralığını giriniz.",
              })}
            />
          </div>

          {/* Soru Sayısı */}
          <div className="flex flex-col">
            <label className="block text-sm font-medium">Soru Sayısı</label>
            <input
              type="number"
              placeholder={statOfDay?.attempted}
              className={`mt-1 w-full rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 transition ${styles.input}`}
              {...register("qN", {
                required: "Lütfen toplam soru sayısını giriniz.",
                valueAsNumber: true,
                min: { value: 1, message: "En az 1 soru olmalı." },
              })}
            />
            {errors.qN && (
              <p className="mt-1 text-xs text-red-600">{errors.qN.message}</p>
            )}
          </div>

          {/* Doğru Sayısı */}
          <div className="flex flex-col">
            <label className="block text-sm font-medium">Doğru Sayısı</label>
            <input
              type="number"
              placeholder={statOfDay?.correct}
              className={`mt-1 w-full rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 transition ${styles.input}`}
              {...register("cN", {
                required: "Lütfen doğru cevap sayısını giriniz.",
                valueAsNumber: true,
                validate: (value) =>
                  value <= qN || "Doğru sayısı soru sayısından fazla olamaz",
              })}
            />
            {errors.cN && (
              <p className="mt-1 text-xs text-red-600">{errors.cN.message}</p>
            )}
          </div>
        </div>

        <div className="max-w-4xl p-2 mx-auto">
          <ImageUploader
            handleFilesSelected={handleFilesSelected}
            isImagesUploaded={isImagesUploaded}
            setIsImagesUploaded={setIsImagesUploaded}
          />
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
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(i);
                      setLightboxOpen(true);
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        <div className="flex flex-row items-center justify-between gap-2">
          {/* Submit Button */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full p-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400`}
            onClick={() => {
              if (
                confirm(
                  "Bu haftadaki tüm ödevleri tamamladığını onaylıyor musun?"
                )
              ) {
                handleHomeworkUpdateStatus();
              }
            }}
          >
            🗓️ Haftayı Tamamla
          </motion.button>
          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={daysLeft < 0}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full p-2 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white ${styles.button}`}
          >
            {statOfDay
              ? isPhotoUploading
                ? "⏳ Yükleniyor..."
                : "🎯 Günü Güncelle"
              : isPhotoUploading
              ? "⏳ Yükleniyor..."
              : "🎯 Günü Tamamla"}
            {daysLeft < 0 && "Ödev zamanı doldu. ⛔"}
          </motion.button>
        </div>
      </form>
    </div>
  );
}
