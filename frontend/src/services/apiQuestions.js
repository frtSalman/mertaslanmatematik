import axios from "axios";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/uploads"
    : "https://api.mertaslanmatematik.com/api/uploads";

export const getQuestions = async (params) => {
  const { user, studentId } = params;

  let getURL;

  if (user.role === "teacher") {
    getURL = `${API_URL}/unsolved-question-url?role=teacher&id=${user.id}&studentId=${studentId}`;
  } else {
    getURL = `${API_URL}/unsolved-question-url?role=student&id=${user.id}&teacherId=${user.teacherId}`;
  }

  try {
    const response = await axios.get(getURL);
    return response.data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const updateQuestionAppearance = async (params) => {
  const { bool, id } = params;
  try {
    const response = await axios.put(
      `${API_URL}/unsolved-question-url/?bool=${bool}&id=${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
