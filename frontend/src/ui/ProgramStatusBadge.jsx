import { differenceInCalendarDays } from "date-fns";

function ProgramStatusBadge({ program_deadline, homeworkStatus }) {
  const now = new Date();
  const deadline = new Date(program_deadline);

  let label, bgClass;

  const daysLeft = differenceInCalendarDays(deadline, now);
  if (homeworkStatus) {
    label = "Yapıldı 👌";
    bgClass = "bg-green-500 text-white border-1 border-white";
  } else if (daysLeft >= 0) {
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

  return (
    <div className="flex items-center justify-center">
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

export default ProgramStatusBadge;
