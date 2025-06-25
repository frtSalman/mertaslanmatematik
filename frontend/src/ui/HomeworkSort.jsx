import { useState, useMemo } from "react";

function HomeworkSort({ data, onSort }) {
  // Extract unique student homeworks from the data
  const homeworks = [];

  data.forEach((row) => {
    if (!homeworks.includes(row.homeworkContent.title)) {
      homeworks.push(row.homeworkContent.title);
    }
  });

  // State for selected student homeworks
  const [selectedHomeworks, setSelectedHomeworks] = useState([]);
  // State for search query
  const [searchQuery, setSearchQuery] = useState("");

  // Filter the homeworks based on the search query (ignoring case)
  const filteredhomeworks = useMemo(() => {
    return homeworks.filter((homework) =>
      homework.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [homeworks, searchQuery]);

  console.log(filteredhomeworks);

  // Handle checkbox change to update selectedHomeworks state
  const handleCheckboxChange = (homework) => {
    setSelectedHomeworks((prevSelected) => {
      if (prevSelected.includes(homework)) {
        return prevSelected.filter((n) => n !== homework);
      } else {
        return [...prevSelected, homework];
      }
    });
  };

  // Handler for "Select All"
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedHomeworks([...homeworks]);
    } else {
      setSelectedHomeworks([]);
    }
  };

  // Are all selected?
  const allSelected = selectedHomeworks.length === homeworks.length;

  return (
    <div className="w-full px-6 mx-auto mt-3 bg-white">
      <h2 className="mb-4 text-xl font-bold text-gray-800">Ödev(leri) Seçin</h2>

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
          placeholder="Ödev ara..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-3 py-2 transition border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* List of Filtered Students */}
      <ul className="p-2 space-y-2 overflow-y-auto border border-gray-200 rounded h-45">
        {filteredhomeworks.length > 0 ? (
          filteredhomeworks.map((homework, index) => (
            <li key={index} className="flex items-center">
              <input
                type="checkbox"
                id={`student-${index}`}
                name="students"
                value={homework}
                checked={selectedHomeworks.includes(homework)}
                onChange={() => handleCheckboxChange(homework)}
                className="w-4 h-4 mr-2 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor={`student-${index}`} className="text-gray-700">
                {homework}
              </label>
            </li>
          ))
        ) : (
          <p className="text-sm text-gray-500">Ödev bulunamadı.</p>
        )}
      </ul>

      {/* Display the list of selected students */}
      <div className="mt-4">
        <p className="text-sm text-gray-600">
          Seçilen(ler):{" "}
          {selectedHomeworks.length < 4
            ? selectedHomeworks.join(", ") || "Yok"
            : selectedHomeworks.slice(0, 3).join(", ") + "..."}
        </p>
      </div>

      <button
        className="float-right px-4 py-2 mb-4 text-blue-500 bg-blue-100 border-blue-500 rounded border-1 hover:text-white hover:bg-blue-500"
        type="submit"
        onClick={() => onSort({ homeworks: selectedHomeworks })}
      >
        Sırala
      </button>
    </div>
  );
}

export default HomeworkSort;
