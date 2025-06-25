import axios from "axios";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/timetable"
    : "http://31.97.184.39:5000/api/timetable";

export async function addDailySchedule(tableData) {
  const {
    studentId,
    timeSlots,
    program_content,
    program_title,
    teacherId,
    homeworkId,
    program_deadline,
  } = tableData;
  try {
    // Fetch existing data
    /* const getRes = await axios.get(`${API_URL}/get-schedule/${studentId}`); */
    const programData = {};

    // Update each day with period information
    timeSlots.forEach(({ day, period }) => {
      programData[day] = [
        {
          program_title,
          program_content,
          period, // Store period with each entry
        },
      ];
    });

    // Single POST request
    await axios.post(`${API_URL}/add-schedule`, {
      studentId,
      teacherId,
      programData,
      program_deadline,
      homeworkId,
    });
  } catch (err) {
    console.error("Error in addDailySchedule:", err);
    // Re-throw or handle in-ui
    throw new Error(err.response?.data?.message || err.message);
  }
}

export async function fetchTimeTable(credentials) {
  const { role, userId } = credentials;
  try {
    // 1) Fetch existing timetable (if any)
    const getRes = await axios.get(
      `${API_URL}/get-all-schedule?role=${role}&userId=${userId}`
    );
    return getRes.data;
  } catch (err) {
    // if 404, it just means no existing record—ignore
    if (err.response?.status !== 404) {
      console.error("Failed to fetch existing timetable:", err);
      throw err;
    }
  }
}

export async function deleteDailySchedule(credentials) {
  const { programData, studentId } = credentials;
  try {
    const { error } = await axios.post(`${API_URL}/delete-schedule`, {
      studentId,
      programData,
    });
    if (error) {
      console.error("Error deleting schedule:", error);
      return null;
    }
  } catch (error) {
    if (error.response?.status !== 404) {
      console.error("Failed to fetch existing timetable:", error);
      throw error;
    }
  }
}
