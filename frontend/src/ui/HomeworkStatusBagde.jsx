import { differenceInCalendarDays } from "date-fns";

function HomeworkStatusBadge({ homework }) {
  const now = new Date();
  const deadline = new Date(homework.homeworkDeadline);

  let label, bgClass;

  if (homework.homeworkStatus) {
    // Tamamlandı
    label = "Tamamlandı";
    bgClass = "bg-green-100 text-green-800 border-1 border-green-300";
  } else {
    const daysLeft = differenceInCalendarDays(deadline, now);
    if (daysLeft >= 0) {
      // Kalan gün sayısı
      label = daysLeft === 0 ? "Son gün ⚠️" : `${daysLeft} gün kaldı`;
      bgClass =
        daysLeft === 0
          ? "bg-amber-200 text-amber-800 border-1 border-amber-500"
          : "bg-amber-100 text-amber-800 border-1 border-amber-300";
    } else {
      // Süre dolmuş
      label = "Yapılmadı";
      bgClass = "bg-red-100 text-red-800 border-1 border-red-300";
    }
  }

  return (
    <div className="flex items-center justify-center p-2">
      <span
        className={`
          inline-flex items-center
          px-2.5 py-0.5
          rounded-full text-sm font-medium
          ${bgClass}
        `}
      >
        {label}
      </span>
    </div>
  );
}

export default HomeworkStatusBadge;
