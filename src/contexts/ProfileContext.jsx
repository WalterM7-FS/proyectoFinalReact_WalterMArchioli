import { createContext, useContext, useEffect, useState } from "react";
import { axiosInstance } from "../utils/axios"; // Nueva ruta para axios personalizada

const ProfileContext = createContext();

export const useProfiles = () => useContext(ProfileContext);

const API = "/ext/agentes"; // Ya usa el baseURL de axiosInstance

export const ProfileProvider = ({ children }) => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProfiles = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(API);
      setProfiles(data);
    } catch (error) {
      console.error("Error al hacer el fetch a empleados", error);
    } finally {
      setLoading(false);
    }
  };

  const createProfile = async (profile) => {
    const { data } = await axiosInstance.post(API, profile);
    setProfiles((prev) => [...prev, data]);
  };

  const updateProfile = async (id, updatedData) => {
    const { data } = await axiosInstance.put(`${API}/${id}`, updatedData);
    setProfiles((prev) =>
      prev.map((profile) => (profile._id === id ? data : profile))
    );
  };

  const deleteProfile = async (id) => {
    await axiosInstance.delete(`${API}/${id}`);
    setProfiles((prev) => prev.filter((profile) => profile._id !== id));
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  return (
    <ProfileContext.Provider
      value={{ profiles, loading, createProfile, updateProfile, deleteProfile }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

// 👇 Exportamos la función loginUser para usarla en AuthContext
export const loginUser = async (credentials) => {
  return await axiosInstance.post(`/ext/agentes/login`, credentials);
};