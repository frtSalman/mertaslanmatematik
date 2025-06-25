import { useState, useMemo } from "react";

function DateSort({ data, onSort }) {
  // Extract unique student dates from the data
  const dates = [];

  data.forEach((row) => {
    const date = new Date(row.createdAt).toLocaleDateString();
    if (!dates.includes(date)) {
      dates.push(date);
    }
  });

  // State for selected student dates
  const [selectedDates, setSelectedDates] = useState([]);
  // State for search query
  const [searchQuery, setSearchQuery] = useState("");

  // Filter the dates based on the search query (ignoring case)
  const filtereddates = useMemo(() => {
    return dates.filter((date) =>
      date.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [dates, searchQuery]);

  // Handle checkbox change to update selectedDates state
  const handleCheckboxChange = (date) => {
    setSelectedDates((prevSelected) => {
      if (prevSelected.includes(date)) {
        return prevSelected.filter((n) => n !== date);
      } else {
        return [...prevSelected, date];
      }
    });
  };

  // Handler for "Select All"
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedDates([...dates]);
    } else {
      setSelectedDates([]);
    }
  };

  // Are all selected?
  const allSelected = selectedDates.length === dates.length;

  return (
    <div className="w-full px-6 mx-auto mt-3 bg-white">
      <h2 className="mb-4 text-xl font-bold text-gray-800">
        Tarih(leri) Seçin
      </h2>

      <div className="flex items-center mb-4">
        <input
          id="select-all"
          type="checkbox"
          checked={allSelected}
          onChange={handleSelectAll}
          className="w-4 h-4 mr-2 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="select-all" className="font-medium text-gray-700">
          Hepsini Seç
        </label>
      </div>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Tarih ara..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-3 py-2 transition border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* List of Filtered Students */}
      <ul className="p-2 space-y-2 overflow-y-auto border border-gray-200 rounded h-45">
        {filtereddates.length > 0 ? (
          filtereddates.map((date, index) => (
            <li key={index} className="flex items-center">
              <input
                type="checkbox"
                id={`student-${index}`}
                name="students"
                value={date}
                checked={selectedDates.includes(date)}
                onChange={() => handleCheckboxChange(date)}
                className="w-4 h-4 mr-2 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor={`student-${index}`} className="text-gray-700">
                {date}
              </label>
            </li>
          ))
        ) : (
          <p className="text-sm text-gray-500">Tarih bulunamadı.</p>
        )}
      </ul>

      {/* Display the list of selected students */}
      <div className="mt-4">
        <p className="text-sm text-gray-600">
          Seçilen(ler):{" "}
          {selectedDates.length < 4
            ? selectedDates.join(", ") || "Yok"
            : selectedDates.slice(0, 3).join(", ") + "..."}
        </p>
      </div>

      <button
        className="float-right px-4 py-2 mb-4 text-blue-500 bg-blue-100 border-blue-500 rounded border-1 hover:text-white hover:bg-blue-500"
        type="submit"
        onClick={() => onSort({ dates: selectedDates })}
      >
        Sırala
      </button>
    </div>
  );
}

export default DateSort;
