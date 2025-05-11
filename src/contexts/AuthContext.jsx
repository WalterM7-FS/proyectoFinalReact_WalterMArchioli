import { createContext, useContext, useEffect, useState } from "react";
import { loginUser } from "../contexts/ProfileContext";
import { axiosInstance } from "../utils/axios";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded);
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await loginUser({ email, password });
      const { token } = res.data;
      const decoded = jwtDecode(token);
      setUser(decoded);

      // Guardar token en el localStorage
      localStorage.setItem("token", token);
      setToken(token);
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      return true;
    } catch (err) {
      console.error("Error durante el login:", err);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    delete axiosInstance.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);