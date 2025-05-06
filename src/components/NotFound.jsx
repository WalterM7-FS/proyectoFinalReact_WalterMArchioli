import React from 'react'
import { useNavigate } from 'react-router-dom'


const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6 text-red-400">404 Not Found 😿</h1>
      <button
        onClick={() => navigate('/')}
        className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition duration-300"
      >
        Back to Home
      </button>
    </div>
  )
}

export default NotFound