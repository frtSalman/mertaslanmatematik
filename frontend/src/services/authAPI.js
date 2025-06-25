import axios from "axios";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/auth"
    : "http://31.97.184.39:5000/api/auth";

axios.defaults.withCredentials = true;

export const signup = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, credentials);
    return response.data;
  } catch (error) {
    const serverMessage = error.response?.data?.message;
    const statusMessage =
      {
        401: "Geçersiz email veya parola",
        404: "Sayfa bulunamadı",
        500: "Sunucu hatası",
      }[error.response?.status] || "Giriş başarısız oldu.";

    throw new Error(serverMessage || statusMessage);
  }
};

export const sendInvitation = async (credentials) => {
  try {
    const response = await axios.post(
      `${API_URL}/send-invitation`,
      credentials
    );
    return response.data;
  } catch (error) {
    const serverMessage = error.response?.data?.message;
    const statusMessage =
      {
        401: "Geçersiz email veya parola",
        404: "Sayfa bulunamadı",
        500: "Sunucu hatası",
      }[error.response?.status] || "Giriş başarısız oldu.";

    throw new Error(serverMessage || statusMessage);
  }
};

export const studentSignup = async (credentials) => {
  const { token, email, name, password, grade } = credentials;
  try {
    const response = await axios.post(`${API_URL}/student-signup/${token}`, {
      email,
      name,
      grade,
      password,
    });
    return response.data;
  } catch (error) {
    const serverMessage = error.response?.data?.message;
    const statusMessage =
      {
        401: "Geçersiz email veya parola",
        404: "Sayfa bulunamadı",
        500: "Sunucu hatası",
      }[error.response?.status] || "Giriş başarısız oldu.";

    throw new Error(serverMessage || statusMessage);
  }
};

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);

    return response.data;
  } catch (error) {
    const serverMessage = error.response?.data?.message;
    const statusMessage =
      {
        401: "Geçersiz email veya parola",
        404: "Sayfa bulunamadı",
        500: "Sunucu hatası",
      }[error.response?.status] || "Giriş başarısız oldu.";

    throw new Error(serverMessage || statusMessage);
  }
};

export const logout = async () => {
  await axios.post(`${API_URL}/logout`);
};

export const verifyEmail = async (code) => {
  try {
    const response = await axios.post(`${API_URL}/verify-email`, code);

    return response.data;
  } catch (error) {
    const serverMessage = error.response?.data?.message;
    const statusMessage =
      {
        401: "Geçersiz email veya parola",
        404: "Sayfa bulunamadı",
        500: "Sunucu hatası",
      }[error.response?.status] || "Giriş başarısız oldu.";

    throw new Error(serverMessage || statusMessage);
  }
};

export const checkAuth = async () => {
  const response = await axios.get(`${API_URL}/check-auth`);
  return response.data;
};

export const forgotPassword = async (email) => {
  try {
    console.log(email);
    const response = await axios.post(`${API_URL}/forgot-password`, { email });
    return response.data;
  } catch (error) {
    const serverMessage = error.response?.data?.message;
    const statusMessage =
      {
        401: "Geçersiz email veya parola",
        404: "Sayfa bulunamadı",
        500: "Sunucu hatası",
      }[error.response?.status] || "Giriş başarısız oldu.";

    throw new Error(serverMessage || statusMessage);
  }
};

export const resetPassword = async (credentials) => {
  console.log(credentials);
  try {
    const { token, password } = credentials;
    const response = await axios.post(`${API_URL}/reset-password/${token}`, {
      password,
    });
    return response.data;
  } catch (error) {
    const serverMessage = error.response?.data?.message;
    const statusMessage =
      {
        401: "Geçersiz email veya parola",
        404: "Sayfa bulunamadı",
        500: "Sunucu hatası",
      }[error.response?.status] || "Giriş başarısız oldu.";

    throw new Error(serverMessage || statusMessage);
  }
};
