import axios from "axios";

const HOST = import.meta.env.VITE_API_URL;

const API_URL =
  import.meta.env.MODE === "development"
    ? `http://${HOST}:5000/api/student-statistics`
    : "https://api.mertaslanmatematik.com/api/analysis";

axios.defaults.withCredentials = true;

export async function getHomeworkStats(studentId, homeworkId) {
  try {
    const url = `${API_URL}/all-stats?studentId=${studentId}&homeworkId=${homeworkId}`;
    const response = await fetch(url, {
      method: "GET",
      credentials: "include", // Equivalent to axios.defaults.withCredentials = true
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error.message);
    throw error;
  }
}

export async function getStudentStats(studentId) {
  try {
    const url = `${API_URL}/student-stats/${studentId}`;
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error.message);
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
