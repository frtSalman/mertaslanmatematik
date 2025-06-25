import axios from "axios";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/student-statistics"
    : "http://31.97.184.39:5000/api/student-statistics";

export async function getStats(studentId, homeworkId) {
  try {
    const response = await axios.get(
      `${API_URL}/get-stats?studentId=${studentId}&homeworkId=${homeworkId} `
    );
    return response.data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

export async function addStats(stats) {
  try {
    const response = await axios.post(`${API_URL}/add-stats`, {
      stats,
    });
    return response.data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

export async function updateStats(stats) {
  try {
    const response = await axios.put(`${API_URL}/update-stats`, {
      stats,
    });
    return response.data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}
