import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginRequest, registerRequest } from "../../Services/api";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      // Enviar el objeto de forma directa
      const { loggedUser, token } = await loginRequest({ email, password });

      // Guardar credenciales en localstorage
      localStorage.setItem("correo", loggedUser.email);
      localStorage.setItem("nombreUsuario", loggedUser.name);
      localStorage.setItem("token", token);

      //Redireccionar al Dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error(
        "Error al iniciar sesión: ",
        error.response?.data?.message || error.message,
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Registrar Usuario
  const register = async (userData) => {
    setIsLoading(true);
    setError(null);
    try {
        const response = await registerRequest(userData)
        setIsLoading(false)
        return response
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      console.error("Error al registrar usuario: ", errorMsg);
      setError(errorMsg);
      setIsLoading(false);
      return null;
    }
  };

  return { login, isLoading, register, error };
};
