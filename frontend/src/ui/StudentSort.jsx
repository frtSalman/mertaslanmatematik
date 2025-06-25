import { useState, useMemo } from "react";

function StudentSort({ data, onSort }) {
  // Extract unique student names from the data
  const names = [];

  console.log(data);

  data.forEach((row) => {
    if (!names.includes(row.student.name)) {
      names.push(row.student.name);
    }
  });

  // State for selected student names
  const [selectedStudents, setSelectedStudents] = useState([]);
  // State for search query
  const [searchQuery, setSearchQuery] = useState("");

  // Filter the names based on the search query (ignoring case)
  const filteredNames = useMemo(() => {
    return names.filter((name) =>
      name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [names, searchQuery]);

  // Handle checkbox change to update selectedStudents state
  const handleCheckboxChange = (name) => {
    setSelectedStudents((prevSelected) => {
      if (prevSelected.includes(name)) {
        return prevSelected.filter((n) => n !== name);
      } else {
        return [...prevSelected, name];
      }
    });
  };

  // Handler for "Select All"
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedStudents([...names]);
    } else {
      setSelectedStudents([]);
    }
  };

  // Are all selected?
  const allSelected = selectedStudents.length === names.length;

  return (
    <div className="w-full px-6 mx-auto mt-3 bg-white">
      <h2 className="mb-4 text-xl font-bold text-gray-800">
        Öğrenci(leri) Seçin
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
          placeholder="Öğrenci ara..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-3 py-2 transition border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* List of Filtered Students */}
      <ul className="p-2 space-y-2 overflow-y-auto border border-gray-200 rounded h-45">
        {filteredNames.length > 0 ? (
          filteredNames.map((name, index) => (
            <li key={index} className="flex items-center">
              <input
                type="checkbox"
                id={`student-${index}`}
                name="students"
                value={name}
                checked={selectedStudents.includes(name)}
                onChange={() => handleCheckboxChange(name)}
                className="w-4 h-4 mr-2 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor={`student-${index}`} className="text-gray-700">
                {name}
              </label>
            </li>
          ))
        ) : (
          <p className="text-sm text-gray-500">Öğrenci bulunamadı.</p>
        )}
      </ul>

      {/* Display the list of selected students */}
      <div className="mt-4">
        <p className="text-sm text-gray-600">
          Seçilen(ler):{" "}
          {selectedStudents.length < 4
            ? selectedStudents.join(", ") || "Yok"
            : selectedStudents.slice(0, 3).join(", ") + "..."}
        </p>
      </div>

      <button
        className="float-right px-4 py-2 mb-4 text-blue-500 bg-blue-100 border-blue-500 rounded border-1 hover:text-white hover:bg-blue-500"
        type="submit"
        onClick={() => onSort({ names: selectedStudents })}
      >
        Sırala
      </button>
    </div>
  );
}

export default StudentSort;
