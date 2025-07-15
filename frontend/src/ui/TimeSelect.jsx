import { useState, useEffect, useRef } from "react";

function TimeSelect({ selectedSchedule, setSelectedSchedule }) {
  const weekDays = [
    "Pazartesi",
    "Salı",
    "Çarşamba",
    "Perşembe",
    "Cuma",
    "Cumartesi",
    "Pazar",
  ];

  const timeOptions = [
    { value: "sabah", label: "Sabah" },
    { value: "ogle", label: "Öğle" },
    { value: "aksam", label: "Akşam" },
  ];

  const [currentTime, setCurrentTime] = useState("");
  const [showDayDropdown, setShowDayDropdown] = useState(false);
  const [everyDay, setEveryDay] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDayDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTimeChange = (e) => {
    setCurrentTime(e.target.value);
    setShowDayDropdown(false);
  };

  const handleDayChange = (day) => {
    setSelectedSchedule((prev) => {
      const currentDays = prev[currentTime] || [];
      const newDays = currentDays.includes(day)
        ? currentDays.filter((d) => d !== day)
        : [...currentDays, day];

      return { ...prev, [currentTime]: newDays };
    });
  };

  useEffect(() => {
    if (everyDay === true) {
      setSelectedSchedule((prev) => {
        return { ...prev, [currentTime]: weekDays };
      });
    } else {
      setSelectedSchedule((prev) => {
        return { ...prev, [currentTime]: [] };
      });
    }
  }, [everyDay]);

  return (
    <div className="flex flex-row items-center justify-center gap-2">
      {/* Time Selection Dropdown */}
      <div className="px-3 py-2 border border-gray-200 rounded-lg shadow-sm w-fit bg-gray-50">
        <select
          value={currentTime}
          onChange={handleTimeChange}
          className="bg-gray-50"
        >
          <option value="" disabled>
            Zaman Seçin
          </option>
          {timeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Custom Day Dropdown */}
      {currentTime && (
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setShowDayDropdown(!showDayDropdown)}
            className="w-48 px-4 py-2 text-left border border-gray-200 rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100"
          >
            {selectedSchedule[currentTime]?.length > 0
              ? selectedSchedule[currentTime]?.length === 7
                ? "Tüm Hafta"
                : selectedSchedule[currentTime].join(", ")
              : "Gün Seçin"}
          </button>

          {showDayDropdown && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
              <div className="p-2 space-y-1 overflow-y-auto max-h-48">
                <label className="flex items-center p-2 space-x-2 cursor-pointer hover:bg-orange-50">
                  <input
                    type="checkbox"
                    checked={everyDay}
                    onChange={() => {
                      setEveryDay(!everyDay);
                    }}
                    className="text-orange-500 rounded focus:ring-orange-500"
                  />
                  <span className="flex-1">Tüm Hafta</span>
                </label>
                {weekDays.map((day) => (
                  <label
                    key={day}
                    className="flex items-center p-2 space-x-2 cursor-pointer hover:bg-orange-50"
                  >
                    <input
                      type="checkbox"
                      checked={selectedSchedule[currentTime]?.includes(day)}
                      onChange={() => handleDayChange(day)}
                      className="text-orange-500 rounded focus:ring-orange-500"
                    />
                    <span className="flex-1">{day}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TimeSelect;
