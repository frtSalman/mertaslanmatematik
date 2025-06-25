import axios from "axios";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/users"
    : "https://api.mertaslanmatematik.com/api/users";

export async function fetchStudents(teacherId) {
  try {
    const response = await axios.get(`${API_URL}/students/${teacherId}`);
    return response.data;
  } catch (err) {
    // if 404, it just means no existing record—ignore
    if (err.response?.status !== 404) {
      console.error("Failed to fetch existing timetable:", err);
      throw err;
    }
  }
}
