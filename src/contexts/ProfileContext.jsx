import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const ProfileContext = createContext()

export const useProfiles = () => useContext(ProfileContext)

const API = "https://proyectofinabackend-waltermarchioli.onrender.com/api/ext/agentes"

export const ProfileProvider = ({ children }) => {
  const [profiles, setProfiles] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchProfiles = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get(API)
      console.log("Datos obtenidos de la API:", data)
      setProfiles(data)
    } catch (error) {
      console.error("Error al hacer el fetch a empleados", error)
    } finally {
      setLoading(false)
    }
  }

  // POST fn
  const createProfile = async (profile) => {
    const { data } = await axios.post(API, profile)
    console.log('data -> ', data)
    setProfiles((prev) => [...prev, data])
  }

  // PUT fn
  const updateProfile = async (id, updatedData) => {
    const { data } = await axios.put(`${API}/${id}`, updatedData)
    setProfiles((prev) =>
      prev.map((profile) => (profile._id === id ? data : profile))
    )
  }

  // DELETE fn
  const deleteProfile = async (id) => {
    await axios.delete(`${API}/${id}`)
    setProfiles((prev) => prev.filter((profile) => profile._id !== id))
  }

  useEffect(() => {
    fetchProfiles()
  }, [])

  return (
    <ProfileContext.Provider value={{ profiles, loading, createProfile, updateProfile, deleteProfile }}>
      {children}
    </ProfileContext.Provider>
  )
}