import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Home = () => {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout() 
    navigate('/login') 
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4">
      <h1 className="text-5xl font-extrabold text-yellow-400 mb-8 drop-shadow-lg">
         Bienvenido
      </h1>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        <button
          onClick={() => navigate('/profiles')}
          className="w-full px-6 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-lg shadow-md hover:bg-yellow-500 transition-all duration-300"
        >
          📋 Listado de empleados
        </button>

        <button
          onClick={() => navigate('/nested-route')}
          className="w-full px-6 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-lg shadow-md hover:bg-yellow-500 transition-all duration-300"
        >
          🔐 Liquidación de AFE
        </button>


        <button
          onClick={handleLogout}
          className="w-full px-6 py-3 bg-red-600 text-gray-900 font-semibold rounded-lg shadow-md hover:bg-red-700 transition-all duration-300 mt-4"
        >
          🚪 Cerrar sesión
        </button>

      </div>
    </div>
  )
}

export default Home