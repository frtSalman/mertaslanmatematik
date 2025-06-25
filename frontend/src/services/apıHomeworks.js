import axios from "axios";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/homeworks"
    : "https://api.mertaslanmatematik.com/api/homeworks";

export async function fetchHomeworks(role, Id) {
  try {
    const response = await axios.get(
      `${API_URL}/get-homeworks?role=${role}&userId=${Id}`
    );
    return response.data.homeworks;
  } catch (error) {
    console.error(
      "Fetch homeworks failed:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
}

export async function addHomework(data) {
  try {
    // Send a separate request for each studentId
    const results = await Promise.all(
      data.studentId.map(async (studentId) => {
        const response = await axios.post(`${API_URL}/add-homework`, {
          homework: {
            ...data,
            studentId, // Override studentId for each entry
            teacherId: data.teacherId, // Ensure teacherId is included
          },
        });
        return response.data;
      })
    );

    return results;
  } catch (error) {
    console.error("Add homework failed:", error.message);
    throw error; // Propagate error for UI handling
  }
}

export async function deleteHomework(id) {
  try {
    await axios.delete(`${API_URL}/delete-homework/${id}`);
    return true;
  } catch (error) {
    console.error(
      "Delete failed:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
}

export async function updateHomeworkStatus(id) {
  try {
    const result = axios.put(`${API_URL}/update-homework-status/${id}`);
    return result;
  } catch (error) {
    console.error(
      "Update status failed:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
}

export async function updateHomework(data) {
  console.log(data);
  try {
    const result = axios.put(`${API_URL}/update-homework/${data.id}`, {
      homework: { ...data },
    });
    return result;
  } catch (error) {
    console.error(
      "Update failed:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
}
