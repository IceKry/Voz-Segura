import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ||"http://192.168.0.8:2880",
  timeout: 50000,
});

//# Interceptor de token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (err) => Promise.reject(err),
);

//# Listar Reportes por ID de usuario
export const listReports = async () => {
  try {
    const response = await apiClient.get("/user/reports");
    return response.data;
  } catch (error) {
    console.error("Error al Conseguir data, ", error);
    throw error.response?.dataa || { message: "Error al obtener el historial" };
  }
};

//# Login
export const loginRequest = async (user) => {
  const response = await apiClient.post("/user/login", user);
  return response.data;
};

// Crear reporte
export const createReportRequest = async (reportData) => {
  try {
    const response = await apiClient.post("/report/create", reportData);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || { message: "Error de conexión con el servidor" }
    );
  }
};

// Obtener todos los reportes
export const getAllReports = async () => {
  try {
    const response = await apiClient.get("/report/all");
    return response.data;
  } catch (error) {
    return {
      error: true,
      message:
        error.response?.data?.message || "No se pudieron obtener los reportes",
    };
  }
};

// Actualizar estado del reporte
export const updateReportStatus = async (id, status) => {
  try {
    const response = await apiClient.put(`/report/update-status/${id}`, {
      status,
    });
    return response.data;
  } catch (error) {
    return {
      error: true,
      message:
        error.response?.data?.message ||
        "No se pudo actualizar estado del reporte",
    };
  }
};

// Registrar usuario
export const registerRequest = async (user) => {
  try {
    const response = await apiClient.post('/user/regist', user)
    return response.data
  } catch (error) {
    throw error.response?.data || { message: "Error al registrar usuario" };
  }
};
