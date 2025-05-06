import React from 'react'
import { useProfiles } from '../contexts/ProfileContext.jsx'
import { useNavigate } from 'react-router-dom'

const ProfileSelector = () => {
  const { profiles } = useProfiles()
  const navigate = useNavigate()

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-black/90 text-white px-4 py-10'>
      <h1 className='text-2xl font-bold mb-6'>Listado de empleados:</h1>

      <div className="overflow-x-auto w-full max-w-4xl mb-6">
        <table className="min-w-full border border-gray-700 text-left">
          <thead className="bg-gray-800 text-gray-200">
            <tr>
              
              <th className="px-4 py-2 border-b border-gray-700">Legajo</th>
              <th className="px-4 py-2 border-b border-gray-700">Apellido y Nombre</th>
              <th className="px-4 py-2 border-b border-gray-700">Repartición</th>
              <th className="px-4 py-2 border-b border-gray-700">Función</th>
              <th className="px-4 py-2 border-b border-gray-700">Categoría</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map((profile) => (
              <tr key={profile._id} className="hover:bg-gray-700">
                
                <td className="px-4 py-2 border-b border-gray-700">{profile.legajo}</td>
                <td className="px-4 py-2 border-b border-gray-700">{profile.nombre}</td>
                <td className="px-4 py-2 border-b border-gray-700">{profile.reparticion}</td>
                <td className="px-4 py-2 border-b border-gray-700">{profile.funcion}</td>
                <td className="px-4 py-2 border-b border-gray-700">{profile.categoria}</td>
                
                <td className="px-4 py-2 border-b border-gray-700">
                  <button
                    onClick={() => navigate(`/profiles/${profile._id}`)}
                    className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white text-sm"
                  >
                    Ver perfil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Botón para agregar nuevo empleado */}
      <button
        onClick={() => navigate('/profiles/create-profile')}
        className="mb-4 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition duration-300"
      >
        Agregar empleado
      </button>

      {/* Botón para regresar al inicio */}
      <button
        onClick={() => navigate('/')}
        className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition duration-300"
      >
        Regresar al Inicio
      </button>
    </div>
  )
}

export default ProfileSelector