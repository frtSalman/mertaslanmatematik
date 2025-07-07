import axios from "axios";

const HOST = import.meta.env.VITE_API_URL;

const API_URL =
  import.meta.env.MODE === "development"
    ? `http://${HOST}:5000/api/student-statistics`
    : "https://api.mertaslanmatematik.com/api/analysis";

axios.defaults.withCredentials = true;

export async function getStats(studentId, homeworkId) {
  try {
    const response = await axios.get(
      `https://api.mertaslanmatematik.com/getStats?studentId=${studentId}&homeworkId=${homeworkId} `
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
